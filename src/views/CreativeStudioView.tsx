import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Copy,
  Download,
  Save,
  RotateCcw,
  Sun,
  Moon,
  Type,
  Dices,
  Shapes,
  FileText,
  Search,
  Check,
  X,
  Star,
  Code,
  Layers,
  CheckSquare,
  Palette,
} from 'lucide-react';
import {
  UNICODE_STYLES,
  VISUAL_EFFECTS,
  TEXTURE_FILLS,
  STUDIO_COLOR_PRESETS,
  filterUnicodeStyles,
  renderStyledTextToCanvas,
  downloadCanvasAsPng,
  generateSvgCode,
  generateCssCode,
  resolveStudioColors,
  getContrastStatus,
  isValidHexColor,
  normalizeHexColor,
  StudioColorConfig,
  UnicodeStyleFilterCategory,
} from '../services/textStyler';
import {
  generateUsernameSuggestions,
  validateUsername,
  UsernameStyle,
} from '../services/usernameDesigner';
import {
  DECORATIVE_SEPARATORS,
  getBioCaptionTemplates,
  countBioCaptionCharacters,
  countBioCaptionLines,
  insertAtTextSelection,
} from '../services/bioCaptionStudio';
import {
  TEXT_ART_ITEMS,
  filterTextArtItems,
  readTextArtFavorites,
  saveTextArtFavorites,
  SymbolCategory,
} from '../services/textArtStudio';
import { getAppSettings, saveAppSettings, subscribeToSettings } from '../services/settings';
import { getStudioLabel } from '../i18n/studio';
import { getNameInsightSectionLabels } from '../i18n/nameInsightLabels';
import { getCreativeStudioUiCopy } from '../i18n/moduleLabels';
import { resolveCanonicalLocale } from '../i18n/localeRegistry';
import { copyToClipboard } from '../utils/clipboard';
import { getTextDirection } from '../utils/locale';
import { GeneratorId, LanguageCode } from '../types';
import { CreativeStudioTransferContext } from '../types/nameInsight';

function resolveFontIdForLanguage(lang?: LanguageCode): string | null {
  if (!lang) return null;
  if (lang === 'ar') return 'arabic';
  if (lang === 'ja' || lang === 'zh' || lang === 'ko') return 'cjk';
  if (lang === 'hi' || lang === 'bn') return 'devanagari';
  return null;
}

function resolveFontIdForScript(name?: string): string | null {
  if (!name) return null;
  if (/[\u0600-\u06FF\u0750-\u077F]/.test(name)) return 'arabic';
  if (/[\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(name)) return 'cjk';
  if (/[\u0900-\u09FF]/.test(name)) return 'devanagari';
  return null;
}

type Tool = 'type' | 'nickname' | 'symbols' | 'bio';

interface Props {
  initialText?: string;
  initialContext?: CreativeStudioTransferContext;
  onNavigate: (view: string, generatorId?: GeneratorId) => void;
}

interface SavedDesign {
  id: string;
  name: string;
  output: string;
  tool?: Tool;
  styleId?: string;
  effectId?: string;
  prefix?: string;
  suffix?: string;
  bio?: string;
  bioKind?: 'bio' | 'caption';
  nickStyle?: UsernameStyle;
  fontId?: string;
  textureId?: string;
  colorMode?: 'auto' | 'custom';
  textColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  useCustomBg?: boolean;
  useGradient?: boolean;
}

const PRESETS = [
  { name: 'Minimal', style: 'bold-sans', effect: '', prefix: '', suffix: '' },
  { name: 'Royal', style: 'script', effect: 'pure-gold', prefix: '꧁༺ ', suffix: ' ༻꧂' },
  { name: 'Cyber', style: 'monospace', effect: 'cyber-neon', prefix: '⟪ ', suffix: ' ⟫' },
  { name: 'Gothic', style: 'fraktur', effect: 'chrome-titanium', prefix: '† ', suffix: ' †' },
  { name: 'Cosmic', style: 'double-struck', effect: '', prefix: '✧･ﾟ ', suffix: ' ･ﾟ✧' },
  { name: 'Gaming', style: 'bold-serif', effect: 'cyber-neon', prefix: '⚡ ', suffix: ' ⚡' },
];

const FONT_OPTIONS = [
  { id: 'sans', name: '01 · Modern Sans', family: 'system-ui, -apple-system, sans-serif' },
  { id: 'serif', name: '02 · Classic Serif', family: 'Georgia, Cambria, serif' },
  { id: 'mono', name: '03 · Monospace', family: 'ui-monospace, SFMono-Regular, Consolas, monospace' },
  { id: 'display', name: '04 · Impact Display', family: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' },
  { id: 'cursive', name: '05 · Calligraphy', family: 'cursive, "Brush Script MT", sans-serif' },
  { id: 'arial', name: '06 · Arial', family: 'Arial, Helvetica, sans-serif' },
  { id: 'verdana', name: '07 · Verdana', family: 'Verdana, Geneva, sans-serif' },
  { id: 'tahoma', name: '08 · Tahoma', family: 'Tahoma, Geneva, sans-serif' },
  { id: 'trebuchet', name: '09 · Trebuchet', family: '"Trebuchet MS", sans-serif' },
  { id: 'gill', name: '10 · Gill Sans', family: '"Gill Sans", "Gill Sans MT", sans-serif' },
  { id: 'optima', name: '11 · Optima', family: 'Optima, "Segoe UI", sans-serif' },
  { id: 'futura', name: '12 · Geometric', family: 'Futura, "Century Gothic", sans-serif' },
  { id: 'rounded', name: '13 · Rounded', family: '"Arial Rounded MT Bold", "Trebuchet MS", sans-serif' },
  { id: 'narrow', name: '14 · Condensed', family: '"Arial Narrow", "Roboto Condensed", sans-serif' },
  { id: 'georgia', name: '15 · Georgia Editorial', family: 'Georgia, serif' },
  { id: 'times', name: '16 · Times', family: '"Times New Roman", Times, serif' },
  { id: 'palatino', name: '17 · Palatino', family: 'Palatino, "Book Antiqua", serif' },
  { id: 'garamond', name: '18 · Garamond', family: 'Garamond, "EB Garamond", serif' },
  { id: 'baskerville', name: '19 · Baskerville', family: 'Baskerville, "Times New Roman", serif' },
  { id: 'didot', name: '20 · Didot', family: 'Didot, "Bodoni MT", serif' },
  { id: 'rockwell', name: '21 · Slab Serif', family: 'Rockwell, "Roboto Slab", serif' },
  { id: 'consolas', name: '22 · Consolas', family: 'Consolas, "Courier New", monospace' },
  { id: 'courier', name: '23 · Courier', family: '"Courier New", Courier, monospace' },
  { id: 'monaco', name: '24 · Monaco', family: 'Monaco, "Lucida Console", monospace' },
  { id: 'lucida', name: '25 · Lucida', family: '"Lucida Console", "Lucida Sans Typewriter", monospace' },
  { id: 'comic', name: '26 · Comic', family: '"Comic Sans MS", "Comic Sans", cursive' },
  { id: 'script', name: '27 · Script', family: '"Segoe Script", "Brush Script MT", cursive' },
  { id: 'zapf', name: '28 · Decorative Script', family: '"Apple Chancery", "URW Chancery L", cursive' },
  { id: 'fantasy', name: '29 · Fantasy', family: 'Papyrus, Herculanum, fantasy' },
  { id: 'emoji', name: '30 · Emoji-friendly', family: 'system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif' },
  { id: 'math', name: '31 · Math & Symbols', family: '"Cambria Math", "STIX Two Math", "DejaVu Sans", serif' },
  { id: 'cjk', name: '32 · CJK Fallback', family: '"Yu Gothic", "Meiryo", "Noto Sans CJK JP", sans-serif' },
  { id: 'arabic', name: '33 · Arabic Fallback', family: '"Noto Naskh Arabic", "Traditional Arabic", Tahoma, serif' },
  { id: 'devanagari', name: '34 · Indic Fallback', family: '"Nirmala UI", "Noto Sans Devanagari", sans-serif' },
  { id: 'symbol', name: '35 · Symbol Fallback', family: '"Segoe UI Symbol", "DejaVu Sans", sans-serif' },
];

const SYMBOL_CATEGORIES: SymbolCategory[] = [
  'stars',
  'arrows',
  'hearts',
  'decorative',
  'nature',
  'kaomoji',
  'emoji',
  'gaming',
  'music',
  'weather',
  'food',
  'travel',
];

const TOOL_TO_HASH: Record<Tool, string> = {
  type: '#/creative-studio/text-styles',
  nickname: '#/creative-studio/username',
  symbols: '#/creative-studio/symbols-art',
  bio: '#/creative-studio/bio-caption',
};

function parseToolFromHash(hashValue: string): Tool {
  const hash = hashValue.replace(/^#\/?/, '').toLowerCase();
  if (
    hash === 'creative-studio/username' ||
    hash === 'username-designer' ||
    hash === 'username-generator' ||
    hash === 'pseudo-generator'
  ) {
    return 'nickname';
  }
  if (
    hash === 'creative-studio/symbols-art' ||
    hash === 'text-art-studio' ||
    hash === 'symbols-text-art' ||
    hash === 'symboles-text-art'
  ) {
    return 'symbols';
  }
  if (
    hash === 'creative-studio/bio-caption' ||
    hash === 'bio-caption-studio' ||
    hash === 'bio-studio' ||
    hash === 'caption-studio'
  ) {
    return 'bio';
  }
  return 'type';
}

const SAMPLE_NAMES = ['Nova', 'Aether', 'Vex', 'Lumen', 'Raven', 'Onyx', 'Echo', 'Astra', 'Solenne', 'Kaelith'];

export const CreativeStudioView: React.FC<Props> = ({ initialText, initialContext, onNavigate }) => {
  void onNavigate;

  const [language, setLanguage] = useState<string>(() => getAppSettings().language);
  const [light, setLight] = useState<boolean>(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );

  useEffect(() => {
    return subscribeToSettings((next) => {
      setLanguage(next.language);
      setLight(document.documentElement.classList.contains('light'));
    });
  }, []);

  const canonicalLanguage = resolveCanonicalLocale(language);
  const templateLang = canonicalLanguage === 'fr' || canonicalLanguage === 'ar' ? canonicalLanguage : 'en';
  const t = getCreativeStudioUiCopy(canonicalLanguage);
  const insightLabels = useMemo(() => getNameInsightSectionLabels(canonicalLanguage), [canonicalLanguage]);
  const dir = getTextDirection(language);

  const [tool, setTool] = useState<Tool>(() =>
    typeof window !== 'undefined' ? parseToolFromHash(window.location.hash) : 'type'
  );

  useEffect(() => {
    const syncFromHash = () => {
      const nextHash = window.location.hash;
      if (
        nextHash.includes('creative-studio') ||
        nextHash.includes('style-studio') ||
        nextHash.includes('username') ||
        nextHash.includes('pseudo') ||
        nextHash.includes('text-art') ||
        nextHash.includes('symbols') ||
        nextHash.includes('bio') ||
        nextHash.includes('caption')
      ) {
        setTool(parseToolFromHash(nextHash));
      }
    };
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const selectTool = (nextTool: Tool) => {
    setTool(nextTool);
    if (typeof window !== 'undefined') {
      const targetHash = TOOL_TO_HASH[nextTool];
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    }
  };

  // Shared design state
  const [name, setName] = useState<string>(initialContext?.name || initialText || 'NameForge');
  const [activeStudioContext, setActiveStudioContext] = useState<CreativeStudioTransferContext | undefined>(initialContext);
  useEffect(() => {
    setName(initialContext?.name || initialText || 'NameForge');
  }, [initialText, initialContext?.name]);

  const [styleId, setStyleId] = useState<string>(initialContext?.styleId || 'bold-sans');
  const [effectId, setEffectId] = useState<string>(initialContext?.effectId ?? '');
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');

  // Color & palette state (hydrated when Name Insight transfers a brand brief)
  const [colorMode, setColorMode] = useState<'auto' | 'custom'>(() =>
    initialContext?.palette && initialContext.palette.length > 0 ? 'custom' : 'auto'
  );
  const [textColor, setTextColor] = useState<string>(() =>
    isValidHexColor(initialContext?.palette?.[0])
      ? normalizeHexColor(initialContext!.palette[0])
      : '#38bdf8'
  );
  const [secondaryColor, setSecondaryColor] = useState<string>(() =>
    isValidHexColor(initialContext?.palette?.[1])
      ? normalizeHexColor(initialContext!.palette[1])
      : '#8b5cf6'
  );
  const [accentColor, setAccentColor] = useState<string>(() =>
    isValidHexColor(initialContext?.palette?.[3])
      ? normalizeHexColor(initialContext!.palette[3])
      : isValidHexColor(initialContext?.palette?.[1])
        ? normalizeHexColor(initialContext!.palette[1])
        : '#fbbf24'
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(() =>
    isValidHexColor(initialContext?.palette?.[2])
      ? normalizeHexColor(initialContext!.palette[2])
      : '#0b1220'
  );
  const [useCustomBg, setUseCustomBg] = useState<boolean>(() =>
    Boolean(isValidHexColor(initialContext?.palette?.[2]))
  );
  const [useGradient, setUseGradient] = useState<boolean>(() =>
    Boolean(
      initialContext?.palette &&
        initialContext.palette.length >= 2 &&
        initialContext.palette[0] !== initialContext.palette[1]
    )
  );

  // Extended Typography Canvas state
  const [fontId, setFontId] = useState<string>(() => {
    const scriptFont = resolveFontIdForScript(initialContext?.name || initialText);
    if (scriptFont && FONT_OPTIONS.some((f) => f.id === scriptFont)) {
      return scriptFont;
    }
    if (initialContext?.fontId && FONT_OPTIONS.some((f) => f.id === initialContext.fontId)) {
      return initialContext.fontId;
    }
    const langFont = resolveFontIdForLanguage(initialContext?.language);
    if (langFont && FONT_OPTIONS.some((f) => f.id === langFont)) {
      return langFont;
    }
    return FONT_OPTIONS[0].id;
  });

  const applyPaletteColors = (palette: string[]) => {
    const clean = palette.filter((c) => isValidHexColor(c)).map((c) => normalizeHexColor(c));
    if (clean.length === 0) return;
    setColorMode('custom');
    setTextColor(clean[0]);
    setSecondaryColor(clean[1] || clean[0]);
    setAccentColor(clean[3] || clean[1] || clean[0]);
    if (clean[2]) {
      setBackgroundColor(clean[2]);
      setUseCustomBg(true);
    }
    setUseGradient(Boolean(clean[1] && clean[1] !== clean[0]));
  };

  useEffect(() => {
    if (!initialContext) {
      setActiveStudioContext(undefined);
      return;
    }
    setActiveStudioContext(initialContext);
    setName(initialContext.name || 'NameForge');
    if (initialContext.styleId && UNICODE_STYLES.some((s) => s.id === initialContext.styleId)) {
      setStyleId(initialContext.styleId);
    }
    setEffectId(initialContext.effectId ?? '');
    const scriptFont = resolveFontIdForScript(initialContext.name);
    if (scriptFont && FONT_OPTIONS.some((f) => f.id === scriptFont)) {
      setFontId(scriptFont);
    } else if (initialContext.fontId && FONT_OPTIONS.some((f) => f.id === initialContext.fontId)) {
      setFontId(initialContext.fontId);
    } else {
      const langFont = resolveFontIdForLanguage(initialContext.language);
      if (langFont && FONT_OPTIONS.some((f) => f.id === langFont)) {
        setFontId(langFont);
      }
    }
    if (initialContext.palette && initialContext.palette.length > 0) {
      applyPaletteColors(initialContext.palette);
    }
    setTool('type');
  }, [initialContext]);
  const [textureId, setTextureId] = useState<string>(TEXTURE_FILLS[0].id);
  const [canvasFontSize, setCanvasFontSize] = useState<number>(48);
  const [letterSpacing, setLetterSpacing] = useState<number>(2);
  const [isTransparentBg, setIsTransparentBg] = useState<boolean>(true);
  const [exportScale, setExportScale] = useState<number>(2);
  const [batchQuery, setBatchQuery] = useState<string>('');
  const [batchCategory, setBatchCategory] = useState<UnicodeStyleFilterCategory>('all');
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Nicknames state
  const [nickStyle, setNickStyle] = useState<UsernameStyle>('gaming');
  const [minLen, setMinLen] = useState<number>(3);
  const [maxLen, setMaxLen] = useState<number>(18);
  const [nickPrefix, setNickPrefix] = useState<string>('');
  const [nickSuffix, setNickSuffix] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Symbols state
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>(() => readTextArtFavorites());
  useEffect(() => {
    saveTextArtFavorites(favorites);
  }, [favorites]);

  // Bio & Captions state
  const [bioKind, setBioKind] = useState<'bio' | 'caption'>('bio');
  const [bioCategory, setBioCategory] = useState<string>('all');
  const [bio, setBio] = useState<string>('');
  const bioTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Saved designs & status notice
  const [notice, setNotice] = useState<string>('');
  const noticeTimerRef = useRef<number | null>(null);
  const [saved, setSaved] = useState<SavedDesign[]>(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('nameforge.unified-designs.v1') || '[]');
      return Array.isArray(parsed)
        ? parsed.filter(
            (v): v is SavedDesign =>
              Boolean(v) && typeof v.id === 'string' && typeof v.name === 'string' && typeof v.output === 'string'
          )
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nameforge.unified-designs.v1', JSON.stringify(saved));
    } catch {
      // Ignore storage quota errors
    }
  }, [saved]);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  const notify = (msg: string) => {
    setNotice(msg);
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(''), 1800);
  };

  const handleCopy = async (text: string, customMessage?: string) => {
    const ok = await copyToClipboard(text);
    notify(ok ? customMessage || t.copied : t.copyFailed);
  };

  const style = UNICODE_STYLES.find((v) => v.id === styleId) || UNICODE_STYLES[0];
  const effect = VISUAL_EFFECTS.find((v) => v.id === effectId);
  const fontOption = FONT_OPTIONS.find((f) => f.id === fontId) || FONT_OPTIONS[0];
  const transformedCore = style.transform(name || '');
  const output = prefix + transformedCore + suffix;
  const activeOutput = tool === 'bio' ? bio : output;

  const studioColorConfig: StudioColorConfig = useMemo(
    () => ({
      useCustomColors: colorMode === 'custom',
      textColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      useCustomBg,
      useGradient,
    }),
    [colorMode, textColor, secondaryColor, accentColor, backgroundColor, useCustomBg, useGradient]
  );

  const resolvedColors = useMemo(
    () => resolveStudioColors(effect, light, studioColorConfig),
    [effect, light, studioColorConfig]
  );

  const contrastInfo = useMemo(
    () => getContrastStatus(resolvedColors.primaryTextColor, resolvedColors.stageBgColor),
    [resolvedColors.primaryTextColor, resolvedColors.stageBgColor]
  );

  const symbols = useMemo(
    () =>
      filterTextArtItems(
        TEXT_ART_ITEMS,
        query,
        category as SymbolCategory | 'all',
        favorites,
        favoritesOnly
      ),
    [category, query, favorites, favoritesOnly]
  );

  const visibleBatchStyles = useMemo(
    () => filterUnicodeStyles(UNICODE_STYLES, batchQuery, batchCategory),
    [batchQuery, batchCategory]
  );

  const templates = useMemo(() => {
    const list = getBioCaptionTemplates(templateLang, bioKind);
    return bioCategory === 'all' ? list : list.filter((item) => item.category === bioCategory);
  }, [templateLang, bioKind, bioCategory]);

  const usernameValidation = useMemo(
    () => validateUsername(name || '', minLen, maxLen),
    [name, minLen, maxLen]
  );

  // Render live HD export canvas synchronized with preview colors and decorations
  useEffect(() => {
    if (tool !== 'type' || !canvasRef.current) return;
    renderStyledTextToCanvas(canvasRef.current, {
      text: name ? transformedCore : 'NameForge',
      prefix: name ? prefix : '',
      suffix: name ? suffix : '',
      fontSize: canvasFontSize,
      fontFamily: fontOption.family,
      letterSpacing,
      effectId: effect ? effect.id : '',
      textureId,
      isTransparentBg,
      scale: exportScale,
      colors: studioColorConfig,
      isLightTheme: light,
    });
  }, [
    tool,
    name,
    transformedCore,
    prefix,
    suffix,
    canvasFontSize,
    fontOption.family,
    letterSpacing,
    effect,
    textureId,
    isTransparentBg,
    exportScale,
    studioColorConfig,
    light,
  ]);

  const applyNick = (value: string) => {
    setName(value);
    setPrefix('');
    setSuffix('');
    setStyleId('bold-sans');
    setEffectId('');
    selectTool('type');
  };

  const saveDesign = () => {
    const snapshot: SavedDesign = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      output: activeOutput,
      tool,
      styleId,
      effectId,
      prefix,
      suffix,
      bio,
      bioKind,
      nickStyle,
      fontId,
      textureId,
      colorMode,
      textColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      useCustomBg,
      useGradient,
    };
    setSaved((prev) => [snapshot, ...prev].slice(0, 25));
    notify(t.save);
  };

  const restoreDesign = (snapshot: SavedDesign) => {
    setName(snapshot.name);
    selectTool(snapshot.tool || 'type');
    setStyleId(snapshot.styleId || 'bold-sans');
    setEffectId(snapshot.effectId || '');
    setPrefix(snapshot.prefix || '');
    setSuffix(snapshot.suffix || '');
    setBio(snapshot.bio || '');
    setBioKind(snapshot.bioKind || 'bio');
    setNickStyle(snapshot.nickStyle || 'gaming');
    if (snapshot.fontId) setFontId(snapshot.fontId);
    if (snapshot.textureId) setTextureId(snapshot.textureId);
    setColorMode(snapshot.colorMode || 'auto');
    if (snapshot.textColor && isValidHexColor(snapshot.textColor)) setTextColor(snapshot.textColor);
    if (snapshot.secondaryColor && isValidHexColor(snapshot.secondaryColor)) setSecondaryColor(snapshot.secondaryColor);
    if (snapshot.accentColor && isValidHexColor(snapshot.accentColor)) setAccentColor(snapshot.accentColor);
    if (snapshot.backgroundColor && isValidHexColor(snapshot.backgroundColor)) setBackgroundColor(snapshot.backgroundColor);
    setUseCustomBg(Boolean(snapshot.useCustomBg));
    setUseGradient(snapshot.useGradient ?? true);
  };

  const resetColorsToAuto = () => {
    setColorMode('auto');
    setUseCustomBg(false);
    setUseGradient(true);
    setTextColor('#38bdf8');
    setSecondaryColor('#8b5cf6');
    setAccentColor('#fbbf24');
    setBackgroundColor(light ? '#ffffff' : '#0b1220');
  };

  const resetStudio = () => {
    setName('');
    setPrefix('');
    setSuffix('');
    setBio('');
    setStyleId('bold-sans');
    setEffectId('');
    setFontId(FONT_OPTIONS[0].id);
    setTextureId(TEXTURE_FILLS[0].id);
    setSelectedBatchIds([]);
    resetColorsToAuto();
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleBatchSelect = (id: string) => {
    setSelectedBatchIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const insertSeparatorAtCursor = (separator: string) => {
    const textarea = bioTextareaRef.current;
    if (!textarea) {
      setBio((prev) => prev + (prev ? '\n' : '') + separator);
      return;
    }
    const start = textarea.selectionStart ?? bio.length;
    const end = textarea.selectionEnd ?? bio.length;
    const prefixNewline = start > 0 && bio[start - 1] !== '\n' ? '\n' : '';
    const next = insertAtTextSelection(bio, start, end, prefixNewline + separator + '\n');
    setBio(next.value);
    window.requestAnimationFrame(() => {
      if (bioTextareaRef.current) {
        bioTextareaRef.current.focus();
        bioTextareaRef.current.setSelectionRange(next.cursor, next.cursor);
      }
    });
  };

  const exportTxt = () => {
    const url = URL.createObjectURL(new Blob([activeOutput], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'nameforge-design.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const tools: [Tool, string, React.ElementType][] = [
    ['type', t.type, Type],
    ['nickname', t.nick, Dices],
    ['symbols', t.symbols, Shapes],
    ['bio', t.bio, FileText],
  ];

  const bioCharCount = countBioCaptionCharacters(bio);
  const bioLineCount = countBioCaptionLines(bio);
  const bioCategories = ['all', 'personal', 'creator', 'business', 'minimal', 'aesthetic'];

  const previewStageStyle: React.CSSProperties = {
    backgroundColor: resolvedColors.stageBgColor,
  };

  const previewContent = tool === 'bio' ? bio : name ? output : '';

  const previewCoreTextStyle: React.CSSProperties =
    tool === 'bio'
      ? {
          color: colorMode === 'custom' ? resolvedColors.primaryTextColor : effect ? '#f8fafc' : light ? '#0f172a' : '#f8fafc',
        }
      : {
          fontFamily: fontOption.family,
          letterSpacing: `${letterSpacing}px`,
          textShadow: resolvedColors.textShadowCSS,
          ...(resolvedColors.usesGradient
            ? {
                backgroundImage: `linear-gradient(135deg, ${resolvedColors.gradientStops.join(', ')})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }
            : {
                color: resolvedColors.primaryTextColor,
                WebkitTextFillColor: resolvedColors.primaryTextColor,
              }),
        };

  return (
    <section dir={dir} className="nf-page nf-page-layout nf-creative-studio py-7 sm:py-9">
      <div className="nf-container">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="nf-studio-title-block min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--nf-primary)]">
              {t.eyebrow}
            </p>
            <h1 className="mt-1.5 text-3xl font-black tracking-tight text-[var(--nf-ink)] sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-[var(--nf-muted)]">{t.subtitle}</p>
          </div>

          <div className="nf-studio-header-actions flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => saveAppSettings({ theme: light ? 'dark' : 'light' })}
              aria-label={light ? t.dark : t.light}
              className="nf-btn-secondary inline-flex h-10 w-10 items-center justify-center p-0 cursor-pointer"
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              type="button"
              onClick={resetStudio}
              className="nf-btn-secondary inline-flex h-10 items-center gap-2 px-3.5 text-sm cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>{t.reset}</span>
            </button>
            <button
              type="button"
              onClick={saveDesign}
              className="nf-btn-primary inline-flex h-10 items-center gap-2 px-4 text-sm cursor-pointer"
            >
              <Save size={15} />
              <span>{t.save}</span>
            </button>
          </div>
        </header>

        {/* Shared Primary Name Input */}
        <div className="nf-surface nf-studio-input-card mb-5 p-4 sm:p-5">
          <label
            htmlFor="designer-name"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--nf-primary)]"
          >
            {t.name}
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <input
              id="designer-name"
              data-testid="unified-name-input"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.placeholder}
              className="nf-input min-w-0 flex-1 px-4 py-2.5 text-lg font-semibold"
            />
            <button
              type="button"
              onClick={() => {
                const candidates = SAMPLE_NAMES.filter((sample) => sample !== name);
                const pool = candidates.length > 0 ? candidates : SAMPLE_NAMES;
                setName(pool[Math.floor(Math.random() * pool.length)]);
              }}
              className="nf-btn-random inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm cursor-pointer"
            >
              <Dices size={16} aria-hidden="true" />
              <span>{t.random}</span>
            </button>
          </div>
        </div>

        {/* Transferred Brand Visual Brief from Name Insight */}
        {activeStudioContext && (
          <div
            data-testid="studio-transferred-context"
            className="nf-surface mb-5 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--nf-border)] pb-3">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--nf-primary)]">
                  {insightLabels.studioContext.transferredTitle}
                </p>
                <p className="mt-0.5 text-xs text-[var(--nf-muted)]">
                  {[
                    activeStudioContext.sourceCategoryLabel,
                    activeStudioContext.visualDirectionLabel ||
                      (activeStudioContext.archetype ? insightLabels.archetypeLabels[activeStudioContext.archetype] : null),
                    activeStudioContext.personality?.length
                      ? activeStudioContext.personality
                          .map((trait) => insightLabels.personalityLabels[trait])
                          .join(' · ')
                      : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStudioContext(undefined)}
                aria-label={insightLabels.studioContext.dismiss}
                className="rounded-lg p-1.5 text-[var(--nf-muted)] hover:bg-[var(--nf-surface-muted)] hover:text-[var(--nf-ink)] cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[var(--nf-muted)]">
                  {insightLabels.studioContext.paletteLabel}:
                </span>
                {activeStudioContext.palette.map((hex, index) => (
                  <button
                    key={`${hex}-${index}`}
                    type="button"
                    onClick={() => {
                      setColorMode('custom');
                      if (index === 0) setTextColor(normalizeHexColor(hex));
                      else if (index === 1) {
                        setSecondaryColor(normalizeHexColor(hex));
                        setUseGradient(true);
                      } else if (index === 2) {
                        setBackgroundColor(normalizeHexColor(hex));
                        setUseCustomBg(true);
                      } else {
                        setAccentColor(normalizeHexColor(hex));
                      }
                      void handleCopy(hex, `${hex} · ${t.paletteAppliedNotice}`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--nf-border)] bg-[var(--nf-surface-muted)] px-2.5 py-1 text-xs font-mono font-semibold text-[var(--nf-ink)] hover:border-[var(--nf-primary)] cursor-pointer"
                    title={`${insightLabels.copyHex}: ${hex}`}
                  >
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-sm border border-black/15 dark:border-white/15"
                      style={{ backgroundColor: hex }}
                    />
                    <span>{hex}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    applyPaletteColors(activeStudioContext.palette);
                    notify(t.paletteAppliedNotice);
                  }}
                  className="nf-btn-secondary px-2.5 py-1 text-xs cursor-pointer"
                >
                  {t.applyFullPalette}
                </button>
              </div>

              {activeStudioContext.slogan && (
                <button
                  type="button"
                  onClick={() => {
                    setBio(activeStudioContext.slogan || '');
                    selectTool('bio');
                    notify(insightLabels.studioContext.sloganApplied);
                  }}
                  className="nf-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs cursor-pointer"
                >
                  <FileText size={13} />
                  <span>{insightLabels.studioContext.applySlogan}</span>
                </button>
              )}
            </div>
          </div>
        )}

        <div className="nf-studio-workspace">
          {/* Left Navigation & Quick Presets */}
          <aside className="nf-surface nf-studio-tools p-3.5" aria-label={t.tools}>
            <p className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--nf-subtle)]">
              {t.tools}
            </p>
            <nav aria-label={t.tools} className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
              {tools.map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectTool(id)}
                  aria-pressed={tool === id}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-start text-sm font-semibold transition-colors cursor-pointer ${
                    tool === id
                      ? 'nf-btn-primary border-transparent'
                      : 'text-[var(--nf-muted)] hover:bg-[var(--nf-surface-muted)] hover:text-[var(--nf-ink)]'
                  }`}
                >
                  <Icon size={17} className="shrink-0" />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-5 border-t border-[var(--nf-border)] pt-4">
              <p className="px-1 text-[10px] font-bold uppercase tracking-widest text-[var(--nf-subtle)]">
                {t.presetsHeading}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setStyleId(preset.style);
                      setEffectId(preset.effect);
                      setPrefix(preset.prefix);
                      setSuffix(preset.suffix);
                      selectTool('type');
                    }}
                    className="nf-btn-secondary px-2 py-2 text-xs cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Canvas & Active Tool Workspace */}
          <div className="nf-studio-canvas space-y-4">
            {/* Live Preview Card */}
            <section className="nf-surface nf-studio-preview overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--nf-border)] px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--nf-primary)]">
                  {t.preview}
                </p>
                {tool !== 'bio' && effect && (
                  <span className="text-xs font-medium text-[var(--nf-muted)]">{effect.name}</span>
                )}
              </div>

              <div
                data-testid="designer-live-preview"
                role="region"
                aria-label={t.preview}
                aria-live="polite"
                aria-atomic="true"
                className="nf-studio-preview-stage flex items-center justify-center break-words p-6 text-center text-3xl font-black sm:p-10 sm:text-5xl"
                style={previewStageStyle}
              >
                {previewContent ? (
                  tool === 'bio' ? (
                    <span className="whitespace-pre-wrap" style={previewCoreTextStyle}>
                      {bio}
                    </span>
                  ) : (
                    <span
                      className="whitespace-pre-wrap"
                      style={{ fontFamily: fontOption.family, letterSpacing: `${letterSpacing}px` }}
                    >
                      {prefix && (
                        <span
                          data-testid="preview-prefix"
                          style={{ color: resolvedColors.accentColor }}
                        >
                          {prefix}
                        </span>
                      )}
                      <span data-testid="preview-core" style={previewCoreTextStyle}>
                        {transformedCore}
                      </span>
                      {suffix && (
                        <span
                          data-testid="preview-suffix"
                          style={{ color: resolvedColors.accentColor }}
                        >
                          {suffix}
                        </span>
                      )}
                    </span>
                  )
                ) : (
                  <span className="text-base font-normal text-[var(--nf-muted)]">{t.empty}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5 border-t border-[var(--nf-border)] p-3.5">
                <button
                  type="button"
                  onClick={() => void handleCopy(activeOutput)}
                  className="nf-btn-primary inline-flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-sm cursor-pointer"
                >
                  <Copy size={15} />
                  <span>{t.copy}</span>
                </button>
                <button
                  type="button"
                  onClick={exportTxt}
                  className="nf-btn-secondary inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm cursor-pointer"
                >
                  <Download size={15} />
                  <span>{t.export}</span>
                </button>
              </div>
            </section>

            {/* Typography Extended Workspace: Colors & Palette, Fonts, Textures, HD PNG/SVG/CSS Export + Batch Unicode Explorer */}
            {tool === 'type' && (
              <div className="space-y-4">
                <section className="nf-surface p-4 sm:p-5" aria-label={t.colorsSectionTitle}>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="flex items-center gap-2 text-base font-bold text-[var(--nf-ink)]">
                      <Palette size={17} className="text-[var(--nf-primary)]" aria-hidden="true" />
                      <span>{t.colorsSectionTitle}</span>
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-md border px-2 py-0.5 text-[11px] font-bold tabular-nums"
                        style={
                          contrastInfo.level === 'low'
                            ? {
                                backgroundColor: 'var(--nf-warning-bg)',
                                borderColor: 'var(--nf-warning-border)',
                                color: 'var(--nf-warning)',
                              }
                            : {
                                backgroundColor: 'var(--nf-success-bg)',
                                borderColor: 'var(--nf-success-border)',
                                color: 'var(--nf-success)',
                              }
                        }
                      >
                        {t.contrastLabel}: {contrastInfo.ratio}:1 · {contrastInfo.level}
                      </span>
                      <button
                        type="button"
                        onClick={resetColorsToAuto}
                        className="nf-btn-secondary px-2.5 py-1 text-xs cursor-pointer"
                      >
                        {t.resetColors}
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      aria-pressed={colorMode === 'auto'}
                      onClick={() => setColorMode('auto')}
                      className={`px-3 py-1.5 text-xs cursor-pointer ${
                        colorMode === 'auto' ? 'nf-btn-primary' : 'nf-btn-secondary'
                      }`}
                    >
                      {t.colorModeAuto}
                    </button>
                    <button
                      type="button"
                      aria-pressed={colorMode === 'custom'}
                      onClick={() => setColorMode('custom')}
                      className={`px-3 py-1.5 text-xs cursor-pointer ${
                        colorMode === 'custom' ? 'nf-btn-primary' : 'nf-btn-secondary'
                      }`}
                    >
                      {t.colorModeCustom}
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="nf-panel flex items-center justify-between gap-2 p-2.5 text-xs font-semibold text-[var(--nf-ink)]">
                      <span>{t.primaryTextColorLabel}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[var(--nf-muted)]">{textColor}</span>
                        <input
                          type="color"
                          aria-label={t.primaryTextColorLabel}
                          value={textColor}
                          onChange={(e) => {
                            setColorMode('custom');
                            setTextColor(e.target.value);
                          }}
                          className="h-7 w-9 cursor-pointer rounded border border-[var(--nf-border)] bg-transparent p-0"
                        />
                      </span>
                    </label>

                    <label className="nf-panel flex items-center justify-between gap-2 p-2.5 text-xs font-semibold text-[var(--nf-ink)]">
                      <span>{t.secondaryColorLabel}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[var(--nf-muted)]">{secondaryColor}</span>
                        <input
                          type="color"
                          aria-label={t.secondaryColorLabel}
                          value={secondaryColor}
                          onChange={(e) => {
                            setColorMode('custom');
                            setSecondaryColor(e.target.value);
                            setUseGradient(true);
                          }}
                          className="h-7 w-9 cursor-pointer rounded border border-[var(--nf-border)] bg-transparent p-0"
                        />
                      </span>
                    </label>

                    <label className="nf-panel flex items-center justify-between gap-2 p-2.5 text-xs font-semibold text-[var(--nf-ink)]">
                      <span>{t.accentColorLabel}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[var(--nf-muted)]">{accentColor}</span>
                        <input
                          type="color"
                          aria-label={t.accentColorLabel}
                          value={accentColor}
                          onChange={(e) => {
                            setColorMode('custom');
                            setAccentColor(e.target.value);
                          }}
                          className="h-7 w-9 cursor-pointer rounded border border-[var(--nf-border)] bg-transparent p-0"
                        />
                      </span>
                    </label>

                    <label className="nf-panel flex items-center justify-between gap-2 p-2.5 text-xs font-semibold text-[var(--nf-ink)]">
                      <span>{t.backgroundColorLabel}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[var(--nf-muted)]">{backgroundColor}</span>
                        <input
                          type="color"
                          aria-label={t.backgroundColorLabel}
                          value={backgroundColor}
                          onChange={(e) => {
                            setUseCustomBg(true);
                            setBackgroundColor(e.target.value);
                          }}
                          className="h-7 w-9 cursor-pointer rounded border border-[var(--nf-border)] bg-transparent p-0"
                        />
                      </span>
                    </label>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-ink)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useGradient}
                        onChange={(e) => {
                          setColorMode('custom');
                          setUseGradient(e.target.checked);
                        }}
                        className="h-4 w-4 accent-[var(--nf-primary)]"
                      />
                      <span>{t.gradientToggleLabel}</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-ink)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCustomBg}
                        onChange={(e) => setUseCustomBg(e.target.checked)}
                        className="h-4 w-4 accent-[var(--nf-primary)]"
                      />
                      <span>{t.customBgToggleLabel}</span>
                    </label>
                  </div>

                  {contrastInfo.level === 'low' && (
                    <p
                      role="note"
                      className="mt-2.5 text-xs font-medium"
                      style={{ color: 'var(--nf-warning)' }}
                    >
                      {t.contrastLowTip}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[var(--nf-border)] pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--nf-subtle)] me-1">
                      {t.palettePresetsLabel}:
                    </span>
                    {STUDIO_COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => {
                          setColorMode('custom');
                          setTextColor(preset.textColor);
                          setSecondaryColor(preset.secondaryColor);
                          setAccentColor(preset.accentColor);
                          setBackgroundColor(preset.backgroundColor);
                          setUseCustomBg(true);
                          setUseGradient(preset.useGradient);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--nf-border)] bg-[var(--nf-surface-muted)] px-2.5 py-1 text-xs font-semibold text-[var(--nf-ink)] hover:border-[var(--nf-primary)] cursor-pointer"
                      >
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-black/20"
                          style={{
                            background: preset.useGradient
                              ? `linear-gradient(135deg, ${preset.textColor}, ${preset.secondaryColor})`
                              : preset.textColor,
                          }}
                        />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="nf-surface p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="flex items-center gap-2 text-base font-bold text-[var(--nf-ink)]">
                      <Layers size={17} className="text-[var(--nf-primary)]" />
                      <span>{t.canvasSectionTitle}</span>
                    </h2>
                    <span className="text-xs text-[var(--nf-muted)]">
                      {getStudioLabel(language, 'exportTab')}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-semibold text-[var(--nf-muted)]">
                      {t.fontStackLabel}
                      <select
                        value={fontId}
                        onChange={(e) => setFontId(e.target.value)}
                        className="nf-input mt-1.5 w-full px-3 text-sm"
                      >
                        {FONT_OPTIONS.map((font) => (
                          <option key={font.id} value={font.id}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-xs font-semibold text-[var(--nf-muted)]">
                      {getStudioLabel(language, 'textureMask')}
                      <select
                        value={textureId}
                        onChange={(e) => setTextureId(e.target.value)}
                        className="nf-input mt-1.5 w-full px-3 text-sm"
                      >
                        {TEXTURE_FILLS.map((tex) => (
                          <option key={tex.id} value={tex.id}>
                            {tex.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block text-xs font-semibold text-[var(--nf-muted)]">
                      {t.outlineSize}: {canvasFontSize}px
                      <input
                        type="range"
                        min={24}
                        max={84}
                        value={canvasFontSize}
                        onChange={(e) => setCanvasFontSize(Number(e.target.value))}
                        className="mt-2 block w-full accent-[var(--nf-primary)]"
                      />
                    </label>

                    <label className="block text-xs font-semibold text-[var(--nf-muted)]">
                      {t.letterSpacingLabel}: {letterSpacing}px
                      <input
                        type="range"
                        min={0}
                        max={12}
                        value={letterSpacing}
                        onChange={(e) => setLetterSpacing(Number(e.target.value))}
                        className="mt-2 block w-full accent-[var(--nf-primary)]"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--nf-border)] pt-4">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-ink)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTransparentBg}
                        onChange={(e) => setIsTransparentBg(e.target.checked)}
                        className="h-4 w-4 accent-[var(--nf-primary)]"
                      />
                      <span>{getStudioLabel(language, 'transparentBg')}</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-muted)]">
                      <span>{getStudioLabel(language, 'exportQuality')}</span>
                      <select
                        value={exportScale}
                        onChange={(e) => setExportScale(Number(e.target.value))}
                        className="nf-input px-2.5 py-1 text-xs"
                      >
                        <option value={2}>2x Retina</option>
                        <option value={3}>3x Ultra HD</option>
                      </select>
                    </label>
                  </div>

                  <div className="nf-panel mt-4 flex items-center justify-center overflow-hidden p-3">
                    <canvas
                      ref={canvasRef}
                      className="max-h-40 w-auto object-contain"
                      aria-label={t.canvasSectionTitle}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (canvasRef.current) {
                          downloadCanvasAsPng(canvasRef.current, activeOutput || 'nameforge');
                        }
                      }}
                      className="nf-btn-primary inline-flex items-center gap-2 px-4 py-2 text-xs cursor-pointer"
                    >
                      <Download size={14} />
                      <span>{getStudioLabel(language, 'exportPng')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void handleCopy(
                          generateSvgCode(
                            name ? transformedCore : 'NameForge',
                            canvasFontSize,
                            fontOption.family,
                            effect ? effect.id : '',
                            textureId,
                            isTransparentBg,
                            letterSpacing,
                            {
                              prefix: name ? prefix : '',
                              suffix: name ? suffix : '',
                              colors: studioColorConfig,
                              isLightTheme: light,
                            }
                          ),
                          getStudioLabel(language, 'svgCopied')
                        )
                      }
                      className="nf-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs cursor-pointer"
                    >
                      <Code size={14} />
                      <span>{getStudioLabel(language, 'copySvg')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void handleCopy(
                          generateCssCode(
                            canvasFontSize,
                            fontOption.family,
                            letterSpacing,
                            effect ? effect.id : '',
                            textureId,
                            studioColorConfig,
                            light
                          ),
                          getStudioLabel(language, 'cssCopied')
                        )
                      }
                      className="nf-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs cursor-pointer"
                    >
                      <Code size={14} />
                      <span>{getStudioLabel(language, 'copyCss')}</span>
                    </button>
                  </div>
                </section>

                {/* Batch Unicode Filter & Multi-Copy Explorer */}
                <section className="nf-surface p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-base font-bold text-[var(--nf-ink)]">{t.batchStylesTitle}</h2>
                    {selectedBatchIds.length > 0 && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const joined = UNICODE_STYLES.filter((s) => selectedBatchIds.includes(s.id))
                              .map((s) => `${prefix}${s.transform(name || 'NameForge')}${suffix}`)
                              .join('\n');
                            void handleCopy(joined);
                          }}
                          className="nf-btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs cursor-pointer"
                        >
                          <CheckSquare size={13} />
                          <span>
                            {getStudioLabel(language, 'copySelected')} ({selectedBatchIds.length})
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedBatchIds([])}
                          className="nf-btn-secondary px-2.5 py-1.5 text-xs cursor-pointer"
                        >
                          {getStudioLabel(language, 'clearSelection')}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_180px]">
                    <div className="relative">
                      <input
                        type="text"
                        value={batchQuery}
                        onChange={(e) => setBatchQuery(e.target.value)}
                        placeholder={getStudioLabel(language, 'styleSearchPlaceholder')}
                        aria-label={getStudioLabel(language, 'styleSearchLabel')}
                        className={`nf-input w-full px-3 ${batchQuery ? 'pe-9' : ''} text-sm`}
                      />
                      {batchQuery && (
                        <button
                          type="button"
                          onClick={() => setBatchQuery('')}
                          aria-label={getStudioLabel(language, 'clearInput')}
                          className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[var(--nf-subtle)] hover:text-[var(--nf-ink)] cursor-pointer"
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    <select
                      value={batchCategory}
                      onChange={(e) => setBatchCategory(e.target.value as UnicodeStyleFilterCategory)}
                      aria-label={getStudioLabel(language, 'filterCategory')}
                      className="nf-input px-3 text-sm"
                    >
                      <option value="all">{getStudioLabel(language, 'allCategories')}</option>
                      <option value="formal">Formal</option>
                      <option value="creative">Creative</option>
                      <option value="gothic">Gothic</option>
                      <option value="symbols">Symbols</option>
                      <option value="fun">Fun</option>
                    </select>
                  </div>

                  <div className="mt-3 grid max-h-72 gap-2 overflow-y-auto sm:grid-cols-2">
                    {visibleBatchStyles.map((item) => {
                      const previewText = prefix + item.transform(name || 'NameForge') + suffix;
                      const isBatchChecked = selectedBatchIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="nf-panel flex items-center justify-between gap-2 p-2.5"
                        >
                          <label className="flex min-w-0 flex-1 items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isBatchChecked}
                              onChange={() => toggleBatchSelect(item.id)}
                              className="h-4 w-4 shrink-0 accent-[var(--nf-primary)]"
                            />
                            <span className="min-w-0">
                              <span className="block truncate text-[11px] font-medium text-[var(--nf-muted)]">
                                {item.name}
                              </span>
                              <span className="block truncate text-sm font-semibold text-[var(--nf-ink)]">
                                {previewText}
                              </span>
                            </span>
                          </label>
                          <button
                            type="button"
                            onClick={() => void handleCopy(previewText)}
                            aria-label={`${t.copy}: ${item.name}`}
                            className="nf-btn-secondary shrink-0 px-2.5 py-1.5 text-xs cursor-pointer"
                          >
                            <Copy size={13} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}

            {/* Nicknames Generator */}
            {tool === 'nickname' && (
              <section className="nf-surface p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-[var(--nf-ink)]">{t.nick}</h2>
                  {name && (
                    <span className="text-xs font-medium text-[var(--nf-muted)]">
                      {usernameValidation.valid
                        ? `${t.validHandle} (${usernameValidation.length})`
                        : `${usernameValidation.length} · ${usernameValidation.errors.join(', ')}`}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {(['gaming', 'fantasy', 'minimal', 'elegant'] as UsernameStyle[]).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={nickStyle === v}
                      onClick={() => setNickStyle(v)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize cursor-pointer transition-colors ${
                        nickStyle === v
                          ? 'border-[var(--nf-primary)] bg-[var(--nf-primary-soft)] text-[var(--nf-primary)]'
                          : 'border-[var(--nf-border)] bg-[var(--nf-surface)] text-[var(--nf-muted)] hover:text-[var(--nf-ink)]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="block text-xs font-medium text-[var(--nf-muted)]">
                    {t.minLength}: {minLen}
                    <input
                      type="range"
                      min={2}
                      max={10}
                      value={minLen}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMinLen(val);
                        if (maxLen < val) setMaxLen(val);
                      }}
                      className="mt-1.5 block w-full accent-[var(--nf-primary)]"
                    />
                  </label>
                  <label className="block text-xs font-medium text-[var(--nf-muted)]">
                    {t.maxLength}: {maxLen}
                    <input
                      type="range"
                      min={6}
                      max={30}
                      value={maxLen}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMaxLen(Math.max(val, minLen));
                      }}
                      className="mt-1.5 block w-full accent-[var(--nf-primary)]"
                    />
                  </label>
                  <label className="block text-xs font-medium text-[var(--nf-muted)]">
                    {t.before}
                    <input
                      type="text"
                      value={nickPrefix}
                      onChange={(e) => setNickPrefix(e.target.value)}
                      className="nf-input mt-1 w-full px-2.5 text-xs"
                    />
                  </label>
                  <label className="block text-xs font-medium text-[var(--nf-muted)]">
                    {t.after}
                    <input
                      type="text"
                      value={nickSuffix}
                      onChange={(e) => setNickSuffix(e.target.value)}
                      className="nf-input mt-1 w-full px-2.5 text-xs"
                    />
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSuggestions(
                        generateUsernameSuggestions({
                          baseName: name,
                          style: nickStyle,
                          prefix: nickPrefix,
                          suffix: nickSuffix,
                          minLength: minLen,
                          maxLength: maxLen,
                          quantity: 16,
                        })
                      )
                    }
                    className="nf-btn-primary px-4 py-2 text-sm cursor-pointer"
                  >
                    {t.generate}
                  </button>
                  {suggestions.length > 0 && (
                    <button
                      type="button"
                      onClick={() => void handleCopy(suggestions.join('\n'))}
                      className="nf-btn-secondary px-3.5 py-2 text-sm cursor-pointer"
                    >
                      {t.copyAll}
                    </button>
                  )}
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion}
                      className="nf-panel flex items-center justify-between gap-2 p-3"
                    >
                      <span className="truncate font-semibold text-[var(--nf-ink)]">{suggestion}</span>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => void handleCopy(suggestion)}
                          aria-label={`${t.copy} ${suggestion}`}
                          className="nf-btn-secondary p-1.5 text-xs cursor-pointer"
                        >
                          <Copy size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => applyNick(suggestion)}
                          className="nf-btn-primary px-3 py-1.5 text-xs cursor-pointer"
                        >
                          {t.apply}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {suggestions.length === 0 && (
                  <p className="mt-3 text-sm text-[var(--nf-muted)]">{t.noResults}</p>
                )}
              </section>
            )}

            {/* Bio & Captions Composer */}
            {tool === 'bio' && (
              <section className="nf-surface p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      aria-pressed={bioKind === 'bio'}
                      onClick={() => setBioKind('bio')}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold cursor-pointer ${
                        bioKind === 'bio' ? 'nf-btn-primary' : 'nf-btn-secondary'
                      }`}
                    >
                      {t.bioMode}
                    </button>
                    <button
                      type="button"
                      aria-pressed={bioKind === 'caption'}
                      onClick={() => setBioKind('caption')}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold cursor-pointer ${
                        bioKind === 'caption' ? 'nf-btn-primary' : 'nf-btn-secondary'
                      }`}
                    >
                      {t.captionMode}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {bioCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        aria-pressed={bioCategory === cat}
                        onClick={() => setBioCategory(cat)}
                        className={`rounded-lg border px-2.5 py-1 text-xs capitalize cursor-pointer ${
                          bioCategory === cat
                            ? 'border-[var(--nf-primary)] bg-[var(--nf-primary-soft)] text-[var(--nf-primary)]'
                            : 'border-[var(--nf-border)] text-[var(--nf-muted)]'
                        }`}
                      >
                        {cat === 'all' ? t.allCategories : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <h2 className="mt-4 text-base font-bold text-[var(--nf-ink)]">{t.templates}</h2>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() =>
                        setBio(
                          tpl.content.replace(
                            /\[(?:Name|Nom|Brand name|Nom de la marque|اسم العلامة|product name|nom du produit|اسم المنتج)\]/gi,
                            name || 'NameForge'
                          )
                        )
                      }
                      className="nf-panel p-3 text-start transition-colors hover:border-[var(--nf-primary)] cursor-pointer"
                    >
                      <b className="block text-sm text-[var(--nf-ink)]">{tpl.title}</b>
                      <span className="mt-1 block text-xs text-[var(--nf-muted)]">
                        {tpl.description}
                      </span>
                    </button>
                  ))}
                </div>

                <textarea
                  ref={bioTextareaRef}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  placeholder={t.write}
                  className="nf-input mt-3 w-full p-3 text-sm"
                />

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-medium text-[var(--nf-subtle)] me-1">
                    {t.separator}:
                  </span>
                  {DECORATIVE_SEPARATORS.map((sep) => (
                    <button
                      key={sep}
                      type="button"
                      onClick={() => insertSeparatorAtCursor(sep)}
                      className="nf-btn-secondary px-2.5 py-1 text-xs cursor-pointer"
                    >
                      {sep}
                    </button>
                  ))}
                </div>

                <p className="mt-2.5 text-xs text-[var(--nf-muted)] tabular-nums">
                  {bioCharCount} {t.characters} · {bioLineCount} {t.lines}
                </p>

                <button
                  type="button"
                  onClick={() => void handleCopy(bio)}
                  className="nf-btn-primary mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm cursor-pointer"
                >
                  <Copy size={14} />
                  <span>{t.copy}</span>
                </button>
              </section>
            )}
          </div>

          {/* Right Settings Sidebar (preserving deterministic QA locator order for Effect select and Prefix/Suffix inputs) */}
          <aside className="nf-surface nf-studio-settings p-4" aria-label={t.style}>
            {tool === 'type' && (
              <>
                <h2 className="text-base font-bold text-[var(--nf-ink)]">{t.type}</h2>

                <label className="mt-3 block text-xs font-semibold text-[var(--nf-muted)]">
                  {t.effect}
                  <select
                    value={effectId}
                    onChange={(e) => setEffectId(e.target.value)}
                    className="nf-input mt-1.5 w-full px-3 text-sm"
                  >
                    <option value="">{t.none}</option>
                    {VISUAL_EFFECTS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <label className="text-xs font-semibold text-[var(--nf-muted)]">
                    {t.before}
                    <input
                      value={prefix}
                      onChange={(e) => setPrefix(e.target.value)}
                      className="nf-input mt-1 w-full px-2.5 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-[var(--nf-muted)]">
                    {t.after}
                    <input
                      value={suffix}
                      onChange={(e) => setSuffix(e.target.value)}
                      className="nf-input mt-1 w-full px-2.5 text-sm"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-xs font-semibold text-[var(--nf-muted)]">
                  {t.style}
                </label>
                <div className="mt-2 max-h-[340px] space-y-2 overflow-y-auto pe-1">
                  {UNICODE_STYLES.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setStyleId(v.id)}
                      aria-pressed={styleId === v.id}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl border p-3 text-start transition-colors cursor-pointer ${
                        styleId === v.id
                          ? 'border-[var(--nf-primary)] bg-[var(--nf-primary-soft)] text-[var(--nf-ink)]'
                          : 'border-[var(--nf-border)] bg-[var(--nf-surface)] text-[var(--nf-ink)] hover:border-[var(--nf-primary)]'
                      }`}
                    >
                      <span className="min-w-0">
                        <b className="block text-sm">{v.name}</b>
                        <span className="mt-0.5 block truncate text-xs text-[var(--nf-muted)]">
                          {v.transform(name || 'NameForge')}
                        </span>
                      </span>
                      {styleId === v.id && (
                        <Check size={15} className="shrink-0 text-[var(--nf-primary)]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}

            {tool === 'symbols' && (
              <>
                <h2 className="text-base font-bold text-[var(--nf-ink)]">{t.symbols}</h2>
                <div className="nf-input mt-3 flex items-center gap-2 px-3">
                  <Search size={15} className="shrink-0 text-[var(--nf-subtle)]" />
                  <input
                    aria-label={t.search}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.search}
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-[var(--nf-ink)] outline-none placeholder:text-[var(--nf-subtle)]"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label={getStudioLabel(language, 'clearInput')}
                      className="shrink-0 p-1 rounded-md text-[var(--nf-subtle)] hover:text-[var(--nf-ink)] cursor-pointer"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  )}
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label={t.category}
                  className="nf-input mt-2 w-full px-3 text-sm"
                >
                  <option value="all">{t.allCategories}</option>
                  {SYMBOL_CATEGORIES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  aria-pressed={favoritesOnly}
                  onClick={() => setFavoritesOnly((v) => !v)}
                  className={`mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer ${
                    favoritesOnly
                      ? 'border-[var(--nf-warning-border)] bg-[var(--nf-warning-bg)] text-[var(--nf-warning)]'
                      : 'border-[var(--nf-border)] bg-[var(--nf-surface)] text-[var(--nf-muted)] hover:text-[var(--nf-ink)]'
                  }`}
                >
                  <Star size={14} />
                  <span>
                    {t.favorites} ({favorites.length})
                  </span>
                </button>
                <div className="mt-3 grid max-h-[420px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                  {symbols.map((v) => {
                    const isFav = favorites.includes(v.id);
                    return (
                      <div
                        key={v.id}
                        className="nf-panel flex min-w-0 items-center gap-1 p-1.5"
                      >
                        <button
                          type="button"
                          title={`${t.appendSymbol}: ${v.label}`}
                          onClick={() => setSuffix((s) => s + v.value)}
                          className="min-w-0 flex-1 rounded-lg p-2 text-center text-xl text-[var(--nf-ink)] hover:bg-[var(--nf-primary-soft)] cursor-pointer"
                        >
                          {v.value}
                        </button>
                        <button
                          type="button"
                          aria-label={isFav ? t.unfavorite : t.favorite}
                          aria-pressed={isFav}
                          onClick={() => toggleFavorite(v.id)}
                          className={`rounded-lg p-1.5 cursor-pointer ${
                            isFav
                              ? 'text-[var(--nf-warning)]'
                              : 'text-[var(--nf-subtle)] hover:text-[var(--nf-warning)]'
                          }`}
                        >
                          <Star size={15} fill={isFav ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs text-[var(--nf-muted)]">
                  {symbols.length} {t.symbolCount}
                </p>
                {symbols.length === 0 && (
                  <p className="mt-3 text-sm text-[var(--nf-muted)]">{t.noSymbols}</p>
                )}
              </>
            )}

            {tool === 'nickname' && (
              <p className="text-sm leading-relaxed text-[var(--nf-muted)]">{t.nicknameHelp}</p>
            )}

            {tool === 'bio' && (
              <p className="text-sm leading-relaxed text-[var(--nf-muted)]">{t.bioHelp}</p>
            )}

            <div className="mt-5 border-t border-[var(--nf-border)] pt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--nf-subtle)]">
                {t.saved}
              </h3>
              {saved.length === 0 ? (
                <p className="mt-2 text-xs text-[var(--nf-muted)]">{t.noSaved}</p>
              ) : (
                <div className="mt-2 space-y-2">
                  {saved.slice(0, 6).map((v) => (
                    <div
                      key={v.id}
                      className="nf-panel flex items-center gap-2 p-2"
                    >
                      <button
                        type="button"
                        onClick={() => restoreDesign(v)}
                        title={t.restore}
                        className="min-w-0 flex-1 truncate text-start text-xs font-medium text-[var(--nf-ink)] cursor-pointer"
                      >
                        {v.output || v.name}
                      </button>
                      <button
                        type="button"
                        aria-label={t.deleteDesign}
                        onClick={() => setSaved((s) => s.filter((x) => x.id !== v.id))}
                        className="shrink-0 rounded p-1 text-[var(--nf-subtle)] hover:text-[var(--nf-danger)] cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>

        {notice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-[var(--nf-border-strong)] bg-[var(--nf-ink)] px-4 py-2 text-sm font-semibold text-[var(--nf-page-bg)] shadow-xl"
          >
            {notice}
          </div>
        )}
      </div>
    </section>
  );
};

export default CreativeStudioView;

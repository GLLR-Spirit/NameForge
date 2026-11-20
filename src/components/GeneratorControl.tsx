import React from 'react';
import {
  Sparkles,
  RefreshCw,
  Globe,
  X,
  CheckCircle2,
  Check,
  Info,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { FormatOption, GenderOption, GeneratorId, GenLanguageCode, LengthOption } from '../types';
import { getStyleOptions } from '../data/styles';
import { GEN_LANGUAGES, getAppSettings } from '../services/settings';
import { getTranslations } from '../i18n';
import { getLocalizedStyleLabel } from '../i18n/styleLabels';
import {
  getGeneratorCompatibilityAssessment,
  type CompatibilityLevel,
} from '../services/languageCompatibility';

interface GeneratorControlProps {
  generatorId?: GeneratorId;
  style: string;
  onStyleChange: (s: string) => void;
  length: LengthOption;
  onLengthChange: (l: LengthOption) => void;
  format: FormatOption;
  onFormatChange: (f: FormatOption) => void;
  gender: GenderOption;
  onGenderChange: (g: GenderOption) => void;
  genLanguage?: GenLanguageCode;
  onGenLanguageChange?: (gl: GenLanguageCode) => void;
  quantity?: number;
  onQuantityChange?: (q: number) => void;
  keyword?: string;
  onKeywordChange?: (kw: string) => void;
  onGenerate: () => void;
  isGenerating?: boolean;
}

const QUANTITY_WORD: Record<string, string> = {
  en: 'names', fr: 'noms', es: 'nombres', de: 'Namen', it: 'nomi', pt: 'nomes',
  ar: 'أسماء', tr: 'isim', ja: '個', ko: '개', zh: '个名称', ru: 'имён', hi: 'नाम',
  nl: 'namen', pl: 'nazw', sv: 'namn', vi: 'tên', id: 'nama', th: 'ชื่อ', el: 'ονόματα',
  he: 'שמות', cs: 'jmen', ro: 'nume', da: 'navne', fi: 'nimeä',
  uk: 'імен', bn: 'টি নাম', nb: 'navn',
};

const KEYWORD_COPY: Record<string, { label: string; placeholder: string; clear: string }> = {
  en: { label: 'Inspiration keyword', placeholder: 'Optional inspiration keyword or root (e.g. Aero, Wolf, Luna, Zen, Nova)...', clear: 'Clear keyword' },
  fr: { label: 'Mot-clé d’inspiration', placeholder: 'Mot-clé ou racine d’inspiration optionnel (ex. Aero, Loup, Luna, Zen, Nova)...', clear: 'Effacer le mot-clé' },
  es: { label: 'Palabra clave de inspiración', placeholder: 'Palabra clave o raíz opcional para inspirarte (p. ej., Aero, Lobo, Luna, Zen, Nova)…', clear: 'Borrar palabra clave' },
  de: { label: 'Inspirations-Stichwort', placeholder: 'Optionales Stichwort oder Wortwurzel (z. B. Aero, Wolf, Luna, Zen, Nova)…', clear: 'Stichwort löschen' },
  it: { label: 'Parola chiave di ispirazione', placeholder: 'Parola chiave o radice facoltativa (es. Aero, Lupo, Luna, Zen, Nova)…', clear: 'Cancella parola chiave' },
  pt: { label: 'Palavra-chave de inspiração', placeholder: 'Palavra-chave ou raiz opcional (ex.: Aero, Lobo, Luna, Zen, Nova)…', clear: 'Limpar palavra-chave' },
  ar: { label: 'كلمة مفتاحية للإلهام', placeholder: 'كلمة مفتاحية أو جذر اختياري للإلهام (مثل Aero وLuna وZen وNova)…', clear: 'مسح الكلمة المفتاحية' },
  tr: { label: 'İlham anahtar sözcüğü', placeholder: 'İsteğe bağlı ilham anahtar sözcüğü veya kökü (örn. Aero, Wolf, Luna, Nova)…', clear: 'Anahtar kelimeyi temizle' },
  ja: { label: 'インスピレーションキーワード', placeholder: '任意のキーワードまたは語根（例：Aero、Luna、Zen、Nova）…', clear: 'キーワードをクリア' },
  ko: { label: '영감 키워드', placeholder: '선택 사항 영감 키워드 또는 어근 (예: Aero, Luna, Zen, Nova)…', clear: '키워드 지우기' },
  zh: { label: '灵感关键词', placeholder: '可选的灵感关键词或词根（例如 Aero、Luna、Zen、Nova）…', clear: '清除关键词' },
  ru: { label: 'Ключевое слово', placeholder: 'Необязательное ключевое слово или корень (например, Aero, Luna, Zen, Nova)...', clear: 'Очистить ключевое слово' },
  hi: { label: 'प्रेरणा कीवर्ड', placeholder: 'वैकल्पिक कीवर्ड या मूल शब्द (जैसे Aero, Luna, Zen, Nova)…', clear: 'कीवर्ड हटाएँ' },
  nl: { label: 'Inspiratietrefwoord', placeholder: 'Optioneel trefwoord of woordstam (bijv. Aero, Wolf, Luna, Zen, Nova)…', clear: 'Zoekwoord wissen' },
  pl: { label: 'Słowo kluczowe', placeholder: 'Opcjonalne słowo kluczowe lub rdzeń (np. Aero, Luna, Zen, Nova)…', clear: 'Wyczyść słowo kluczowe' },
  sv: { label: 'Inspirationsord', placeholder: 'Valfritt inspirationsord eller ordstam (t.ex. Aero, Luna, Zen, Nova)…', clear: 'Rensa nyckelord' },
  vi: { label: 'Từ khóa gợi ý', placeholder: 'Từ khóa hoặc gốc từ tùy chọn (ví dụ: Aero, Luna, Zen, Nova)…', clear: 'Xóa từ khóa' },
  id: { label: 'Kata kunci inspirasi', placeholder: 'Kata kunci atau akar kata opsional (mis. Aero, Luna, Zen, Nova)…', clear: 'Hapus kata kunci' },
  th: { label: 'คำหลักสร้างแรงบันดาลใจ', placeholder: 'คำหลักหรือรากศัพท์ (ไม่บังคับ) เช่น Aero, Luna, Zen, Nova…', clear: 'ล้างคำหลัก' },
  el: { label: 'Λέξη-κλειδί έμπνευσης', placeholder: 'Προαιρετική λέξη-κλειδί ή ρίζα (π.χ. Aero, Luna, Zen, Nova)…', clear: 'Εκκαθάριση λέξης-κλειδιού' },
  he: { label: 'מילת מפתח להשראה', placeholder: 'מילת מפתח או שורש אופציונליים (למשל Aero, Luna, Zen, Nova)…', clear: 'נקה מילת מפתח' },
  cs: { label: 'Klíčové slovo', placeholder: 'Volitelné klíčové slovo nebo kořen (např. Aero, Luna, Zen, Nova)…', clear: 'Vymazat klíčové slovo' },
  ro: { label: 'Cuvânt-cheie', placeholder: 'Cuvânt-cheie sau rădăcină opțională (de ex., Aero, Luna, Zen, Nova)…', clear: 'Șterge cuvântul-cheie' },
  da: { label: 'Inspirationsord', placeholder: 'Valgfrit inspirationsord eller ordstamme (f.eks. Aero, Luna, Zen, Nova)…', clear: 'Ryd søgeord' },
  fi: { label: 'Inspiraatiosana', placeholder: 'Valinnainen inspiraatiosana tai vartalo (esim. Aero, Luna, Zen, Nova)…', clear: 'Tyhjennä avainsana' },
  uk: { label: 'Ключове слово', placeholder: 'Необов’язкове слово або корінь (напр. Aero, Wolf, Luna, Zen, Nova)...', clear: 'Очистити ключове слово' },
  bn: { label: 'অনুপ্রেরণার শব্দ', placeholder: 'ঐচ্ছিক অনুপ্রেরণার শব্দ বা মূল (যেমন Aero, Wolf, Luna, Zen, Nova)...', clear: 'কীওয়ার্ড মুছুন' },
  nb: { label: 'Inspirasjonsord', placeholder: 'Valgfritt inspirasjonsord eller stamme (f.eks. Aero, Wolf, Luna, Zen, Nova)...', clear: 'Fjern nøkkelord' },
};

const EXTRA_OPTIONS_COPY: Record<
  string,
  { formatCompound: string; formatMinimal: string; genderNeutral: string }
> = {
  en: { formatCompound: 'Compound (Two-part)', formatMinimal: 'Minimal (Compact)', genderNeutral: 'Neutral / Unisex' },
  fr: { formatCompound: 'Composé (Double racine)', formatMinimal: 'Minimaliste (Court)', genderNeutral: 'Neutre / Mixte' },
  es: { formatCompound: 'Compuesto (Doble raíz)', formatMinimal: 'Minimalista (Corto)', genderNeutral: 'Neutro / Mixto' },
  de: { formatCompound: 'Zusammengesetzt', formatMinimal: 'Minimalistisch (Kurz)', genderNeutral: 'Neutral / Unisex' },
  it: { formatCompound: 'Composto (Doppia radice)', formatMinimal: 'Minimale (Breve)', genderNeutral: 'Neutro / Unisex' },
  pt: { formatCompound: 'Composto (Duas partes)', formatMinimal: 'Minimalista (Curto)', genderNeutral: 'Neutro / Unissex' },
  ar: { formatCompound: 'مركّب (ثنائي الجذر)', formatMinimal: 'موجز (قصير)', genderNeutral: 'محايد' },
  tr: { formatCompound: 'Bileşik (Çift kök)', formatMinimal: 'Minimal (Kısa)', genderNeutral: 'Nötr / Unisex' },
  ja: { formatCompound: '複合（2語構成）', formatMinimal: 'ミニマル（簡潔）', genderNeutral: '中性 / ユニセックス' },
  ko: { formatCompound: '복합형 (2어근)', formatMinimal: '미니멀 (간결형)', genderNeutral: '중성 / 남녀공용' },
  zh: { formatCompound: '复合词（双词根）', formatMinimal: '极简（短小）', genderNeutral: '中性 / 通用' },
  ru: { formatCompound: 'Составное (два корня)', formatMinimal: 'Минималистичное', genderNeutral: 'Нейтральный / Унисекс' },
  hi: { formatCompound: 'संयुक्त (दो भाग)', formatMinimal: 'न्यूनतम (संक्षिप्त)', genderNeutral: 'तटस्थ / यूनिसेक्स' },
  nl: { formatCompound: 'Samengesteld', formatMinimal: 'Minimaal (Kort)', genderNeutral: 'Neutraal / Unisex' },
  pl: { formatCompound: 'Złożony (dwuczłonowy)', formatMinimal: 'Minimalny (Krótki)', genderNeutral: 'Neutralny / Uniseks' },
  sv: { formatCompound: 'Sammansatt', formatMinimal: 'Minimal (Kort)', genderNeutral: 'Neutral / Unisex' },
  vi: { formatCompound: 'Tên ghép (Hai phần)', formatMinimal: 'Tối giản (Ngắn)', genderNeutral: 'Trung tính' },
  id: { formatCompound: 'Majemuk (Dua bagian)', formatMinimal: 'Minimalis (Singkat)', genderNeutral: 'Netral / Uniseks' },
  th: { formatCompound: 'คำประสม (2 ส่วน)', formatMinimal: 'มินิมอล (กระชับ)', genderNeutral: 'เป็นกลาง / ไม่ระบุเพศ' },
  el: { formatCompound: 'Σύνθετο (Διμερές)', formatMinimal: 'Μινιμαλιστικό (Σύντομο)', genderNeutral: 'Ουδέτερο' },
  he: { formatCompound: 'מורכב (דו-שורשי)', formatMinimal: 'מינימלי (קצר)', genderNeutral: 'ניטרלי' },
  cs: { formatCompound: 'Složené (dvoučlenné)', formatMinimal: 'Minimální (Krátké)', genderNeutral: 'Neutrální' },
  ro: { formatCompound: 'Compus (Două părți)', formatMinimal: 'Minimalist (Scurt)', genderNeutral: 'Neutru / Unisex' },
  da: { formatCompound: 'Sammensat', formatMinimal: 'Minimal (Kort)', genderNeutral: 'Neutral / Unisex' },
  fi: { formatCompound: 'Yhdistetty', formatMinimal: 'Minimalistinen (Lyhyt)', genderNeutral: 'Neutraali' },
  uk: { formatCompound: 'Складене (два корені)', formatMinimal: 'Мінімалістичне', genderNeutral: 'Нейтральний / Унісекс' },
  bn: { formatCompound: 'যৌগিক (দ্বি-অংশ)', formatMinimal: 'সংক্ষিপ্ত (মিনিমাল)', genderNeutral: 'নিরপেক্ষ' },
  nb: { formatCompound: 'Sammensatt', formatMinimal: 'Minimal (Kort)', genderNeutral: 'Nøytral / Unisex' },
};

function getCompatibilityIndicatorMeta(level: CompatibilityLevel) {
  switch (level) {
    case 'highly-compatible':
      return {
        Icon: CheckCircle2,
        classes:
          'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
      };
    case 'compatible':
      return {
        Icon: Check,
        classes:
          'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
      };
    case 'alternative-style':
      return {
        Icon: Sparkles,
        classes:
          'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
      };
    case 'limited-resources':
      return {
        Icon: Info,
        classes:
          'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
      };
    case 'requires-review':
      return {
        Icon: AlertTriangle,
        classes:
          'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
      };
    case 'not-evaluated':
    default:
      return {
        Icon: HelpCircle,
        classes:
          'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      };
  }
}

export const GeneratorControl: React.FC<GeneratorControlProps> = ({
  generatorId,
  style,
  onStyleChange,
  length,
  onLengthChange,
  format,
  onFormatChange,
  gender,
  onGenderChange,
  genLanguage = 'auto',
  onGenLanguageChange,
  quantity = 9,
  onQuantityChange,
  keyword = '',
  onKeywordChange,
  onGenerate,
  isGenerating = false,
}) => {
  const settings = getAppSettings();
  const lang = settings.language;
  const t = getTranslations(lang).generatorControl;
  const styles = getStyleOptions(generatorId);
  const namesLabel = QUANTITY_WORD[lang] || 'names';
  const keywordLabels = KEYWORD_COPY[lang] || KEYWORD_COPY.en;
  const extraOptions = EXTRA_OPTIONS_COPY[lang] || EXTRA_OPTIONS_COPY.en;

  const assessment = generatorId
    ? getGeneratorCompatibilityAssessment(generatorId, genLanguage, lang)
    : null;
  const badgeMeta = assessment ? getCompatibilityIndicatorMeta(assessment.level) : null;

  React.useEffect(() => {
    if (styles.length > 0 && !styles.some((s) => s.key === style)) {
      onStyleChange(styles[0].key);
    }
  }, [generatorId, styles, style, onStyleChange]);

  const selectClass =
    'nf-input w-full h-11 px-3 py-2 text-xs font-semibold cursor-pointer';
  const labelClass =
    'block text-[11px] font-bold uppercase tracking-wider text-[var(--nf-accent-ink)] mb-1.5';

  return (
    <div className="nf-generator-controls w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* 1. Style selector */}
        <div className="lg:col-span-1">
          <label htmlFor="generator-style" className={labelClass}>
            {t.styleLabel}
          </label>
          <select
            id="generator-style"
            aria-label={t.styleLabel}
            value={style}
            onChange={(e) => onStyleChange(e.target.value)}
            className={selectClass}
          >
            {styles.map((s) => (
              <option key={s.key} value={s.key}>
                {getLocalizedStyleLabel(s.label, lang, generatorId)}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Generation Language */}
        <div>
          <label htmlFor="generator-language" className={`${labelClass} flex items-center gap-1`}>
            <Globe className="w-3 h-3 text-[var(--nf-secondary-ink)] shrink-0" />
            <span className="truncate">{t.genLangLabel}</span>
          </label>
          <select
            id="generator-language"
            aria-label={t.genLangLabel}
            value={genLanguage}
            onChange={(e) => onGenLanguageChange && onGenLanguageChange(e.target.value as GenLanguageCode)}
            className={selectClass}
          >
            {GEN_LANGUAGES.map((gl) => (
              <option key={gl.code} value={gl.code}>
                {gl.label}
              </option>
            ))}
          </select>
          {assessment && badgeMeta && (
            <div
              data-testid="language-compatibility-indicator"
              title={assessment.statusExplanation}
              className={`mt-1.5 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold max-w-full ${badgeMeta.classes}`}
            >
              <badgeMeta.Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{assessment.badgeLabel}</span>
            </div>
          )}
        </div>

        {/* 3. Length selector */}
        <div>
          <label htmlFor="generator-length" className={labelClass}>
            {t.lengthLabel}
          </label>
          <select
            id="generator-length"
            aria-label={t.lengthLabel}
            value={length}
            onChange={(e) => onLengthChange(e.target.value as LengthOption)}
            className={selectClass}
          >
            <option value="short">{t.shortLength}</option>
            <option value="medium">{t.mediumLength}</option>
            <option value="long">{t.longLength}</option>
          </select>
        </div>

        {/* 4. Format selector */}
        <div>
          <label htmlFor="generator-format" className={labelClass}>
            {t.formatLabel}
          </label>
          <select
            id="generator-format"
            aria-label={t.formatLabel}
            value={format}
            onChange={(e) => onFormatChange(e.target.value as FormatOption)}
            className={selectClass}
          >
            <option value="title">{t.formatTitle}</option>
            <option value="full">{t.formatFull}</option>
            <option value="group">{t.formatGroup}</option>
            <option value="compound">{extraOptions.formatCompound}</option>
            <option value="minimal">{extraOptions.formatMinimal}</option>
          </select>
        </div>

        {/* 5. Gender / Nuance */}
        <div>
          <label htmlFor="generator-gender" className={labelClass}>
            {t.genderLabel}
          </label>
          <select
            id="generator-gender"
            aria-label={t.genderLabel}
            value={gender}
            onChange={(e) => onGenderChange(e.target.value as GenderOption)}
            className={selectClass}
          >
            <option value="any">{t.genderAny}</option>
            <option value="female">{t.genderFemale}</option>
            <option value="male">{t.genderMale}</option>
            <option value="neutral">{extraOptions.genderNeutral}</option>
          </select>
        </div>

        {/* 6. Quantity */}
        <div>
          <label htmlFor="generator-quantity" className={labelClass}>
            {t.quantityLabel}
          </label>
          <select
            id="generator-quantity"
            aria-label={t.quantityLabel}
            value={quantity}
            onChange={(e) => onQuantityChange && onQuantityChange(Number(e.target.value))}
            className={selectClass}
          >
            <option value={6}>{`6 ${namesLabel}`}</option>
            <option value={9}>{`9 ${namesLabel}`}</option>
            <option value={12}>{`12 ${namesLabel}`}</option>
            <option value={18}>{`18 ${namesLabel}`}</option>
          </select>
        </div>
      </div>

      {/* 7. Optional Keyword Inspiration Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <div className="relative flex-1 w-full">
          <label htmlFor="generator-keyword" className="sr-only">
            {keywordLabels.label}
          </label>
          <input
            id="generator-keyword"
            type="text"
            aria-label={keywordLabels.label}
            placeholder={keywordLabels.placeholder}
            value={keyword}
            onChange={(e) => onKeywordChange && onKeywordChange(e.target.value)}
            className="nf-input w-full h-11 px-4 pe-9 text-xs font-medium"
          />
          {keyword && onKeywordChange && (
            <button
              type="button"
              onClick={() => onKeywordChange('')}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-[var(--nf-subtle)] hover:text-[var(--nf-ink)] p-1 rounded cursor-pointer"
              title={keywordLabels.clear}
              aria-label={keywordLabels.clear}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Trigger Button */}
      <div className="flex items-center justify-center pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="nf-btn-primary w-full sm:w-auto min-w-[260px] h-12 px-8 text-sm tracking-wide shadow-md flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{t.generatingBtn}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{t.generateBtn}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

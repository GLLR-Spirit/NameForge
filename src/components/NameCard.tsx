import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Bookmark, Heart, FileText, Copy, Check, Star, Volume2, Wand2, Sparkles } from 'lucide-react';
import { GeneratedName, GeneratorId, GenLanguageCode } from '../types';
import {
  findSavedEntry,
  getStoredRating,
  setStoredRating,
  subscribeToStorage,
  toggleLikeName,
  toggleSaveName,
} from '../services/storage';
const CompleteNameAnalysisModal = lazy(() =>
  import('./CompleteNameAnalysisModal').then((module) => ({
    default: module.CompleteNameAnalysisModal,
  }))
);
import { getAppSettings } from '../services/settings';
import { getTranslations } from '../i18n';
import { GENERATORS_METADATA } from '../data/generators';
import { getLocalizedGeneratorDescription } from '../i18n/generatorContent';
import { getLocalizedNameMeaning, getLocalizedNameOrigin } from '../i18n/attestedNameTranslations';
import { getUnifiedAnalysisLabels } from '../i18n/unifiedAnalysisLabels';
import { getShellLabels } from '../i18n/shell';
import { getLocalizedStyleLabel } from '../i18n/styleLabels';
import { copyToClipboard } from '../utils/clipboard';

interface NameCardProps {
  item: GeneratedName;
  batchNames?: string[];
  generationLanguage?: GenLanguageCode;
  onOpenNote?: (name: string, generatorId: GeneratorId, style: string) => void;
  onDataChange?: () => void;
}

const EXTRA_COPY: Record<
  string,
  { styleName: string; spoken: string; attested: string; creative: string; rating: string }
> = {
  en: { styleName: 'Style this name (Unicode & Visual)', spoken: 'Listen to pronunciation', attested: 'Verified real name', creative: 'Creative mode', rating: 'Rating' },
  fr: { styleName: 'Styliser ce nom (Unicode & Visuel)', spoken: 'Écouter la prononciation', attested: 'Prénom réel attesté', creative: 'Mode créatif', rating: 'Note' },
  es: { styleName: 'Estilizar este nombre (Unicode y visual)', spoken: 'Escuchar pronunciación', attested: 'Nombre real verificado', creative: 'Modo creativo', rating: 'Valoración' },
  de: { styleName: 'Namen gestalten (Unicode und visuelle Effekte)', spoken: 'Aussprache anhören', attested: 'Belegter echter Name', creative: 'Kreativmodus', rating: 'Bewertung' },
  it: { styleName: 'Dai stile al nome (Unicode e visivo)', spoken: 'Ascolta la pronuncia', attested: 'Nome reale attestato', creative: 'Modalità creativa', rating: 'Valutazione' },
  pt: { styleName: 'Estilizar este nome (Unicode e visual)', spoken: 'Ouvir pronúncia', attested: 'Nome real comprovado', creative: 'Modo criativo', rating: 'Avaliação' },
  ar: { styleName: 'تنسيق الاسم (Unicode والتأثيرات البصرية)', spoken: 'استمع إلى النطق', attested: 'اسم حقيقي موثّق', creative: 'الوضع الإبداعي', rating: 'التقييم' },
  tr: { styleName: 'İsmi biçimlendir (Unicode ve görsel)', spoken: 'Telaffuzu dinle', attested: 'Doğrulanmış gerçek isim', creative: 'Yaratıcı mod', rating: 'Puan' },
  ja: { styleName: '名前をスタイル設定（Unicode・ビジュアル）', spoken: '発音を聞く', attested: '実在が確認された名前', creative: 'クリエイティブモード', rating: '評価' },
  ko: { styleName: '이름 스타일 지정 (유니코드 및 시각 효과)', spoken: '발음 듣기', attested: '실재가 확인된 이름', creative: '창작 모드', rating: '평점' },
  zh: { styleName: '设置名称样式（Unicode 与视觉效果）', spoken: '收听发音', attested: '有资料佐证的真实姓名', creative: '创意模式', rating: '评分' },
  ru: { styleName: 'Стилизовать имя (Unicode и визуальные эффекты)', spoken: 'Прослушать произношение', attested: 'Подтверждённое настоящее имя', creative: 'Творческий режим', rating: 'Оценка' },
  hi: { styleName: 'नाम की शैली बदलें (Unicode और दृश्य प्रभाव)', spoken: 'उच्चारण सुनें', attested: 'प्रमाणित वास्तविक नाम', creative: 'रचनात्मक मोड', rating: 'रेटिंग' },
  nl: { styleName: 'Geef deze naam een stijl (Unicode en visueel)', spoken: 'Uitspraak beluisteren', attested: 'Bevestigde echte naam', creative: 'Creatieve modus', rating: 'Beoordeling' },
  pl: { styleName: 'Stylizuj nazwę (Unicode i efekty wizualne)', spoken: 'Odsłuchaj wymowę', attested: 'Potwierdzone prawdziwe imię', creative: 'Tryb kreatywny', rating: 'Ocena' },
  sv: { styleName: 'Styla namnet (Unicode och visuellt)', spoken: 'Lyssna på uttalet', attested: 'Verifierat verkligt namn', creative: 'Kreativt läge', rating: 'Betyg' },
  vi: { styleName: 'Tạo kiểu tên (Unicode và hình ảnh)', spoken: 'Nghe cách phát âm', attested: 'Tên thật đã được xác nhận', creative: 'Chế độ sáng tạo', rating: 'Đánh giá' },
  id: { styleName: 'Tata gaya nama (Unicode dan visual)', spoken: 'Dengarkan pelafalan', attested: 'Nama asli terverifikasi', creative: 'Mode kreatif', rating: 'Penilaian' },
  th: { styleName: 'จัดรูปแบบชื่อ (Unicode และภาพ)', spoken: 'ฟังการออกเสียง', attested: 'ชื่อจริงที่ยืนยันแล้ว', creative: 'โหมดสร้างสรรค์', rating: 'คะแนน' },
  el: { styleName: 'Διαμόρφωση ονόματος (Unicode και οπτικά εφέ)', spoken: 'Ακούστε την προφορά', attested: 'Επιβεβαιωμένο πραγματικό όνομα', creative: 'Δημιουργική λειτουργία', rating: 'Αξιολόγηση' },
  he: { styleName: 'עיצוב השם (Unicode וחזותי)', spoken: 'האזנה להגייה', attested: 'שם אמיתי מאומת', creative: 'מצב יצירתי', rating: 'דירוג' },
  cs: { styleName: 'Stylizovat jméno (Unicode a vizuální efekty)', spoken: 'Poslechnout výslovnost', attested: 'Ověřené skutečné jméno', creative: 'Kreativní režim', rating: 'Hodnocení' },
  ro: { styleName: 'Stilizează numele (Unicode și vizual)', spoken: 'Ascultă pronunția', attested: 'Prenume real atestat', creative: 'Mod creativ', rating: 'Evaluare' },
  da: { styleName: 'Stilisér navnet (Unicode og visuelt)', spoken: 'Lyt til udtalen', attested: 'Bekræftet rigtigt navn', creative: 'Kreativ tilstand', rating: 'Bedømmelse' },
  fi: { styleName: 'Tyylittele nimi (Unicode ja visuaalisuus)', spoken: 'Kuuntele ääntämys', attested: 'Vahvistettu oikea nimi', creative: 'Luova tila', rating: 'Arvio' },
  uk: { styleName: 'Стилізувати це ім’я (Unicode і візуал)', spoken: 'Прослухати вимову', attested: 'Підтверджене справжнє ім’я', creative: 'Творчий режим', rating: 'Оцінка' },
  bn: { styleName: 'এই নামের স্টাইল করুন (ইউনিকোড ও ভিজ্যুয়াল)', spoken: 'উচ্চারণ শুনুন', attested: 'যাচাইকৃত প্রকৃত নাম', creative: 'সৃজনশীল মোড', rating: 'রেটিং' },
  nb: { styleName: 'Stil dette navnet (Unicode og visuelt)', spoken: 'Lytt til uttalen', attested: 'Bekreftet ekte navn', creative: 'Kreativ modus', rating: 'Vurdering' },
};

export const NameCard: React.FC<NameCardProps> = ({
  item,
  batchNames,
  generationLanguage,
  onOpenNote,
  onDataChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const existing = findSavedEntry(item.name, item.generatorId);
  const [isSaved, setIsSaved] = useState(existing?.saved || false);
  const [isLiked, setIsLiked] = useState(existing?.liked || false);
  const [hasNote, setHasNote] = useState(Boolean(existing?.note));
  const [rating, setRating] = useState<number>(getStoredRating(item.name));

  useEffect(() => {
    const syncFromStorage = () => {
      const updated = findSavedEntry(item.name, item.generatorId);
      setIsSaved(updated?.saved || false);
      setIsLiked(updated?.liked || false);
      setHasNote(Boolean(updated?.note));
      setRating(getStoredRating(item.name));
    };
    syncFromStorage();
    return subscribeToStorage(syncFromStorage);
  }, [item.name, item.generatorId]);

  const settings = getAppSettings();
  const lang = settings.language;
  const t = getTranslations(lang).nameCard;
  const analysisLabels = getUnifiedAnalysisLabels(lang);
  const familyLabels = getShellLabels(lang).families;
  const extra = EXTRA_COPY[lang] || EXTRA_COPY.en;
  const generatorMeta = GENERATORS_METADATA[item.generatorId] || GENERATORS_METADATA.fantasy;

  const localizedStyle = getLocalizedStyleLabel(item.style, lang, item.generatorId);
  const familyLabel = familyLabels[generatorMeta.category as keyof typeof familyLabels] || familyLabels.all;

  // Render localized per-item context: attested names translate etymology & origin into all 28 languages,
  // French UI shows the generator's per-item description, and non-French UI falls back to localized generator copy
  // unless an item carries non-default localized metadata.
  const attestedOrigin = item.origin
    ? getLocalizedNameOrigin(item.origin.replace(/^Origine certifiée\s*:\s*/i, ''), lang)
    : '';
  const attestedMeaning = item.meaning ? getLocalizedNameMeaning(item.meaning, lang) : '';
  const cardDescription =
    item.isAttested && attestedMeaning
      ? `${attestedOrigin ? `${attestedOrigin} — ` : ''}${attestedMeaning}`
      : lang === 'fr' && item.description?.trim()
        ? item.description
        : getLocalizedGeneratorDescription(generatorMeta, lang);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.name);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = async () => {
    if (await copyToClipboard(item.name)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  const handleSaveToggle = () => {
    const newState = toggleSaveName(item.name, item.generatorId, item.style);
    setIsSaved(newState);
    if (onDataChange) onDataChange();
  };

  const handleLikeToggle = () => {
    const newState = toggleLikeName(item.name, item.generatorId, item.style);
    setIsLiked(newState);
    if (onDataChange) onDataChange();
  };

  const handleRate = (r: number) => {
    const next = rating === r ? 0 : r;
    setRating(next);
    setStoredRating(item.name, next);
    if (onDataChange) onDataChange();
  };

  return (
    <>
      {showAnalysis && (
        <Suspense fallback={null}>
          <CompleteNameAnalysisModal
            item={item}
            meta={generatorMeta}
            batchNames={batchNames}
            generationLanguage={generationLanguage}
            onClose={() => setShowAnalysis(false)}
            onUpdate={onDataChange}
            onOpenNote={onOpenNote}
          />
        </Suspense>
      )}

      <article className="nf-name-result-card nf-surface group relative p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--nf-primary)] flex flex-col justify-between text-center">
        <div>
          {/* Top bar: Style kicker + utility actions */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-semibold text-[var(--nf-muted)] flex items-center gap-1.5 min-w-0 truncate">
              <span aria-hidden="true">{item.icon}</span>
              <span className="truncate">{localizedStyle}</span>
            </span>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent('nameforge:navigate', {
                      detail: { view: 'style-studio', name: item.name },
                    })
                  );
                }}
                className="p-1.5 rounded-lg text-[var(--nf-muted)] hover:text-[var(--nf-ink)] hover:bg-[var(--nf-surface-muted)] transition cursor-pointer"
                title={extra.styleName}
                aria-label={`${extra.styleName}: ${item.name}`}
              >
                <Wand2 className="w-4 h-4 text-[var(--nf-primary)]" />
              </button>

              <button
                type="button"
                onClick={handleSpeak}
                className="p-1.5 rounded-lg text-[var(--nf-muted)] hover:text-[var(--nf-ink)] hover:bg-[var(--nf-surface-muted)] transition cursor-pointer"
                title={extra.spoken}
                aria-label={`${extra.spoken}: ${item.name}`}
              >
                <Volume2 className="w-4 h-4 text-[var(--nf-secondary-ink)]" />
              </button>

              <button
                type="button"
                data-testid="name-insight-trigger"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAnalysis(true);
                }}
                className="text-xs font-semibold text-[var(--nf-primary)] hover:bg-[var(--nf-primary-soft)] transition flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--nf-border)] cursor-pointer"
                title={analysisLabels.sheetTitle}
                aria-label={`${analysisLabels.sheetTitle}: ${item.name}`}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{analysisLabels.triggerLabel}</span>
              </button>
            </div>
          </div>

          {/* Primary Name Anchor */}
          <h3 className="text-2xl sm:text-[1.7rem] font-extrabold text-[var(--nf-ink)] tracking-tight break-words mt-2">
            {item.name}
          </h3>

          {/* Zero-pill typographic metadata */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-[var(--nf-subtle)]">
            {item.pronunciation && (
              <span className="font-mono text-[11px]">{item.pronunciation}</span>
            )}
            {item.pronunciation && (
              <span aria-hidden="true">·</span>
            )}
            {item.isAttested === true ? (
              <span className="text-[var(--nf-success)] font-semibold">✓ {extra.attested}</span>
            ) : item.isAttested === false && item.generatorId === 'baby_name' ? (
              <span className="text-[var(--nf-accent-ink)] font-semibold">{extra.creative}</span>
            ) : (
              <span>{localizedStyle}</span>
            )}
          </div>

          <p className="mt-3 text-sm text-[var(--nf-muted)] leading-relaxed min-h-[3.25rem] line-clamp-3">
            {cardDescription}
          </p>

          <div className="mt-3 pt-2.5 border-t border-[var(--nf-border)] text-xs text-[var(--nf-subtle)] line-clamp-2 min-h-[2.25rem]">
            <strong className="text-[var(--nf-ink)] font-semibold">{t.idealFor}</strong> {familyLabel}
          </div>
        </div>

        {/* Action footer */}
        <div className="mt-4 space-y-2.5 pt-3 border-t border-[var(--nf-border)]">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleSaveToggle}
              aria-pressed={isSaved}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                isSaved
                  ? 'bg-[var(--nf-primary-soft)] text-[var(--nf-accent-ink)] border-[var(--nf-primary)]'
                  : 'nf-btn-secondary'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? t.saved : t.save}</span>
            </button>

            <button
              type="button"
              onClick={handleLikeToggle}
              aria-pressed={isLiked}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer border ${
                isLiked
                  ? 'bg-[var(--nf-danger-bg)] text-[var(--nf-danger)] border-[var(--nf-danger-border)]'
                  : 'nf-btn-secondary'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? t.liked : t.like}</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 px-1">
            <button
              type="button"
              onClick={() => onOpenNote && onOpenNote(item.name, item.generatorId, item.style)}
              className="text-xs font-semibold text-[var(--nf-muted)] hover:text-[var(--nf-ink)] transition flex items-center gap-1.5 cursor-pointer py-1"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--nf-primary)]" />
              <span>{hasNote ? t.editNote : t.note}</span>
            </button>

            <div className="flex items-center gap-0.5" role="group" aria-label={extra.rating}>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => handleRate(starIndex)}
                  aria-label={`${extra.rating} ${starIndex}/5`}
                  aria-pressed={rating === starIndex}
                  className="p-1 text-[var(--nf-subtle)] hover:text-amber-500 transition cursor-pointer"
                  title={`${extra.rating} ${starIndex}/5`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      starIndex <= rating ? 'text-amber-500 fill-amber-500' : 'text-[var(--nf-border-strong)]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border ${
              copied
                ? 'bg-[var(--nf-success-bg)] text-[var(--nf-success)] border-[var(--nf-success-border)]'
                : 'nf-btn-secondary'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{t.copy}</span>
              </>
            )}
          </button>
        </div>
      </article>
    </>
  );
};

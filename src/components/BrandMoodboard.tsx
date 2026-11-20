import React from 'react';
import { VisualDirectionPreset, VisualDirectionProfile } from '../types/nameInsight';
import { NameInsightSectionLabels } from '../i18n/nameInsightLabels';

interface BrandMoodboardProps {
  name: string;
  categoryLabel: string;
  slogan: string;
  visualDirection: VisualDirectionProfile;
  activePreset?: VisualDirectionPreset;
  labels: NameInsightSectionLabels;
  dir: 'ltr' | 'rtl';
}

function getFontFamilyForMood(mood: VisualDirectionProfile['typographyMood']): string {
  switch (mood) {
    case 'serif':
      return 'Georgia, "Times New Roman", Cambria, serif';
    case 'monospace':
      return 'ui-monospace, SFMono-Regular, Consolas, monospace';
    case 'humanist':
      return 'Optima, "Segoe UI", system-ui, sans-serif';
    case 'display':
      return 'Futura, "Trebuchet MS", system-ui, sans-serif';
    case 'geometric-sans':
    default:
      return 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  }
}

const ArchetypeEmblem: React.FC<{
  motif: VisualDirectionProfile['motif'];
  primary: string;
  accent: string;
  ink: string;
}> = ({ motif, primary, accent, ink }) => {
  switch (motif) {
    case 'crest':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <rect x="4" y="4" width="32" height="32" rx="2" fill="none" stroke={accent} strokeWidth="1.5" />
          <polygon points="20,9 31,20 20,31 9,20" fill="none" stroke={ink} strokeWidth="1.4" />
          <circle cx="20" cy="20" r="3" fill={accent} />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="2.5" fill={primary} />
          <rect x="22" y="6" width="12" height="12" rx="2.5" fill={accent} />
          <rect x="6" y="22" width="12" height="12" rx="2.5" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.65" />
          <rect x="22" y="22" width="12" height="12" rx="6" fill={primary} opacity="0.45" />
        </svg>
      );
    case 'botanical':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <circle cx="20" cy="20" r="15" fill="none" stroke={primary} strokeWidth="1.4" opacity="0.45" />
          <path d="M20 31 C20 21, 20 14, 29 10 C27 20, 23 24, 20 26 Z" fill={primary} opacity="0.85" />
          <path d="M20 28 C16 23, 12 19, 11 12 C17 15, 20 20, 20 26 Z" fill={accent} />
        </svg>
      );
    case 'circuit':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <polygon points="10,5 30,5 36,15 30,35 10,35 4,15" fill="none" stroke={accent} strokeWidth="1.6" />
          <path d="M12 20 L18 20 L21 13 L25 27 L28 20 L33 20" fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'heraldic':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <path d="M9 7 H31 V20 C31 28 20 34 20 34 C20 34 9 28 9 20 Z" fill="none" stroke={accent} strokeWidth="1.6" />
          <path d="M20 11 L23 19 L20 27 L17 19 Z" fill={accent} />
        </svg>
      );
    case 'orbital':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <circle cx="20" cy="20" r="4" fill={accent} />
          <ellipse cx="20" cy="20" rx="15" ry="6.5" transform="rotate(-28 20 20)" fill="none" stroke={ink} strokeWidth="1.3" opacity="0.7" />
          <ellipse cx="20" cy="20" rx="15" ry="6.5" transform="rotate(28 20 20)" fill="none" stroke={primary} strokeWidth="1.5" />
        </svg>
      );
    case 'prism':
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <polygon points="20,6 34,31 6,31" fill="none" stroke={primary} strokeWidth="1.8" />
          <polygon points="20,14 28,28 12,28" fill={accent} opacity="0.82" />
        </svg>
      );
    case 'horizon':
    default:
      return (
        <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
          <circle cx="20" cy="17" r="6" fill={accent} />
          <path d="M5 24 Q14 19 20 23 T35 23" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M7 29 Q17 25 33 29" fill="none" stroke={primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
        </svg>
      );
  }
};

export const BrandMoodboard: React.FC<BrandMoodboardProps> = ({
  name,
  categoryLabel,
  slogan,
  visualDirection,
  activePreset,
  labels,
  dir,
}) => {
  const effective = activePreset ?? visualDirection;
  const [primary, secondary, surface, accent] = effective.colors;
  const surfaceInk = surface.contrastInk;
  const mutedInk = surfaceInk === '#ffffff' ? 'rgba(248, 250, 252, 0.78)' : 'rgba(15, 23, 42, 0.72)';
  const subtleBorder = surfaceInk === '#ffffff' ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.12)';
  const fontFamily = getFontFamilyForMood(effective.typographyMood);

  const isAtmosphericDark = effective.archetype === 'cyber-kinetic' || effective.archetype === 'arcane-heritage' || effective.archetype === 'modern-tech';
  const stageBackground = isAtmosphericDark && surface.contrastInk === '#ffffff'
    ? `radial-gradient(circle at 85% 18%, ${secondary.hex}55 0%, transparent 52%), linear-gradient(145deg, ${surface.hex} 0%, ${primary.hex} 100%)`
    : `radial-gradient(circle at 90% 15%, ${accent.hex}22 0%, transparent 48%), linear-gradient(150deg, ${surface.hex} 0%, ${surface.hex} 72%, ${secondary.hex}14 100%)`;

  return (
    <div
      dir={dir}
      data-testid="brand-moodboard-preview"
      className="ni-moodboard relative overflow-hidden rounded-2xl border p-4 sm:p-5"
      style={{
        background: stageBackground,
        borderColor: subtleBorder,
        color: surfaceInk,
      }}
    >
      {/* Subtle bespoke structural SVG backdrop motif */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
        viewBox="0 0 400 220"
      >
        {effective.motif === 'grid' || effective.motif === 'orbital' ? (
          <g stroke={surfaceInk} strokeWidth="0.6" strokeDasharray="3 4" fill="none">
            <line x1="0" y1="54" x2="400" y2="54" />
            <line x1="0" y1="166" x2="400" y2="166" />
            <line x1="280" y1="0" x2="280" y2="220" />
          </g>
        ) : effective.motif === 'crest' || effective.motif === 'heraldic' ? (
          <rect
            x="10"
            y="10"
            width="380"
            height="200"
            rx="10"
            fill="none"
            stroke={accent.hex}
            strokeWidth="1"
          />
        ) : (
          <path
            d="M0 185 Q120 135 240 175 T400 145"
            fill="none"
            stroke={accent.hex}
            strokeWidth="1.4"
          />
        )}
      </svg>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top editorial metadata bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ borderColor: subtleBorder, color: mutedInk }}
        >
          <span>{labels.archetypeLabels[effective.archetype]}</span>
          <span>{labels.typographyLabels[effective.typographyMood]}</span>
        </div>

        {/* Center brand lockup specimen */}
        <div className="flex items-start gap-3.5 py-1">
          <ArchetypeEmblem
            motif={effective.motif}
            primary={primary.hex}
            accent={accent.hex}
            ink={surfaceInk}
          />
          <div className="min-w-0 flex-1">
            <p
              className="break-words text-2xl font-extrabold tracking-tight sm:text-3xl"
              style={{
                fontFamily,
                color: surfaceInk,
                letterSpacing:
                  effective.typographyMood === 'serif'
                    ? '-0.015em'
                    : effective.typographyMood === 'monospace'
                      ? '0.02em'
                      : '-0.03em',
              }}
            >
              {name}
            </p>
            <p className="mt-1 text-xs font-medium" style={{ color: mutedInk }}>
              {categoryLabel}
            </p>
            <div
              className="mt-3 h-0.5 w-12 rounded-full"
              style={{ backgroundColor: accent.hex }}
            />
            <p className="mt-2.5 text-sm font-medium leading-snug" style={{ color: surfaceInk }}>
              {slogan}
            </p>
          </div>
        </div>

        {/* Proportional 4-tone visual identity bar preview */}
        <div className="flex flex-col gap-1.5 pt-1">
          <div
            className="flex h-2.5 w-full overflow-hidden rounded-full border"
            style={{ borderColor: subtleBorder }}
            aria-label={labels.paletteHarmony}
          >
            <span className="h-full" style={{ width: '48%', backgroundColor: primary.hex }} />
            <span className="h-full" style={{ width: '26%', backgroundColor: secondary.hex }} />
            <span className="h-full" style={{ width: '16%', backgroundColor: surface.hex }} />
            <span className="h-full" style={{ width: '10%', backgroundColor: accent.hex }} />
          </div>
        </div>
      </div>
    </div>
  );
};

import { GeneratorId, LanguageCode } from './index';

export type NameInsightCategory =
  | 'brand'
  | 'character'
  | 'rpg'
  | 'game'
  | 'science-fiction'
  | 'science'
  | 'project'
  | 'place'
  | 'general';

export type VisualArchetypeId =
  | 'luxury-atelier'
  | 'modern-tech'
  | 'organic-craft'
  | 'cyber-kinetic'
  | 'arcane-heritage'
  | 'scientific-clarity'
  | 'creative-studio'
  | 'horizon-world';

export type BrandPersonalityTrait =
  | 'modern'
  | 'minimalist'
  | 'elegant'
  | 'creative'
  | 'premium'
  | 'playful'
  | 'futuristic'
  | 'professional'
  | 'structured'
  | 'expressive'
  | 'atmospheric'
  | 'artisanal';

export type VariationDirection =
  | 'corporate'
  | 'creative'
  | 'product'
  | 'digital'
  | 'studio'
  | 'premium'
  | 'community'
  | 'editorial'
  | 'narrative'
  | 'worldbuilding';

export type VisualBrandColorRole = 'primary' | 'secondary' | 'surface' | 'accent';

export interface VisualBrandColor {
  hex: string;
  role: VisualBrandColorRole;
  contrastInk: '#0f172a' | '#ffffff';
}

export interface SuggestedVariation {
  name: string;
  direction: VariationDirection;
}

export interface CreativeStudioTransferContext {
  name: string;
  styleId: string;
  effectId: string;
  fontId: string;
  palette: string[];
  slogan?: string;
  personality?: BrandPersonalityTrait[];
  sourceCategoryLabel?: string;
  archetype?: VisualArchetypeId;
  language?: LanguageCode;
  visualDirectionLabel?: string;
}

export interface VisualDirectionProfile {
  archetype: VisualArchetypeId;
  colors: VisualBrandColor[];
  typographyMood: 'serif' | 'geometric-sans' | 'monospace' | 'humanist' | 'display';
  motif: 'crest' | 'grid' | 'botanical' | 'circuit' | 'heraldic' | 'orbital' | 'prism' | 'horizon';
  personality: BrandPersonalityTrait[];
  studioMapping: {
    styleId: string;
    effectId: string;
    fontId: string;
  };
}

export interface NameInsightInput {
  name: string;
  generatorId: GeneratorId;
  style: string;
  description: string;
  generatorLabel?: string;
  language?: LanguageCode;
}

export interface NameInsightMetrics {
  characterCount: number;
  wordCount: number | null;
  repeatedCharacterCount: number;
  latinVowelShare: number | null;
  digitCount: number;
  symbolCount: number;
  uppercaseCount: number;
  hasMixedScripts: boolean;
  writingSystems: string[];
}

export interface NameInsightResult {
  category: NameInsightCategory;
  categoryLabel: string;
  creativeReading: string;
  contextDescription: string;
  slogan: string;
  palette: [string, string, string];
  alternatives: string[];
  variations: SuggestedVariation[];
  visualDirection: VisualDirectionProfile;
  metrics: NameInsightMetrics;
  isCreativeOnly: true;
}

export type NameOriginClassification =
  | 'algorithmic'
  | 'language-inspired'
  | 'source-attested'
  | 'native-reviewed'
  | 'unverified';

export type ReportVerificationStatus =
  | 'automatically-verified'
  | 'automatically-evaluated'
  | 'estimated'
  | 'requires-human-review'
  | 'native-review-pending'
  | 'not-verified'
  | 'insufficient-data';

export type QualityCriterionKey =
  | 'scriptIntegrity'
  | 'textHygiene'
  | 'pronunciation'
  | 'readability'
  | 'memorability'
  | 'distinctiveness'
  | 'categoryFit'
  | 'naturalness'
  | 'culturalSuitability'
  | 'brandPotential';

export type PronunciationDifficultyLevel = 'easy' | 'moderate' | 'challenging' | 'unknown';

export interface ScriptBreakdownEntry {
  script: string;
  isoCode: string;
  count: number;
  share: number;
}

export interface ArabicLinguisticDetails {
  isArabicScript: boolean;
  hasHarakat: boolean;
  hasLatinInArabic: boolean;
  diacriticCount: number;
  notes: string[];
}

export interface JapaneseLinguisticDetails {
  isJapaneseContext: boolean;
  hiraganaCount: number;
  katakanaCount: number;
  kanjiCount: number;
  romajiCount: number;
  scriptMixMode: 'katakana-only' | 'hiragana-only' | 'kanji-kana' | 'romaji' | 'mixed' | 'non-japanese';
  authenticityDistinction: string;
  notes: string[];
}

export interface QualityCriterionAssessment {
  key: QualityCriterionKey;
  score: number | null;
  maxScore: 100;
  method:
    | 'automatic-rule'
    | 'batch-comparison'
    | 'structural-estimate'
    | 'human-rating'
    | 'safety-screen'
    | 'unmeasured';
  verificationStatus: ReportVerificationStatus;
  measurable: boolean;
  explanation: string;
  warnings: string[];
}

export interface CategorizedNameVariations {
  short: string[];
  extended: string[];
  alternativeSpelling: string[];
  username: string[];
  logoFriendly: string[];
}

export interface VisualDirectionPreset {
  id: string;
  presetKey: 'archetype-primary' | 'minimal-editorial' | 'modern-mono';
  archetype: VisualArchetypeId;
  typographyMood: VisualDirectionProfile['typographyMood'];
  motif: VisualDirectionProfile['motif'];
  colors: VisualBrandColor[];
  studioMapping: VisualDirectionProfile['studioMapping'];
  intentionNote: string;
}

export interface VisualExtensionItem {
  channel: 'social' | 'profile' | 'website' | 'brand' | 'gaming';
  example: string;
}

export interface IntelligenceChecklistItem {
  id: string;
  labelKey:
    | 'scriptConsistency'
    | 'textCleanliness'
    | 'readabilityStructure'
    | 'batchComparison'
    | 'preliminarySafety'
    | 'nativeSpeakerReview'
    | 'trademarkRegistry'
    | 'domainAvailability';
  completed: boolean;
  scope: 'automatic-local' | 'human-native' | 'external-registry';
}

export interface NameIntelligenceReport {
  identification: {
    name: string;
    categoryLabel: string;
    generatorId: GeneratorId;
    styleLabel: string;
    targetLanguage: string;
    targetLanguageCode: string;
    generationMethod: 'attested-dataset' | 'algorithmic-engine' | 'custom-input';
    originClassification: NameOriginClassification;
    overallVerificationStatus: ReportVerificationStatus;
  };
  linguistic: {
    targetLanguageCode: string;
    writingSystems: ScriptBreakdownEntry[];
    writingDirection: 'ltr' | 'rtl' | 'mixed';
    alphabetClass: string;
    graphemeCount: number;
    latinLetterCount: number;
    vowelCount: number | null;
    consonantCount: number | null;
    diacriticCount: number;
    separatorCount: number;
    syllabicUnits: string[];
    syllableCountEstimated: number | null;
    pronunciationDifficulty: PronunciationDifficultyLevel;
    pronunciationStatus: ReportVerificationStatus;
    readabilitySummary: string;
    conventionCompatibility: string;
    phoneticCharacteristics: string[];
    morphologicalNotes: string[];
    transliterationNote: string | null;
    ambiguitiesAndRisks: string[];
    arabicDetails: ArabicLinguisticDetails;
    japaneseDetails: JapaneseLinguisticDetails;
  };
  quality: {
    criteria: QualityCriterionAssessment[];
    measuredCount: number;
    estimatedCount: number;
    pendingReviewCount: number;
    overallCompositeNote: string;
  };
  creativeSemantic: {
    mode: 'attested' | 'creative-only' | 'unavailable';
    attestedOrigin: string | null;
    attestedMeaning: string | null;
    creativeReading: string | null;
    soundIdentityNote: string;
    personalityTraits: BrandPersonalityTrait[];
    thematicUniverses: string[];
    targetAudience: string[];
    categoryFitVerdict: 'aligned' | 'review-needed';
    categoryPositives: string[];
    categoryWeaknesses: string[];
    slogan: string | null;
  };
  visualIdentity: {
    enabled: boolean;
    presets: VisualDirectionPreset[];
    recommendedTypography: string[];
    colorIntentions: Record<VisualBrandColorRole, string>;
    categorizedVariations: CategorizedNameVariations;
    extensions: VisualExtensionItem[];
  };
  recommendations: {
    strengths: string[];
    weaknesses: string[];
    improvementSuggestions: string[];
    recommendedVariations: Array<{ variant: string; rationale: string }>;
    potentialConfusions: string[];
    usageRecommendations: string[];
    checklist: IntelligenceChecklistItem[];
  };
}

export type ComparisonCandidateSource = 'generated' | 'saved' | 'collection';

export interface NameComparisonEntry {
  name: string;
  generatorId: GeneratorId;
  style: string;
  rating: number;
  note: string;
  saved: boolean;
  source?: ComparisonCandidateSource;
  collectionId?: string;
  collectionName?: string;
  targetLanguageLabel?: string;
  report: NameIntelligenceReport;
  measuredAverage: number | null;
  estimatedAverage: number | null;
  letterCount: number;
}

export interface NameComparisonReport {
  entries: NameComparisonEntry[];
  bestReadabilityNames: string[];
  mostCompactNames: string[];
  highestRatedNames: string[];
  summaryObservations: string[];
  verificationCaveat: string;
  crossContextWarning: string | null;
}

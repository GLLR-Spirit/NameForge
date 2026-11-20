import type { LanguageCode } from '../types';
import type {
  NameOriginClassification,
  PronunciationDifficultyLevel,
  QualityCriterionKey,
  ReportVerificationStatus,
} from '../types/nameInsight';
import { resolveCanonicalLocale } from './localeRegistry';

export interface NameIntelligenceLabels {
  reportTitle: string;
  executiveBadge: string;
  sectionTitles: {
    s01: string;
    s02: string;
    s03: string;
    s04: string;
    s05: string;
    s06: string;
  };
  originClassifications: Record<NameOriginClassification, string>;
  verificationStatuses: Record<ReportVerificationStatus, string>;
  criteriaLabels: Record<QualityCriterionKey, string>;
  criteriaMethods: {
    'automatic-rule': string;
    'batch-comparison': string;
    'structural-estimate': string;
    'human-rating': string;
    'safety-screen': string;
    unmeasured: string;
  };
  pronunciationLevels: Record<PronunciationDifficultyLevel, string>;
  actions: {
    printReport: string;
    exportTxt: string;
    exportJson: string;
    compareNames: string;
    backToGenerator: string;
  };
  labels: {
    analyzedName: string;
    generationMethod: string;
    generationMethods: {
      'attested-dataset': string;
      'algorithmic-engine': string;
      'custom-input': string;
    };
    originClassification: string;
    overallStatus: string;
    writingDirection: string;
    alphabetClass: string;
    syllabicUnits: string;
    pronunciationDifficulty: string;
    phoneticProfile: string;
    morphologicalNotes: string;
    transliteration: string;
    ambiguitiesRisks: string;
    arabicChecks: string;
    japaneseChecks: string;
    soundIdentityHeading: string;
    soundIdentityDisclaimer: string;
    thematicUniverses: string;
    targetAudience: string;
    categoryCompatibility: string;
    visualPresets: string;
    presetNames: {
      'archetype-primary': string;
      'minimal-editorial': string;
      'modern-mono': string;
    };
    typographyGuide: string;
    categorizedVariations: string;
    variationGroups: {
      short: string;
      extended: string;
      alternativeSpelling: string;
      username: string;
      logoFriendly: string;
    };
    visualExtensions: string;
    extensionChannels: {
      social: string;
      profile: string;
      website: string;
      brand: string;
      gaming: string;
    };
    strengths: string;
    weaknesses: string;
    improvements: string;
    recommendedVariations: string;
    potentialConfusions: string;
    usageRecommendations: string;
    verificationChecklist: string;
    completedBadge: string;
    pendingBadge: string;
    checklistItems: {
      scriptConsistency: string;
      textCleanliness: string;
      readabilityStructure: string;
      batchComparison: string;
      preliminarySafety: string;
      nativeSpeakerReview: string;
      trademarkRegistry: string;
      domainAvailability: string;
    };
  };
  comparison: {
    openBatchCompare: string;
    batchCompareTitle: string;
    fromBatch: string;
    customPlaceholder: string;
    addCustomButton: string;
    tableCriterion: string;
    lengthMetric: string;
    measuredAvgMetric: string;
    inspectReport: string;
    summaryTitle: string;
    compactLeader: string;
    readabilityLeader: string;
    ratingLeader: string;
    noFakeWinnerNote: string;
    sourceLabels: {
      saved: string;
      batch: string;
      custom: string;
    };
  };
}

const EN_LABELS: NameIntelligenceLabels = {
  reportTitle: 'Name Intelligence Report',
  executiveBadge: 'Transparent evaluation & decision support',
  sectionTitles: {
    s01: '01. Name Identification & Structure',
    s02: '02. Linguistic Analysis',
    s03: '03. Quality Evaluation (10 Criteria)',
    s04: '04. Creative & Semantic Analysis',
    s05: '05. Visual Identity & Name Variations',
    s06: '06. Recommendations & Decision',
  },
  originClassifications: {
    algorithmic: 'Algorithmic composition',
    'language-inspired': 'Language-inspired creative pattern',
    'source-attested': 'Source-attested personal name',
    'native-reviewed': 'Human-rated / reviewed',
    unverified: 'Unverified custom input',
  },
  verificationStatuses: {
    'automatically-verified': 'Automatically verified',
    'automatically-evaluated': 'Automatically evaluated',
    estimated: 'Estimated (structural)',
    'requires-human-review': 'Requires human review',
    'native-review-pending': 'Native review pending',
    'not-verified': 'Not verified',
    'insufficient-data': 'Insufficient data',
  },
  criteriaLabels: {
    scriptIntegrity: 'Script integrity',
    textHygiene: 'Text hygiene',
    pronunciation: 'Pronunciation clarity',
    readability: 'Length & readability',
    memorability: 'Compactness & memorability',
    distinctiveness: 'Batch distinctiveness',
    categoryFit: 'Category relevance',
    naturalness: 'Language naturalness',
    culturalSuitability: 'Cultural suitability',
    brandPotential: 'Commercial & brand portability',
  },
  criteriaMethods: {
    'automatic-rule': 'Deterministic script/Unicode rule',
    'batch-comparison': 'Batch candidate comparison',
    'structural-estimate': 'Structural heuristic estimate',
    'human-rating': 'Your manual rating',
    'safety-screen': 'Local risk & trademark screen',
    unmeasured: 'Not measurable offline',
  },
  pronunciationLevels: {
    easy: 'Straightforward',
    moderate: 'Moderate',
    challenging: 'Challenging / context-dependent',
    unknown: 'Cannot estimate reliably',
  },
  actions: {
    printReport: 'Print',
    exportTxt: 'Export .TXT',
    exportJson: 'Export .JSON',
    compareNames: 'Compare Names',
    backToGenerator: 'Open Generator',
  },
  labels: {
    analyzedName: 'Analyzed name',
    generationMethod: 'Source mode',
    generationMethods: {
      'attested-dataset': 'Attested dataset',
      'algorithmic-engine': 'Local generator engine',
      'custom-input': 'Custom entry',
    },
    originClassification: 'Origin classification',
    overallStatus: 'Verification status',
    writingDirection: 'Writing direction',
    alphabetClass: 'Script system',
    syllabicUnits: 'Syllabic / structural segmentation',
    pronunciationDifficulty: 'Indicative pronunciation',
    phoneticProfile: 'Phonetic & rhythmic observations',
    morphologicalNotes: 'Morphological & structural notes',
    transliteration: 'Transliteration & portability',
    ambiguitiesRisks: 'Potential ambiguities & risks',
    arabicChecks: 'Arabic orthography & diacritics check',
    japaneseChecks: 'Japanese script breakdown',
    soundIdentityHeading: 'Creative sound impression',
    soundIdentityDisclaimer: 'Interpretive creative reading only — not an objective phonetic law.',
    thematicUniverses: 'Relevant thematic contexts',
    targetAudience: 'Likely target contexts',
    categoryCompatibility: 'Category fit assessment',
    visualPresets: 'Preview visual direction',
    presetNames: {
      'archetype-primary': 'Category Signature',
      'minimal-editorial': 'Minimalist Editorial',
      'modern-mono': 'Structured Mono',
    },
    typographyGuide: 'Script-compatible typography',
    categorizedVariations: 'Structured name variations',
    variationGroups: {
      short: 'Short / compact',
      extended: 'Extended',
      alternativeSpelling: 'Alternative spelling',
      username: 'Handle / username',
      logoFriendly: 'Monogram / logo mark',
    },
    visualExtensions: 'Channel adaptation examples',
    extensionChannels: {
      social: 'Social handle',
      profile: 'Display profile',
      website: 'Domain concept',
      brand: 'Brand wordmark',
      gaming: 'Player tag',
    },
    strengths: 'Observed strengths',
    weaknesses: 'Observed limitations',
    improvements: 'Practical improvement paths',
    recommendedVariations: 'Actionable variation ideas',
    potentialConfusions: 'Confusion & ambiguity alerts',
    usageRecommendations: 'Suggested applications',
    verificationChecklist: 'Transparency & verification checklist',
    completedBadge: 'Done',
    pendingBadge: 'Pending',
    checklistItems: {
      scriptConsistency: 'Automatic character & script check',
      textCleanliness: 'Unicode & formatting hygiene check',
      readabilityStructure: 'Length & structural segmentation analysis',
      batchComparison: 'Uniqueness check across current batch',
      preliminarySafety: 'Local known-mark & risk screen',
      nativeSpeakerReview: 'Native speaker naturalness & idiom review',
      trademarkRegistry: 'Official trademark registry search (WIPO/EUIPO/USPTO/INPI)',
      domainAvailability: 'Live domain & social handle availability check',
    },
  },
  comparison: {
    openBatchCompare: 'Compare batch',
    batchCompareTitle: 'Compare generated names side by side',
    fromBatch: 'Add from current batch…',
    customPlaceholder: 'Enter any custom name to compare…',
    addCustomButton: 'Add',
    tableCriterion: 'Criterion',
    lengthMetric: 'Letters',
    measuredAvgMetric: 'Measured avg',
    inspectReport: 'Inspect report',
    summaryTitle: 'Comparative summary',
    compactLeader: 'Most compact:',
    readabilityLeader: 'Highest readability signal:',
    ratingLeader: 'Highest user rating:',
    noFakeWinnerNote: 'Comparison highlights measurable traits alongside pending human criteria; no automated check replaces human review or legal clearance.',
    sourceLabels: {
      saved: 'Saved',
      batch: 'Current batch',
      custom: 'Custom',
    },
  },
};

const FR_LABELS: NameIntelligenceLabels = {
  reportTitle: 'Rapport d’Intelligence du Nom',
  executiveBadge: 'Évaluation transparente et aide à la décision',
  sectionTitles: {
    s01: '01. Identification et structure du nom',
    s02: '02. Analyse linguistique',
    s03: '03. Évaluation qualité (10 critères)',
    s04: '04. Analyse créative et sémantique',
    s05: '05. Identité visuelle et déclinaisons',
    s06: '06. Recommandations et décision',
  },
  originClassifications: {
    algorithmic: 'Composition algorithmique',
    'language-inspired': 'Création inspirée d’une langue',
    'source-attested': 'Prénom attesté sur source',
    'native-reviewed': 'Évalué par un utilisateur',
    unverified: 'Saisie personnalisée non vérifiée',
  },
  verificationStatuses: {
    'automatically-verified': 'Vérifié automatiquement',
    'automatically-evaluated': 'Évalué automatiquement',
    estimated: 'Estimé (structurel)',
    'requires-human-review': 'Revue humaine requise',
    'native-review-pending': 'Validation native en attente',
    'not-verified': 'Non vérifié',
    'insufficient-data': 'Données insuffisantes',
  },
  criteriaLabels: {
    scriptIntegrity: 'Intégrité du script',
    textHygiene: 'Hygiène textuelle',
    pronunciation: 'Clarté de prononciation',
    readability: 'Longueur et lisibilité',
    memorability: 'Compacité et mémorisation',
    distinctiveness: 'Distinctivité dans le lot',
    categoryFit: 'Pertinence catégorie',
    naturalness: 'Naturalité linguistique',
    culturalSuitability: 'Adéquation culturelle',
    brandPotential: 'Potentiel de marque et portabilité',
  },
  criteriaMethods: {
    'automatic-rule': 'Règle déterministe de script/Unicode',
    'batch-comparison': 'Comparaison avec le lot courant',
    'structural-estimate': 'Estimation structurelle indicative',
    'human-rating': 'Votre note manuelle',
    'safety-screen': 'Filtrage local risques & marques',
    unmeasured: 'Non mesurable hors-ligne',
  },
  pronunciationLevels: {
    easy: 'Fluide / directe',
    moderate: 'Modérée',
    challenging: 'Exigeante / contextuelle',
    unknown: 'Estimation impossible',
  },
  actions: {
    printReport: 'Imprimer',
    exportTxt: 'Exporter .TXT',
    exportJson: 'Exporter .JSON',
    compareNames: 'Comparer les noms',
    backToGenerator: 'Ouvrir le générateur',
  },
  labels: {
    analyzedName: 'Nom analysé',
    generationMethod: 'Mode d’origine',
    generationMethods: {
      'attested-dataset': 'Base attestée',
      'algorithmic-engine': 'Moteur générateur local',
      'custom-input': 'Saisie libre',
    },
    originClassification: 'Classification d’origine',
    overallStatus: 'Statut de vérification',
    writingDirection: 'Sens d’écriture',
    alphabetClass: 'Famille d’écriture',
    syllabicUnits: 'Segmentation syllabique / structurelle',
    pronunciationDifficulty: 'Difficulté de prononciation indicative',
    phoneticProfile: 'Observations rythmiques et sonores',
    morphologicalNotes: 'Notes morphologiques et structurelles',
    transliteration: 'Translittération et portabilité',
    ambiguitiesRisks: 'Ambiguïtés et risques potentiels',
    arabicChecks: 'Vérification orthographique et voyelles arabes',
    japaneseChecks: 'Répartition des écritures japonaises',
    soundIdentityHeading: 'Perception sonore créative',
    soundIdentityDisclaimer: 'Lecture créative interprétative uniquement — ne constitue pas une loi phonétique.',
    thematicUniverses: 'Univers thématiques pertinents',
    targetAudience: 'Publics ou contextes cibles',
    categoryCompatibility: 'Compatibilité avec la catégorie',
    visualPresets: 'Prévisualiser une direction visuelle',
    presetNames: {
      'archetype-primary': 'Signature catégorie',
      'minimal-editorial': 'Éditorial minimaliste',
      'modern-mono': 'Tech & Mono',
    },
    typographyGuide: 'Typographies compatibles avec le script',
    categorizedVariations: 'Déclinaisons structurées du nom',
    variationGroups: {
      short: 'Courte / compacte',
      extended: 'Étendue',
      alternativeSpelling: 'Graphie alternative',
      username: 'Pseudo / identifiant',
      logoFriendly: 'Monogramme / sigle',
    },
    visualExtensions: 'Exemples d’extensions par canal',
    extensionChannels: {
      social: 'Identifiant social',
      profile: 'Nom de profil',
      website: 'Concept de domaine',
      brand: 'Logotype marque',
      gaming: 'Tag joueur',
    },
    strengths: 'Forces observées',
    weaknesses: 'Limites observées',
    improvements: 'Pistes d’amélioration concrètes',
    recommendedVariations: 'Variantes recommandées avec justification',
    potentialConfusions: 'Risques de confusion et ambiguïtés',
    usageRecommendations: 'Usages conseillés',
    verificationChecklist: 'Liste de contrôle et transparence',
    completedBadge: 'Fait',
    pendingBadge: 'À vérifier',
    checklistItems: {
      scriptConsistency: 'Contrôle automatique des caractères et du script',
      textCleanliness: 'Contrôle d’hygiène Unicode et formatage',
      readabilityStructure: 'Analyse de longueur et segmentation structurelle',
      batchComparison: 'Vérification de distinctivité dans le lot',
      preliminarySafety: 'Filtrage local des marques connues et termes sensibles',
      nativeSpeakerReview: 'Relecture par un locuteur natif (ton, naturel, argot)',
      trademarkRegistry: 'Recherche officielle de marques (INPI, EUIPO, USPTO, WIPO)',
      domainAvailability: 'Vérification en ligne des domaines et pseudos',
    },
  },
  comparison: {
    openBatchCompare: 'Comparer le lot',
    batchCompareTitle: 'Comparer les noms générés côte à côte',
    fromBatch: 'Ajouter depuis ce lot…',
    customPlaceholder: 'Saisir un nom personnalisé à comparer…',
    addCustomButton: 'Ajouter',
    tableCriterion: 'Critère',
    lengthMetric: 'Lettres',
    measuredAvgMetric: 'Moy. mesurée',
    inspectReport: 'Ouvrir le rapport',
    summaryTitle: 'Synthèse comparative',
    compactLeader: 'Plus compact :',
    readabilityLeader: 'Meilleur signal de lisibilité :',
    ratingLeader: 'Mieux noté par vous :',
    noFakeWinnerNote: 'La comparaison distingue les mesures locales des critères nécessitant une validation humaine ou juridique.',
    sourceLabels: {
      saved: 'Enregistré',
      batch: 'Lot actuel',
      custom: 'Personnalisé',
    },
  },
};

type RecursivePartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? RecursivePartial<T[K]> : T[K];
};

const COMPACT_OVERRIDES: Partial<Record<LanguageCode, RecursivePartial<NameIntelligenceLabels>>> = {
  es: {
    reportTitle: 'Informe de Inteligencia del Nombre',
    executiveBadge: 'Evaluación transparente y apoyo a la decisión',
    sectionTitles: {
      s01: '01. Identificación y estructura del nombre',
      s02: '02. Análisis lingüístico',
      s03: '03. Evaluación de calidad (10 criterios)',
      s04: '04. Análisis creativo y semántico',
      s05: '05. Identidad visual y variantes',
      s06: '06. Recomendaciones y decisión',
    },
    originClassifications: {
      algorithmic: 'Composición algorítmica',
      'language-inspired': 'Creación inspirada en el idioma',
      'source-attested': 'Nombre atestiguado en fuente',
      'native-reviewed': 'Revisado por el usuario',
      unverified: 'Entrada personalizada sin verificar',
    },
    verificationStatuses: {
      'automatically-verified': 'Verificado automáticamente',
      'automatically-evaluated': 'Evaluado automáticamente',
      estimated: 'Estimado (estructural)',
      'requires-human-review': 'Requiere revisión humana',
      'native-review-pending': 'Revisión nativa pendiente',
      'not-verified': 'No verificado',
      'insufficient-data': 'Datos insuficientes',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integridad de escritura',
      textHygiene: 'Higiene del texto',
      pronunciation: 'Claridad de pronunciación',
      readability: 'Longitud y legibilidad',
      memorability: 'Compacidad y memorización',
      distinctiveness: 'Distintividad en el lote',
      categoryFit: 'Relevancia de categoría',
      naturalness: 'Naturalidad lingüística',
      culturalSuitability: 'Adecuación cultural',
      brandPotential: 'Portabilidad y potencial de marca',
    },
    actions: { printReport: 'Imprimir', exportTxt: 'Exportar .TXT', exportJson: 'Exportar .JSON', compareNames: 'Comparar nombres', backToGenerator: 'Abrir generador' },
    comparison: { openBatchCompare: 'Comparar lote', summaryTitle: 'Resumen comparativo', compactLeader: 'Más compacto:', readabilityLeader: 'Mayor legibilidad:', ratingLeader: 'Mejor valorado:', customPlaceholder: 'Introduce un nombre para comparar…', addCustomButton: 'Añadir' },
  },
  de: {
    reportTitle: 'Namens-Intelligenzbericht',
    executiveBadge: 'Transparente Bewertung & Entscheidungshilfe',
    sectionTitles: {
      s01: '01. Namensidentifikation & Struktur',
      s02: '02. Linguistische Analyse',
      s03: '03. Qualitätsbewertung (10 Kriterien)',
      s04: '04. Kreative & semantische Analyse',
      s05: '05. Visuelle Identität & Varianten',
      s06: '06. Empfehlungen & Entscheidung',
    },
    originClassifications: {
      algorithmic: 'Algorithmische Komposition',
      'language-inspired': 'Sprachinspirierte Schöpfung',
      'source-attested': 'Quellenbelegter Name',
      'native-reviewed': 'Vom Nutzer bewertet',
      unverified: 'Ungeprüfte Eigeneingabe',
    },
    verificationStatuses: {
      'automatically-verified': 'Automatisch geprüft',
      'automatically-evaluated': 'Automatisch bewertet',
      estimated: 'Geschätzt (strukturell)',
      'requires-human-review': 'Menschliche Prüfung nötig',
      'native-review-pending': 'Muttersprachliche Prüfung ausstehend',
      'not-verified': 'Nicht verifiziert',
      'insufficient-data': 'Unzureichende Daten',
    },
    criteriaLabels: {
      scriptIntegrity: 'Schriftkonsistenz',
      textHygiene: 'Texthygiene',
      pronunciation: 'Ausspracheklarheit',
      readability: 'Länge & Lesbarkeit',
      memorability: 'Einprägsamkeit',
      distinctiveness: 'Eigenständigkeit im Stapel',
      categoryFit: 'Kategorie-Passung',
      naturalness: 'Sprachliche Natürlichkeit',
      culturalSuitability: 'Kulturelle Eignung',
      brandPotential: 'Marken-Portabilität',
    },
    actions: { printReport: 'Drucken', exportTxt: 'Export .TXT', exportJson: 'Export .JSON', compareNames: 'Namen vergleichen', backToGenerator: 'Generator öffnen' },
    comparison: { openBatchCompare: 'Stapel vergleichen', summaryTitle: 'Vergleichsübersicht', compactLeader: 'Kompaktester Name:', readabilityLeader: 'Beste Lesbarkeit:', ratingLeader: 'Höchste Bewertung:', customPlaceholder: 'Eigenen Namen zum Vergleichen eingeben…', addCustomButton: 'Hinzufügen' },
  },
  it: {
    reportTitle: 'Report di Intelligenza del Nome',
    executiveBadge: 'Valutazione trasparente e supporto decisionale',
    sectionTitles: {
      s01: '01. Identificazione e struttura del nome',
      s02: '02. Analisi linguistica',
      s03: '03. Valutazione qualità (10 criteri)',
      s04: '04. Analisi creativa e semantica',
      s05: '05. Identità visiva e varianti',
      s06: '06. Raccomandazioni e decisione',
    },
    originClassifications: {
      algorithmic: 'Composizione algoritmica',
      'language-inspired': 'Creazione ispirata alla lingua',
      'source-attested': 'Nome attestato da fonte',
      'native-reviewed': 'Valutato dall’utente',
      unverified: 'Voce personalizzata non verificata',
    },
    verificationStatuses: {
      'automatically-verified': 'Verificato automaticamente',
      'automatically-evaluated': 'Valutato automaticamente',
      estimated: 'Stimato (strutturale)',
      'requires-human-review': 'Richiede revisione umana',
      'native-review-pending': 'Revisione madrelingua in attesa',
      'not-verified': 'Non verificato',
      'insufficient-data': 'Dati insufficienti',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integrità della scrittura',
      textHygiene: 'Igiene del testo',
      pronunciation: 'Chiarezza di pronuncia',
      readability: 'Lunghezza e leggibilità',
      memorability: 'Compattezza e memorabilità',
      distinctiveness: 'Distintività nel lotto',
      categoryFit: 'Pertinenza categoria',
      naturalness: 'Naturalezza linguistica',
      culturalSuitability: 'Idoneità culturale',
      brandPotential: 'Portabilità e potenziale brand',
    },
    actions: { printReport: 'Stampa', exportTxt: 'Esporta .TXT', exportJson: 'Esporta .JSON', compareNames: 'Confronta nomi', backToGenerator: 'Apri generatore' },
    comparison: { openBatchCompare: 'Confronta lotto', summaryTitle: 'Sintesi comparativa', compactLeader: 'Più compatto:', readabilityLeader: 'Migliore leggibilità:', ratingLeader: 'Più votato:', customPlaceholder: 'Inserisci un nome da confrontare…', addCustomButton: 'Aggiungi' },
  },
  pt: {
    reportTitle: 'Relatório de Inteligência do Nome',
    executiveBadge: 'Avaliação transparente e apoio à decisão',
    sectionTitles: {
      s01: '01. Identificação e estrutura do nome',
      s02: '02. Análise linguística',
      s03: '03. Avaliação de qualidade (10 critérios)',
      s04: '04. Análise criativa e semântica',
      s05: '05. Identidade visual e variações',
      s06: '06. Recomendações e decisão',
    },
    originClassifications: {
      algorithmic: 'Composição algorítmica',
      'language-inspired': 'Criação inspirada no idioma',
      'source-attested': 'Nome atestado em fonte',
      'native-reviewed': 'Avaliado pelo usuário',
      unverified: 'Entrada personalizada não verificada',
    },
    verificationStatuses: {
      'automatically-verified': 'Verificado automaticamente',
      'automatically-evaluated': 'Avaliado automaticamente',
      estimated: 'Estimado (estrutural)',
      'requires-human-review': 'Requer revisão humana',
      'native-review-pending': 'Revisão nativa pendente',
      'not-verified': 'Não verificado',
      'insufficient-data': 'Dados insuficientes',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integridade da escrita',
      textHygiene: 'Higiene do texto',
      pronunciation: 'Clareza de pronúncia',
      readability: 'Comprimento e legibilidade',
      memorability: 'Concisão e memorização',
      distinctiveness: 'Distintividade no lote',
      categoryFit: 'Aderência à categoria',
      naturalness: 'Naturalidade linguística',
      culturalSuitability: 'Adequação cultural',
      brandPotential: 'Portabilidade e potencial de marca',
    },
    actions: { printReport: 'Imprimir', exportTxt: 'Exportar .TXT', exportJson: 'Exportar .JSON', compareNames: 'Comparar nomes', backToGenerator: 'Abrir gerador' },
    comparison: { openBatchCompare: 'Comparar lote', summaryTitle: 'Resumo comparativo', compactLeader: 'Mais compacto:', readabilityLeader: 'Maior legibilidade:', ratingLeader: 'Melhor avaliado:', customPlaceholder: 'Digite um nome para comparar…', addCustomButton: 'Adicionar' },
  },
  ar: {
    reportTitle: 'تقرير ذكاء الاسم الشامل',
    executiveBadge: 'تقييم شفاف ودعم لاتخاذ القرار',
    sectionTitles: {
      s01: '01. تعريف الاسم وبنيته',
      s02: '02. التحليل اللغوي والكتابي',
      s03: '03. تقييم الجودة (10 معايير)',
      s04: '04. التحليل الإبداعي والدلالي',
      s05: '05. الهوية البصرية والتنويعات',
      s06: '06. التوصيات والقرار النهائي',
    },
    originClassifications: {
      algorithmic: 'تركيب خوارزمي محلي',
      'language-inspired': 'نمط إبداعي مستوحى من اللغة',
      'source-attested': 'اسم شخصي موثّق المصدر',
      'native-reviewed': 'مُقيّم بشريًا',
      unverified: 'إدخال مخصص غير متحقق منه',
    },
    verificationStatuses: {
      'automatically-verified': 'تم التحقق آليًا',
      'automatically-evaluated': 'تم التقييم آليًا',
      estimated: 'تقدير بنيوي',
      'requires-human-review': 'يتطلب مراجعة بشرية',
      'native-review-pending': 'بانتظار مراجعة متحدث أصلي',
      'not-verified': 'غير متحقق منه',
      'insufficient-data': 'بيانات غير كافية',
    },
    criteriaLabels: {
      scriptIntegrity: 'سلامة الخط ونظام الكتابة',
      textHygiene: 'نظافة النص والترميز',
      pronunciation: 'وضوح النطق المبدئي',
      readability: 'الطول وسهولة القراءة',
      memorability: 'الإيجاز وسهولة التذكر',
      distinctiveness: 'التفرّد ضمن الدفعة',
      categoryFit: 'ملاءمة الفئة',
      naturalness: 'الطبيعية اللغوية',
      culturalSuitability: 'الملاءمة الثقافية',
      brandPotential: 'قابلية الاستخدام كعلامة',
    },
    actions: { printReport: 'طباعة', exportTxt: 'تصدير .TXT', exportJson: 'تصدير .JSON', compareNames: 'مقارنة الأسماء', backToGenerator: 'فتح المولّد' },
    comparison: { openBatchCompare: 'مقارنة المجموعة', summaryTitle: 'ملخص المقارنة', compactLeader: 'الأكثر إيجازًا:', readabilityLeader: 'أعلى وضوح قراءة:', ratingLeader: 'الأعلى تقييمًا:', customPlaceholder: 'أدخل اسمًا للمقارنة…', addCustomButton: 'إضافة', tableCriterion: 'المعيار' },
  },
  tr: {
    reportTitle: 'Kapsamlı Ad Zekâsı Raporu',
    executiveBadge: 'Şeffaf değerlendirme ve karar desteği',
    sectionTitles: {
      s01: '01. Ad Kimliği ve Yapısı',
      s02: '02. Dilbilimsel Analiz',
      s03: '03. Kalite Değerlendirmesi (10 Ölçüt)',
      s04: '04. Yaratıcı ve Anlamsal Analiz',
      s05: '05. Görsel Kimlik ve Varyasyonlar',
      s06: '06. Öneriler ve Karar',
    },
    originClassifications: {
      algorithmic: 'Algoritmik bileşim',
      'language-inspired': 'Dilden esinlenen yaratıcı ad',
      'source-attested': 'Kaynakla doğrulanmış ad',
      'native-reviewed': 'Kullanıcı tarafından değerlendirildi',
      unverified: 'Doğrulanmamış özel giriş',
    },
    verificationStatuses: {
      'automatically-verified': 'Otomatik doğrulandı',
      'automatically-evaluated': 'Otomatik değerlendirildi',
      estimated: 'Tahmini (yapısal)',
      'requires-human-review': 'İnsan incelemesi gerekli',
      'native-review-pending': 'Ana dil incelemesi bekliyor',
      'not-verified': 'Doğrulanmadı',
      'insufficient-data': 'Yetersiz veri',
    },
    criteriaLabels: {
      scriptIntegrity: 'Yazı sistemi bütünlüğü',
      textHygiene: 'Metin ve kodlama temizliği',
      pronunciation: 'Telaffuz açıklığı',
      readability: 'Uzunluk ve okunabilirlik',
      memorability: 'Kısalık ve akılda kalıcılık',
      distinctiveness: 'Liste içi özgünlük',
      categoryFit: 'Kategori uyumu',
      naturalness: 'Dilsel doğallık',
      culturalSuitability: 'Kültürel uygunluk',
      brandPotential: 'Marka taşınabilirliği',
    },
    actions: { printReport: 'Yazdır', exportTxt: '.TXT İndir', exportJson: '.JSON İndir', compareNames: 'Adları Karşılaştır', backToGenerator: 'Oluşturucuyu Aç' },
    comparison: { openBatchCompare: 'Listeyi karşılaştır', summaryTitle: 'Karşılaştırma özeti', compactLeader: 'En kısa:', readabilityLeader: 'En okunaklı:', ratingLeader: 'En yüksek puan:', customPlaceholder: 'Karşılaştırmak için ad yazın…', addCustomButton: 'Ekle' },
  },
  ja: {
    reportTitle: 'ネーミング総合インテリジェンスレポート',
    executiveBadge: '透明性の高い評価と意思決定サポート',
    sectionTitles: {
      s01: '01. 名前の識別と構造',
      s02: '02. 言語・文字分析',
      s03: '03. 品質評価（10項目）',
      s04: '04. 創作的・意味的分析',
      s05: '05. ビジュアル方向性と派生案',
      s06: '06. 推奨事項と最終判断',
    },
    originClassifications: {
      algorithmic: 'アルゴリズム合成',
      'language-inspired': '言語着想の創作名',
      'source-attested': '出典確認済みの名前',
      'native-reviewed': 'ユーザー評価済み',
      unverified: '未検証の自由入力',
    },
    verificationStatuses: {
      'automatically-verified': '自動検証済み',
      'automatically-evaluated': '自動評価済み',
      estimated: '推定（構造ベース）',
      'requires-human-review': '人の確認が必要',
      'native-review-pending': '母語話者の確認待ち',
      'not-verified': '未検証',
      'insufficient-data': 'データ不足',
    },
    criteriaLabels: {
      scriptIntegrity: '文字体系の整合性',
      textHygiene: 'テキストと表記の整然性',
      pronunciation: '発音の明瞭さ',
      readability: '長さと読みやすさ',
      memorability: '簡潔さと記憶定着性',
      distinctiveness: 'バッチ内の独自性',
      categoryFit: 'カテゴリ適合性',
      naturalness: '言語的な自然さ',
      culturalSuitability: '文化的適合性',
      brandPotential: 'ブランド汎用性',
    },
    actions: { printReport: '印刷', exportTxt: '.TXT出力', exportJson: '.JSON出力', compareNames: '名前を比較', backToGenerator: 'ジェネレーターを開く' },
    comparison: { openBatchCompare: '一括比較', summaryTitle: '比較サマリー', compactLeader: '最も簡潔:', readabilityLeader: '読みやすさ指標トップ:', ratingLeader: '最高評価:', customPlaceholder: '比較したい名前を入力…', addCustomButton: '追加' },
  },
  ko: {
    reportTitle: '이름 인텔리전스 종합 리포트',
    executiveBadge: '투명한 평가 및 의사결정 지원',
    sectionTitles: {
      s01: '01. 이름 식별 및 구조',
      s02: '02. 언어 및 문자 분석',
      s03: '03. 품질 평가 (10개 기준)',
      s04: '04. 창의적 · 의미적 분석',
      s05: '05. 시각적 정체성 및 변형안',
      s06: '06. 권장 사항 및 결정',
    },
    originClassifications: {
      algorithmic: '알고리즘 조합',
      'language-inspired': '언어에서 영감을 얻은 창작',
      'source-attested': '출처 확인된 이름',
      'native-reviewed': '사용자 평가됨',
      unverified: '미검증 사용자 입력',
    },
    verificationStatuses: {
      'automatically-verified': '자동 검증됨',
      'automatically-evaluated': '자동 평가됨',
      estimated: '추정치 (구조 기반)',
      'requires-human-review': '사람의 검토 필요',
      'native-review-pending': '원어민 검토 대기',
      'not-verified': '미검증',
      'insufficient-data': '데이터 부족',
    },
    criteriaLabels: {
      scriptIntegrity: '문자 체계 일관성',
      textHygiene: '텍스트 및 유니코드 정합성',
      pronunciation: '발음 명확성',
      readability: '길이 및 가독성',
      memorability: '간결함 및 기억 용이성',
      distinctiveness: '목록 내 차별성',
      categoryFit: '카테고리 적합성',
      naturalness: '언어적 자연스러움',
      culturalSuitability: '문화적 적절성',
      brandPotential: '브랜드 확장성',
    },
    actions: { printReport: '인쇄', exportTxt: '.TXT 내보내기', exportJson: '.JSON 내보내기', compareNames: '이름 비교', backToGenerator: '생성기 열기' },
    comparison: { openBatchCompare: '목록 비교', summaryTitle: '비교 요약', compactLeader: '가장 간결함:', readabilityLeader: '가독성 신호 우수:', ratingLeader: '최고 평점:', customPlaceholder: '비교할 이름 입력…', addCustomButton: '추가' },
  },
  zh: {
    reportTitle: '名称智能分析与决策报告',
    executiveBadge: '透明评估与命名决策支持',
    sectionTitles: {
      s01: '01. 名称识别与结构',
      s02: '02. 语言与文字分析',
      s03: '03. 质量评估（10项指标）',
      s04: '04. 创意与语义分析',
      s05: '05. 视觉识别与名称变体',
      s06: '06. 实用建议与决策清单',
    },
    originClassifications: {
      algorithmic: '算法组合生成',
      'language-inspired': '受语言启发的创意名称',
      'source-attested': '有出处记载的名称',
      'native-reviewed': '用户已评分',
      unverified: '未验证的自定义输入',
    },
    verificationStatuses: {
      'automatically-verified': '已自动校验',
      'automatically-evaluated': '已自动评估',
      estimated: '结构估算',
      'requires-human-review': '需人工复核',
      'native-review-pending': '待母语者审核',
      'not-verified': '未验证',
      'insufficient-data': '数据不足',
    },
    criteriaLabels: {
      scriptIntegrity: '文字体系一致性',
      textHygiene: '文本与编码规范性',
      pronunciation: '发音清晰度',
      readability: '长度与可读性',
      memorability: '简洁度与记忆度',
      distinctiveness: '同批区分度',
      categoryFit: '类别契合度',
      naturalness: '语言自然度',
      culturalSuitability: '文化适配度',
      brandPotential: '品牌通用潜力',
    },
    actions: { printReport: '打印', exportTxt: '导出 .TXT', exportJson: '导出 .JSON', compareNames: '对比名称', backToGenerator: '打开生成器' },
    comparison: { openBatchCompare: '对比本批', summaryTitle: '对比摘要', compactLeader: '最简洁:', readabilityLeader: '可读性最高:', ratingLeader: '评分最高:', customPlaceholder: '输入任意名称进行对比…', addCustomButton: '添加' },
  },
  ru: {
    reportTitle: 'Интеллектуальный отчёт по имени',
    executiveBadge: 'Прозрачная оценка и поддержка выбора',
    sectionTitles: {
      s01: '01. Идентификация и структура имени',
      s02: '02. Лингвистический анализ',
      s03: '03. Оценка качества (10 критериев)',
      s04: '04. Творческий и семантический анализ',
      s05: '05. Визуальная айдентика и вариации',
      s06: '06. Рекомендации и решение',
    },
    originClassifications: {
      algorithmic: 'Алгоритмическая композиция',
      'language-inspired': 'Стилизация на основе языка',
      'source-attested': 'Подтверждённое источником имя',
      'native-reviewed': 'Оценено пользователем',
      unverified: 'Непроверенный пользовательский ввод',
    },
    verificationStatuses: {
      'automatically-verified': 'Автопроверка пройдена',
      'automatically-evaluated': 'Оценено автоматически',
      estimated: 'Оценка (структурная)',
      'requires-human-review': 'Нужна проверка человеком',
      'native-review-pending': 'Ожидает носителя языка',
      'not-verified': 'Не проверено',
      'insufficient-data': 'Недостаточно данных',
    },
    criteriaLabels: {
      scriptIntegrity: 'Целостность письменности',
      textHygiene: 'Чистота текста и Unicode',
      pronunciation: 'Ясность произношения',
      readability: 'Длина и читаемость',
      memorability: 'Краткость и запоминаемость',
      distinctiveness: 'Выделимость в подборке',
      categoryFit: 'Соответствие категории',
      naturalness: 'Языковая естественность',
      culturalSuitability: 'Культурная уместность',
      brandPotential: 'Бренд-потенциал и переносимость',
    },
    actions: { printReport: 'Печать', exportTxt: 'Экспорт .TXT', exportJson: 'Экспорт .JSON', compareNames: 'Сравнить имена', backToGenerator: 'Открыть генератор' },
    comparison: { openBatchCompare: 'Сравнить подборку', summaryTitle: 'Сводка сравнения', compactLeader: 'Самое компактное:', readabilityLeader: 'Лучшая читаемость:', ratingLeader: 'Высшая оценка:', customPlaceholder: 'Введите имя для сравнения…', addCustomButton: 'Добавить' },
  },
  hi: {
    reportTitle: 'नाम इंटेलिजेंस रिपोर्ट',
    executiveBadge: 'पारदर्शी मूल्यांकन और निर्णय सहायता',
    sectionTitles: {
      s01: '01. नाम पहचान और संरचना',
      s02: '02. भाषाई विश्लेषण',
      s03: '03. गुणवत्ता मूल्यांकन (10 मानदंड)',
      s04: '04. रचनात्मक और अर्थ विश्लेषण',
      s05: '05. दृश्य पहचान और विविध रूप',
      s06: '06. सुझाव और निर्णय',
    },
    originClassifications: {
      algorithmic: 'एल्गोरिदमिक संयोजन',
      'language-inspired': 'भाषा-प्रेरित रचना',
      'source-attested': 'स्रोत-प्रमाणित नाम',
      'native-reviewed': 'उपयोगकर्ता द्वारा समीक्षित',
      unverified: 'असत्यापित कस्टम इनपुट',
    },
    verificationStatuses: {
      'automatically-verified': 'स्वचालित रूप से सत्यापित',
      'automatically-evaluated': 'स्वचालित मूल्यांकित',
      estimated: 'अनुमानित (संरचनात्मक)',
      'requires-human-review': 'मानवीय समीक्षा आवश्यक',
      'native-review-pending': 'मूल वक्ता समीक्षा लंबित',
      'not-verified': 'सत्यापित नहीं',
      'insufficient-data': 'अपर्याप्त डेटा',
    },
    criteriaLabels: {
      scriptIntegrity: 'लिपि की एकरूपता',
      textHygiene: 'टेक्स्ट एवं यूनिकोड स्वच्छता',
      pronunciation: 'उच्चारण स्पष्टता',
      readability: 'लंबाई और पठनीयता',
      memorability: 'संक्षिप्तता और स्मरणीयता',
      distinctiveness: 'बैच में विशिष्टता',
      categoryFit: 'श्रेणी उपयुक्तता',
      naturalness: 'भाषाई स्वाभाविकता',
      culturalSuitability: 'सांस्कृतिक उपयुक्तता',
      brandPotential: 'ब्रांड और पोर्टेबिलिटी क्षमता',
    },
    actions: { printReport: 'प्रिंट', exportTxt: '.TXT निर्यात', exportJson: '.JSON निर्यात', compareNames: 'नामों की तुलना करें', backToGenerator: 'जनरेटर खोलें' },
    comparison: { openBatchCompare: 'बैच तुलना करें', summaryTitle: 'तुलनात्मक सारांश', compactLeader: 'सबसे संक्षिप्त:', readabilityLeader: 'सर्वश्रेष्ठ पठनीयता:', ratingLeader: 'उच्चतम रेटिंग:', customPlaceholder: 'तुलना के लिए नाम दर्ज करें…', addCustomButton: 'जोड़ें' },
  },
  nl: {
    reportTitle: 'Naamintelligentierapport',
    executiveBadge: 'Transparante evaluatie en keuzehulp',
    sectionTitles: {
      s01: '01. Naamidentificatie en structuur',
      s02: '02. Taalkundige analyse',
      s03: '03. Kwaliteitsbeoordeling (10 criteria)',
      s04: '04. Creatieve en semantische analyse',
      s05: '05. Visuele identiteit en variaties',
      s06: '06. Aanbevelingen en beslissing',
    },
    originClassifications: {
      algorithmic: 'Algoritmische samenstelling',
      'language-inspired': 'Taal-geïnspireerde creatie',
      'source-attested': 'Bron-geattesteerde naam',
      'native-reviewed': 'Door gebruiker beoordeeld',
      unverified: 'Ongecontroleerde eigen invoer',
    },
    verificationStatuses: {
      'automatically-verified': 'Automatisch gecontroleerd',
      'automatically-evaluated': 'Automatisch geëvalueerd',
      estimated: 'Geschat (structureel)',
      'requires-human-review': 'Menselijke controle vereist',
      'native-review-pending': 'Controle door moedertaalspreker vereist',
      'not-verified': 'Niet geverifieerd',
      'insufficient-data': 'Onvoldoende gegevens',
    },
    criteriaLabels: {
      scriptIntegrity: 'Schriftintegriteit',
      textHygiene: 'Teksthygiëne',
      pronunciation: 'Uitspraakduidelijkheid',
      readability: 'Lengte en leesbaarheid',
      memorability: 'Beknoptheid en herkenbaarheid',
      distinctiveness: 'Onderscheidendheid in batch',
      categoryFit: 'Categorie-geschiktheid',
      naturalness: 'Taalkundige natuurlijkheid',
      culturalSuitability: 'Culturele geschiktheid',
      brandPotential: 'Merkpotentieel & draagbaarheid',
    },
    actions: { printReport: 'Afdrukken', exportTxt: 'Exporteer .TXT', exportJson: 'Exporteer .JSON', compareNames: 'Namen vergelijken', backToGenerator: 'Open generator' },
    comparison: { openBatchCompare: 'Batch vergelijken', summaryTitle: 'Vergelijkingsoverzicht', compactLeader: 'Meest compact:', readabilityLeader: 'Hoogste leesbaarheid:', ratingLeader: 'Hoogste score:', customPlaceholder: 'Voer een naam in om te vergelijken…', addCustomButton: 'Toevoegen' },
  },
  pl: {
    reportTitle: 'Raport Inteligencji Nazwy',
    executiveBadge: 'Przejrzysta ocena i wsparcie decyzji',
    sectionTitles: {
      s01: '01. Identyfikacja i struktura nazwy',
      s02: '02. Analiza językowa',
      s03: '03. Ocena jakości (10 kryteriów)',
      s04: '04. Analiza twórcza i semantyczna',
      s05: '05. Tożsamość wizualna i warianty',
      s06: '06. Rekomendacje i decyzja',
    },
    originClassifications: {
      algorithmic: 'Kompozycja algorytmiczna',
      'language-inspired': 'Twórczość inspirowana językiem',
      'source-attested': 'Nazwa potwierdzona źródłowo',
      'native-reviewed': 'Oceniona przez użytkownika',
      unverified: 'Niezweryfikowany wpis własny',
    },
    verificationStatuses: {
      'automatically-verified': 'Zweryfikowano automatycznie',
      'automatically-evaluated': 'Oceniono automatycznie',
      estimated: 'Szacowane (strukturalnie)',
      'requires-human-review': 'Wymaga przeglądu człowieka',
      'native-review-pending': 'Oczekuje na native speakera',
      'not-verified': 'Niezweryfikowano',
      'insufficient-data': 'Za mało danych',
    },
    criteriaLabels: {
      scriptIntegrity: 'Spójność pisma',
      textHygiene: 'Higiena tekstu i Unicode',
      pronunciation: 'Przejrzystość wymowy',
      readability: 'Długość i czytelność',
      memorability: 'Zwięzłość i zapamiętywalność',
      distinctiveness: 'Wyróżnialność w zestawie',
      categoryFit: 'Dopasowanie do kategorii',
      naturalness: 'Naturalność językowa',
      culturalSuitability: 'Stosowność kulturowa',
      brandPotential: 'Potencjał marki i przenośność',
    },
    actions: { printReport: 'Drukuj', exportTxt: 'Eksport .TXT', exportJson: 'Eksport .JSON', compareNames: 'Porównaj nazwy', backToGenerator: 'Otwórz generator' },
    comparison: { openBatchCompare: 'Porównaj zestaw', summaryTitle: 'Podsumowanie porównania', compactLeader: 'Najkrótsza:', readabilityLeader: 'Najlepsza czytelność:', ratingLeader: 'Najwyższa ocena:', customPlaceholder: 'Wpisz nazwę do porównania…', addCustomButton: 'Dodaj' },
  },
  sv: {
    reportTitle: 'Namnintelligensrapport',
    executiveBadge: 'Transparent utvärdering och beslutsstöd',
    sectionTitles: {
      s01: '01. Namnidentifikation och struktur',
      s02: '02. Språklig analys',
      s03: '03. Kvalitetsbedömning (10 kriterier)',
      s04: '04. Kreativ och semantisk analys',
      s05: '05. Visuell identitet och varianter',
      s06: '06. Rekommendationer och beslut',
    },
    originClassifications: {
      algorithmic: 'Algoritmisk sammansättning',
      'language-inspired': 'Språkinspirerad skapelse',
      'source-attested': 'Källbelagt namn',
      'native-reviewed': 'Bedömt av användare',
      unverified: 'Ogranskad egen inmatning',
    },
    verificationStatuses: {
      'automatically-verified': 'Automatiskt verifierad',
      'automatically-evaluated': 'Automatiskt utvärderad',
      estimated: 'Uppskattad (strukturell)',
      'requires-human-review': 'Kräver mänsklig granskning',
      'native-review-pending': 'Väntar på modersmålstalare',
      'not-verified': 'Ej verifierad',
      'insufficient-data': 'Otillräcklig data',
    },
    criteriaLabels: {
      scriptIntegrity: 'Skriftintegritet',
      textHygiene: 'Texthygien',
      pronunciation: 'Uttalstydlighet',
      readability: 'Längd och läsbarhet',
      memorability: 'Korthet och minnesvärdhet',
      distinctiveness: 'Särprägel i omgång',
      categoryFit: 'Kategoripassning',
      naturalness: 'Språklig naturlighet',
      culturalSuitability: 'Kulturell lämplighet',
      brandPotential: 'Varumärkespotential',
    },
    actions: { printReport: 'Skriv ut', exportTxt: 'Exportera .TXT', exportJson: 'Exportera .JSON', compareNames: 'Jämför namn', backToGenerator: 'Öppna generator' },
    comparison: { openBatchCompare: 'Jämför omgång', summaryTitle: 'Jämförelseöversikt', compactLeader: 'Mest kompakt:', readabilityLeader: 'Högst läsbarhet:', ratingLeader: 'Högst betyg:', customPlaceholder: 'Ange ett namn att jämföra…', addCustomButton: 'Lägg till' },
  },
  vi: {
    reportTitle: 'Báo Cáo Phân Tích Tên Chuyên Sâu',
    executiveBadge: 'Đánh giá minh bạch & hỗ trợ quyết định',
    sectionTitles: {
      s01: '01. Nhận diện & cấu trúc tên',
      s02: '02. Phân tích ngôn ngữ',
      s03: '03. Đánh giá chất lượng (10 tiêu chí)',
      s04: '04. Phân tích sáng tạo & ngữ nghĩa',
      s05: '05. Nhận diện thị giác & biến thể',
      s06: '06. Khuyến nghị & quyết định',
    },
    originClassifications: {
      algorithmic: 'Tổ hợp thuật toán',
      'language-inspired': 'Sáng tạo lấy cảm hứng ngôn ngữ',
      'source-attested': 'Tên có nguồn xác thực',
      'native-reviewed': 'Đã được người dùng đánh giá',
      unverified: 'Tên tự nhập chưa xác minh',
    },
    verificationStatuses: {
      'automatically-verified': 'Đã kiểm tra tự động',
      'automatically-evaluated': 'Đã đánh giá tự động',
      estimated: 'Ước tính (cấu trúc)',
      'requires-human-review': 'Cần con người rà soát',
      'native-review-pending': 'Chờ người bản ngữ kiểm tra',
      'not-verified': 'Chưa xác minh',
      'insufficient-data': 'Thiếu dữ liệu',
    },
    criteriaLabels: {
      scriptIntegrity: 'Tính toàn vẹn chữ viết',
      textHygiene: 'Độ sạch văn bản & Unicode',
      pronunciation: 'Độ rõ khi phát âm',
      readability: 'Độ dài & khả năng đọc',
      memorability: 'Tính gọn gàng & dễ nhớ',
      distinctiveness: 'Độ khác biệt trong danh sách',
      categoryFit: 'Mức phù hợp danh mục',
      naturalness: 'Độ tự nhiên ngôn ngữ',
      culturalSuitability: 'Mức phù hợp văn hóa',
      brandPotential: 'Tiềm năng thương hiệu',
    },
    actions: { printReport: 'In báo cáo', exportTxt: 'Xuất .TXT', exportJson: 'Xuất .JSON', compareNames: 'So sánh tên', backToGenerator: 'Mở trình tạo' },
    comparison: { openBatchCompare: 'So sánh danh sách', summaryTitle: 'Tóm tắt so sánh', compactLeader: 'Gọn nhất:', readabilityLeader: 'Dễ đọc nhất:', ratingLeader: 'Đánh giá cao nhất:', customPlaceholder: 'Nhập tên tùy chỉnh để so sánh…', addCustomButton: 'Thêm' },
  },
  id: {
    reportTitle: 'Laporan Intelijen Nama',
    executiveBadge: 'Evaluasi transparan & dukungan keputusan',
    sectionTitles: {
      s01: '01. Identifikasi & Struktur Nama',
      s02: '02. Analisis Linguistik',
      s03: '03. Evaluasi Kualitas (10 Kriteria)',
      s04: '04. Analisis Kreatif & Semantik',
      s05: '05. Identitas Visual & Variasi',
      s06: '06. Rekomendasi & Keputusan',
    },
    originClassifications: {
      algorithmic: 'Komposisi algoritmik',
      'language-inspired': 'Kreasi terinspirasi bahasa',
      'source-attested': 'Nama terverifikasi sumber',
      'native-reviewed': 'Dinilai oleh pengguna',
      unverified: 'Input kustom belum terverifikasi',
    },
    verificationStatuses: {
      'automatically-verified': 'Diverifikasi otomatis',
      'automatically-evaluated': 'Dievaluasi otomatis',
      estimated: 'Perkiraan (struktural)',
      'requires-human-review': 'Perlu tinjauan manusia',
      'native-review-pending': 'Menunggu penutur asli',
      'not-verified': 'Belum terverifikasi',
      'insufficient-data': 'Data tidak cukup',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integritas aksara',
      textHygiene: 'Kebersihan teks & Unicode',
      pronunciation: 'Kejelasan pelafalan',
      readability: 'Panjang & keterbacaan',
      memorability: 'Keringkasan & daya ingat',
      distinctiveness: 'Keunikan dalam batch',
      categoryFit: 'Kesesuaian kategori',
      naturalness: 'Kealamian bahasa',
      culturalSuitability: 'Kesesuaian budaya',
      brandPotential: 'Potensi & portabilitas merek',
    },
    actions: { printReport: 'Cetak', exportTxt: 'Ekspor .TXT', exportJson: 'Ekspor .JSON', compareNames: 'Bandingkan Nama', backToGenerator: 'Buka Generator' },
    comparison: { openBatchCompare: 'Bandingkan batch', summaryTitle: 'Ringkasan perbandingan', compactLeader: 'Paling ringkas:', readabilityLeader: 'Keterbacaan terbaik:', ratingLeader: 'Nilai tertinggi:', customPlaceholder: 'Masukkan nama untuk dibandingkan…', addCustomButton: 'Tambah' },
  },
  th: {
    reportTitle: 'รายงานวิเคราะห์ชื่อเชิงลึก',
    executiveBadge: 'การประเมินอย่างโปร่งใสและตัวช่วยตัดสินใจ',
    sectionTitles: {
      s01: '01. การระบุชื่อและโครงสร้าง',
      s02: '02. การวิเคราะห์ทางภาษา',
      s03: '03. การประเมินคุณภาพ (10 เกณฑ์)',
      s04: '04. การวิเคราะห์เชิงสร้างสรรค์และความหมาย',
      s05: '05. อัตลักษณ์ภาพและรูปแบบต่อยอด',
      s06: '06. คำแนะนำและการตัดสินใจ',
    },
    originClassifications: {
      algorithmic: 'การประกอบเชิงอัลกอริทึม',
      'language-inspired': 'ชื่อสร้างสรรค์ตามแรงบันดาลใจทางภาษา',
      'source-attested': 'ชื่อที่มีแหล่งอ้างอิงรองรับ',
      'native-reviewed': 'ประเมินโดยผู้ใช้แล้ว',
      unverified: 'ข้อความกำหนดเองที่ยังไม่ตรวจสอบ',
    },
    verificationStatuses: {
      'automatically-verified': 'ตรวจสอบอัตโนมัติแล้ว',
      'automatically-evaluated': 'ประเมินอัตโนมัติแล้ว',
      estimated: 'ประมาณการเชิงโครงสร้าง',
      'requires-human-review': 'ต้องให้คนตรวจสอบ',
      'native-review-pending': 'รอเจ้าของภาษาตรวจสอบ',
      'not-verified': 'ยังไม่ได้ตรวจสอบ',
      'insufficient-data': 'ข้อมูลไม่เพียงพอ',
    },
    criteriaLabels: {
      scriptIntegrity: 'ความสมบูรณ์ของอักษร',
      textHygiene: 'ความสะอาดของอักขระ',
      pronunciation: 'ความชัดเจนในการออกเสียง',
      readability: 'ความยาวและความอ่านง่าย',
      memorability: 'ความกระชับและจดจำง่าย',
      distinctiveness: 'ความโดดเด่นในชุดคำ',
      categoryFit: 'ความเหมาะสมกับหมวดหมู่',
      naturalness: 'ความเป็นธรรมชาติทางภาษา',
      culturalSuitability: 'ความเหมาะสมทางวัฒนธรรม',
      brandPotential: 'ศักยภาพการใช้เป็นแบรนด์',
    },
    actions: { printReport: 'พิมพ์', exportTxt: 'ส่งออก .TXT', exportJson: 'ส่งออก .JSON', compareNames: 'เปรียบเทียบชื่อ', backToGenerator: 'เปิดเครื่องมือสร้าง' },
    comparison: { openBatchCompare: 'เปรียบเทียบชุดนี้', summaryTitle: 'สรุปการเปรียบเทียบ', compactLeader: 'กระชับที่สุด:', readabilityLeader: 'อ่านง่ายที่สุด:', ratingLeader: 'คะแนนสูงสุด:', customPlaceholder: 'พิมพ์ชื่อที่ต้องการเปรียบเทียบ…', addCustomButton: 'เพิ่ม' },
  },
  el: {
    reportTitle: 'Αναφορά Ευφυΐας Ονόματος',
    executiveBadge: 'Διαφανής αξιολόγηση και υποστήριξη επιλογής',
    sectionTitles: {
      s01: '01. Ταυτότητα και δομή ονόματος',
      s02: '02. Γλωσσολογική ανάλυση',
      s03: '03. Αξιολόγηση ποιότητας (10 κριτήρια)',
      s04: '04. Δημιουργική και σημασιολογική ανάλυση',
      s05: '05. Οπτική ταυτότητα και παραλλαγές',
      s06: '06. Συστάσεις και απόφαση',
    },
    originClassifications: {
      algorithmic: 'Αλγοριθμική σύνθεση',
      'language-inspired': 'Δημιουργία εμπνευσμένη από τη γλώσσα',
      'source-attested': 'Όνομα επιβεβαιωμένο από πηγή',
      'native-reviewed': 'Αξιολογήθηκε από τον χρήστη',
      unverified: 'Μη επαληθευμένη προσαρμοσμένη καταχώριση',
    },
    verificationStatuses: {
      'automatically-verified': 'Αυτόματα επαληθευμένο',
      'automatically-evaluated': 'Αυτόματα αξιολογημένο',
      estimated: 'Εκτίμηση (δομική)',
      'requires-human-review': 'Απαιτεί ανθρώπινο έλεγχο',
      'native-review-pending': 'Εκκρεμεί έλεγχος φυσικού ομιλητή',
      'not-verified': 'Μη επαληθευμένο',
      'insufficient-data': 'Ανεπαρκή δεδομένα',
    },
    criteriaLabels: {
      scriptIntegrity: 'Ακεραιότητα γραφής',
      textHygiene: 'Καθαρότητα κειμένου & Unicode',
      pronunciation: 'Σαφήνεια προφοράς',
      readability: 'Μήκος και αναγνωσιμότητα',
      memorability: 'Συντομία και απομνημόνευση',
      distinctiveness: 'Διακριτότητα στην παρτίδα',
      categoryFit: 'Συνάφεια κατηγορίας',
      naturalness: 'Γλωσσική φυσικότητα',
      culturalSuitability: 'Πολιτισμική καταλληλότητα',
      brandPotential: 'Δυναμική & φορητότητα μάρκας',
    },
    actions: { printReport: 'Εκτύπωση', exportTxt: 'Εξαγωγή .TXT', exportJson: 'Εξαγωγή .JSON', compareNames: 'Σύγκριση ονομάτων', backToGenerator: 'Άνοιγμα δημιουργού' },
    comparison: { openBatchCompare: 'Σύγκριση παρτίδας', summaryTitle: 'Σύνοψη σύγκρισης', compactLeader: 'Πιο σύντομο:', readabilityLeader: 'Καλύτερη αναγνωσιμότητα:', ratingLeader: 'Υψηλότερη βαθμολογία:', customPlaceholder: 'Εισαγάγετε όνομα για σύγκριση…', addCustomButton: 'Προσθήκη' },
  },
  he: {
    reportTitle: 'דוח מודיעין שם מקיף',
    executiveBadge: 'הערכה שקופה ותמיכה בקבלת החלטות',
    sectionTitles: {
      s01: '01. זיהוי השם ומבנהו',
      s02: '02. ניתוח בלשני ומערכת כתב',
      s03: '03. הערכת איכות (10 קריטריונים)',
      s04: '04. ניתוח יצירתי וסמנטי',
      s05: '05. זהות חזותית וגרסאות שם',
      s06: '06. המלצות והחלטה',
    },
    originClassifications: {
      algorithmic: 'הרכבה אלגוריתמית',
      'language-inspired': 'יצירה בהשראת השפה',
      'source-attested': 'שם מאומת ממקור',
      'native-reviewed': 'דורג על ידי המשתמש',
      unverified: 'קלט מותאם אישית לא מאומת',
    },
    verificationStatuses: {
      'automatically-verified': 'אומת אוטומטית',
      'automatically-evaluated': 'הוערך אוטומטית',
      estimated: 'מוערך (מבני)',
      'requires-human-review': 'דורש בדיקה אנושית',
      'native-review-pending': 'ממתין לבדיקת דובר שפת אם',
      'not-verified': 'לא אומת',
      'insufficient-data': 'אין מספיק נתונים',
    },
    criteriaLabels: {
      scriptIntegrity: 'תקינות הכתב',
      textHygiene: 'ניקיון טקסט ו-Unicode',
      pronunciation: 'בהירות הגייה',
      readability: 'אורך וקריאות',
      memorability: 'תמציתיות וזכירות',
      distinctiveness: 'בידול באצווה',
      categoryFit: 'התאמה לקטגוריה',
      naturalness: 'טבעיות לשונית',
      culturalSuitability: 'התאמה תרבותית',
      brandPotential: 'פוטנציאל וניידות מותג',
    },
    actions: { printReport: 'הדפסה', exportTxt: 'ייצוא .TXT', exportJson: 'ייצוא .JSON', compareNames: 'השוואת שמות', backToGenerator: 'פתיחת המחולל' },
    comparison: { openBatchCompare: 'השוואת אצווה', summaryTitle: 'סיכום השוואה', compactLeader: 'הקצר ביותר:', readabilityLeader: 'קריאות מיטבית:', ratingLeader: 'הדירוג הגבוה ביותר:', customPlaceholder: 'הזינו שם להשוואה…', addCustomButton: 'הוספה' },
  },
  cs: {
    reportTitle: 'Zpráva o inteligenci názvu',
    executiveBadge: 'Transparentní hodnocení a podpora rozhodnutí',
    sectionTitles: {
      s01: '01. Identifikace a struktura názvu',
      s02: '02. Jazyková analýza',
      s03: '03. Hodnocení kvality (10 kritérií)',
      s04: '04. Kreativní a významová analýza',
      s05: '05. Vizuální identita a varianty',
      s06: '06. Doporučení a rozhodnutí',
    },
    originClassifications: {
      algorithmic: 'Algoritmické složení',
      'language-inspired': 'Tvorba inspirovaná jazykem',
      'source-attested': 'Jméno doložené zdrojem',
      'native-reviewed': 'Hodnoceno uživatelem',
      unverified: 'Neověřený vlastní vstup',
    },
    verificationStatuses: {
      'automatically-verified': 'Automaticky ověřeno',
      'automatically-evaluated': 'Automaticky vyhodnoceno',
      estimated: 'Odhadnuto (strukturně)',
      'requires-human-review': 'Vyžaduje kontrolu člověkem',
      'native-review-pending': 'Čeká na rodilého mluvčího',
      'not-verified': 'Neověřeno',
      'insufficient-data': 'Nedostatek údajů',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integrita písma',
      textHygiene: 'Hygiena textu a Unicode',
      pronunciation: 'Srozumitelnost výslovnosti',
      readability: 'Délka a čitelnost',
      memorability: 'Stručnost a zapamatovatelnost',
      distinctiveness: 'Odlišitelnost v dávce',
      categoryFit: 'Vhodnost pro kategorii',
      naturalness: 'Jazyková přirozenost',
      culturalSuitability: 'Kulturní vhodnost',
      brandPotential: 'Potenciál značky a přenosnost',
    },
    actions: { printReport: 'Tisk', exportTxt: 'Export .TXT', exportJson: 'Export .JSON', compareNames: 'Porovnat názvy', backToGenerator: 'Otevřít generátor' },
    comparison: { openBatchCompare: 'Porovnat dávku', summaryTitle: 'Shrnutí porovnání', compactLeader: 'Nejkompaktnější:', readabilityLeader: 'Nejlepší čitelnost:', ratingLeader: 'Nejvyšší hodnocení:', customPlaceholder: 'Zadejte vlastní název k porovnání…', addCustomButton: 'Přidat' },
  },
  ro: {
    reportTitle: 'Raport de Inteligență a Numelui',
    executiveBadge: 'Evaluare transparentă și suport decizional',
    sectionTitles: {
      s01: '01. Identificare și structura numelui',
      s02: '02. Analiză lingvistică',
      s03: '03. Evaluarea calității (10 criterii)',
      s04: '04. Analiză creativă și semantică',
      s05: '05. Identitate vizuală și variații',
      s06: '06. Recomandări și decizie',
    },
    originClassifications: {
      algorithmic: 'Compoziție algoritmică',
      'language-inspired': 'Creație inspirată din limbă',
      'source-attested': 'Nume atestat din surse',
      'native-reviewed': 'Evaluat de utilizator',
      unverified: 'Intrare personalizată neverificată',
    },
    verificationStatuses: {
      'automatically-verified': 'Verificat automat',
      'automatically-evaluated': 'Evaluat automat',
      estimated: 'Estimat (structural)',
      'requires-human-review': 'Necesită verificare umană',
      'native-review-pending': 'În așteptarea unui vorbitor nativ',
      'not-verified': 'Neverificat',
      'insufficient-data': 'Date insuficiente',
    },
    criteriaLabels: {
      scriptIntegrity: 'Integritatea scrierii',
      textHygiene: 'Igiena textului și Unicode',
      pronunciation: 'Claritatea pronunției',
      readability: 'Lungime și lizibilitate',
      memorability: 'Concizie și memorabilitate',
      distinctiveness: 'Distincție în lot',
      categoryFit: 'Potrivire cu categoria',
      naturalness: 'Naturalețe lingvistică',
      culturalSuitability: 'Adecvare culturală',
      brandPotential: 'Potențial și portabilitate de brand',
    },
    actions: { printReport: 'Tipărire', exportTxt: 'Export .TXT', exportJson: 'Export .JSON', compareNames: 'Compară nume', backToGenerator: 'Deschide generatorul' },
    comparison: { openBatchCompare: 'Compară lotul', summaryTitle: 'Sinteză comparativă', compactLeader: 'Cel mai compact:', readabilityLeader: 'Cea mai bună lizibilitate:', ratingLeader: 'Cel mai bine evaluat:', customPlaceholder: 'Introdu un nume pentru comparație…', addCustomButton: 'Adaugă' },
  },
  da: {
    reportTitle: 'Navneintelligens-rapport',
    executiveBadge: 'Gennemsigtig vurdering og beslutningsstøtte',
    sectionTitles: {
      s01: '01. Navneidentifikation og struktur',
      s02: '02. Sproglig analyse',
      s03: '03. Kvalitetsvurdering (10 kriterier)',
      s04: '04. Kreativ og semantisk analyse',
      s05: '05. Visuel identitet og varianter',
      s06: '06. Anbefalinger og beslutning',
    },
    originClassifications: {
      algorithmic: 'Algoritmisk sammensætning',
      'language-inspired': 'Sproginspireret skabelse',
      'source-attested': 'Kildebelagt navn',
      'native-reviewed': 'Vurderet af bruger',
      unverified: 'Uverificeret brugerindtastning',
    },
    verificationStatuses: {
      'automatically-verified': 'Automatisk verificeret',
      'automatically-evaluated': 'Automatisk evalueret',
      estimated: 'Estimeret (strukturelt)',
      'requires-human-review': 'Kræver menneskelig gennemgang',
      'native-review-pending': 'Afventer modersmålstaler',
      'not-verified': 'Ikke verificeret',
      'insufficient-data': 'Utilstrækkelige data',
    },
    criteriaLabels: {
      scriptIntegrity: 'Skriftintegritet',
      textHygiene: 'Teksthygiejne',
      pronunciation: 'Udtaleklarhed',
      readability: 'Længde og læsbarhed',
      memorability: 'Korthed og huskværdighed',
      distinctiveness: 'Særpræg i listen',
      categoryFit: 'Kategorie-egnethed',
      naturalness: 'Sproglig naturlighed',
      culturalSuitability: 'Kulturel egnethed',
      brandPotential: 'Brandpotentiale og portabilitet',
    },
    actions: { printReport: 'Udskriv', exportTxt: 'Eksportér .TXT', exportJson: 'Eksportér .JSON', compareNames: 'Sammenlign navne', backToGenerator: 'Åbn generator' },
    comparison: { openBatchCompare: 'Sammenlign liste', summaryTitle: 'Sammenligningsoversigt', compactLeader: 'Mest kompakt:', readabilityLeader: 'Højeste læsbarhed:', ratingLeader: 'Højeste vurdering:', customPlaceholder: 'Indtast et navn til sammenligning…', addCustomButton: 'Tilføj' },
  },
  fi: {
    reportTitle: 'Nimiälykkyysraportti',
    executiveBadge: 'Läpinäkyvä arviointi ja päätöksenteon tuki',
    sectionTitles: {
      s01: '01. Nimen tunnistus ja rakenne',
      s02: '02. Kielellinen analyysi',
      s03: '03. Laadunarviointi (10 kriteeriä)',
      s04: '04. Luova ja semanttinen analyysi',
      s05: '05. Visuaalinen identiteetti ja muunnelmat',
      s06: '06. Suositukset ja päätös',
    },
    originClassifications: {
      algorithmic: 'Algoritminen yhdistelmä',
      'language-inspired': 'Kielestä inspiroitunut luomus',
      'source-attested': 'Lähteestä todennettu nimi',
      'native-reviewed': 'Käyttäjän arvioima',
      unverified: 'Vahvistamaton oma syöte',
    },
    verificationStatuses: {
      'automatically-verified': 'Automaattisesti tarkistettu',
      'automatically-evaluated': 'Automaattisesti arvioitu',
      estimated: 'Arvioitu (rakenteellinen)',
      'requires-human-review': 'Vaatii ihmisen tarkistuksen',
      'native-review-pending': 'Odottaa äidinkielistä tarkistusta',
      'not-verified': 'Ei tarkistettu',
      'insufficient-data': 'Riittämättömästi tietoja',
    },
    criteriaLabels: {
      scriptIntegrity: 'Kirjoitusjärjestelmän eheys',
      textHygiene: 'Tekstihygienia',
      pronunciation: 'Ääntämisen selkeys',
      readability: 'Pituus ja luettavuus',
      memorability: 'Tiiviys ja muistettavuus',
      distinctiveness: 'Erottuvuus erässä',
      categoryFit: 'Luokkaan sopivuus',
      naturalness: 'Kielellinen luontevuus',
      culturalSuitability: 'Kulttuurinen sopivuus',
      brandPotential: 'Brändipotentiaali ja siirrettävyys',
    },
    actions: { printReport: 'Tulosta', exportTxt: 'Vie .TXT', exportJson: 'Vie .JSON', compareNames: 'Vertaa nimiä', backToGenerator: 'Avaa generaattori' },
    comparison: { openBatchCompare: 'Vertaa erää', summaryTitle: 'Vertailuyhteenveto', compactLeader: 'Tiivein:', readabilityLeader: 'Paras luettavuus:', ratingLeader: 'Korkein arvio:', customPlaceholder: 'Syötä oma nimi vertailuun…', addCustomButton: 'Lisää' },
  },
  uk: {
    reportTitle: 'Звіт інтелектуального аналізу імені',
    executiveBadge: 'Прозора оцінка та підтримка вибору',
    sectionTitles: {
      s01: '01. Ідентифікація та структура назви',
      s02: '02. Лінгвістичний аналіз',
      s03: '03. Оцінка якості (10 критеріїв)',
      s04: '04. Творчий та семантичний аналіз',
      s05: '05. Візуальна айдентика та варіації',
      s06: '06. Рекомендації та рішення',
    },
    originClassifications: {
      algorithmic: 'Алгоритмічна композиція',
      'language-inspired': 'Мовно натхненний твір',
      'source-attested': 'Підтверджене джерелом ім’я',
      'native-reviewed': 'Оцінено користувачем',
      unverified: 'Неперевірений власний ввід',
    },
    verificationStatuses: {
      'automatically-verified': 'Автоматично перевірено',
      'automatically-evaluated': 'Оцінено автоматично',
      estimated: 'Оцінка (структурна)',
      'requires-human-review': 'Потрібна перевірка людиною',
      'native-review-pending': 'Очікує носія мови',
      'not-verified': 'Не перевірено',
      'insufficient-data': 'Недостатньо даних',
    },
    criteriaLabels: {
      scriptIntegrity: 'Цілісність писемності',
      textHygiene: 'Чистота тексту та Unicode',
      pronunciation: 'Чіткість вимови',
      readability: 'Довжина та читабельність',
      memorability: 'Стислість та запам’ятовуваність',
      distinctiveness: 'Вирізнення у наборі',
      categoryFit: 'Відповідність категорії',
      naturalness: 'Мовна природність',
      culturalSuitability: 'Культурна доречність',
      brandPotential: 'Потенціал і портативність бренду',
    },
    actions: { printReport: 'Друк', exportTxt: 'Експорт .TXT', exportJson: 'Експорт .JSON', compareNames: 'Порівняти назви', backToGenerator: 'Відкрити генератор' },
    comparison: { openBatchCompare: 'Порівняти набір', summaryTitle: 'Порівняльний підсумок', compactLeader: 'Найкомпактніше:', readabilityLeader: 'Найкраща читаність:', ratingLeader: 'Найвища оцінка:', customPlaceholder: 'Введіть назву для порівняння…', addCustomButton: 'Додати' },
  },
  bn: {
    reportTitle: 'নাম ইন্টেলিজেন্স প্রতিবেদন',
    executiveBadge: 'স্বচ্ছ মূল্যায়ন ও সিদ্ধান্ত সহায়তা',
    sectionTitles: {
      s01: '01. নাম শনাক্তকরণ ও গঠন',
      s02: '02. ভাষাগত বিশ্লেষণ',
      s03: '03. মান মূল্যায়ন (১০টি মানদণ্ড)',
      s04: '04. সৃজনশীল ও অর্থগত বিশ্লেষণ',
      s05: '05. ভিজ্যুয়াল পরিচয় ও বিকল্প রূপ',
      s06: '06. পরামর্শ ও চূড়ান্ত সিদ্ধান্ত',
    },
    originClassifications: {
      algorithmic: 'অ্যালগরিদমিক গঠন',
      'language-inspired': 'ভাষা-অনুপ্রাণিত সৃষ্টি',
      'source-attested': 'উৎস-সমর্থিত নাম',
      'native-reviewed': 'ব্যবহারকারী কর্তৃক মূল্যায়িত',
      unverified: 'অযাচাইকৃত কাস্টম ইনপুট',
    },
    verificationStatuses: {
      'automatically-verified': 'স্বয়ংক্রিয়ভাবে যাচাইকৃত',
      'automatically-evaluated': 'স্বয়ংক্রিয় মূল্যায়িত',
      estimated: 'অনুমিত (গঠনগত)',
      'requires-human-review': 'মানব পর্যালোচনা প্রয়োজন',
      'native-review-pending': 'মূল ভাষাভাষীর পর্যালোচনা বাকি',
      'not-verified': 'যাচাইকৃত নয়',
      'insufficient-data': 'পর্যাপ্ত তথ্য নেই',
    },
    criteriaLabels: {
      scriptIntegrity: 'লিপির সামঞ্জস্য',
      textHygiene: 'পাঠ্য ও ইউনিকোড পরিচ্ছন্নতা',
      pronunciation: 'উচ্চারণের স্পষ্টতা',
      readability: 'দৈর্ঘ্য ও পাঠযোগ্যতা',
      memorability: 'সংক্ষিপ্ততা ও স্মরণীয়তা',
      distinctiveness: 'ব্যাচে স্বাতন্ত্র্য',
      categoryFit: 'বিভাগের উপযোগিতা',
      naturalness: 'ভাষাগত স্বাভাবিকতা',
      culturalSuitability: 'সাংস্কৃতিক উপযোগিতা',
      brandPotential: 'ব্র্যান্ড সম্ভাবনা ও বহনযোগ্যতা',
    },
    actions: { printReport: 'প্রিন্ট', exportTxt: '.TXT রপ্তানি', exportJson: '.JSON রপ্তানি', compareNames: 'নাম তুলনা করুন', backToGenerator: 'জেনারেটর খুলুন' },
    comparison: { openBatchCompare: 'ব্যাচ তুলনা করুন', summaryTitle: 'তুলনামূলক সারাংশ', compactLeader: 'সবচেয়ে সংক্ষিপ্ত:', readabilityLeader: 'সেরা পাঠযোগ্যতা:', ratingLeader: 'সর্বোচ্চ রেটিং:', customPlaceholder: 'তুলনার জন্য নাম লিখুন…', addCustomButton: 'যোগ করুন' },
  },
  nb: {
    reportTitle: 'Navneintelligensrapport',
    executiveBadge: 'Gjennomsiktig vurdering og beslutningsstøtte',
    sectionTitles: {
      s01: '01. Navneidentifikasjon og struktur',
      s02: '02. Språklig analyse',
      s03: '03. Kvalitetsvurdering (10 kriterier)',
      s04: '04. Kreativ og semantisk analyse',
      s05: '05. Visuell identitet og varianter',
      s06: '06. Anbefalinger og beslutning',
    },
    originClassifications: {
      algorithmic: 'Algoritmisk sammensetning',
      'language-inspired': 'Språkinspirert skapelse',
      'source-attested': 'Kildebelagt navn',
      'native-reviewed': 'Vurdert av bruker',
      unverified: 'Uverifisert egen inndata',
    },
    verificationStatuses: {
      'automatically-verified': 'Automatisk verifisert',
      'automatically-evaluated': 'Automatisk evaluert',
      estimated: 'Estimert (strukturell)',
      'requires-human-review': 'Krever menneskelig vurdering',
      'native-review-pending': 'Venter på morsmålsbruker',
      'not-verified': 'Ikke verifisert',
      'insufficient-data': 'Utilstrekkelige data',
    },
    criteriaLabels: {
      scriptIntegrity: 'Skriftintegritet',
      textHygiene: 'Teksthygiene',
      pronunciation: 'Uttaletydelighet',
      readability: 'Lengde og lesbarhet',
      memorability: 'Korthet og minneverdighet',
      distinctiveness: 'Særpreg i listen',
      categoryFit: 'Kategorie-egnethet',
      naturalness: 'Språklig naturlighet',
      culturalSuitability: 'Kulturell egnethet',
      brandPotential: 'Merkevarepotensial',
    },
    actions: { printReport: 'Skriv ut', exportTxt: 'Eksporter .TXT', exportJson: 'Eksporter .JSON', compareNames: 'Sammenlign navn', backToGenerator: 'Åpne generator' },
    comparison: { openBatchCompare: 'Sammenlign serie', summaryTitle: 'Sammenligningssammendrag', compactLeader: 'Mest kompakt:', readabilityLeader: 'Høyest lesbarhet:', ratingLeader: 'Høyest rangering:', customPlaceholder: 'Skriv inn et navn å sammenligne…', addCustomButton: 'Legg til' },
  },
};

function mergeDeep<T extends Record<string, unknown>>(base: T, override?: RecursivePartial<T>): T {
  if (!override) return base;
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const ov = override[key];
    if (ov === undefined) continue;
    const bv = base[key];
    if (bv && typeof bv === 'object' && !Array.isArray(bv) && ov && typeof ov === 'object' && !Array.isArray(ov)) {
      out[key] = mergeDeep(bv as Record<string, unknown>, ov as RecursivePartial<Record<string, unknown>>);
    } else {
      out[key] = ov;
    }
  }
  return out as T;
}

export function getNameIntelligenceLabels(language: string): NameIntelligenceLabels {
  const canonical = resolveCanonicalLocale(language) as LanguageCode;
  if (canonical === 'fr') return FR_LABELS;
  if (canonical === 'en') return EN_LABELS;
  return mergeDeep(
    EN_LABELS as unknown as Record<string, unknown>,
    COMPACT_OVERRIDES[canonical] as unknown as RecursivePartial<Record<string, unknown>>
  ) as unknown as NameIntelligenceLabels;
}

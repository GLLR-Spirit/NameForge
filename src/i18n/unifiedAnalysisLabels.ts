import type { GenLanguageCode, LanguageCode } from '../types';
import type { CompatibilityStrategy } from '../services/languageCompatibility';

export type UnifiedAnalysisStatus = 'ready' | 'partial' | 'loading' | 'unavailable' | 'error';

export type QualityDimensionKey =
  | 'scriptIntegrity'
  | 'textHygiene'
  | 'readability'
  | 'distinctiveness'
  | 'naturalness'
  | 'categoryFit';

export interface UnifiedAnalysisLabels {
  sheetTitle: string;
  sheetSubtitle: string;
  triggerLabel: string;
  statusLabels: Record<UnifiedAnalysisStatus, string>;
  sections: {
    identityStructure: string;
    linguisticPhonetic: string;
    semanticCultural: string;
    qualityEvaluation: string;
    visualVariations: string;
    practicalRecommendations: string;
  };
  fields: {
    generatorLabel: string;
    styleLabel: string;
    targetLanguageLabel: string;
    orthographicUnits: string;
    moraUnits: string;
    hangulParts: string;
    compatStrategy: string;
    readinessLabel: string;
    readinessPartial: string;
    readinessReferenceRequired: string;
    nonNativeDisclaimer: string;
    attestedBadge: string;
    creativeBadge: string;
    noEtymologyNotice: string;
    semanticUnavailable: string;
    visualUnavailable: string;
    qualityScore: string;
    qualityCoverage: string;
    qualityInterpretation: string;
    measuredLabel: string;
    pendingLabel: string;
    unavailableLabel: string;
    weightLabel: string;
    copyFullSummary: string;
    summaryCopied: string;
    humanRatingLabel: string;
    humanRatingHint: string;
    addNote: string;
    editNote: string;
    openVisualStudio: string;
    openStyleStudio: string;
    highlightsHeading: string;
    watchoutsHeading: string;
    legalHeading: string;
    pronunciationGuide: string;
    listenButton: string;
  };
  dimensions: Record<QualityDimensionKey, string>;
  dimensionHints: Record<QualityDimensionKey, string>;
  strategies: Record<CompatibilityStrategy, string>;
  findings: Record<string, string>;
}

const ENGLISH_LABELS: UnifiedAnalysisLabels = {
  sheetTitle: 'Complete Name Analysis',
  sheetSubtitle: 'Unified structural, linguistic, quality, semantic, and visual profile',
  triggerLabel: 'Complete analysis',
  statusLabels: {
    ready: 'Ready',
    partial: 'Partial',
    loading: 'Loading',
    unavailable: 'Unavailable',
    error: 'Error',
  },
  sections: {
    identityStructure: 'Name structure',
    linguisticPhonetic: 'Linguistic & script readiness',
    semanticCultural: 'Semantic & cultural context',
    qualityEvaluation: 'Quality evaluation',
    visualVariations: 'Visual direction & extensions',
    practicalRecommendations: 'Practical recommendations',
  },
  fields: {
    generatorLabel: 'Category',
    styleLabel: 'Style',
    targetLanguageLabel: 'Target language',
    orthographicUnits: 'Orthographic units',
    moraUnits: 'Japanese kana morae',
    hangulParts: 'Hangul syllable blocks',
    compatStrategy: 'Language adaptation mode',
    readinessLabel: 'Script & pronunciation engine status',
    readinessPartial: 'Partial structural segmentation available',
    readinessReferenceRequired: 'Reference lexicon required for native pronunciation',
    nonNativeDisclaimer: 'Automated metrics do not certify native-speaker naturalness or regional nuance.',
    attestedBadge: 'Attested personal name',
    creativeBadge: 'Creative composition',
    noEtymologyNotice: 'Original creative pattern: no historical etymology or dictionary lineage is claimed.',
    semanticUnavailable: 'No documented historical origin or dictionary meaning applies to this item.',
    visualUnavailable: 'Visual brand direction is intentionally disabled for tactical or combat categories.',
    qualityScore: 'Measured score',
    qualityCoverage: 'Measured coverage',
    qualityInterpretation: 'Explainable partial score: unmeasured human or batch criteria remain pending rather than guessed.',
    measuredLabel: 'Measured',
    pendingLabel: 'Pending',
    unavailableLabel: 'Unavailable',
    weightLabel: 'Weight',
    copyFullSummary: 'Copy full analysis',
    summaryCopied: 'Analysis copied!',
    humanRatingLabel: 'Your evaluation',
    humanRatingHint: 'Your 1–5 rating contributes directly to the human naturalness dimension.',
    addNote: 'Add note',
    editNote: 'Edit note',
    openVisualStudio: 'Open in Creative Studio',
    openStyleStudio: 'Style in Typography Studio',
    highlightsHeading: 'Observed highlights',
    watchoutsHeading: 'Points to verify',
    legalHeading: 'Legal & clearance check',
    pronunciationGuide: 'Readable guide',
    listenButton: 'Listen',
  },
  dimensions: {
    scriptIntegrity: 'Script integrity',
    textHygiene: 'Text hygiene',
    readability: 'Length & readability',
    distinctiveness: 'Batch distinctiveness',
    naturalness: 'Human naturalness',
    categoryFit: 'Category fit',
  },
  dimensionHints: {
    scriptIntegrity: 'Checks whether characters align with the expected writing system.',
    textHygiene: 'Verifies absence of malformed Unicode, placeholders, or control tokens.',
    readability: 'Evaluates visible length compactness without excessive repetition.',
    distinctiveness: 'Measures uniqueness compared to other names in the current batch.',
    naturalness: 'Requires competent human judgment or your rating below.',
    categoryFit: 'Assessed during editorial review in your target use case.',
  },
  strategies: {
    'native-language': 'Native language corpus',
    'culturally-faithful': 'Cultural identity preserved',
    'phonetic-transliteration': 'Script transliteration',
    'experimental-creative-adaptation': 'Controlled creative script adaptation',
    unsupported: 'Native directory unavailable',
  },
  findings: {
    NO_LETTERS: 'Result contains no usable letters.',
    SCRIPT_UNMAPPED: 'No single reference script family is enforced for this language mode.',
    SCRIPT_TRANSLITERATION_REVIEW: 'Primary script differs; confirm this transliteration is intentional.',
    EXPECTED_SCRIPT_ABSENT: 'Expected target script was not detected in this name.',
    MIXED_SCRIPT_REVIEW: 'Multiple writing systems detected; verify mixed-script styling is intentional.',
    SCRIPT_MATCH: 'Characters match the expected writing system cleanly.',
    CONTROL_CHARACTER: 'Unexpected control character detected.',
    LONE_SURROGATE: 'Unpaired UTF-16 character sequence detected.',
    UNRESOLVED_PLACEHOLDER: 'Unresolved template marker detected.',
    RUNTIME_LEAK_TOKEN: 'Technical runtime token detected in text.',
    INVALID_OR_PRIVATE_USE_CHARACTER: 'Replacement or private-use Unicode character detected.',
    REPEATED_CHARACTER_RUN: 'Contains a run of four or more identical characters.',
    TEXT_HYGIENE_OK: 'No encoding or formatting defects detected.',
    LONG_NAME: 'Extended length: verify visual fit and memorability in your layout.',
    VERY_SHORT_NAME: 'Very compact name: verify distinctiveness in context.',
    BATCH_DUPLICATE: 'Appears more than once in the current batch.',
    DISTINCTIVENESS_PENDING: 'Batch uniqueness requires generating alongside peer candidates.',
    HUMAN_NATURALNESS_PENDING: 'Human naturalness awaits your rating or native-speaker review.',
    CATEGORY_FIT_PENDING: 'Domain fit should be reviewed against your project brief.',
  },
};

const FRENCH_LABELS: UnifiedAnalysisLabels = {
  sheetTitle: 'Fiche d’analyse complète',
  sheetSubtitle: 'Profil unifié : structure, linguistique, sémantique, qualité et direction visuelle',
  triggerLabel: 'Analyse complète',
  statusLabels: {
    ready: 'Prêt',
    partial: 'Partiel',
    loading: 'Chargement',
    unavailable: 'Indisponible',
    error: 'Erreur',
  },
  sections: {
    identityStructure: 'Structure du nom',
    linguisticPhonetic: 'Analyse linguistique et écriture',
    semanticCultural: 'Analyse sémantique et culturelle',
    qualityEvaluation: 'Évaluation qualité',
    visualVariations: 'Direction visuelle et déclinaisons',
    practicalRecommendations: 'Recommandations pratiques',
  },
  fields: {
    generatorLabel: 'Catégorie',
    styleLabel: 'Style',
    targetLanguageLabel: 'Langue cible',
    orthographicUnits: 'Unités orthographiques',
    moraUnits: 'Mores kana japonaises',
    hangulParts: 'Blocs syllabiques hangûl',
    compatStrategy: 'Mode d’adaptation linguistique',
    readinessLabel: 'Couverture du moteur d’écriture et prononciation',
    readinessPartial: 'Segmentation structurelle partielle disponible',
    readinessReferenceRequired: 'Lexique de référence requis pour la prononciation native',
    nonNativeDisclaimer: 'Les mesures automatisées ne certifient ni le naturel natif ni les nuances régionales.',
    attestedBadge: 'Prénom réel attesté',
    creativeBadge: 'Création originale',
    noEtymologyNotice: 'Composition créative originale : aucune étymologie historique ni filiation de dictionnaire n’est affirmée.',
    semanticUnavailable: 'Aucune origine historique attestée ni définition lexicographique ne s’applique à ce nom.',
    visualUnavailable: 'La direction visuelle de marque est volontairement désactivée pour les catégories tactiques ou d’armes.',
    qualityScore: 'Score mesuré',
    qualityCoverage: 'Couverture mesurée',
    qualityInterpretation: 'Score partiel explicable : les dimensions humaines ou comparatives non évaluées restent en attente sans estimation artificielle.',
    measuredLabel: 'Mesuré',
    pendingLabel: 'En attente',
    unavailableLabel: 'Indisponible',
    weightLabel: 'Poids',
    copyFullSummary: 'Copier l’analyse complète',
    summaryCopied: 'Analyse copiée !',
    humanRatingLabel: 'Votre évaluation',
    humanRatingHint: 'Votre note de 1 à 5 alimente directement la dimension de naturalité humaine.',
    addNote: 'Ajouter une note',
    editNote: 'Modifier la note',
    openVisualStudio: 'Ouvrir dans l’Atelier Créatif',
    openStyleStudio: 'Styliser dans l’Atelier Typo',
    highlightsHeading: 'Points observés',
    watchoutsHeading: 'Points de vigilance',
    legalHeading: 'Vérification juridique',
    pronunciationGuide: 'Repère de lecture',
    listenButton: 'Écouter',
  },
  dimensions: {
    scriptIntegrity: 'Intégrité du script',
    textHygiene: 'Hygiène textuelle',
    readability: 'Lisibilité & longueur',
    distinctiveness: 'Distinctivité dans le lot',
    naturalness: 'Naturalité humaine',
    categoryFit: 'Pertinence catégorie',
  },
  dimensionHints: {
    scriptIntegrity: 'Vérifie la cohérence des caractères avec le système d’écriture ciblé.',
    textHygiene: 'Contrôle l’absence de caractères invalides, résidus ou marqueurs bruts.',
    readability: 'Mesure la compacité visuelle et la lisibilité du tracé.',
    distinctiveness: 'Compare l’unicité du nom face aux autres propositions du lot.',
    naturalness: 'Nécessite un jugement humain compétent ou votre note ci-dessous.',
    categoryFit: 'À valider selon le ton réel de votre projet.',
  },
  strategies: {
    'native-language': 'Répertoire linguistique natif',
    'culturally-faithful': 'Identité culturelle préservée',
    'phonetic-transliteration': 'Translittération d’écriture',
    'experimental-creative-adaptation': 'Adaptation créative contrôlée',
    unsupported: 'Répertoire natif indisponible',
  },
  findings: {
    NO_LETTERS: 'Le résultat ne contient aucune lettre exploitable.',
    SCRIPT_UNMAPPED: 'Aucune famille de script unique n’est imposée pour ce mode.',
    SCRIPT_TRANSLITERATION_REVIEW: 'Le script principal diffère ; vérifiez si cette translittération est voulue.',
    EXPECTED_SCRIPT_ABSENT: 'Le système d’écriture cible attendu n’a pas été détecté.',
    MIXED_SCRIPT_REVIEW: 'Plusieurs systèmes d’écriture détectés ; vérifiez que ce mélange est voulu.',
    SCRIPT_MATCH: 'Les caractères correspondent fidèlement à l’écriture attendue.',
    CONTROL_CHARACTER: 'Caractère de contrôle technique détecté.',
    LONE_SURROGATE: 'Séquence UTF-16 orpheline détectée.',
    UNRESOLVED_PLACEHOLDER: 'Marqueur de modèle non résolu détecté.',
    RUNTIME_LEAK_TOKEN: 'Jeton technique JavaScript détecté.',
    INVALID_OR_PRIVATE_USE_CHARACTER: 'Caractère de remplacement ou zone privée détecté.',
    REPEATED_CHARACTER_RUN: 'Contient une suite d’au moins quatre caractères identiques.',
    TEXT_HYGIENE_OK: 'Aucun défaut technique de texte détecté.',
    LONG_NAME: 'Longueur élevée : vérifiez la mémorisation et la mise en page.',
    VERY_SHORT_NAME: 'Nom très court : vérifiez qu’il reste suffisamment distinctif.',
    BATCH_DUPLICATE: 'Apparaît plusieurs fois dans le lot actuel.',
    DISTINCTIVENESS_PENDING: 'La comparaison de diversité requiert un lot complet de noms.',
    HUMAN_NATURALNESS_PENDING: 'La naturalité attend votre note ou l’avis d’un locuteur compétent.',
    CATEGORY_FIT_PENDING: 'La pertinence d’usage doit être confirmée selon votre contexte.',
  },
};

type PartialOverride = {
  sheetTitle: string;
  sheetSubtitle: string;
  triggerLabel: string;
  statusLabels: Record<UnifiedAnalysisStatus, string>;
  sections: UnifiedAnalysisLabels['sections'];
  fields: Partial<UnifiedAnalysisLabels['fields']>;
  dimensions: UnifiedAnalysisLabels['dimensions'];
  strategies?: Partial<UnifiedAnalysisLabels['strategies']>;
};

const OTHER_LANGUAGES: Partial<Record<LanguageCode, PartialOverride>> = {
  es: {
    sheetTitle: 'Ficha de análisis completo',
    sheetSubtitle: 'Perfil unificado: estructura, lengua, semántica, calidad y dirección visual',
    triggerLabel: 'Análisis completo',
    statusLabels: { ready: 'Listo', partial: 'Parcial', loading: 'Cargando', unavailable: 'No disponible', error: 'Error' },
    sections: {
      identityStructure: 'Estructura del nombre',
      linguisticPhonetic: 'Análisis lingüístico y escritura',
      semanticCultural: 'Contexto semántico y cultural',
      qualityEvaluation: 'Evaluación de calidad',
      visualVariations: 'Dirección visual y variantes',
      practicalRecommendations: 'Recomendaciones prácticas',
    },
    fields: {
      generatorLabel: 'Categoría', styleLabel: 'Estilo', targetLanguageLabel: 'Idioma objetivo',
      orthographicUnits: 'Unidades ortográficas', compatStrategy: 'Adaptación lingüística',
      attestedBadge: 'Nombre real acreditado', creativeBadge: 'Creación original',
      noEtymologyNotice: 'Patrón creativo original: no se afirma ninguna etimología histórica ni origen de diccionario.',
      qualityScore: 'Puntuación medida', qualityCoverage: 'Cobertura medida',
      measuredLabel: 'Medido', pendingLabel: 'Pendiente', unavailableLabel: 'No disponible',
      copyFullSummary: 'Copiar análisis completo', summaryCopied: '¡Análisis copiado!',
      humanRatingLabel: 'Tu valoración', addNote: 'Añadir nota', editNote: 'Editar nota',
      openVisualStudio: 'Abrir en Estudio Creativo', openStyleStudio: 'Estilizar en Estudio Tipográfico',
      highlightsHeading: 'Aspectos observados', watchoutsHeading: 'Puntos a verificar', legalHeading: 'Revisión legal',
      listenButton: 'Escuchar',
    },
    dimensions: {
      scriptIntegrity: 'Integridad de escritura', textHygiene: 'Higiene del texto', readability: 'Legibilidad y longitud',
      distinctiveness: 'Distintividad en el lote', naturalness: 'Naturalidad humana', categoryFit: 'Encaje de categoría',
    },
  },
  de: {
    sheetTitle: 'Vollständige Namensanalyse',
    sheetSubtitle: 'Vereintes Profil: Struktur, Sprache, Semantik, Qualität und visuelle Richtung',
    triggerLabel: 'Komplettanalyse',
    statusLabels: { ready: 'Bereit', partial: 'Teilweise', loading: 'Laden', unavailable: 'Nicht verfügbar', error: 'Fehler' },
    sections: {
      identityStructure: 'Namensstruktur',
      linguisticPhonetic: 'Sprach- und Schriftanalyse',
      semanticCultural: 'Semantischer und kultureller Kontext',
      qualityEvaluation: 'Qualitätsbewertung',
      visualVariations: 'Visuelle Richtung und Varianten',
      practicalRecommendations: 'Praktische Empfehlungen',
    },
    fields: {
      generatorLabel: 'Kategorie', styleLabel: 'Stil', targetLanguageLabel: 'Zielsprache',
      orthographicUnits: 'Orthografische Einheiten', compatStrategy: 'Sprachanpassung',
      attestedBadge: 'Belegter Vorname', creativeBadge: 'Kreative Neuschöpfung',
      noEtymologyNotice: 'Originelles Kreativmuster: Es wird keine historische Etymologie behauptet.',
      qualityScore: 'Gemessene Punktzahl', qualityCoverage: 'Abdeckung',
      measuredLabel: 'Gemessen', pendingLabel: 'Ausstehend', unavailableLabel: 'Nicht verfügbar',
      copyFullSummary: 'Vollständige Analyse kopieren', summaryCopied: 'Analyse kopiert!',
      humanRatingLabel: 'Deine Bewertung', addNote: 'Notiz hinzufügen', editNote: 'Notiz bearbeiten',
      openVisualStudio: 'Im Kreativstudio öffnen', openStyleStudio: 'Im Typografie-Studio gestalten',
      highlightsHeading: 'Beobachtete Merkmale', watchoutsHeading: 'Prüfpunkte', legalHeading: 'Rechtliche Prüfung',
      listenButton: 'Anhören',
    },
    dimensions: {
      scriptIntegrity: 'Schriftkonsistenz', textHygiene: 'Texthygiene', readability: 'Lesbarkeit & Länge',
      distinctiveness: 'Batch-Eigenständigkeit', naturalness: 'Natürlichkeit', categoryFit: 'Kategorie-Passung',
    },
  },
  it: {
    sheetTitle: 'Scheda di analisi completa',
    sheetSubtitle: 'Profilo unificato: struttura, lingua, semantica, qualità e direzione visiva',
    triggerLabel: 'Analisi completa',
    statusLabels: { ready: 'Pronto', partial: 'Parziale', loading: 'Caricamento', unavailable: 'Non disponibile', error: 'Errore' },
    sections: {
      identityStructure: 'Struttura del nome',
      linguisticPhonetic: 'Analisi linguistica e scrittura',
      semanticCultural: 'Contesto semantico e culturale',
      qualityEvaluation: 'Valutazione della qualità',
      visualVariations: 'Direzione visiva e varianti',
      practicalRecommendations: 'Raccomandazioni pratiche',
    },
    fields: {
      generatorLabel: 'Categoria', styleLabel: 'Stile', targetLanguageLabel: 'Lingua di destinazione',
      attestedBadge: 'Nome reale attestato', creativeBadge: 'Creazione originale',
      noEtymologyNotice: 'Modello creativo originale: nessuna etimologia storica dichiarata.',
      qualityScore: 'Punteggio misurato', qualityCoverage: 'Copertura',
      measuredLabel: 'Misurato', pendingLabel: 'In attesa', unavailableLabel: 'Non disponibile',
      copyFullSummary: 'Copia analisi completa', summaryCopied: 'Analisi copiata!',
      humanRatingLabel: 'La tua valutazione', addNote: 'Aggiungi nota', editNote: 'Modifica nota',
      openVisualStudio: 'Apri nello Studio Creativo', openStyleStudio: 'Personalizza nello Studio Tipografico',
      listenButton: 'Ascolta',
    },
    dimensions: {
      scriptIntegrity: 'Integrità della scrittura', textHygiene: 'Igiene del testo', readability: 'Leggibilità e lunghezza',
      distinctiveness: 'Distintività nel lotto', naturalness: 'Naturalezza umana', categoryFit: 'Idoneità categoria',
    },
  },
  pt: {
    sheetTitle: 'Ficha de análise completa',
    sheetSubtitle: 'Perfil unificado: estrutura, língua, semântica, qualidade e direção visual',
    triggerLabel: 'Análise completa',
    statusLabels: { ready: 'Pronto', partial: 'Parcial', loading: 'A carregar', unavailable: 'Indisponível', error: 'Erro' },
    sections: {
      identityStructure: 'Estrutura do nome',
      linguisticPhonetic: 'Análise linguística e escrita',
      semanticCultural: 'Contexto semântico e cultural',
      qualityEvaluation: 'Avaliação de qualidade',
      visualVariations: 'Direção visual e variações',
      practicalRecommendations: 'Recomendações práticas',
    },
    fields: {
      generatorLabel: 'Categoria', styleLabel: 'Estilo', targetLanguageLabel: 'Idioma alvo',
      attestedBadge: 'Nome real atestado', creativeBadge: 'Criação original',
      noEtymologyNotice: 'Padrão criativo original: nenhuma etimologia histórica é reivindicada.',
      qualityScore: 'Pontuação medida', qualityCoverage: 'Cobertura',
      measuredLabel: 'Medido', pendingLabel: 'Pendente', unavailableLabel: 'Indisponível',
      copyFullSummary: 'Copiar análise completa', summaryCopied: 'Análise copiada!',
      humanRatingLabel: 'Sua avaliação', addNote: 'Adicionar nota', editNote: 'Editar nota',
      openVisualStudio: 'Abrir no Estúdio Criativo', openStyleStudio: 'Estilizar no Estúdio Tipográfico',
      listenButton: 'Ouvir',
    },
    dimensions: {
      scriptIntegrity: 'Integridade da escrita', textHygiene: 'Higiene do texto', readability: 'Legibilidade e extensão',
      distinctiveness: 'Distinção no lote', naturalness: 'Naturalidade humana', categoryFit: 'Adequação à categoria',
    },
  },
  ar: {
    sheetTitle: 'بطاقة التحليل الشامل للاسم',
    sheetSubtitle: 'ملف موحّد للبنية واللغة والدلالة والجودة والتوجّه البصري',
    triggerLabel: 'تحليل شامل',
    statusLabels: { ready: 'جاهز', partial: 'جزئي', loading: 'جارٍ التحميل', unavailable: 'غير متاح', error: 'خطأ' },
    sections: {
      identityStructure: 'بنية الاسم',
      linguisticPhonetic: 'التحليل اللغوي ونظام الكتابة',
      semanticCultural: 'السياق الدلالي والثقافي',
      qualityEvaluation: 'تقييم الجودة',
      visualVariations: 'التوجّه البصري والتنويعات',
      practicalRecommendations: 'توصيات عملية',
    },
    fields: {
      generatorLabel: 'الفئة', styleLabel: 'النمط', targetLanguageLabel: 'اللغة المستهدفة',
      orthographicUnits: 'الوحدات الإملائية', compatStrategy: 'نمط التكييف اللغوي',
      nonNativeDisclaimer: 'المقاييس الآلية لا تضمن القبول اللغوي الطبيعي لدى المتحدثين الأصليين.',
      attestedBadge: 'اسم شخصي موثّق', creativeBadge: 'ابتكار إبداعي',
      noEtymologyNotice: 'صياغة إبداعية أصلية: لا يُدّعى لها أصل تاريخي أو اشتقاق معجمي.',
      semanticUnavailable: 'لا ينطبق أصل تاريخي موثّق أو معنى معجمي على هذا العنصر.',
      visualUnavailable: 'التوجّه البصري التجاري معطّل عمدًا للفئات التكتيكية والقتالية.',
      qualityScore: 'النتيجة المقاسة', qualityCoverage: 'نسبة التغطية',
      measuredLabel: 'مقاس', pendingLabel: 'قيد المراجعة', unavailableLabel: 'غير متاح',
      copyFullSummary: 'نسخ التحليل الكامل', summaryCopied: 'تم نسخ التحليل!',
      humanRatingLabel: 'تقييمك', addNote: 'إضافة ملاحظة', editNote: 'تعديل الملاحظة',
      openVisualStudio: 'فتح في الاستوديو الإبداعي', openStyleStudio: 'تنسيق في استوديو الخطوط',
      highlightsHeading: 'نقاط ملاحظة', watchoutsHeading: 'نقاط تستحق التحقق', legalHeading: 'التحقق القانوني',
      listenButton: 'استماع',
    },
    dimensions: {
      scriptIntegrity: 'سلامة الخط', textHygiene: 'نظافة النص', readability: 'الوضوح والطول',
      distinctiveness: 'التفرّد ضمن الدفعة', naturalness: 'الطبيعية اللغوية', categoryFit: 'ملاءمة الفئة',
    },
  },
  tr: {
    sheetTitle: 'Kapsamlı Ad Analizi',
    sheetSubtitle: 'Yapı, dil, anlam, kalite ve görsel yön için birleşik kart',
    triggerLabel: 'Tam analiz',
    statusLabels: { ready: 'Hazır', partial: 'Kısmi', loading: 'Yükleniyor', unavailable: 'Kullanılamıyor', error: 'Hata' },
    sections: {
      identityStructure: 'Ad yapısı',
      linguisticPhonetic: 'Dil ve yazı sistemi analizi',
      semanticCultural: 'Anlamsal ve kültürel bağlam',
      qualityEvaluation: 'Kalite değerlendirmesi',
      visualVariations: 'Görsel yön ve çeşitler',
      practicalRecommendations: 'Pratik öneriler',
    },
    fields: {
      generatorLabel: 'Kategori', styleLabel: 'Stil', targetLanguageLabel: 'Hedef dil',
      attestedBadge: 'Doğrulanmış gerçek ad', creativeBadge: 'Özgün yaratım',
      noEtymologyNotice: 'Özgün yaratıcı kalıp: tarihsel köken veya sözlük anlamı iddia edilmez.',
      qualityScore: 'Ölçülen puan', qualityCoverage: 'Kapsam',
      measuredLabel: 'Ölçüldü', pendingLabel: 'Beklemede', unavailableLabel: 'Yok',
      copyFullSummary: 'Tam analizi kopyala', summaryCopied: 'Analiz kopyalandı!',
      humanRatingLabel: 'Değerlendirmeniz', addNote: 'Not ekle', editNote: 'Notu düzenle',
      openVisualStudio: 'Yaratıcı Stüdyoda aç', openStyleStudio: 'Tipografi Stüdyosunda biçimlendir',
      listenButton: 'Dinle',
    },
    dimensions: {
      scriptIntegrity: 'Yazı bütünlüğü', textHygiene: 'Metin hijyeni', readability: 'Okunabilirlik ve uzunluk',
      distinctiveness: 'Grup özgünlüğü', naturalness: 'Doğallık', categoryFit: 'Kategori uyumu',
    },
  },
  ja: {
    sheetTitle: '総合ネーム分析シート',
    sheetSubtitle: '構造・言語・意味背景・品質・ビジュアル方向性を統合',
    triggerLabel: '総合分析',
    statusLabels: { ready: '完了', partial: '一部のみ', loading: '読み込み中', unavailable: '利用不可', error: 'エラー' },
    sections: {
      identityStructure: '名前の構造',
      linguisticPhonetic: '言語・文字システム分析',
      semanticCultural: '意味・文化的コンテキスト',
      qualityEvaluation: '品質評価',
      visualVariations: 'ビジュアル方向性と展開案',
      practicalRecommendations: '実践アドバイス',
    },
    fields: {
      generatorLabel: 'カテゴリー', styleLabel: 'スタイル', targetLanguageLabel: '対象言語',
      attestedBadge: '実在が確認された名前', creativeBadge: '創作ネーミング',
      noEtymologyNotice: '創作パターンであり、歴史的語源や辞書上の由来は主張しません。',
      qualityScore: '計測スコア', qualityCoverage: '計測範囲',
      measuredLabel: '計測済み', pendingLabel: '未評価', unavailableLabel: '非対応',
      copyFullSummary: '分析サマリーをコピー', summaryCopied: 'コピーしました！',
      humanRatingLabel: 'あなたの評価', addNote: 'メモを追加', editNote: 'メモを編集',
      openVisualStudio: 'クリエイティブスタジオで開く', openStyleStudio: '文字スタジオで装飾',
      listenButton: '聴く',
    },
    dimensions: {
      scriptIntegrity: '文字体系の整合性', textHygiene: 'テキスト衛生', readability: '長さと読みやすさ',
      distinctiveness: 'バッチ内の独自性', naturalness: '自然さ', categoryFit: 'カテゴリー適合性',
    },
  },
  ko: {
    sheetTitle: '종합 이름 분석 시트',
    sheetSubtitle: '구조, 언어, 의미 맥락, 품질 및 시각적 방향성 통합 보기',
    triggerLabel: '종합 분석',
    statusLabels: { ready: '완료', partial: '부분', loading: '불러오는 중', unavailable: '사용 불가', error: '오류' },
    sections: {
      identityStructure: '이름 구조',
      linguisticPhonetic: '언어 및 문자 체계 분석',
      semanticCultural: '의미 및 문화적 맥락',
      qualityEvaluation: '품질 평가',
      visualVariations: '시각적 방향성 및 확장안',
      practicalRecommendations: '실무 권장 사항',
    },
    fields: {
      generatorLabel: '카테고리', styleLabel: '스타일', targetLanguageLabel: '대상 언어',
      attestedBadge: '실재가 확인된 이름', creativeBadge: '창작 조합',
      noEtymologyNotice: '창작 패턴으로 역사적 어원이나 사전적 의미를 단정하지 않습니다.',
      qualityScore: '측정 점수', qualityCoverage: '측정 범위',
      measuredLabel: '측정됨', pendingLabel: '대기 중', unavailableLabel: '해당 없음',
      copyFullSummary: '전체 분석 복사', summaryCopied: '복사되었습니다!',
      humanRatingLabel: '내 평가', addNote: '메모 추가', editNote: '메모 수정',
      openVisualStudio: '크리에이티브 스튜디오 열기', openStyleStudio: '타이포그래피 스튜디오 열기',
      listenButton: '듣기',
    },
    dimensions: {
      scriptIntegrity: '문자 체계 정합성', textHygiene: '텍스트 위생', readability: '길이 및 가독성',
      distinctiveness: '배치 내 차별성', naturalness: '자연스러움', categoryFit: '카테고리 적합성',
    },
  },
  zh: {
    sheetTitle: '综合名称分析报告',
    sheetSubtitle: '结构、语言、语义文化、质量评估与视觉方向一站式视图',
    triggerLabel: '综合分析',
    statusLabels: { ready: '就绪', partial: '部分', loading: '加载中', unavailable: '不可用', error: '错误' },
    sections: {
      identityStructure: '名称结构',
      linguisticPhonetic: '语言与文字系统分析',
      semanticCultural: '语义与文化背景',
      qualityEvaluation: '质量评估',
      visualVariations: '视觉方向与衍生方案',
      practicalRecommendations: '实用建议',
    },
    fields: {
      generatorLabel: '分类', styleLabel: '风格', targetLanguageLabel: '目标语言',
      attestedBadge: '有据可查的真实姓名', creativeBadge: '创意构词',
      noEtymologyNotice: '原创声音或创意构词，不主张历史词源或词典释义。',
      qualityScore: '实测评分', qualityCoverage: '评估覆盖度',
      measuredLabel: '已测定', pendingLabel: '待评定', unavailableLabel: '不可用',
      copyFullSummary: '复制完整分析', summaryCopied: '已复制分析！',
      humanRatingLabel: '您的评分', addNote: '添加备注', editNote: '编辑备注',
      openVisualStudio: '在创意工作室中打开', openStyleStudio: '在字体工作室中设计',
      listenButton: '朗读',
    },
    dimensions: {
      scriptIntegrity: '文字系统一致性', textHygiene: '文本规范性', readability: '长度与可读性',
      distinctiveness: '同批区分度', naturalness: '人工自然度', categoryFit: '分类契合度',
    },
  },
  ru: {
    sheetTitle: 'Полная карта анализа имени',
    sheetSubtitle: 'Единый профиль: структура, язык, семантика, качество и визуальный образ',
    triggerLabel: 'Полный анализ',
    statusLabels: { ready: 'Готово', partial: 'Частично', loading: 'Загрузка', unavailable: 'Недоступно', error: 'Ошибка' },
    sections: {
      identityStructure: 'Структура имени',
      linguisticPhonetic: 'Лингвистика и письменность',
      semanticCultural: 'Семантика и культурный контекст',
      qualityEvaluation: 'Оценка качества',
      visualVariations: 'Визуальное направление и варианты',
      practicalRecommendations: 'Практические рекомендации',
    },
    fields: {
      generatorLabel: 'Категория', styleLabel: 'Стиль', targetLanguageLabel: 'Язык',
      attestedBadge: 'Подтверждённое настоящее имя', creativeBadge: 'Творческое имя',
      noEtymologyNotice: 'Оригинальное сочетание: историческая этимология не утверждается.',
      qualityScore: 'Измеренный балл', qualityCoverage: 'Покрытие',
      measuredLabel: 'Измерено', pendingLabel: 'Ожидает', unavailableLabel: 'Недоступно',
      copyFullSummary: 'Копировать полный анализ', summaryCopied: 'Анализ скопирован!',
      humanRatingLabel: 'Ваша оценка', addNote: 'Добавить заметку', editNote: 'Изменить заметку',
      openVisualStudio: 'Открыть в Творческой студии', openStyleStudio: 'Оформить в студии шрифтов',
      listenButton: 'Слушать',
    },
    dimensions: {
      scriptIntegrity: 'Целостность письменности', textHygiene: 'Гигиена текста', readability: 'Читаемость и длина',
      distinctiveness: 'Уникальность в подборке', naturalness: 'Естественность', categoryFit: 'Соответствие жанру',
    },
  },
  hi: {
    sheetTitle: 'संपूर्ण नाम विश्लेषण पत्रक',
    sheetSubtitle: 'संरचना, भाषा, सांस्कृतिक संदर्भ, गुणवत्ता और दृश्य दिशा का एकीकृत विश्लेषण',
    triggerLabel: 'पूर्ण विश्लेषण',
    statusLabels: { ready: 'तैयार', partial: 'आंशिक', loading: 'लोड हो रहा है', unavailable: 'अनुपलब्ध', error: 'त्रुटि' },
    sections: {
      identityStructure: 'नाम की संरचना',
      linguisticPhonetic: 'भाषाई और लिपि विश्लेषण',
      semanticCultural: 'अर्थ और सांस्कृतिक संदर्भ',
      qualityEvaluation: 'गुणवत्ता मूल्यांकन',
      visualVariations: 'दृश्य दिशा और विकल्प',
      practicalRecommendations: 'व्यावहारिक सुझाव',
    },
    fields: {
      generatorLabel: 'श्रेणी', styleLabel: 'शैली', targetLanguageLabel: 'लक्ष्य भाषा',
      attestedBadge: 'प्रमाणित वास्तविक नाम', creativeBadge: 'रचनात्मक संयोजन',
      qualityScore: 'मापा गया स्कोर', qualityCoverage: 'कवरेज',
      measuredLabel: 'मापा गया', pendingLabel: 'लंबित', unavailableLabel: 'अनुपलब्ध',
      copyFullSummary: 'पूरा विश्लेषण कॉपी करें', summaryCopied: 'कॉपी हो गया!',
      humanRatingLabel: 'आपकी रेटिंग', addNote: 'नोट जोड़ें', editNote: 'नोट संपादित करें',
      listenButton: 'सुनें',
    },
    dimensions: {
      scriptIntegrity: 'लिपि संगति', textHygiene: 'पाठ स्वच्छता', readability: 'पठनीयता और लंबाई',
      distinctiveness: 'बैच विशिष्टता', naturalness: 'स्वाभाविकता', categoryFit: 'श्रेणी उपयुक्तता',
    },
  },
  nl: {
    sheetTitle: 'Volledige naamanalyse',
    sheetSubtitle: 'Gecombineerd overzicht van structuur, taal, betekenis, kwaliteit en visuele stijl',
    triggerLabel: 'Volledige analyse',
    statusLabels: { ready: 'Gereed', partial: 'Deels', loading: 'Laden', unavailable: 'Niet beschikbaar', error: 'Fout' },
    sections: {
      identityStructure: 'Naamstructuur',
      linguisticPhonetic: 'Taal- en schriftanalyse',
      semanticCultural: 'Semantische en culturele context',
      qualityEvaluation: 'Kwaliteitsbeoordeling',
      visualVariations: 'Visuele richting en variaties',
      practicalRecommendations: 'Praktische aanbevelingen',
    },
    fields: {
      generatorLabel: 'Categorie', styleLabel: 'Stijl', targetLanguageLabel: 'Doeltaal',
      attestedBadge: 'Bevestigde echte naam', creativeBadge: 'Creatief ontwerp',
      qualityScore: 'Gemeten score', qualityCoverage: 'Dekking',
      measuredLabel: 'Gemeten', pendingLabel: 'In afwachting', unavailableLabel: 'Niet beschikbaar',
      copyFullSummary: 'Volledige analyse kopiëren', summaryCopied: 'Analyse gekopieerd!',
      humanRatingLabel: 'Jouw beoordeling', addNote: 'Notitie toevoegen', editNote: 'Notitie bewerken',
      listenButton: 'Beluister',
    },
    dimensions: {
      scriptIntegrity: 'Schriftconsistentie', textHygiene: 'Teksthygiëne', readability: 'Leesbaarheid en lengte',
      distinctiveness: 'Onderscheidend vermogen', naturalness: 'Natuurlijkheid', categoryFit: 'Categoriepassendheid',
    },
  },
  pl: {
    sheetTitle: 'Pełna karta analizy nazwy',
    sheetSubtitle: 'Zunifikowany profil struktury, języka, kontekstu, jakości i kierunku wizualnego',
    triggerLabel: 'Pełna analiza',
    statusLabels: { ready: 'Gotowe', partial: 'Częściowe', loading: 'Ładowanie', unavailable: 'Niedostępne', error: 'Błąd' },
    sections: {
      identityStructure: 'Struktura nazwy',
      linguisticPhonetic: 'Analiza językowa i pisma',
      semanticCultural: 'Kontekst semantyczny i kulturowy',
      qualityEvaluation: 'Ocena jakości',
      visualVariations: 'Kierunek wizualny i warianty',
      practicalRecommendations: 'Praktyczne wskazówki',
    },
    fields: {
      generatorLabel: 'Kategoria', styleLabel: 'Styl', targetLanguageLabel: 'Język docelowy',
      attestedBadge: 'Potwierdzone imię', creativeBadge: 'Twórcza kompozycja',
      qualityScore: 'Zmierzony wynik', qualityCoverage: 'Pokrycie',
      measuredLabel: 'Zmierzono', pendingLabel: 'Oczekuje', unavailableLabel: 'Niedostępne',
      copyFullSummary: 'Kopiuj pełną analizę', summaryCopied: 'Skopiowano analizę!',
      humanRatingLabel: 'Twoja ocena', addNote: 'Dodaj notatkę', editNote: 'Edytuj notatkę',
      listenButton: 'Odsłuchaj',
    },
    dimensions: {
      scriptIntegrity: 'Spójność pisma', textHygiene: 'Higiena tekstu', readability: 'Czytelność i długość',
      distinctiveness: 'Wyróżnialność w partii', naturalness: 'Naturalność', categoryFit: 'Dopasowanie do kategorii',
    },
  },
  sv: {
    sheetTitle: 'Fullständig namnanalys',
    sheetSubtitle: 'Samlad bild av struktur, språk, betydelse, kvalitet och visuell riktning',
    triggerLabel: 'Fullständig analys',
    statusLabels: { ready: 'Klar', partial: 'Delvis', loading: 'Laddar', unavailable: 'Ej tillgänglig', error: 'Fel' },
    sections: {
      identityStructure: 'Namnstruktur',
      linguisticPhonetic: 'Språk- och skriftsystemsanalys',
      semanticCultural: 'Semantisk och kulturell kontext',
      qualityEvaluation: 'Kvalitetsbedömning',
      visualVariations: 'Visuell riktning och varianter',
      practicalRecommendations: 'Praktiska råd',
    },
    fields: {
      generatorLabel: 'Kategori', styleLabel: 'Stil', targetLanguageLabel: 'Målspråk',
      attestedBadge: 'Belagt verkligt namn', creativeBadge: 'Kreativt förslag',
      qualityScore: 'Uppmätt resultat', qualityCoverage: 'Täckning',
      measuredLabel: 'Uppmätt', pendingLabel: 'Väntar', unavailableLabel: 'Ej tillgänglig',
      copyFullSummary: 'Kopiera hela analysen', summaryCopied: 'Analys kopierad!',
      humanRatingLabel: 'Ditt betyg', addNote: 'Lägg till anteckning', editNote: 'Redigera anteckning',
      listenButton: 'Lyssna',
    },
    dimensions: {
      scriptIntegrity: 'Skriftsystemskontroll', textHygiene: 'Texthygien', readability: 'Läsbarhet och längd',
      distinctiveness: 'Särprägel i urvalet', naturalness: 'Naturlighet', categoryFit: 'Kategoripassning',
    },
  },
  vi: {
    sheetTitle: 'Bảng phân tích tên đầy đủ',
    sheetSubtitle: 'Hồ sơ hợp nhất về cấu trúc, ngôn ngữ, ngữ nghĩa, chất lượng và định hướng thị giác',
    triggerLabel: 'Phân tích đầy đủ',
    statusLabels: { ready: 'Sẵn sàng', partial: 'Một phần', loading: 'Đang tải', unavailable: 'Không khả dụng', error: 'Lỗi' },
    sections: {
      identityStructure: 'Cấu trúc tên',
      linguisticPhonetic: 'Phân tích ngôn ngữ & chữ viết',
      semanticCultural: 'Bối cảnh ngữ nghĩa & văn hóa',
      qualityEvaluation: 'Đánh giá chất lượng',
      visualVariations: 'Định hướng thị giác & biến thể',
      practicalRecommendations: 'Khuyến nghị thực tế',
    },
    fields: {
      generatorLabel: 'Danh mục', styleLabel: 'Phong cách', targetLanguageLabel: 'Ngôn ngữ đích',
      attestedBadge: 'Tên thật được xác nhận', creativeBadge: 'Sáng tạo nguyên bản',
      qualityScore: 'Điểm đo được', qualityCoverage: 'Độ phủ',
      measuredLabel: 'Đã đo', pendingLabel: 'Chờ đánh giá', unavailableLabel: 'Không khả dụng',
      copyFullSummary: 'Sao chép toàn bộ phân tích', summaryCopied: 'Đã sao chép phân tích!',
      humanRatingLabel: 'Đánh giá của bạn', addNote: 'Thêm ghi chú', editNote: 'Sửa ghi chú',
      listenButton: 'Nghe',
    },
    dimensions: {
      scriptIntegrity: 'Tính nhất quán chữ viết', textHygiene: 'Độ sạch văn bản', readability: 'Độ dài & dễ đọc',
      distinctiveness: 'Tính khác biệt', naturalness: 'Độ tự nhiên', categoryFit: 'Mức độ hợp danh mục',
    },
  },
  id: {
    sheetTitle: 'Lembar Analisis Nama Lengkap',
    sheetSubtitle: 'Profil terpadu struktur, bahasa, konteks makna, kualitas, dan arah visual',
    triggerLabel: 'Analisis lengkap',
    statusLabels: { ready: 'Siap', partial: 'Sebagian', loading: 'Memuat', unavailable: 'Tidak tersedia', error: 'Kesalahan' },
    sections: {
      identityStructure: 'Struktur nama',
      linguisticPhonetic: 'Analisis bahasa & aksara',
      semanticCultural: 'Konteks semantik & budaya',
      qualityEvaluation: 'Evaluasi kualitas',
      visualVariations: 'Arah visual & variasi',
      practicalRecommendations: 'Rekomendasi praktis',
    },
    fields: {
      generatorLabel: 'Kategori', styleLabel: 'Gaya', targetLanguageLabel: 'Bahasa target',
      attestedBadge: 'Nama asli terverifikasi', creativeBadge: 'Kreasi orisinal',
      qualityScore: 'Skor terukur', qualityCoverage: 'Cakupan',
      measuredLabel: 'Terukur', pendingLabel: 'Menunggu', unavailableLabel: 'Tidak tersedia',
      copyFullSummary: 'Salin analisis lengkap', summaryCopied: 'Analisis disalin!',
      humanRatingLabel: 'Penilaian Anda', addNote: 'Tambah catatan', editNote: 'Ubah catatan',
      listenButton: 'Dengarkan',
    },
    dimensions: {
      scriptIntegrity: 'Integritas aksara', textHygiene: 'Kebersihan teks', readability: 'Keterbacaan & panjang',
      distinctiveness: 'Keunikan batch', naturalness: 'Kealamian', categoryFit: 'Kesesuaian kategori',
    },
  },
  th: {
    sheetTitle: 'รายงานวิเคราะห์ชื่อฉบับสมบูรณ์',
    sheetSubtitle: 'ข้อมูลรวมด้านโครงสร้าง ภาษา ความหมาย คุณภาพ และทิศทางภาพลักษณ์',
    triggerLabel: 'วิเคราะห์แบบละเอียด',
    statusLabels: { ready: 'พร้อม', partial: 'บางส่วน', loading: 'กำลังโหลด', unavailable: 'ไม่พร้อมใช้งาน', error: 'ข้อผิดพลาด' },
    sections: {
      identityStructure: 'โครงสร้างชื่อ',
      linguisticPhonetic: 'การวิเคราะห์ภาษาและระบบอักษร',
      semanticCultural: 'บริบทความหมายและวัฒนธรรม',
      qualityEvaluation: 'การประเมินคุณภาพ',
      visualVariations: 'ทิศทางภาพลักษณ์และรูปแบบต่อยอด',
      practicalRecommendations: 'คำแนะนำการใช้งานจริง',
    },
    fields: {
      generatorLabel: 'หมวดหมู่', styleLabel: 'สไตล์', targetLanguageLabel: 'ภาษาเป้าหมาย',
      attestedBadge: 'ชื่อจริงที่ยืนยันได้', creativeBadge: 'การสร้างสรรค์ใหม่',
      qualityScore: 'คะแนนที่วัดได้', qualityCoverage: 'ความครอบคลุม',
      measuredLabel: 'วัดผลแล้ว', pendingLabel: 'รอการประเมิน', unavailableLabel: 'ไม่พร้อมใช้งาน',
      copyFullSummary: 'คัดลอกบทวิเคราะห์ทั้งหมด', summaryCopied: 'คัดลอกบทวิเคราะห์แล้ว!',
      humanRatingLabel: 'คะแนนของคุณ', addNote: 'เพิ่มบันทึก', editNote: 'แก้ไขบันทึก',
      listenButton: 'ฟัง',
    },
    dimensions: {
      scriptIntegrity: 'ความถูกต้องของอักษร', textHygiene: 'ความสะอาดของข้อความ', readability: 'ความอ่านง่ายและความยาว',
      distinctiveness: 'ความแตกต่างในชุด', naturalness: 'ความเป็นธรรมชาติ', categoryFit: 'ความเหมาะกับหมวดหมู่',
    },
  },
  el: {
    sheetTitle: 'Πλήρης καρτέλα ανάλυσης ονόματος',
    sheetSubtitle: 'Ενιαίο προφίλ δομής, γλώσσας, σημασιολογίας, ποιότητας και οπτικής κατεύθυνσης',
    triggerLabel: 'Πλήρης ανάλυση',
    statusLabels: { ready: 'Έτοιμο', partial: 'Μερικό', loading: 'Φόρτωση', unavailable: 'Μη διαθέσιμο', error: 'Σφάλμα' },
    sections: {
      identityStructure: 'Δομή ονόματος',
      linguisticPhonetic: 'Γλωσσική ανάλυση & γραφή',
      semanticCultural: 'Σημασιολογικό & πολιτισμικό πλαίσιο',
      qualityEvaluation: 'Αξιολόγηση ποιότητας',
      visualVariations: 'Οπτική κατεύθυνση & παραλλαγές',
      practicalRecommendations: 'Πρακτικές συστάσεις',
    },
    fields: {
      generatorLabel: 'Κατηγορία', styleLabel: 'Ύφος', targetLanguageLabel: 'Γλώσσα-στόχος',
      attestedBadge: 'Επιβεβαιωμένο πραγματικό όνομα', creativeBadge: 'Δημιουργική σύνθεση',
      qualityScore: 'Μετρημένη βαθμολογία', qualityCoverage: 'Κάλυψη',
      measuredLabel: 'Μετρήθηκε', pendingLabel: 'Σε αναμονή', unavailableLabel: 'Μη διαθέσιμο',
      copyFullSummary: 'Αντιγραφή πλήρους ανάλυσης', summaryCopied: 'Η ανάλυση αντιγράφηκε!',
      humanRatingLabel: 'Η αξιολόγησή σας', addNote: 'Προσθήκη σημείωσης', editNote: 'Επεξεργασία σημείωσης',
      listenButton: 'Ακρόαση',
    },
    dimensions: {
      scriptIntegrity: 'Ακεραιότητα γραφής', textHygiene: 'Υγιεινή κειμένου', readability: 'Αναγνωσιμότητα & μήκος',
      distinctiveness: 'Διακριτότητα παρτίδας', naturalness: 'Φυσικότητα', categoryFit: 'Συνάφεια κατηγορίας',
    },
  },
  he: {
    sheetTitle: 'גיליון ניתוח שם מלא',
    sheetSubtitle: 'פרופיל מאוחד של מבנה, שפה, הקשר תרבותי, איכות וכיוון חזותי',
    triggerLabel: 'ניתוח מלא',
    statusLabels: { ready: 'מוכן', partial: 'חלקי', loading: 'טוען', unavailable: 'לא זמין', error: 'שגיאה' },
    sections: {
      identityStructure: 'מבנה השם',
      linguisticPhonetic: 'ניתוח לשוני ומערכת כתב',
      semanticCultural: 'הקשר סמנטי ותרבותי',
      qualityEvaluation: 'הערכת איכות',
      visualVariations: 'כיוון חזותי וגרסאות',
      practicalRecommendations: 'המלצות מעשיות',
    },
    fields: {
      generatorLabel: 'קטגוריה', styleLabel: 'סגנון', targetLanguageLabel: 'שפת יעד',
      attestedBadge: 'שם אמיתי מאומת', creativeBadge: 'יצירה מקורית',
      qualityScore: 'ציון מדוד', qualityCoverage: 'כיסוי',
      measuredLabel: 'נמדד', pendingLabel: 'ממתין', unavailableLabel: 'לא זמין',
      copyFullSummary: 'העתקת הניתוח המלא', summaryCopied: 'הניתוח הועתק!',
      humanRatingLabel: 'הדירוג שלך', addNote: 'הוספת הערה', editNote: 'עריכת הערה',
      listenButton: 'האזנה',
    },
    dimensions: {
      scriptIntegrity: 'תקינות הכתב', textHygiene: 'ניקיון טקסט', readability: 'קריאות ואורך',
      distinctiveness: 'בידול באצווה', naturalness: 'טבעיות', categoryFit: 'התאמה לקטגוריה',
    },
  },
  cs: {
    sheetTitle: 'Kompletní analýza názvu',
    sheetSubtitle: 'Jednotný přehled struktury, jazyka, kontextu, kvality a vizuálního směru',
    triggerLabel: 'Kompletní analýza',
    statusLabels: { ready: 'Připraveno', partial: 'Částečné', loading: 'Načítání', unavailable: 'Nedostupné', error: 'Chyba' },
    sections: {
      identityStructure: 'Struktura názvu',
      linguisticPhonetic: 'Jazyková a písemná analýza',
      semanticCultural: 'Významový a kulturní kontext',
      qualityEvaluation: 'Hodnocení kvality',
      visualVariations: 'Vizuální směr a varianty',
      practicalRecommendations: 'Praktická doporučení',
    },
    fields: {
      generatorLabel: 'Kategorie', styleLabel: 'Styl', targetLanguageLabel: 'Cílový jazyk',
      attestedBadge: 'Doložené skutečné jméno', creativeBadge: 'Kreativní návrh',
      qualityScore: 'Naměřené skóre', qualityCoverage: 'Pokrytí',
      measuredLabel: 'Změřeno', pendingLabel: 'Čeká', unavailableLabel: 'Nedostupné',
      copyFullSummary: 'Kopírovat kompletní analýzu', summaryCopied: 'Analýza zkopírována!',
      humanRatingLabel: 'Vaše hodnocení', addNote: 'Přidat poznámku', editNote: 'Upravit poznámku',
      listenButton: 'Poslechnout',
    },
    dimensions: {
      scriptIntegrity: 'Integrita písma', textHygiene: 'Hygiena textu', readability: 'Čitelnost a délka',
      distinctiveness: 'Odlišnost v dávce', naturalness: 'Přirozenost', categoryFit: 'Shoda s kategorií',
    },
  },
  ro: {
    sheetTitle: 'Fișă completă de analiză a numelui',
    sheetSubtitle: 'Profil unificat: structură, limbă, context semantic, calitate și direcție vizuală',
    triggerLabel: 'Analiză completă',
    statusLabels: { ready: 'Pregătit', partial: 'Parțial', loading: 'Se încarcă', unavailable: 'Indisponibil', error: 'Eroare' },
    sections: {
      identityStructure: 'Structura numelui',
      linguisticPhonetic: 'Analiză lingvistică și scriere',
      semanticCultural: 'Context semantic și cultural',
      qualityEvaluation: 'Evaluarea calității',
      visualVariations: 'Direcție vizuală și variante',
      practicalRecommendations: 'Recomandări practice',
    },
    fields: {
      generatorLabel: 'Categorie', styleLabel: 'Stil', targetLanguageLabel: 'Limba țintă',
      attestedBadge: 'Nume real atestat', creativeBadge: 'Creație originală',
      qualityScore: 'Scor măsurat', qualityCoverage: 'Acoperire',
      measuredLabel: 'Măsurat', pendingLabel: 'În așteptare', unavailableLabel: 'Indisponibil',
      copyFullSummary: 'Copiază analiza completă', summaryCopied: 'Analiză copiată!',
      humanRatingLabel: 'Evaluarea ta', addNote: 'Adaugă notă', editNote: 'Editează nota',
      listenButton: 'Ascultă',
    },
    dimensions: {
      scriptIntegrity: 'Integritatea scrierii', textHygiene: 'Igiena textului', readability: 'Lizibilitate și lungime',
      distinctiveness: 'Distincție în lot', naturalness: 'Naturalețe', categoryFit: 'Potrivire categorie',
    },
  },
  da: {
    sheetTitle: 'Komplet navneanalyse',
    sheetSubtitle: 'Samlet profil for struktur, sprog, kontekst, kvalitet og visuel retning',
    triggerLabel: 'Fuld analyse',
    statusLabels: { ready: 'Klar', partial: 'Delvis', loading: 'Indlæser', unavailable: 'Ikke tilgængelig', error: 'Fejl' },
    sections: {
      identityStructure: 'Navnestruktur',
      linguisticPhonetic: 'Sprog- og skriftanalyse',
      semanticCultural: 'Semantisk og kulturel kontekst',
      qualityEvaluation: 'Kvalitetsvurdering',
      visualVariations: 'Visuel retning og varianter',
      practicalRecommendations: 'Praktiske anbefalinger',
    },
    fields: {
      generatorLabel: 'Kategori', styleLabel: 'Stil', targetLanguageLabel: 'Målsprog',
      attestedBadge: 'Dokumenteret rigtigt navn', creativeBadge: 'Kreativ skabelse',
      qualityScore: 'Målt score', qualityCoverage: 'Dækning',
      measuredLabel: 'Målt', pendingLabel: 'Afventer', unavailableLabel: 'Ikke tilgængelig',
      copyFullSummary: 'Kopiér hele analysen', summaryCopied: 'Analyse kopieret!',
      humanRatingLabel: 'Din vurdering', addNote: 'Tilføj note', editNote: 'Redigér note',
      listenButton: 'Lyt',
    },
    dimensions: {
      scriptIntegrity: 'Skriftkonsistens', textHygiene: 'Teksthygiejne', readability: 'Læsbarhed og længde',
      distinctiveness: 'Særpræg i gruppen', naturalness: 'Naturlighed', categoryFit: 'Kategorimatch',
    },
  },
  fi: {
    sheetTitle: 'Täydellinen nimianalyysi',
    sheetSubtitle: 'Yhdistetty profiili: rakenne, kieli, merkitysyhteys, laatu ja visuaalinen suunta',
    triggerLabel: 'Täydellinen analyysi',
    statusLabels: { ready: 'Valmis', partial: 'Osittainen', loading: 'Ladataan', unavailable: 'Ei saatavilla', error: 'Virhe' },
    sections: {
      identityStructure: 'Nimen rakenne',
      linguisticPhonetic: 'Kieli- ja kirjoitusjärjestelmäanalyysi',
      semanticCultural: 'Semanttinen ja kulttuurinen konteksti',
      qualityEvaluation: 'Laadunarviointi',
      visualVariations: 'Visuaalinen suunta ja muunnelmat',
      practicalRecommendations: 'Käytännön suositukset',
    },
    fields: {
      generatorLabel: 'Kategoria', styleLabel: 'Tyyli', targetLanguageLabel: 'Kohdekieli',
      attestedBadge: 'Vahvistettu oikea nimi', creativeBadge: 'Luova ehdotus',
      qualityScore: 'Mitattu pistemäärä', qualityCoverage: 'Kattavuus',
      measuredLabel: 'Mitattu', pendingLabel: 'Odottaa', unavailableLabel: 'Ei saatavilla',
      copyFullSummary: 'Kopioi koko analyysi', summaryCopied: 'Analyysi kopioitu!',
      humanRatingLabel: 'Oma arviosi', addNote: 'Lisää muistiinpano', editNote: 'Muokkaa muistiinpanoa',
      listenButton: 'Kuuntele',
    },
    dimensions: {
      scriptIntegrity: 'Kirjoitusjärjestelmä', textHygiene: 'Tekstihygienia', readability: 'Luettavuus ja pituus',
      distinctiveness: 'Erottuvuus erässä', naturalness: 'Luontevuus', categoryFit: 'Sopivuus kategoriaan',
    },
  },
  uk: {
    sheetTitle: 'Повний аналіз імені',
    sheetSubtitle: 'Єдиний профіль: структура, мова, семантика, якість і візуальний напрям',
    triggerLabel: 'Повний аналіз',
    statusLabels: { ready: 'Готово', partial: 'Частково', loading: 'Завантаження', unavailable: 'Недоступно', error: 'Помилка' },
    sections: {
      identityStructure: 'Структура назви',
      linguisticPhonetic: 'Мовний та графічний аналіз',
      semanticCultural: 'Семантичний і культурний контекст',
      qualityEvaluation: 'Оцінка якості',
      visualVariations: 'Візуальний напрям і варіації',
      practicalRecommendations: 'Практичні поради',
    },
    fields: {
      generatorLabel: 'Категорія', styleLabel: 'Стиль', targetLanguageLabel: 'Цільова мова',
      attestedBadge: 'Підтверджене справжнє ім’я', creativeBadge: 'Творча назва',
      qualityScore: 'Виміряна оцінка', qualityCoverage: 'Охоплення',
      measuredLabel: 'Виміряно', pendingLabel: 'Очікує', unavailableLabel: 'Недоступно',
      copyFullSummary: 'Копіювати повний аналіз', summaryCopied: 'Аналіз скопійовано!',
      humanRatingLabel: 'Ваша оцінка', addNote: 'Додати нотатку', editNote: 'Редагувати нотатку',
      listenButton: 'Слухати',
    },
    dimensions: {
      scriptIntegrity: 'Цілісність письма', textHygiene: 'Чистота тексту', readability: 'Читаність і довжина',
      distinctiveness: 'Виразність у добірці', naturalness: 'Природність', categoryFit: 'Відповідність категорії',
    },
  },
  bn: {
    sheetTitle: 'সম্পূর্ণ নাম বিশ্লেষণ পত্র',
    sheetSubtitle: 'কাঠামো, ভাষা, অর্থগত প্রেক্ষাপট, মান এবং ভিজ্যুয়াল দিকনির্দেশনার সমন্বিত বিশ্লেষণ',
    triggerLabel: 'সম্পূর্ণ বিশ্লেষণ',
    statusLabels: { ready: 'প্রস্তুত', partial: 'আংশিক', loading: 'লোড হচ্ছে', unavailable: 'উপলব্ধ নয়', error: 'ত্রুটি' },
    sections: {
      identityStructure: 'নামের গঠন',
      linguisticPhonetic: 'ভাষা ও লিপি বিশ্লেষণ',
      semanticCultural: 'অর্থ ও সাংস্কৃতিক প্রেক্ষাপট',
      qualityEvaluation: 'মান মূল্যায়ন',
      visualVariations: 'ভিজ্যুয়াল দিকনির্দেশনা ও বিকল্প',
      practicalRecommendations: 'ব্যবহারিক পরামর্শ',
    },
    fields: {
      generatorLabel: 'বিভাগ', styleLabel: 'স্টাইল', targetLanguageLabel: 'লক্ষ্য ভাষা',
      attestedBadge: 'যাচাইকৃত প্রকৃত নাম', creativeBadge: 'সৃজনশীল রূপ',
      qualityScore: 'পরিমাপকৃত স্কোর', qualityCoverage: 'আওতা',
      measuredLabel: 'পরিমাপকৃত', pendingLabel: 'অপেক্ষমাণ', unavailableLabel: 'উপলব্ধ নয়',
      copyFullSummary: 'সম্পূর্ণ বিশ্লেষণ কপি করুন', summaryCopied: 'বিশ্লেষণ কপি হয়েছে!',
      humanRatingLabel: 'আপনার মূল্যায়ন', addNote: 'নোট যোগ করুন', editNote: 'নোট সম্পাদনা',
      listenButton: 'শুনুন',
    },
    dimensions: {
      scriptIntegrity: 'লিপি সামঞ্জস্য', textHygiene: 'পাঠ্য পরিচ্ছন্নতা', readability: 'পাঠযোগ্যতা ও দৈর্ঘ্য',
      distinctiveness: 'তালিকায় স্বাতন্ত্র্য', naturalness: 'স্বাভাবিকতা', categoryFit: 'বিভাগীয় উপযোগিতা',
    },
  },
  nb: {
    sheetTitle: 'Komplett navneanalyse',
    sheetSubtitle: 'Samlet profil for struktur, språk, kontekst, kvalitet og visuell retning',
    triggerLabel: 'Full analyse',
    statusLabels: { ready: 'Klar', partial: 'Delvis', loading: 'Laster', unavailable: 'Ikke tilgjengelig', error: 'Feil' },
    sections: {
      identityStructure: 'Navnestruktur',
      linguisticPhonetic: 'Språk- og skriftanalyse',
      semanticCultural: 'Semantisk og kulturell kontekst',
      qualityEvaluation: 'Kvalitetsvurdering',
      visualVariations: 'Visuell retning og varianter',
      practicalRecommendations: 'Praktiske råd',
    },
    fields: {
      generatorLabel: 'Kategori', styleLabel: 'Stil', targetLanguageLabel: 'Målspråk',
      attestedBadge: 'Bekreftet ekte navn', creativeBadge: 'Kreativt forslag',
      qualityScore: 'Målt poengsum', qualityCoverage: 'Dekning',
      measuredLabel: 'Målt', pendingLabel: 'Venter', unavailableLabel: 'Ikke tilgjengelig',
      copyFullSummary: 'Kopier full analyse', summaryCopied: 'Analyse kopiert!',
      humanRatingLabel: 'Din vurdering', addNote: 'Legg til notat', editNote: 'Rediger notat',
      listenButton: 'Lytt',
    },
    dimensions: {
      scriptIntegrity: 'Skriftkonsistens', textHygiene: 'Teksthygiene', readability: 'Lesbarhet og lengde',
      distinctiveness: 'Særpreg i gruppen', naturalness: 'Naturlighet', categoryFit: 'Kategoritreff',
    },
  },
};

export function getUnifiedAnalysisLabels(language: string): UnifiedAnalysisLabels {
  const normalized = language === 'no' ? 'nb' : language;
  if (normalized === 'fr') return FRENCH_LABELS;
  if (normalized === 'en') return ENGLISH_LABELS;
  const base = ENGLISH_LABELS;
  const over = OTHER_LANGUAGES[normalized];
  if (!over) return base;
  return {
    sheetTitle: over.sheetTitle ?? base.sheetTitle,
    sheetSubtitle: over.sheetSubtitle ?? base.sheetSubtitle,
    triggerLabel: over.triggerLabel ?? base.triggerLabel,
    statusLabels: over.statusLabels ?? base.statusLabels,
    sections: over.sections ?? base.sections,
    fields: { ...base.fields, ...over.fields },
    dimensions: over.dimensions ?? base.dimensions,
    dimensionHints: base.dimensionHints,
    strategies: { ...base.strategies, ...over.strategies },
    findings: base.findings,
  };
}

export function getLocalizedQualityFindingMessage(
  code: string,
  fallbackMessage: string,
  language: string
): string {
  const labels = getUnifiedAnalysisLabels(language);
  return labels.findings[code] || fallbackMessage;
}

export function formatTargetLanguageName(code: GenLanguageCode, uiLanguage: string): string {
  if (code === 'auto') return uiLanguage === 'fr' ? 'Auto' : 'Auto';
  try {
    return new Intl.DisplayNames([uiLanguage], { type: 'language' }).of(code) ?? code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

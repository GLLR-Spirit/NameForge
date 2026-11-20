import { resolveCanonicalLocale } from './localeRegistry';

export type EnhancementLocale =
  | 'en' | 'fr' | 'es' | 'de' | 'it' | 'pt' | 'ar' | 'tr'
  | 'ja' | 'ko' | 'zh' | 'ru' | 'hi' | 'nl' | 'pl' | 'sv'
  | 'vi' | 'id' | 'th' | 'el' | 'he' | 'cs' | 'ro' | 'da'
  | 'fi' | 'uk' | 'bn' | 'nb';

export type CompatibilityIndicatorKey =
  | 'highly-compatible'
  | 'compatible'
  | 'alternative-style'
  | 'limited-resources'
  | 'requires-review'
  | 'not-evaluated';

export type ProfileDomainKey =
  | 'anime'
  | 'attested'
  | 'phraseBank'
  | 'desert'
  | 'nordic'
  | 'medieval'
  | 'business'
  | 'tech'
  | 'creative';

export interface EnhancementLabels {
  compare: {
    compareWithCollectionsTitle: string;
    sourceFilterAll: string;
    sourceGenerated: string;
    sourceSaved: string;
    sourceCollection: string;
    searchPlaceholder: string;
    allCollectionsFilter: string;
    unassignedCollection: string;
    selectedCounter: string;
    clearSelection: string;
    maxSelectedHint: string;
    noCandidatesFound: string;
    copyComparison: string;
    comparisonCopied: string;
    exportTxt: string;
    exportJson: string;
    languageMetaLabel: string;
    categoryMetaLabel: string;
    collectionMetaLabel: string;
    notEvaluated: string;
    insufficientData: string;
    crossContextTitle: string;
    crossContextNotice: string;
  };
  compatibility: {
    indicators: Record<CompatibilityIndicatorKey, string>;
    heading: string;
    generalIntro: string;
    statusPrefix: string;
    generatorLabel: string;
    categoryLabel: string;
    suitableLanguagesLabel: string;
    otherSupportedLabel: string;
    recommendedLanguageLabel: string;
    noSingleRecommendation: string;
    whyFitLabel: string;
    limitationsLabel: string;
    culturalNotesLabel: string;
    exampleLabel: string;
    whyTitle: string;
    whyPoints: [
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string }
    ];
    footerNotice: string;
    domainNotes: Record<
      ProfileDomainKey,
      {
        whyFit: string;
        limitations: string;
        cultural: string;
        example: string;
      }
    >;
    indicatorDescriptions: Record<CompatibilityIndicatorKey, string>;
  };
}

const EN: EnhancementLabels = {
  compare: {
    compareWithCollectionsTitle: 'Compare with My Collections & Saved',
    sourceFilterAll: 'All sources',
    sourceGenerated: 'Generated',
    sourceSaved: 'Saved',
    sourceCollection: 'Collection',
    searchPlaceholder: 'Search generated, saved, or collection names…',
    allCollectionsFilter: 'All collections',
    unassignedCollection: 'Without collection',
    selectedCounter: '{count} / {max} selected',
    clearSelection: 'Clear selection',
    maxSelectedHint: 'Maximum 4 names selected. Uncheck or remove one to add another.',
    noCandidatesFound: 'No matching names found for this filter.',
    copyComparison: 'Copy Comparison',
    comparisonCopied: 'Comparison copied',
    exportTxt: 'Export .TXT',
    exportJson: 'Export .JSON',
    languageMetaLabel: 'Language',
    categoryMetaLabel: 'Category',
    collectionMetaLabel: 'Collection',
    notEvaluated: 'Not evaluated',
    insufficientData: 'Insufficient data',
    crossContextTitle: 'Cross-language / cross-category comparison note',
    crossContextNotice:
      'These names belong to different categories or languages ({details}). Direct score comparisons have structural limitations and should be weighed in each name’s intended context.',
  },
  compatibility: {
    indicators: {
      'highly-compatible': 'Highly Compatible',
      compatible: 'Compatible',
      'alternative-style': 'Alternative Style',
      'limited-resources': 'Limited Linguistic Resources',
      'requires-review': 'Requires Review',
      'not-evaluated': 'Not Evaluated',
    },
    heading: 'Language & Generator Compatibility',
    generalIntro:
      'The selected language influences the style, structure, sound, and cultural characteristics of generated names. Some generators are designed around particular linguistic conventions. Choosing a language that matches the generator’s intended theme can produce more coherent and recognizable results. Other languages may create alternative creative interpretations.',
    statusPrefix: 'Selected language match',
    generatorLabel: 'Generator',
    categoryLabel: 'Category',
    suitableLanguagesLabel: 'Particularly suitable languages',
    otherSupportedLabel: 'Other supported languages',
    recommendedLanguageLabel: 'Recommended language',
    noSingleRecommendation:
      'No single universal language — choose based on your target market, setting, or creative aesthetic.',
    whyFitLabel: 'Why certain languages fit this style',
    limitationsLabel: 'Known linguistic limitations',
    culturalNotesLabel: 'Cultural & thematic considerations',
    exampleLabel: 'Contextual example',
    whyTitle: 'Why does language matter?',
    whyPoints: [
      {
        title: 'How language influences generated names',
        body: 'Language shapes the character script, syllable structure, consonant-vowel rhythm, prefixes, and overall length.',
      },
      {
        title: 'Why some generators follow specific conventions',
        body: 'Anime, historical, or curated-corpus generators rely on domain-specific lexicons or documented lists that align naturally with certain linguistic traditions.',
      },
      {
        title: 'How switching languages changes the aesthetic',
        body: 'Choosing Arabic or Japanese triggers transliteration or script adaptation of roots, creating a distinct stylistic mood rather than a literal translation.',
      },
      {
        title: 'Generated forms vs. traditional names',
        body: 'Unless explicitly sourced from an attested directory, algorithmic and transliterated outputs are creative suggestions—not automatically authentic traditional names.',
      },
    ],
    footerNotice:
      'NameForge generators adapt their naming styles to the selected language. Some generators are more closely aligned with specific linguistic and cultural conventions. Choosing a compatible language can help produce more coherent results. Other language choices may create alternative creative styles.',
    domainNotes: {
      anime: {
        whyFit:
          'Built around Japanese-inspired anime morphemes and naming rhythms; Japanese katakana mode and Latin romaji preserve recognizable anime character conventions.',
        limitations:
          'Japanese mode produces creative katakana approximations rather than attested kanji names; non-Japanese scripts rely on phonetic adaptation.',
        cultural:
          'Distinct honorifics and clan patterns reflect pop-culture anime tropes rather than formal Japanese civil registry rules.',
        example:
          'Japanese may produce recognizable katakana anime-style forms, whereas Arabic yields phonetic transliteration with a different aesthetic.',
      },
      attested: {
        whyFit:
          'Draws from documented given-name directories for Latin European traditions and an explicitly localized Arabic directory.',
        limitations:
          'Refuses to fabricate real personal names for scripts without a verified local directory yet (such as Japanese, Korean, Cyrillic, or Devanagari).',
        cultural:
          'Real-world name suitability depends on family usage, regional spelling conventions, and civil context.',
        example:
          'French, English, European Latin modes, and Arabic access verified name banks; unsupported scripts display recommended alternatives.',
      },
      phraseBank: {
        whyFit:
          'Powered by curated multilingual expression banks localized across all 28 supported interface languages.',
        limitations:
          'Thematic styles such as Nordic, Latin, or Tech keep stylized vocabulary overlays that may contrast with idiomatic local phrasing.',
        cultural:
          'Review idioms and editorial tone with a fluent speaker for formal publication or commercial campaigns.',
        example:
          'All 28 UI languages access dedicated curated phrase structures tailored to the generator’s editorial purpose.',
      },
      desert: {
        whyFit:
          'Evokes desert, oasis, and ancient Near Eastern motifs where Arabic phonetic transliteration or classical Latin forms harmonize with the setting.',
        limitations:
          'Arabic output uses phonetic transliteration of category roots rather than classical Arabic morphology.',
        cultural:
          'Verify historical or sacred terms before commercial or worldbuilding use to ensure respectful representation.',
        example:
          'Arabic or classical Latin aligns naturally with desert-mythic themes, while other languages offer cross-genre variations.',
      },
      nordic: {
        whyFit:
          'Grounded in Old Norse, Scandinavian, and Germanic syllable roots that fit Nordic & Runic as well as Scandinavian and English modes.',
        limitations:
          'Non-Latin script selections use phonetic adaptation rather than authentic Old Norse morphology.',
        cultural:
          'Avoid conflating fictional gaming names with sacred or historical Norse heritage without verification.',
        example:
          'Nordic & Runic, Swedish, Danish, Norwegian, German, and English preserve crisp Northern consonant clusters.',
      },
      medieval: {
        whyFit:
          'Combines heroic, chivalric, or mythic syllables that adapt flexibly across multiple European, classical Latin, and stylized fantasy traditions.',
        limitations:
          'Transliterated or non-Latin outputs prioritize stylistic cadence over historical etymology.',
        cultural:
          'Language choice shapes whether your medieval or fantasy setting reads Arthurian, Continental, Nordic, or cross-cultural.',
        example:
          'Multiple languages work well depending on whether you want Classical Latin, French, English, German, or Nordic atmosphere.',
      },
      business: {
        whyFit:
          'Designed for brandable wordmarks, commercial clarity, and memorable compounds across target markets.',
        limitations:
          'Phonetic transliterations into non-Latin scripts require native-speaker legibility and trademark clearance checks.',
        cultural:
          'There is no single best language: weigh your audience’s spoken language, pronunciation ease, and local market conventions.',
        example:
          'Choose the language matching your primary customer base, international pronunciation goals, and domain strategy.',
      },
      tech: {
        whyFit:
          'Combines crisp technical morphemes, Cyber & Tech neologisms, and international developer terminology.',
        limitations:
          'Creative script adaptations outside Latin/Tech conventions may obscure technical root recognition.',
        cultural:
          'Short, unambiguous ASCII-portable names often perform better for software packages, APIs, and global tools.',
        example:
          'Cyber & Tech and international Latin modes emphasize sleek neologisms suited to digital platforms.',
      },
      creative: {
        whyFit:
          'Adapts narrative roots and atmospheric compounds flexibly across supported languages.',
        limitations:
          'Non-Latin outputs use controlled adaptation or transliteration and remain experimental creative drafts.',
        cultural:
          'Consider genre audience expectations and readability across your target community.',
        example:
          'Select the language that matches your story’s cultural tone or audience familiarity.',
      },
    },
    indicatorDescriptions: {
      'highly-compatible':
        'Dedicated vocabulary, phrase banks, or attested linguistic resources exist for this generator and language pair.',
      compatible:
        'Category rules work coherently with this language to preserve intended thematic conventions.',
      'alternative-style':
        'Uses phonetic transliteration or stylistic overlay, creating a distinct aesthetic different from traditional expectations.',
      'limited-resources':
        'Uses controlled creative script adaptation; output is experimental due to limited native linguistic data for this category.',
      'requires-review':
        'No verified native resource is available for this combination, or manual linguistic clearance is required.',
      'not-evaluated':
        'Compatibility for this language and generator pair has not been formally evaluated.',
    },
  },
};

const FR: EnhancementLabels = {
  compare: {
    compareWithCollectionsTitle: 'Comparer avec Mes collections & favoris',
    sourceFilterAll: 'Toutes les sources',
    sourceGenerated: 'Généré',
    sourceSaved: 'Enregistré',
    sourceCollection: 'Collection',
    searchPlaceholder: 'Rechercher parmi les noms générés, enregistrés ou collections…',
    allCollectionsFilter: 'Toutes les collections',
    unassignedCollection: 'Sans collection',
    selectedCounter: '{count} / {max} sélectionnés',
    clearSelection: 'Effacer la sélection',
    maxSelectedHint: 'Maximum 4 noms sélectionnés. Décochez ou retirez un nom pour en ajouter un autre.',
    noCandidatesFound: 'Aucun nom correspondant trouvé pour ce filtre.',
    copyComparison: 'Copier la comparaison',
    comparisonCopied: 'Comparaison copiée',
    exportTxt: 'Exporter .TXT',
    exportJson: 'Exporter .JSON',
    languageMetaLabel: 'Langue',
    categoryMetaLabel: 'Catégorie',
    collectionMetaLabel: 'Collection',
    notEvaluated: 'Non évalué',
    insufficientData: 'Données insuffisantes',
    crossContextTitle: 'Note sur les langues ou catégories mixtes',
    crossContextNotice:
      'Ces noms proviennent de catégories ou langues différentes ({details}). Les comparaisons directes ont des limites structurelles et doivent être interprétées selon le contexte propre à chaque nom.',
  },
  compatibility: {
    indicators: {
      'highly-compatible': 'Très compatible',
      compatible: 'Compatible',
      'alternative-style': 'Style alternatif',
      'limited-resources': 'Ressources linguistiques limitées',
      'requires-review': 'Vérification requise',
      'not-evaluated': 'Non évalué',
    },
    heading: 'Compatibilité langue et générateur',
    generalIntro:
      'La langue sélectionnée influence le style, la structure, la sonorité et les références culturelles des noms générés. Certains générateurs reposent sur des conventions linguistiques précises. Choisir une langue cohérente avec le thème produit souvent des résultats plus homogènes. D’autres langues offrent des interprétations créatives alternatives.',
    statusPrefix: 'Adéquation avec la langue choisie',
    generatorLabel: 'Générateur',
    categoryLabel: 'Catégorie',
    suitableLanguagesLabel: 'Langues particulièrement adaptées',
    otherSupportedLabel: 'Autres langues prises en charge',
    recommendedLanguageLabel: 'Langue recommandée',
    noSingleRecommendation:
      'Aucune langue unique imposée : choisissez selon votre marché cible, votre univers ou l’esthétique recherchée.',
    whyFitLabel: 'Pourquoi certaines langues correspondent à ce style',
    limitationsLabel: 'Limites linguistiques connues',
    culturalNotesLabel: 'Repères culturels et thématiques',
    exampleLabel: 'Exemple pour ce générateur',
    whyTitle: 'Pourquoi la langue est-elle importante ?',
    whyPoints: [
      {
        title: 'Comment la langue influence les noms générés',
        body: 'La langue détermine le système d’écriture, la coupe syllabique, le rythme consonnes-voyelles, les affixes et la longueur.',
      },
      {
        title: 'Pourquoi certains générateurs ont des conventions préférées',
        body: 'Les générateurs anime, historiques ou à corpus documenté s’appuient sur des lexiques thématiques liés à des traditions précises.',
      },
      {
        title: 'Pourquoi changer de langue modifie l’esthétique',
        body: 'Choisir l’arabe ou le japonais active une translittération phonétique ou une adaptation graphique qui crée une tonalité stylistique distincte.',
      },
      {
        title: 'Propositions créatives vs noms traditionnels authentiques',
        body: 'Sauf provenance explicite d’un répertoire attesté, les noms générés restent des propositions créatives et non des noms traditionnels certifiés.',
      },
    ],
    footerNotice:
      'Les générateurs NameForge adaptent leur style à la langue sélectionnée. Certains générateurs s’alignent plus étroitement sur des conventions linguistiques et culturelles spécifiques. Choisir une langue compatible favorise des résultats cohérents, tandis que d’autres choix créent des styles alternatifs.',
    domainNotes: {
      anime: {
        whyFit:
          'Fondé sur des morphèmes d’inspiration japonaise et des cadences anime ; le mode katakana japonais et le rōmaji préservent les codes du genre.',
        limitations:
          'Le mode japonais produit des approximations créatives en katakana et non des prénoms officiels en kanji ; les autres écritures adaptent les sons.',
        cultural:
          'Les formes reflètent les conventions narratives de l’anime plutôt que l’état civil japonais.',
        example:
          'Le japonais produit des formes proches des conventions anime en katakana, tandis que l’arabe propose une translittération phonétique au rendu différent.',
      },
      attested: {
        whyFit:
          'S’appuie sur un répertoire documenté de prénoms réels européens/latins et un répertoire dédié en écriture arabe.',
        limitations:
          'Refuse d’inventer de faux prénoms réels pour les écritures sans répertoire vérifié inclus (japonais, coréen, cyrillique, devanagari, etc.).',
        cultural:
          'Le choix final d’un prénom dépend des usages régionaux, de l’orthographe officielle et du contexte familial.',
        example:
          'Le français, l’anglais, les langues européennes et l’arabe accèdent à des répertoires attestés ; les autres écritures affichent des alternatives.',
      },
      phraseBank: {
        whyFit:
          'Basé sur des banques d’expressions rédigées et localisées dans les 28 langues prises en charge.',
        limitations:
          'Les modes stylistiques (Nordique, Latin, Tech) appliquent une coloration lexicale particulière.',
        cultural:
          'Faites relire les slogans ou titres par un locuteur natif avant publication commerciale.',
        example:
          'Les 28 langues utilisent chacune des structures éditoriales adaptées à cette catégorie.',
      },
      desert: {
        whyFit:
          'Évoque les motifs du désert, des oasis et de l’Orient ancien où la translittération arabe ou le latin classique s’intègrent naturellement.',
        limitations:
          'Le mode arabe repose sur une translittération phonétique des racines thématiques et non sur la morphologie arabe classique.',
        cultural:
          'Vérifiez tout terme à résonance historique ou sacrée avant usage éditorial ou commercial.',
        example:
          'L’arabe ou le latin soutiennent l’atmosphère désertique ; d’autres langues offrent des variantes narratives.',
      },
      nordic: {
        whyFit:
          'Inspiré de racines nordiques anciennes et germaniques très adaptées au mode Nordique & Runique, aux langues scandinaves et à l’anglais.',
        limitations:
          'Les écritures non latines passent par une adaptation phonétique qui atténue la structure norroise d’origine.',
        cultural:
          'Distinguez les noms ludiques de fantasy des noms historiques ou culturels réels.',
        example:
          'Nordique & Runique, suédois, danois, norvégien, allemand et anglais conservent les sonorités nordiques.',
      },
      medieval: {
        whyFit:
          'Combine des racines épiques, chevaleresques ou mythiques compatibles avec plusieurs langues européennes et classiques.',
        limitations:
          'Les adaptations en écriture non latine privilégient la cadence phonétique plutôt que l’étymologie historique.',
        cultural:
          'La langue sélectionnée oriente l’atmosphère entre récit arthurien, médiéval continental ou fantasy cosmopolite.',
        example:
          'Plusieurs langues conviennent selon l’ambiance souhaitée : latin, français, anglais, allemand ou nordique.',
      },
      business: {
        whyFit:
          'Conçu pour créer des marques lisibles, mémorables et adaptées aux marchés visés.',
        limitations:
          'Toute translittération en écriture non latine demande une relecture native et une recherche d’antériorité.',
        cultural:
          'Aucune langue unique ne s’impose : évaluez la langue de vos clients, la prononciation internationale et l’identité voulue.',
        example:
          'Alignez la langue de génération sur votre marché principal et vos objectifs de marque.',
      },
      tech: {
        whyFit:
          'Associe morphèmes techniques, néologismes Cyber & Tech et vocabulaire logiciel international.',
        limitations:
          'Les adaptations créatives hors écriture latine/tech peuvent masquer les racines techniques habituelles.',
        cultural:
          'Les formats courts et compatibles ASCII facilitent l’usage pour API, logiciels et noms de domaine.',
        example:
          'Les modes Cyber & Tech et anglais/français mettent en avant des néologismes compacts pour produits numériques.',
      },
      creative: {
        whyFit:
          'Adapte des racines narratives et composés créatifs avec souplesse selon les langues prises en charge.',
        limitations:
          'Les résultats en écriture non latine reposent sur une adaptation contrôlée expérimentale.',
        cultural:
          'Tenez compte des attentes de votre public et de la lisibilité selon le genre.',
        example:
          'Choisissez la langue qui reflète le mieux le ton culturel de votre projet.',
      },
    },
    indicatorDescriptions: {
      'highly-compatible':
        'Des ressources linguistiques, banques dédiées ou répertoires attestés soutiennent directement ce couple générateur/langue.',
      compatible:
        'Les règles du générateur fonctionnent de manière cohérente avec cette langue tout en respectant le thème.',
      'alternative-style':
        'Utilise une translittération phonétique ou un habillage stylistique créant une esthétique distincte des conventions habituelles.',
      'limited-resources':
        'Adaptation créative contrôlée : ressources linguistiques natives limitées dans cette catégorie, résultats expérimentaux.',
      'requires-review':
        'Aucun répertoire natif vérifié n’est disponible pour ce couple, ou une vérification humaine est indispensable.',
      'not-evaluated':
        'La compatibilité entre ce générateur et cette langue n’a pas encore été évaluée.',
    },
  },
};

function makeCompactLocale(
  partial: {
    compare: Partial<EnhancementLabels['compare']> & Pick<EnhancementLabels['compare'], 'compareWithCollectionsTitle' | 'sourceGenerated' | 'sourceSaved' | 'sourceCollection' | 'searchPlaceholder' | 'allCollectionsFilter' | 'clearSelection' | 'notEvaluated' | 'insufficientData' | 'crossContextTitle' | 'crossContextNotice'>;
    compatibility: {
      indicators: Record<CompatibilityIndicatorKey, string>;
      heading: string;
      generalIntro: string;
      statusPrefix: string;
      generatorLabel: string;
      categoryLabel: string;
      suitableLanguagesLabel: string;
      otherSupportedLabel: string;
      recommendedLanguageLabel: string;
      noSingleRecommendation: string;
      whyFitLabel: string;
      limitationsLabel: string;
      culturalNotesLabel: string;
      exampleLabel: string;
      whyTitle: string;
      whyPoints: EnhancementLabels['compatibility']['whyPoints'];
      footerNotice: string;
      indicatorDescriptions: Record<CompatibilityIndicatorKey, string>;
      domainSummary: Record<ProfileDomainKey, string>;
    };
  }
): EnhancementLabels {
  return {
    compare: {
      ...EN.compare,
      ...partial.compare,
    },
    compatibility: {
      indicators: partial.compatibility.indicators,
      heading: partial.compatibility.heading,
      generalIntro: partial.compatibility.generalIntro,
      statusPrefix: partial.compatibility.statusPrefix,
      generatorLabel: partial.compatibility.generatorLabel,
      categoryLabel: partial.compatibility.categoryLabel,
      suitableLanguagesLabel: partial.compatibility.suitableLanguagesLabel,
      otherSupportedLabel: partial.compatibility.otherSupportedLabel,
      recommendedLanguageLabel: partial.compatibility.recommendedLanguageLabel,
      noSingleRecommendation: partial.compatibility.noSingleRecommendation,
      whyFitLabel: partial.compatibility.whyFitLabel,
      limitationsLabel: partial.compatibility.limitationsLabel,
      culturalNotesLabel: partial.compatibility.culturalNotesLabel,
      exampleLabel: partial.compatibility.exampleLabel,
      whyTitle: partial.compatibility.whyTitle,
      whyPoints: partial.compatibility.whyPoints,
      footerNotice: partial.compatibility.footerNotice,
      indicatorDescriptions: partial.compatibility.indicatorDescriptions,
      domainNotes: {
        anime: {
          ...EN.compatibility.domainNotes.anime,
          whyFit: partial.compatibility.domainSummary.anime,
        },
        attested: {
          ...EN.compatibility.domainNotes.attested,
          whyFit: partial.compatibility.domainSummary.attested,
        },
        phraseBank: {
          ...EN.compatibility.domainNotes.phraseBank,
          whyFit: partial.compatibility.domainSummary.phraseBank,
        },
        desert: {
          ...EN.compatibility.domainNotes.desert,
          whyFit: partial.compatibility.domainSummary.desert,
        },
        nordic: {
          ...EN.compatibility.domainNotes.nordic,
          whyFit: partial.compatibility.domainSummary.nordic,
        },
        medieval: {
          ...EN.compatibility.domainNotes.medieval,
          whyFit: partial.compatibility.domainSummary.medieval,
        },
        business: {
          ...EN.compatibility.domainNotes.business,
          whyFit: partial.compatibility.domainSummary.business,
        },
        tech: {
          ...EN.compatibility.domainNotes.tech,
          whyFit: partial.compatibility.domainSummary.tech,
        },
        creative: {
          ...EN.compatibility.domainNotes.creative,
          whyFit: partial.compatibility.domainSummary.creative,
        },
      },
    },
  };
}

const ENHANCEMENT_LABELS: Record<EnhancementLocale, EnhancementLabels> = {
  en: EN,
  fr: FR,
  es: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Comparar con Mis colecciones y guardados',
      sourceFilterAll: 'Todas las fuentes',
      sourceGenerated: 'Generado',
      sourceSaved: 'Guardado',
      sourceCollection: 'Colección',
      searchPlaceholder: 'Buscar nombres generados, guardados o en colecciones…',
      allCollectionsFilter: 'Todas las colecciones',
      unassignedCollection: 'Sin colección',
      selectedCounter: '{count} / {max} seleccionados',
      clearSelection: 'Limpiar selección',
      maxSelectedHint: 'Máximo 4 nombres seleccionados. Desmarca o quita uno para añadir otro.',
      noCandidatesFound: 'No se encontraron nombres coincidentes.',
      copyComparison: 'Copiar comparación',
      comparisonCopied: 'Comparación copiada',
      languageMetaLabel: 'Idioma',
      categoryMetaLabel: 'Categoría',
      collectionMetaLabel: 'Colección',
      notEvaluated: 'No evaluado',
      insufficientData: 'Datos insuficientes',
      crossContextTitle: 'Nota de comparación entre idiomas o categorías',
      crossContextNotice:
        'Estos nombres pertenecen a categorías o idiomas distintos ({details}). Las comparaciones directas tienen limitaciones y deben valorarse en el contexto de cada nombre.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Muy compatible',
        compatible: 'Compatible',
        'alternative-style': 'Estilo alternativo',
        'limited-resources': 'Recursos lingüísticos limitados',
        'requires-review': 'Requiere revisión',
        'not-evaluated': 'No evaluado',
      },
      heading: 'Compatibilidad de idioma y generador',
      generalIntro:
        'El idioma seleccionado influye en el estilo, la estructura, el sonido y los rasgos culturales de los nombres generados. Algunos generadores siguen convenciones lingüísticas específicas; elegir un idioma afín aporta mayor coherencia, mientras que otros idiomas generan interpretaciones creativas alternativas.',
      statusPrefix: 'Compatibilidad del idioma actual',
      generatorLabel: 'Generador',
      categoryLabel: 'Categoría',
      suitableLanguagesLabel: 'Idiomas especialmente adecuados',
      otherSupportedLabel: 'Otros idiomas compatibles',
      recommendedLanguageLabel: 'Idioma recomendado',
      noSingleRecommendation: 'No hay un único idioma obligatorio: elige según tu público, mercado o estética.',
      whyFitLabel: 'Por qué ciertos idiomas encajan con este estilo',
      limitationsLabel: 'Limitaciones lingüísticas conocidas',
      culturalNotesLabel: 'Consideraciones culturales y temáticas',
      exampleLabel: 'Ejemplo contextual',
      whyTitle: '¿Por qué importa el idioma?',
      whyPoints: [
        { title: 'Cómo influye el idioma', body: 'Define el sistema de escritura, la cadencia silábica, los prefijos y la longitud.' },
        { title: 'Convenciones de cada generador', body: 'Los generadores de anime, históricos o de corpus verificado dependen de léxicos específicos.' },
        { title: 'Cambio de estética', body: 'Elegir árabe o japonés aplica transliteración o adaptación gráfica con otro matiz estilístico.' },
        { title: 'Nombres creativos vs. tradicionales', body: 'Salvo en listados verificados, los resultados son propuestas creativas, no nombres tradicionales certificados.' },
      ],
      footerNotice:
        'Los generadores de NameForge adaptan su estilo al idioma seleccionado. Algunos se alinean más con convenciones lingüísticas y culturales concretas. Elegir un idioma compatible produce resultados más coherentes; otros idiomas crean estilos alternativos.',
      indicatorDescriptions: {
        'highly-compatible': 'Recursos léxicos dedicados o listas verificadas respaldan directamente esta combinación.',
        compatible: 'Las reglas del generador funcionan de forma coherente en este idioma manteniendo el tema.',
        'alternative-style': 'Aplica transliteración fonética o estilo alternativo con una estética distinta.',
        'limited-resources': 'Adaptación creativa controlada en escritura destino; resultados experimentales.',
        'requires-review': 'No hay directorio nativo verificado para esta combinación; requiere revisión humana.',
        'not-evaluated': 'La compatibilidad de este par aún no ha sido evaluada.',
      },
      domainSummary: {
        anime: 'Basado en morfemas de inspiración japonesa y cadencias anime; japonés (katakana) y romaji conservan sus rasgos reconocibles.',
        attested: 'Usa repertorios documentados europeos/latinos y un repertorio árabe localizado; evita inventar nombres reales sin corpus.',
        phraseBank: 'Respaldado por bancos de frases multilingües adaptados a los 28 idiomas compatibles.',
        desert: 'Inspirado en motivos del desierto y Oriente antiguo; la transliteración árabe o el latín clásico armonizan con la ambientación.',
        nordic: 'Basado en raíces nórdicas y germánicas acordes con el modo Nórdico, idiomas escandinavos e inglés.',
        medieval: 'Combina raíces caballerescas y míticas flexibles en múltiples idiomas europeos y latín.',
        business: 'Orientado a marcas claras y memorables según el mercado objetivo y la pronunciación.',
        tech: 'Integra morfemas técnicos, neologismos Cyber & Tech y terminología digital.',
        creative: 'Adapta raíces narrativas de forma flexible entre los idiomas compatibles.',
      },
    },
  }),
  de: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Mit Sammlungen & Gespeichertem vergleichen',
      sourceFilterAll: 'Alle Quellen',
      sourceGenerated: 'Generiert',
      sourceSaved: 'Gespeichert',
      sourceCollection: 'Sammlung',
      searchPlaceholder: 'Generierte, gespeicherte oder Sammlungsnamen suchen…',
      allCollectionsFilter: 'Alle Sammlungen',
      unassignedCollection: 'Ohne Sammlung',
      selectedCounter: '{count} / {max} ausgewählt',
      clearSelection: 'Auswahl leeren',
      maxSelectedHint: 'Maximal 4 Namen auswählbar. Einen abwählen, um weitere hinzuzufügen.',
      noCandidatesFound: 'Keine passenden Namen gefunden.',
      copyComparison: 'Vergleich kopieren',
      comparisonCopied: 'Vergleich kopiert',
      languageMetaLabel: 'Sprache',
      categoryMetaLabel: 'Kategorie',
      collectionMetaLabel: 'Sammlung',
      notEvaluated: 'Nicht bewertet',
      insufficientData: 'Unzureichende Daten',
      crossContextTitle: 'Hinweis zu verschiedenen Sprachen oder Kategorien',
      crossContextNotice:
        'Diese Namen stammen aus unterschiedlichen Kategorien oder Sprachen ({details}). Direkte Wertungsvergleiche sind begrenzt und sollten im jeweiligen Kontext betrachtet werden.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Sehr gut geeignet',
        compatible: 'Kompatibel',
        'alternative-style': 'Alternativer Stil',
        'limited-resources': 'Begrenzte Sprachressourcen',
        'requires-review': 'Prüfung erforderlich',
        'not-evaluated': 'Nicht bewertet',
      },
      heading: 'Sprach- und Generator-Kompatibilität',
      generalIntro:
        'Die gewählte Sprache beeinflusst Stil, Struktur, Klang und kulturelle Wirkung generierter Namen. Manche Generatoren folgen bestimmten sprachlichen Konventionen. Eine passende Sprache führt oft zu stimmigeren Ergebnissen, während andere Sprachen alternative kreative Interpretationen eröffnen.',
      statusPrefix: 'Eignung der gewählten Sprache',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategorie',
      suitableLanguagesLabel: 'Besonders geeignete Sprachen',
      otherSupportedLabel: 'Weitere unterstützte Sprachen',
      recommendedLanguageLabel: 'Empfohlene Sprache',
      noSingleRecommendation: 'Keine feste Einzelsprache — wählen Sie nach Zielmarkt, Setting oder gewünschter Ästhetik.',
      whyFitLabel: 'Warum bestimmte Sprachen zu diesem Stil passen',
      limitationsLabel: 'Bekannte sprachliche Einschränkungen',
      culturalNotesLabel: 'Kulturelle & thematische Hinweise',
      exampleLabel: 'Beispiel für diesen Generator',
      whyTitle: 'Warum ist die Sprache wichtig?',
      whyPoints: [
        { title: 'Einfluss auf Klang & Aufbau', body: 'Sprache prägt Schriftsystem, Silbenrhythmus, Affixe und typische Namenslängen.' },
        { title: 'Themenspezifische Konventionen', body: 'Anime-, historische oder belegte Vornamen-Generatoren nutzen spezifische Wortbestände.' },
        { title: 'Stilwechsel bei Sprachänderung', body: 'Arabisch oder Japanisch nutzen Transliteration oder Skriptanpassung und erzeugen so eine eigene Ästhetik.' },
        { title: 'Kreative Entwürfe vs. traditionelle Namen', body: 'Ohne belegte Quelldatenbank sind generierte Ergebnisse kreative Vorschläge und keine verbürgten Traditionsnamen.' },
      ],
      footerNotice:
        'NameForge-Generatoren passen ihren Namensstil an die gewählte Sprache an. Einige Generatoren orientieren sich enger an bestimmten sprachlichen und kulturellen Konventionen. Eine passende Sprache sorgt für stimmigere Ergebnisse; andere Sprachen schaffen alternative kreative Stile.',
      indicatorDescriptions: {
        'highly-compatible': 'Spezielle Wortbestände, Phrasenbanken oder belegte Listen stützen diese Kombination direkt.',
        compatible: 'Generatorregeln greifen stimmig in dieser Sprache und wahren den Themencharakter.',
        'alternative-style': 'Nutzt phonetische Transliteration oder Stilüberlagerung mit eigenständigem Klangbild.',
        'limited-resources': 'Kontrollierte kreative Schriftanpassung; Ergebnisse bleiben experimentell.',
        'requires-review': 'Kein geprüftes natives Verzeichnis vorhanden oder menschliche Prüfung nötig.',
        'not-evaluated': 'Kompatibilität für dieses Paar wurde noch nicht bewertet.',
      },
      domainSummary: {
        anime: 'Basiert auf japanisch inspirierten Anime-Morphemen; Japanisch (Katakana) und Romaji bewahren klassische Anime-Muster.',
        attested: 'Greift auf dokumentierte europäische/lateinische Listen sowie ein arabisches Verzeichnis zu und erfindet keine fehlenden Realnamen.',
        phraseBank: 'Nutzt gepflegte mehrsprachige Phrasenbanken in allen 28 Sprachen.',
        desert: 'Verbindet Wüsten- und Orientmotive, bei denen arabische Transliteration oder klassisches Latein gut harmonieren.',
        nordic: 'Stützt sich auf altnordische und germanische Wurzeln passend für Nordisch, Skandinavisch und Deutsch/Englisch.',
        medieval: 'Verbindet ritterliche und mythische Wurzeln flexibel über europäische Sprachen und Latein.',
        business: 'Fokus auf klare Markenführung, Aussprache und Markttauglichkeit je nach Zielregion.',
        tech: 'Kombiniert technische Silben, Cyber-&-Tech-Neologismen und Softwarebegriffe.',
        creative: 'Passt narrative Wortstämme flexibel an unterstützte Zielsprachen an.',
      },
    },
  }),
  it: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Confronta con Collezioni e Salvati',
      sourceFilterAll: 'Tutte le fonti',
      sourceGenerated: 'Generato',
      sourceSaved: 'Salvato',
      sourceCollection: 'Raccolta',
      searchPlaceholder: 'Cerca nomi generati, salvati o nelle raccolte…',
      allCollectionsFilter: 'Tutte le raccolte',
      unassignedCollection: 'Senza raccolta',
      selectedCounter: '{count} / {max} selezionati',
      clearSelection: 'Cancella selezione',
      maxSelectedHint: 'Massimo 4 nomi selezionati. Rimuovi o deseleziona un nome per aggiungerne un altro.',
      noCandidatesFound: 'Nessun nome corrispondente trovato.',
      copyComparison: 'Copia confronto',
      comparisonCopied: 'Confronto copiato',
      languageMetaLabel: 'Lingua',
      categoryMetaLabel: 'Categoria',
      collectionMetaLabel: 'Raccolta',
      notEvaluated: 'Non valutato',
      insufficientData: 'Dati insufficienti',
      crossContextTitle: 'Nota sul confronto tra lingue o categorie diverse',
      crossContextNotice:
        'Questi nomi appartengono a categorie o lingue differenti ({details}). I confronti diretti hanno limiti strutturali e vanno letti nel proprio contesto.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Altamente compatibile',
        compatible: 'Compatibile',
        'alternative-style': 'Stile alternativo',
        'limited-resources': 'Risorse linguistiche limitate',
        'requires-review': 'Richiede verifica',
        'not-evaluated': 'Non valutato',
      },
      heading: 'Compatibilità lingua e generatore',
      generalIntro:
        'La lingua scelta influenza stile, struttura, suono e riferimenti culturali dei nomi generati. Alcuni generatori seguono convenzioni linguistiche precise: scegliere una lingua coerente rende i risultati più riconoscibili, mentre altre lingue offrono interpretazioni creative alternative.',
      statusPrefix: 'Adattamento lingua corrente',
      generatorLabel: 'Generatore',
      categoryLabel: 'Categoria',
      suitableLanguagesLabel: 'Lingue particolarmente adatte',
      otherSupportedLabel: 'Altre lingue supportate',
      recommendedLanguageLabel: 'Lingua consigliata',
      noSingleRecommendation: 'Nessuna lingua unica obbligatoria: scegli in base a mercato, ambientazione o estetica.',
      whyFitLabel: 'Perché alcune lingue si adattano meglio',
      limitationsLabel: 'Limiti linguistici noti',
      culturalNotesLabel: 'Considerazioni culturali e tematiche',
      exampleLabel: 'Esempio contestuale',
      whyTitle: 'Perché la lingua è importante?',
      whyPoints: [
        { title: 'Influenza su suono e struttura', body: 'La lingua determina scrittura, sillabe, suffissi e ritmo.' },
        { title: 'Convenzioni specifiche', body: 'Generatori anime, storici o di nomi reali usano lessici legati a tradizioni precise.' },
        { title: 'Cambio di estetica', body: 'Arabo o giapponese attivano traslitterazioni o adattamenti grafici con resa stilistica diversa.' },
        { title: 'Nomi creativi vs. tradizionali', body: 'Salvo archivi attestati, le proposte sono creative e non nomi tradizionali certificati.' },
      ],
      footerNotice:
        'I generatori NameForge adattano lo stile alla lingua selezionata. Alcuni seguono convenzioni linguistiche e culturali specifiche. Scegliere una lingua compatibile offre risultati più coerenti; altre opzioni creano stili alternativi.',
      indicatorDescriptions: {
        'highly-compatible': 'Lessici dedicati o archivi verificati supportano direttamente questa combinazione.',
        compatible: 'Le regole del generatore operano in modo coerente mantenendo lo stile tematico.',
        'alternative-style': 'Applica traslitterazione fonetica o stile alternativo rispetto alle convenzioni classiche.',
        'limited-resources': 'Adattamento creativo controllato con dati nativi limitati per questa categoria.',
        'requires-review': 'Manca un archivio nativo verificato o è necessaria revisione umana.',
        'not-evaluated': 'La compatibilità per questa coppia non è stata ancora valutata.',
      },
      domainSummary: {
        anime: 'Basato su radici anime giapponesi; giapponese (katakana) e romaji preservano l’identità anime.',
        attested: 'Attinge a elenchi documentati europei/latini e arabi senza inventare nomi reali assenti.',
        phraseBank: 'Basato su banche frasali curate in tutte le 28 lingue supportate.',
        desert: 'Motivi desertici e orientali in sintonia con traslitterazione araba o latino classico.',
        nordic: 'Radici nordiche e germaniche ideali con modalità Nordica, lingue scandinave e inglese.',
        medieval: 'Combina radici epiche e cavalleresche flessibili tra lingue europee e latino.',
        business: 'Progettato per chiarezza commerciale, pronuncia e mercato di riferimento.',
        tech: 'Integra morfemi tecnici e neologismi Cyber & Tech.',
        creative: 'Adatta radici narrative in modo flessibile tra le lingue disponibili.',
      },
    },
  }),
  pt: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Comparar com Coleções e Salvos',
      sourceFilterAll: 'Todas as fontes',
      sourceGenerated: 'Gerado',
      sourceSaved: 'Salvo',
      sourceCollection: 'Coleção',
      searchPlaceholder: 'Pesquisar nomes gerados, salvos ou de coleções…',
      allCollectionsFilter: 'Todas as coleções',
      unassignedCollection: 'Sem coleção',
      selectedCounter: '{count} / {max} selecionados',
      clearSelection: 'Limpar seleção',
      maxSelectedHint: 'Máximo de 4 nomes selecionados. Desmarque ou remova um para adicionar outro.',
      noCandidatesFound: 'Nenhum nome correspondente encontrado.',
      copyComparison: 'Copiar comparação',
      comparisonCopied: 'Comparação copiada',
      languageMetaLabel: 'Idioma',
      categoryMetaLabel: 'Categoria',
      collectionMetaLabel: 'Coleção',
      notEvaluated: 'Não avaliado',
      insufficientData: 'Dados insuficientes',
      crossContextTitle: 'Nota sobre comparação entre idiomas ou categorias',
      crossContextNotice:
        'Estes nomes pertencem a categorias ou idiomas diferentes ({details}). Comparações diretas têm limitações e devem ser analisadas no contexto de cada nome.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Altamente compatível',
        compatible: 'Compatível',
        'alternative-style': 'Estilo alternativo',
        'limited-resources': 'Recursos linguísticos limitados',
        'requires-review': 'Requer revisão',
        'not-evaluated': 'Não avaliado',
      },
      heading: 'Compatibilidade entre idioma e gerador',
      generalIntro:
        'O idioma escolhido influencia o estilo, a estrutura, a sonoridade e os traços culturais dos nomes gerados. Alguns geradores seguem convenções linguísticas específicas: selecionar um idioma compatível gera resultados mais coerentes, enquanto outros idiomas produzem interpretações alternativas.',
      statusPrefix: 'Adequação do idioma atual',
      generatorLabel: 'Gerador',
      categoryLabel: 'Categoria',
      suitableLanguagesLabel: 'Idiomas especialmente adequados',
      otherSupportedLabel: 'Outros idiomas suportados',
      recommendedLanguageLabel: 'Idioma recomendado',
      noSingleRecommendation: 'Sem idioma único obrigatório — escolha conforme seu público, mercado ou estética.',
      whyFitLabel: 'Por que certos idiomas combinam com este estilo',
      limitationsLabel: 'Limitações linguísticas conhecidas',
      culturalNotesLabel: 'Considerações culturais e temáticas',
      exampleLabel: 'Exemplo contextual',
      whyTitle: 'Por que o idioma importa?',
      whyPoints: [
        { title: 'Influência estrutural e sonora', body: 'O idioma define escrita, sílabas, ritmo, prefixos e extensão.' },
        { title: 'Convenções do gerador', body: 'Geradores de anime, históricos ou de nomes reais usam léxicos ligados a tradições específicas.' },
        { title: 'Mudança de estética', body: 'Árabe ou japonês aplicam transliteração ou adaptação gráfica criando outra atmosfera estilística.' },
        { title: 'Sugestões criativas vs. nomes tradicionais', body: 'Salvo quando oriundos de diretórios verificados, os nomes gerados são criações sugestivas.' },
      ],
      footerNotice:
        'Os geradores do NameForge adaptam seu estilo ao idioma selecionado. Alguns geradores seguem mais de perto convenções linguísticas e culturais específicas. Escolher um idioma compatível favorece resultados coerentes; outras escolhas geram estilos alternativos.',
      indicatorDescriptions: {
        'highly-compatible': 'Vocabulário dedicado ou listas documentadas dão suporte direto a esta combinação.',
        compatible: 'As regras do gerador funcionam com coerência neste idioma preservando o tema.',
        'alternative-style': 'Usa transliteração fonética ou camada estilística com estética alternativa.',
        'limited-resources': 'Adaptação criativa controlada; recursos nativos limitados nesta categoria.',
        'requires-review': 'Falta diretório nativo verificado ou requer revisão humana.',
        'not-evaluated': 'A compatibilidade deste par ainda não foi avaliada.',
      },
      domainSummary: {
        anime: 'Baseado em morfemas de inspiração japonesa; japonês (katakana) e romaji preservam os traços de anime.',
        attested: 'Usa diretórios documentados europeus/latinos e árabe sem fabricar nomes reais ausentes.',
        phraseBank: 'Alimentado por bancos de expressões localizados nos 28 idiomas.',
        desert: 'Motivos desérticos e orientais em harmonia com transliteração árabe ou latim clássico.',
        nordic: 'Raízes nórdicas e germânicas adequadas ao modo Nórdico, idiomas escandinavos e inglês.',
        medieval: 'Combina raízes cavaleirescas e míticas flexíveis entre vários idiomas europeus e latim.',
        business: 'Focado em marcas memoráveis conforme o mercado-alvo e a pronúncia.',
        tech: 'Combina morfemas técnicos e neologismos Cyber & Tech.',
        creative: 'Adapta raízes narrativas com flexibilidade entre os idiomas suportados.',
      },
    },
  }),
  ar: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'المقارنة مع مجموعاتي والمحفوظات',
      sourceFilterAll: 'جميع المصادر',
      sourceGenerated: 'مولّد',
      sourceSaved: 'محفوظ',
      sourceCollection: 'مجموعة',
      searchPlaceholder: 'ابحث في الأسماء المولّدة أو المحفوظة أو المجموعات…',
      allCollectionsFilter: 'جميع المجموعات',
      unassignedCollection: 'بدون مجموعة',
      selectedCounter: 'تم تحديد {count} / {max}',
      clearSelection: 'مسح التحديد',
      maxSelectedHint: 'الحد الأقصى 4 أسماء للمقارنة. ألغِ تحديد اسم لإضافة آخر.',
      noCandidatesFound: 'لم يتم العثور على أسماء مطابقة لهذا المرشح.',
      copyComparison: 'نسخ المقارنة',
      comparisonCopied: 'تم نسخ المقارنة',
      languageMetaLabel: 'اللغة',
      categoryMetaLabel: 'الفئة',
      collectionMetaLabel: 'المجموعة',
      notEvaluated: 'غير مُقيّم',
      insufficientData: 'بيانات غير كافية',
      crossContextTitle: 'ملاحظة حول اختلاف اللغة أو الفئة',
      crossContextNotice:
        'تنتمي هذه الأسماء إلى فئات أو لغات مختلفة ({details}). للمقارنات المباشرة حدود بنيوية وينبغي تقدير كل اسم ضمن سياقه.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'متوافق بدرجة عالية',
        compatible: 'متوافق',
        'alternative-style': 'أسلوب بديل',
        'limited-resources': 'موارد لغوية محدودة',
        'requires-review': 'يتطلب مراجعة',
        'not-evaluated': 'غير مُقيّم',
      },
      heading: 'توافق اللغة والمولّد',
      generalIntro:
        'تؤثر اللغة المختارة في أسلوب الأسماء المولّدة وبنيتها وجرسها وسماتها الثقافية. تعتمد بعض المولّدات على تقاليد لغوية محددة، لذا فإن اختيار لغة متوافقة يمنح نتائج أكثر اتساقًا، بينما تتيح اللغات الأخرى صياغات إبداعية بديلة.',
      statusPrefix: 'توافق اللغة المختارة',
      generatorLabel: 'المولّد',
      categoryLabel: 'الفئة',
      suitableLanguagesLabel: 'اللغات الأنسب لهذا المولّد',
      otherSupportedLabel: 'لغات أخرى مدعومة',
      recommendedLanguageLabel: 'اللغة الموصى بها',
      noSingleRecommendation: 'لا توجد لغة واحدة ملزمة — اختر اللغة بحسب الجمهور المستهدف أو الطابع الإبداعي.',
      whyFitLabel: 'لماذا تلائم لغات معينة هذا الأسلوب',
      limitationsLabel: 'القيود اللغوية المعروفة',
      culturalNotesLabel: 'اعتبارات ثقافية وموضوعية',
      exampleLabel: 'مثال توضيحي',
      whyTitle: 'لماذا تهم اللغة المختارة؟',
      whyPoints: [
        { title: 'تأثير اللغة على البنية والصوت', body: 'تحدد اللغة نظام الكتابة وتقسيم المقاطع والإيقاع الصوتي والسوابق واللواحق.' },
        { title: 'اتفاق بعض المولّدات مع تقاليد محددة', body: 'تستند مولّدات الأنمي أو القوائم الموثقة إلى قواميس وتراكيب مرتبطة بثقافات معينة.' },
        { title: 'تبدّل الطابع الجمالي عند تغيير اللغة', body: 'استخدام العربية أو اليابانية يفعّل النقحرة الصوتية أو التكييف الكتابي لإنتاج طابع فني مغاير.' },
        { title: 'الأسماء الإبداعية مقابل الأسماء التراثية الأصيلة', body: 'ما لم يُذكر أن الاسم من سجل موثق، تبقى المخرجات اقتراحات إبداعية وليست أسماء تقليدية معتمدة.' },
      ],
      footerNotice:
        'تُكيّف مولّدات NameForge أسلوب التسمية وفق اللغة المختارة. ترتبط بعض المولّدات بتقاليد لغوية وثقافية محددة؛ فاختيار لغة متوافقة يعزز التناسق، بينما تنتج الخيارات الأخرى أساليب إبداعية بديلة.',
      indicatorDescriptions: {
        'highly-compatible': 'تتوفر قواميس مخصصة أو قوائم موثقة تدعم هذا المولّد بهذه اللغة.',
        compatible: 'تعمل قواعد المولّد بانسجام مع هذه اللغة مع الحفاظ على الطابع الموضوعي.',
        'alternative-style': 'تستخدم نقحرة صوتية أو أسلوبًا بديلًا يختلف عن المألوف التقليدي.',
        'limited-resources': 'تكييف كتابي إبداعي مضبوط مع محدودية البيانات اللغوية الأصلية في هذه الفئة.',
        'requires-review': 'لا يتوفر دليل موثق لهذه اللغة أو تلزم مراجعة بشرية متخصصة.',
        'not-evaluated': 'لم يتم تقييم التوافق لهذه التركيبة بعد.',
      },
      domainSummary: {
        anime: 'يستند إلى جذور أنمي مستوحاة من اليابانية؛ وتحافظ اليابانية (كاتاكانا) والروماجي على طابع الأنمي المألوف.',
        attested: 'يعتمد على سجلات أسماء موثقة باللاتينية والعربية، ويتجنب اختلاق أسماء شخصية لكتابات غير متوفرة.',
        phraseBank: 'مدعوم ببنوك تعابير منتقاة ومترجمة عبر اللغات الـ28 المدعومة.',
        desert: 'يستحضر أجواء الصحراء والشرق حيث تنسجم النقحرة العربية أو اللاتينية الكلاسيكية مع الفئة.',
        nordic: 'يعتمد جذورًا إسكندنافية وجرمانية تلائم النمط النوردي واللغات الشمالية والإنجليزية.',
        medieval: 'يمزج جذور الفروسية والأساطير بمرونة بين عدة لغات أوروبية واللاتينية.',
        business: 'مصمم لوضوح العلامات التجارية وسهولة النطق حسب السوق المستهدف.',
        tech: 'يدمج مقاطع تقنية ومصطلحات حديثة مناسبة للمشاريع البرمجية والرقمية.',
        creative: 'يكيف الجذور السردية بمرونة عبر اللغات المدعومة.',
      },
    },
  }),
  tr: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Koleksiyonlarım ve Kaydedilenlerle Karşılaştır',
      sourceFilterAll: 'Tüm kaynaklar',
      sourceGenerated: 'Üretilen',
      sourceSaved: 'Kaydedilen',
      sourceCollection: 'Koleksiyon',
      searchPlaceholder: 'Üretilen, kaydedilen veya koleksiyon adlarını ara…',
      allCollectionsFilter: 'Tüm koleksiyonlar',
      unassignedCollection: 'Koleksiyonsuz',
      selectedCounter: '{count} / {max} seçildi',
      clearSelection: 'Seçimi temizle',
      maxSelectedHint: 'En fazla 4 ad seçilebilir. Başka eklemek için birini kaldırın.',
      noCandidatesFound: 'Bu filtre için eşleşen ad bulunamadı.',
      copyComparison: 'Karşılaştırmayı kopyala',
      comparisonCopied: 'Karşılaştırma kopyalandı',
      languageMetaLabel: 'Dil',
      categoryMetaLabel: 'Kategori',
      collectionMetaLabel: 'Koleksiyon',
      notEvaluated: 'Değerlendirilmedi',
      insufficientData: 'Yetersiz veri',
      crossContextTitle: 'Farklı dil veya kategori notu',
      crossContextNotice:
        'Bu adlar farklı kategorilere veya dillere aittir ({details}). Doğrudan puan karşılaştırmalarının yapısal sınırları vardır.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Yüksek Uyum',
        compatible: 'Uyumlu',
        'alternative-style': 'Alternatif Stil',
        'limited-resources': 'Sınırlı Dil Kaynakları',
        'requires-review': 'İnceleme Gerektirir',
        'not-evaluated': 'Değerlendirilmedi',
      },
      heading: 'Dil ve Oluşturucu Uyumluluğu',
      generalIntro:
        'Seçilen dil; üretilen adların stilini, yapısını, sesini ve kültürel karakterini etkiler. Bazı oluşturucular belirli dil kurallarına dayanır; uyumlu bir dil seçmek daha tutarlı sonuçlar verirken diğer diller alternatif yaratıcı yorumlar sunar.',
      statusPrefix: 'Seçili dil uyumu',
      generatorLabel: 'Oluşturucu',
      categoryLabel: 'Kategori',
      suitableLanguagesLabel: 'Özellikle uygun diller',
      otherSupportedLabel: 'Desteklenen diğer diller',
      recommendedLanguageLabel: 'Önerilen dil',
      noSingleRecommendation: 'Tek bir zorunlu dil yok — hedef kitleye veya yaratıcı tarza göre seçin.',
      whyFitLabel: 'Neden bazı diller bu stile daha uygundur',
      limitationsLabel: 'Bilinen dil sınırlamaları',
      culturalNotesLabel: 'Kültürel ve tematik notlar',
      exampleLabel: 'Bağlamsal örnek',
      whyTitle: 'Dil neden önemlidir?',
      whyPoints: [
        { title: 'Yapı ve ses etkisi', body: 'Dil; alfabe, hece ritmi, ekler ve uzunluk dengesini belirler.' },
        { title: 'Oluşturucuya özgü gelenekler', body: 'Anime veya belgelenmiş ad oluşturucular belirli sözlüklere dayanır.' },
        { title: 'Estetik değişimi', body: 'Arapça veya Japonca seçimi fonetik aktarım veya yazı uyarlaması ile farklı bir tarz üretir.' },
        { title: 'Yaratıcı öneriler vs. geleneksel adlar', body: 'Doğrulanmış kaynak listeleri dışında sonuçlar geleneksel ad değil yaratıcı öneridir.' },
      ],
      footerNotice:
        'NameForge oluşturucuları adlandırma stillerini seçilen dile uyarlar. Bazı oluşturucular belirli dilsel ve kültürel geleneklere daha yakındır. Uyumlu bir dil tutarlılığı artırır; diğer diller alternatif stiller oluşturur.',
      indicatorDescriptions: {
        'highly-compatible': 'Bu birleşim için özel kelime havuzları veya doğrulanmış kaynaklar mevcuttur.',
        compatible: 'Oluşturucu kuralları tema kimliğini koruyarak bu dille uyumlu çalışır.',
        'alternative-style': 'Fonetik aktarım veya alternatif stil katmanı kullanır.',
        'limited-resources': 'Sınırlı yerel dil kaynağı nedeniyle deneysel uyarlama üretir.',
        'requires-review': 'Doğrulanmış yerel kaynak yok veya insan incelemesi gerekiyor.',
        'not-evaluated': 'Bu kombinasyon henüz değerlendirilmedi.',
      },
      domainSummary: {
        anime: 'Japonca esinli anime köklerine dayanır; Japonca (katakana) ve romaji anime havasını korur.',
        attested: 'Belgelenmiş Latin ve Arapça ad listelerini kullanır; kaynağı olmayan yazılarda ad uydurmaz.',
        phraseBank: '28 dilde yerelleştirilmiş ifade bankalarını kullanır.',
        desert: 'Çöl ve Doğu temalarını Arapça aktarım veya klasik Latince ile buluşturur.',
        nordic: 'İskandinav ve Cermen kökleriyle Nordik, İskandinav dilleri ve İngilizce ile uyumludur.',
        medieval: 'Şövalyelik ve mitoloji köklerini çeşitli Avrupa dillerinde esnekçe işler.',
        business: 'Hedef pazar ve telaffuz netliğine odaklanır.',
        tech: 'Teknik heceler ve Cyber & Tech terimleri üretir.',
        creative: 'Anlatı köklerini desteklenen dillerde esnek biçimde uyarlar.',
      },
    },
  }),
  ja: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'コレクション・保存済みと比較',
      sourceFilterAll: 'すべて',
      sourceGenerated: '生成済み',
      sourceSaved: '保存済み',
      sourceCollection: 'コレクション',
      searchPlaceholder: '生成済み・保存済み・コレクション名を検索…',
      allCollectionsFilter: 'すべてのコレクション',
      unassignedCollection: '未分類',
      selectedCounter: '{count} / {max} 件選択',
      clearSelection: '選択をクリア',
      maxSelectedHint: '最大4件まで比較できます。追加するには1件解除してください。',
      noCandidatesFound: '条件に一致する名前が見つかりません。',
      copyComparison: '比較をコピー',
      comparisonCopied: '比較結果をコピーしました',
      languageMetaLabel: '言語',
      categoryMetaLabel: 'カテゴリ',
      collectionMetaLabel: 'コレクション',
      notEvaluated: '未評価',
      insufficientData: 'データ不足',
      crossContextTitle: '異なる言語・カテゴリの比較に関する注意',
      crossContextNotice:
        '選択された名前には異なるカテゴリまたは言語が含まれています（{details}）。直接のスコア比較には構造上の制約があるため、各名前の文脈を踏まえて判断してください。',
    },
    compatibility: {
      indicators: {
        'highly-compatible': '高い互換性',
        compatible: '互換性あり',
        'alternative-style': '代替スタイル',
        'limited-resources': '言語リソース限定',
        'requires-review': '確認が必要',
        'not-evaluated': '未評価',
      },
      heading: '言語とジェネレーターの互換性',
      generalIntro:
        '選択した言語は、生成される名前のスタイル・構造・響き・文化的特徴に影響します。特定の言語的慣習に沿ったジェネレーターでは、相性の良い言語を選ぶと一貫性が高まり、他の言語を選ぶと独自の創作スタイルが生まれます。',
      statusPrefix: '選択中の言語の適合度',
      generatorLabel: 'ジェネレーター',
      categoryLabel: 'カテゴリ',
      suitableLanguagesLabel: '特に適した言語',
      otherSupportedLabel: 'その他の対応言語',
      recommendedLanguageLabel: '推奨言語',
      noSingleRecommendation: '単一の推奨言語はありません。対象市場や世界観に合わせてお選びください。',
      whyFitLabel: '特定の言語がこのスタイルに合う理由',
      limitationsLabel: '既知の言語的制約',
      culturalNotesLabel: '文化的・テーマ上の配慮',
      exampleLabel: 'このジェネレーターの例',
      whyTitle: 'なぜ言語選択が重要なのか？',
      whyPoints: [
        { title: '構造と響きへの影響', body: '文字体系・音節・リズム・接辞の組み立ては選択言語によって変わります。' },
        { title: 'テーマ固有の慣習', body: 'アニメ系や実在名簿系などは特定の語彙や文化的リズムを前提にしています。' },
        { title: '言語変更による雰囲気の変化', body: '日本語やアラビア語では音訳・文字適応が働き、独自の美意識が生まれます。' },
        { title: '創作表現と伝統的な実在名', body: '検証済み名簿以外の出力は創作案であり、伝統的な実在名として自動保証されるものではありません。' },
      ],
      footerNotice:
        'NameForgeのジェネレーターは選択した言語に合わせて命名スタイルを調整します。特定の言語的・文化的慣習に近いカテゴリもあり、適合する言語を選ぶと一貫性が増し、別の言語では代替的な創作スタイルが生まれます。',
      indicatorDescriptions: {
        'highly-compatible': '専用の語彙・フレーズ集または検証済みデータがこの組み合わせに対応しています。',
        compatible: 'テーマの特性を保ちながら、この言語の規則と一貫して機能します。',
        'alternative-style': '音訳やスタイル適用により、標準的な慣習とは異なる雰囲気を生成します。',
        'limited-resources': '対象文字向けの限定的な創作適応であり、出力は実験的です。',
        'requires-review': '検証済みネイティブ資料が不足しているか、人手による確認が必要です。',
        'not-evaluated': 'この組み合わせの互換性はまだ評価されていません。',
      },
      domainSummary: {
        anime: '日本語風のアニメ語根と響きを基盤とし、日本語カタカナやローマ字が世界観を保ちます。',
        attested: '欧州・ラテン系およびアラビア語の検証済み人名データを使用し、未収録文字の捏造を防ぎます。',
        phraseBank: '28言語に対応した厳選フレーズバンクを使用しています。',
        desert: '砂漠や古代オリエントのモチーフに、アラビア語音訳やラテン語が調和します。',
        nordic: '北欧・ゲルマン系の語根を持ち、ノルド語風や北欧諸語と相性が良好です。',
        medieval: '騎士道や神話的な語根を欧州各言語・ラテン語で柔軟に表現します。',
        business: '対象市場と発音のしやすさに応じて最適なブランド言語を選べます。',
        tech: '技術語根やCyber & Techの新造語を組み合わせます。',
        creative: '物語の語根を対応言語へ柔軟に適応させます。',
      },
    },
  }),
  ko: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: '내 컬렉션 및 저장 목록과 비교',
      sourceFilterAll: '전체 출처',
      sourceGenerated: '생성됨',
      sourceSaved: '저장됨',
      sourceCollection: '컬렉션',
      searchPlaceholder: '생성·저장·컬렉션 이름 검색…',
      allCollectionsFilter: '모든 컬렉션',
      unassignedCollection: '컬렉션 없음',
      selectedCounter: '{count} / {max} 선택됨',
      clearSelection: '선택 지우기',
      maxSelectedHint: '최대 4개까지 비교할 수 있습니다. 다른 이름을 넣으려면 하나를 해제하세요.',
      noCandidatesFound: '일치하는 이름이 없습니다.',
      copyComparison: '비교 복사',
      comparisonCopied: '비교가 복사됨',
      languageMetaLabel: '언어',
      categoryMetaLabel: '카테고리',
      collectionMetaLabel: '컬렉션',
      notEvaluated: '평가되지 않음',
      insufficientData: '데이터 부족',
      crossContextTitle: '다른 언어/카테고리 비교 안내',
      crossContextNotice:
        '선택된 이름들은 서로 다른 카테고리 또는 언어에 속합니다({details}). 직접 점수 비교에는 구조적 한계가 있으므로 각 맥락 안에서 판단하세요.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': '매우 적합',
        compatible: '호환됨',
        'alternative-style': '대체 스타일',
        'limited-resources': '제한된 언어 리소스',
        'requires-review': '검토 필요',
        'not-evaluated': '평가되지 않음',
      },
      heading: '언어 및 생성기 호환성',
      generalIntro:
        '선택한 언어는 생성된 이름의 스타일, 구조, 음운, 문화적 특성에 영향을 미칩니다. 특정 언어 관습을 따르는 생성기는 어울리는 언어를 고를수록 일관성이 높아지며, 다른 언어는 새로운 창작 해석을 제공합니다.',
      statusPrefix: '현재 언어 적합도',
      generatorLabel: '생성기',
      categoryLabel: '카테고리',
      suitableLanguagesLabel: '특히 적합한 언어',
      otherSupportedLabel: '기타 지원 언어',
      recommendedLanguageLabel: '권장 언어',
      noSingleRecommendation: '단일 권장 언어가 고정되어 있지 않습니다 — 목표 시장이나 분위기에 맞춰 선택하세요.',
      whyFitLabel: '특정 언어가 이 스타일에 맞는 이유',
      limitationsLabel: '알려진 언어적 한계',
      culturalNotesLabel: '문화적·주제적 고려 사항',
      exampleLabel: '생성기별 예시',
      whyTitle: '언어 선택이 왜 중요한가요?',
      whyPoints: [
        { title: '구조와 어감 변화', body: '문자와 음절 구조, 접두사/접미사, 길이 감각이 언어에 따라 달라집니다.' },
        { title: '생성기 고유의 관습', body: '애니메이션·역사·검증 인명 생성기는 특정 어휘 체계에 크게 의존합니다.' },
        { title: '분위기 전환', body: '아랍어나 일본어를 선택하면 음차 또는 문자 적응을 거쳐 색다른 미감이 생성됩니다.' },
        { title: '창작 제안 vs. 전통 이름', body: '검증된 목록이 아닌 경우 생성 결과는 창작 제안이며 자동으로 실제 전통 이름이 되지 않습니다.' },
      ],
      footerNotice:
        'NameForge 생성기는 선택한 언어에 맞춰 작명 스타일을 조정합니다. 일부 생성기는 특정 언어·문화 관습에 더 밀접하며, 호환되는 언어를 선택하면 일관된 결과를 얻고 다른 언어에서는 대안 스타일을 만들 수 있습니다.',
      indicatorDescriptions: {
        'highly-compatible': '전용 어휘 풀이나 검증된 목록이 이 조합을 직접 지원합니다.',
        compatible: '주제 스타일을 유지하면서 해당 언어 규칙과 조화롭게 동작합니다.',
        'alternative-style': '음성 음차 또는 스타일 변환을 적용해 다른 미학을 제공합니다.',
        'limited-resources': '현지 언어 데이터가 제한되어 실험적 문자 적응을 사용합니다.',
        'requires-review': '검증된 원어 자료가 없거나 사람의 검토가 필요합니다.',
        'not-evaluated': '이 조합의 호환성은 아직 평가되지 않았습니다.',
      },
      domainSummary: {
        anime: '일본풍 애니메이션 어근에 기반하며 일본어(가타카나)와 로마자 표기가 특유의 정체성을 유지합니다.',
        attested: '검증된 라틴·유럽 및 아랍어 이름 데이터를 사용하며 자료가 없는 문자는 임의 생성하지 않습니다.',
        phraseBank: '28개 언어로 현지화된 문구 뱅크를 활용합니다.',
        desert: '사막·오리엔트 모티프로 아랍어 음차나 고전 라틴어와 잘 어울립니다.',
        nordic: '북유럽·게르만 어근을 바탕으로 노르딕 및 북유럽 언어와 조화를 이룹니다.',
        medieval: '기사·신화 어근을 유럽 언어와 라틴어 전반에서 유연하게 조합합니다.',
        business: '목표 시장과 브랜드 발음 편의에 맞춰 언어를 선택할 수 있습니다.',
        tech: '기술 어근과 Cyber & Tech 신조어를 결합합니다.',
        creative: '지원 언어 전반에 걸쳐 서사 어근을 유연하게 적응시킵니다.',
      },
    },
  }),
  zh: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: '与“我的收藏与已保存”对比',
      sourceFilterAll: '全部来源',
      sourceGenerated: '已生成',
      sourceSaved: '已保存',
      sourceCollection: '收藏集',
      searchPlaceholder: '搜索生成名称、已保存或收藏集名称…',
      allCollectionsFilter: '全部收藏集',
      unassignedCollection: '未分组',
      selectedCounter: '已选 {count} / {max}',
      clearSelection: '清空选择',
      maxSelectedHint: '最多同时比较 4 个名称。请先取消勾选或移除一个再添加。',
      noCandidatesFound: '未找到符合筛选条件的名称。',
      copyComparison: '复制对比',
      comparisonCopied: '已复制对比结果',
      languageMetaLabel: '语言',
      categoryMetaLabel: '分类',
      collectionMetaLabel: '收藏集',
      notEvaluated: '未评估',
      insufficientData: '数据不足',
      crossContextTitle: '跨语言 / 跨分类对比提示',
      crossContextNotice:
        '这些名称来自不同的分类或语言（{details}）。直接横向对比分数存在结构性限制，建议结合各自语境综合评估。',
    },
    compatibility: {
      indicators: {
        'highly-compatible': '高度兼容',
        compatible: '兼容',
        'alternative-style': '替代风格',
        'limited-resources': '语言资源有限',
        'requires-review': '需要复核',
        'not-evaluated': '未评估',
      },
      heading: '语言与生成器兼容性',
      generalIntro:
        '所选语言会影响生成名称的风格、结构、音韵及文化特征。部分生成器围绕特定语言习惯设计，选择契合主题的语言能获得更连贯可辨的结果，而其他语言则能带来别具一格的创意诠释。',
      statusPrefix: '当前语言匹配度',
      generatorLabel: '生成器',
      categoryLabel: '分类',
      suitableLanguagesLabel: '特别适合的语言',
      otherSupportedLabel: '其他支持语言',
      recommendedLanguageLabel: '推荐语言',
      noSingleRecommendation: '无单一强制推荐语言 — 请根据目标市场或审美风格选择。',
      whyFitLabel: '为何某些语言更契合该风格',
      limitationsLabel: '已知语言限制',
      culturalNotesLabel: '文化与主题说明',
      exampleLabel: '该生成器示例',
      whyTitle: '为什么语言选择很重要？',
      whyPoints: [
        { title: '影响文字与音节结构', body: '语言决定了书写文字、音节划分、音韵节奏、前后缀及名称长度。' },
        { title: '特定生成器的语言惯例', body: '动漫、历史或实证人名库类生成器依赖与特定文化相契合的词库。' },
        { title: '切换语言带来的风格转变', body: '例如选择阿拉伯语或日语会启用音译或文字适配，形成截然不同的美感。' },
        { title: '创意建议 vs. 传统真实人名', body: '除非明确来自已验证名单，否则生成结果属于创意草案，不自动等同于传统真实人名。' },
      ],
      footerNotice:
        'NameForge 生成器会根据所选语言调整命名风格。部分生成器更贴合特定的语言与文化传统；选择兼容语言有助于产出更连贯的结果，其他语言则会呈现替代性的创意风格。',
      indicatorDescriptions: {
        'highly-compatible': '该组合拥有专用词库、语料库或经核验的人名列表支持。',
        compatible: '生成器规则能与该语言协调运作并保持主题风格。',
        'alternative-style': '采用音译或风格覆盖，呈现不同于传统习惯的审美风格。',
        'limited-resources': '受限于该分类的本地语言资源，结果为受控实验性文字适配。',
        'requires-review': '尚无经核验的原生资料，或需人工语言审核。',
        'not-evaluated': '该语言与生成器组合尚未评估兼容性。',
      },
      domainSummary: {
        anime: '围绕日式动漫语素构建；日语（片假名）与罗马音能保留熟悉的动漫命名特征。',
        attested: '源自欧洲/拉丁及阿拉伯语核验人名库，不会为缺少语料的文字编造真实姓名。',
        phraseBank: '由覆盖全部 28 种支持语言的本地化短语库驱动。',
        desert: '融合沙漠与古近东意象，阿拉伯语音译或古典拉丁语与之高度协调。',
        nordic: '立足北欧与日耳曼词根，契合北欧符文、斯堪的纳维亚语言及英语。',
        medieval: '将骑士与神话词根灵活运用于多门欧洲语言与拉丁语。',
        business: '注重品牌可读性、发音与目标市场适配。',
        tech: '融合技术词根与 Cyber & Tech 新造词。',
        creative: '在各类支持语言间灵活适配叙事词根。',
      },
    },
  }),
  ru: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Сравнить с «Коллекции и сохранённые»',
      sourceFilterAll: 'Все источники',
      sourceGenerated: 'Сгенерировано',
      sourceSaved: 'Сохранено',
      sourceCollection: 'Коллекция',
      searchPlaceholder: 'Поиск среди сгенерированных, сохранённых и коллекций…',
      allCollectionsFilter: 'Все коллекции',
      unassignedCollection: 'Без коллекции',
      selectedCounter: 'Выбрано {count} из {max}',
      clearSelection: 'Сбросить выбор',
      maxSelectedHint: 'Максимум 4 имени. Уберите одно, чтобы добавить другое.',
      noCandidatesFound: 'Подходящих имён не найдено.',
      copyComparison: 'Копировать сравнение',
      comparisonCopied: 'Сравнение скопировано',
      languageMetaLabel: 'Язык',
      categoryMetaLabel: 'Категория',
      collectionMetaLabel: 'Коллекция',
      notEvaluated: 'Не оценено',
      insufficientData: 'Недостаточно данных',
      crossContextTitle: 'Примечание о разных языках и категориях',
      crossContextNotice:
        'Выбранные имена относятся к разным категориям или языкам ({details}). Прямое сравнение баллов ограничено — оценивайте каждое имя в его контексте.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Высокая совместимость',
        compatible: 'Совместимо',
        'alternative-style': 'Альтернативный стиль',
        'limited-resources': 'Ограниченные языковые ресурсы',
        'requires-review': 'Требуется проверка',
        'not-evaluated': 'Не оценено',
      },
      heading: 'Совместимость языка и генератора',
      generalIntro:
        'Выбранный язык влияет на стиль, структуру, звучание и культурный облик имён. Некоторые генераторы опираются на определённые языковые традиции: совместимый язык даёт более цельные результаты, тогда как другие языки создают альтернативные творческие вариации.',
      statusPrefix: 'Соответствие выбранному языку',
      generatorLabel: 'Генератор',
      categoryLabel: 'Категория',
      suitableLanguagesLabel: 'Наиболее подходящие языки',
      otherSupportedLabel: 'Другие поддерживаемые языки',
      recommendedLanguageLabel: 'Рекомендуемый язык',
      noSingleRecommendation: 'Единственного обязательного языка нет — выбирайте по аудитории, рынку или атмосфере.',
      whyFitLabel: 'Почему некоторые языки лучше подходят',
      limitationsLabel: 'Известные языковые ограничения',
      culturalNotesLabel: 'Культурные и тематические заметки',
      exampleLabel: 'Пример для этого генератора',
      whyTitle: 'Почему выбор языка важен?',
      whyPoints: [
        { title: 'Влияние на форму и звук', body: 'Язык определяет письменность, ритм слогов, аффиксы и длину.' },
        { title: 'Традиции отдельных генераторов', body: 'Аниме- и исторические генераторы используют тематические лексиконы.' },
        { title: 'Смена эстетики', body: 'Арабский или японский включают фонетическую транслитерацию или адаптацию графики.' },
        { title: 'Творческие формы и реальные имена', body: 'За пределами проверенных каталогов результаты являются творческими идеями, а не традиционными именами.' },
      ],
      footerNotice:
        'Генераторы NameForge адаптируют стиль к выбранному языку. Некоторые категории теснее связаны с конкретными языковыми и культурными традициями: совместимый язык повышает связность, а другие создают альтернативный стиль.',
      indicatorDescriptions: {
        'highly-compatible': 'Для этой пары доступны специализированные словари или проверенные списки.',
        compatible: 'Правила генератора согласованы с этим языком и сохраняют тему.',
        'alternative-style': 'Используется транслитерация или стилистическое наложение с иной эстетикой.',
        'limited-resources': 'Экспериментальная адаптация из-за ограниченных языковых ресурсов.',
        'requires-review': 'Нет проверенного каталога или нужна ручная языковая проверка.',
        'not-evaluated': 'Совместимость для этой пары пока не оценивалась.',
      },
      domainSummary: {
        anime: 'Основан на японских аниме-морфемах; японская катакана и ромадзи сохраняют узнаваемый стиль.',
        attested: 'Использует проверенные европейские/латинские и арабские списки и не выдумывает реальных имён.',
        phraseBank: 'Опирается на локализованные банки фраз для всех 28 языков.',
        desert: 'Образы пустыни и Востока гармонично сочетаются с арабской транслитерацией и классической латынью.',
        nordic: 'Скандинавские и германские корни идеально сочетаются со скандинавскими языками и английским.',
        medieval: 'Рыцарские и мифологические корни гибко адаптируются в европейских языках и латыни.',
        business: 'Выбор языка зависит от целевого рынка, произношения и позиционирования бренда.',
        tech: 'Сочетает технические корни и неологизмы Cyber & Tech.',
        creative: 'Гибко адаптирует сюжетные корни к поддерживаемым языкам.',
      },
    },
  }),
  hi: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'मेरे संग्रह और सहेजे गए नामों से तुलना करें',
      sourceFilterAll: 'सभी स्रोत',
      sourceGenerated: 'निर्मित',
      sourceSaved: 'सहेजा गया',
      sourceCollection: 'संग्रह',
      searchPlaceholder: 'निर्मित, सहेजे गए या संग्रह नाम खोजें…',
      allCollectionsFilter: 'सभी संग्रह',
      unassignedCollection: 'बिना संग्रह',
      selectedCounter: '{count} / {max} चयनित',
      clearSelection: 'चयन साफ़ करें',
      maxSelectedHint: 'अधिकतम 4 नाम चुने गए हैं। दूसरा जोड़ने के लिए एक हटाएँ।',
      noCandidatesFound: 'कोई मेल खाने वाला नाम नहीं मिला।',
      copyComparison: 'तुलना कॉपी करें',
      comparisonCopied: 'तुलना कॉपी हुई',
      languageMetaLabel: 'भाषा',
      categoryMetaLabel: 'श्रेणी',
      collectionMetaLabel: 'संग्रह',
      notEvaluated: 'मूल्यांकित नहीं',
      insufficientData: 'अपर्याप्त डेटा',
      crossContextTitle: 'अलग-अलग भाषा या श्रेणी पर टिप्पणी',
      crossContextNotice:
        'ये नाम विभिन्न श्रेणियों या भाषाओं से हैं ({details})। सीधे स्कोर की तुलना सीमित होती है, अतः प्रत्येक नाम को उसके संदर्भ में देखें।',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'अत्यधिक उपयुक्त',
        compatible: 'उपयुक्त',
        'alternative-style': 'वैकल्पिक शैली',
        'limited-resources': 'सीमित भाषायी संसाधन',
        'requires-review': 'समीक्षा आवश्यक',
        'not-evaluated': 'मूल्यांकित नहीं',
      },
      heading: 'भाषा और जनरेटर अनुकूलता',
      generalIntro:
        'चुनी गई भाषा नामों की शैली, संरचना, ध्वनि और सांस्कृतिक चरित्र को प्रभावित करती है। कुछ जनरेटर विशेष भाषायी परंपराओं पर आधारित हैं; उपयुक्त भाषा अधिक सुसंगत परिणाम देती है, जबकि अन्य भाषाएँ रचनात्मक विकल्प रचती हैं।',
      statusPrefix: 'वर्तमान भाषा उपयुक्तता',
      generatorLabel: 'जनरेटर',
      categoryLabel: 'श्रेणी',
      suitableLanguagesLabel: 'विशेष रूप से उपयुक्त भाषाएँ',
      otherSupportedLabel: 'अन्य समर्थित भाषाएँ',
      recommendedLanguageLabel: 'अनुशंसित भाषा',
      noSingleRecommendation: 'कोई एक अनिवार्य भाषा नहीं — अपने लक्षित बाजार या शैली के अनुसार चुनें।',
      whyFitLabel: 'कुछ भाषाएँ इस शैली के अनुकूल क्यों हैं',
      limitationsLabel: 'ज्ञात भाषायी सीमाएँ',
      culturalNotesLabel: 'सांस्कृतिक और विषयगत विचार',
      exampleLabel: 'संदर्भित उदाहरण',
      whyTitle: 'भाषा का चयन क्यों मायने रखता है?',
      whyPoints: [
        { title: 'संरचना और ध्वनि पर प्रभाव', body: 'भाषा लिपि, शब्दांश लय, उपसर्ग और लंबाई तय करती है।' },
        { title: 'जनरेटर की परंपराएँ', body: 'एनीमे या प्रमाणित नाम जनरेटर विशिष्ट शब्द-कोशों पर निर्भर करते हैं।' },
        { title: 'शैली में परिवर्तन', body: 'अरबी या जापानी चुनने पर लिप्यंतरण या लिपि-रूपांतरण अलग आभा देता है।' },
        { title: 'रचनात्मक बनाम पारंपरिक नाम', body: 'प्रमाणित सूची के बाहर के नाम रचनात्मक सुझाव हैं, स्वतः पारंपरिक नाम नहीं।' },
      ],
      footerNotice:
        'NameForge जनरेटर चुनी गई भाषा के अनुसार अपनी शैली ढालते हैं। कुछ जनरेटर विशिष्ट भाषायी व सांस्कृतिक परंपराओं से जुड़े हैं। उपयुक्त भाषा सुसंगत परिणाम देती है, जबकि अन्य विकल्प वैकल्पिक रचनात्मक शैलियाँ बनाते हैं।',
      indicatorDescriptions: {
        'highly-compatible': 'इस जोड़ी के लिए समर्पित शब्दावली या प्रमाणित सूची उपलब्ध है।',
        compatible: 'जनरेटर नियम विषयगत पहचान बनाए रखते हुए इस भाषा में सुसंगत हैं।',
        'alternative-style': 'ध्वन्यात्मक लिप्यंतरण से अलग सौंदर्य-बोध बनता है।',
        'limited-resources': 'सीमित मूल डेटा के कारण नियंत्रित प्रयोगात्मक लिपि-रूपांतरण।',
        'requires-review': 'सत्यापित मूल सूची उपलब्ध नहीं या मानवीय जाँच आवश्यक है।',
        'not-evaluated': 'इस संयोजन का अभी मूल्यांकन नहीं हुआ है।',
      },
      domainSummary: {
        anime: 'जापानी-प्रेरित एनीमे मूल शब्दों पर आधारित; जापानी काताकाना और रोमाजी पहचान बनाए रखते हैं।',
        attested: 'प्रमाणित यूरोपीय/लैटिन और अरबी नामों का उपयोग करता है, अनिश्चित लिपियों में नकली नाम नहीं गढ़ता।',
        phraseBank: 'सभी 28 भाषाओं में स्थानीयकृत वाक्यांश संग्रह द्वारा संचालित।',
        desert: 'रेगिस्तानी और प्राच्य रूपांकनों में अरबी लिप्यंतरण या शास्त्रीय लैटिन स्वाभाविक जँचते हैं।',
        nordic: 'नॉर्डिक और जर्मेनिक मूल नॉर्डिक मोड व यूरोपीय भाषाओं के साथ सटीक बैठते हैं।',
        medieval: 'शूरवीर व पौराणिक शब्द-जड़ें कई यूरोपीय भाषाओं और लैटिन में ढलती हैं।',
        business: 'लक्षित बाज़ार और उच्चारण स्पष्टता के अनुसार भाषा चुनें।',
        tech: 'तकनीकी शब्दांश और Cyber & Tech शब्द गढ़ता है।',
        creative: 'समर्थित भाषाओं में कथात्मक मूल शब्दों को लचीले ढंग से ढालता है।',
      },
    },
  }),
  nl: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Vergelijken met Collecties & Opgeslagen',
      sourceFilterAll: 'Alle bronnen',
      sourceGenerated: 'Gegenereerd',
      sourceSaved: 'Opgeslagen',
      sourceCollection: 'Collectie',
      searchPlaceholder: 'Zoek gegenereerde, opgeslagen of collectienamen…',
      allCollectionsFilter: 'Alle collecties',
      unassignedCollection: 'Zonder collectie',
      selectedCounter: '{count} / {max} geselecteerd',
      clearSelection: 'Selectie wissen',
      maxSelectedHint: 'Maximaal 4 namen geselecteerd. Verwijder er een om toe te voegen.',
      noCandidatesFound: 'Geen overeenkomende namen gevonden.',
      copyComparison: 'Vergelijking kopiëren',
      comparisonCopied: 'Vergelijking gekopieerd',
      languageMetaLabel: 'Taal',
      categoryMetaLabel: 'Categorie',
      collectionMetaLabel: 'Collectie',
      notEvaluated: 'Niet beoordeeld',
      insufficientData: 'Onvoldoende gegevens',
      crossContextTitle: 'Opmerking over verschillende talen of categorieën',
      crossContextNotice:
        'Deze namen behoren tot verschillende categorieën of talen ({details}). Directe scorevergelijkingen hebben beperkingen en moeten in hun eigen context worden bekeken.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Zeer geschikt',
        compatible: 'Compatibel',
        'alternative-style': 'Alternatieve stijl',
        'limited-resources': 'Beperkte taalbronnen',
        'requires-review': 'Beoordeling vereist',
        'not-evaluated': 'Niet beoordeeld',
      },
      heading: 'Taal- en generatorcompatibiliteit',
      generalIntro:
        'De gekozen taal beïnvloedt stijl, structuur, klank en culturele kenmerken van namen. Sommige generators volgen specifieke taalconventies; een passende taal geeft samenhangender resultaten, terwijl andere talen alternatieve creatieve stijlen bieden.',
      statusPrefix: 'Geschiktheid gekozen taal',
      generatorLabel: 'Generator',
      categoryLabel: 'Categorie',
      suitableLanguagesLabel: 'Bijzonder geschikte talen',
      otherSupportedLabel: 'Overige ondersteunde talen',
      recommendedLanguageLabel: 'Aanbevolen taal',
      noSingleRecommendation: 'Geen vaste voorkeurstaal — kies op basis van doelmarkt of gewenste esthetiek.',
      whyFitLabel: 'Waarom bepaalde talen beter passen',
      limitationsLabel: 'Bekende taalbeperkingen',
      culturalNotesLabel: 'Culturele & thematische aandachtspunten',
      exampleLabel: 'Voorbeeld voor deze generator',
      whyTitle: 'Waarom is taal belangrijk?',
      whyPoints: [
        { title: 'Invloed op klank & vorm', body: 'Taal bepaalt schrift, lettergrepen, ritme en woordopbouw.' },
        { title: 'Generatorspecifieke tradities', body: 'Anime- of echte-namengenerators steunen op gerichte bronbestanden.' },
        { title: 'Stijlverschuiving', body: 'Arabisch of Japans gebruikt transliteratie of schriftaanpassing voor een eigen sfeer.' },
        { title: 'Creatief vs. traditioneel', body: 'Zonder geverifieerde namenlijst zijn uitkomsten creatieve voorstellen, geen gegarandeerde traditionele namen.' },
      ],
      footerNotice:
        'NameForge-generators passen hun stijl aan op de gekozen taal. Sommige sluiten nauwer aan bij specifieke taal- en cultuurconventies. Een compatibele taal geeft meer samenhang; andere keuzes bieden alternatieve creatieve stijlen.',
      indicatorDescriptions: {
        'highly-compatible': 'Toegewijde woordenschat of geverifieerde lijsten ondersteunen deze combinatie direct.',
        compatible: 'Generatorregels sluiten samenhangend aan bij deze taal.',
        'alternative-style': 'Past fonetische transliteratie of een eigen stijlaccent toe.',
        'limited-resources': 'Experimentele aanpassing door beperkte brondata.',
        'requires-review': 'Geen geverifieerd lokaal bestand of menselijke controle vereist.',
        'not-evaluated': 'Nog niet beoordeeld voor deze combinatie.',
      },
      domainSummary: {
        anime: 'Gebaseerd op Japans geïnspireerde wortels; Japans (katakana) en romaji behouden herkenbare animestijl.',
        attested: 'Gebruikt gedocumenteerde Europese en Arabische lijsten zonder ontbrekende echte namen te verzinnen.',
        phraseBank: 'Gebaseerd op meertalige uitdrukkingen in alle 28 talen.',
        desert: 'Woestijn- en Oosterse motieven passen mooi bij Arabische transliteratie of klassiek Latijn.',
        nordic: 'Oudnoorse en Germaanse stammen voor Noordse talen, Duits en Engels.',
        medieval: 'Ridderlijke en mythische wortels die flexibel werken in Europese talen en Latijn.',
        business: 'Afgestemd op doelmarkt, uitspraak en merkhelderheid.',
        tech: 'Combineert technische stammen en Cyber & Tech-neologismen.',
        creative: 'Past verhalende wortels flexibel aan in ondersteunde talen.',
      },
    },
  }),
  pl: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Porównaj z Moimi kolekcjami i zapisanymi',
      sourceFilterAll: 'Wszystkie źródła',
      sourceGenerated: 'Wygenerowano',
      sourceSaved: 'Zapisano',
      sourceCollection: 'Kolekcja',
      searchPlaceholder: 'Szukaj nazw wygenerowanych, zapisanych lub w kolekcjach…',
      allCollectionsFilter: 'Wszystkie kolekcje',
      unassignedCollection: 'Bez kolekcji',
      selectedCounter: 'Wybrano {count} / {max}',
      clearSelection: 'Wyczyść wybór',
      maxSelectedHint: 'Wybrano maksymalnie 4 nazwy. Usuń jedną, aby dodać kolejną.',
      noCandidatesFound: 'Nie znaleziono pasujących nazw.',
      copyComparison: 'Kopiuj porównanie',
      comparisonCopied: 'Skopiowano porównanie',
      languageMetaLabel: 'Język',
      categoryMetaLabel: 'Kategoria',
      collectionMetaLabel: 'Kolekcja',
      notEvaluated: 'Nie oceniono',
      insufficientData: 'Brak wystarczających danych',
      crossContextTitle: 'Uwaga o różnych językach lub kategoriach',
      crossContextNotice:
        'Nazwy pochodzą z różnych kategorii lub języków ({details}). Bezpośrednie porównanie ma ograniczenia i należy je oceniać we właściwym kontekście.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Wysoka zgodność',
        compatible: 'Zgodny',
        'alternative-style': 'Styl alternatywny',
        'limited-resources': 'Ograniczone zasoby językowe',
        'requires-review': 'Wymaga weryfikacji',
        'not-evaluated': 'Nie oceniono',
      },
      heading: 'Zgodność języka i generatora',
      generalIntro:
        'Wybrany język wpływa na styl, budowę, brzmienie i charakter kulturowy nazw. Niektóre generatory opierają się na konkretnych konwencjach — spójny język daje bardziej naturalne efekty, a inne języki tworzą alternatywne interpretacje.',
      statusPrefix: 'Dopasowanie wybranego języka',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategoria',
      suitableLanguagesLabel: 'Szczególnie odpowiednie języki',
      otherSupportedLabel: 'Inne obsługiwane języki',
      recommendedLanguageLabel: 'Zalecany język',
      noSingleRecommendation: 'Brak jednego narzuconego języka — wybierz zgodnie z rynkiem docelowym lub estetyką.',
      whyFitLabel: 'Dlaczego wybrane języki pasują do stylu',
      limitationsLabel: 'Znane ograniczenia językowe',
      culturalNotesLabel: 'Uwagi kulturowe i tematyczne',
      exampleLabel: 'Przykład dla generatora',
      whyTitle: 'Dlaczego język ma znaczenie?',
      whyPoints: [
        { title: 'Wpływ na strukturę i brzmienie', body: 'Język określa pismo, rytm sylab, przedrostki i długość.' },
        { title: 'Konwencje tematyczne', body: 'Generatory anime lub imion korzystają z dedykowanych słowników.' },
        { title: 'Zmiana estetyki', body: 'Arabski lub japoński stosują transliterację lub adaptację pisma.' },
        { title: 'Propozycje twórcze a imiona tradycyjne', body: 'Poza zweryfikowanymi listami wyniki są propozycjami kreatywnymi.' },
      ],
      footerNotice:
        'Generatory NameForge dopasowują styl do wybranego języka. Niektóre są mocniej powiązane z określonymi konwencjami językowymi i kulturowymi. Zgodny język poprawia spójność, a inne wybory tworzą alternatywne style.',
      indicatorDescriptions: {
        'highly-compatible': 'Dedykowane słowniki lub zweryfikowane spisy wspierają tę parę.',
        compatible: 'Reguły generatora działają spójnie z tym językiem.',
        'alternative-style': 'Transliteracja fonetyczna lub stylizacja daje odmienny efekt.',
        'limited-resources': 'Eksperymentalna adaptacja przy ograniczonych zasobach rodzimych.',
        'requires-review': 'Brak zweryfikowanego rejestru lub wymagana ocena człowieka.',
        'not-evaluated': 'Zgodność dla tej pary nie została jeszcze oceniona.',
      },
      domainSummary: {
        anime: 'Oparte na morfemach anime; japońska katakana i romaji zachowują klimat gatunku.',
        attested: 'Korzysta ze sprawdzonych list europejskich i arabskich bez zmyślania imion.',
        phraseBank: 'Oparte na bankach wyrażeń dla wszystkich 28 języków.',
        desert: 'Motywy pustyni i Orientu harmonizują z arabską transliteracją i łaciną.',
        nordic: 'Korzenie nordyckie i germańskie idealne dla trybu nordyckiego i języków północy.',
        medieval: 'Rycerskie i mityczne rdzenie elastycznie działające w wielu językach.',
        business: 'Wybierz język zgodnie z rynkiem docelowym i łatwą wymową.',
        tech: 'Łączy rdzenie techniczne oraz neologizmy Cyber & Tech.',
        creative: 'Elastycznie dopasowuje rdzenie narracyjne w obsługiwanych językach.',
      },
    },
  }),
  sv: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Jämför med Mina samlingar & sparade',
      sourceFilterAll: 'Alla källor',
      sourceGenerated: 'Genererat',
      sourceSaved: 'Sparat',
      sourceCollection: 'Samling',
      searchPlaceholder: 'Sök genererade, sparade eller samlingsnamn…',
      allCollectionsFilter: 'Alla samlingar',
      unassignedCollection: 'Utan samling',
      selectedCounter: '{count} / {max} valda',
      clearSelection: 'Rensa val',
      maxSelectedHint: 'Högst 4 namn kan jämföras. Ta bort ett för att lägga till fler.',
      noCandidatesFound: 'Inga matchande namn hittades.',
      copyComparison: 'Kopiera jämförelse',
      comparisonCopied: 'Jämförelse kopierad',
      languageMetaLabel: 'Språk',
      categoryMetaLabel: 'Kategori',
      collectionMetaLabel: 'Samling',
      notEvaluated: 'Ej utvärderad',
      insufficientData: 'Otillräckliga data',
      crossContextTitle: 'Notering om olika språk eller kategorier',
      crossContextNotice:
        'Dessa namn kommer från olika kategorier eller språk ({details}). Direkta jämförelser har begränsningar och bör tolkas i respektive sammanhang.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Mycket kompatibel',
        compatible: 'Kompatibel',
        'alternative-style': 'Alternativ stil',
        'limited-resources': 'Begränsade språkresurser',
        'requires-review': 'Kräver granskning',
        'not-evaluated': 'Ej utvärderad',
      },
      heading: 'Språk- och generatorkompatibilitet',
      generalIntro:
        'Valt språk påverkar stil, struktur, klang och kulturella drag. Vissa generatorer bygger på särskilda språkliga konventioner där ett passande språk ger mer sammanhållna resultat medan andra språk skapar alternativa kreativa tolkningar.',
      statusPrefix: 'Aktuellt språkstöd',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategori',
      suitableLanguagesLabel: 'Särskilt lämpliga språk',
      otherSupportedLabel: 'Andra språk som stöds',
      recommendedLanguageLabel: 'Rekommenderat språk',
      noSingleRecommendation: 'Inget enskilt språk krävs — välj utifrån målgrupp, marknad eller känsla.',
      whyFitLabel: 'Varför vissa språk passar stilen',
      limitationsLabel: 'Kända språkliga begränsningar',
      culturalNotesLabel: 'Kulturella och tematiska hänsyn',
      exampleLabel: 'Exempel för denna generator',
      whyTitle: 'Varför spelar språket roll?',
      whyPoints: [
        { title: 'Form och ljudbild', body: 'Språk styr skriftsystem, stavelserytm, förled och längd.' },
        { title: 'Generatorns konventioner', body: 'Anime- eller bekräftade namnlistor bygger på riktade lexikon.' },
        { title: 'Förändrad estetik', body: 'Arabiska eller japanska använder translitterering eller skriftanpassning.' },
        { title: 'Kreativa vs. traditionella namn', body: 'Utanför verifierade listor är resultaten kreativa förslag.' },
      ],
      footerNotice:
        'NameForge-generatorer anpassar stilen till valt språk. Vissa följer specifika språkliga och kulturella konventioner. Ett kompatibelt språk ger mer enhetliga resultat; andra val skapar alternativa kreativa stilar.',
      indicatorDescriptions: {
        'highly-compatible': 'Särskilda ordförråd eller verifierade listor stöder kombinationen direkt.',
        compatible: 'Reglerna fungerar sammanhängande i det valda språket.',
        'alternative-style': 'Fonetisk translitterering eller stilöverlagring ger en annan estetik.',
        'limited-resources': 'Experimentell skriftanpassning med begränsad lokal språkrådata.',
        'requires-review': 'Ingen verifierad lista tillgänglig eller manuell granskning krävs.',
        'not-evaluated': 'Kombinationen har ännu inte utvärderats.',
      },
      domainSummary: {
        anime: 'Bygger på japanskt inspirerade morfem; japansk katakana och romaji bevarar animekänslan.',
        attested: 'Använder dokumenterade europeiska och arabiska listor utan att hitta på verkliga namn.',
        phraseBank: 'Drivs av lokaliserade frasbanker för alla 28 språk.',
        desert: 'Öken- och orientmotiv som harmonierar med arabisk translitterering eller klassisk latin.',
        nordic: 'Fornnordiska och germanska rötter som passar utmärkt för nordiska språk.',
        medieval: 'Riddar- och mytrötter som fungerar flexibelt över europeiska språk.',
        business: 'Anpassas efter målmarknad, uttal och varumärkesidentitet.',
        tech: 'Förenar tekniska rötter och Cyber & Tech-neologismer.',
        creative: 'Anpassar berättarrötter flexibelt mellan stödda språk.',
      },
    },
  }),
  vi: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'So sánh với Bộ sưu tập & Tên đã lưu',
      sourceFilterAll: 'Tất cả nguồn',
      sourceGenerated: 'Vừa tạo',
      sourceSaved: 'Đã lưu',
      sourceCollection: 'Bộ sưu tập',
      searchPlaceholder: 'Tìm tên vừa tạo, đã lưu hoặc trong bộ sưu tập…',
      allCollectionsFilter: 'Tất cả bộ sưu tập',
      unassignedCollection: 'Chưa phân nhóm',
      selectedCounter: 'Đã chọn {count} / {max}',
      clearSelection: 'Xóa lựa chọn',
      maxSelectedHint: 'Tối đa 4 tên. Hãy bỏ chọn một tên trước khi thêm tên mới.',
      noCandidatesFound: 'Không tìm thấy tên phù hợp.',
      copyComparison: 'Sao chép so sánh',
      comparisonCopied: 'Đã sao chép so sánh',
      languageMetaLabel: 'Ngôn ngữ',
      categoryMetaLabel: 'Danh mục',
      collectionMetaLabel: 'Bộ sưu tập',
      notEvaluated: 'Chưa đánh giá',
      insufficientData: 'Thiếu dữ liệu',
      crossContextTitle: 'Lưu ý khi so sánh khác ngôn ngữ / danh mục',
      crossContextNotice:
        'Các tên này thuộc những danh mục hoặc ngôn ngữ khác nhau ({details}). Việc so sánh điểm trực tiếp có giới hạn và cần xét theo ngữ cảnh riêng.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Tương thích cao',
        compatible: 'Tương thích',
        'alternative-style': 'Phong cách thay thế',
        'limited-resources': 'Tài nguyên ngôn ngữ hạn chế',
        'requires-review': 'Cần rà soát',
        'not-evaluated': 'Chưa đánh giá',
      },
      heading: 'Tương thích ngôn ngữ & trình tạo',
      generalIntro:
        'Ngôn ngữ đã chọn ảnh hưởng đến phong cách, cấu trúc, âm điệu và nét văn hóa của tên được tạo. Chọn ngôn ngữ phù hợp chủ đề giúp kết quả đồng nhất hơn, trong khi ngôn ngữ khác mở ra cách diễn giải sáng tạo thay thế.',
      statusPrefix: 'Mức độ phù hợp ngôn ngữ hiện tại',
      generatorLabel: 'Trình tạo',
      categoryLabel: 'Danh mục',
      suitableLanguagesLabel: 'Ngôn ngữ đặc biệt phù hợp',
      otherSupportedLabel: 'Ngôn ngữ hỗ trợ khác',
      recommendedLanguageLabel: 'Ngôn ngữ khuyên dùng',
      noSingleRecommendation: 'Không bắt buộc một ngôn ngữ duy nhất — hãy chọn theo thị trường hoặc phong cách mong muốn.',
      whyFitLabel: 'Vì sao một số ngôn ngữ phù hợp hơn',
      limitationsLabel: 'Giới hạn ngôn ngữ đã biết',
      culturalNotesLabel: 'Lưu ý văn hóa & chủ đề',
      exampleLabel: 'Ví dụ theo trình tạo',
      whyTitle: 'Tại sao ngôn ngữ lại quan trọng?',
      whyPoints: [
        { title: 'Ảnh hưởng cấu trúc và âm thanh', body: 'Ngôn ngữ quyết định hệ chữ, nhịp âm tiết, tiền tố/hậu tố và độ dài.' },
        { title: 'Quy ước riêng của từng trình tạo', body: 'Trình tạo anime hoặc tên thật dựa trên kho từ vựng gắn với truyền thống cụ thể.' },
        { title: 'Thay đổi sắc thái thẩm mỹ', body: 'Tiếng Ả Rập hoặc tiếng Nhật dùng phiên âm hoặc chuyển chữ để tạo sắc thái khác.' },
        { title: 'Tên sáng tạo vs. tên truyền thống', body: 'Trừ danh mục xác thực, kết quả là gợi ý sáng tạo chứ không mặc nhiên là tên truyền thống.' },
      ],
      footerNotice:
        'Các trình tạo của NameForge điều chỉnh phong cách đặt tên theo ngôn ngữ bạn chọn. Một số trình tạo gắn bó chặt hơn với quy ước ngôn ngữ và văn hóa riêng. Chọn ngôn ngữ tương thích giúp kết quả hài hòa hơn; lựa chọn khác tạo nên phong cách sáng tạo thay thế.',
      indicatorDescriptions: {
        'highly-compatible': 'Có kho từ vựng chuyên biệt hoặc danh sách xác thực hỗ trợ trực tiếp.',
        compatible: 'Quy tắc tạo tên vận hành mạch lạc và giữ đúng tinh thần chủ đề.',
        'alternative-style': 'Sử dụng phiên âm hoặc lớp phong cách khác biệt.',
        'limited-resources': 'Chuyển thể sáng tạo có kiểm soát do dữ liệu bản địa hạn chế.',
        'requires-review': 'Chưa có danh sách bản địa xác thực hoặc cần người rà soát.',
        'not-evaluated': 'Chưa đánh giá mức độ tương thích cho cặp này.',
      },
      domainSummary: {
        anime: 'Dựa trên hình vị cảm hứng Nhật Bản; tiếng Nhật (katakana) và romaji giữ nét đặc trưng anime.',
        attested: 'Dùng danh sách tên thật tiếng Latin châu Âu và tiếng Ả Rập, không tự bịa cho hệ chữ thiếu dữ liệu.',
        phraseBank: 'Sử dụng kho cụm từ bản địa hóa cho đủ 28 ngôn ngữ.',
        desert: 'Họa tiết sa mạc và phương Đông hài hòa với phiên âm Ả Rập hoặc Latin cổ.',
        nordic: 'Gốc Bắc Âu và Giéc-man phù hợp với chế độ Bắc Âu, tiếng Anh và Đức.',
        medieval: 'Gốc hiệp sĩ và thần thoại linh hoạt qua nhiều ngôn ngữ châu Âu.',
        business: 'Linh hoạt theo thị trường mục tiêu, phát âm và nhận diện thương hiệu.',
        tech: 'Kết hợp gốc kỹ thuật và từ mới Cyber & Tech.',
        creative: 'Chuyển thể linh hoạt các gốc tự sự giữa các ngôn ngữ hỗ trợ.',
      },
    },
  }),
  id: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Bandingkan dengan Koleksi & Nama Tersimpan',
      sourceFilterAll: 'Semua sumber',
      sourceGenerated: 'Dihasilkan',
      sourceSaved: 'Tersimpan',
      sourceCollection: 'Koleksi',
      searchPlaceholder: 'Cari nama hasil, tersimpan, atau koleksi…',
      allCollectionsFilter: 'Semua koleksi',
      unassignedCollection: 'Tanpa koleksi',
      selectedCounter: '{count} / {max} dipilih',
      clearSelection: 'Hapus pilihan',
      maxSelectedHint: 'Maksimal 4 nama dipilih. Hapus satu untuk menambahkan yang lain.',
      noCandidatesFound: 'Tidak ada nama yang cocok.',
      copyComparison: 'Salin perbandingan',
      comparisonCopied: 'Perbandingan disalin',
      languageMetaLabel: 'Bahasa',
      categoryMetaLabel: 'Kategori',
      collectionMetaLabel: 'Koleksi',
      notEvaluated: 'Belum dievaluasi',
      insufficientData: 'Data tidak mencukupi',
      crossContextTitle: 'Catatan perbandingan lintas bahasa/kategori',
      crossContextNotice:
        'Nama-nama ini berasal dari kategori atau bahasa yang berbeda ({details}). Perbandingan skor langsung memiliki keterbatasan konteks.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Sangat Kompatibel',
        compatible: 'Kompatibel',
        'alternative-style': 'Gaya Alternatif',
        'limited-resources': 'Sumber Bahasa Terbatas',
        'requires-review': 'Perlu Tinjauan',
        'not-evaluated': 'Belum Dievaluasi',
      },
      heading: 'Kompatibilitas Bahasa & Generator',
      generalIntro:
        'Bahasa yang dipilih memengaruhi gaya, struktur, bunyi, dan karakter budaya nama yang dihasilkan. Bahasa yang selaras dengan tema generator menghasilkan hasil yang lebih koheren, sementara pilihan bahasa lain menciptakan interpretasi kreatif alternatif.',
      statusPrefix: 'Kesesuaian bahasa aktif',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategori',
      suitableLanguagesLabel: 'Bahasa yang sangat sesuai',
      otherSupportedLabel: 'Bahasa lain yang didukung',
      recommendedLanguageLabel: 'Bahasa yang disarankan',
      noSingleRecommendation: 'Tidak ada satu bahasa wajib — pilih sesuai target pasar atau estetika.',
      whyFitLabel: 'Mengapa bahasa tertentu cocok',
      limitationsLabel: 'Keterbatasan bahasa yang diketahui',
      culturalNotesLabel: 'Pertimbangan budaya & tema',
      exampleLabel: 'Contoh kontekstual',
      whyTitle: 'Mengapa bahasa penting?',
      whyPoints: [
        { title: 'Pengaruh struktur & bunyi', body: 'Bahasa menentukan aksara, irama suku kata, imbuhan, dan panjang nama.' },
        { title: 'Konvensi khusus generator', body: 'Generator anime atau nama asli bergantung pada kosakata budaya tertentu.' },
        { title: 'Perubahan estetika', body: 'Bahasa Arab atau Jepang menerapkan transliterasi atau adaptasi aksara.' },
        { title: 'Kreatif vs. nama tradisional', body: 'Di luar daftar terverifikasi, hasil bersifat kreatif dan bukan otomatis nama tradisional.' },
      ],
      footerNotice:
        'Generator NameForge menyesuaikan gaya penamaan dengan bahasa yang dipilih. Sebagian generator selaras erat dengan konvensi bahasa dan budaya tertentu. Bahasa yang kompatibel memberi hasil lebih koheren; pilihan lain menciptakan gaya kreatif alternatif.',
      indicatorDescriptions: {
        'highly-compatible': 'Kosakata khusus atau daftar terverifikasi mendukung langsung pasangan ini.',
        compatible: 'Aturan generator berjalan selaras dengan bahasa ini.',
        'alternative-style': 'Menggunakan transliterasi fonetis atau gaya alternatif.',
        'limited-resources': 'Adaptasi aksara eksperimental karena data asli terbatas.',
        'requires-review': 'Belum ada direktori asli terverifikasi atau perlu tinjauan manusia.',
        'not-evaluated': 'Kompatibilitas kombinasi ini belum dievaluasi.',
      },
      domainSummary: {
        anime: 'Berakar pada morfem anime bergaya Jepang; katakana Jepang dan romaji menjaga ciri anime.',
        attested: 'Menggunakan daftar nama Eropa/Latin dan Arab resmi tanpa mengarang nama palsu.',
        phraseBank: 'Didukung bank frasa terlokalisasi di seluruh 28 bahasa.',
        desert: 'Motif gurun dan Timur Tengah yang serasi dengan transliterasi Arab atau Latin.',
        nordic: 'Akar Nordik dan Jermanik yang cocok untuk mode Nordik serta bahasa Eropa utara.',
        medieval: 'Menggabungkan akar ksatria dan mitos secara fleksibel di berbagai bahasa.',
        business: 'Menyesuaikan kejelasan merek dan pelafalan target pasar.',
        tech: 'Menggabungkan morfem teknis dan neologisme Cyber & Tech.',
        creative: 'Menyesuaikan akar naratif secara fleksibel di semua bahasa pendukung.',
      },
    },
  }),
  th: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'เปรียบเทียบกับคอลเลกชันและรายการที่บันทึก',
      sourceFilterAll: 'ทุกแหล่งที่มา',
      sourceGenerated: 'ที่สร้าง',
      sourceSaved: 'ที่บันทึก',
      sourceCollection: 'คอลเลกชัน',
      searchPlaceholder: 'ค้นหาชื่อที่สร้าง ชื่อที่บันทึก หรือคอลเลกชัน…',
      allCollectionsFilter: 'ทุกคอลเลกชัน',
      unassignedCollection: 'ไม่มีคอลเลกชัน',
      selectedCounter: 'เลือกแล้ว {count} / {max}',
      clearSelection: 'ล้างที่เลือก',
      maxSelectedHint: 'เลือกได้สูงสุด 4 ชื่อ โปรดยกเลิกหรือนำออก 1 ชื่อก่อนเพิ่มใหม่',
      noCandidatesFound: 'ไม่พบชื่อที่ตรงกับตัวกรอง',
      copyComparison: 'คัดลอกผลเปรียบเทียบ',
      comparisonCopied: 'คัดลอกผลเปรียบเทียบแล้ว',
      languageMetaLabel: 'ภาษา',
      categoryMetaLabel: 'หมวดหมู่',
      collectionMetaLabel: 'คอลเลกชัน',
      notEvaluated: 'ยังไม่ได้ประเมิน',
      insufficientData: 'ข้อมูลไม่เพียงพอ',
      crossContextTitle: 'หมายเหตุเมื่อเทียบข้ามภาษาหรือหมวดหมู่',
      crossContextNotice:
        'ชื่อเหล่านี้อยู่คนละหมวดหมู่หรือภาษา ({details}) การเทียบคะแนนโดยตรงมีข้อจำกัด จึงควรพิจารณาตามบริบทของแต่ละชื่อ',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'เข้ากันได้ดีมาก',
        compatible: 'เข้ากันได้',
        'alternative-style': 'สไตล์ทางเลือก',
        'limited-resources': 'ทรัพยากรภาษามีจำกัด',
        'requires-review': 'ควรตรวจสอบเพิ่มเติม',
        'not-evaluated': 'ยังไม่ได้ประเมิน',
      },
      heading: 'ความเข้ากันได้ของภาษาและตัวสร้างชื่อ',
      generalIntro:
        'ภาษาที่เลือกส่งผลต่อสไตล์ โครงสร้าง เสียง และอัตลักษณ์ทางวัฒนธรรมของชื่อ ตัวสร้างบางหมวดอิงธรรมเนียมภาษาเฉพาะ การเลือกภาษาที่สอดคล้องจะให้ผลลัพธ์กลมกลืนขึ้น ส่วนภาษาอื่นจะสร้างมุมมองเชิงสร้างสรรค์อีกแบบ',
      statusPrefix: 'ความเหมาะสมของภาษาปัจจุบัน',
      generatorLabel: 'ตัวสร้างชื่อ',
      categoryLabel: 'หมวดหมู่',
      suitableLanguagesLabel: 'ภาษาที่เหมาะสมเป็นพิเศษ',
      otherSupportedLabel: 'ภาษาอื่นที่รองรับ',
      recommendedLanguageLabel: 'ภาษาที่แนะนำ',
      noSingleRecommendation: 'ไม่จำกัดภาษาเดียว — เลือกตามกลุ่มเป้าหมายหรือบรรยากาศที่ต้องการ',
      whyFitLabel: 'เหตุใดบางภาษาจึงเหมาะกับสไตล์นี้',
      limitationsLabel: 'ข้อจำกัดทางภาษาที่ทราบ',
      culturalNotesLabel: 'ข้อควรคำนึงด้านวัฒนธรรมและธีม',
      exampleLabel: 'ตัวอย่างสำหรับหมวดนี้',
      whyTitle: 'เหตุใดภาษาจึงสำคัญ?',
      whyPoints: [
        { title: 'ผลต่อโครงสร้างและเสียง', body: 'ภาษากำหนดระบบอักษร จังหวะพยางค์ คำเสริม และความยาวของชื่อ' },
        { title: 'ธรรมเนียมเฉพาะหมวด', body: 'หมวดอนิเมะหรือชื่อบุคคลจริงอาศัยคลังคำเฉพาะวัฒนธรรม' },
        { title: 'เปลี่ยนบรรยากาศ', body: 'ภาษาอาหรับหรือญี่ปุ่นใช้การถอดเสียงหรือปรับรูปอักษรเพื่อสร้างอีกอารมณ์' },
        { title: 'งานสร้างสรรค์ vs. ชื่อดั้งเดิม', body: 'หากไม่ใช่บัญชีรายชื่อที่ยืนยันแล้ว ผลลัพธ์เป็นข้อเสนอเชิงสร้างสรรค์' },
      ],
      footerNotice:
        'ตัวสร้างชื่อ NameForge ปรับสไตล์ตามภาษาที่เลือก บางหมวดเชื่อมโยงกับธรรมเนียมภาษาและวัฒนธรรมเฉพาะ การเลือกภาษาที่เข้ากันช่วยให้ผลลัพธ์กลมกลืนขึ้น ส่วนภาษาอื่นให้สไตล์สร้างสรรค์อีกแบบ',
      indicatorDescriptions: {
        'highly-compatible': 'มีคลังคำเฉพาะหรือฐานข้อมูลยืนยันรองรับคู่นี้โดยตรง',
        compatible: 'กติกาของหมวดทำงานสอดคล้องกับภาษานี้',
        'alternative-style': 'ใช้การถอดเสียงหรือสไตล์ทางเลือกที่ต่างจากรูปแบบเดิม',
        'limited-resources': 'เป็นการปรับเชิงทดลองเนื่องจากข้อมูลภาษาพื้นถิ่นมีจำกัด',
        'requires-review': 'ยังไม่มีคลังข้อมูลยืนยันหรือควรให้เจ้าของภาษาช่วยตรวจ',
        'not-evaluated': 'ยังไม่มีการประเมินความเข้ากันได้สำหรับคู่นี้',
      },
      domainSummary: {
        anime: 'อิงหน่วยคำแรงบันดาลใจจากญี่ปุ่น ภาษาญี่ปุ่น (คาตาคานะ) และโรมันจิช่วยคงกลิ่นอายอนิเมะ',
        attested: 'อ้างอิงรายชื่อจริงของยุโรปและอาหรับ โดยไม่แต่งชื่อปลอมในอักษรที่ยังไม่มีข้อมูล',
        phraseBank: 'ขับเคลื่อนด้วยคลังวลีท้องถิ่นครบทั้ง 28 ภาษา',
        desert: 'เข้ากับธีมทะเลทรายและตะวันออกด้วยการถอดเสียงอาหรับหรือละตินคลาสสิก',
        nordic: 'รากศัพท์นอร์ดิกและเจอร์แมนิกที่เหมาะกับภาษาทางเหนือและอังกฤษ',
        medieval: 'ผสานรากอัศวินและตำนานได้อย่างยืดหยุ่นหลายภาษา',
        business: 'เลือกภาษาตามตลาดเป้าหมายและการออกเสียงของแบรนด์',
        tech: 'ผสานคำเทคนิคและคำใหม่สาย Cyber & Tech',
        creative: 'ปรับรากศัพท์เชิงเรื่องเล่าได้อย่างยืดหยุ่น',
      },
    },
  }),
  el: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Σύγκριση με Συλλογές & Αποθηκευμένα',
      sourceFilterAll: 'Όλες οι πηγές',
      sourceGenerated: 'Δημιουργημένο',
      sourceSaved: 'Αποθηκευμένο',
      sourceCollection: 'Συλλογή',
      searchPlaceholder: 'Αναζήτηση σε δημιουργημένα, αποθηκευμένα ή συλλογές…',
      allCollectionsFilter: 'Όλες οι συλλογές',
      unassignedCollection: 'Χωρίς συλλογή',
      selectedCounter: '{count} / {max} επιλεγμένα',
      clearSelection: 'Καθαρισμός επιλογής',
      maxSelectedHint: 'Έως 4 ονόματα. Αφαιρέστε ένα για να προσθέσετε άλλο.',
      noCandidatesFound: 'Δεν βρέθηκαν αντίστοιχα ονόματα.',
      copyComparison: 'Αντιγραφή σύγκρισης',
      comparisonCopied: 'Η σύγκριση αντιγράφηκε',
      languageMetaLabel: 'Γλώσσα',
      categoryMetaLabel: 'Κατηγορία',
      collectionMetaLabel: 'Συλλογή',
      notEvaluated: 'Δεν έχει αξιολογηθεί',
      insufficientData: 'Ανεπαρκή δεδομένα',
      crossContextTitle: 'Σημείωση για διαφορετικές γλώσσες ή κατηγορίες',
      crossContextNotice:
        'Αυτά τα ονόματα ανήκουν σε διαφορετικές κατηγορίες ή γλώσσες ({details}). Οι άμεσες συγκρίσεις έχουν δομικούς περιορισμούς.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Υψηλή συμβατότητα',
        compatible: 'Συμβατό',
        'alternative-style': 'Εναλλακτικό στυλ',
        'limited-resources': 'Περιορισμένοι γλωσσικοί πόροι',
        'requires-review': 'Απαιτεί έλεγχο',
        'not-evaluated': 'Δεν έχει αξιολογηθεί',
      },
      heading: 'Συμβατότητα γλώσσας & γεννήτριας',
      generalIntro:
        'Η επιλεγμένη γλώσσα επηρεάζει το στυλ, τη δομή, τον ήχο και τα πολιτισμικά στοιχεία των ονομάτων. Μια συμβατή γλώσσα προσφέρει πιο συνεκτικά αποτελέσματα, ενώ άλλες γλώσσες δίνουν εναλλακτικές δημιουργικές προσεγγίσεις.',
      statusPrefix: 'Αντιστοιχία τρέχουσας γλώσσας',
      generatorLabel: 'Γεννήτρια',
      categoryLabel: 'Κατηγορία',
      suitableLanguagesLabel: 'Ιδιαίτερα κατάλληλες γλώσσες',
      otherSupportedLabel: 'Άλλες υποστηριζόμενες γλώσσες',
      recommendedLanguageLabel: 'Προτεινόμενη γλώσσα',
      noSingleRecommendation: 'Δεν υπάρχει μία μοναδική γλώσσα — επιλέξτε ανάλογα με το κοινό ή το στυλ.',
      whyFitLabel: 'Γιατί ταιριάζουν ορισμένες γλώσσες',
      limitationsLabel: 'Γνωστοί γλωσσικοί περιορισμοί',
      culturalNotesLabel: 'Πολιτισμικές και θεματικές επισημάνσεις',
      exampleLabel: 'Παράδειγμα',
      whyTitle: 'Γιατί έχει σημασία η γλώσσα;',
      whyPoints: [
        { title: 'Δομή και ήχος', body: 'Η γλώσσα καθορίζει γραφή, συλλαβικό ρυθμό, επιθήματα και μήκος.' },
        { title: 'Συμβάσεις γεννήτριας', body: 'Γεννήτριες anime ή πραγματικών ονομάτων στηρίζονται σε εξειδικευμένα λεξιλόγια.' },
        { title: 'Αλλαγή αισθητικής', body: 'Τα αραβικά ή ιαπωνικά εφαρμόζουν μεταγραφή ή γραφική προσαρμογή.' },
        { title: 'Δημιουργικά vs. παραδοσιακά', body: 'Πέρα από τεκμηριωμένα αρχεία, οι προτάσεις είναι δημιουργικές και όχι αυτόματα παραδοσιακές.' },
      ],
      footerNotice:
        'Οι γεννήτριες NameForge προσαρμόζουν το στυλ τους στη γλώσσα που επιλέγετε. Μια συμβατή γλώσσα ενισχύει τη συνοχή, ενώ άλλες επιλογές δημιουργούν εναλλακτικό δημιουργικό ύφος.',
      indicatorDescriptions: {
        'highly-compatible': 'Ειδικό λεξιλόγιο ή επαληθευμένα αρχεία υποστηρίζουν άμεσα τον συνδυασμό.',
        compatible: 'Οι κανόνες λειτουργούν συνεκτικά σε αυτή τη γλώσσα.',
        'alternative-style': 'Χρησιμοποιεί φωνητική μεταγραφή με ξεχωριστή αισθητική.',
        'limited-resources': 'Πειραματική προσαρμογή λόγω περιορισμένων εγχώριων δεδομένων.',
        'requires-review': 'Λείπει τεκμηριωμένο ευρετήριο ή απαιτείται έλεγχος.',
        'not-evaluated': 'Δεν έχει αξιολογηθεί ακόμη.',
      },
      domainSummary: {
        anime: 'Ιαπωνικής έμπνευσης ρίζες anime· katakana και romaji διατηρούν τον χαρακτήρα.',
        attested: 'Τεκμηριωμένα ευρωπαϊκά και αραβικά ονόματα χωρίς τεχνητή επινόηση.',
        phraseBank: 'Τράπεζες εκφράσεων μεταφρασμένες και στις 28 γλώσσες.',
        desert: 'Θέματα ερήμου που ταιριάζουν με αραβική μεταγραφή ή λατινικά.',
        nordic: 'Σκανδιναβικές και γερμανικές ρίζες για βόρειες γλώσσες.',
        medieval: 'Ιπποτικές και μυθικές ρίζες ευέλικτες σε ευρωπαϊκές γλώσσες.',
        business: 'Επιλογή ανάλογα με την αγορά και την προφορά.',
        tech: 'Τεχνικά μορφήματα και νεολογισμοί Cyber & Tech.',
        creative: 'Ευέλικτη προσαρμογή αφηγηματικών ριζών.',
      },
    },
  }),
  he: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'השוואה עם האוספים והשמורים שלי',
      sourceFilterAll: 'כל המקורות',
      sourceGenerated: 'נוצר כעת',
      sourceSaved: 'שמור',
      sourceCollection: 'אוסף',
      searchPlaceholder: 'חיפוש שמות שנוצרו, שמורים או באוספים…',
      allCollectionsFilter: 'כל האוספים',
      unassignedCollection: 'ללא אוסף',
      selectedCounter: 'נבחרו {count} / {max}',
      clearSelection: 'נקה בחירה',
      maxSelectedHint: 'ניתן להשוות עד 4 שמות. הסירו שם כדי להוסיף אחר.',
      noCandidatesFound: 'לא נמצאו שמות מתאימים.',
      copyComparison: 'העתק השוואה',
      comparisonCopied: 'ההשוואה הועתקה',
      languageMetaLabel: 'שפה',
      categoryMetaLabel: 'קטגוריה',
      collectionMetaLabel: 'אוסף',
      notEvaluated: 'לא הוערך',
      insufficientData: 'אין מספיק נתונים',
      crossContextTitle: 'הערה להשוואת שפות או קטגוריות שונות',
      crossContextNotice:
        'השמות שייכים לקטגוריות או שפות שונות ({details}). להשוואה ישירה יש מגבלות ויש לבחון כל שם בהקשרו.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'התאמה גבוהה',
        compatible: 'תואם',
        'alternative-style': 'סגנון חלופי',
        'limited-resources': 'משאבי שפה מוגבלים',
        'requires-review': 'דרושה בדיקה',
        'not-evaluated': 'לא הוערך',
      },
      heading: 'תאימות שפה ומחולל',
      generalIntro:
        'השפה הנבחרת משפיעה על הסגנון, המבנה, הצליל והאופי התרבותי של השמות. בחירת שפה התואמת למסורת המחולל מניבה תוצאות עקביות יותר, בעוד ששפות אחרות יוצרות פרשנות יצירתית חלופית.',
      statusPrefix: 'התאמת השפה הנבחרת',
      generatorLabel: 'מחולל',
      categoryLabel: 'קטגוריה',
      suitableLanguagesLabel: 'שפות מתאימות במיוחד',
      otherSupportedLabel: 'שפות נתמכות נוספות',
      recommendedLanguageLabel: 'שפה מומלצת',
      noSingleRecommendation: 'אין שפה יחידה מחייבת — בחרו לפי קהל היעד או האסתטיקה הרצויה.',
      whyFitLabel: 'מדוע שפות מסוימות מתאימות',
      limitationsLabel: 'מגבלות לשוניות ידועות',
      culturalNotesLabel: 'שיקולים תרבותיים ונושאיים',
      exampleLabel: 'דוגמה למחולל זה',
      whyTitle: 'מדוע השפה חשובה?',
      whyPoints: [
        { title: 'השפעה על מבנה וצליל', body: 'השפה קובעת את הכתב, ההברות, הקצב והאורך.' },
        { title: 'מוסכמות המחולל', body: 'מחוללי אנימה או שמות אמיתיים נשענים על אוצר מילים ייעודי.' },
        { title: 'שינוי אסתטי', body: 'ערבית או יפנית מפעילות תעתיק פונטי או התאמת כתב.' },
        { title: 'יצירתי מול מסורתי', body: 'למעט מאגרים מתועדים, השמות הם הצעות יצירתיות.' },
      ],
      footerNotice:
        'מחוללי NameForge מתאימים את סגנונם לשפה שנבחרה. חלקם מותאמים במיוחד למסורות לשוניות ותרבותיות מסוימות; שפה תואמת מחזקת אחידות ושפות אחרות מציעות סגנון חלופי.',
      indicatorDescriptions: {
        'highly-compatible': 'מאגר ייעודי או רשימה מאומתת תומכים בשילוב זה.',
        compatible: 'חוקי המחולל עובדים בעקביות בשפה זו.',
        'alternative-style': 'תעתיק פונטי או התאמה סגנונית היוצרת גוון שונה.',
        'limited-resources': 'התאמה ניסיונית עקב משאבים לשוניים מוגבלים.',
        'requires-review': 'אין מאגר מקומי מאומת או נדרשת ביקורת אנושית.',
        'not-evaluated': 'תאימות השילוב טרם הוערכה.',
      },
      domainSummary: {
        anime: 'מבוסס שורשי אנימה יפניים; יפנית ורומאג׳י משמרים את הסגנון.',
        attested: 'מבוסס מאגרי שמות מתועדים באירופאית ובערבית ללא המצאת שמות.',
        phraseBank: 'מופעל ממאגרי ביטויים מתורגמים ל-28 השפות.',
        desert: 'מוטיבים מדבריים ומזרחיים המתמזגים עם תעתיק ערבי או לטינית.',
        nordic: 'שורשים נורדיים וגרמאניים המתאימים לשפות הצפון ולאנגלית.',
        medieval: 'שורשי אבירות ומיתולוגיה הגמישים במספר שפות אירופיות.',
        business: 'הבחירה תלויה בשוק היעד, בהגייה ובמיתוג.',
        tech: 'שורשים טכניים וניאולוגיזמים של Cyber & Tech.',
        creative: 'התאמת שורשים סיפוריים בגמישות בשפות הנתמכות.',
      },
    },
  }),
  cs: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Porovnat s Mými kolekcemi a uloženými',
      sourceFilterAll: 'Všechny zdroje',
      sourceGenerated: 'Vygenerované',
      sourceSaved: 'Uložené',
      sourceCollection: 'Kolekce',
      searchPlaceholder: 'Hledat vygenerované, uložené nebo názvy kolekcí…',
      allCollectionsFilter: 'Všechny kolekce',
      unassignedCollection: 'Bez kolekce',
      selectedCounter: 'Vybráno {count} / {max}',
      clearSelection: 'Vymazat výběr',
      maxSelectedHint: 'Lze porovnat nejvýše 4 názvy. Odeberte jeden pro přidání dalšího.',
      noCandidatesFound: 'Nebyly nalezeny žádné odpovídající názvy.',
      copyComparison: 'Kopírovat srovnání',
      comparisonCopied: 'Srovnání zkopírováno',
      languageMetaLabel: 'Jazyk',
      categoryMetaLabel: 'Kategorie',
      collectionMetaLabel: 'Kolekce',
      notEvaluated: 'Nehodnoceno',
      insufficientData: 'Nedostatek dat',
      crossContextTitle: 'Poznámka k různým jazykům nebo kategoriím',
      crossContextNotice:
        'Tyto názvy pocházejí z různých kategorií nebo jazyků ({details}). Přímé srovnání má omezení a je třeba hodnotit každý název v jeho kontextu.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Vysoce kompatibilní',
        compatible: 'Kompatibilní',
        'alternative-style': 'Alternativní styl',
        'limited-resources': 'Omezené jazykové zdroje',
        'requires-review': 'Vyžaduje kontrolu',
        'not-evaluated': 'Nehodnoceno',
      },
      heading: 'Kompatibilita jazyka a generátoru',
      generalIntro:
        'Zvolený jazyk ovlivňuje styl, strukturu, zvuk i kulturní ráz jmen. Vhodný jazyk přináší soudržnější výsledky, zatímco jiné jazyky nabízejí alternativní tvůrčí vyznění.',
      statusPrefix: 'Shoda aktuálního jazyka',
      generatorLabel: 'Generátor',
      categoryLabel: 'Kategorie',
      suitableLanguagesLabel: 'Zvláště vhodné jazyky',
      otherSupportedLabel: 'Další podporované jazyky',
      recommendedLanguageLabel: 'Doporučený jazyk',
      noSingleRecommendation: 'Není určen jediný jazyk — vyberte podle trhu nebo požadované estetiky.',
      whyFitLabel: 'Proč některé jazyky lépe sedí',
      limitationsLabel: 'Známá jazyková omezení',
      culturalNotesLabel: 'Kulturní a tematické aspekty',
      exampleLabel: 'Kontextový příklad',
      whyTitle: 'Proč záleží na jazyce?',
      whyPoints: [
        { title: 'Vliv na stavbu a zvuk', body: 'Jazyk určuje písmo, rytmus slabik, přípony a délku.' },
        { title: 'Konvence generátoru', body: 'Anime nebo ověřené rejstříky vycházejí ze specifické slovní zásoby.' },
        { title: 'Změna estetiky', body: 'Arabština či japonština využívají přepis nebo úpravu písma.' },
        { title: 'Tvůrčí návrhy vs. tradiční jména', body: 'Mimo ověřené seznamy jde o tvůrčí návrhy, nikoli zaručená tradiční jména.' },
      ],
      footerNotice:
        'Generátory NameForge přizpůsobují styl zvolenému jazyku. Některé se opírají o konkrétní jazykové a kulturní konvence; vhodný jazyk zvyšuje soudržnost a jiné volby vytvářejí alternativní styl.',
      indicatorDescriptions: {
        'highly-compatible': 'Tuto dvojici podporují vyhrazené slovníky či ověřené seznamy.',
        compatible: 'Pravidla generátoru s tímto jazykem souzní.',
        'alternative-style': 'Používá fonetický přepis nebo alternativní styl.',
        'limited-resources': 'Experimentální úprava při omezených domácích zdrojích.',
        'requires-review': 'Chybí ověřený rejstřík nebo je nutná lidská kontrola.',
        'not-evaluated': 'Kompatibilita zatím nebyla vyhodnocena.',
      },
      domainSummary: {
        anime: 'Staví na anime morfémech; japonská katakana i romaji zachovávají typický styl.',
        attested: 'Využívá ověřené evropské a arabské rejstříky bez vymýšlení jmen.',
        phraseBank: 'Podpořeno lokalizovanou bankou frází ve všech 28 jazycích.',
        desert: 'Pouštní motivy ladící s arabským přepisem či klasikou latiny.',
        nordic: 'Severské a germánské kořeny vhodné pro severské jazyky a angličtinu.',
        medieval: 'Rytířské a mytické kořeny pružně fungující napříč evropskými jazyky.',
        business: 'Záleží na cílovém trhu, výslovnosti a značce.',
        tech: 'Spojuje technické složky a novotvary Cyber & Tech.',
        creative: 'Pružně přizpůsobuje příběhové kořeny podporovaným jazykům.',
      },
    },
  }),
  ro: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Compară cu Colecțiile și Numele salvate',
      sourceFilterAll: 'Toate sursele',
      sourceGenerated: 'Generat',
      sourceSaved: 'Salvat',
      sourceCollection: 'Colecție',
      searchPlaceholder: 'Caută nume generate, salvate sau din colecții…',
      allCollectionsFilter: 'Toate colecțiile',
      unassignedCollection: 'Fără colecție',
      selectedCounter: '{count} / {max} selectate',
      clearSelection: 'Șterge selecția',
      maxSelectedHint: 'Maximum 4 nume selectate. Elimină unul pentru a adăuga altul.',
      noCandidatesFound: 'Nu au fost găsite nume potrivite.',
      copyComparison: 'Copiază comparația',
      comparisonCopied: 'Comparație copiată',
      languageMetaLabel: 'Limbă',
      categoryMetaLabel: 'Categorie',
      collectionMetaLabel: 'Colecție',
      notEvaluated: 'Neevaluat',
      insufficientData: 'Date insuficiente',
      crossContextTitle: 'Notă privind limbi sau categorii diferite',
      crossContextNotice:
        'Aceste nume provin din categorii sau limbi diferite ({details}). Comparațiile directe au limitări și trebuie interpretate în contextul fiecărui nume.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Foarte compatibil',
        compatible: 'Compatibil',
        'alternative-style': 'Stil alternativ',
        'limited-resources': 'Resurse lingvistice limitate',
        'requires-review': 'Necesită verificare',
        'not-evaluated': 'Neevaluat',
      },
      heading: 'Compatibilitate limbă și generator',
      generalIntro:
        'Limba aleasă influențează stilul, structura, sonoritatea și caracterul cultural al numelor. Alegerea unei limbi compatibile sporește coerența, iar alte limbi generează interpretări creative alternative.',
      statusPrefix: 'Potrivirea limbii selectate',
      generatorLabel: 'Generator',
      categoryLabel: 'Categorie',
      suitableLanguagesLabel: 'Limbi deosebit de potrivite',
      otherSupportedLabel: 'Alte limbi acceptate',
      recommendedLanguageLabel: 'Limbă recomandată',
      noSingleRecommendation: 'Nicio limbă unică obligatorie — alege în funcție de piață sau estetică.',
      whyFitLabel: 'De ce anumite limbi se potrivesc',
      limitationsLabel: 'Limitări lingvistice cunoscute',
      culturalNotesLabel: 'Aspecte culturale și tematice',
      exampleLabel: 'Exemplu contextual',
      whyTitle: 'De ce contează limba?',
      whyPoints: [
        { title: 'Structură și sonoritate', body: 'Limba determină grafia, silabele, afixele și lungimea.' },
        { title: 'Convenții specifice', body: 'Generatoarele anime sau de prenume reale folosesc registre dedicate.' },
        { title: 'Schimbarea esteticii', body: 'Araba sau japoneza aplică transliterare sau adaptare de scriere.' },
        { title: 'Creativ vs. tradițional', body: 'În afara registrelor verificate, rezultatele sunt sugestii creative.' },
      ],
      footerNotice:
        'Generatoarele NameForge își adaptează stilul la limba selectată. Unele respectă mai strâns convenții lingvistice și culturale specifice; o limbă compatibilă oferă coerență, iar alte alegeri creează stiluri alternative.',
      indicatorDescriptions: {
        'highly-compatible': 'Vocabulare dedicate sau liste verificate susțin această combinație.',
        compatible: 'Regulile generatorului funcționează coerent în această limbă.',
        'alternative-style': 'Folosește transliterare fonetică cu estetică distinctă.',
        'limited-resources': 'Adaptare experimentală cu resurse native limitate.',
        'requires-review': 'Lipsește registrul verificat sau necesită verificare umană.',
        'not-evaluated': 'Această combinație nu a fost încă evaluată.',
      },
      domainSummary: {
        anime: 'Rădăcini anime japoneze; katakana și romaji păstrează specificul.',
        attested: 'Liste verificate europene și arabe fără inventarea numelor lipsă.',
        phraseBank: 'Expresii localizate în toate cele 28 de limbi.',
        desert: 'Motive ale deșertului armonizate cu transliterare arabă sau latină.',
        nordic: 'Rădăcini nordice și germanice pentru limbi nordice și engleză.',
        medieval: 'Rădăcini cavalerești și mitice flexibile în limbi europene.',
        business: 'Depinde de piața țintă, pronunție și identitatea brandului.',
        tech: 'Morfeme tehnice și neologisme Cyber & Tech.',
        creative: 'Adaptează flexibil rădăcinile narative în limbile acceptate.',
      },
    },
  }),
  da: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Sammenlign med Mine samlinger & gemte',
      sourceFilterAll: 'Alle kilder',
      sourceGenerated: 'Genereret',
      sourceSaved: 'Gemt',
      sourceCollection: 'Samling',
      searchPlaceholder: 'Søg genererede, gemte eller samlingsnavne…',
      allCollectionsFilter: 'Alle samlinger',
      unassignedCollection: 'Uden samling',
      selectedCounter: '{count} / {max} valgt',
      clearSelection: 'Ryd valg',
      maxSelectedHint: 'Højst 4 navne valgt. Fjern et for at tilføje et andet.',
      noCandidatesFound: 'Ingen matchende navne fundet.',
      copyComparison: 'Kopiér sammenligning',
      comparisonCopied: 'Sammenligning kopieret',
      languageMetaLabel: 'Sprog',
      categoryMetaLabel: 'Kategori',
      collectionMetaLabel: 'Samling',
      notEvaluated: 'Ikke vurderet',
      insufficientData: 'Utilstrækkelige data',
      crossContextTitle: 'Bemærkning om forskellige sprog eller kategorier',
      crossContextNotice:
        'Navnene stammer fra forskellige kategorier eller sprog ({details}). Direkte sammenligning har begrænsninger og bør ses i egen kontekst.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Meget kompatibel',
        compatible: 'Kompatibel',
        'alternative-style': 'Alternativ stil',
        'limited-resources': 'Begrænsede sprogressourcer',
        'requires-review': 'Kræver gennemgang',
        'not-evaluated': 'Ikke vurderet',
      },
      heading: 'Sprog- og generatorkompatibilitet',
      generalIntro:
        'Det valgte sprog påvirker stil, struktur, klang og kulturelle træk. Et kompatibelt sprog giver mere sammenhængende resultater, mens andre sprog skaber alternative kreative udtryk.',
      statusPrefix: 'Valgt sprogmatch',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategori',
      suitableLanguagesLabel: 'Særligt egnede sprog',
      otherSupportedLabel: 'Andre understøttede sprog',
      recommendedLanguageLabel: 'Anbefalet sprog',
      noSingleRecommendation: 'Intet enkelt fast sprog — vælg ud fra målgruppe eller ønsket stil.',
      whyFitLabel: 'Hvorfor bestemte sprog passer',
      limitationsLabel: 'Kendte sproglige begrænsninger',
      culturalNotesLabel: 'Kulturelle & tematiske hensyn',
      exampleLabel: 'Eksempel',
      whyTitle: 'Hvorfor betyder sproget noget?',
      whyPoints: [
        { title: 'Struktur og lyd', body: 'Sprog styrer skriftsystem, stavelsesrytme og navnelængde.' },
        { title: 'Generatorens traditioner', body: 'Anime- og bekræftede navnelister bygger på målrettede ordforråd.' },
        { title: 'Skift i æstetik', body: 'Arabisk eller japansk bruger translitteration eller skrifttilpasning.' },
        { title: 'Kreativt vs. traditionelt', body: 'Uden for verificerede registre er resultater kreative forslag.' },
      ],
      footerNotice:
        'NameForge-generatorer tilpasser navnestilen til det valgte sprog. Nogle følger bestemte sproglige og kulturelle konventioner tættere; et kompatibelt sprog øger sammenhængen, mens andre giver alternative stilarter.',
      indicatorDescriptions: {
        'highly-compatible': 'Særlige ordforråd eller verificerede lister understøtter dette par.',
        compatible: 'Reglerne fungerer sammenhængende på dette sprog.',
        'alternative-style': 'Bruger fonetisk translitteration med en anden æstetik.',
        'limited-resources': 'Eksperimentel skrifttilpasning med begrænsede lokale data.',
        'requires-review': 'Manglende bekræftet liste eller manuel kontrol påkrævet.',
        'not-evaluated': 'Kompatibiliteten er endnu ikke vurderet.',
      },
      domainSummary: {
        anime: 'Japansk-inspirerede anime-morfemer; katakana og romaji bevarer stilen.',
        attested: 'Dokumenterede europæiske og arabiske lister uden opdigtede navne.',
        phraseBank: 'Lokaliserede fraser på alle 28 sprog.',
        desert: 'Ørkenmotiver der harmonerer med arabisk translitteration eller latin.',
        nordic: 'Oldnordiske og germanske rødder til nordiske sprog og engelsk.',
        medieval: 'Ridder- og myterødder på tværs af europæiske sprog.',
        business: 'Afhænger af målmarked, udtale og brandidentitet.',
        tech: 'Tekniske rødder og Cyber & Tech-neologismer.',
        creative: 'Tilpasser fortællerødder fleksibelt.',
      },
    },
  }),
  fi: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Vertaa kokoelmiin ja tallennettuihin',
      sourceFilterAll: 'Kaikki lähteet',
      sourceGenerated: 'Luotu',
      sourceSaved: 'Tallennettu',
      sourceCollection: 'Kokoelma',
      searchPlaceholder: 'Etsi luotuja, tallennettuja tai kokoelmanimiä…',
      allCollectionsFilter: 'Kaikki kokoelmat',
      unassignedCollection: 'Ilman kokoelmaa',
      selectedCounter: '{count} / {max} valittu',
      clearSelection: 'Tyhjennä valinta',
      maxSelectedHint: 'Enintään 4 nimeä valittuna. Poista yksi lisätäksesi uuden.',
      noCandidatesFound: 'Sopivia nimiä ei löytynyt.',
      copyComparison: 'Kopioi vertailu',
      comparisonCopied: 'Vertailu kopioitu',
      languageMetaLabel: 'Kieli',
      categoryMetaLabel: 'Luokka',
      collectionMetaLabel: 'Kokoelma',
      notEvaluated: 'Ei arvioitu',
      insufficientData: 'Riittämättömästi tietoja',
      crossContextTitle: 'Huomautus eri kielistä tai luokista',
      crossContextNotice:
        'Nimet kuuluvat eri luokkiin tai kieliin ({details}). Suora pistevertailu on rajallinen; tulkitse kukin nimi omassa kontekstissaan.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Erittäin yhteensopiva',
        compatible: 'Yhteensopiva',
        'alternative-style': 'Vaihtoehtoinen tyyli',
        'limited-resources': 'Rajalliset kieliresurssit',
        'requires-review': 'Vaatii tarkistuksen',
        'not-evaluated': 'Ei arvioitu',
      },
      heading: 'Kielen ja generaattorin yhteensopivuus',
      generalIntro:
        'Valittu kieli vaikuttaa nimien tyyliin, rakenteeseen, äänneasuun ja kulttuuriseen ilmeeseen. Yhteensopiva kieli tuottaa yhtenäisemmän tuloksen, kun taas muut kielet avaavat vaihtoehtoisia luovia tulkintoja.',
      statusPrefix: 'Nykyisen kielen sopivuus',
      generatorLabel: 'Generaattori',
      categoryLabel: 'Luokka',
      suitableLanguagesLabel: 'Erityisen sopivat kielet',
      otherSupportedLabel: 'Muut tuetut kielet',
      recommendedLanguageLabel: 'Suositeltu kieli',
      noSingleRecommendation: 'Ei yhtä pakollista kieltä — valitse kohdemarkkinan tai tyylin mukaan.',
      whyFitLabel: 'Miksi tietyt kielet sopivat tyyliin',
      limitationsLabel: 'Tunnetut kielelliset rajoitukset',
      culturalNotesLabel: 'Kulttuuriset ja temaattiset näkökohdat',
      exampleLabel: 'Esimerkki',
      whyTitle: 'Miksi kieli on tärkeä?',
      whyPoints: [
        { title: 'Vaikutus rakenteeseen ja sointiin', body: 'Kieli määrää kirjoitusjärjestelmän, tavurytmin ja pituuden.' },
        { title: 'Generaattorin käytännöt', body: 'Anime- ja etunimigeneraattorit perustuvat erityisiin sanastoihin.' },
        { title: 'Estetiikan muutos', body: 'Arabia ja japani käyttävät translitterointia tai kirjoitusasun mukautusta.' },
        { title: 'Luova vs. perinteinen', body: 'Todentamattomat ehdotukset ovat luovia ideoita, eivät perinteisiä nimiä.' },
      ],
      footerNotice:
        'NameForge-generaattorit mukauttavat tyylinsä valittuun kieleen. Yhteensopiva kieli tuo yhtenäisyyttä, kun taas muut kielivalinnat luovat vaihtoehtoisia tyylejä.',
      indicatorDescriptions: {
        'highly-compatible': 'Omat sanastot tai todennetut luettelot tukevat tätä yhdistelmää.',
        compatible: 'Säännöt toimivat johdonmukaisesti tässä kielessä.',
        'alternative-style': 'Fonetinen translitterointi luo vaihtoehtoisen ilmeen.',
        'limited-resources': 'Kokeellinen mukautus rajallisen kieliaineiston vuoksi.',
        'requires-review': 'Varmistettu luettelo puuttuu tai manuaalinen tarkistus tarvitaan.',
        'not-evaluated': 'Yhteensopivuutta ei ole vielä arvioitu.',
      },
      domainSummary: {
        anime: 'Japanilaisvaikutteiset anime-morfeemit; katakana ja romaji säilyttävät tyylin.',
        attested: 'Eurooppalaisia ja arabialaisia todennettuja luetteloita keksimättä puuttuvia nimiä.',
        phraseBank: 'Paikallistetut ilmauspankit kaikilla 28 kielellä.',
        desert: 'Aavikkoteemat sointuvat arabian translitteroinnin tai latinan kanssa.',
        nordic: 'Muinaisnordiset juuret pohjoismaisille kielille ja englannille.',
        medieval: 'Ritarilliset ja myyttiset juuret joustavasti eri kielissä.',
        business: 'Valitse kohdemarkkinan ja ääntämisen mukaan.',
        tech: 'Tekniset juuret ja Cyber & Tech -uudissanat.',
        creative: 'Mukauttaa tarinajuuria joustavasti tuettuihin kieliin.',
      },
    },
  }),
  uk: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Порівняти з Моїми добірками та збереженим',
      sourceFilterAll: 'Усі джерела',
      sourceGenerated: 'Згенеровано',
      sourceSaved: 'Збережено',
      sourceCollection: 'Добірка',
      searchPlaceholder: 'Пошук серед згенерованих, збережених або добірок…',
      allCollectionsFilter: 'Усі добірки',
      unassignedCollection: 'Без добірки',
      selectedCounter: 'Вибрано {count} / {max}',
      clearSelection: 'Очистити вибір',
      maxSelectedHint: 'Можна порівнювати до 4 імен. Приберіть одне, щоб додати інше.',
      noCandidatesFound: 'Відповідних імен не знайдено.',
      copyComparison: 'Копіювати порівняння',
      comparisonCopied: 'Порівняння скопійовано',
      languageMetaLabel: 'Мова',
      categoryMetaLabel: 'Категорія',
      collectionMetaLabel: 'Добірка',
      notEvaluated: 'Не оцінено',
      insufficientData: 'Недостатньо даних',
      crossContextTitle: 'Примітка щодо різних мов або категорій',
      crossContextNotice:
        'Ці імена належать до різних категорій або мов ({details}). Пряме зіставлення оцінок має обмеження, тому оцінюйте кожне ім’я у власному контексті.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Висока сумісність',
        compatible: 'Сумісно',
        'alternative-style': 'Альтернативний стиль',
        'limited-resources': 'Обмежені мовні ресурси',
        'requires-review': 'Потребує перевірки',
        'not-evaluated': 'Не оцінено',
      },
      heading: 'Сумісність мови та генератора',
      generalIntro:
        'Вибрана мова впливає на стиль, структуру, звучання й культурні риси імен. Сумісна мова забезпечує цілісніші результати, тоді як інші мови створюють альтернативні творчі інтерпретації.',
      statusPrefix: 'Відповідність поточної мови',
      generatorLabel: 'Генератор',
      categoryLabel: 'Категорія',
      suitableLanguagesLabel: 'Найбільш придатні мови',
      otherSupportedLabel: 'Інші підтримувані мови',
      recommendedLanguageLabel: 'Рекомендована мова',
      noSingleRecommendation: 'Немає єдиної обов’язкової мови — обирайте за аудиторією або стилем.',
      whyFitLabel: 'Чому певні мови пасують краще',
      limitationsLabel: 'Відомі мовні обмеження',
      culturalNotesLabel: 'Культурні й тематичні зауваги',
      exampleLabel: 'Приклад для генератора',
      whyTitle: 'Чому вибір мови має значення?',
      whyPoints: [
        { title: 'Вплив на форму і звучання', body: 'Мова визначає писемність, ритм складів, афікси й довжину.' },
        { title: 'Традиції генератора', body: 'Аніме- та документальні бази імен спираються на власні словники.' },
        { title: 'Зміна естетики', body: 'Арабська чи японська активують транслітерацію або графічну адаптацію.' },
        { title: 'Творчі пропозиції vs. традиційні імена', body: 'Поза перевіреними каталогами це творчі ідеї, а не гарантовані традиційні імена.' },
      ],
      footerNotice:
        'Генератори NameForge адаптують стиль до вибраної мови. Сумісна мова посилює узгодженість, а інші мови формують альтернативні творчі стилі.',
      indicatorDescriptions: {
        'highly-compatible': 'Доступні спеціалізовані словники або перевірені списки.',
        compatible: 'Правила генератора узгоджено працюють із цією мовою.',
        'alternative-style': 'Фонетична транслітерація створює окрему естетику.',
        'limited-resources': 'Експериментальна адаптація через обмежені ресурси.',
        'requires-review': 'Немає перевіреного довідника або потрібна ручна перевірка.',
        'not-evaluated': 'Сумісність ще не оцінено.',
      },
      domainSummary: {
        anime: 'Японські аніме-морфеми; катакана та ромадзі зберігають упізнаваність.',
        attested: 'Перевірені європейські й арабські списки без вигадування імен.',
        phraseBank: 'Локалізовані банки фраз для всіх 28 мов.',
        desert: 'Пустельні мотиви гармонійно поєднуються з арабською транслітерацією та латиною.',
        nordic: 'Скандинавські й германські корені для північних мов.',
        medieval: 'Лицарські й міфічні корені гнучко працюють у різних європейських мовах.',
        business: 'Обирайте відповідно до цільового ринку та вимови.',
        tech: 'Технічні морфеми й неологізми Cyber & Tech.',
        creative: 'Гнучко адаптує сюжетні корені в підтримуваних мовах.',
      },
    },
  }),
  bn: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'আমার সংগ্রহ ও সংরক্ষিত নামের সাথে তুলনা করুন',
      sourceFilterAll: 'সব উৎস',
      sourceGenerated: 'তৈরি করা',
      sourceSaved: 'সংরক্ষিত',
      sourceCollection: 'সংগ্রহ',
      searchPlaceholder: 'তৈরি, সংরক্ষিত বা সংগ্রহের নাম খুঁজুন…',
      allCollectionsFilter: 'সব সংগ্রহ',
      unassignedCollection: 'সংগ্রহ ছাড়া',
      selectedCounter: '{count} / {max} নির্বাচিত',
      clearSelection: 'নির্বাচন মুছুন',
      maxSelectedHint: 'সর্বোচ্চ ৪টি নাম তুলনা করা যায়। আরেকটি যোগ করতে একটি সরান।',
      noCandidatesFound: 'মিল থাকা কোনো নাম পাওয়া যায়নি।',
      copyComparison: 'তুলনা কপি করুন',
      comparisonCopied: 'তুলনা কপি হয়েছে',
      languageMetaLabel: 'ভাষা',
      categoryMetaLabel: 'বিভাগ',
      collectionMetaLabel: 'সংগ্রহ',
      notEvaluated: 'মূল্যায়িত নয়',
      insufficientData: 'অপর্যাপ্ত তথ্য',
      crossContextTitle: 'ভিন্ন ভাষা বা বিভাগের তুলনা নোট',
      crossContextNotice:
        'এই নামগুলো ভিন্ন বিভাগ বা ভাষার ({details})। সরাসরি স্কোর তুলনার সীমাবদ্ধতা রয়েছে এবং নিজ নিজ প্রেক্ষাপটে বিবেচনা করা উচিত।',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'অত্যন্ত সামঞ্জস্যপূর্ণ',
        compatible: 'সামঞ্জস্যপূর্ণ',
        'alternative-style': 'বিকল্প শৈলী',
        'limited-resources': 'সীমিত ভাষিক সম্পদ',
        'requires-review': 'পর্যালোচনা প্রয়োজন',
        'not-evaluated': 'মূল্যায়িত নয়',
      },
      heading: 'ভাষা ও জেনারেটর সামঞ্জস্য',
      generalIntro:
        'নির্বাচিত ভাষা নামের শৈলী, গঠন, ধ্বনি ও সাংস্কৃতিক বৈশিষ্ট্যকে প্রভাবিত করে। সামঞ্জস্যপূর্ণ ভাষা আরও সুসংগত ফল দেয়, আর অন্য ভাষা বিকল্প সৃজনশীল রূপ তৈরি করে।',
      statusPrefix: 'বর্তমান ভাষার সামঞ্জস্য',
      generatorLabel: 'জেনারেটর',
      categoryLabel: 'বিভাগ',
      suitableLanguagesLabel: 'বিশেষভাবে উপযুক্ত ভাষা',
      otherSupportedLabel: 'অন্যান্য সমর্থিত ভাষা',
      recommendedLanguageLabel: 'প্রস্তাবিত ভাষা',
      noSingleRecommendation: 'একটি বাধ্যতামূলক ভাষা নেই — লক্ষ্য দর্শক ও শৈলী অনুযায়ী বেছে নিন।',
      whyFitLabel: 'কিছু ভাষা কেন বেশি মানানসই',
      limitationsLabel: 'জানা ভাষিক সীমাবদ্ধতা',
      culturalNotesLabel: 'সাংস্কৃতিক ও বিষয়ভিত্তিক বিবেচনা',
      exampleLabel: 'প্রাসঙ্গিক উদাহরণ',
      whyTitle: 'ভাষা কেন গুরুত্বপূর্ণ?',
      whyPoints: [
        { title: 'গঠন ও ধ্বনিতে প্রভাব', body: 'ভাষা লিপি, সিলেবলের ছন্দ, প্রত্যয় ও দৈর্ঘ্য নির্ধারণ করে।' },
        { title: 'জেনারেটরের রীতি', body: 'অ্যানিমে বা যাচাইকৃত নামের জেনারেটর নির্দিষ্ট শব্দভাণ্ডারের ওপর নির্ভর করে।' },
        { title: 'নান্দনিক পরিবর্তন', body: 'আরবি বা জাপানি বেছে নিলে ধ্বনিগত প্রতিবর্ণীকরণ ভিন্ন আবহ তৈরি করে।' },
        { title: 'সৃজনশীল বনাম ঐতিহ্যবাহী নাম', body: 'যাচাইকৃত তালিকা ছাড়া ফলাফল সৃজনশীল প্রস্তাবনা মাত্র।' },
      ],
      footerNotice:
        'NameForge জেনারেটরগুলো নির্বাচিত ভাষার সাথে নামকরণের শৈলী সামঞ্জস্য করে। কিছু জেনারেটর নির্দিষ্ট ভাষিক ও সাংস্কৃতিক রীতির সাথে ঘনিষ্ঠ; সামঞ্জস্যপূর্ণ ভাষা সুসংগত ফল দেয় এবং অন্য ভাষা বিকল্প সৃজনশীল শৈলী তৈরি করে।',
      indicatorDescriptions: {
        'highly-compatible': 'নিবেদিত শব্দভাণ্ডার বা যাচাইকৃত তালিকা সরাসরি সমর্থন করে।',
        compatible: 'থিমের বৈশিষ্ট্য বজায় রেখে নিয়মগুলো সুসংগতভাবে কাজ করে।',
        'alternative-style': 'ধ্বনিগত প্রতিবর্ণীকরণের মাধ্যমে ভিন্ন শৈলী তৈরি হয়।',
        'limited-resources': 'সীমিত স্থানীয় তথ্যের কারণে পরীক্ষামূলক লিপি রূপান্তর।',
        'requires-review': 'যাচাইকৃত তালিকা নেই বা মানবিক যাচাই প্রয়োজন।',
        'not-evaluated': 'এই জুটির সামঞ্জস্য এখনও মূল্যায়িত হয়নি।',
      },
      domainSummary: {
        anime: 'জাপানি-অনুপ্রাণিত অ্যানিমে মূল নিয়ে গঠিত; জাপানি কাতাকানা ও রোমাজি আবহ ধরে রাখে।',
        attested: 'ইউরোপীয় ও আরবি যাচাইকৃত তালিকা ব্যবহার করে; অনুপস্থিত লিপিতে নাম বানায় না।',
        phraseBank: '২৮টি ভাষায় অনূদিত শব্দগুচ্ছ ভাণ্ডার দ্বারা চালিত।',
        desert: 'মরুভূমি ও প্রাচ্যের থিম আরবি প্রতিবর্ণীকরণ বা লাতিনের সাথে মানায়।',
        nordic: 'নর্ডিক ও জার্মানিক মূল উত্তর ইউরোপীয় ভাষার সাথে মানানসই।',
        medieval: 'নাইট ও পৌরাণিক মূল ইউরোপীয় ভাষাগুলোতে নমনীয়ভাবে কাজ করে।',
        business: 'লক্ষ্য বাজার ও উচ্চারণের স্পষ্টতা অনুযায়ী ভাষা বেছে নিন।',
        tech: 'প্রযুক্তিগত মূল ও Cyber & Tech শব্দ যুক্ত করে।',
        creative: 'সমর্থিত ভাষায় গল্পের মূল নমনীয়ভাবে রূপান্তর করে।',
      },
    },
  }),
  nb: makeCompactLocale({
    compare: {
      compareWithCollectionsTitle: 'Sammenlign med Mine samlinger og lagrede',
      sourceFilterAll: 'Alle kilder',
      sourceGenerated: 'Generert',
      sourceSaved: 'Lagret',
      sourceCollection: 'Samling',
      searchPlaceholder: 'Søk i genererte, lagrede eller samlingsnavn…',
      allCollectionsFilter: 'Alle samlinger',
      unassignedCollection: 'Uten samling',
      selectedCounter: '{count} / {max} valgt',
      clearSelection: 'Tøm valg',
      maxSelectedHint: 'Maks 4 navn kan sammenlignes. Fjern ett for å legge til et annet.',
      noCandidatesFound: 'Ingen matchende navn funnet.',
      copyComparison: 'Kopier sammenligning',
      comparisonCopied: 'Sammenligning kopiert',
      languageMetaLabel: 'Språk',
      categoryMetaLabel: 'Kategori',
      collectionMetaLabel: 'Samling',
      notEvaluated: 'Ikke vurdert',
      insufficientData: 'Utilstrekkelige data',
      crossContextTitle: 'Merknad om ulike språk eller kategorier',
      crossContextNotice:
        'Navnene kommer fra ulike kategorier eller språk ({details}). Direkte poengsammenligninger har begrensninger og bør tolkes i sin egen sammenheng.',
    },
    compatibility: {
      indicators: {
        'highly-compatible': 'Svært kompatibel',
        compatible: 'Kompatibel',
        'alternative-style': 'Alternativ stil',
        'limited-resources': 'Begrensede språkressurser',
        'requires-review': 'Krever gjennomgang',
        'not-evaluated': 'Ikke vurdert',
      },
      heading: 'Språk- og generatorkompatibilitet',
      generalIntro:
        'Det valgte språket påvirker stil, struktur, lyd og kulturelt preg. Et kompatibelt språk gir mer helhetlige resultater, mens andre språk skaper alternative kreative uttrykk.',
      statusPrefix: 'Samsvar med valgt språk',
      generatorLabel: 'Generator',
      categoryLabel: 'Kategori',
      suitableLanguagesLabel: 'Særlig egnede språk',
      otherSupportedLabel: 'Andre støttede språk',
      recommendedLanguageLabel: 'Anbefalt språk',
      noSingleRecommendation: 'Ingen enkelt fasitspråk — velg ut fra målgruppe, marked eller ønsket estetikk.',
      whyFitLabel: 'Hvorfor enkelte språk passer stilen',
      limitationsLabel: 'Kjente språklige begrensninger',
      culturalNotesLabel: 'Kulturelle og tematiske hensyn',
      exampleLabel: 'Eksempel for denne generatoren',
      whyTitle: 'Hvorfor betyr språket noe?',
      whyPoints: [
        { title: 'Struktur og lydbilde', body: 'Språket styrer skrift, stavelsesrytme, forstavelser og lengde.' },
        { title: 'Generatorens konvensjoner', body: 'Anime- eller dokumenterte navnelister bygger på bestemte ordforråd.' },
        { title: 'Skifte i estetikk', body: 'Arabisk eller japansk bruker translitterasjon eller skrifttilpasning.' },
        { title: 'Kreative forslag vs. tradisjonelle navn', body: 'Utenom verifiserte registre er resultatene kreative forslag.' },
      ],
      footerNotice:
        'NameForge-generatorer tilpasser navnestilen til det valgte språket. Enkelte følger bestemte språklige og kulturelle konvensjoner tettere; et kompatibelt språk gir mer helhet, mens andre valg skaper alternative stilarter.',
      indicatorDescriptions: {
        'highly-compatible': 'Eget ordforråd eller verifiserte lister støtter denne kombinasjonen.',
        compatible: 'Reglene fungerer godt og bevarer temaets preg i dette språket.',
        'alternative-style': 'Bruker fonetisk translitterasjon med en egen estetisk stil.',
        'limited-resources': 'Eksperimentell tilpasning på grunn av begrensede kildedata.',
        'requires-review': 'Mangler bekreftet register eller krever menneskelig vurdering.',
        'not-evaluated': 'Kompatibilitet er ennå ikke vurdert.',
      },
      domainSummary: {
        anime: 'Japanskinspirerte anime-morfemer; katakana og romaji bevarer stilen.',
        attested: 'Dokumenterte europeiske og arabiske lister uten oppspinn av navn.',
        phraseBank: 'Lokaliserte frasebanker på alle 28 språk.',
        desert: 'Ørkenmotiver som harmonerer med arabisk translitterasjon eller latin.',
        nordic: 'Norrøne og germanske røtter som passer nordiske språk og engelsk.',
        medieval: 'Ridder- og myterøtter som fungerer fleksibelt på europeiske språk.',
        business: 'Avhenger av målmarked, uttale og merkevareidentitet.',
        tech: 'Tekniske røtter og Cyber & Tech-nyord.',
        creative: 'Tilpasser fortellerrøtter fleksibelt på støttede språk.',
      },
    },
  }),
};

const COMPACT_EXPORT_LABELS: Record<
  Exclude<EnhancementLocale, 'en' | 'fr'>,
  { exportTxt: string; exportJson: string }
> = {
  es: { exportTxt: 'Exportar .TXT', exportJson: 'Exportar .JSON' },
  de: { exportTxt: '.TXT exportieren', exportJson: '.JSON exportieren' },
  it: { exportTxt: 'Esporta .TXT', exportJson: 'Esporta .JSON' },
  pt: { exportTxt: 'Exportar .TXT', exportJson: 'Exportar .JSON' },
  ar: { exportTxt: 'تصدير .TXT', exportJson: 'تصدير .JSON' },
  tr: { exportTxt: '.TXT dışa aktar', exportJson: '.JSON dışa aktar' },
  ja: { exportTxt: '.TXTを書き出す', exportJson: '.JSONを書き出す' },
  ko: { exportTxt: '.TXT 내보내기', exportJson: '.JSON 내보내기' },
  zh: { exportTxt: '导出 .TXT', exportJson: '导出 .JSON' },
  ru: { exportTxt: 'Экспорт .TXT', exportJson: 'Экспорт .JSON' },
  hi: { exportTxt: '.TXT निर्यात', exportJson: '.JSON निर्यात' },
  nl: { exportTxt: '.TXT exporteren', exportJson: '.JSON exporteren' },
  pl: { exportTxt: 'Eksportuj .TXT', exportJson: 'Eksportuj .JSON' },
  sv: { exportTxt: 'Exportera .TXT', exportJson: 'Exportera .JSON' },
  vi: { exportTxt: 'Xuất .TXT', exportJson: 'Xuất .JSON' },
  id: { exportTxt: 'Ekspor .TXT', exportJson: 'Ekspor .JSON' },
  th: { exportTxt: 'ส่งออก .TXT', exportJson: 'ส่งออก .JSON' },
  el: { exportTxt: 'Εξαγωγή .TXT', exportJson: 'Εξαγωγή .JSON' },
  he: { exportTxt: 'ייצוא .TXT', exportJson: 'ייצוא .JSON' },
  cs: { exportTxt: 'Exportovat .TXT', exportJson: 'Exportovat .JSON' },
  ro: { exportTxt: 'Exportă .TXT', exportJson: 'Exportă .JSON' },
  da: { exportTxt: 'Eksportér .TXT', exportJson: 'Eksportér .JSON' },
  fi: { exportTxt: 'Vie .TXT', exportJson: 'Vie .JSON' },
  uk: { exportTxt: 'Експорт .TXT', exportJson: 'Експорт .JSON' },
  bn: { exportTxt: '.TXT রপ্তানি', exportJson: '.JSON রপ্তানি' },
  nb: { exportTxt: 'Eksporter .TXT', exportJson: 'Eksporter .JSON' },
};

const COMPACT_SHARED_DOMAIN_NOTES: Record<
  Exclude<EnhancementLocale, 'en' | 'fr'>,
  {
    anime: [string, string, string];
    attested: [string, string, string];
    phraseBank: [string, string, string];
    desert: [string, string, string];
    nordic: [string, string, string];
    medieval: [string, string, string];
    business: [string, string, string];
    tech: [string, string, string];
    creative: [string, string, string];
  }
> = {
  es: {
    anime: [
      'El modo japonés produce katakana creativo y no nombres oficiales en kanji.',
      'Refleja tropos anime más que convenciones reales del registro civil japonés.',
      'El japonés genera katakana anime; el árabe produce transliteración fonética con otro tono.',
    ],
    attested: [
      'Evita fabricar nombres reales para escrituras sin repertorio local verificado.',
      'La idoneidad de un nombre real depende de la tradición familiar y ortografía regional.',
      'Español, inglés, francés y árabe acceden a listados documentados.',
    ],
    phraseBank: [
      'Estilos temáticos como Nórdico, Latín o Tech añaden matices propios.',
      'Revisa modismos con un hablante nativo antes de campañas comerciales.',
      'Los 28 idiomas usan estructuras editoriales adaptadas a esta categoría.',
    ],
    desert: [
      'El árabe aplica transliteración fonética de raíces, no morfología clásica.',
      'Verifica términos históricos o sagrados para garantizar un uso respetuoso.',
      'El árabe o el latín refuerzan la ambientación desértica frente a otros estilos.',
    ],
    nordic: [
      'Las escrituras no latinas adaptan sonidos en lugar de usar nórdico antiguo auténtico.',
      'Distingue nombres ficticios de patrimonio histórico o cultural escandinavo.',
      'Nórdico, sueco, danés, noruego, alemán e inglés conservan consonantes nórdicas.',
    ],
    medieval: [
      'Las salidas no latinas priorizan el ritmo sonoro frente a la etimología histórica.',
      'El idioma elegido orienta el tono entre artúrico, continental o nórdico.',
      'Latín, francés, inglés o alemán aportan matices medievales complementarios.',
    ],
    business: [
      'Toda transliteración en otra escritura requiere revisión nativa y de marca.',
      'No hay un único idioma ideal: evalúa tu mercado, pronunciación y dominio.',
      'Elige el idioma acorde con tu público principal y estrategia comercial.',
    ],
    tech: [
      'Adaptaciones fuera del alfabeto latino pueden ocultar raíces técnicas reconocibles.',
      'Los formatos cortos compatibles con ASCII funcionan mejor para APIs y software.',
      'Cyber & Tech e idiomas internacionales destacan neologismos digitales.',
    ],
    creative: [
      'Las salidas no latinas usan adaptación creativa controlada de carácter experimental.',
      'Ten en cuenta las expectativas de lectura de tu audiencia o género.',
      'Selecciona el idioma que mejor refleje el tono narrativo de tu obra.',
    ],
  },
  de: {
    anime: [
      'Der Japanisch-Modus erzeugt kreatives Katakana und keine offiziellen Kanji-Namen.',
      'Spiegelt Anime-Stilmittel statt realer japanischer Namenskonventionen wider.',
      'Japanisch liefert Anime-Katakana, Arabisch hingegen eine klangliche Transliteration.',
    ],
    attested: [
      'Für Schriften ohne belegte Datenbank werden keine fiktiven Realnamen erfunden.',
      'Die Eignung realer Vornamen hängt von regionaler Schreibweise und Kultur ab.',
      'Deutsch, Englisch, Französisch und Arabisch greifen auf belegte Verzeichnisse zu.',
    ],
    phraseBank: [
      'Themenstile wie Nordisch, Latein oder Tech fügen eigene Stilfärbungen hinzu.',
      'Redewendungen vor kommerzieller Nutzung von Muttersprachlern gegenlesen lassen.',
      'Alle 28 Sprachen nutzen redaktionell gepflegte Phrasenstrukturen.',
    ],
    desert: [
      'Arabisch nutzt phonetische Transliteration statt klassischer arabischer Grammatik.',
      'Historische oder religiöse Anklänge vor Veröffentlichung sorgfältig prüfen.',
      'Arabisch und Latein passen besonders direkt zu Wüsten- und Oasenthemen.',
    ],
    nordic: [
      'Nicht-lateinische Schriften bilden Laute nur phonetisch nach.',
      'Fiktive Spielnamen klar von echtem nordischem Kulturerbe unterscheiden.',
      'Nordisch, Schwedisch, Dänisch, Norwegisch, Deutsch und Englisch bewahren den Klang.',
    ],
    medieval: [
      'Nicht-lateinische Ausgaben priorisieren Klangfluss statt historischer Etymologie.',
      'Die Sprache lenkt den Stil Richtung Artus-Epik, Kontinentalmittelalter oder Fantasy.',
      'Latein, Französisch, Englisch und Deutsch bieten jeweils eigene Epik-Nuancen.',
    ],
    business: [
      'Transliterationen in andere Schriften erfordern Marken- und Muttersprachler-Prüfung.',
      'Keine einzelne Pflichtsprache: Zielmarkt, Aussprache und Domain zählen.',
      'Wähle die Sprache passend zu deiner Hauptzielgruppe.',
    ],
    tech: [
      'Starke Schriftanpassungen außerhalb des Lateinischen verdecken oft Tech-Wurzeln.',
      'Kurze ASCII-taugliche Formen eignen sich besonders für APIs und Tools.',
      'Cyber & Tech sowie Englisch/Deutsch betonen prägnante Neologismen.',
    ],
    creative: [
      'Nicht-lateinische Ausgaben beruhen auf kontrollierter, experimenteller Anpassung.',
      'Lesegewohnheiten und Genre-Erwartungen des Zielpublikums beachten.',
      'Wähle die Sprache passend zur gewünschten Erzählstimmung.',
    ],
  },
  it: {
    anime: [
      'Il giapponese genera katakana creativi e non nomi reali in kanji.',
      'Riflette i tropi narrativi anime più che le norme anagrafiche giapponesi.',
      'Il giapponese crea forme katakana anime; l’arabo applica traslitterazione fonetica.',
    ],
    attested: [
      'Evita di inventare nomi reali per scritture prive di archivio verificato.',
      'L’uso reale dipende da tradizioni familiari e varianti ortografiche locali.',
      'Italiano, francese, inglese e arabo accedono a repertori documentati.',
    ],
    phraseBank: [
      'Gli stili Nordico, Latino o Tech mantengono sfumature lessicali dedicate.',
      'Verifica espressioni e tono con un madrelingua prima dell’uso commerciale.',
      'Tutte le 28 lingue accedono a strutture frasali localizzate.',
    ],
    desert: [
      'L’arabo usa traslitterazione fonetica delle radici e non morfologia classica.',
      'Controlla eventuali termini storici o sacri per un impiego rispettoso.',
      'Arabo e latino classico si integrano con naturalezza nei contesti desertici.',
    ],
    nordic: [
      'Le scritture non latine adattano i suoni invece di usare norreno autentico.',
      'Distingui sempre i nomi fantasy dal patrimonio culturale scandinavo reale.',
      'Nordico, svedese, danese, norvegese, tedesco e inglese preservano le consonanti nordiche.',
    ],
    medieval: [
      'Le forme non latine privilegiano il ritmo sonoro rispetto all’etimologia storica.',
      'La lingua orienta l’atmosfera verso il ciclo arturiano, europeo o fantasy.',
      'Latino, francese, italiano e inglese offrono registri cavallereschi coerenti.',
    ],
    business: [
      'Le traslitterazioni richiedono verifica madrelingua e controlli sui marchi.',
      'Nessuna lingua è universale: valuta mercato, pronuncia e strategia digitale.',
      'Allinea la lingua di generazione al pubblico principale del brand.',
    ],
    tech: [
      'Adattamenti lontani dall’alfabeto latino possono celare le radici tecniche.',
      'Nomi brevi e compatibili ASCII funzionano meglio per software e API.',
      'Cyber & Tech e inglese mettono in risalto neologismi digitali compatti.',
    ],
    creative: [
      'I risultati non latini restano adattamenti creativi sperimentali.',
      'Considera leggibilità e aspettative del pubblico di genere.',
      'Scegli la lingua più vicina al tono narrativo del progetto.',
    ],
  },
  pt: {
    anime: [
      'O modo japonês cria katakana estilizados, não nomes oficiais em kanji.',
      'Reflete convenções pop de anime, não regras reais de registro civil.',
      'Japonês gera formas anime em katakana; árabe aplica transliteração fonética.',
    ],
    attested: [
      'Não inventa nomes reais em escritas sem acervo verificado disponível.',
      'A adequação real depende de ortografia regional e contexto familiar.',
      'Português, espanhol, francês, inglês e árabe usam listas documentadas.',
    ],
    phraseBank: [
      'Modos temáticos como Nórdico, Latim ou Tech mantêm vocabulário estilizado.',
      'Revise expressões com falantes nativos antes de uso comercial formal.',
      'Os 28 idiomas acessam estruturas frasais dedicadas a esta categoria.',
    ],
    desert: [
      'A saída árabe utiliza transliteração fonética, não gramática árabe clássica.',
      'Verifique referências históricas ou sagradas antes da publicação.',
      'Árabe e latim combinam naturalmente com cenários desérticos e antigos.',
    ],
    nordic: [
      'Escritas não latinas fazem adaptação sonora sem morfologia nórdica antiga.',
      'Diferencie criações de fantasia do patrimônio histórico escandinavo.',
      'Nórdico, sueco, dinamarquês, norueguês e inglês preservam encontros consonantais.',
    ],
    medieval: [
      'Adaptações não latinas priorizam cadência sonora em vez de etimologia.',
      'O idioma muda o tom entre fantasia arturiana, europeia ou clássica.',
      'Latim, francês, português e inglês trazem texturas medievais próprias.',
    ],
    business: [
      'Transliterações exigem leitura nativa e pesquisa prévia de marca.',
      'Não existe um idioma único ideal: considere mercado e pronúncia.',
      'Escolha o idioma alinhado ao seu público-alvo principal.',
    ],
    tech: [
      'Adaptações fora do alfabeto latino podem ocultar radicais técnicos.',
      'Nomes curtos compatíveis com ASCII facilitam uso em APIs e plataformas.',
      'Cyber & Tech e inglês valorizam neologismos modernos e objetivos.',
    ],
    creative: [
      'Resultados em escritas não latinas são adaptações criativas experimentais.',
      'Considere a fluidez de leitura para o público do seu projeto.',
      'Selecione o idioma que melhor traduz a atmosfera da sua obra.',
    ],
  },
  ar: {
    anime: [
      'الوضع الياباني ينتج كاتاكانا إبداعية وليس أسماءً رسمية موثقة بالكانجي.',
      'يعكس هذا النمط قوالب الأنمي الشعبية لا قواعد السجلات المدنية اليابانية.',
      'اليابانية تمنح صيغ كاتاكانا للأنمي، بينما تقدم العربية نقحرة صوتية بطابع مغاير.',
    ],
    attested: [
      'يمتنع المولّد عن اختلاق أسماء شخصية للأنظمة الكتابية غير الموثقة لدينا.',
      'ملاءمة الاسم الواقعي ترتبط بالاستخدام العائلي والإملاء الإقليمي المعتمد.',
      'العربية واللغات الأوروبية المدعومة تصل إلى قوائم أسماء موثقة.',
    ],
    phraseBank: [
      'تضيف الأنماط الموضوعية مثل النوردي واللاتيني والتقني لمسات معجمية خاصة.',
      'يُستحسن مراجعة العبارات مع متحدث أصلي قبل الاستخدام التجاري الرسمي.',
      'تستفيد اللغات الـ28 من تراكيب لغوية مصممة خصيصًا لهذه الفئة.',
    ],
    desert: [
      'تعتمد المخرجات العربية هنا على النقحرة الصوتية لا الصرف العربي الكلاسيكي.',
      'تحقق من أي ألفاظ ذات صلة تاريخية أو دينية قبل النشر لضمان سلامة السياق.',
      'العربية واللاتينية تمنحان طابعًا متناغمًا مع أجواء الصحراء والواحات.',
    ],
    nordic: [
      'تعتمد الخطوط غير اللاتينية على تقريب صوتي بدل البنية الإسكندنافية القديمة.',
      'يُنصح بالتمييز بين أسماء الخيال الترفيهي والتراث التاريخي الشمالي.',
      'النوردية واللغات الإسكندنافية والإنجليزية تحافظ على الجرس الشمالي الأصلي.',
    ],
    medieval: [
      'تُقدّم الصيغ غير اللاتينية الإيقاع الصوتي على حساب التأصيل التاريخي.',
      'تغيّر اللغة المختارة الجو العام بين الطابع الأرثوري أو القاري أو النوردي.',
      'اللاتينية والفرنسية والإنجليزية والألمانية تمنح تنوعًا مناسبًا لعوالم الفروسية.',
    ],
    business: [
      'تحتاج النقحرة لكتابات أخرى إلى مراجعة نطقية وفحص للعلامات التجارية.',
      'لا توجد لغة وحيدة ملزمة؛ قيّم لغة الجمهور وسهولة النطق واسم النطاق.',
      'اختر اللغة الأقرب إلى شريحة عملائك وهوية مشروعك التجارية.',
    ],
    tech: [
      'قد تخفي التحويلات الكتابية البعيدة عن اللاتينية وضوح الجذور التقنية.',
      'الصيغ القصيرة المتوافقة مع ASCII أنسب للبرمجيات وواجهات البرمجة.',
      'الوضع التقني والإنجليزية يبرزان مصطلحات حديثة واضحة للأنظمة الرقمية.',
    ],
    creative: [
      'تعتمد الخطوط غير اللاتينية تكييفًا إبداعيًا مضبوطًا ذا طابع تجريبي.',
      'راعِ توقعات القراء وسهولة التلفظ في سياق عملك الإبداعي.',
      'اختر اللغة التي تنسجم مع النبرة السردية والثقافية لمشروعك.',
    ],
  },
  tr: {
    anime: [
      'Japonca modu resmi kanji adları değil yaratıcı katakana yaklaşımları üretir.',
      'Resmi Japon nüfus kurallarından ziyade anime anlatı kalıplarını yansıtır.',
      'Japonca anime katakana üretirken Arapça farklı bir fonetik aktarım sunar.',
    ],
    attested: [
      'Doğrulanmış listesi olmayan alfabeler için sahte gerçek adlar uydurmaz.',
      'Gerçek ad uygunluğu bölgesel yazım ve aile geleneklerine bağlıdır.',
      'Türkçe, Avrupa dilleri ve Arapça belgelenmiş ad havuzlarına erişir.',
    ],
    phraseBank: [
      'Nordik, Latince veya Tech stilleri özel tematik sözcük katmanları korur.',
      'Ticari yayından önce deyimsel uyumu anadili konuşan biriyle kontrol edin.',
      '28 dilin tamamı kategoriye uyarlanmış yerel ifade yapılarını kullanır.',
    ],
    desert: [
      'Arapça çıktılar klasik Arapça dilbilgisi yerine fonetik aktarım uygular.',
      'Tarihi veya kutsal çağrışımlı terimleri kullanım öncesi doğrulayın.',
      'Arapça ve Latince çöl temalı dünyalarla doğal bir uyum yakalar.',
    ],
    nordic: [
      'Latin dışı alfabeler Eski Norsça yerine fonetik ses uyarlaması kullanır.',
      'Kurgu oyun adlarını gerçek İskandinav mirasıyla karıştırmayın.',
      'Nordik, İsveççe, Danca, Norveççe ve İngilizce kuzey seslerini korur.',
    ],
    medieval: [
      'Latin dışı çıktılar tarihsel köken yerine ses ritmine öncelik verir.',
      'Seçilen dil ortaçağ atmosferini Kelt, Kıta veya Nordik yöne çeker.',
      'Latince, Fransızca, İngilizce ve Almanca güçlü ortaçağ uyumu sunar.',
    ],
    business: [
      'Farklı alfabelere aktarımlar yerli okunabilirlik ve marka kontrolü ister.',
      'Tek doğru dil yoktur: hedef kitle, telaffuz ve alan adını birlikte tartın.',
      'Birincil müşteri kitlenize uygun dili tercih edin.',
    ],
    tech: [
      'Latin/Tech dışı uyarlamalar tanıdık teknik kökleri gizleyebilir.',
      'Kısa ve ASCII uyumlu adlar API ve yazılımlar için daha pratiktir.',
      'Cyber & Tech ve İngilizce modern dijital türetmeleri öne çıkarır.',
    ],
    creative: [
      'Latin dışı çıktılar kontrollü ve deneysel yaratıcı uyarlamalardır.',
      'Tür beklentilerini ve hedef okur kitlesinin okunabilirliğini gözetin.',
      'Hikayenizin kültürel tonuna uyan dili seçin.',
    ],
  },
  ja: {
    anime: [
      '日本語モードは公式の漢字人名ではなく、創作向けのカタカナ表現を生成します。',
      '日本の実務的な名付け規則よりもアニメ作品の様式美を反映しています。',
      '日本語ではアニメ調カタカナ、アラビア語では独自の音訳表現になります。',
    ],
    attested: [
      '検証済み名簿が未収録の文字体系では架空の実在名を自動生成しません。',
      '実在名の適切さは地域表記や文化・家庭の慣習に依存します。',
      '欧州ラテン系言語とアラビア語で検証済み名簿を利用できます。',
    ],
    phraseBank: [
      'Nordic・Latin・Tech などのモードは固有の装飾語彙を保持します。',
      '商用公開前にはネイティブ話者による自然な言い回しの確認をおすすめします。',
      '対応する28言語すべてに専用のフレーズ構造が用意されています。',
    ],
    desert: [
      'アラビア語出力は古典アラビア語文法ではなく音訳ベースの変換を行います。',
      '歴史的・宗教的な含意のある語句は使用前に敬意ある表現か確認してください。',
      'アラビア語やラテン語は砂漠・オアシスの世界観と自然に調和します。',
    ],
    nordic: [
      '非ラテン文字では古ノルド語の語形ではなく音の近似変換を用います。',
      '創作上のファンタジー名と実在の北欧文化遺産を区別してご使用ください。',
      'Nordic・スウェーデン語・デンマーク語・ノルウェー語・英語が響きを保ちます。',
    ],
    medieval: [
      '非ラテン文字への変換は歴史的語源よりも音のリズムを優先します。',
      '言語選択によりアーサー王風、欧州大陸風、北欧風など雰囲気が変わります。',
      'ラテン語・フランス語・英語・ドイツ語が中世ファンタジーに好適です。',
    ],
    business: [
      '別文字体系への音訳はネイティブの読みやすさと商標確認が不可欠です。',
      '唯一の正解言語はありません。対象市場と発音しやすさで選んでください。',
      '主要ターゲット顧客とドメイン戦略に合う言語を選択しましょう。',
    ],
    tech: [
      '非ラテン文字への創作変換では技術的な語根が分かりにくくなることがあります。',
      '短くASCII互換のある名前はAPIや開発ツールに適しています。',
      'Cyber & Tech と国際英語モードが明快なデジタル造語を際立たせます。',
    ],
    creative: [
      '非ラテン文字出力は制御された実験的アレンジとして扱われます。',
      'ジャンルの慣習と読者にとっての読みやすさを考慮してください。',
      '物語の雰囲気や対象読者に合った言語をお選びください。',
    ],
  },
  ko: {
    anime: [
      '일본어 모드는 공식 한자 이름이 아니라 창작용 가타카나 근사형을 생성합니다.',
      '실제 일본 호적 규칙보다 애니메이션 장르 관습을 반영합니다.',
      '일본어는 가타카나 애니풍을, 아랍어는 음차 기반의 다른 분위기를 만듭니다.',
    ],
    attested: [
      '검증된 명부가 없는 문자 체계에서는 가짜 실제 이름을 지어내지 않습니다.',
      '실제 이름 적합성은 지역 표기와 가족 관습에 따라 달라집니다.',
      '유럽 라틴 언어와 아랍어에서 검증된 이름 데이터를 제공합니다.',
    ],
    phraseBank: [
      '노르딕, 라틴, 테크 스타일은 고유한 테마 어휘를 유지합니다.',
      '상업적 사용 전 원어민 검토로 문맥 자연스러움을 확인하세요.',
      '28개 지원 언어 모두 카테고리에 맞는 문구 구조를 사용합니다.',
    ],
    desert: [
      '아랍어 출력은 고전 문법이 아닌 음차 방식으로 주제 어근을 옮깁니다.',
      '역사적·종교적 맥락이 있는 표현은 사용 전 신중히 검토하세요.',
      '아랍어와 라틴어는 사막·오아시스 세계관과 자연스럽게 어울립니다.',
    ],
    nordic: [
      '비라틴 문자는 고대 노르드어 어형 대신 소리 근사를 사용합니다.',
      '창작 게임 이름과 실제 북유럽 문화유산을 구분해 활용하세요.',
      '노르딕, 스웨덴어, 덴마크어, 노르웨이어, 영어가 북유럽 자음군을 살립니다.',
    ],
    medieval: [
      '비라틴 변환은 역사적 어원보다 음성 리듬을 우선합니다.',
      '선택한 언어에 따라 아서왕풍·유럽 대륙풍 등 분위기가 달라집니다.',
      '라틴어, 프랑스어, 영어, 독일어가 중세 판타지에 폭넓게 어울립니다.',
    ],
    business: [
      '타 문자 음차 결과는 원어민 가독성과 상표 확인이 필요합니다.',
      '단 하나의 정답 언어는 없으며 목표 시장과 발음 편의성을 고려해야 합니다.',
      '핵심 고객층의 언어와 브랜드 전략에 맞춰 선택하세요.',
    ],
    tech: [
      '비라틴 창작 변환은 익숙한 기술 어근 인식을 흐릴 수 있습니다.',
      '짧고 ASCII 호환이 되는 이름이 API와 개발 도구에 유리합니다.',
      'Cyber & Tech와 국제 영어 모드가 간결한 디지털 신조어를 강조합니다.',
    ],
    creative: [
      '비라틴 출력은 제어된 실험적 창작 변환 결과입니다.',
      '장르 독자의 기대와 가독성을 함께 고려하세요.',
      '작품의 문화적 톤에 가장 잘 맞는 언어를 선택하세요.',
    ],
  },
  zh: {
    anime: [
      '日语模式生成创意片假名近似形式，而非经过核验的正式汉字姓名。',
      '它体现动漫流行文化习惯，而非正式的日本户籍命名规范。',
      '日语可产出片假名动漫风，而阿拉伯语则会生成别具一格的音译风格。',
    ],
    attested: [
      '对于尚未收录核验名录的文字系统，系统不会凭空捏造真实人名。',
      '真实人名的适用性取决于地区拼写传统与家庭文化语境。',
      '拉丁语系、英语、法语及阿拉伯语可直接调用已核验人名库。',
    ],
    phraseBank: [
      '北欧、拉丁或科技等主题模式会保留特定风格化的词汇修饰。',
      '用于正式商业发布前，建议请母语者复核习惯用法与语气。',
      '全部 28 种语言均配备贴合该类别用途的本地化短语结构。',
    ],
    desert: [
      '阿拉伯语输出采用词根音译，而非严谨的古典阿拉伯语词法。',
      '使用带有历史或宗教色彩的词汇前请仔细核查以确保恰当得体。',
      '阿拉伯语或古典拉丁语能自然契合沙漠与古代近东题材。',
    ],
    nordic: [
      '非拉丁文字仅作语音近似转换，并不保留真实古诺尔斯语语法。',
      '请勿将虚构游戏名称与真实北欧历史文化遗产混为一谈。',
      '北欧符文、瑞典语、丹麦语、挪威语与英语最能留存北方音韵特征。',
    ],
    medieval: [
      '非拉丁文字转换侧重音节韵律，而非历史词源考据。',
      '所选语言会决定作品偏向亚瑟王风、欧陆风或跨文化奇幻质感。',
      '拉丁语、法语、英语和德语均可营造鲜明的中世纪史诗氛围。',
    ],
    business: [
      '转写为其他文字时需由母语者核对可读性，并开展商标检索。',
      '并无唯一最佳语言，请结合目标受众语言与发音习惯来选择。',
      '根据主要客户市场与国际传播需求选定生成语言。',
    ],
    tech: [
      '脱离拉丁/科技规范的转写可能会弱化常见的技术词根辨识度。',
      '简短且兼容 ASCII 的名称更适合软件包、API 与技术平台。',
      'Cyber & Tech 与通用英语模式擅长构建利落的数字新造词。',
    ],
    creative: [
      '非拉丁文字输出属于受控的实验性创意适配结果。',
      '请结合目标读者群体及类型文学的阅读预期加以甄选。',
      '选择最贴合故事文化基调与受众认知的语言。',
    ],
  },
  ru: {
    anime: [
      'Японский режим создаёт творческую катакану, а не официальные имена на кандзи.',
      'Отражает поп-культурные каноны аниме, а не японские правила ЗАГС.',
      'Японский даёт катакану в стиле аниме, а арабский — фонетическую транслитерацию.',
    ],
    attested: [
      'Система не выдумывает реальные имена для письменностей без проверенной базы.',
      'Уместность личного имени зависит от региональной орфографии и традиций.',
      'Европейские языки и арабский используют документированные справочники.',
    ],
    phraseBank: [
      'Тематические режимы (Nordic, Latin, Tech) добавляют стилистическую окраску.',
      'Перед коммерческой публикацией проверьте идиомы у носителя языка.',
      'Все 28 языков используют адаптированные фразовые шаблоны категории.',
    ],
    desert: [
      'Арабский вывод использует фонетическую транслитерацию корней.',
      'Проверяйте исторические и сакральные отсылки перед использованием.',
      'Арабский и латынь естественно поддерживают атмосферу пустыни и Древнего Востока.',
    ],
    nordic: [
      'Нелатинские письменности передают звучание без древнескандинавской морфологии.',
      'Отделяйте вымышленные игровые имена от реального скандинавского наследия.',
      'Nordic, шведский, датский, норвежский, немецкий и английский сохраняют звучание.',
    ],
    medieval: [
      'Нелатинская адаптация ставит звуковой ритм выше исторической этимологии.',
      'Язык меняет оттенок от артуровского до континентального средневековья.',
      'Латынь, французский, английский и немецкий дают аутентичное звучание.',
    ],
    business: [
      'Транслитерации в другие письменности требуют проверки носителем и поиска марок.',
      'Универсально лучшего языка нет: ориентируйтесь на рынок и произношение.',
      'Выберите язык вашей целевой аудитории и стратегии домена.',
    ],
    tech: [
      'Адаптации вне латиницы могут скрывать узнаваемые технические корни.',
      'Короткие ASCII-совместимые формы удобнее для API и программных продуктов.',
      'Cyber & Tech и международная латиница подчёркивают чёткие неологизмы.',
    ],
    creative: [
      'Нелатинские результаты представляют собой экспериментальную адаптацию.',
      'Учитывайте ожидания аудитории и лёгкость чтения в вашем жанре.',
      'Выберите язык, передающий нужное настроение вашего мира.',
    ],
  },
  hi: {
    anime: [
      'जापानी मोड रचनात्मक काताकाना बनाता है, प्रमाणित कांजी नाम नहीं।',
      'यह जापानी नागरिक नियमों के बजाय एनीमे पॉप-संस्कृति की परंपरा दर्शाता है।',
      'जापानी में एनीमे काताकाना और अरबी में ध्वन्यात्मक लिप्यंतरण मिलता है।',
    ],
    attested: [
      'जिन लिपियों का प्रमाणित संग्रह नहीं है, उनके लिए नकली वास्तविक नाम नहीं बनाए जाते।',
      'वास्तविक नाम की उपयुक्तता क्षेत्रीय वर्तनी और पारिवारिक परंपरा पर निर्भर करती है।',
      'यूरोपीय भाषाएँ और अरबी प्रमाणित नाम-संग्रह तक पहुँचती हैं।',
    ],
    phraseBank: [
      'नॉर्डिक, लैटिन या टेक शैलियाँ विशिष्ट शब्द-रंग बनाए रखती हैं।',
      'व्यावसायिक प्रकाशन से पहले मुहावरों की जांच मूल भाषी से कराएँ।',
      'सभी 28 भाषाओं में इस श्रेणी के अनुकूल वाक्यांश संरचनाएँ उपलब्ध हैं।',
    ],
    desert: [
      'अरबी आउटपुट शास्त्रीय व्याकरण के बजाय मूल शब्दों का ध्वन्यात्मक लिप्यंतरण है।',
      'ऐतिहासिक या पवित्र संदर्भों वाले शब्दों की प्रकाशन से पहले जांच करें।',
      'अरबी और शास्त्रीय लैटिन रेगिस्तानी व प्राचीन परिवेश के साथ सहज जुड़ते हैं।',
    ],
    nordic: [
      'गैर-लैटिन लिपियाँ प्राचीन नॉर्स व्याकरण के बजाय ध्वनि रूपांतरण उपयोग करती हैं।',
      'काल्पनिक गेमिंग नामों को वास्तविक नॉर्डिक विरासत से अलग रखें।',
      'नॉर्डिक, स्वीडिश, डेनिश, नॉर्वेजियन और अंग्रेज़ी मूल ध्वनि बनाए रखते हैं।',
    ],
    medieval: [
      'गैर-लैटिन रूपांतरण ऐतिहासिक व्युत्पत्ति के बजाय ध्वनि लय को प्राथमिकता देते हैं।',
      'भाषा का चयन मध्ययुगीन या काल्पनिक कथा का सांस्कृतिक स्वर तय करता है।',
      'लैटिन, फ़्रेंच, अंग्रेज़ी और जर्मन मध्यकालीन शैलियों में अच्छी तरह ढलते हैं।',
    ],
    business: [
      'अन्य लिपियों में लिप्यंतरण के लिए मूल भाषी पठनीयता और ट्रेडमार्क जांच आवश्यक है।',
      'कोई एक अनिवार्य भाषा नहीं है — बाज़ार और उच्चारण के अनुसार चुनें।',
      'अपने मुख्य ग्राहक वर्ग और ब्रांड रणनीति के अनुरूप भाषा चुनें।',
    ],
    tech: [
      'लैटिन/टेक से बाहर के रूपांतरण तकनीकी मूल शब्दों की पहचान छिपा सकते हैं।',
      'संक्षिप्त ASCII-अनुकूल नाम सॉफ्टवेयर और API के लिए बेहतर रहते हैं।',
      'Cyber & Tech और अंग्रेज़ी डिजिटल नवशब्दों को प्रमुखता देते हैं।',
    ],
    creative: [
      'गैर-लैटिन परिणाम नियंत्रित व प्रयोगात्मक रचनात्मक रूपांतरण हैं।',
      'अपनी शैली के पाठकों की अपेक्षा और पठनीयता का ध्यान रखें।',
      'ऐसी भाषा चुनें जो आपकी कहानी के सांस्कृतिक स्वर से मेल खाती हो।',
    ],
  },
  nl: {
    anime: [
      'De Japanse modus maakt creatieve katakana in plaats van officiële kanji-namen.',
      'Weerspiegelt anime-tropes in plaats van officiële Japanse naamregels.',
      'Japans levert katakana in animestijl; Arabisch biedt fonetische transliteratie.',
    ],
    attested: [
      'Verzint geen echte voornamen voor schriften zonder geverifieerde namenlijst.',
      'De geschiktheid van echte namen hangt af van regionale spelling en gebruik.',
      'Nederlands, andere Europese talen en Arabisch gebruiken gedocumenteerde lijsten.',
    ],
    phraseBank: [
      'Themastijlen zoals Nordic, Latijn of Tech behouden gestileerde woordkeus.',
      'Laat uitdrukkingen door een moedertaalspreker nalezen vóór commercieel gebruik.',
      'Alle 28 talen gebruiken speciaal afgestemde uitdrukkingsstructuren.',
    ],
    desert: [
      'Arabische uitvoer gebruikt fonetische transliteratie, geen klassieke grammatica.',
      'Controleer historische of religieuze termen voor een respectvolle weergave.',
      'Arabisch en Latijn sluiten natuurlijk aan bij woestijn- en oasethema’s.',
    ],
    nordic: [
      'Niet-Latijnse schriften passen klanken aan zonder Oudnoordse morfologie.',
      'Onderscheid fictieve namen van echt Scandinavisch cultureel erfgoed.',
      'Nordic, Zweeds, Deens, Noors, Duits en Engels behouden de noordelijke klank.',
    ],
    medieval: [
      'Niet-Latijnse resultaten kiezen klankcadans boven historische etymologie.',
      'De gekozen taal stuurt de sfeer richting Arthur- of continentale fantasy.',
      'Latijn, Frans, Engels en Duits versterken het middeleeuwse karakter.',
    ],
    business: [
      'Transliteraties vragen controle op leesbaarheid en merkregistratie.',
      'Er is geen enkele beste taal: weeg doelmarkt, uitspraak en domein af.',
      'Kies de taal die aansluit bij je primaire doelgroep.',
    ],
    tech: [
      'Aanpassingen buiten het Latijnse schrift kunnen technische stammen verbergen.',
      'Korte ASCII-vriendelijke namen werken het best voor software en API’s.',
      'Cyber & Tech en Engels benadrukken krachtige digitale neologismen.',
    ],
    creative: [
      'Niet-Latijnse resultaten blijven gecontroleerde experimentele aanpassingen.',
      'Let op de leesverwachtingen van je beoogde publiek.',
      'Kies de taal die past bij de culturele toon van je verhaal.',
    ],
  },
  pl: {
    anime: [
      'Tryb japoński tworzy twórczą katakanę, a nie oficjalne imiona kanji.',
      'Odzwierciedla konwencje anime zamiast oficjalnych zasad rejestru w Japonii.',
      'Japoński generuje katakanę anime, a arabski — transkrypcję fonetyczną.',
    ],
    attested: [
      'Nie zmyśla prawdziwych imion w pismach pozbawionych zweryfikowanego rejestru.',
      'Dobór prawdziwego imienia zależy od regionalnej pisowni i tradycji.',
      'Języki europejskie oraz arabski korzystają z udokumentowanych list imion.',
    ],
    phraseBank: [
      'Style tematyczne (Nordic, Łacina, Tech) zachowują stylizowane słownictwo.',
      'Przed publikacją komercyjną zweryfikuj idiomy z native speakerem.',
      'Wszystkie 28 języków korzystają z dopasowanych struktur frazowych.',
    ],
    desert: [
      'Wynik arabski opiera się na transliteracji fonetycznej, nie klasycznej gramatyce.',
      'Zweryfikuj pojęcia historyczne lub religijne przed użyciem w projekcie.',
      'Arabski i łacina naturalnie współgrają z motywami pustyni i orientu.',
    ],
    nordic: [
      'Pisma niełacińskie stosują adaptację dźwięku zamiast morfologii staronordyckiej.',
      'Oddzielaj fikcyjne nazwy do gier od historycznego dziedzictwa Skandynawii.',
      'Nordycki, szwedzki, duński, norweski i angielski oddają północne brzmienie.',
    ],
    medieval: [
      'Wersje niełacińskie przedkładają rytm fonetyczny nad etymologię historyczną.',
      'Wybór języka nadaje klimat arturiański, kontynentalny lub nordycki.',
      'Łacina, francuski, angielski i niemiecki świetnie oddają średniowieczny nastrój.',
    ],
    business: [
      'Transliteracje na inne alfabety wymagają sprawdzenia znaków towarowych.',
      'Nie ma jednego uniwersalnego języka — dopasuj go do rynku i wymowy.',
      'Wybierz język zgodny z grupą docelową i strategią domeny.',
    ],
    tech: [
      'Adaptacje poza alfabetem łacińskim mogą zacierać techniczne rdzenie.',
      'Krótkie nazwy zgodne z ASCII są najwygodniejsze dla API i narzędzi.',
      'Cyber & Tech oraz angielski podkreślają zwięzłe neologizmy cyfrowe.',
    ],
    creative: [
      'Wyniki w pismach niełacińskich to kontrolowane adaptacje eksperymentalne.',
      'Weź pod uwagę przyzwyczajenia czytelników i czytelność w danym gatunku.',
      'Wybierz język oddający pożądany ton kulturowy projektu.',
    ],
  },
  sv: {
    anime: [
      'Japanskt läge skapar kreativ katakana snarare än officiella kanji-namn.',
      'Speglar anime-konventioner snarare än japansk folkbokföring.',
      'Japanska ger anime-katakana medan arabiska ger fonetisk translitterering.',
    ],
    attested: [
      'Hittar inte på riktiga förnamn för skriftsystem utan verifierat register.',
      'Lämplighet för riktiga namn beror på regional stavning och familjetradition.',
      'Svenska, europeiska språk och arabiska hämtar från dokumenterade listor.',
    ],
    phraseBank: [
      'Temastilar som Nordisk, Latin eller Tech lägger till stiliserade ordformer.',
      'Granska uttryck med en modersmålstalare före kommersiell lansering.',
      'Alla 28 språk använder anpassade frasmönster för denna kategori.',
    ],
    desert: [
      'Arabiska använder fonetisk translitterering snarare än klassisk grammatik.',
      'Kontrollera historiska eller heliga uttryck för respektfull användning.',
      'Arabiska och latin harmonierar väl med öken- och orientteman.',
    ],
    nordic: [
      'Icke-latinska skrifter gör ljudanpassning i stället för äkta fornnordiska.',
      'Skilj fiktiva spelnamn från verkligt nordiskt kulturarv.',
      'Nordisk, svenska, danska, norska, tyska och engelska bevarar nordisk klang.',
    ],
    medieval: [
      'Icke-latinska former prioriterar ljudrytm framför historisk etymologi.',
      'Språkvalet styr stämningen mot arturiansk, europeisk eller nordisk fantasy.',
      'Latin, franska, engelska och svenska ger tydlig medeltida prägel.',
    ],
    business: [
      'Translitterering kräver granskning av läsbarhet och varumärkesskydd.',
      'Inget enskilt språk är bäst för alla: utgå från målmarknad och uttal.',
      'Välj det språk som matchar er huvudsakliga kundkrets.',
    ],
    tech: [
      'Anpassningar utanför latinsk skrift kan dölja välkända teknikrötter.',
      'Korta ASCII-vänliga namn passar bäst för API:er och programvara.',
      'Cyber & Tech och engelska lyfter fram skarpa digitala nybildningar.',
    ],
    creative: [
      'Icke-latinska resultat bygger på kontrollerad experimentell anpassning.',
      'Tänk på genrens läsbarhet och publikens förväntningar.',
      'Välj det språk som bäst bär berättelsens stämning.',
    ],
  },
  vi: {
    anime: [
      'Chế độ tiếng Nhật tạo katakana sáng tạo chứ không phải tên kanji chính thức.',
      'Phản ánh phong cách anime đại chúng hơn là quy tắc hộ tịch Nhật Bản.',
      'Tiếng Nhật tạo dạng katakana anime, còn tiếng Ả Rập phiên âm ngữ âm khác biệt.',
    ],
    attested: [
      'Không tự bịa tên thật cho hệ chữ chưa có danh mục kiểm chứng.',
      'Sự phù hợp của tên thật phụ thuộc vào tập quán vùng miền và chính tả.',
      'Tiếng Việt, các ngôn ngữ Latin và tiếng Ả Rập dùng danh sách được ghi nhận.',
    ],
    phraseBank: [
      'Các phong cách Nordic, Latin hoặc Tech giữ lớp từ vựng mang sắc thái riêng.',
      'Nên rà soát thành ngữ với người bản ngữ trước khi phát hành thương mại.',
      'Cả 28 ngôn ngữ đều dùng cấu trúc cụm từ được điều chỉnh riêng.',
    ],
    desert: [
      'Tiếng Ả Rập dùng phiên âm ngữ âm thay cho ngữ pháp Ả Rập cổ điển.',
      'Kiểm tra kỹ thuật ngữ lịch sử hoặc tôn giáo trước khi xuất bản.',
      'Tiếng Ả Rập và Latin hòa hợp tự nhiên với bối cảnh sa mạc và phương Đông.',
    ],
    nordic: [
      'Hệ chữ phi Latin chỉ mô phỏng âm thanh chứ không giữ ngữ pháp Bắc Âu cổ.',
      'Phân biệt tên game hư cấu với di sản văn hóa Bắc Âu thực tế.',
      'Nordic, Thụy Điển, Đan Mạch, Na Uy và Anh giữ rõ âm sắc phương Bắc.',
    ],
    medieval: [
      'Các dạng phi Latin ưu tiên nhịp điệu âm thanh hơn từ nguyên lịch sử.',
      'Ngôn ngữ được chọn định hình không khí Arthur, châu Âu hay giả tưởng.',
      'Latin, Pháp, Anh và Đức tạo sắc thái hiệp sĩ trung cổ rõ nét.',
    ],
    business: [
      'Phiên âm sang hệ chữ khác cần kiểm tra khả năng đọc và nhãn hiệu.',
      'Không có một ngôn ngữ tối ưu duy nhất: cân nhắc thị trường và phát âm.',
      'Chọn ngôn ngữ khớp với nhóm khách hàng mục tiêu của bạn.',
    ],
    tech: [
      'Chuyển thể ngoài chữ Latin có thể làm mờ gốc từ kỹ thuật quen thuộc.',
      'Tên ngắn tương thích ASCII thuận tiện hơn cho API và phần mềm.',
      'Cyber & Tech và tiếng Anh làm nổi bật các từ mới gọn gàng cho công nghệ.',
    ],
    creative: [
      'Kết quả ở hệ chữ phi Latin là bản chuyển thể sáng tạo mang tính thử nghiệm.',
      'Cân nhắc khả năng đọc và kỳ vọng thể loại của độc giả.',
      'Chọn ngôn ngữ phù hợp nhất với sắc thái văn hóa của dự án.',
    ],
  },
  id: {
    anime: [
      'Mode Jepang menghasilkan katakana kreatif, bukan nama kanji resmi.',
      'Mencerminkan gaya pop anime alih-alih aturan catatan sipil Jepang.',
      'Bahasa Jepang menghasilkan katakana anime; Arab memberi transliterasi fonetis.',
    ],
    attested: [
      'Tidak mengarang nama asli untuk aksara yang belum memiliki daftar terverifikasi.',
      'Kesesuaian nama asli bergantung pada kebiasaan ejaan wilayah dan keluarga.',
      'Bahasa Latin Eropa dan Arab mengakses direktori nama yang terdokumentasi.',
    ],
    phraseBank: [
      'Gaya tematik seperti Nordic, Latin, atau Tech mempertahankan kosakata khusus.',
      'Tinjau ungkapan bersama penutur asli sebelum penggunaan komersial.',
      'Seluruh 28 bahasa memakai struktur frasa yang disesuaikan untuk kategori ini.',
    ],
    desert: [
      'Keluaran Arab memakai transliterasi fonetis akar kata, bukan tata bahasa klasik.',
      'Periksa istilah sejarah atau sakral sebelum dipakai agar tetap pantas.',
      'Bahasa Arab dan Latin selaras dengan tema gurun dan dunia kuno.',
    ],
    nordic: [
      'Aksara non-Latin hanya mengadaptasi bunyi tanpa morfologi Nordik Kuno.',
      'Bedakan nama fantasi gim dari warisan budaya Nordik yang sesungguhnya.',
      'Nordic, Swedia, Denmark, Norwegia, dan Inggris menjaga nuansa konsonan utara.',
    ],
    medieval: [
      'Hasil non-Latin mengutamakan irama bunyi dibanding etimologi sejarah.',
      'Bahasa yang dipilih menentukan nuansa antara kisah Arthurian atau Eropa.',
      'Latin, Prancis, Inggris, dan Jerman cocok untuk atmosfer abad pertengahan.',
    ],
    business: [
      'Transliterasi lintas aksara memerlukan uji keterbacaan dan cek merek.',
      'Tidak ada satu bahasa wajib: pertimbangkan pasar sasaran dan pelafalan.',
      'Sesuaikan bahasa dengan audiens utama serta strategi domain Anda.',
    ],
    tech: [
      'Adaptasi di luar huruf Latin dapat mengaburkan akar istilah teknis.',
      'Nama ringkas yang ramah ASCII lebih efektif untuk API dan perangkat lunak.',
      'Cyber & Tech dan bahasa Inggris menonjolkan neologisme digital modern.',
    ],
    creative: [
      'Hasil aksara non-Latin merupakan adaptasi kreatif yang bersifat eksperimental.',
      'Pertimbangkan keterbacaan dan ekspektasi pembaca di genre Anda.',
      'Pilih bahasa yang paling selaras dengan nuansa cerita proyek Anda.',
    ],
  },
  th: {
    anime: [
      'โหมดภาษาญี่ปุ่นสร้างคำคาตาคานะเชิงสร้างสรรค์ ไม่ใช่ชื่อคันจิทางการ',
      'สะท้อนขนบเรื่องเล่าอนิเมะมากกว่ากฎทะเบียนราษฎร์ญี่ปุ่นจริง',
      'ภาษาญี่ปุ่นให้คาตาคานะแนวอนิเมะ ส่วนอาหรับเป็นการถอดเสียงอีกอารมณ์หนึ่ง',
    ],
    attested: [
      'ระบบจะไม่แต่งชื่อบุคคลจริงขึ้นเองสำหรับอักษรที่ยังไม่มีฐานข้อมูลยืนยัน',
      'ความเหมาะสมของชื่อจริงขึ้นอยู่กับการสะกดและบริบททางวัฒนธรรมท้องถิ่น',
      'ภาษายุโรปอักษรละตินและภาษาอาหรับเข้าถึงคลังชื่อที่มีการบันทึกไว้จริง',
    ],
    phraseBank: [
      'สไตล์เฉพาะทางอย่าง Nordic, Latin หรือ Tech คงชุดคำที่ปรุงแต่งเฉพาะธีม',
      'ควรให้เจ้าของภาษาตรวจสำนวนก่อนนำไปใช้เผยแพร่เชิงพาณิชย์',
      'ทั้ง 28 ภาษาใช้โครงสร้างวลีที่ปรับให้เหมาะกับหมวดหมู่นี้โดยเฉพาะ',
    ],
    desert: [
      'ผลลัพธ์ภาษาอาหรับใช้การถอดเสียงตามรากคำ ไม่ใช่ไวยากรณ์อาหรับคลาสสิก',
      'ควรตรวจสอบคำที่เกี่ยวข้องกับประวัติศาสตร์หรือศาสนาอย่างระมัดระวัง',
      'ภาษาอาหรับและละตินสอดคล้องกับบรรยากาศทะเลทรายและตะวันออกโบราณ',
    ],
    nordic: [
      'ระบบอักษรที่ไม่ใช่ละตินปรับเสียงอ่านแทนโครงสร้างภาษานอร์สโบราณ',
      'แยกแยะชื่อเกมแฟนตาซีออกจากมรดกทางวัฒนธรรมนอร์ดิกที่แท้จริง',
      'Nordic, สวีเดน, เดนมาร์ก, นอร์เวย์ และอังกฤษคงเสียงพยัญชนะแถบเหนือไว้',
    ],
    medieval: [
      'การปรับเป็นอักษรอื่นเน้นจังหวะเสียงมากกว่านิรุกติศาสตร์ทางประวัติศาสตร์',
      'ภาษาที่เลือกจะกำหนดกลิ่นอายระหว่างตำนานอาเธอร์ ยุโรป หรือแฟนตาซี',
      'ละติน ฝรั่งเศส อังกฤษ และเยอรมันถ่ายทอดบรรยากาศยุคกลางได้อย่างลงตัว',
    ],
    business: [
      'การถอดเสียงข้ามระบบอักษรต้องตรวจความอ่านง่ายและการจดทะเบียนเครื่องหมายการค้า',
      'ไม่มีภาษาเดียวที่ตายตัว ให้พิจารณาตลาดเป้าหมาย การออกเสียง และชื่อโดเมน',
      'เลือกภาษาที่ตรงกับกลุ่มลูกค้าหลักของแบรนด์คุณ',
    ],
    tech: [
      'การดัดแปลงนอกอักษรละตินอาจทำให้รากศัพท์ทางเทคนิคสังเกตได้ยากขึ้น',
      'ชื่อสั้นที่รองรับ ASCII เหมาะกับซอฟต์แวร์และ API มากกว่า',
      'Cyber & Tech และภาษาอังกฤษเน้นคำประดิษฐ์ยุคดิจิทัลที่กระชับ',
    ],
    creative: [
      'ผลลัพธ์นอกอักษรละตินเป็นการดัดแปลงเชิงสร้างสรรค์แบบทดลอง',
      'คำนึงถึงความลื่นไหลในการอ่านและความคาดหวังของผู้อ่านในแนวนั้น',
      'เลือกภาษาที่สื่อถึงอารมณ์ทางวัฒนธรรมของเรื่องราวได้ตรงที่สุด',
    ],
  },
  el: {
    anime: [
      'Η ιαπωνική λειτουργία παράγει δημιουργικά katakana, όχι επίσημα ονόματα kanji.',
      'Αντικατοπτρίζει αφηγηματικές συμβάσεις anime αντί ιαπωνικών ληξιαρχικών κανόνων.',
      'Τα ιαπωνικά δίνουν μορφές katakana, ενώ τα αραβικά προσφέρουν φωνητική μεταγραφή.',
    ],
    attested: [
      'Δεν επινοεί πραγματικά ονόματα σε γραφές χωρίς επαληθευμένο κατάλογο.',
      'Η καταλληλότητα εξαρτάται από τοπικούς ορθογραφικούς και οικογενειακούς κανόνες.',
      'Ευρωπαϊκές γλώσσες και αραβικά αξιοποιούν τεκμηριωμένα ευρετήρια ονομάτων.',
    ],
    phraseBank: [
      'Θεματικά στυλ όπως Nordic, Latin ή Tech διατηρούν ιδιαίτερο λεξιλόγιο.',
      'Ελέγξτε τις εκφράσεις με φυσικό ομιλητή πριν από εμπορική δημοσίευση.',
      'Και οι 28 γλώσσες χρησιμοποιούν ειδικά προσαρμοσμένες δομές φράσεων.',
    ],
    desert: [
      'Τα αραβικά εφαρμόζουν φωνητική μεταγραφή ριζών και όχι κλασική γραμματική.',
      'Ελέγξτε ιστορικούς ή ιερούς όρους για σεβαστή πολιτισμική χρήση.',
      'Αραβικά και λατινικά δένουν φυσικά με θέματα ερήμου και αρχαίας Ανατολής.',
    ],
    nordic: [
      'Μη λατινικές γραφές αποδίδουν ήχους χωρίς αυθεντική παλαιονορδική μορφολογία.',
      'Διαχωρίστε τα φανταστικά ονόματα παιχνιδιών από την ιστορική σκανδιναβική κληρονομιά.',
      'Nordic, σουηδικά, δανικά, νορβηγικά και αγγλικά διατηρούν το βόρειο ύφος.',
    ],
    medieval: [
      'Μη λατινικές αποδόσεις προτάσσουν τον ηχητικό ρυθμό έναντι της ετυμολογίας.',
      'Η γλώσσα στρέφει το ύφος προς αρθουριανό, ευρωπαϊκό ή μυθικό μεσαίωνα.',
      'Λατινικά, γαλλικά, αγγλικά και ελληνικά προσφέρουν διακριτή επική ατμόσφαιρα.',
    ],
    business: [
      'Οι μεταγραφές σε άλλες γραφές απαιτούν έλεγχο αναγνωσιμότητας και εμπορικών σημάτων.',
      'Δεν υπάρχει μία μοναδική γλώσσα: ζυγίστε αγορά, προφορά και domain.',
      'Επιλέξτε τη γλώσσα που ταιριάζει στο βασικό σας κοινό.',
    ],
    tech: [
      'Προσαρμογές εκτός λατινικού αλφαβήτου ενδέχεται να κρύβουν τεχνικές ρίζες.',
      'Σύντομα ονόματα συμβατά με ASCII υπερέχουν σε API και εργαλεία λογισμικού.',
      'Cyber & Tech και αγγλικά αναδεικνύουν σύγχρονους ψηφιακούς νεολογισμούς.',
    ],
    creative: [
      'Τα αποτελέσματα σε μη λατινικές γραφές αποτελούν ελεγχόμενες πειραματικές μορφές.',
      'Λάβετε υπόψη τις προσδοκίες ανάγνωσης του κοινού σας.',
      'Επιλέξτε τη γλώσσα που αποδίδει καλύτερα το ύφος του έργου σας.',
    ],
  },
  he: {
    anime: [
      'מצב יפנית יוצר קאטאקאנה יצירתית ולא שמות קנג׳י רשמיים.',
      'משקף מוסכמות אנימה פופולריות ולא כללי מרשם אזרחי ביפן.',
      'יפנית מפיקה קאטאקאנה בסגנון אנימה, בעוד ערבית יוצרת תעתיק פונטי.',
    ],
    attested: [
      'המערכת נמנעת מהמצאת שמות אמיתיים במערכות כתב ללא מאגר מאומת.',
      'התאמת שם אמיתי תלויה בכתיב מקומי ובמסורת משפחתית.',
      'שפות לטיניות וערבית ניגשות למאגרי שמות מתועדים.',
    ],
    phraseBank: [
      'סגנונות נושאיים כמו נורדי, לטיני או טכנולוגי שומרים על אוצר מילים מסוגנן.',
      'בדקו ביטויים מול דובר שפת אם לפני פרסום מסחרי.',
      'כל 28 השפות משתמשות במבני ביטויים המותאמים לקטגוריה זו.',
    ],
    desert: [
      'הפלט בערבית משתמש בתעתיק פונטי ולא בדקדוק ערבי קלאסי.',
      'בדקו מונחים בעלי הקשר היסטורי או מקודש לפני שימוש מסחרי.',
      'ערבית ולטינית קלאסית משתלבות בטבעיות עם מוטיבים מדבריים.',
    ],
    nordic: [
      'מערכות כתב לא-לטיניות מבצעות התאמת צליל ללא מורפולוגיה נורדית עתיקה.',
      'הבדילו בין שמות פנטזיה למשחקים לבין מורשת נורדית היסטורית.',
      'נורדית, שוודית, דנית, נורווגית ואנגלית משמרות את הצליל הצפוני.',
    ],
    medieval: [
      'התאמות לא-לטיניות שמות דגש על קצב צלילי על פני אטימולוגיה היסטורית.',
      'בחירת השפה מכוונת את האווירה לכיוון ארתוריאני, אירופי או מיתי.',
      'לטינית, צרפתית, אנגלית וגרמנית מעניקות מרקם ימי-ביניימי עשיר.',
    ],
    business: [
      'תעתיקים לכתבים אחרים מחייבים בדיקת קריאות ורישום סימני מסחר.',
      'אין שפה אחת מחייבת: שקלו את שפת הלקוחות, ההגייה ושם הדומיין.',
      'בחרו בשפה המתאימה לקהל היעד המרכזי של המותג.',
    ],
    tech: [
      'התאמות מחוץ לכתב לטיני עלולות לטשטש שורשים טכניים מוכרים.',
      'שמות קצרים תואמי-ASCII מתאימים יותר לתוכנה ולממשקי API.',
      'Cyber & Tech ואנגלית מדגישות חידושי לשון טכנולוגיים חדים.',
    ],
    creative: [
      'תוצאות בכתבים לא-לטיניים הן התאמות יצירתיות ניסיוניות ומבוקרות.',
      'קחו בחשבון את ציפיות הקריאה והז׳אנר של הקהל שלכם.',
      'בחרו בשפה המשקפת בצורה הטובה ביותר את הטון של הפרויקט.',
    ],
  },
  cs: {
    anime: [
      'Japonský režim vytváří tvůrčí katakanu, nikoli úředně doložená jména v kandži.',
      'Odráží stylové konvence anime spíše než japonské matriční zvyklosti.',
      'Japonština dává anime katakanu, zatímco arabština nabízí fonetický přepis.',
    ],
    attested: [
      'Nevymýšlí falešná skutečná jména pro písma bez ověřeného rejstříku.',
      'Vhodnost skutečného jména závisí na regionálním pravopisu a tradici.',
      'Evropské jazyky a arabština čerpají z dokumentovaných seznamů jmen.',
    ],
    phraseBank: [
      'Tematické styly (Nordic, Latina, Tech) přidávají stylizovanou slovní zásobu.',
      'Před komerčním použitím ověřte obraty s rodilým mluvčím.',
      'Všech 28 jazyků využívá redakčně připravené větné struktury.',
    ],
    desert: [
      'Arabský výstup používá fonetický přepis kořenů místo klasické gramatiky.',
      'Před použitím prověřte historické či posvátné výrazy kvůli korektnosti.',
      'Arabština i latina přirozeně ladí s pouštní a starověkou tématikou.',
    ],
    nordic: [
      'Nelatinská písma přizpůsobují zvuky bez staroseverské morfologie.',
      'Odlišujte herní fantasy jména od skutečného severského dědictví.',
      'Nordic, švédština, dánština, norština a angličtina uchovávají severský zvuk.',
    ],
    medieval: [
      'Nelatinské varianty upřednostňují zvukový rytmus před historickou etymologií.',
      'Volba jazyka posouvá ladění k artušovskému, kontinentálnímu či mýtickému stylu.',
      'Latina, francouzština, angličtina a němčina podtrhují rytířskou atmosféru.',
    ],
    business: [
      'Přepisy do jiných písem vyžadují kontrolu čitelnosti a ochranných známek.',
      'Neexistuje jediný nejlepší jazyk — rozhoduje cílový trh a výslovnost.',
      'Zvolte jazyk odpovídající vaší hlavní zákaznické základně.',
    ],
    tech: [
      'Adaptace mimo latinku mohou skrýt běžně rozpoznatelné technické kořeny.',
      'Krátké názvy slučitelné s ASCII jsou praktičtější pro API a software.',
      'Cyber & Tech a angličtina zdůrazňují úderné digitální novotvary.',
    ],
    creative: [
      'Nelatinské výsledky jsou řízené experimentální tvůrčí adaptace.',
      'Zohledněte čitelnost a očekávání čtenářů daného žánru.',
      'Vyberte jazyk, který nejlépe vystihuje tón vašeho projektu.',
    ],
  },
  ro: {
    anime: [
      'Modul japonez produce katakana creative, nu nume oficiale în kanji.',
      'Reflectă convențiile stilistice anime, nu regulile de stare civilă japoneze.',
      'Japoneza generează katakana anime, iar araba aplică transliterare fonetică.',
    ],
    attested: [
      'Evită inventarea de prenume reale pentru scrieri fără registru verificat.',
      'Potrivirea numelor reale depinde de ortografia regională și contextul familial.',
      'Limbile europene și araba folosesc registre documentate de prenume.',
    ],
    phraseBank: [
      'Stilurile tematice (Nordic, Latină, Tech) păstrează un vocabular stilizat.',
      'Verificați expresiile cu un vorbitor nativ înainte de utilizarea comercială.',
      'Toate cele 28 de limbi accesează structuri editoriale dedicate categoriei.',
    ],
    desert: [
      'Ieșirea în arabă folosește transliterare fonetică, nu gramatică clasică.',
      'Verificați termenii cu rezonanță istorică sau sacră pentru utilizare adecvată.',
      'Araba și latina clasică se potrivesc firesc atmosferei deșertice.',
    ],
    nordic: [
      'Scrierile non-latine adaptează sunetele fără morfologie nordică veche.',
      'Separați numele fantastice de patrimoniul istoric scandinav real.',
      'Nordic, suedeza, daneza, norvegiana și engleza păstrează sonoritățile nordice.',
    ],
    medieval: [
      'Adaptările non-latine prioritizează cadența sonoră față de etimologia istorică.',
      'Limba aleasă orientează atmosfera spre registrul arturian sau european.',
      'Latina, franceza, engleza și româna susțin variate nuanțe medievale.',
    ],
    business: [
      'Transliterările în alte grafii cer verificare nativă și de marcă înregistrată.',
      'Nu există o limbă unică obligatorie: analizați piața țintă și pronunția.',
      'Alegeți limba potrivită publicului principal și strategiei de domeniu.',
    ],
    tech: [
      'Adaptările în afara alfabetului latin pot ascunde rădăcinile tehnice.',
      'Formele scurte compatibile ASCII sunt mai practice pentru API și software.',
      'Cyber & Tech și engleza pun accent pe neologisme digitale clare.',
    ],
    creative: [
      'Rezultatele în scrieri non-latine sunt adaptări creative experimentale.',
      'Luați în calcul lizibilitatea și așteptările publicului de gen.',
      'Selectați limba care reflectă cel mai bine tonul cultural dorit.',
    ],
  },
  da: {
    anime: [
      'Japansk tilstand laver kreativ katakana og ikke officielle kanji-navne.',
      'Afspejler anime-konventioner frem for japansk folkeregisterpraksis.',
      'Japansk giver katakana-anime, mens arabisk giver fonetisk translitteration.',
    ],
    attested: [
      'Opfinder ikke rigtige fornavne for skriftsystemer uden bekræftet liste.',
      'Egnethed for rigtige navne afhænger af lokal stavemåde og tradition.',
      'Europæiske sprog og arabisk henter fra dokumenterede navnelister.',
    ],
    phraseBank: [
      'Temastilarter som Nordisk, Latin og Tech tilføjer stiliseret ordforråd.',
      'Gennemgå udtryk med en modersmålstaler før kommerciel udgivelse.',
      'Alle 28 sprog anvender særligt tilpassede frasestrukturer.',
    ],
    desert: [
      'Arabisk bruger fonetisk translitteration af rødder frem for klassisk grammatik.',
      'Kontrollér historiske eller religiøse udtryk før brug for respektfuld omtale.',
      'Arabisk og klassisk latin passer naturligt til ørken- og orienttemaer.',
    ],
    nordic: [
      'Ikke-latinske skrifter tilpasser lyde uden ægte oldnordisk bøjning.',
      'Adskil fiktive spilnavne fra reel nordisk kulturarv.',
      'Nordisk, svensk, dansk, norsk, tysk og engelsk bevarer nordiske konsonanter.',
    ],
    medieval: [
      'Ikke-latinske udgaver prioriterer lydrytme over historisk etymologi.',
      'Sprogvalget former stemningen mod arturiansk, europæisk eller nordisk fantasy.',
      'Latin, fransk, dansk og engelsk passer bredt til middelalderuniverser.',
    ],
    business: [
      'Translitterationer kræver modersmålstjek og varemærkesøgning.',
      'Intet enkelt sprog er bedst: vurder målmarked, udtale og domænestrategi.',
      'Vælg det sprog der matcher din primære kundegruppe.',
    ],
    tech: [
      'Tilpasninger uden for latinsk skrift kan sløre genkendelige teknikrødder.',
      'Korte ASCII-egnede navne fungerer bedst til API’er og software.',
      'Cyber & Tech og engelsk fremhæver skarpe digitale nydannelser.',
    ],
    creative: [
      'Ikke-latinske resultater er kontrollerede eksperimentelle tilpasninger.',
      'Tag hensyn til læsbarhed og målgruppens forventninger.',
      'Vælg det sprog der bedst indfanger historiens kulturelle tone.',
    ],
  },
  fi: {
    anime: [
      'Japani-tila tuottaa luovaa katakanaa eikä virallisia kanji-nimiä.',
      'Heijastaa anime-konventioita eikä japanilaista väestörekisterikäytäntöä.',
      'Japani tuottaa anime-katakanaa ja arabia foneettista translitterointia.',
    ],
    attested: [
      'Ei keksi vääriä oikeita etunimiä kirjoitusjärjestelmille ilman vahvistettua luetteloa.',
      'Oikeiden nimien sopivuus riippuu paikallisesta oikeinkirjoituksesta ja perinteistä.',
      'Eurooppalaiset kielet ja arabia käyttävät dokumentoituja nimipankkeja.',
    ],
    phraseBank: [
      'Teematyylit kuten Pohjoinen, Latina tai Tech säilyttävät oman tyylisävyn.',
      'Tarkistuta ilmaukset äidinkielisellä ennen kaupallista julkaisua.',
      'Kaikki 28 kieltä hyödyntävät tälle luokalle räätälöityjä ilmaisurakenteita.',
    ],
    desert: [
      'Arabia käyttää juurien foneettista translitterointia klassisen kieliopin sijaan.',
      'Tarkista historialliset ja pyhät viittaukset huolellisesti ennen käyttöä.',
      'Arabia ja latina sulautuvat luontevasti aavikko- ja muinaisteemoihin.',
    ],
    nordic: [
      'Ei-latinalaiset kirjaimistot sovittavat äänteitä ilman muinaisnorjan kielioppia.',
      'Erota kuvitteelliset pelinimet aidosta pohjoismaisesta kulttuuriperinnöstä.',
      'Pohjoinen, ruotsi, tanska, norja ja englanti säilyttävät pohjoisen soinnin.',
    ],
    medieval: [
      'Ei-latinalaiset muodot painottavat äänirytmiä historiallisen etymologian sijaan.',
      'Kieli ohjaa tunnelmaa kohti arthurilaista, eurooppalaista tai pohjoista fantasiaa.',
      'Latina, ranska, englanti ja saksa tarjoavat luontevia keskiaikaisia sävyjä.',
    ],
    business: [
      'Translitteraatiot muille kirjaimistoille vaativat natiivitarkistuksen ja tavaramerkkihaun.',
      'Yhtä ainoaa oikeaa kieltä ei ole — punnitse kohdemarkkina ja ääntäminen.',
      'Valitse kieli ensisijaisen asiakaskuntasi ja bränditavoitteiden mukaan.',
    ],
    tech: [
      'Latinalaisen kirjaimiston ulkopuoliset mukautukset voivat peittää tekniset juuret.',
      'Lyhyet ASCII-yhteensopivat nimet toimivat parhaiten ohjelmistoissa ja API-rajapinnoissa.',
      'Cyber & Tech ja englanti korostavat ytimekkäitä digitaalisia uudissanoja.',
    ],
    creative: [
      'Ei-latinalaiset tulokset ovat hallittuja kokeellisia luovia mukautuksia.',
      'Huomioi lajityypin odotukset ja luettavuus kohdeyleisölle.',
      'Valitse kieli, joka tukee parhaiten tarinasi sävyä.',
    ],
  },
  uk: {
    anime: [
      'Японський режим створює творчу катакану, а не офіційні імена кандзі.',
      'Відображає канони аніме замість формальних правил японських реєстрів.',
      'Японська формує катакану аніме, а арабська — фонетичну транслітерацію.',
    ],
    attested: [
      'Не вигадує справжні імена для писемностей без перевіреного довідника.',
      'Доречність реального імені залежить від регіонального правопису та традицій.',
      'Європейські мови та арабська використовують документовані бази імен.',
    ],
    phraseBank: [
      'Тематичні режими (Nordic, Латина, Tech) зберігають стилізовану лексику.',
      'Перевіряйте вислови з носієм мови перед комерційною публікацією.',
      'Усі 28 мов використовують спеціально адаптовані фразові структури.',
    ],
    desert: [
      'Арабський вивід застосовує фонетичну транслітерацію замість класичної граматики.',
      'Перевіряйте історичні або сакральні поняття перед публічним використанням.',
      'Арабська й латина природно пасують до пустельної та стародавньої тематики.',
    ],
    nordic: [
      'Нелатинські писемності адаптують звуки без давньоскандинавської морфології.',
      'Відокремлюйте вигадані ігрові імена від реальної скандинавської спадщини.',
      'Nordic, шведська, данська, норвезька й англійська зберігають північне звучання.',
    ],
    medieval: [
      'Нелатинські адаптації надають перевагу звуковому ритму над етимологією.',
      'Вибір мови змінює настрій між артурівським, європейським і міфічним стилем.',
      'Латина, французька, англійська та німецька добре пасують до середньовіччя.',
    ],
    business: [
      'Транслітерації на інші абетки потребують перевірки носієм і реєстру марок.',
      'Немає єдиної обов’язкової мови — враховуйте ринок, вимову й домен.',
      'Обирайте мову відповідно до вашої цільової аудиторії.',
    ],
    tech: [
      'Адаптації поза латинкою можуть приховувати знайомі технічні корені.',
      'Короткі ASCII-сумісні форми зручніші для API та програмних продуктів.',
      'Cyber & Tech та англійська підкреслюють чіткі цифрові неологізми.',
    ],
    creative: [
      'Нелатинські результати є контрольованою експериментальною адаптацією.',
      'Враховуйте читабельність та очікування аудиторії вашого жанру.',
      'Оберіть мову, що найкраще передає настрій вашого проєкту.',
    ],
  },
  bn: {
    anime: [
      'জাপানি মোড যাচাইকৃত কাঞ্জি নামের বদলে সৃজনশীল কাতাকানা রূপ তৈরি করে।',
      'এটি জাপানি সরকারি নিবন্ধন নিয়মের চেয়ে অ্যানিমে সংস্কৃতির রীতি অনুসরণ করে।',
      'জাপানি অ্যানিমে কাতাকানা দেয়, আর আরবি ভিন্ন আবহের ধ্বনিগত প্রতিবর্ণীকরণ তৈরি করে।',
    ],
    attested: [
      'যাচাইকৃত তালিকা নেই এমন লিপিতে কাল্পনিক বাস্তব নাম বানানো হয় না।',
      'বাস্তব নামের উপযুক্ততা আঞ্চলিক বানান ও পারিবারিক ঐতিহ্যের ওপর নির্ভর করে।',
      'ইউরোপীয় ভাষা ও আরবি নথিভুক্ত নামভাণ্ডার ব্যবহার করে।',
    ],
    phraseBank: [
      'নর্ডিক, লাতিন বা টেক শৈলীগুলোতে নিজস্ব শব্দচয়ন বজায় থাকে।',
      'বাণিজ্যিক প্রকাশনার আগে মূল ভাষীর মাধ্যমে বাগধারা যাচাই করে নিন।',
      'সমর্থিত ২৮টি ভাষাতেই এই বিভাগের উপযোগী বাক্যাংশ কাঠামো রয়েছে।',
    ],
    desert: [
      'আরবি ফলাফলে ধ্রুপদি ব্যাকরণের বদলে ধ্বনিভিত্তিক প্রতিবর্ণীকরণ ব্যবহৃত হয়।',
      'ঐতিহাসিক বা ধর্মীয় তাৎপর্যপূর্ণ শব্দ ব্যবহারের আগে সতর্কভাবে যাচাই করুন।',
      'আরবি এবং ধ্রুপদি লাতিন মরুভূমি ও প্রাচ্যের প্রেক্ষাপটের সাথে মানানসই।',
    ],
    nordic: [
      'অ-লাতিন লিপিগুলো প্রাচীন নর্স ব্যাকরণের বদলে ধ্বনির অনুকরণ ব্যবহার করে।',
      'কাল্পনিক গেমিং নামকে বাস্তব নর্ডিক ঐতিহ্য থেকে আলাদা রাখুন।',
      'নর্ডিক, সুইডিশ, ডেনিশ, নরওয়েজিয়ান ও ইংরেজি উত্তর ইউরোপীয় ধ্বনি ধরে রাখে।',
    ],
    medieval: [
      'অ-লাতিন রূপান্তর ঐতিহাসিক ব্যুৎপত্তির বদলে ধ্বনির ছন্দকে অগ্রাধিকার দেয়।',
      'নির্বাচিত ভাষা মধ্যযুগীয় আখ্যানকে ইউরোপীয় বা পৌরাণিক আবহে রূপ দেয়।',
      'লাতিন, ফরাসি, ইংরেজি ও জার্মান মধ্যযুগীয় মহাকাব্যিক পরিবেশে মানায়।',
    ],
    business: [
      'অন্য লিপিতে প্রতিবর্ণীকরণে পাঠযোগ্যতা ও ট্রেডমার্ক যাচাই জরুরি।',
      'একটি বাধ্যতামূলক ভাষা নেই — লক্ষ্য বাজার ও উচ্চারণ বিবেচনা করে বেছে নিন।',
      'আপনার মূল গ্রাহক ও আন্তর্জাতিক ব্র্যান্ড কৌশল অনুযায়ী ভাষা নির্বাচন করুন।',
    ],
    tech: [
      'লাতিন/টেক রীতির বাইরে রূপান্তর পরিচিত প্রযুক্তিগত মূল শব্দ আড়াল করতে পারে।',
      'সংক্ষিপ্ত ASCII-উপযোগী নাম API ও সফটওয়্যারের জন্য বেশি কার্যকর।',
      'Cyber & Tech ও ইংরেজি ডিজিটাল নবশব্দগুলোকে স্পষ্টভাবে তুলে ধরে।',
    ],
    creative: [
      'অ-লাতিন ফলাফলগুলো নিয়ন্ত্রিত পরীক্ষামূলক সৃজনশীল রূপান্তর।',
      'আপনার ঘরানার পাঠকদের প্রত্যাশা ও পাঠযোগ্যতা বিবেচনা করুন।',
      'গল্পের সাংস্কৃতিক আবহের সাথে সবচেয়ে মানানসই ভাষাটি বেছে নিন।',
    ],
  },
  nb: {
    anime: [
      'Japansk modus lager kreativ katakana i stedet for offisielle kanji-navn.',
      'Gjenspeiler anime-konvensjoner fremfor japanske folkeregisterregler.',
      'Japansk gir katakana i animestil, mens arabisk gir fonetisk translitterasjon.',
    ],
    attested: [
      'Finner ikke på falske ekte fornavn for skriftsystemer uten bekreftet liste.',
      'Egnethet for ekte navn avhenger av lokal stavemåte og familietradisjon.',
      'Europeiske språk og arabisk bruker dokumenterte navnelister.',
    ],
    phraseBank: [
      'Temastiler som Nordisk, Latin eller Tech beholder stilisert ordforråd.',
      'La en morsmålsbruker se over uttrykk før kommersiell publisering.',
      'Alle 28 språk bruker tilpassede frasestrukturer for kategorien.',
    ],
    desert: [
      'Arabisk bruker fonetisk translitterasjon av røtter fremfor klassisk grammatikk.',
      'Kontroller historiske eller hellige uttrykk før bruk for respektfull gjengivelse.',
      'Arabisk og klassisk latin passer naturlig sammen med ørkentemaer.',
    ],
    nordic: [
      'Ikke-latinske skrifter bruker lydtilpasning uten ekte norrøn grammatikk.',
      'Skill fiktive spillnavn fra virkelig skandinavisk kulturarv.',
      'Nordisk, svensk, dansk, norsk bokmål og engelsk bevarer nordisk klang.',
    ],
    medieval: [
      'Ikke-latinske utgaver prioriterer lydrytme fremfor historisk etymologi.',
      'Språkvalget styrer stemningen mot arthuriansk, europeisk eller nordisk fantasy.',
      'Latin, fransk, norsk og engelsk gir troverdige middelaldernyanser.',
    ],
    business: [
      'Translitterasjoner krever vurdering av lesbarhet og varemerkesøk.',
      'Det finnes ikke ett eneste fasitspråk — vurder målmarked, uttale og domene.',
      'Velg språket som passer din viktigste målgruppe.',
    ],
    tech: [
      'Tilpasninger utenfor latinsk skrift kan skjule gjenkjennelige tekniske røtter.',
      'Korte ASCII-vennlige navn fungerer best for API-er og programvare.',
      'Cyber & Tech og engelsk fremhever kompakte digitale nyord.',
    ],
    creative: [
      'Ikke-latinske resultater er kontrollerte eksperimentelle tilpasninger.',
      'Ta hensyn til sjangerens lesbarhet og publikums forventninger.',
      'Velg språket som best gjenspeiler prosjektets kulturelle tone.',
    ],
  },
};

function hydrateEnhancementLabels(): Record<EnhancementLocale, EnhancementLabels> {
  const result = { ...ENHANCEMENT_LABELS } as Record<EnhancementLocale, EnhancementLabels>;
  (Object.keys(COMPACT_SHARED_DOMAIN_NOTES) as Exclude<EnhancementLocale, 'en' | 'fr'>[]).forEach(
    (loc) => {
      const base = result[loc];
      const exportOverride = COMPACT_EXPORT_LABELS[loc];
      const shared = COMPACT_SHARED_DOMAIN_NOTES[loc];
      const hydratedNotes = {} as EnhancementLabels['compatibility']['domainNotes'];
      (Object.keys(shared) as ProfileDomainKey[]).forEach((domainKey) => {
        const [limitations, cultural, example] = shared[domainKey];
        hydratedNotes[domainKey] = {
          whyFit: base.compatibility.domainNotes[domainKey].whyFit,
          limitations,
          cultural,
          example,
        };
      });
      result[loc] = {
        compare: {
          ...base.compare,
          exportTxt: exportOverride.exportTxt,
          exportJson: exportOverride.exportJson,
        },
        compatibility: {
          ...base.compatibility,
          domainNotes: hydratedNotes,
        },
      };
    }
  );
  return result;
}

const FULL_ENHANCEMENT_LABELS = hydrateEnhancementLabels();

export function getEnhancementsLabels(language: string): EnhancementLabels {
  const canonical = resolveCanonicalLocale(language) as EnhancementLocale;
  return FULL_ENHANCEMENT_LABELS[canonical] || FULL_ENHANCEMENT_LABELS.en;
}

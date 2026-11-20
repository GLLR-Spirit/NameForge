import React, { useEffect, useMemo, useState } from 'react';
import { useGeneratorLocalization } from '../hooks/useGeneratorLocalization';
import { Search, ArrowRight, Dices, X, Sparkles, Clock } from 'lucide-react';
import { ALL_GENERATORS_LIST, GENERATOR_FAMILIES_CONFIG } from '../data/generators';
import { GeneratorId, HistoryEntry, LanguageCode } from '../types';
import { getAppSettings, subscribeToSettings } from '../services/settings';
import { getGenerationHistory, subscribeToStorage } from '../services/storage';
import { normalizeSearchText } from '../services/search';
import { getShellLabels } from '../i18n/shell';
import { getGeneratorDiscoveryLabels } from '../i18n/generatorDiscoveryLabels';
import {
  DiscoveryModeFilter,
  DiscoveryThemeFilter,
  FEATURED_GENERATOR_IDS,
  getGeneratorEngineMode,
  getGeneratorThemeBucket,
  getRecentlyUsedGenerators,
} from '../services/generatorDiscovery';
import { getTextDirection } from '../utils/locale';

interface GeneratorsListViewProps {
  onNavigate: (view: string, generatorId?: GeneratorId | string) => void;
  initialCategory?: string;
}

interface CatalogueLocaleCopy {
  eyebrow: string;
  title: string;
  description: string;
  search: string;
  random: string;
  randomTitle: string;
  shown: string;
  of: string;
  clear: string;
  forge: string;
  empty: string;
  reset: string;
  generatorWord: string;
  searchDescriptions: string;
  sortLabel: string;
  sortRelevance: string;
  sortAlphabetical: string;
  categories: Record<string, string>;
}

const CATALOGUE_COPY: Partial<Record<LanguageCode, CatalogueLocaleCopy>> = {
  en: {
    eyebrow: 'Complete catalogue of',
    title: 'All Name Generators',
    description: 'Explore specialized tools for brands, businesses, novels, anime heroes, RPG campaigns, science, technology, and imaginary worlds.',
    search: 'Search generators (e.g. brand, dragon, anime)...',
    random: 'Random',
    randomTitle: 'Open a random generator',
    shown: 'Showing',
    of: 'of',
    clear: 'Clear search',
    forge: 'Forge',
    empty: 'No generators match',
    reset: 'Reset filters',
    generatorWord: 'generators',
    searchDescriptions: 'Search descriptions and guides',
    sortLabel: 'Sort:',
    sortRelevance: 'Relevance',
    sortAlphabetical: 'Alphabetical',
    categories: { all: 'All', fantasy: 'Fantasy & Myth', business: 'Business & Projects', creative: 'Creative & Media', innovation: 'Innovation & Tech' },
  },
  fr: {
    eyebrow: 'Catalogue complet des',
    title: 'Tous les générateurs de noms',
    description: 'Explorez nos outils spécialisés pour les marques, commerces, romans, héros d’anime, campagnes RPG, sciences, technologies et univers imaginaires.',
    search: 'Rechercher un générateur (ex. marque, dragon, anime)...',
    random: 'Aléatoire',
    randomTitle: 'Ouvrir un générateur aléatoire',
    shown: 'Affichage de',
    of: 'sur',
    clear: 'Effacer la recherche',
    forge: 'Forger',
    empty: 'Aucun générateur ne correspond à',
    reset: 'Réinitialiser les filtres',
    generatorWord: 'générateurs',
    searchDescriptions: 'Inclure les descriptions et guides',
    sortLabel: 'Trier :',
    sortRelevance: 'Pertinence',
    sortAlphabetical: 'Alphabétique',
    categories: { all: 'Tous', fantasy: 'Fantasy & Mythes', business: 'Entreprises & Projets', creative: 'Création & Médias', innovation: 'Innovation & Tech' },
  },
  ar: {
    eyebrow: 'الفهرس الكامل لـ',
    title: 'جميع مولدات الأسماء',
    description: 'اكتشف أدوات متخصصة للعلامات التجارية والشركات والروايات وأبطال الأنمي وحملات تقمص الأدوار والعلوم والتقنية والعوالم الخيالية.',
    search: 'ابحث عن مولّد (مثل علامة تجارية أو تنين أو أنمي)...',
    random: 'عشوائي',
    randomTitle: 'افتح مولّدًا عشوائيًا',
    shown: 'عرض',
    of: 'من',
    clear: 'مسح البحث',
    forge: 'أنشئ',
    empty: 'لا توجد مولدات تطابق',
    reset: 'إعادة ضبط عوامل التصفية',
    generatorWord: 'مولدات',
    searchDescriptions: 'تضمين الأوصاف والأدلة',
    sortLabel: 'ترتيب:',
    sortRelevance: 'الصلة',
    sortAlphabetical: 'أبجدي',
    categories: { all: 'الكل', fantasy: 'الخيال والأساطير', business: 'الأعمال والمشاريع', creative: 'الإبداع والإعلام', innovation: 'الابتكار والتقنية' },
  },
  es: {
    eyebrow: 'Catálogo completo de',
    title: 'Todos los generadores de nombres',
    description: 'Explora herramientas especializadas para marcas, negocios, novelas, héroes de anime, campañas de rol, ciencia, tecnología y mundos imaginarios.',
    search: 'Buscar generadores (p. ej., marca, dragón, anime)...',
    random: 'Aleatorio',
    randomTitle: 'Abrir un generador aleatorio',
    shown: 'Mostrando',
    of: 'de',
    clear: 'Borrar búsqueda',
    forge: 'Crear',
    empty: 'Ningún generador coincide con',
    reset: 'Restablecer filtros',
    generatorWord: 'generadores',
    searchDescriptions: 'Incluir descripciones y guías',
    sortLabel: 'Ordenar:',
    sortRelevance: 'Relevancia',
    sortAlphabetical: 'Alfabético',
    categories: { all: 'Todos', fantasy: 'Fantasía y mitos', business: 'Empresas y proyectos', creative: 'Creación y medios', innovation: 'Innovación y tecnología' },
  },
  de: {
    eyebrow: 'Vollständiger Katalog mit',
    title: 'Alle Namensgeneratoren',
    description: 'Entdecke spezialisierte Tools für Marken, Unternehmen, Romane, Anime-Helden, RPG-Kampagnen, Wissenschaft, Technologie und Fantasiewelten.',
    search: 'Generatoren suchen (z. B. Marke, Drache, Anime)...',
    random: 'Zufällig',
    randomTitle: 'Zufälligen Generator öffnen',
    shown: 'Angezeigt',
    of: 'von',
    clear: 'Suche löschen',
    forge: 'Erstellen',
    empty: 'Keine Generatoren gefunden für',
    reset: 'Filter zurücksetzen',
    generatorWord: 'Generatoren',
    searchDescriptions: 'Beschreibungen und Leitfäden durchsuchen',
    sortLabel: 'Sortierung:',
    sortRelevance: 'Relevanz',
    sortAlphabetical: 'Alphabetisch',
    categories: { all: 'Alle', fantasy: 'Fantasy & Mythen', business: 'Unternehmen & Projekte', creative: 'Kreatives & Medien', innovation: 'Innovation & Technik' },
  },
  it: {
    eyebrow: 'Catalogo completo di',
    title: 'Tutti i generatori di nomi',
    description: 'Esplora strumenti specializzati per marchi, aziende, romanzi, eroi anime, campagne RPG, scienza, tecnologia e mondi immaginari.',
    search: 'Cerca generatori (es. marchio, drago, anime)...',
    random: 'Casuale',
    randomTitle: 'Apri un generatore casuale',
    shown: 'Visualizzati',
    of: 'di',
    clear: 'Cancella ricerca',
    forge: 'Crea',
    empty: 'Nessun generatore corrisponde a',
    reset: 'Reimposta filtri',
    generatorWord: 'generatori',
    searchDescriptions: 'Cerca anche in descrizioni e guide',
    sortLabel: 'Ordina:',
    sortRelevance: 'Rilevanza',
    sortAlphabetical: 'Alfabetico',
    categories: { all: 'Tutti', fantasy: 'Fantasy e miti', business: 'Aziende e progetti', creative: 'Creatività e media', innovation: 'Innovazione e tecnologia' },
  },
  pt: {
    eyebrow: 'Catálogo completo de',
    title: 'Todos os geradores de nomes',
    description: 'Explore ferramentas especializadas para marcas, empresas, romances, heróis de anime, campanhas de RPG, ciência, tecnologia e mundos imaginários.',
    search: 'Pesquisar geradores (ex.: marca, dragão, anime)...',
    random: 'Aleatório',
    randomTitle: 'Abrir um gerador aleatório',
    shown: 'A mostrar',
    of: 'de',
    clear: 'Limpar pesquisa',
    forge: 'Criar',
    empty: 'Nenhum gerador corresponde a',
    reset: 'Redefinir filtros',
    generatorWord: 'geradores',
    searchDescriptions: 'Incluir descrições e guias',
    sortLabel: 'Ordenar:',
    sortRelevance: 'Relevância',
    sortAlphabetical: 'Alfabética',
    categories: { all: 'Todos', fantasy: 'Fantasia e mitos', business: 'Empresas e projetos', creative: 'Criação e mídia', innovation: 'Inovação e tecnologia' },
  },
  tr: {
    eyebrow: 'Tam katalog:',
    title: 'Tüm İsim Oluşturucular',
    description: 'Markalar, işletmeler, romanlar, anime kahramanları, RPG kampanyaları, bilim, teknoloji ve hayalî dünyalar için özel araçları keşfedin.',
    search: 'Oluşturucu ara (ör. marka, ejderha, anime)...',
    random: 'Rastgele',
    randomTitle: 'Rastgele oluşturucu aç',
    shown: 'Gösterilen',
    of: '/',
    clear: 'Aramayı temizle',
    forge: 'Oluştur',
    empty: 'Şununla eşleşen oluşturucu yok:',
    reset: 'Filtreleri sıfırla',
    generatorWord: 'oluşturucu',
    searchDescriptions: 'Açıklamalar ve rehberlerde ara',
    sortLabel: 'Sırala:',
    sortRelevance: 'İlgi düzeyi',
    sortAlphabetical: 'Alfabetik',
    categories: { all: 'Tümü', fantasy: 'Fantastik ve Mitler', business: 'İşletme ve Projeler', creative: 'Yaratıcılık ve Medya', innovation: 'Yenilik ve Teknoloji' },
  },
  ja: {
    eyebrow: '完全なカタログ：',
    title: 'すべての名前ジェネレーター',
    description: 'ブランド、企業、小説、アニメのヒーロー、RPGキャンペーン、科学、技術、想像上の世界向けの専用ツールを探しましょう。',
    search: 'ジェネレーターを検索（例：ブランド、ドラゴン、アニメ）...',
    random: 'ランダム',
    randomTitle: 'ランダムなジェネレーターを開く',
    shown: '表示中',
    of: '/',
    clear: '検索をクリア',
    forge: '作成',
    empty: '一致するジェネレーターはありません：',
    reset: 'フィルターをリセット',
    generatorWord: 'ジェネレーター',
    searchDescriptions: '説明とガイドも検索対象にする',
    sortLabel: '並び替え：',
    sortRelevance: '関連度',
    sortAlphabetical: '名前順',
    categories: { all: 'すべて', fantasy: 'ファンタジーと神話', business: 'ビジネスとプロジェクト', creative: '創作とメディア', innovation: 'イノベーションと技術' },
  },
  ko: {
    eyebrow: '전체 카탈로그:',
    title: '모든 이름 생성기',
    description: '브랜드, 기업, 소설, 애니메이션 영웅, RPG 캠페인, 과학, 기술 및 상상 속 세계를 위한 전문 도구를 탐색하세요.',
    search: '생성기 검색 (예: 브랜드, 드래곤, 애니메이션)...',
    random: '무작위',
    randomTitle: '무작위 생성기 열기',
    shown: '표시',
    of: '/',
    clear: '검색 지우기',
    forge: '생성',
    empty: '일치하는 생성기가 없습니다:',
    reset: '필터 초기화',
    generatorWord: '생성기',
    searchDescriptions: '설명 및 가이드 포함 검색',
    sortLabel: '정렬:',
    sortRelevance: '관련성',
    sortAlphabetical: '가나다/알파벳순',
    categories: { all: '전체', fantasy: '판타지 및 신화', business: '비즈니스 및 프로젝트', creative: '창작 및 미디어', innovation: '혁신 및 기술' },
  },
  zh: {
    eyebrow: '完整目录：',
    title: '所有名称生成器',
    description: '探索适用于品牌、企业、小说、动漫英雄、角色扮演游戏、科学、技术和幻想世界的专业工具。',
    search: '搜索生成器（例如品牌、巨龙、动漫）...',
    random: '随机',
    randomTitle: '打开随机生成器',
    shown: '显示',
    of: '/',
    clear: '清除搜索',
    forge: '生成',
    empty: '没有符合条件的生成器：',
    reset: '重置筛选',
    generatorWord: '个生成器',
    searchDescriptions: '搜索简介与指南',
    sortLabel: '排序：',
    sortRelevance: '相关性',
    sortAlphabetical: '按字母顺序',
    categories: { all: '全部', fantasy: '奇幻与神话', business: '商业与项目', creative: '创作与媒体', innovation: '创新与科技' },
  },
  ru: {
    eyebrow: 'Полный каталог:',
    title: 'Все генераторы имён',
    description: 'Изучите инструменты для брендов, компаний, романов, героев аниме, ролевых игр, науки, технологий и вымышленных миров.',
    search: 'Поиск генераторов (например, бренд, дракон, аниме)...',
    random: 'Случайный',
    randomTitle: 'Открыть случайный генератор',
    shown: 'Показано',
    of: 'из',
    clear: 'Очистить поиск',
    forge: 'Создать',
    empty: 'Нет подходящих генераторов:',
    reset: 'Сбросить фильтры',
    generatorWord: 'генераторов',
    searchDescriptions: 'Искать в описаниях и руководствах',
    sortLabel: 'Сортировка:',
    sortRelevance: 'По релевантности',
    sortAlphabetical: 'По алфавиту',
    categories: { all: 'Все', fantasy: 'Фэнтези и мифы', business: 'Бизнес и проекты', creative: 'Творчество и медиа', innovation: 'Инновации и технологии' },
  },
  hi: {
    eyebrow: 'पूरा कैटलॉग:',
    title: 'सभी नाम जनरेटर',
    description: 'ब्रांड, व्यवसाय, उपन्यास, एनीमे नायकों, RPG अभियानों, विज्ञान, तकनीक और काल्पनिक दुनिया के लिए विशेष टूल खोजें।',
    search: 'जनरेटर खोजें (जैसे ब्रांड, ड्रैगन, एनीमे)...',
    random: 'यादृच्छिक',
    randomTitle: 'कोई भी जनरेटर खोलें',
    shown: 'दिखाए गए',
    of: 'में से',
    clear: 'खोज हटाएँ',
    forge: 'बनाएँ',
    empty: 'कोई मेल खाता जनरेटर नहीं:',
    reset: 'फ़िल्टर रीसेट करें',
    generatorWord: 'जनरेटर',
    searchDescriptions: 'विवरण और गाइड में भी खोजें',
    sortLabel: 'क्रमबद्ध करें:',
    sortRelevance: 'प्रासंगिकता',
    sortAlphabetical: 'वर्णानुक्रम',
    categories: { all: 'सभी', fantasy: 'फैंटेसी और मिथक', business: 'व्यवसाय और परियोजनाएँ', creative: 'रचनात्मकता और मीडिया', innovation: 'नवाचार और तकनीक' },
  },
  nl: {
    eyebrow: 'Volledige catalogus van',
    title: 'Alle naamgeneratoren',
    description: 'Ontdek gespecialiseerde tools voor merken, bedrijven, romans, animehelden, RPG-campagnes, wetenschap, technologie en fantasiewerelden.',
    search: 'Generatoren zoeken (bijv. merk, draak, anime)...',
    random: 'Willekeurig',
    randomTitle: 'Willekeurige generator openen',
    shown: 'Weergegeven',
    of: 'van',
    clear: 'Zoekopdracht wissen',
    forge: 'Maken',
    empty: 'Geen generatoren gevonden voor',
    reset: 'Filters wissen',
    generatorWord: 'generatoren',
    searchDescriptions: 'Ook beschrijvingen en gidsen doorzoeken',
    sortLabel: 'Sorteren:',
    sortRelevance: 'Relevantie',
    sortAlphabetical: 'Alfabetisch',
    categories: { all: 'Alles', fantasy: 'Fantasy en mythen', business: 'Bedrijven en projecten', creative: 'Creatief en media', innovation: 'Innovatie en technologie' },
  },
  pl: {
    eyebrow: 'Pełny katalog:',
    title: 'Wszystkie generatory nazw',
    description: 'Odkrywaj narzędzia do tworzenia nazw marek, firm, powieści, bohaterów anime, kampanii RPG, nauki, technologii i fikcyjnych światów.',
    search: 'Szukaj generatorów (np. marka, smok, anime)...',
    random: 'Losowy',
    randomTitle: 'Otwórz losowy generator',
    shown: 'Wyświetlono',
    of: 'z',
    clear: 'Wyczyść wyszukiwanie',
    forge: 'Utwórz',
    empty: 'Brak pasujących generatorów:',
    reset: 'Resetuj filtry',
    generatorWord: 'generatorów',
    searchDescriptions: 'Szukaj w opisach i poradnikach',
    sortLabel: 'Sortuj:',
    sortRelevance: 'Trafność',
    sortAlphabetical: 'Alfabetycznie',
    categories: { all: 'Wszystkie', fantasy: 'Fantasy i mity', business: 'Firmy i projekty', creative: 'Kreatywność i media', innovation: 'Innowacje i technologia' },
  },
  sv: {
    eyebrow: 'Hela katalogen:',
    title: 'Alla namngeneratorer',
    description: 'Utforska verktyg för varumärken, företag, romaner, animehjältar, rollspelskampanjer, vetenskap, teknik och fantasivärldar.',
    search: 'Sök generatorer (t.ex. varumärke, drake, anime)...',
    random: 'Slumpmässig',
    randomTitle: 'Öppna en slumpmässig generator',
    shown: 'Visar',
    of: 'av',
    clear: 'Rensa sökning',
    forge: 'Skapa',
    empty: 'Inga generatorer matchar',
    reset: 'Återställ filter',
    generatorWord: 'generatorer',
    searchDescriptions: 'Sök även i beskrivningar och guider',
    sortLabel: 'Sortera:',
    sortRelevance: 'Relevans',
    sortAlphabetical: 'Alfabetisk',
    categories: { all: 'Alla', fantasy: 'Fantasy och myter', business: 'Företag och projekt', creative: 'Kreativitet och media', innovation: 'Innovation och teknik' },
  },
  vi: {
    eyebrow: 'Danh mục đầy đủ:',
    title: 'Tất cả công cụ tạo tên',
    description: 'Khám phá công cụ chuyên biệt cho thương hiệu, doanh nghiệp, tiểu thuyết, anh hùng anime, chiến dịch RPG, khoa học, công nghệ và thế giới tưởng tượng.',
    search: 'Tìm công cụ (ví dụ: thương hiệu, rồng, anime)...',
    random: 'Ngẫu nhiên',
    randomTitle: 'Mở công cụ ngẫu nhiên',
    shown: 'Đang hiển thị',
    of: 'trên',
    clear: 'Xóa tìm kiếm',
    forge: 'Tạo',
    empty: 'Không có công cụ phù hợp với',
    reset: 'Đặt lại bộ lọc',
    generatorWord: 'công cụ',
    searchDescriptions: 'Tìm cả trong mô tả và hướng dẫn',
    sortLabel: 'Sắp xếp:',
    sortRelevance: 'Mức độ liên quan',
    sortAlphabetical: 'Theo bảng chữ cái',
    categories: { all: 'Tất cả', fantasy: 'Fantasy và thần thoại', business: 'Kinh doanh và dự án', creative: 'Sáng tạo và truyền thông', innovation: 'Đổi mới và công nghệ' },
  },
  id: {
    eyebrow: 'Katalog lengkap:',
    title: 'Semua Generator Nama',
    description: 'Jelajahi alat khusus untuk merek, bisnis, novel, pahlawan anime, kampanye RPG, sains, teknologi, dan dunia imajinatif.',
    search: 'Cari generator (mis. merek, naga, anime)...',
    random: 'Acak',
    randomTitle: 'Buka generator acak',
    shown: 'Menampilkan',
    of: 'dari',
    clear: 'Hapus pencarian',
    forge: 'Buat',
    empty: 'Tidak ada generator yang cocok dengan',
    reset: 'Atur ulang filter',
    generatorWord: 'generator',
    searchDescriptions: 'Cari di deskripsi dan panduan',
    sortLabel: 'Urutkan:',
    sortRelevance: 'Relevansi',
    sortAlphabetical: 'Alfabetis',
    categories: { all: 'Semua', fantasy: 'Fantasi dan mitos', business: 'Bisnis dan proyek', creative: 'Kreatif dan media', innovation: 'Inovasi dan teknologi' },
  },
  th: {
    eyebrow: 'แคตตาล็อกทั้งหมด:',
    title: 'เครื่องมือสร้างชื่อทั้งหมด',
    description: 'สำรวจเครื่องมือเฉพาะสำหรับแบรนด์ ธุรกิจ นิยาย ฮีโร่อนิเมะ แคมเปญ RPG วิทยาศาสตร์ เทคโนโลยี และโลกจินตนาการ',
    search: 'ค้นหาเครื่องมือ (เช่น แบรนด์ มังกร อนิเมะ)...',
    random: 'สุ่ม',
    randomTitle: 'เปิดเครื่องมือแบบสุ่ม',
    shown: 'แสดง',
    of: 'จาก',
    clear: 'ล้างการค้นหา',
    forge: 'สร้าง',
    empty: 'ไม่พบเครื่องมือที่ตรงกับ',
    reset: 'รีเซ็ตตัวกรอง',
    generatorWord: 'เครื่องมือ',
    searchDescriptions: 'ค้นหาในคำอธิบายและคู่มือด้วย',
    sortLabel: 'เรียงลำดับ:',
    sortRelevance: 'ความเกี่ยวข้อง',
    sortAlphabetical: 'ตามตัวอักษร',
    categories: { all: 'ทั้งหมด', fantasy: 'แฟนตาซีและตำนาน', business: 'ธุรกิจและโครงการ', creative: 'ความคิดสร้างสรรค์และสื่อ', innovation: 'นวัตกรรมและเทคโนโลยี' },
  },
  el: {
    eyebrow: 'Πλήρης κατάλογος:',
    title: 'Όλες οι γεννήτριες ονομάτων',
    description: 'Εξερευνήστε εργαλεία για επωνυμίες, επιχειρήσεις, μυθιστορήματα, ήρωες anime, καμπάνιες RPG, επιστήμη, τεχνολογία και φανταστικούς κόσμους.',
    search: 'Αναζήτηση (π.χ. επωνυμία, δράκος, anime)...',
    random: 'Τυχαίο',
    randomTitle: 'Άνοιγμα τυχαίας γεννήτριας',
    shown: 'Εμφανίζονται',
    of: 'από',
    clear: 'Εκκαθάριση αναζήτησης',
    forge: 'Δημιουργία',
    empty: 'Δεν βρέθηκαν γεννήτριες για',
    reset: 'Επαναφορά φίλτρων',
    generatorWord: 'γεννήτριες',
    searchDescriptions: 'Αναζήτηση και σε περιγραφές και οδηγούς',
    sortLabel: 'Ταξινόμηση:',
    sortRelevance: 'Συνάφεια',
    sortAlphabetical: 'Αλφαβητικά',
    categories: { all: 'Όλα', fantasy: 'Φαντασία και μύθοι', business: 'Επιχειρήσεις και έργα', creative: 'Δημιουργία και μέσα', innovation: 'Καινοτομία και τεχνολογία' },
  },
  he: {
    eyebrow: 'הקטלוג המלא:',
    title: 'כל מחוללי השמות',
    description: 'גלו כלים ייעודיים למותגים, עסקים, רומנים, גיבורי אנימה, קמפיינים של משחקי תפקידים, מדע, טכנולוגיה ועולמות דמיוניים.',
    search: 'חיפוש מחוללים (למשל מותג, דרקון, אנימה)...',
    random: 'אקראי',
    randomTitle: 'פתיחת מחולל אקראי',
    shown: 'מוצגים',
    of: 'מתוך',
    clear: 'ניקוי החיפוש',
    forge: 'יצירה',
    empty: 'לא נמצאו מחוללים התואמים ל־',
    reset: 'איפוס מסננים',
    generatorWord: 'מחוללים',
    searchDescriptions: 'חיפוש גם בתיאורים ובמדריכים',
    sortLabel: 'מיון:',
    sortRelevance: 'רלוונטיות',
    sortAlphabetical: 'סדר אלפביתי',
    categories: { all: 'הכול', fantasy: 'פנטזיה ומיתוסים', business: 'עסקים ופרויקטים', creative: 'יצירה ומדיה', innovation: 'חדשנות וטכנולוגיה' },
  },
  cs: {
    eyebrow: 'Úplný katalog:',
    title: 'Všechny generátory jmen',
    description: 'Prozkoumejte nástroje pro značky, firmy, romány, anime hrdiny, RPG kampaně, vědu, technologie a imaginární světy.',
    search: 'Hledat generátory (např. značka, drak, anime)...',
    random: 'Náhodný',
    randomTitle: 'Otevřít náhodný generátor',
    shown: 'Zobrazeno',
    of: 'z',
    clear: 'Vymazat hledání',
    forge: 'Vytvořit',
    empty: 'Žádné generátory neodpovídají',
    reset: 'Obnovit filtry',
    generatorWord: 'generátorů',
    searchDescriptions: 'Hledat i v popisech a průvodcích',
    sortLabel: 'Řazení:',
    sortRelevance: 'Relevance',
    sortAlphabetical: 'Abecedně',
    categories: { all: 'Vše', fantasy: 'Fantasy a mýty', business: 'Firmy a projekty', creative: 'Tvorba a média', innovation: 'Inovace a technologie' },
  },
  ro: {
    eyebrow: 'Catalog complet:',
    title: 'Toate generatoarele de nume',
    description: 'Explorează instrumente pentru mărci, companii, romane, eroi anime, campanii RPG, știință, tehnologie și lumi imaginare.',
    search: 'Caută generatoare (ex. marcă, dragon, anime)...',
    random: 'Aleatoriu',
    randomTitle: 'Deschide un generator aleatoriu',
    shown: 'Se afișează',
    of: 'din',
    clear: 'Șterge căutarea',
    forge: 'Creează',
    empty: 'Niciun generator nu corespunde cu',
    reset: 'Resetează filtrele',
    generatorWord: 'generatoare',
    searchDescriptions: 'Caută și în descrieri și ghiduri',
    sortLabel: 'Sortare:',
    sortRelevance: 'Relevanță',
    sortAlphabetical: 'Alfabetic',
    categories: { all: 'Toate', fantasy: 'Fantezie și mituri', business: 'Afaceri și proiecte', creative: 'Creativitate și media', innovation: 'Inovație și tehnologie' },
  },
  da: {
    eyebrow: 'Hele kataloget:',
    title: 'Alle navnegeneratorer',
    description: 'Udforsk specialværktøjer til brands, virksomheder, romaner, animehelte, RPG-kampagner, videnskab, teknologi og fantasiverdener.',
    search: 'Søg generatorer (f.eks. brand, drage, anime)...',
    random: 'Tilfældig',
    randomTitle: 'Åbn en tilfældig generator',
    shown: 'Viser',
    of: 'af',
    clear: 'Ryd søgning',
    forge: 'Opret',
    empty: 'Ingen generatorer matcher',
    reset: 'Nulstil filtre',
    generatorWord: 'generatorer',
    searchDescriptions: 'Søg også i beskrivelser og guider',
    sortLabel: 'Sortér:',
    sortRelevance: 'Relevans',
    sortAlphabetical: 'Alfabetisk',
    categories: { all: 'Alle', fantasy: 'Fantasy og myter', business: 'Virksomheder og projekter', creative: 'Kreativitet og medier', innovation: 'Innovation og teknologi' },
  },
  fi: {
    eyebrow: 'Koko luettelo:',
    title: 'Kaikki nimigeneraattorit',
    description: 'Tutustu työkaluihin brändeille, yrityksille, romaaneille, anime-sankareille, roolipeliseikkailuille, tieteelle, teknologialle ja kuvitteellisille maailmoille.',
    search: 'Hae generaattoreita (esim. brändi, lohikäärme, anime)...',
    random: 'Satunnainen',
    randomTitle: 'Avaa satunnainen generaattori',
    shown: 'Näytetään',
    of: '/',
    clear: 'Tyhjennä haku',
    forge: 'Luo',
    empty: 'Ei sopivia generaattoreita:',
    reset: 'Nollaa suodattimet',
    generatorWord: 'generaattoria',
    searchDescriptions: 'Hae myös kuvauksista ja oppaista',
    sortLabel: 'Järjestys:',
    sortRelevance: 'Osuvuus',
    sortAlphabetical: 'Aakkosjärjestys',
    categories: { all: 'Kaikki', fantasy: 'Fantasia ja myytit', business: 'Yritykset ja projektit', creative: 'Luovuus ja media', innovation: 'Innovaatiot ja teknologia' },
  },
  uk: {
    eyebrow: 'Повний каталог:',
    title: 'Усі генератори імен',
    description: 'Досліджуйте спеціалізовані інструменти для брендів, компаній, романів, героїв аніме, рольових кампаній, науки, технологій і вигаданих світів.',
    search: 'Шукати генератори (напр. бренд, дракон, аніме)...',
    random: 'Випадковий',
    randomTitle: 'Відкрити випадковий генератор',
    shown: 'Показано',
    of: 'з',
    clear: 'Очистити пошук',
    forge: 'Викувати',
    empty: 'Немає відповідних генераторів',
    reset: 'Скинути фільтри',
    generatorWord: 'генераторів',
    searchDescriptions: 'Шукати також в описах та довідниках',
    sortLabel: 'Сортування:',
    sortRelevance: 'За релевантністю',
    sortAlphabetical: 'За алфавітом',
    categories: { all: 'Усі', fantasy: 'Фентезі та міфи', business: 'Бізнес і проєкти', creative: 'Творчість і медіа', innovation: 'Інновації та технології' },
  },
  bn: {
    eyebrow: 'সম্পূর্ণ ক্যাটালগ:',
    title: 'সব নাম জেনারেটর',
    description: 'ব্র্যান্ড, ব্যবসা, উপন্যাস, অ্যানিমে নায়ক, আরপিজি ক্যাম্পেইন, বিজ্ঞান, প্রযুক্তি ও কাল্পনিক জগতের জন্য বিশেষায়িত টুল ঘুরে দেখুন।',
    search: 'জেনারেটর খুঁজুন (যেমন ব্র্যান্ড, ড্রাগন, অ্যানিমে)...',
    random: 'এলোমেলো',
    randomTitle: 'একটি এলোমেলো জেনারেটর খুলুন',
    shown: 'দেখানো হচ্ছে',
    of: 'এর মধ্যে',
    clear: 'অনুসন্ধান মুছুন',
    forge: 'গড়ুন',
    empty: 'কোনো জেনারেটর মেলেনি',
    reset: 'ফিল্টার রিসেট করুন',
    generatorWord: 'টি জেনারেটর',
    searchDescriptions: 'বিবরণ ও নির্দেশিকায়ও খুঁজুন',
    sortLabel: 'সাজান:',
    sortRelevance: 'প্রাসঙ্গিকতা',
    sortAlphabetical: 'বর্ণানুক্রমিক',
    categories: { all: 'সব', fantasy: 'ফ্যান্টাসি ও পুরাণ', business: 'ব্যবসা ও প্রকল্প', creative: 'সৃজনশীলতা ও মিডিয়া', innovation: 'উদ্ভাবন ও প্রযুক্তি' },
  },
  nb: {
    eyebrow: 'Komplett katalog over',
    title: 'Alle navnegeneratorer',
    description: 'Utforsk spesialiserte verktøy for merkevarer, bedrifter, romaner, animehelter, rollespillkampanjer, vitenskap, teknologi og fiktive verdener.',
    search: 'Søk etter generatorer (f.eks. merkevare, drage, anime)...',
    random: 'Tilfeldig',
    randomTitle: 'Åpne en tilfeldig generator',
    shown: 'Viser',
    of: 'av',
    clear: 'Tøm søket',
    forge: 'Smi',
    empty: 'Ingen generatorer samsvarer',
    reset: 'Nullstill filtre',
    generatorWord: 'generatorer',
    searchDescriptions: 'Søk også i beskrivelser og guider',
    sortLabel: 'Sorter:',
    sortRelevance: 'Relevans',
    sortAlphabetical: 'Alfabetisk',
    categories: { all: 'Alle', fantasy: 'Fantasy og myter', business: 'Forretning og prosjekter', creative: 'Kreativt og medier', innovation: 'Innovasjon og teknologi' },
  },
};

const EN_COPY = CATALOGUE_COPY.en!;

export const GeneratorsListView: React.FC<GeneratorsListViewProps> = ({
  onNavigate,
  initialCategory = 'all',
}) => {
  const {
    title: getLocalizedGeneratorTitle,
    shortTitle: getLocalizedGeneratorShortTitle,
    description: getLocalizedGeneratorDescription,
  } = useGeneratorLocalization();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedTheme, setSelectedTheme] = useState<DiscoveryThemeFilter>('all');
  const [selectedMode, setSelectedMode] = useState<DiscoveryModeFilter>('all');
  const [searchInDescriptions, setSearchInDescriptions] = useState(true);
  const [sortMode, setSortMode] = useState<'relevance' | 'alphabetical'>('relevance');
  const [language, setLanguage] = useState<LanguageCode>(() => getAppSettings().language);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>(() => getGenerationHistory());

  useEffect(() => subscribeToSettings((settings) => setLanguage(settings.language)), []);
  useEffect(() => {
    setHistoryEntries(getGenerationHistory());
    return subscribeToStorage(() => setHistoryEntries(getGenerationHistory()));
  }, []);
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const t = CATALOGUE_COPY[language] || EN_COPY;
  const discoveryLabels = getGeneratorDiscoveryLabels(language);
  const shellLabels = getShellLabels(language);
  const categoryLabel = (id: string) =>
    shellLabels.families[id as keyof typeof shellLabels.families] ||
    t.categories[id] ||
    shellLabels.families.all;

  const recentGenerators = useMemo(
    () => getRecentlyUsedGenerators(historyEntries, 4),
    [historyEntries]
  );

  const featuredGenerators = useMemo(
    () =>
      FEATURED_GENERATOR_IDS.map((id) => ALL_GENERATORS_LIST.find((g) => g.id === id)).filter(
        (g): g is NonNullable<typeof g> => Boolean(g)
      ),
    []
  );

  const familySummaries = useMemo(
    () =>
      GENERATOR_FAMILIES_CONFIG.filter((f) => f.id !== 'all').map((fam) => ({
        ...fam,
        actualCount: ALL_GENERATORS_LIST.filter((g) => g.category === fam.id).length,
      })),
    []
  );

  const query = normalizeSearchText(search);
  const filtered = ALL_GENERATORS_LIST.filter((gen) => {
    const coreFields = [
      gen.id,
      getLocalizedGeneratorTitle(gen.id, language, gen.title),
      gen.title,
      getLocalizedGeneratorShortTitle(gen.id, language, gen.shortTitle),
      gen.shortTitle,
      gen.badge,
      gen.category,
      getGeneratorThemeBucket(gen),
      getGeneratorEngineMode(gen.id),
    ];
    const descriptiveFields = [
      getLocalizedGeneratorDescription(gen, language),
      gen.generatorTitle,
      gen.generatorSubtitle,
      gen.guideTitle,
      ...(gen.guide || []).flatMap((item) => [item.h, item.p]),
      ...(gen.cards || []).flatMap((item) => [item.h, item.p]),
    ];
    const searchableFields = searchInDescriptions ? [...coreFields, ...descriptiveFields] : coreFields;
    const matchesSearch =
      !query ||
      searchableFields.some((field) => normalizeSearchText(String(field || '')).includes(query));
    const matchesCategory = selectedCategory === 'all' || gen.category === selectedCategory;
    const matchesTheme = selectedTheme === 'all' || getGeneratorThemeBucket(gen) === selectedTheme;
    const matchesMode = selectedMode === 'all' || getGeneratorEngineMode(gen.id) === selectedMode;
    return matchesSearch && matchesCategory && matchesTheme && matchesMode;
  }).sort((a, b) => {
    if (sortMode === 'alphabetical') {
      return getLocalizedGeneratorTitle(a.id, language, a.title).localeCompare(
        getLocalizedGeneratorTitle(b.id, language, b.title),
        language
      );
    }
    if (!query) {
      return getLocalizedGeneratorTitle(a.id, language, a.title).localeCompare(
        getLocalizedGeneratorTitle(b.id, language, b.title),
        language
      );
    }
    const score = (gen: typeof a) => {
      const title = normalizeSearchText(getLocalizedGeneratorTitle(gen.id, language, gen.title));
      const id = normalizeSearchText(gen.id);
      if (title === query || id === query) return 3;
      if (title.startsWith(query) || id.startsWith(query)) return 2;
      if (title.includes(query) || id.includes(query)) return 1;
      return 0;
    };
    return (
      score(b) - score(a) ||
      getLocalizedGeneratorTitle(a.id, language, a.title).localeCompare(
        getLocalizedGeneratorTitle(b.id, language, b.title),
        language
      )
    );
  });

  const dir = getTextDirection(language);
  const hasActiveFilters =
    Boolean(search.trim()) ||
    selectedCategory !== 'all' ||
    selectedTheme !== 'all' ||
    selectedMode !== 'all' ||
    !searchInDescriptions ||
    sortMode !== 'relevance';

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedTheme('all');
    setSelectedMode('all');
    setSearchInDescriptions(true);
    setSortMode('relevance');
  };

  return (
    <div dir={dir} lang={language} className="nf-page nf-page-layout nf-catalog py-10 sm:py-12 space-y-8">
      <header className="nf-page-header text-center max-w-3xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--nf-accent-ink)]">
          {t.eyebrow} {ALL_GENERATORS_LIST.length} {t.generatorWord}
        </p>
        <h1 className="nf-animated-heading text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          {t.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--nf-muted)] leading-relaxed">{t.description}</p>
      </header>

      <section
        className="nf-catalog-filters nf-panel p-4 sm:p-5 space-y-4"
        aria-label={t.search}
      >
        <div className="nf-catalog-filter-top flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:w-80">
            <Search
              className="w-4 h-4 text-[var(--nf-subtle)] absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              aria-label={t.search}
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`nf-input w-full ps-10 ${search ? 'pe-9' : 'pe-3'} text-sm`}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label={t.clear}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-[var(--nf-subtle)] hover:text-[var(--nf-ink)] hover:bg-[var(--nf-surface-muted)] transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto lg:justify-end">
            <button
              type="button"
              onClick={() => {
                const pool = filtered.length > 0 ? filtered : ALL_GENERATORS_LIST;
                const randomGen = pool[Math.floor(Math.random() * pool.length)];
                onNavigate('generator-detail', randomGen.id);
              }}
              className="nf-category-random nf-btn-random px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              title={t.randomTitle}
            >
              <Dices className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.random}</span>
            </button>

            {GENERATOR_FAMILIES_CONFIG.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={active}
                  className={`nf-category-filter px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer ${
                    active ? 'nf-btn-primary' : 'nf-btn-secondary'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{categoryLabel(cat.id)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="nf-catalog-filter-options flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-muted)]">
              <span>{discoveryLabels.themeLabel}</span>
              <select
                value={selectedTheme}
                onChange={(event) => setSelectedTheme(event.target.value as DiscoveryThemeFilter)}
                className="nf-input h-9 min-h-0 px-3 text-xs font-semibold cursor-pointer"
              >
                <option value="all">{discoveryLabels.themeAll}</option>
                <option value="characters">{discoveryLabels.themeCharacters}</option>
                <option value="brands">{discoveryLabels.themeBrands}</option>
                <option value="worlds">{discoveryLabels.themeWorlds}</option>
                <option value="scifi-tech">{discoveryLabels.themeSciFiTech}</option>
                <option value="culture-media">{discoveryLabels.themeCultureMedia}</option>
              </select>
            </label>

            <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-muted)]">
              <span>{discoveryLabels.modeLabel}</span>
              <select
                value={selectedMode}
                onChange={(event) => setSelectedMode(event.target.value as DiscoveryModeFilter)}
                className="nf-input h-9 min-h-0 px-3 text-xs font-semibold cursor-pointer"
              >
                <option value="all">{discoveryLabels.modeAll}</option>
                <option value="curated">{discoveryLabels.modeCurated}</option>
                <option value="procedural">{discoveryLabels.modeProcedural}</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={searchInDescriptions}
                onChange={(event) => setSearchInDescriptions(event.target.checked)}
                className="h-4 w-4 rounded accent-[var(--nf-primary)]"
              />
              <span>{t.searchDescriptions}</span>
            </label>

            <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--nf-muted)]">
              <span>{t.sortLabel}</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as 'relevance' | 'alphabetical')}
                className="nf-input h-9 min-h-0 px-3 text-xs font-semibold cursor-pointer"
              >
                <option value="relevance">{t.sortRelevance}</option>
                <option value="alphabetical">{t.sortAlphabetical}</option>
              </select>
            </label>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--nf-border)] pt-3 text-xs text-[var(--nf-muted)] font-medium"
          aria-live="polite"
        >
          <span>
            {t.shown} <strong className="text-[var(--nf-ink)] font-bold tabular-nums">{filtered.length}</strong> {t.of}{' '}
            <span className="tabular-nums">{ALL_GENERATORS_LIST.length}</span> {t.generatorWord}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="nf-btn-ghost px-3 py-1.5 text-xs text-[var(--nf-accent-ink)] cursor-pointer"
            >
              {t.reset}
            </button>
          )}
        </div>
      </section>

      {/* Discovery Shelves (shown before filtering so active search prioritizes instant matches;
          intentionally uses <section>/<button> rather than <article> to keep the 234 catalog grid clean) */}
      {!hasActiveFilters && (
        <div className="space-y-6">
          {recentGenerators.length > 0 && (
            <section className="nf-panel p-5 space-y-3" aria-label={discoveryLabels.recentTitle}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-sm font-extrabold text-[var(--nf-ink)] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--nf-accent-ink)]" aria-hidden="true" />
                  <span>{discoveryLabels.recentTitle}</span>
                </h2>
                <span className="text-xs text-[var(--nf-muted)]">{discoveryLabels.recentSubtitle}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {recentGenerators.map((gen) => (
                  <button
                    key={gen.id}
                    type="button"
                    onClick={() => onNavigate('generator-detail', gen.id)}
                    className="nf-surface p-3.5 text-start flex items-center gap-3 hover:border-[var(--nf-primary)] transition cursor-pointer"
                  >
                    <span className="text-2xl leading-none shrink-0" aria-hidden="true">{gen.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[var(--nf-ink)]">
                        {getLocalizedGeneratorShortTitle(gen.id, language, gen.shortTitle)}
                      </span>
                      <span className="block truncate text-[11px] text-[var(--nf-muted)]">
                        {categoryLabel(gen.category)}
                      </span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--nf-subtle)] shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="nf-panel p-5 space-y-4" aria-label={discoveryLabels.featuredTitle}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-sm font-extrabold text-[var(--nf-ink)] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--nf-accent-ink)]" aria-hidden="true" />
                <span>{discoveryLabels.featuredTitle}</span>
              </h2>
              <span className="text-xs text-[var(--nf-muted)]">{discoveryLabels.featuredSubtitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredGenerators.map((gen) => (
                <button
                  key={gen.id}
                  type="button"
                  onClick={() => onNavigate('generator-detail', gen.id)}
                  className="nf-surface p-4 text-start flex items-start gap-3 hover:border-[var(--nf-primary)] transition cursor-pointer"
                >
                  <span className="text-2xl leading-none shrink-0 mt-0.5" aria-hidden="true">{gen.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-[var(--nf-ink)]">
                      {getLocalizedGeneratorTitle(gen.id, language, gen.title)}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--nf-muted)] line-clamp-2">
                      {getLocalizedGeneratorDescription(gen, language)}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--nf-subtle)] shrink-0 mt-1" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[var(--nf-border)]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--nf-subtle)] mb-2.5">
                {discoveryLabels.familiesTitle}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {familySummaries.map((fam) => (
                  <button
                    key={fam.id}
                    type="button"
                    onClick={() => setSelectedCategory(fam.id)}
                    className="nf-surface px-3.5 py-2.5 text-start flex items-center justify-between gap-2 hover:border-[var(--nf-primary)] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <span aria-hidden="true">{fam.icon}</span>
                      <span className="text-xs font-bold text-[var(--nf-ink)] truncate">{categoryLabel(fam.id)}</span>
                    </span>
                    <span className="text-xs font-bold text-[var(--nf-accent-ink)] tabular-nums shrink-0">
                      {fam.actualCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      <div className="nf-generator-grid">
        {filtered.map((gen) => (
          <article
            key={gen.id}
            className="nf-generator-card nf-surface group p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--nf-primary)] flex flex-col"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <span className="text-3xl leading-none transition-transform group-hover:scale-105" aria-hidden="true">
                  {gen.icon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--nf-accent-ink)] text-end">
                  {categoryLabel(gen.category)}
                </span>
              </div>
              <h2 className="nf-generator-card-title text-lg font-extrabold text-[var(--nf-ink)] mb-2">
                {getLocalizedGeneratorTitle(gen.id, language, gen.title)}
              </h2>
              <p className="nf-generator-card-description text-xs text-[var(--nf-muted)] leading-relaxed line-clamp-3">
                {getLocalizedGeneratorDescription(gen, language)}
              </p>
            </div>

            <div className="nf-generator-card-footer mt-auto pt-4 border-t border-[var(--nf-border)] flex items-center justify-end">
              <button
                type="button"
                onClick={() => onNavigate('generator-detail', gen.id)}
                className="nf-card-action nf-btn-primary py-2 px-4 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.forge}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="nf-catalog-empty nf-panel border-dashed px-5 py-14 text-center text-[var(--nf-muted)] space-y-5">
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nf-surface)] border border-[var(--nf-border)] text-[var(--nf-subtle)]">
              <Search className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-sm">{search ? `${t.empty} “${search}”.` : t.empty}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 nf-btn-primary px-4 py-2 text-xs cursor-pointer"
            >
              {t.reset}
            </button>
          </div>

          <div className="pt-4 border-t border-[var(--nf-border)] max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--nf-subtle)] mb-3">
              {discoveryLabels.suggestionsTitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {featuredGenerators.slice(0, 4).map((gen) => (
                <button
                  key={gen.id}
                  type="button"
                  onClick={() => onNavigate('generator-detail', gen.id)}
                  className="nf-btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span aria-hidden="true">{gen.icon}</span>
                  <span>{getLocalizedGeneratorShortTitle(gen.id, language, gen.shortTitle)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useGeneratorLocalization } from '../hooks/useGeneratorLocalization';
import {
  ChevronDown,
  Check,
  ArrowLeft,
  ShieldAlert,
  Info,
  Star,
  Award,
  Copy,
  Download,
  Scale,
  Globe,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';
import { GeneratorControl } from '../components/GeneratorControl';
import { NameCard } from '../components/NameCard';
import { NoteModal } from '../components/NoteModal';
import { CompareModal } from '../components/CompareModal';
import { GENERATORS_METADATA, ALL_GENERATORS_LIST } from '../data/generators';
import { generateNames } from '../services/generatorEngine';
import { findSavedEntry, getTopRatedNamesByCategory, subscribeToStorage } from '../services/storage';
import { buildCsvContent } from '../utils/csv';
import {
  FormatOption,
  GenderOption,
  GeneratedName,
  GeneratorId,
  GenLanguageCode,
  LengthOption,
  SavedNameEntry,
} from '../types';
import { GEN_LANGUAGES, getAppSettings, resolveGenerationLanguage, subscribeToSettings } from '../services/settings';
import {
  getCategoryLanguageCompatibility,
  getCompatibilitySuggestedLabel,
  getGeneratorCompatibilityAssessment,
  type CompatibilityLevel,
} from '../services/languageCompatibility';
import { getLocalizedStyleLabel } from '../i18n/styleLabels';
import { getLocalizedEditorialMeta } from '../i18n/localizedGeneratorMeta';
import { copyToClipboard } from '../utils/clipboard';
import { getTextDirection } from '../utils/locale';
import { getSeedCopy } from '../i18n/moduleLabels';
import { getNameIntelligenceLabels } from '../i18n/nameIntelligenceLabels';
import { getEnhancementsLabels } from '../i18n/enhancementsLabels';

const CompleteNameAnalysisModal = lazy(() =>
  import('../components/CompleteNameAnalysisModal').then((module) => ({
    default: module.CompleteNameAnalysisModal,
  }))
);

interface GeneratorDetailViewProps {
  generatorId: GeneratorId;
  onNavigate: (view: string, genId?: GeneratorId) => void;
}

export const GeneratorDetailView: React.FC<GeneratorDetailViewProps> = ({
  generatorId,
  onNavigate,
}) => {
  const {
    title: getLocalizedGeneratorTitle,
    shortTitle: getLocalizedGeneratorShortTitle,
    description: getLocalizedGeneratorDescription,
  } = useGeneratorLocalization();
  const sourceMeta = GENERATORS_METADATA[generatorId] || GENERATORS_METADATA.fantasy;
  const settings = getAppSettings();
  const [language, setLanguage] = useState(settings.language);
  const localizedTitle = getLocalizedGeneratorTitle(generatorId, language, sourceMeta.title);
  const localizedShortTitle = getLocalizedGeneratorShortTitle(generatorId, language, sourceMeta.shortTitle);
  const meta = getLocalizedEditorialMeta(sourceMeta, language, localizedShortTitle);
  const localizedDescription = getLocalizedGeneratorDescription(sourceMeta, language);

  useEffect(() => subscribeToSettings((next) => setLanguage(next.language)), []);

  const ui: Record<string, Record<string, string>> = {
    en: { back: 'Back to all generators', proposals: 'names generated', inspired: 'Inspired by:', copyAllTitle: 'Copy the full list with descriptions', copiedBatch: 'Batch copied!', copyBatch: 'Copy batch', exportTextTitle: 'Download this batch as text', exportCsvTitle: 'Download this batch as CSV spreadsheet', tip: 'Tip: Press', tipEnd: 'to forge a new batch instantly.', leaderboard: 'Independent Leaderboard', bestNames: 'Your Top Rated Names', leaderboardDesc: 'Ranked strictly by your 1–5 star ratings for this category.', ratedCount: 'rated suggestion(s)', stars: 'stars', copied: 'Copied', copy: 'Copy', noRatings: 'No ratings yet for', noRatingsDesc: 'Rate the names above to build your personal leaderboard for this generator.', advantages: 'Key Advantages', limits: 'Points to Consider', explore: 'Explore other categories' },
    fr: { back: 'Retour à tous les générateurs', proposals: 'propositions façonnées', inspired: 'Inspiré de :', copyAllTitle: 'Copier toute la liste avec descriptions', copiedBatch: 'Lot copié !', copyBatch: 'Copier tout le lot', exportTextTitle: 'Télécharger ce lot au format texte', exportCsvTitle: 'Télécharger ce lot au format tableur CSV', tip: 'Astuce : appuyez sur', tipEnd: 'pour forger un nouveau lot instantanément.', leaderboard: 'Palmarès indépendant', bestNames: 'Vos meilleurs noms évalués', leaderboardDesc: 'Classement basé sur vos notes de 1 à 5 étoiles pour cette catégorie.', ratedCount: 'proposition(s) notée(s)', stars: 'étoiles', copied: 'Copié', copy: 'Copier', noRatings: 'Pas encore d’évaluation pour', noRatingsDesc: 'Attribuez des étoiles aux noms générés ci-dessus pour bâtir votre palmarès personnel.', advantages: 'Avantages clés', limits: 'Points de vigilance', explore: 'Explorer d’autres catégories' },
    ar: { back: 'العودة إلى جميع المولّدات', proposals: 'أسماء تم إنشاؤها', inspired: 'مستوحى من:', copyAllTitle: 'نسخ القائمة كاملة مع الأوصاف', copiedBatch: 'تم نسخ المجموعة!', copyBatch: 'نسخ المجموعة', exportTextTitle: 'تنزيل المجموعة كملف نصي', exportCsvTitle: 'تنزيل المجموعة كجدول CSV', tip: 'نصيحة: اضغط على', tipEnd: 'لإنشاء مجموعة جديدة فورًا.', leaderboard: 'قائمة التقييم المستقلة', bestNames: 'الأسماء الأعلى تقييمًا', leaderboardDesc: 'ترتيب وفق تقييماتك من نجمة إلى خمس نجوم لهذه الفئة.', ratedCount: 'اقتراحات مقيّمة', stars: 'نجوم', copied: 'تم النسخ', copy: 'نسخ', noRatings: 'لا توجد تقييمات بعد لـ', noRatingsDesc: 'قيّم الأسماء أعلاه لبناء قائمتك الشخصية لهذا المولد.', advantages: 'المزايا الرئيسية', limits: 'نقاط يجب مراعاتها', explore: 'استكشف فئات أخرى' },
    es: { back: 'Volver a todos los generadores', proposals: 'nombres generados', inspired: 'Inspirado en:', copyAllTitle: 'Copiar la lista completa con descripciones', copiedBatch: '¡Lote copiado!', copyBatch: 'Copiar lote', exportTextTitle: 'Descargar este lote como texto', exportCsvTitle: 'Descargar este lote como hoja CSV', tip: 'Consejo: pulsa', tipEnd: 'para crear un lote nuevo al instante.', leaderboard: 'Clasificación independiente', bestNames: 'Tus nombres mejor valorados', leaderboardDesc: 'Clasificación basada en tus valoraciones de 1 a 5 estrellas para esta categoría.', ratedCount: 'propuesta(s) valorada(s)', stars: 'estrellas', copied: 'Copiado', copy: 'Copiar', noRatings: 'Aún no hay valoraciones para', noRatingsDesc: 'Valora los nombres anteriores para crear tu clasificación personal.', advantages: 'Ventajas principales', limits: 'Aspectos a tener en cuenta', explore: 'Explorar otras categorías' },
    de: { back: 'Zurück zu allen Generatoren', proposals: 'generierte Namen', inspired: 'Inspiriert von:', copyAllTitle: 'Gesamte Liste mit Beschreibungen kopieren', copiedBatch: 'Stapel kopiert!', copyBatch: 'Stapel kopieren', exportTextTitle: 'Stapel als Text herunterladen', exportCsvTitle: 'Stapel als CSV-Tabelle herunterladen', tip: 'Tipp: Drücke', tipEnd: ', um sofort einen neuen Stapel zu erstellen.', leaderboard: 'Unabhängige Rangliste', bestNames: 'Deine bestbewerteten Namen', leaderboardDesc: 'Rangliste anhand deiner Bewertungen von 1 bis 5 Sternen für diese Kategorie.', ratedCount: 'bewertete Vorschläge', stars: 'Sterne', copied: 'Kopiert', copy: 'Kopieren', noRatings: 'Noch keine Bewertungen für', noRatingsDesc: 'Bewerte die Namen oben, um deine persönliche Rangliste aufzubauen.', advantages: 'Wichtige Vorteile', limits: 'Zu beachten', explore: 'Weitere Kategorien entdecken' },
    it: { back: 'Torna a tutti i generatori', proposals: 'nomi generati', inspired: 'Ispirato da:', copyAllTitle: 'Copiare l’elenco completo con descrizioni', copiedBatch: 'Lotto copiato!', copyBatch: 'Copia lotto', exportTextTitle: 'Scarica il lotto come testo', exportCsvTitle: 'Scarica il lotto come foglio CSV', tip: 'Suggerimento: premi', tipEnd: 'per creare subito un nuovo lotto.', leaderboard: 'Classifica indipendente', bestNames: 'I tuoi nomi più votati', leaderboardDesc: 'Classifica basata sulle tue valutazioni da 1 a 5 stelle per questa categoria.', ratedCount: 'proposta/e valutata/e', stars: 'stelle', copied: 'Copiato', copy: 'Copia', noRatings: 'Ancora nessuna valutazione per', noRatingsDesc: 'Valuta i nomi qui sopra per creare la tua classifica personale.', advantages: 'Vantaggi principali', limits: 'Aspetti da considerare', explore: 'Esplora altre categorie' },
    pt: { back: 'Voltar a todos os geradores', proposals: 'nomes gerados', inspired: 'Inspirado em:', copyAllTitle: 'Copiar a lista completa com descrições', copiedBatch: 'Lote copiado!', copyBatch: 'Copiar lote', exportTextTitle: 'Baixar este lote como texto', exportCsvTitle: 'Baixar este lote como planilha CSV', tip: 'Dica: pressione', tipEnd: 'para criar um novo lote instantaneamente.', leaderboard: 'Classificação independente', bestNames: 'Seus nomes mais bem avaliados', leaderboardDesc: 'Classificação baseada nas suas avaliações de 1 a 5 estrelas nesta categoria.', ratedCount: 'sugestão(ões) avaliada(s)', stars: 'estrelas', copied: 'Copiado', copy: 'Copiar', noRatings: 'Ainda sem avaliações para', noRatingsDesc: 'Avalie os nomes acima para criar sua classificação pessoal.', advantages: 'Principais vantagens', limits: 'Pontos de atenção', explore: 'Explorar outras categorias' },
    tr: { back: 'Tüm oluşturuculara dön', proposals: 'oluşturulan ad', inspired: 'Şundan ilham aldı:', copyAllTitle: 'Açıklamalarla tüm listeyi kopyala', copiedBatch: 'Liste kopyalandı!', copyBatch: 'Listeyi kopyala', exportTextTitle: 'Listeyi metin olarak indir', exportCsvTitle: 'Listeyi CSV tablosu olarak indir', tip: 'İpucu: Yeni bir liste oluşturmak için', tipEnd: 'tuşuna basın.', leaderboard: 'Bağımsız Sıralama', bestNames: 'En yüksek puanlı adlarınız', leaderboardDesc: 'Bu kategori için 1–5 yıldız puanlarınıza göre sıralanır.', ratedCount: 'puanlanan öneri', stars: 'yıldız', copied: 'Kopyalandı', copy: 'Kopyala', noRatings: 'Henüz puan yok:', noRatingsDesc: 'Kişisel sıralamanızı oluşturmak için yukarıdaki adları puanlayın.', advantages: 'Temel avantajlar', limits: 'Dikkat edilmesi gerekenler', explore: 'Diğer kategorileri keşfet' },
    ja: { back: 'すべてのジェネレーターに戻る', proposals: '生成された名前', inspired: '着想元：', copyAllTitle: '説明付きのリスト全体をコピー', copiedBatch: '一括コピーしました！', copyBatch: '一括コピー', exportTextTitle: 'テキスト形式でダウンロード', exportCsvTitle: 'CSV形式でダウンロード', tip: 'ヒント：', tipEnd: 'キーを押すとすぐに新しい候補を生成できます。', leaderboard: '独立ランキング', bestNames: '高評価の名前', leaderboardDesc: 'このカテゴリでの1〜5つ星評価に基づくランキングです。', ratedCount: '件の評価済み候補', stars: 'つ星', copied: 'コピー済み', copy: 'コピー', noRatings: 'まだ評価がありません：', noRatingsDesc: '上の名前を評価して、自分だけのランキングを作成しましょう。', advantages: '主なメリット', limits: '注意点', explore: 'ほかのカテゴリを探す' },
    ko: { back: '모든 생성기로 돌아가기', proposals: '생성된 이름', inspired: '영감 출처:', copyAllTitle: '설명이 포함된 전체 목록 복사', copiedBatch: '목록 복사 완료!', copyBatch: '목록 복사', exportTextTitle: '텍스트 파일로 다운로드', exportCsvTitle: 'CSV 스프레드시트로 다운로드', tip: '팁: ', tipEnd: ' 키를 누르면 새 목록을 바로 생성합니다.', leaderboard: '독립 순위표', bestNames: '최고 평점 이름', leaderboardDesc: '이 카테고리의 1~5점 별점 평가를 기준으로 합니다.', ratedCount: '개 평가된 제안', stars: '개 별', copied: '복사됨', copy: '복사', noRatings: '아직 평가가 없습니다:', noRatingsDesc: '위의 이름에 별점을 주어 개인 순위표를 만들어 보세요.', advantages: '주요 장점', limits: '유의 사항', explore: '다른 카테고리 둘러보기' },
    zh: { back: '返回所有生成器', proposals: '已生成的名称', inspired: '灵感来源：', copyAllTitle: '复制带描述的完整列表', copiedBatch: '已复制整批！', copyBatch: '复制整批', exportTextTitle: '下载为文本文件', exportCsvTitle: '下载为 CSV 表格', tip: '提示：按下', tipEnd: '即可立即生成新的一批。', leaderboard: '独立排行榜', bestNames: '评分最高的名称', leaderboardDesc: '严格按此类别的 1–5 星评分排序。', ratedCount: '条已评分建议', stars: '星', copied: '已复制', copy: '复制', noRatings: '暂无评分：', noRatingsDesc: '为上方名称评分，建立此生成器的个人排行榜。', advantages: '主要优势', limits: '注意事项', explore: '探索其他类别' },
    ru: { back: 'Ко всем генераторам', proposals: 'сгенерированных имён', inspired: 'Вдохновлено:', copyAllTitle: 'Копировать список с описаниями', copiedBatch: 'Пакет скопирован!', copyBatch: 'Копировать пакет', exportTextTitle: 'Скачать как текст', exportCsvTitle: 'Скачать таблицу CSV', tip: 'Совет: нажмите', tipEnd: ', чтобы создать новую подборку.', leaderboard: 'Независимый рейтинг', bestNames: 'Лучшие имена по оценкам', leaderboardDesc: 'Сортировка по вашим оценкам от 1 до 5 звёзд.', ratedCount: 'оценённых предложений', stars: 'звёзд', copied: 'Скопировано', copy: 'Копировать', noRatings: 'Пока нет оценок для', noRatingsDesc: 'Оцените имена выше, чтобы создать личный рейтинг.', advantages: 'Преимущества', limits: 'Что учесть', explore: 'Другие категории' },
    hi: { back: 'सभी जनरेटर पर वापस जाएँ', proposals: 'बनाए गए नाम', inspired: 'प्रेरणा स्रोत:', copyAllTitle: 'विवरण सहित पूरी सूची कॉपी करें', copiedBatch: 'सूची कॉपी हुई!', copyBatch: 'सूची कॉपी करें', exportTextTitle: 'टेक्स्ट के रूप में डाउनलोड करें', exportCsvTitle: 'CSV शीट डाउनलोड करें', tip: 'सुझाव: दबाएँ', tipEnd: ' और तुरंत नए नाम बनाएँ।', leaderboard: 'स्वतंत्र रैंकिंग', bestNames: 'सबसे अधिक रेट किए गए नाम', leaderboardDesc: 'इस श्रेणी में आपकी 1–5 स्टार रेटिंग के आधार पर।', ratedCount: 'रेट किए गए सुझाव', stars: 'स्टार', copied: 'कॉपी हुआ', copy: 'कॉपी करें', noRatings: 'अभी रेटिंग नहीं है:', noRatingsDesc: 'अपनी व्यक्तिगत रैंकिंग बनाने के लिए ऊपर के नामों को रेट करें।', advantages: 'मुख्य लाभ', limits: 'ध्यान देने योग्य बातें', explore: 'अन्य श्रेणियाँ देखें' },
    nl: { back: 'Terug naar alle generators', proposals: 'gegenereerde namen', inspired: 'Geïnspireerd door:', copyAllTitle: 'Kopieer de volledige lijst met beschrijvingen', copiedBatch: 'Batch gekopieerd!', copyBatch: 'Batch kopiëren', exportTextTitle: 'Download als tekst', exportCsvTitle: 'Download als CSV-tabel', tip: 'Tip: druk op', tipEnd: ' om direct een nieuwe batch te maken.', leaderboard: 'Onafhankelijke ranglijst', bestNames: 'Best beoordeelde namen', leaderboardDesc: 'Gerangschikt op jouw beoordelingen van 1–5 sterren.', ratedCount: 'beoordeelde suggesties', stars: 'sterren', copied: 'Gekopieerd', copy: 'Kopiëren', noRatings: 'Nog geen beoordelingen voor', noRatingsDesc: 'Beoordeel de namen hierboven om je persoonlijke ranglijst op te bouwen.', advantages: 'Belangrijkste voordelen', limits: 'Aandachtspunten', explore: 'Andere categorieën bekijken' },
    pl: { back: 'Wróć do wszystkich generatorów', proposals: 'wygenerowanych nazw', inspired: 'Inspiracja:', copyAllTitle: 'Kopiuj całą listę z opisami', copiedBatch: 'Skopiowano zestaw!', copyBatch: 'Kopiuj zestaw', exportTextTitle: 'Pobierz jako tekst', exportCsvTitle: 'Pobierz arkusz CSV', tip: 'Wskazówka: naciśnij', tipEnd: ', aby natychmiast utworzyć nowy zestaw.', leaderboard: 'Niezależny ranking', bestNames: 'Najwyżej oceniane nazwy', leaderboardDesc: 'Ranking według ocen od 1 do 5 gwiazdek w tej kategorii.', ratedCount: 'ocenionych propozycji', stars: 'gwiazdek', copied: 'Skopiowano', copy: 'Kopiuj', noRatings: 'Brak ocen dla', noRatingsDesc: 'Oceń powyższe nazwy, aby utworzyć własny ranking.', advantages: 'Najważniejsze zalety', limits: 'Warto rozważyć', explore: 'Poznaj inne kategorie' },
    sv: { back: 'Till alla generatorer', proposals: 'genererade namn', inspired: 'Inspirerad av:', copyAllTitle: 'Kopiera hela listan med beskrivningar', copiedBatch: 'Listan kopierad!', copyBatch: 'Kopiera listan', exportTextTitle: 'Ladda ned som text', exportCsvTitle: 'Ladda ned CSV-kalkylblad', tip: 'Tips: tryck på', tipEnd: ' för att skapa en ny omgång direkt.', leaderboard: 'Oberoende topplista', bestNames: 'Högst betygsatta namn', leaderboardDesc: 'Sorterat efter dina betyg på 1–5 stjärnor.', ratedCount: 'betygsatta förslag', stars: 'stjärnor', copied: 'Kopierat', copy: 'Kopiera', noRatings: 'Inga betyg ännu för', noRatingsDesc: 'Betygsätt namnen ovan för att skapa din personliga topplista.', advantages: 'Viktiga fördelar', limits: 'Att tänka på', explore: 'Utforska fler kategorier' },
    vi: { back: 'Quay lại tất cả trình tạo', proposals: 'tên đã tạo', inspired: 'Lấy cảm hứng từ:', copyAllTitle: 'Sao chép toàn bộ danh sách kèm mô tả', copiedBatch: 'Đã sao chép danh sách!', copyBatch: 'Sao chép danh sách', exportTextTitle: 'Tải xuống dạng văn bản', exportCsvTitle: 'Tải xuống bảng CSV', tip: 'Mẹo: nhấn', tipEnd: ' để tạo ngay một danh sách mới.', leaderboard: 'Bảng xếp hạng độc lập', bestNames: 'Tên được đánh giá cao nhất', leaderboardDesc: 'Xếp hạng theo đánh giá 1–5 sao của bạn.', ratedCount: 'gợi ý đã đánh giá', stars: 'sao', copied: 'Đã sao chép', copy: 'Sao chép', noRatings: 'Chưa có đánh giá cho', noRatingsDesc: 'Đánh giá tên phía trên để tạo bảng xếp hạng riêng.', advantages: 'Ưu điểm chính', limits: 'Điểm cần cân nhắc', explore: 'Khám phá danh mục khác' },
    id: { back: 'Kembali ke semua generator', proposals: 'nama dihasilkan', inspired: 'Terinspirasi oleh:', copyAllTitle: 'Salin seluruh daftar beserta deskripsi', copiedBatch: 'Daftar disalin!', copyBatch: 'Salin daftar', exportTextTitle: 'Unduh sebagai teks', exportCsvTitle: 'Unduh lembar CSV', tip: 'Tips: tekan', tipEnd: ' untuk membuat kumpulan baru seketika.', leaderboard: 'Peringkat independen', bestNames: 'Nama dengan nilai tertinggi', leaderboardDesc: 'Diurutkan berdasarkan penilaian 1–5 bintang Anda.', ratedCount: 'saran dinilai', stars: 'bintang', copied: 'Disalin', copy: 'Salin', noRatings: 'Belum ada penilaian untuk', noRatingsDesc: 'Nilai nama di atas untuk membuat peringkat pribadi.', advantages: 'Keunggulan utama', limits: 'Hal yang perlu dipertimbangkan', explore: 'Jelajahi kategori lain' },
    th: { back: 'กลับไปยังตัวสร้างทั้งหมด', proposals: 'ชื่อที่สร้างแล้ว', inspired: 'แรงบันดาลใจจาก:', copyAllTitle: 'คัดลอกรายการทั้งหมดพร้อมคำอธิบาย', copiedBatch: 'คัดลอกรายการแล้ว!', copyBatch: 'คัดลอกรายการ', exportTextTitle: 'ดาวน์โหลดเป็นข้อความ', exportCsvTitle: 'ดาวน์โหลดตาราง CSV', tip: 'เคล็ดลับ: กด', tipEnd: ' เพื่อสร้างชุดใหม่ทันที', leaderboard: 'อันดับอิสระ', bestNames: 'ชื่อที่ได้คะแนนสูงสุด', leaderboardDesc: 'จัดอันดับจากคะแนน 1–5 ดาวของคุณในหมวดนี้', ratedCount: 'ข้อเสนอที่ให้คะแนนแล้ว', stars: 'ดาว', copied: 'คัดลอกแล้ว', copy: 'คัดลอก', noRatings: 'ยังไม่มีคะแนนสำหรับ', noRatingsDesc: 'ให้คะแนนชื่อด้านบนเพื่อสร้างอันดับส่วนตัว', advantages: 'ข้อดีหลัก', limits: 'ข้อควรพิจารณา', explore: 'สำรวจหมวดหมู่อื่น' },
    el: { back: 'Επιστροφή σε όλους τους δημιουργούς', proposals: 'ονόματα που δημιουργήθηκαν', inspired: 'Έμπνευση από:', copyAllTitle: 'Αντιγραφή πλήρους λίστας με περιγραφές', copiedBatch: 'Η λίστα αντιγράφηκε!', copyBatch: 'Αντιγραφή λίστας', exportTextTitle: 'Λήψη ως κείμενο', exportCsvTitle: 'Λήψη φύλλου CSV', tip: 'Συμβουλή: πατήστε', tipEnd: ' για να δημιουργήσετε αμέσως νέα λίστα.', leaderboard: 'Ανεξάρτητη κατάταξη', bestNames: 'Ονόματα με τις υψηλότερες βαθμολογίες', leaderboardDesc: 'Ταξινόμηση βάσει των αξιολογήσεών σας 1–5 αστέρων.', ratedCount: 'αξιολογημένες προτάσεις', stars: 'αστέρια', copied: 'Αντιγράφηκε', copy: 'Αντιγραφή', noRatings: 'Δεν υπάρχουν ακόμη αξιολογήσεις για', noRatingsDesc: 'Βαθμολογήστε τα παραπάνω ονόματα για προσωπική κατάταξη.', advantages: 'Βασικά πλεονεκτήματα', limits: 'Σημεία προσοχής', explore: 'Εξερευνήστε άλλες κατηγορίες' },
    he: { back: 'חזרה לכל המחוללים', proposals: 'שמות שנוצרו', inspired: 'בהשראת:', copyAllTitle: 'העתקת הרשימה המלאה עם תיאורים', copiedBatch: 'הרשימה הועתקה!', copyBatch: 'העתקת הרשימה', exportTextTitle: 'הורדה כטקסט', exportCsvTitle: 'הורדת גיליון CSV', tip: 'טיפ: לחצו על', tipEnd: ' כדי ליצור אוסף חדש מיד.', leaderboard: 'דירוג עצמאי', bestNames: 'השמות בעלי הדירוג הגבוה ביותר', leaderboardDesc: 'ממוינים לפי הדירוג שלך מ־1 עד 5 כוכבים.', ratedCount: 'הצעות שדורגו', stars: 'כוכבים', copied: 'הועתק', copy: 'העתקה', noRatings: 'עדיין אין דירוגים עבור', noRatingsDesc: 'דרגו את השמות למעלה כדי ליצור דירוג אישי.', advantages: 'יתרונות מרכזיים', limits: 'נקודות שכדאי לשקול', explore: 'גילוי קטגוריות נוספות' },
    cs: { back: 'Zpět ke všem generátorům', proposals: 'vygenerovaných jmen', inspired: 'Inspirace:', copyAllTitle: 'Kopírovat celý seznam s popisy', copiedBatch: 'Sada zkopírována!', copyBatch: 'Kopírovat sadu', exportTextTitle: 'Stáhnout jako text', exportCsvTitle: 'Stáhnout tabulku CSV', tip: 'Tip: stiskněte', tipEnd: ' a okamžitě vytvoříte novou sadu.', leaderboard: 'Nezávislý žebříček', bestNames: 'Nejlépe hodnocená jména', leaderboardDesc: 'Seřazeno podle vašich hodnocení 1–5 hvězdiček.', ratedCount: 'hodnocených návrhů', stars: 'hvězdiček', copied: 'Zkopírováno', copy: 'Kopírovat', noRatings: 'Zatím žádná hodnocení pro', noRatingsDesc: 'Ohodnoťte jména výše a vytvořte osobní žebříček.', advantages: 'Hlavní výhody', limits: 'Na co myslet', explore: 'Prozkoumat další kategorie' },
    ro: { back: 'Înapoi la toți generatorii', proposals: 'nume generate', inspired: 'Inspirat de:', copyAllTitle: 'Copiază lista completă cu descrieri', copiedBatch: 'Lista a fost copiată!', copyBatch: 'Copiază lista', exportTextTitle: 'Descarcă ca text', exportCsvTitle: 'Descarcă foaia CSV', tip: 'Sfat: apasă', tipEnd: ' pentru a crea imediat un lot nou.', leaderboard: 'Clasament independent', bestNames: 'Nume cel mai bine evaluate', leaderboardDesc: 'Ordonate după evaluările tale de la 1 la 5 stele.', ratedCount: 'sugestii evaluate', stars: 'stele', copied: 'Copiat', copy: 'Copiază', noRatings: 'Încă nu există evaluări pentru', noRatingsDesc: 'Evaluează numele de mai sus pentru a crea clasamentul personal.', advantages: 'Avantaje principale', limits: 'Aspecte de luat în calcul', explore: 'Explorează alte categorii' },
    da: { back: 'Tilbage til alle generatorer', proposals: 'genererede navne', inspired: 'Inspireret af:', copyAllTitle: 'Kopiér hele listen med beskrivelser', copiedBatch: 'Listen er kopieret!', copyBatch: 'Kopiér liste', exportTextTitle: 'Download som tekst', exportCsvTitle: 'Download CSV-regneark', tip: 'Tip: tryk på', tipEnd: ' for straks at lave en ny omgang.', leaderboard: 'Uafhængig topliste', bestNames: 'Bedst bedømte navne', leaderboardDesc: 'Rangeret efter dine vurderinger fra 1 til 5 stjerner.', ratedCount: 'bedømte forslag', stars: 'stjerner', copied: 'Kopieret', copy: 'Kopiér', noRatings: 'Ingen vurderinger endnu for', noRatingsDesc: 'Bedøm navnene ovenfor for at opbygge din personlige topliste.', advantages: 'Vigtigste fordele', limits: 'Overvejelser', explore: 'Udforsk andre kategorier' },
    fi: { back: 'Takaisin kaikkiin generaattoreihin', proposals: 'luotua nimeä', inspired: 'Innoittajana:', copyAllTitle: 'Kopioi koko luettelo kuvauksineen', copiedBatch: 'Luettelo kopioitu!', copyBatch: 'Kopioi luettelo', exportTextTitle: 'Lataa tekstinä', exportCsvTitle: 'Lataa CSV-taulukkona', tip: 'Vinkki: paina', tipEnd: ' luodaksesi uuden erän heti.', leaderboard: 'Riippumaton listaus', bestNames: 'Parhaiten arvioidut nimet', leaderboardDesc: 'Järjestetty tämän luokan 1–5 tähden arvioidesi mukaan.', ratedCount: 'arvioitua ehdotusta', stars: 'tähteä', copied: 'Kopioitu', copy: 'Kopioi', noRatings: 'Ei vielä arvioita kohteelle', noRatingsDesc: 'Arvioi yllä olevat nimet rakentaaksesi oman listasi.', advantages: 'Keskeiset edut', limits: 'Huomioitavaa', explore: 'Tutustu muihin luokkiin' },
    uk: { back: 'Назад до всіх генераторів', proposals: 'створених імен', inspired: 'Натхнення:', copyAllTitle: 'Копіювати весь список з описами', copiedBatch: 'Набір скопійовано!', copyBatch: 'Копіювати набір', exportTextTitle: 'Завантажити набір як текст', exportCsvTitle: 'Завантажити набір як таблицю CSV', tip: 'Порада: натисніть', tipEnd: ', щоб миттєво викувати новий набір.', leaderboard: 'Незалежний рейтинг', bestNames: 'Ваші найвище оцінені імена', leaderboardDesc: 'Упорядковано лише за вашими оцінками від 1 до 5 зірок у цій категорії.', ratedCount: 'оцінених пропозицій', stars: 'зір.', copied: 'Скопійовано', copy: 'Копіювати', noRatings: 'Оцінок ще немає для', noRatingsDesc: 'Оцініть імена вище, щоб створити особистий рейтинг для цього генератора.', advantages: 'Ключові переваги', limits: 'Що варто врахувати', explore: 'Дослідити інші категорії' },
    bn: { back: 'সব জেনারেটরে ফিরে যান', proposals: 'টি নাম তৈরি হয়েছে', inspired: 'অনুপ্রেরণা:', copyAllTitle: 'বিবরণসহ পুরো তালিকা কপি করুন', copiedBatch: 'ব্যাচ কপি হয়েছে!', copyBatch: 'ব্যাচ কপি করুন', exportTextTitle: 'এই ব্যাচ টেক্সট হিসেবে ডাউনলোড করুন', exportCsvTitle: 'এই ব্যাচ CSV স্প্রেডশিট হিসেবে ডাউনলোড করুন', tip: 'পরামর্শ: চাপুন', tipEnd: ' — মুহূর্তেই নতুন ব্যাচ গড়তে।', leaderboard: 'স্বাধীন লিডারবোর্ড', bestNames: 'আপনার সর্বোচ্চ রেটিংপ্রাপ্ত নাম', leaderboardDesc: 'এই বিভাগে আপনার ১–৫ তারা রেটিং অনুযায়ী কঠোরভাবে সাজানো।', ratedCount: 'টি রেটিংপ্রাপ্ত প্রস্তাব', stars: 'তারা', copied: 'কপি হয়েছে', copy: 'কপি', noRatings: 'এখনও কোনো রেটিং নেই:', noRatingsDesc: 'এই জেনারেটরের ব্যক্তিগত লিডারবোর্ড গড়তে ওপরের নামগুলোকে রেটিং দিন।', advantages: 'প্রধান সুবিধা', limits: 'বিবেচ্য বিষয়', explore: 'অন্যান্য বিভাগ ঘুরে দেখুন' },
    nb: { back: 'Tilbake til alle generatorer', proposals: 'navn generert', inspired: 'Inspirert av:', copyAllTitle: 'Kopier hele listen med beskrivelser', copiedBatch: 'Serien er kopiert!', copyBatch: 'Kopier serie', exportTextTitle: 'Last ned denne serien som tekst', exportCsvTitle: 'Last ned denne serien som CSV-regneark', tip: 'Tips: Trykk', tipEnd: 'for å smi en ny serie umiddelbart.', leaderboard: 'Uavhengig toppliste', bestNames: 'Dine høyest rangerte navn', leaderboardDesc: 'Rangert utelukkende etter dine 1–5-stjernevurderinger i denne kategorien.', ratedCount: 'vurderte forslag', stars: 'stjerner', copied: 'Kopiert', copy: 'Kopier', noRatings: 'Ingen vurderinger ennå for', noRatingsDesc: 'Vurder navnene ovenfor for å bygge din personlige toppliste for denne generatoren.', advantages: 'Viktige fordeler', limits: 'Ting å vurdere', explore: 'Utforsk andre kategorier' },
  };
  const text = ui[language] || ui.en;
  const seedCopy = getSeedCopy(language);
  const intelLabels = getNameIntelligenceLabels(language);

  const exportLabels: Record<string, string[]> = {
    en: ['Date', 'Generator', 'Style', 'Archetype', 'Tone', 'Description', 'Ideal for', 'Name', 'Pronunciation', 'Name batch'],
    fr: ['Date', 'Générateur', 'Style', 'Archétype', 'Tonalité', 'Description', 'Idéal pour', 'Nom', 'Prononciation', 'Lot de noms'],
    ar: ['التاريخ', 'المولّد', 'النمط', 'النموذج', 'النبرة', 'الوصف', 'مناسب لـ', 'الاسم', 'النطق', 'مجموعة أسماء'],
    es: ['Fecha', 'Generador', 'Estilo', 'Arquetipo', 'Tono', 'Descripción', 'Ideal para', 'Nombre', 'Pronunciación', 'Lote de nombres'],
    de: ['Datum', 'Generator', 'Stil', 'Archetyp', 'Ton', 'Beschreibung', 'Ideal für', 'Name', 'Aussprache', 'Namensliste'],
    it: ['Data', 'Generatore', 'Stile', 'Archetipo', 'Tono', 'Descrizione', 'Ideale per', 'Nome', 'Pronuncia', 'Lotto di nomi'],
    pt: ['Data', 'Gerador', 'Estilo', 'Arquétipo', 'Tom', 'Descrição', 'Ideal para', 'Nome', 'Pronúncia', 'Lote de nomes'],
    tr: ['Tarih', 'Oluşturucu', 'Stil', 'Arketip', 'Ton', 'Açıklama', 'Şunun için ideal', 'Ad', 'Telaffuz', 'Ad listesi'],
    ja: ['日付', 'ジェネレーター', 'スタイル', 'アーキタイプ', 'トーン', '説明', 'おすすめ用途', '名前', '発音', '名前一覧'],
    ko: ['날짜', '생성기', '스타일', '원형', '어조', '설명', '추천 용도', '이름', '발음', '이름 목록'],
    zh: ['日期', '生成器', '风格', '原型', '语气', '描述', '适用场景', '名称', '发音', '名称批次'],
    ru: ['Дата', 'Генератор', 'Стиль', 'Архетип', 'Тон', 'Описание', 'Подходит для', 'Имя', 'Произношение', 'Набор имён'],
    hi: ['तारीख', 'जनरेटर', 'शैली', 'आदिरूप', 'स्वर', 'विवरण', 'के लिए उपयुक्त', 'नाम', 'उच्चारण', 'नामों का समूह'],
    nl: ['Datum', 'Generator', 'Stijl', 'Archetype', 'Toon', 'Beschrijving', 'Geschikt voor', 'Naam', 'Uitspraak', 'Batch namen'],
    pl: ['Data', 'Generator', 'Styl', 'Archetyp', 'Ton', 'Opis', 'Idealne dla', 'Nazwa', 'Wymowa', 'Zestaw nazw'],
    sv: ['Datum', 'Generator', 'Stil', 'Arketyp', 'Ton', 'Beskrivning', 'Passar för', 'Namn', 'Uttal', 'Namnomgång'],
    vi: ['Ngày', 'Trình tạo', 'Phong cách', 'Nguyên mẫu', 'Sắc thái', 'Mô tả', 'Phù hợp với', 'Tên', 'Phát âm', 'Danh sách tên'],
    id: ['Tanggal', 'Generator', 'Gaya', 'Arketipe', 'Nada', 'Deskripsi', 'Cocok untuk', 'Nama', 'Pelafalan', 'Kumpulan nama'],
    th: ['วันที่', 'ตัวสร้าง', 'สไตล์', 'ต้นแบบ', 'โทน', 'คำอธิบาย', 'เหมาะสำหรับ', 'ชื่อ', 'การออกเสียง', 'ชุดชื่อ'],
    el: ['Ημερομηνία', 'Δημιουργός', 'Στυλ', 'Αρχέτυπο', 'Τόνος', 'Περιγραφή', 'Ιδανικό για', 'Όνομα', 'Προφορά', 'Ομάδα ονομάτων'],
    he: ['תאריך', 'מחולל', 'סגנון', 'ארכיטיפ', 'גוון', 'תיאור', 'מתאים ל־', 'שם', 'הגייה', 'אוסף שמות'],
    cs: ['Datum', 'Generátor', 'Styl', 'Archetyp', 'Tón', 'Popis', 'Vhodné pro', 'Jméno', 'Výslovnost', 'Sada jmen'],
    ro: ['Data', 'Generator', 'Stil', 'Arhetip', 'Ton', 'Descriere', 'Potrivit pentru', 'Nume', 'Pronunție', 'Lot de nume'],
    da: ['Dato', 'Generator', 'Stil', 'Arketype', 'Tone', 'Beskrivelse', 'Velegnet til', 'Navn', 'Udtale', 'Navneliste'],
    fi: ['Päiväys', 'Generaattori', 'Tyyli', 'Arkkityyppi', 'Sävy', 'Kuvaus', 'Sopii kohteelle', 'Nimi', 'Ääntäminen', 'Nimierä'],
    uk: ['Дата', 'Генератор', 'Стиль', 'Архетип', 'Тон', 'Опис', 'Ідеально для', 'Ім’я', 'Вимова', 'Набір імен'],
    bn: ['তারিখ', 'জেনারেটর', 'স্টাইল', 'আর্কিটাইপ', 'সুর', 'বিবরণ', 'উপযুক্ত', 'নাম', 'উচ্চারণ', 'নামের ব্যাচ'],
    nb: ['Dato', 'Generator', 'Stil', 'Arketype', 'Tone', 'Beskrivelse', 'Ideelt for', 'Navn', 'Uttale', 'Navneserie'],
  };
  const exportText = exportLabels[language] || exportLabels.en;

  const exportFormatLabels: Record<string, { txt: string; csv: string }> = {
    en: { txt: 'Export .TXT', csv: 'Export .CSV' },
    fr: { txt: 'Exporter en .TXT', csv: 'Exporter en .CSV' },
    es: { txt: 'Exportar .TXT', csv: 'Exportar .CSV' },
    de: { txt: '.TXT exportieren', csv: '.CSV exportieren' },
    it: { txt: 'Esporta .TXT', csv: 'Esporta .CSV' },
    pt: { txt: 'Exportar .TXT', csv: 'Exportar .CSV' },
    ar: { txt: 'تصدير .TXT', csv: 'تصدير .CSV' },
    tr: { txt: '.TXT dışa aktar', csv: '.CSV dışa aktar' },
    ja: { txt: '.TXTを書き出す', csv: '.CSVを書き出す' },
    ko: { txt: '.TXT 내보내기', csv: '.CSV 내보내기' },
    zh: { txt: '导出 .TXT', csv: '导出 .CSV' },
    ru: { txt: 'Экспорт .TXT', csv: 'Экспорт .CSV' },
    hi: { txt: '.TXT निर्यात करें', csv: '.CSV निर्यात करें' },
    nl: { txt: '.TXT exporteren', csv: '.CSV exporteren' },
    pl: { txt: 'Eksportuj .TXT', csv: 'Eksportuj .CSV' },
    sv: { txt: 'Exportera .TXT', csv: 'Exportera .CSV' },
    vi: { txt: 'Xuất .TXT', csv: 'Xuất .CSV' },
    id: { txt: 'Ekspor .TXT', csv: 'Ekspor .CSV' },
    th: { txt: 'ส่งออก .TXT', csv: 'ส่งออก .CSV' },
    el: { txt: 'Εξαγωγή .TXT', csv: 'Εξαγωγή .CSV' },
    he: { txt: 'ייצוא .TXT', csv: 'ייצוא .CSV' },
    cs: { txt: 'Exportovat .TXT', csv: 'Exportovat .CSV' },
    ro: { txt: 'Exportă .TXT', csv: 'Exportă .CSV' },
    da: { txt: 'Eksportér .TXT', csv: 'Eksportér .CSV' },
    fi: { txt: 'Vie .TXT', csv: 'Vie .CSV' },
    uk: { txt: 'Експорт у .TXT', csv: 'Експорт у .CSV' },
    bn: { txt: '.TXT হিসেবে রপ্তানি', csv: '.CSV হিসেবে রপ্তানি' },
    nb: { txt: 'Eksporter som .TXT', csv: 'Eksporter som .CSV' },
  };
  const exportFormat = exportFormatLabels[language] || exportFormatLabels.en;

  const [selectedStyle, setSelectedStyle] = useState('default');
  const [selectedLength, setSelectedLength] = useState<LengthOption>('medium');
  const [selectedFormat, setSelectedFormat] = useState<FormatOption>('title');
  const [selectedGender, setSelectedGender] = useState<GenderOption>('any');
  const [selectedGenLanguage, setSelectedGenLanguage] = useState<GenLanguageCode>(
    settings.defaultGenLanguage || 'auto'
  );
  const previousDefaultGenLanguage = useRef<GenLanguageCode>(settings.defaultGenLanguage || 'auto');

  useEffect(() => subscribeToSettings((next) => {
    const nextDefault = next.defaultGenLanguage || 'auto';
    if (nextDefault !== previousDefaultGenLanguage.current) {
      previousDefaultGenLanguage.current = nextDefault;
      setSelectedGenLanguage(nextDefault);
    }
  }), []);

  const [quantity, setQuantity] = useState(9);
  const [keyword, setKeyword] = useState('');
  const [seed, setSeed] = useState('');
  const [results, setResults] = useState<GeneratedName[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [batchCopied, setBatchCopied] = useState(false);

  const [noteModalData, setNoteModalData] = useState<{
    name: string;
    generatorId: GeneratorId | string;
    style: string;
  } | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [inspectedBatchItem, setInspectedBatchItem] = useState<GeneratedName | null>(null);

  const [categoryTopRated, setCategoryTopRated] = useState<SavedNameEntry[]>([]);
  const [copiedTopName, setCopiedTopName] = useState<string | null>(null);

  useEffect(() => () => {
    if (generationTimeout.current) clearTimeout(generationTimeout.current);
  }, []);

  const refreshCategoryTopRated = () => {
    setCategoryTopRated(getTopRatedNamesByCategory(generatorId, 6));
  };

  useEffect(() => {
    refreshCategoryTopRated();
    const unsub = subscribeToStorage(refreshCategoryTopRated);
    return () => unsub();
  }, [generatorId]);

  const handleCopyTop = async (nameText: string) => {
    if (await copyToClipboard(nameText)) {
      setCopiedTopName(nameText);
      setTimeout(() => setCopiedTopName(null), 1400);
    }
  };

  const handleCopyBatch = async () => {
    if (!results.length) return;
    const payload = results
      .map((r) => `${r.name} — ${getLocalizedStyleLabel(r.style, language, generatorId)} (${r.tone}): ${r.description}`)
      .join('\n');
    if (await copyToClipboard(payload)) {
      setBatchCopied(true);
      setTimeout(() => setBatchCopied(false), 1800);
    }
  };

  const handleExportBatchTXT = () => {
    if (!results.length) return;
    const content = [
      `========================================================`,
      `NameForge — ${exportText[9]} (${localizedTitle})`,
      `${exportText[0]}: ${new Date().toLocaleString(language)}`,
      `${exportText[1]}: ${generatorId} | ${exportText[2]}: ${getLocalizedStyleLabel(selectedStyle, language, generatorId)}`,
      `========================================================\n`,
      ...results.map((r, i) => `${i + 1}. ${r.name}\n   ${exportText[3]}: ${getLocalizedStyleLabel(r.style, language, generatorId)} | ${exportText[4]}: ${r.tone}\n   ${exportText[5]}: ${r.description}\n   ${exportText[6]}: ${r.bestFor}\n`),
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nameforge-${generatorId}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportBatchCSV = () => {
    if (!results.length) return;
    const header = [exportText[7], exportText[3], exportText[4], exportText[5], exportText[6], exportText[8]];
    const rows = results.map((r) => [
      r.name,
      getLocalizedStyleLabel(r.style, language, generatorId),
      r.tone,
      r.description,
      r.bestFor,
      r.pronunciation || '',
    ]);
    const csvContent = buildCsvContent(header, rows, { includeBom: true });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nameforge-${generatorId}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (generationTimeout.current) clearTimeout(generationTimeout.current);
    setIsGenerating(true);
    generationTimeout.current = setTimeout(() => {
      const effectiveGenLanguage: GenLanguageCode = resolveGenerationLanguage(selectedGenLanguage, language);
      const generated = generateNames({
        generator: generatorId,
        style: selectedStyle,
        length: selectedLength,
        format: selectedFormat,
        gender: selectedGender,
        genLanguage: effectiveGenLanguage,
        quantity,
        keyword,
        seed: seed.trim() || undefined,
      });
      setResults(generated);
      setIsGenerating(false);
      generationTimeout.current = null;
    }, 280);
  };

  const generateRef = useRef(handleGenerate);
  generateRef.current = handleGenerate;

  useEffect(() => {
    handleGenerate();
    return () => {
      if (generationTimeout.current) {
        clearTimeout(generationTimeout.current);
        generationTimeout.current = null;
      }
    };
  }, [
    generatorId,
    selectedStyle,
    selectedLength,
    selectedFormat,
    selectedGender,
    selectedGenLanguage,
    quantity,
    keyword,
    seed,
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        generateRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const compatibility = getCategoryLanguageCompatibility(
    generatorId,
    selectedGenLanguage,
    language
  );
  const assessment = getGeneratorCompatibilityAssessment(
    generatorId,
    selectedGenLanguage,
    language
  );
  const enh = getEnhancementsLabels(language);
  const dir = getTextDirection(language);

  const getBadgeStyle = (level: CompatibilityLevel) => {
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
  };
  const badgeStyle = getBadgeStyle(assessment.level);
  const quickLangsToShow =
    compatibility.suggestedLanguages.length > 0
      ? compatibility.suggestedLanguages
      : assessment.quickSuggestedLanguages;

  return (
    <div dir={dir} lang={language} className="nf-page nf-page-layout nf-generator-detail pb-20">
      {noteModalData && (
        <NoteModal
          name={noteModalData.name}
          generatorId={noteModalData.generatorId}
          style={noteModalData.style}
          onClose={() => setNoteModalData(null)}
          onSave={refreshCategoryTopRated}
        />
      )}

      {showCompareModal && (
        <CompareModal
          initialNames={results.slice(0, 2).map((r) => r.name)}
          availableBatchNames={results.map((r) => r.name)}
          defaultGeneratorId={generatorId}
          generationLanguage={selectedGenLanguage}
          onInspectReport={(name, genId, style) => {
            const foundResult = results.find((r) => r.name.toLowerCase() === name.toLowerCase());
            const savedEntry = findSavedEntry(name);
            setShowCompareModal(false);
            setInspectedBatchItem(
              foundResult || {
                name,
                generatorId: (savedEntry?.generator || genId) as GeneratorId,
                style: savedEntry?.style || style || 'default',
                tone: '',
                description: savedEntry?.note || '',
                bestFor: '',
                icon: sourceMeta.icon,
              }
            );
          }}
          onClose={() => setShowCompareModal(false)}
          onUpdate={refreshCategoryTopRated}
        />
      )}

      {inspectedBatchItem && (
        <Suspense fallback={null}>
          <CompleteNameAnalysisModal
            item={inspectedBatchItem}
            meta={sourceMeta}
            generationLanguage={selectedGenLanguage}
            batchNames={results.map((r) => r.name)}
            onClose={() => setInspectedBatchItem(null)}
            onUpdate={refreshCategoryTopRated}
            onOpenNote={(name, genId, style) =>
              setNoteModalData({ name, generatorId: genId, style })
            }
          />
        </Suspense>
      )}

      {/* Back link + Hero */}
      <div className="nf-container pt-8">
        <button
          type="button"
          onClick={() => onNavigate('generators')}
          className="nf-btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 text-xs mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{text.back}</span>
        </button>

        <div className="nf-page-header text-center max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--nf-accent-ink)]">
            {meta.badge}
          </p>

          <h1 className="nf-animated-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {localizedTitle}
          </h1>

          <p className="text-sm sm:text-base text-[var(--nf-muted)] max-w-3xl mx-auto leading-relaxed">
            {localizedDescription}
          </p>

          {meta.legalDisclaimer && (
            <div
              className="mt-3 p-3.5 rounded-xl flex items-center justify-center gap-2 max-w-xl mx-auto text-xs border"
              style={{
                backgroundColor: 'var(--nf-warning-bg)',
                borderColor: 'var(--nf-warning-border)',
                color: 'var(--nf-warning)',
              }}
            >
              <ShieldAlert className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>{meta.legalDisclaimer}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Generator Card */}
      <section id="generator" className="nf-container">
        <div className="nf-generator-panel nf-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="nf-animated-heading text-xl sm:text-2xl font-black flex items-center gap-2">
                <span aria-hidden="true">{meta.icon}</span>
                <span>{localizedTitle}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[var(--nf-muted)] mt-1">
                {localizedDescription}
              </p>
            </div>
          </div>

          <GeneratorControl
            generatorId={generatorId}
            style={selectedStyle}
            onStyleChange={setSelectedStyle}
            length={selectedLength}
            onLengthChange={setSelectedLength}
            format={selectedFormat}
            onFormatChange={setSelectedFormat}
            gender={selectedGender}
            onGenderChange={setSelectedGender}
            genLanguage={selectedGenLanguage}
            onGenLanguageChange={setSelectedGenLanguage}
            quantity={quantity}
            onQuantityChange={setQuantity}
            keyword={keyword}
            onKeywordChange={setKeyword}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <div className="nf-panel p-4">
            <label htmlFor="nameforge-seed" className="mb-2 block text-xs font-bold text-[var(--nf-ink)]">
              {seedCopy.label}
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="nameforge-seed"
                type="text"
                value={seed}
                onChange={(event) => setSeed(event.target.value)}
                placeholder={seedCopy.placeholder}
                maxLength={120}
                className="nf-input min-w-0 flex-1 px-3 text-sm"
              />
              <button
                type="button"
                onClick={() => setSeed(typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2, 12))}
                className="nf-btn-secondary px-3.5 py-2 text-xs cursor-pointer"
              >
                {seedCopy.newSeed}
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--nf-subtle)]">
              {seedCopy.help}
            </p>
          </div>

          {/* Batch Actions Bar */}
          <div className="nf-panel flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--nf-muted)] font-semibold">
              <span>{results.length} {text.proposals}</span>
              {keyword && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[var(--nf-accent-ink)]">
                    {text.inspired} “{keyword}”
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyBatch}
                className="nf-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                title={text.copyAllTitle}
              >
                {batchCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--nf-success)]" aria-hidden="true" />
                    <span className="text-[var(--nf-success)]">{text.copiedBatch}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--nf-subtle)]" aria-hidden="true" />
                    <span>{text.copyBatch}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleExportBatchTXT}
                className="nf-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer"
                title={text.exportTextTitle}
              >
                <Download className="w-3.5 h-3.5 text-[var(--nf-secondary-ink)]" aria-hidden="true" />
                <span>{exportFormat.txt}</span>
              </button>

              <button
                type="button"
                onClick={handleExportBatchCSV}
                className="nf-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1 cursor-pointer"
                title={text.exportCsvTitle}
              >
                <Download className="w-3.5 h-3.5 text-[var(--nf-accent-ink)]" aria-hidden="true" />
                <span>{exportFormat.csv}</span>
              </button>

              {results.length > 0 && (
                <button
                  type="button"
                  data-testid="batch-compare-button"
                  onClick={() => setShowCompareModal(true)}
                  className="nf-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5 cursor-pointer"
                  title={intelLabels.comparison.batchCompareTitle}
                >
                  <Scale className="w-3.5 h-3.5 text-[var(--nf-primary)]" aria-hidden="true" />
                  <span>{intelLabels.comparison.openBatchCompare}</span>
                </button>
              )}
            </div>
          </div>

          {/* Language & Generator Compatibility Panel + Educational Disclosure */}
          <div className="space-y-2.5">
            <aside
              data-testid="generator-compatibility-notice"
              role="note"
              aria-live="polite"
              className="rounded-xl border p-4 text-xs sm:text-sm space-y-2.5"
              style={
                compatibility.showNotice && compatibility.tone === 'warning'
                  ? {
                      backgroundColor: 'var(--nf-warning-bg)',
                      borderColor: 'var(--nf-warning-border)',
                      color: 'var(--nf-warning)',
                    }
                  : {
                      backgroundColor: 'var(--nf-surface-muted)',
                      borderColor: 'var(--nf-border)',
                      color: 'var(--nf-ink)',
                    }
              }
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold">
                  <Globe className="h-4 w-4 text-[var(--nf-accent-ink)] shrink-0" aria-hidden="true" />
                  <span>{enh.compatibility.heading}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 text-xs font-bold ${badgeStyle.classes}`}
                >
                  <badgeStyle.Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{assessment.badgeLabel}</span>
                </span>
              </div>

              {compatibility.showNotice && compatibility.noticeTitle && (
                <p className="font-bold leading-snug text-xs sm:text-sm">{compatibility.noticeTitle}</p>
              )}

              <p className="text-xs leading-relaxed opacity-95">
                {compatibility.showNotice
                  ? compatibility.noticeMessage
                  : `${assessment.statusExplanation} ${assessment.profile.whyLanguagesFit}`}
              </p>

              {quickLangsToShow.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-xs font-semibold opacity-80">
                    {compatibility.suggestedLanguages.length > 0
                      ? getCompatibilitySuggestedLabel(language)
                      : `${enh.compatibility.suitableLanguagesLabel}:`}
                  </span>
                  {quickLangsToShow.map((langCode) => {
                    const langOption = GEN_LANGUAGES.find((item) => item.code === langCode);
                    const isCurrent = selectedGenLanguage === langCode;
                    return (
                      <button
                        key={langCode}
                        type="button"
                        onClick={() => setSelectedGenLanguage(langCode)}
                        aria-pressed={isCurrent}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                          isCurrent
                            ? 'bg-[var(--nf-primary)] text-[var(--nf-primary-ink)] border-[var(--nf-primary)]'
                            : 'bg-[var(--nf-surface)] text-[var(--nf-ink)] border-[var(--nf-border)] hover:border-[var(--nf-primary)]'
                        }`}
                      >
                        {langOption ? langOption.label : langCode}
                      </button>
                    );
                  })}
                </div>
              )}
            </aside>

            <details
              data-testid="why-language-matters-panel"
              className="nf-panel p-4 group text-start"
            >
              <summary className="list-none flex items-center justify-between gap-3 cursor-pointer text-xs sm:text-sm font-bold text-[var(--nf-ink)]">
                <span className="inline-flex items-center gap-2">
                  <Info className="w-4 h-4 text-[var(--nf-accent-ink)] shrink-0" aria-hidden="true" />
                  <span>{enh.compatibility.whyTitle}</span>
                </span>
                <ChevronDown
                  className="w-4 h-4 text-[var(--nf-subtle)] transition-transform group-open:rotate-180 shrink-0"
                  aria-hidden="true"
                />
              </summary>

              <div className="mt-3 pt-3 border-t border-[var(--nf-border)] space-y-4 text-xs text-[var(--nf-muted)] leading-relaxed">
                <p>{enh.compatibility.generalIntro}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {enh.compatibility.whyPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[var(--nf-border)] bg-[var(--nf-surface)] p-3 space-y-1"
                    >
                      <p className="font-bold text-[var(--nf-ink)]">{pt.title}</p>
                      <p>{pt.body}</p>
                    </div>
                  ))}
                </div>

                {/* Generator Compatibility Profile Metadata */}
                <div className="rounded-xl border border-[var(--nf-border)] bg-[var(--nf-surface)] p-3.5 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="font-bold text-[var(--nf-ink)]">{enh.compatibility.generatorLabel}: </span>
                      <span>{assessment.profile.generatorName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-[var(--nf-ink)]">{enh.compatibility.categoryLabel}: </span>
                      <span>{assessment.profile.categoryName}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-[var(--nf-ink)]">
                        {enh.compatibility.suitableLanguagesLabel}:{' '}
                      </span>
                      <span>{assessment.profile.suitableLanguages.join(', ')}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-[var(--nf-ink)]">
                        {enh.compatibility.otherSupportedLabel}:{' '}
                      </span>
                      <span>{assessment.profile.otherSupportedLanguages.join(', ')}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-[var(--nf-ink)]">
                        {enh.compatibility.recommendedLanguageLabel}:{' '}
                      </span>
                      <span>
                        {assessment.profile.recommendedLanguage || enh.compatibility.noSingleRecommendation}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--nf-border)] space-y-1.5">
                    <p>
                      <strong className="text-[var(--nf-ink)]">{enh.compatibility.whyFitLabel}: </strong>
                      {assessment.profile.whyLanguagesFit}
                    </p>
                    <p>
                      <strong className="text-[var(--nf-ink)]">{enh.compatibility.limitationsLabel}: </strong>
                      {assessment.profile.knownLimitations}
                    </p>
                    <p>
                      <strong className="text-[var(--nf-ink)]">{enh.compatibility.culturalNotesLabel}: </strong>
                      {assessment.profile.culturalConsiderations}
                    </p>
                    <p>
                      <strong className="text-[var(--nf-ink)]">{enh.compatibility.exampleLabel}: </strong>
                      {assessment.profile.contextualExample}
                    </p>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Results Grid */}
          <div className="nf-results-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <NameCard
                key={item.name}
                item={item}
                batchNames={results.map((r) => r.name)}
                generationLanguage={selectedGenLanguage}
                onOpenNote={(name, genId, st) =>
                  setNoteModalData({ name, generatorId: genId, style: st })
                }
                onDataChange={refreshCategoryTopRated}
              />
            ))}
          </div>

          <div className="text-center pt-2 text-xs text-[var(--nf-subtle)]">
            {text.tip}{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--nf-surface-muted)] text-[var(--nf-ink)] font-mono text-[11px] border border-[var(--nf-border)]">
              G
            </kbd>{' '}
            {text.tipEnd}
          </div>
        </div>
      </section>

      {/* Category-Specific Top Rated Leaderboard */}
      <section className="nf-container">
        <div className="nf-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--nf-border)] pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--nf-warning)] mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{text.leaderboard} · {localizedShortTitle}</span>
              </p>
              <h2 className="nf-animated-heading text-xl sm:text-2xl font-black tracking-tight">
                {text.bestNames} ({localizedShortTitle})
              </h2>
              <p className="text-xs text-[var(--nf-muted)] mt-1">
                {text.leaderboardDesc}
              </p>
            </div>
            <div className="text-xs text-[var(--nf-muted)] font-semibold">
              {categoryTopRated.length} {text.ratedCount}
            </div>
          </div>

          {categoryTopRated.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTopRated.map((item) => (
                <div
                  key={item.id}
                  className="nf-panel p-4 flex flex-col justify-between transition hover:border-[var(--nf-border-strong)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                      <span className="font-bold text-[var(--nf-warning)] flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                        <span>{item.rating || 5}/5 {text.stars}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[var(--nf-subtle)]">
                        {getLocalizedStyleLabel(item.style, language, generatorId)}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--nf-ink)] tracking-tight">{item.name}</h3>
                    {item.note && (
                      <p className="text-xs text-[var(--nf-muted)] mt-1 line-clamp-2 italic">
                        “{item.note}”
                      </p>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-[var(--nf-border)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--nf-subtle)]">
                      {new Date(item.createdAt).toLocaleDateString(language)}
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleCopyTop(item.name)}
                      className="nf-btn-secondary py-1 px-2.5 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTopName === item.name ? (
                        <>
                          <Check className="w-3 h-3 text-[var(--nf-success)]" aria-hidden="true" />
                          <span>{text.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" aria-hidden="true" />
                          <span>{text.copy}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 text-center max-w-md mx-auto space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--nf-warning-bg)] border border-[var(--nf-warning-border)] text-[var(--nf-warning)] mx-auto flex items-center justify-center">
                <Star className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-[var(--nf-ink)]">{text.noRatings} {localizedShortTitle}</h3>
              <p className="text-xs text-[var(--nf-muted)] leading-relaxed">
                {text.noRatingsDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Guidance Section */}
      <section className="nf-reading-container">
        <div className="nf-surface p-6 sm:p-8 space-y-6">
          <h2 className="nf-animated-heading text-xl sm:text-2xl font-black">
            {meta.guideTitle}
          </h2>
          <div className="space-y-4">
            {meta.guide.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <h3 className="text-sm font-bold text-[var(--nf-accent-ink)]">{step.h}</h3>
                <p className="text-xs sm:text-sm text-[var(--nf-muted)] leading-relaxed">{step.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="nf-container">
        <h2 className="nf-animated-heading text-xl sm:text-2xl font-black text-center mb-8">
          {meta.cardsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {meta.cards.map((card, idx) => (
            <div
              key={idx}
              className="nf-surface p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl mb-3 block" aria-hidden="true">{card.icon}</span>
                <h3 className="text-base font-bold text-[var(--nf-ink)] mb-2">{card.h}</h3>
                <p className="text-xs text-[var(--nf-muted)] leading-relaxed">{card.p}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages vs Limits */}
      {(meta.advantages || meta.limits) && (
        <section className="nf-reading-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {meta.advantages && (
              <div
                className="p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--nf-success-bg)',
                  borderColor: 'var(--nf-success-border)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
                  style={{ color: 'var(--nf-success)' }}
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>{text.advantages}</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-[var(--nf-ink)]">
                  {meta.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span style={{ color: 'var(--nf-success)' }} aria-hidden="true">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {meta.limits && (
              <div
                className="p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--nf-warning-bg)',
                  borderColor: 'var(--nf-warning-border)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5"
                  style={{ color: 'var(--nf-warning)' }}
                >
                  <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                  <span>{text.limits}</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-[var(--nf-ink)]">
                  {meta.limits.map((lim, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span style={{ color: 'var(--nf-warning)' }} aria-hidden="true">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ specific to category */}
      {meta.faq && meta.faq.length > 0 && (
        <section className="nf-reading-container">
          <h2 className="nf-animated-heading text-xl sm:text-2xl font-black text-center mb-6">
            {meta.faqTitle}
          </h2>
          <div className="space-y-3">
            {meta.faq.map((item, idx) => (
              <details key={idx} className="nf-surface p-5 group">
                <summary className="list-none flex items-center justify-between gap-3 cursor-pointer text-sm font-bold text-[var(--nf-ink)]">
                  <span>{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-[var(--nf-subtle)] transition-transform group-open:rotate-180 shrink-0" aria-hidden="true" />
                </summary>
                <p className="mt-3 pt-3 border-t border-[var(--nf-border)] text-xs text-[var(--nf-muted)] leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Other generators switcher */}
      <section className="nf-container pt-6 border-t border-[var(--nf-border)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--nf-subtle)] mb-4 text-center">
          {text.explore}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ALL_GENERATORS_LIST.filter((g) => g.id !== generatorId).slice(0, 10).map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onNavigate('generator-detail', g.id)}
              className="nf-btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span aria-hidden="true">{g.icon}</span>
              <span>{getLocalizedGeneratorShortTitle(g.id, language, g.shortTitle)}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

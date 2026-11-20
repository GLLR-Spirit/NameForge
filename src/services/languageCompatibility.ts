import type { GenLanguageCode, GeneratorFamily, GeneratorId } from '../types';
import { GENERATORS_METADATA } from '../data/generators';
import { PHRASE_BANK_GENERATORS } from '../data/phraseBanks';
import { LOCALIZED_BABY_NAMES } from '../data/attestedBabyNames';
import { getLanguageScriptProfile } from './linguisticRules';
import { resolveGenerationLanguage } from './settings';

export type CompatibilityStrategy =
  | 'native-language'
  | 'culturally-faithful'
  | 'phonetic-transliteration'
  | 'experimental-creative-adaptation'
  | 'unsupported';

export type CompatibilityNoticeTone = 'info' | 'warning';

export type CategoryCulturalIdentity =
  | 'japanese-anime'
  | 'attested-personal'
  | 'curated-phrase-bank'
  | 'cultural-mythic'
  | 'procedural-general';

export interface CategoryLanguageCompatibility {
  generatorId: GeneratorId;
  requestedLanguage: GenLanguageCode;
  effectiveLanguage: GenLanguageCode;
  interfaceLanguage: string;
  categoryIdentity: CategoryCulturalIdentity;
  strategy: CompatibilityStrategy;
  preserveCulturalIdentity: boolean;
  supportsTargetScriptRendering: boolean;
  usesExperimentalKatakana: boolean;
  showNotice: boolean;
  tone: CompatibilityNoticeTone;
  noticeTitle: string;
  noticeMessage: string;
  suggestedLanguages: GenLanguageCode[];
}

/**
 * Generators anchored in Japanese anime naming conventions where cultural
 * authenticity relies on Japanese-inspired phonetics / romaji / katakana.
 */
export const JAPANESE_ANIME_GENERATORS = new Set<GeneratorId>([
  'anime',
  'anime_hero',
  'anime_rival',
  'anime_school',
  'clan_name',
  'fictional_mentor',
]);

/**
 * Other culturally anchored generators whose roots evoke specific traditions
 * (Norse, Samurai/Ninja, Celtic, Mythic) and remain recognizable through those roots.
 */
const CULTURAL_MYTHIC_GENERATORS = new Set<GeneratorId>([
  'spirit_guardian',
  'elf',
  'dragon',
  'vampire',
  'warrior',
  'wizard',
  'fantasy',
  'rpg',
  'kingdom',
]);

const PHRASE_BANK_SET = new Set<string>(PHRASE_BANK_GENERATORS);

export function getCategoryCulturalIdentity(generatorId: GeneratorId): CategoryCulturalIdentity {
  if (generatorId === 'baby_name') return 'attested-personal';
  if (PHRASE_BANK_SET.has(generatorId)) return 'curated-phrase-bank';
  if (JAPANESE_ANIME_GENERATORS.has(generatorId)) return 'japanese-anime';
  if (CULTURAL_MYTHIC_GENERATORS.has(generatorId)) return 'cultural-mythic';
  return 'procedural-general';
}

type CompatibilityNoticeKey =
  | 'japaneseCulturalPreserved'
  | 'japaneseExperimentalKatakana'
  | 'arabicPhoneticTransliteration'
  | 'nonLatinCreativeAdaptation'
  | 'babyNameUnsupported';

interface LocalizedCompatibilityStrings {
  titleCultural: string;
  titleExperimental: string;
  titleTransliteration: string;
  titleUnsupported: string;
  japaneseCulturalPreserved: string;
  japaneseExperimentalKatakana: string;
  arabicPhoneticTransliteration: string;
  nonLatinCreativeAdaptation: string;
  babyNameUnsupported: string;
  suggestedLabel: string;
}

const NOTICE_STRINGS: Record<string, LocalizedCompatibilityStrings> = {
  fr: {
    titleCultural: 'Identité culturelle préservée',
    titleExperimental: 'Adaptation expérimentale',
    titleTransliteration: 'Translittération phonétique',
    titleUnsupported: 'Corpus natif non disponible',
    japaneseCulturalPreserved:
      'Cette catégorie conserve des formes d’inspiration japonaise afin de préserver l’identité culturelle des noms générés.',
    japaneseExperimentalKatakana:
      'Sortie expérimentale d’inspiration japonaise en katakana : ces formes créatives ne constituent pas des prénoms ou noms japonais attestés.',
    arabicPhoneticTransliteration:
      'La langue sélectionnée utilise une translittération phonétique en écriture arabe afin de conserver les racines thématiques de la catégorie.',
    nonLatinCreativeAdaptation:
      'Cette langue utilise une adaptation créative contrôlée en écriture locale ; les noms générés restent expérimentaux et non attestés.',
    babyNameUnsupported:
      'Aucun répertoire vérifié de prénoms réels dans cette écriture n’est encore inclus ; aucune invention artificielle n’est affichée. Essayez par exemple :',
    suggestedLabel: 'Langues recommandées',
  },
  en: {
    titleCultural: 'Cultural identity preserved',
    titleExperimental: 'Experimental adaptation',
    titleTransliteration: 'Phonetic transliteration',
    titleUnsupported: 'Native corpus unavailable',
    japaneseCulturalPreserved:
      'This category preserves Japanese-inspired forms to maintain the cultural identity of the generated names.',
    japaneseExperimentalKatakana:
      'Experimental Japanese-inspired katakana output: these creative forms are controlled approximations, not verified or attested Japanese names.',
    arabicPhoneticTransliteration:
      'This language uses phonetic transliteration into Arabic script so the category retains its distinct thematic roots.',
    nonLatinCreativeAdaptation:
      'This language uses controlled creative adaptation in the target script; generated names remain experimental rather than verified native words.',
    babyNameUnsupported:
      'No verified real-name directory in this script is included yet, so NameForge avoids fabricating given names. Try instead:',
    suggestedLabel: 'Recommended languages',
  },
  es: {
    titleCultural: 'Identidad cultural preservada',
    titleExperimental: 'Adaptación experimental',
    titleTransliteration: 'Transliteración fonética',
    titleUnsupported: 'Corpus nativo no disponible',
    japaneseCulturalPreserved:
      'Esta categoría conserva formas de inspiración japonesa para preservar la identidad cultural de los nombres generados.',
    japaneseExperimentalKatakana:
      'Salida experimental en katakana de inspiración japonesa: son aproximaciones creativas, no nombres japoneses verificados.',
    arabicPhoneticTransliteration:
      'Este idioma aplica transliteración fonética al alfabeto árabe para mantener las raíces temáticas de la categoría.',
    nonLatinCreativeAdaptation:
      'Este idioma utiliza una adaptación creativa controlada en su escritura local; los nombres generados son experimentales.',
    babyNameUnsupported:
      'Todavía no se incluye un repertorio verificado de nombres reales en esta escritura. Prueba con:',
    suggestedLabel: 'Idiomas recomendados',
  },
  de: {
    titleCultural: 'Kulturelle Identität gewahrt',
    titleExperimental: 'Experimentelle Anpassung',
    titleTransliteration: 'Phonetische Transliteration',
    titleUnsupported: 'Kein natives Verzeichnis verfügbar',
    japaneseCulturalPreserved:
      'Diese Kategorie behält japanisch inspirierte Formen bei, um die kulturelle Identität der generierten Namen zu wahren.',
    japaneseExperimentalKatakana:
      'Experimentelle Katakana-Ausgabe: Diese kreativen Formen sind kontrollierte Annäherungen und keine belegten japanischen Namen.',
    arabicPhoneticTransliteration:
      'Diese Sprache nutzt phonetische Transliteration in arabischer Schrift, damit die Themenwurzeln der Kategorie erhalten bleiben.',
    nonLatinCreativeAdaptation:
      'Diese Sprache verwendet eine kontrollierte kreative Anpassung in der Zielschrift; die Ergebnisse sind experimentell.',
    babyNameUnsupported:
      'Für diese Schrift liegt noch kein geprüftes Verzeichnis realer Vornamen vor. Empfohlene Alternativen:',
    suggestedLabel: 'Empfohlene Sprachen',
  },
  it: {
    titleCultural: 'Identità culturale preservata',
    titleExperimental: 'Adattamento sperimentale',
    titleTransliteration: 'Traslitterazione fonetica',
    titleUnsupported: 'Archivio nativo non disponibile',
    japaneseCulturalPreserved:
      'Questa categoria mantiene forme di ispirazione giapponese per preservare l’identità culturale dei nomi generati.',
    japaneseExperimentalKatakana:
      'Output sperimentale in katakana: queste forme creative non sono nomi giapponesi verificati o attestati.',
    arabicPhoneticTransliteration:
      'Questa lingua utilizza la traslitterazione fonetica in caratteri arabi per conservare le radici tematiche della categoria.',
    nonLatinCreativeAdaptation:
      'Questa lingua utilizza un adattamento creativo controllato nella scrittura scelta; i nomi restano sperimentali.',
    babyNameUnsupported:
      'Non è ancora disponibile un elenco verificato di nomi reali in questo sistema di scrittura. Prova con:',
    suggestedLabel: 'Lingue consigliate',
  },
  pt: {
    titleCultural: 'Identidade cultural preservada',
    titleExperimental: 'Adaptação experimental',
    titleTransliteration: 'Transliteração fonética',
    titleUnsupported: 'Acervo nativo indisponível',
    japaneseCulturalPreserved:
      'Esta categoria mantém formas de inspiração japonesa para preservar a identidade cultural dos nomes gerados.',
    japaneseExperimentalKatakana:
      'Saída experimental em katakana: estas formas criativas não são nomes japoneses verificados ou atestados.',
    arabicPhoneticTransliteration:
      'Este idioma usa transliteração fonética para o alfabeto árabe a fim de manter as raízes temáticas da categoria.',
    nonLatinCreativeAdaptation:
      'Este idioma utiliza adaptação criativa controlada na escrita escolhida; os resultados são experimentais.',
    babyNameUnsupported:
      'Ainda não há um repertório verificado de nomes reais nesta escrita. Experimente:',
    suggestedLabel: 'Idiomas recomendados',
  },
  ar: {
    titleCultural: 'الحفاظ على الهوية الثقافية',
    titleExperimental: 'تكييف إبداعي تجريبي',
    titleTransliteration: 'نقحرة صوتية',
    titleUnsupported: 'لا يتوفر سجل أسماء موثق',
    japaneseCulturalPreserved:
      'تحافظ هذه الفئة على صيغ مستوحاة من اليابانية لصون الهوية الثقافية للأسماء المولّدة.',
    japaneseExperimentalKatakana:
      'مخرجات كاتاكانا تجريبية مستوحاة من اليابانية: هذه الصيغ تقريب إبداعي وليست أسماء يابانية موثقة.',
    arabicPhoneticTransliteration:
      'تُستخدم النقحرة الصوتية بالحروف العربية للحفاظ على الجذور الموضوعية الخاصة بهذه الفئة.',
    nonLatinCreativeAdaptation:
      'تعتمد هذه اللغة على تكييف إبداعي مضبوط بالكتابة المحلية؛ وتبقى النتائج تجريبية.',
    babyNameUnsupported:
      'لا يتوفر بعد دليل أسماء شخصية موثق بهذه الكتابة. جرّب إحدى اللغات المتاحة:',
    suggestedLabel: 'اللغات الموصى بها',
  },
  tr: {
    titleCultural: 'Kültürel kimlik korundu',
    titleExperimental: 'Deneysel uyarlama',
    titleTransliteration: 'Fonetik çeviri yazı',
    titleUnsupported: 'Yerel ad dizini mevcut değil',
    japaneseCulturalPreserved:
      'Bu kategori, üretilen adların kültürel kimliğini korumak için Japonca esinli biçimleri korur.',
    japaneseExperimentalKatakana:
      'Deneysel katakana çıktısı: bu yaratıcı biçimler doğrulanmış gerçek Japonca adlar değildir.',
    arabicPhoneticTransliteration:
      'Bu dil, kategorinin tematik köklerini korumak için Arap alfabesine fonetik aktarım kullanır.',
    nonLatinCreativeAdaptation:
      'Bu dil hedef yazıda kontrollü yaratıcı uyarlama kullanır; sonuçlar deneyseldir.',
    babyNameUnsupported:
      'Bu yazı sisteminde doğrulanmış gerçek ad listesi henüz eklenmedi. Önerilenler:',
    suggestedLabel: 'Önerilen diller',
  },
  ja: {
    titleCultural: '文化的アイデンティティの保持',
    titleExperimental: '実験的な適応表現',
    titleTransliteration: '音訳レンダリング',
    titleUnsupported: 'ネイティブ名簿未対応',
    japaneseCulturalPreserved:
      'このカテゴリは生成される名前の文化的背景を保つため、日本風・アニメ風の語形を維持します。',
    japaneseExperimentalKatakana:
      '実験的なカタカナ変換出力です。実在・検証済みの日本語名ではなく創作向け近似表現です。',
    arabicPhoneticTransliteration:
      'カテゴリの語根を保つため、アラビア文字への音訳処理を行っています。',
    nonLatinCreativeAdaptation:
      '選択された文字体系向けに制御された創作適応を使用しており、結果は実験的なものです。',
    babyNameUnsupported:
      'この文字体系で検証済みの実在人名コーパスはまだ収録されていません。推奨言語：',
    suggestedLabel: '推奨言語',
  },
  ko: {
    titleCultural: '문화적 정체성 유지',
    titleExperimental: '실험적 창작 변환',
    titleTransliteration: '음성 음차 변환',
    titleUnsupported: '검증된 현지 이름 데이터 없음',
    japaneseCulturalPreserved:
      '이 카테고리는 생성된 이름의 문화적 정체성을 유지하기 위해 일본풍 어형을 보존합니다.',
    japaneseExperimentalKatakana:
      '실험적인 가타카나 출력입니다. 검증된 실제 일본어 이름이 아닌 창작용 근사 형태입니다.',
    arabicPhoneticTransliteration:
      '카테고리의 주제 어근을 유지하기 위해 아랍 문자로 음성 음차를 적용합니다.',
    nonLatinCreativeAdaptation:
      '이 언어는 현지 문자에 맞춘 제어된 창작 변환을 사용하며 결과는 실험적입니다.',
    babyNameUnsupported:
      '이 문자 체계의 검증된 실제 이름 목록이 아직 포함되지 않았습니다. 추천 언어:',
    suggestedLabel: '추천 언어',
  },
  zh: {
    titleCultural: '保留文化风格',
    titleExperimental: '实验性创意适配',
    titleTransliteration: '音译转写',
    titleUnsupported: '暂未收录原生人名库',
    japaneseCulturalPreserved:
      '该分类保留日式风格词形，以维持生成名称的文化辨识度。',
    japaneseExperimentalKatakana:
      '实验性片假名输出：这些创意名称为近似转写，并非经过核验的真实日语姓名。',
    arabicPhoneticTransliteration:
      '该语言采用阿拉伯字母音译，以保留当前分类的主题词根。',
    nonLatinCreativeAdaptation:
      '该语言采用受控的目标文字创意适配，生成结果属于实验性质。',
    babyNameUnsupported:
      '当前文字尚未收录经核验的真实人名库，建议使用以下语言：',
    suggestedLabel: '推荐语言',
  },
  ru: {
    titleCultural: 'Культурная идентичность сохранена',
    titleExperimental: 'Экспериментальная адаптация',
    titleTransliteration: 'Фонетическая транслитерация',
    titleUnsupported: 'Нет проверенной базы имён',
    japaneseCulturalPreserved:
      'Эта категория сохраняет формы японского вдохновения, чтобы не утратить культурный стиль имён.',
    japaneseExperimentalKatakana:
      'Экспериментальный вывод катаканой: эти формы носят творческий характер и не являются подтверждёнными японскими именами.',
    arabicPhoneticTransliteration:
      'Используется фонетическая транслитерация в арабскую графику с сохранением тематических корней категории.',
    nonLatinCreativeAdaptation:
      'Для этого языка применяется контролируемая творческая адаптация в целевой письменности.',
    babyNameUnsupported:
      'Проверенный каталог реальных имён для этой письменности пока не добавлен. Попробуйте:',
    suggestedLabel: 'Рекомендуемые языки',
  },
  hi: {
    titleCultural: 'सांस्कृतिक पहचान सुरक्षित',
    titleExperimental: 'प्रयोगात्मक रूपांतरण',
    titleTransliteration: 'ध्वन्यात्मक लिप्यंतरण',
    titleUnsupported: 'प्रमाणित नाम संग्रह उपलब्ध नहीं',
    japaneseCulturalPreserved:
      'यह श्रेणी नामों की सांस्कृतिक पहचान बनाए रखने के लिए जापानी-प्रेरित रूपों को सुरक्षित रखती है।',
    japaneseExperimentalKatakana:
      'प्रयोगात्मक काताकाना आउटपुट: ये रचनात्मक रूप हैं, प्रमाणित जापानी नाम नहीं।',
    arabicPhoneticTransliteration:
      'श्रेणी के मूल शब्दों को बनाए रखने के लिए अरबी लिपि में ध्वन्यात्मक लिप्यंतरण उपयोग किया गया है।',
    nonLatinCreativeAdaptation:
      'यह भाषा लक्ष्य लिपि में नियंत्रित रचनात्मक रूपांतरण का उपयोग करती है।',
    babyNameUnsupported:
      'इस लिपि के लिए प्रमाणित वास्तविक नाम सूची अभी उपलब्ध नहीं है। इन्हें आज़माएँ:',
    suggestedLabel: 'अनुशंसित भाषाएँ',
  },
  nl: {
    titleCultural: 'Culturele identiteit behouden',
    titleExperimental: 'Experimentele aanpassing',
    titleTransliteration: 'Fonetische transliteratie',
    titleUnsupported: 'Geen geverifieerde namenlijst',
    japaneseCulturalPreserved:
      'Deze categorie behoudt Japans geïnspireerde vormen om de culturele identiteit van de namen te bewaren.',
    japaneseExperimentalKatakana:
      'Experimentele katakana-uitvoer: dit zijn creatieve benaderingen en geen geverifieerde Japanse namen.',
    arabicPhoneticTransliteration:
      'Deze taal gebruikt fonetische transliteratie naar het Arabische schrift om categoriewortels te behouden.',
    nonLatinCreativeAdaptation:
      'Deze taal gebruikt een gecontroleerde creatieve aanpassing in het doelschrift.',
    babyNameUnsupported:
      'Er is nog geen geverifieerde lijst van echte voornamen in dit schrift. Probeer:',
    suggestedLabel: 'Aanbevolen talen',
  },
  pl: {
    titleCultural: 'Zachowana tożsamość kulturowa',
    titleExperimental: 'Adaptacja eksperymentalna',
    titleTransliteration: 'Transliteracja fonetyczna',
    titleUnsupported: 'Brak zweryfikowanego rejestru imion',
    japaneseCulturalPreserved:
      'Ta kategoria zachowuje formy inspirowane językiem japońskim, aby utrzymać kulturowy charakter nazw.',
    japaneseExperimentalKatakana:
      'Eksperymentalny zapis katakaną: to przybliżenia twórcze, a nie zweryfikowane japońskie imiona.',
    arabicPhoneticTransliteration:
      'Ten język stosuje transliterację fonetyczną na pismo arabskie z zachowaniem rdzeni kategorii.',
    nonLatinCreativeAdaptation:
      'Ten język wykorzystuje kontrolowaną adaptację twórczą w wybranym alfabecie.',
    babyNameUnsupported:
      'Zweryfikowany rejestr prawdziwych imion w tym piśmie nie jest jeszcze dostępny. Wypróbuj:',
    suggestedLabel: 'Zalecane języki',
  },
  sv: {
    titleCultural: 'Kulturell identitet bevarad',
    titleExperimental: 'Experimentell anpassning',
    titleTransliteration: 'Fonetisk translitterering',
    titleUnsupported: 'Verifierat namnregister saknas',
    japaneseCulturalPreserved:
      'Den här kategorin behåller japanskt inspirerade former för att bevara namnens kulturella identitet.',
    japaneseExperimentalKatakana:
      'Experimentell katakana-utdata: dessa kreativa former är inte verifierade japanska namn.',
    arabicPhoneticTransliteration:
      'Detta språk använder fonetisk translitterering till arabisk skrift för att behålla kategorins rötter.',
    nonLatinCreativeAdaptation:
      'Detta språk använder kontrollerad kreativ anpassning i målskriften.',
    babyNameUnsupported:
      'Inget verifierat register med riktiga förnamn finns ännu för detta skriftsystem. Prova:',
    suggestedLabel: 'Rekommenderade språk',
  },
  vi: {
    titleCultural: 'Giữ nguyên bản sắc văn hóa',
    titleExperimental: 'Chuyển thể thử nghiệm',
    titleTransliteration: 'Phiên âm ngữ âm',
    titleUnsupported: 'Chưa có danh mục tên thật',
    japaneseCulturalPreserved:
      'Danh mục này giữ lại các dạng tên lấy cảm hứng từ tiếng Nhật để bảo toàn bản sắc văn hóa.',
    japaneseExperimentalKatakana:
      'Kết quả katakana thử nghiệm: đây là dạng mô phỏng sáng tạo, không phải tên tiếng Nhật đã kiểm chứng.',
    arabicPhoneticTransliteration:
      'Ngôn ngữ này dùng phiên âm sang chữ Ả Rập để giữ nguyên gốc từ chủ đề.',
    nonLatinCreativeAdaptation:
      'Ngôn ngữ này sử dụng chuyển thể sáng tạo có kiểm soát trong hệ chữ đích.',
    babyNameUnsupported:
      'Chưa có danh sách tên thật được xác minh cho hệ chữ này. Hãy thử:',
    suggestedLabel: 'Ngôn ngữ đề xuất',
  },
  id: {
    titleCultural: 'Identitas budaya terjaga',
    titleExperimental: 'Adaptasi eksperimental',
    titleTransliteration: 'Transliterasi fonetis',
    titleUnsupported: 'Direktori nama asli belum tersedia',
    japaneseCulturalPreserved:
      'Kategori ini mempertahankan bentuk bernuansa Jepang untuk menjaga identitas budaya nama yang dihasilkan.',
    japaneseExperimentalKatakana:
      'Keluaran katakana eksperimental: bentuk kreatif ini bukan nama Jepang asli yang terverifikasi.',
    arabicPhoneticTransliteration:
      'Bahasa ini menggunakan transliterasi fonetis ke aksara Arab agar akar tema kategori tetap terjaga.',
    nonLatinCreativeAdaptation:
      'Bahasa ini memakai adaptasi kreatif terkontrol dalam aksara tujuan.',
    babyNameUnsupported:
      'Daftar nama asli terverifikasi untuk aksara ini belum tersedia. Coba:',
    suggestedLabel: 'Bahasa yang disarankan',
  },
  th: {
    titleCultural: 'คงอัตลักษณ์ทางวัฒนธรรม',
    titleExperimental: 'การปรับรูปแบบเชิงทดลอง',
    titleTransliteration: 'การถอดเสียงตามหลักสัทศาสตร์',
    titleUnsupported: 'ยังไม่มีฐานข้อมูลชื่อจริง',
    japaneseCulturalPreserved:
      'หมวดหมู่นี้คงรูปแบบที่ได้รับแรงบันดาลใจจากภาษาญี่ปุ่นเพื่อรักษาอัตลักษณ์ทางวัฒนธรรมของชื่อ',
    japaneseExperimentalKatakana:
      'ผลลัพธ์คาตาคานะเชิงทดลอง: เป็นรูปแบบสร้างสรรค์ไม่ใช่ชื่อญี่ปุ่นที่ได้รับการรับรอง',
    arabicPhoneticTransliteration:
      'ภาษานี้ใช้การถอดเสียงเป็นอักษรอาหรับเพื่อรักษารากศัพท์เฉพาะของหมวดหมู่',
    nonLatinCreativeAdaptation:
      'ภาษานี้ใช้การดัดแปลงเชิงสร้างสรรค์แบบควบคุมในระบบอักษรเป้าหมาย',
    babyNameUnsupported:
      'ยังไม่มีรายชื่อบุคคลจริงที่ตรวจสอบแล้วสำหรับอักษรนี้ ลองเลือก:',
    suggestedLabel: 'ภาษาที่แนะนำ',
  },
  el: {
    titleCultural: 'Διατήρηση πολιτισμικής ταυτότητας',
    titleExperimental: 'Πειραματική προσαρμογή',
    titleTransliteration: 'Φωνητική μεταγραφή',
    titleUnsupported: 'Μη διαθέσιμο εγχώριο ευρετήριο',
    japaneseCulturalPreserved:
      'Αυτή η κατηγορία διατηρεί μορφές ιαπωνικής έμπνευσης για να προστατεύσει την πολιτισμική ταυτότητα των ονομάτων.',
    japaneseExperimentalKatakana:
      'Πειραματική απόδοση σε katakana: δεν πρόκειται για επαληθευμένα ιαπωνικά ονόματα.',
    arabicPhoneticTransliteration:
      'Χρησιμοποιείται φωνητική μεταγραφή στο αραβικό αλφάβητο διατηρώντας τις θεματικές ρίζες.',
    nonLatinCreativeAdaptation:
      'Χρησιμοποιείται ελεγχόμενη δημιουργική προσαρμογή στο επιλεγμένο σύστημα γραφής.',
    babyNameUnsupported:
      'Δεν περιλαμβάνεται ακόμη επαληθευμένος κατάλογος πραγματικών ονομάτων σε αυτή τη γραφή. Δοκιμάστε:',
    suggestedLabel: 'Προτεινόμενες γλώσσες',
  },
  he: {
    titleCultural: 'שמירה על זהות תרבותית',
    titleExperimental: 'התאמה ניסיונית',
    titleTransliteration: 'תעתיק פונטי',
    titleUnsupported: 'מאגר שמות מקומי אינו זמין',
    japaneseCulturalPreserved:
      'קטגוריה זו שומרת על צורות בהשראה יפנית כדי לשמר את הזהות התרבותית של השמות.',
    japaneseExperimentalKatakana:
      'פלט קטאקאנה ניסיוני: אלו צורות יצירתיות ואינן שמות יפניים מאומתים.',
    arabicPhoneticTransliteration:
      'נעשה שימוש בתעתיק פונטי לכתב הערבי כדי לשמר את שורשי הקטגוריה.',
    nonLatinCreativeAdaptation:
      'נעשית התאמה יצירתית מבוקרת בכתב היעד; התוצאות הן ניסיוניות.',
    babyNameUnsupported:
      'אין עדיין מאגר שמות פרטיים מאומת בכתב זה. נסו:',
    suggestedLabel: 'שפות מומלצות',
  },
  cs: {
    titleCultural: 'Zachovaná kulturní identita',
    titleExperimental: 'Experimentální adaptace',
    titleTransliteration: 'Fonetický přepis',
    titleUnsupported: 'Ověřený rejstřík jmen není k dispozici',
    japaneseCulturalPreserved:
      'Tato kategorie zachovává tvary inspirované japonštinou pro udržení kulturní identity názvů.',
    japaneseExperimentalKatakana:
      'Experimentální výstup v katakaně: jde o tvůrčí přiblížení, nikoli ověřená japonská jména.',
    arabicPhoneticTransliteration:
      'Tento jazyk používá fonetický přepis do arabského písma při zachování kořenů kategorie.',
    nonLatinCreativeAdaptation:
      'Tento jazyk používá řízenou tvůrčí adaptaci v cílovém písmu.',
    babyNameUnsupported:
      'Pro toto písmo zatím není k dispozici ověřený rejstřík skutečných jmen. Zkuste:',
    suggestedLabel: 'Doporučené jazyky',
  },
  ro: {
    titleCultural: 'Identitate culturală păstrată',
    titleExperimental: 'Adaptare experimentală',
    titleTransliteration: 'Transliterare fonetică',
    titleUnsupported: 'Registru nativ indisponibil',
    japaneseCulturalPreserved:
      'Această categorie păstrează forme de inspirație japoneză pentru a proteja identitatea culturală a numelor.',
    japaneseExperimentalKatakana:
      'Rezultat experimental în katakana: aceste forme creative nu sunt nume japoneze atestate.',
    arabicPhoneticTransliteration:
      'Această limbă utilizează transliterare fonetică în grafia arabă pentru a păstra rădăcinile categoriei.',
    nonLatinCreativeAdaptation:
      'Această limbă folosește o adaptare creativă controlată în scrierea țintă.',
    babyNameUnsupported:
      'Nu este încă inclus un registru verificat de prenume reale pentru această scriere. Încercați:',
    suggestedLabel: 'Limbi recomandate',
  },
  da: {
    titleCultural: 'Kulturel identitet bevaret',
    titleExperimental: 'Eksperimentel tilpasning',
    titleTransliteration: 'Fonetisk translitteration',
    titleUnsupported: 'Bekræftet navneliste mangler',
    japaneseCulturalPreserved:
      'Denne kategori bevarer japansk inspirerede former for at beskytte navnenes kulturelle identitet.',
    japaneseExperimentalKatakana:
      'Eksperimentel katakana-visning: disse kreative former er ikke bekræftede japanske navne.',
    arabicPhoneticTransliteration:
      'Dette sprog bruger fonetisk translitteration til arabisk skrift for at bevare kategoriens rødder.',
    nonLatinCreativeAdaptation:
      'Dette sprog bruger kontrolleret kreativ tilpasning i målskriften.',
    babyNameUnsupported:
      'Der findes endnu ingen bekræftet liste over rigtige fornavne i dette skriftsystem. Prøv:',
    suggestedLabel: 'Anbefalede sprog',
  },
  fi: {
    titleCultural: 'Kulttuuri-identiteetti säilytetty',
    titleExperimental: 'Kokeellinen mukautus',
    titleTransliteration: 'Foneettinen translitterointi',
    titleUnsupported: 'Vahvistettu nimiluettelo puuttuu',
    japaneseCulturalPreserved:
      'Tämä kategoria säilyttää japanilaisvaikutteiset muodot nimien kulttuuri-identiteetin turvaamiseksi.',
    japaneseExperimentalKatakana:
      'Kokeellinen katakana-tuloste: nämä luovat muodot eivät ole vahvistettuja japanilaisia nimiä.',
    arabicPhoneticTransliteration:
      'Kieli käyttää foneettista translitterointia arabialaiseen kirjaimistoon kategorian juurien säilyttämiseksi.',
    nonLatinCreativeAdaptation:
      'Kieli käyttää hallittua luovaa mukautusta kohdekirjaimistossa.',
    babyNameUnsupported:
      'Tälle kirjoitusjärjestelmälle ei ole vielä vahvistettua etunimiluetteloa. Kokeile:',
    suggestedLabel: 'Suositellut kielet',
  },
  uk: {
    titleCultural: 'Культурну ідентичність збережено',
    titleExperimental: 'Експериментальна адаптація',
    titleTransliteration: 'Фонетична транслітерація',
    titleUnsupported: 'Перевірена база імен недоступна',
    japaneseCulturalPreserved:
      'Ця категорія зберігає форми японського натхнення, щоб підтримувати культурну ідентичність імен.',
    japaneseExperimentalKatakana:
      'Експериментальне виведення катаканою: ці творчі форми не є підтвердженими японськими іменами.',
    arabicPhoneticTransliteration:
      'Застосовується фонетична транслітерація в арабське письмо зі збереженням тематичних коренів.',
    nonLatinCreativeAdaptation:
      'Використовується контрольована творча адаптація у вибраній системі письма.',
    babyNameUnsupported:
      'Перевірений каталог справжніх імен для цієї писемності ще не додано. Спробуйте:',
    suggestedLabel: 'Рекомендовані мови',
  },
  bn: {
    titleCultural: 'সাংস্কৃতিক পরিচয় সংরক্ষিত',
    titleExperimental: 'পরীক্ষামূলক রূপান্তর',
    titleTransliteration: 'ধ্বনিভিত্তিক প্রতিবর্ণীকরণ',
    titleUnsupported: 'যাচাইকৃত নামের তালিকা নেই',
    japaneseCulturalPreserved:
      'এই বিভাগটি নামের সাংস্কৃতিক পরিচয় বজায় রাখতে জাপানি-অনুপ্রাণিত রূপ সংরক্ষণ করে।',
    japaneseExperimentalKatakana:
      'পরীক্ষামূলক কাতাকানা আউটপুট: এগুলো সৃজনশীল রূপ, যাচাইকৃত জাপানি নাম নয়।',
    arabicPhoneticTransliteration:
      'বিভাগের মূল ভাব বজায় রাখতে আরবি লিপিতে ধ্বনিভিত্তিক প্রতিবর্ণীকরণ ব্যবহার করা হয়েছে।',
    nonLatinCreativeAdaptation:
      'লক্ষ্য লিপিতে নিয়ন্ত্রিত সৃজনশীল রূপান্তর ব্যবহার করা হয়েছে; ফলাফল পরীক্ষামূলক।',
    babyNameUnsupported:
      'এই লিপির জন্য যাচাইকৃত প্রকৃত নামের তালিকা এখনও যুক্ত হয়নি। চেষ্টা করুন:',
    suggestedLabel: 'প্রস্তাবিত ভাষা',
  },
  nb: {
    titleCultural: 'Kulturell identitet bevart',
    titleExperimental: 'Eksperimentell tilpasning',
    titleTransliteration: 'Fonetisk translitterasjon',
    titleUnsupported: 'Bekreftet navneliste mangler',
    japaneseCulturalPreserved:
      'Denne kategorien beholder japanskinspirerte former for å bevare navnenes kulturelle identitet.',
    japaneseExperimentalKatakana:
      'Eksperimentell katakana-utdata: disse kreative formene er ikke bekreftede japanske navn.',
    arabicPhoneticTransliteration:
      'Dette språket bruker fonetisk translitterasjon til arabisk skrift for å bevare kategoriens røtter.',
    nonLatinCreativeAdaptation:
      'Dette språket bruker kontrollert kreativ tilpasning i målskriften.',
    babyNameUnsupported:
      'Det finnes ennå ingen bekreftet liste over ekte fornavn i dette skriftsystemet. Prøv:',
    suggestedLabel: 'Anbefalte språk',
  },
};

function getNoticeCopy(interfaceLanguage: string): LocalizedCompatibilityStrings {
  const normalized = interfaceLanguage === 'no' ? 'nb' : interfaceLanguage;
  return NOTICE_STRINGS[normalized] || NOTICE_STRINGS.en;
}

function resolveNoticeText(
  key: CompatibilityNoticeKey,
  interfaceLanguage: string
): { title: string; message: string; tone: CompatibilityNoticeTone } {
  const copy = getNoticeCopy(interfaceLanguage);
  switch (key) {
    case 'japaneseCulturalPreserved':
      return { title: copy.titleCultural, message: copy.japaneseCulturalPreserved, tone: 'info' };
    case 'japaneseExperimentalKatakana':
      return { title: copy.titleExperimental, message: copy.japaneseExperimentalKatakana, tone: 'warning' };
    case 'arabicPhoneticTransliteration':
      return { title: copy.titleTransliteration, message: copy.arabicPhoneticTransliteration, tone: 'info' };
    case 'nonLatinCreativeAdaptation':
      return { title: copy.titleExperimental, message: copy.nonLatinCreativeAdaptation, tone: 'info' };
    case 'babyNameUnsupported':
      return { title: copy.titleUnsupported, message: copy.babyNameUnsupported, tone: 'warning' };
  }
}

export function getCompatibilitySuggestedLabel(interfaceLanguage: string): string {
  return getNoticeCopy(interfaceLanguage).suggestedLabel;
}

/**
 * Evaluates how a generator category interacts with the requested generation language
 * cleanly separated from the active UI interface language.
 */
export function getCategoryLanguageCompatibility(
  generatorId: GeneratorId,
  requestedLanguage: GenLanguageCode = 'auto',
  interfaceLanguage = 'en'
): CategoryLanguageCompatibility {
  const effectiveLanguage: GenLanguageCode =
    requestedLanguage === 'auto'
      ? (resolveGenerationLanguage('auto', interfaceLanguage as never) as GenLanguageCode)
      : requestedLanguage;

  const categoryIdentity = getCategoryCulturalIdentity(generatorId);
  const scriptProfile = getLanguageScriptProfile(effectiveLanguage);
  const isNonLatin =
    effectiveLanguage !== 'auto' &&
    scriptProfile.scripts.length > 0 &&
    !scriptProfile.scripts.includes('Latin');

  // 1. Attested personal baby names
  if (categoryIdentity === 'attested-personal') {
    const hasNativeBank = Boolean(
      effectiveLanguage !== 'auto' &&
        LOCALIZED_BABY_NAMES[effectiveLanguage] &&
        LOCALIZED_BABY_NAMES[effectiveLanguage]!.length > 0
    );
    if (isNonLatin && !hasNativeBank) {
      const notice = resolveNoticeText('babyNameUnsupported', interfaceLanguage);
      return {
        generatorId,
        requestedLanguage,
        effectiveLanguage,
        interfaceLanguage,
        categoryIdentity,
        strategy: 'unsupported',
        preserveCulturalIdentity: false,
        supportsTargetScriptRendering: false,
        usesExperimentalKatakana: false,
        showNotice: true,
        tone: notice.tone,
        noticeTitle: notice.title,
        noticeMessage: notice.message,
        suggestedLanguages: ['fr', 'en', 'es', 'de', 'it', 'ar'],
      };
    }

    return {
      generatorId,
      requestedLanguage,
      effectiveLanguage,
      interfaceLanguage,
      categoryIdentity,
      strategy: 'native-language',
      preserveCulturalIdentity: false,
      supportsTargetScriptRendering: true,
      usesExperimentalKatakana: false,
      showNotice: false,
      tone: 'info',
      noticeTitle: '',
      noticeMessage: '',
      suggestedLanguages: [],
    };
  }

  // 2. Retained for any future phrase-bank source that receives explicit rights approval; current banks are quarantined.
  if (categoryIdentity === 'curated-phrase-bank') {
    return {
      generatorId,
      requestedLanguage,
      effectiveLanguage,
      interfaceLanguage,
      categoryIdentity,
      strategy: 'native-language',
      preserveCulturalIdentity: false,
      supportsTargetScriptRendering: true,
      usesExperimentalKatakana: false,
      showNotice: false,
      tone: 'info',
      noticeTitle: '',
      noticeMessage: '',
      suggestedLanguages: [],
    };
  }

  // 3. Japanese / Anime family preserves Japanese-inspired roots
  if (categoryIdentity === 'japanese-anime') {
    if (effectiveLanguage === 'ja') {
      const notice = resolveNoticeText('japaneseExperimentalKatakana', interfaceLanguage);
      return {
        generatorId,
        requestedLanguage,
        effectiveLanguage,
        interfaceLanguage,
        categoryIdentity,
        strategy: 'experimental-creative-adaptation',
        preserveCulturalIdentity: true,
        supportsTargetScriptRendering: true,
        usesExperimentalKatakana: true,
        showNotice: true,
        tone: notice.tone,
        noticeTitle: notice.title,
        noticeMessage: notice.message,
        suggestedLanguages: ['ja', 'auto', 'en', 'fr'],
      };
    }

    if (effectiveLanguage === 'ar') {
      const notice = resolveNoticeText('arabicPhoneticTransliteration', interfaceLanguage);
      return {
        generatorId,
        requestedLanguage,
        effectiveLanguage,
        interfaceLanguage,
        categoryIdentity,
        strategy: 'phonetic-transliteration',
        preserveCulturalIdentity: true,
        supportsTargetScriptRendering: true,
        usesExperimentalKatakana: false,
        showNotice: true,
        tone: notice.tone,
        noticeTitle: notice.title,
        noticeMessage: notice.message,
        suggestedLanguages: ['ja', 'ar', 'auto'],
      };
    }

    // For all other languages (French, English, Korean, Russian, etc.),
    // preserve authentic Japanese-inspired romaji rather than erasing anime identity.
    const notice = resolveNoticeText('japaneseCulturalPreserved', interfaceLanguage);
    return {
      generatorId,
      requestedLanguage,
      effectiveLanguage,
      interfaceLanguage,
      categoryIdentity,
      strategy: 'culturally-faithful',
      preserveCulturalIdentity: true,
      supportsTargetScriptRendering: !isNonLatin,
      usesExperimentalKatakana: false,
      showNotice: true,
      tone: notice.tone,
      noticeTitle: notice.title,
      noticeMessage: notice.message,
      suggestedLanguages: ['ja', 'auto', 'en', 'fr'],
    };
  }

  // 4. Arabic on procedural categories uses phonetic transliteration of category roots
  if (effectiveLanguage === 'ar') {
    const notice = resolveNoticeText('arabicPhoneticTransliteration', interfaceLanguage);
    return {
      generatorId,
      requestedLanguage,
      effectiveLanguage,
      interfaceLanguage,
      categoryIdentity,
      strategy: 'phonetic-transliteration',
      preserveCulturalIdentity: false,
      supportsTargetScriptRendering: true,
      usesExperimentalKatakana: false,
      showNotice: requestedLanguage !== 'auto',
      tone: notice.tone,
      noticeTitle: notice.title,
      noticeMessage: notice.message,
      suggestedLanguages: [],
    };
  }

  // 5. Other non-Latin scripts on procedural categories use controlled creative script roots
  if (isNonLatin) {
    const notice = resolveNoticeText('nonLatinCreativeAdaptation', interfaceLanguage);
    return {
      generatorId,
      requestedLanguage,
      effectiveLanguage,
      interfaceLanguage,
      categoryIdentity,
      strategy: 'experimental-creative-adaptation',
      preserveCulturalIdentity: false,
      supportsTargetScriptRendering: true,
      usesExperimentalKatakana: false,
      showNotice: requestedLanguage !== 'auto',
      tone: notice.tone,
      noticeTitle: notice.title,
      noticeMessage: notice.message,
      suggestedLanguages: [],
    };
  }

  // 6. Standard Latin / thematic modes (e.g. nordic, latin, tech, fr, en, es, de...)
  const metaFamily: GeneratorFamily | undefined = GENERATORS_METADATA[generatorId]?.category;
  const isCultural =
    categoryIdentity === 'cultural-mythic' || metaFamily === 'culture';

  return {
    generatorId,
    requestedLanguage,
    effectiveLanguage,
    interfaceLanguage,
    categoryIdentity,
    strategy: isCultural && requestedLanguage === 'auto' ? 'culturally-faithful' : 'native-language',
    preserveCulturalIdentity: false,
    supportsTargetScriptRendering: true,
    usesExperimentalKatakana: false,
    showNotice: false,
    tone: 'info',
    noticeTitle: '',
    noticeMessage: '',
    suggestedLanguages: [],
  };
}

import {
  getEnhancementsLabels,
  type CompatibilityIndicatorKey,
  type ProfileDomainKey,
} from '../i18n/enhancementsLabels';
import { getLocalizedGeneratorShortTitle } from '../i18n/generatorTitles';

export type CompatibilityLevel = CompatibilityIndicatorKey;

export interface GeneratorCompatibilityProfile {
  generatorId: GeneratorId;
  generatorName: string;
  categoryId: GeneratorFamily | 'other';
  categoryName: string;
  domain: ProfileDomainKey;
  suitableLanguages: string[];
  otherSupportedLanguages: string[];
  recommendedLanguage: string | null;
  whyLanguagesFit: string;
  knownLimitations: string;
  culturalConsiderations: string;
  contextualExample: string;
}

export interface LanguageCompatibilityAssessment {
  generatorId: GeneratorId;
  requestedLanguage: GenLanguageCode;
  effectiveLanguage: GenLanguageCode;
  level: CompatibilityLevel;
  badgeLabel: string;
  statusExplanation: string;
  isEvaluated: boolean;
  quickSuggestedLanguages: GenLanguageCode[];
  profile: GeneratorCompatibilityProfile;
}

const KNOWN_GEN_LANGUAGE_SET = new Set<string>([
  'auto', 'fr', 'en', 'ja', 'ar', 'latin', 'nordic', 'tech', 'es', 'de',
  'it', 'pt', 'tr', 'ko', 'zh', 'ru', 'hi', 'nl', 'pl', 'sv', 'vi',
  'id', 'th', 'el', 'he', 'cs', 'ro', 'da', 'fi', 'uk', 'bn', 'nb',
]);

const ATTESTED_LATIN_LANGUAGES = new Set<string>([
  'fr', 'en', 'es', 'de', 'it', 'pt', 'nl', 'sv', 'da', 'nb', 'fi', 'pl', 'cs', 'ro', 'latin',
]);

const PHRASE_BANK_NATIVE_LANGUAGES = new Set<string>([
  'en', 'fr', 'es', 'de', 'it', 'pt', 'ar', 'tr', 'ja', 'ko', 'zh', 'ru',
  'hi', 'nl', 'pl', 'sv', 'vi', 'id', 'th', 'el', 'he', 'cs', 'ro', 'da',
  'fi', 'uk', 'bn', 'nb',
]);

const DESERT_CULTURAL_IDS = new Set<string>([
  'desert_djinn',
  'desert_oasis',
  'desert_empire',
  'ancient_pyramid_tomb',
]);

const NORDIC_CULTURAL_IDS = new Set<string>([
  'nordic_valkyrie',
  'frozen_fjord',
  'arctic_creature',
]);

const MEDIEVAL_FANTASY_IDS = new Set<string>([
  'fantasy',
  'elf',
  'dragon',
  'kingdom',
  'warrior',
  'wizard',
  'rpg',
  'vampire',
  'celtic_druid',
  'royal_knight_order',
  'wandering_bard',
  'dwarven_citadel',
  'elven_sanctuary',
  'tavern',
  'dungeon',
  'mythic_creature',
  'griffin_rider',
  'abyssal_leviathan',
  'gargoyle_sentinel',
  'phoenix_flame',
  'enchanted_forest',
  'sacred_artifact',
  'undead_lich',
  'shadow_assassin_guild',
  'elemental_golem',
  'gladiator_champion',
  'mystic_oracle',
  'vampire_coven',
  'floating_skyland',
  'sunken_atlantis',
  'pirate_haven',
  'merchant_crossroad',
  'haunted_manor',
  'magical_academy',
  'epic_quest_name',
  'legendary_armor',
  'magic_potion',
  'raid_dungeon_boss',
  'spell',
  'weapon',
  'boss',
]);

const TECH_SCIFI_IDS = new Set<string>([
  'ai_bot',
  'framework',
  'software_tool',
  'code_library',
  'api_service',
  'database_engine',
  'cloud_platform',
  'cyber_lab',
  'cyber_hacker',
  'quantum_reactor',
  'terraformed_colony',
  'interstellar_corridor',
  'ai_megacorp',
  'cyborg_bounty_hunter',
  'exoplanet_biodome',
  'deep_space_probe',
  'plasma_weapon',
  'nanotech_swarm',
  'neural_interface',
  'dystopian_city_sector',
  'orbital_station',
  'deep_learning_model',
  'quantum_particle',
  'space_telescope',
  'cryptographic_protocol',
  'open_source_framework',
  'starship',
  'mecha',
  'cyberpunk',
  'steampunk',
  'alien_species',
  'crypto_token',
  'server_cluster',
  'os_system',
  'cyber_medic',
  'space_pirate',
  'smuggler_pilot',
]);

const FAMILY_LABELS_LOCALIZED: Record<string, Record<string, string>> = {
  en: {
    fantasy: 'Fantasy & Mythology',
    business: 'Business & Brands',
    creative: 'Creative & Storytelling',
    gaming: 'Gaming & Worlds',
    innovation: 'Tech & Innovation',
    lifestyle: 'Lifestyle & Personal',
    culture: 'Culture & Heritage',
    everyday: 'Everyday & Tools',
    nature: 'Nature & Earth',
    digital: 'Digital & Social',
    events: 'Events & Projects',
    other: 'Generator',
  },
  fr: {
    fantasy: 'Fantasy & Mythologie',
    business: 'Business & Marques',
    creative: 'Créatif & Récits',
    gaming: 'Jeux & Univers',
    innovation: 'Tech & Innovation',
    lifestyle: 'Art de vivre & Personnel',
    culture: 'Culture & Patrimoine',
    everyday: 'Quotidien & Outils',
    nature: 'Nature & Planète',
    digital: 'Digital & Réseaux',
    events: 'Événements & Projets',
    other: 'Générateur',
  },
};

export function resolveGeneratorCompatibilityDomain(generatorId: GeneratorId): ProfileDomainKey {
  if (generatorId === 'baby_name') return 'attested';
  // The active phrase-bank registry is empty while all unverified editorial banks are quarantined.
  if (PHRASE_BANK_SET.has(generatorId)) return 'phraseBank';
  if (JAPANESE_ANIME_GENERATORS.has(generatorId)) return 'anime';
  if (DESERT_CULTURAL_IDS.has(generatorId)) return 'desert';
  if (NORDIC_CULTURAL_IDS.has(generatorId)) return 'nordic';
  if (MEDIEVAL_FANTASY_IDS.has(generatorId)) return 'medieval';
  if (TECH_SCIFI_IDS.has(generatorId)) return 'tech';

  const family = GENERATORS_METADATA[generatorId]?.category;
  if (family === 'business') return 'business';
  if (family === 'innovation' || family === 'digital') return 'tech';
  if (family === 'fantasy') return 'medieval';
  return 'creative';
}

function formatLanguageTag(code: string): string {
  switch (code) {
    case 'fr': return 'Français';
    case 'en': return 'English';
    case 'es': return 'Español';
    case 'de': return 'Deutsch';
    case 'it': return 'Italiano';
    case 'pt': return 'Português';
    case 'ar': return 'العربية (Arabic)';
    case 'ja': return '日本語 (Japanese)';
    case 'latin': return 'Latin & Mythic';
    case 'nordic': return 'Nordic & Runic';
    case 'tech': return 'Cyber & Tech';
    case 'sv': return 'Svenska';
    case 'da': return 'Dansk';
    case 'nb': return 'Norsk bokmål';
    case 'nl': return 'Nederlands';
    case 'pl': return 'Polski';
    default: return code.toUpperCase();
  }
}

export function getGeneratorCompatibilityAssessment(
  generatorId: GeneratorId,
  requestedLanguage: GenLanguageCode | string = 'auto',
  interfaceLanguage = 'en'
): LanguageCompatibilityAssessment {
  const enh = getEnhancementsLabels(interfaceLanguage);
  const domain = resolveGeneratorCompatibilityDomain(generatorId);
  const meta = GENERATORS_METADATA[generatorId];
  const family: GeneratorFamily | 'other' = meta?.category ?? 'other';
  const familyDict = FAMILY_LABELS_LOCALIZED[interfaceLanguage.split('-')[0].toLowerCase()] || FAMILY_LABELS_LOCALIZED.en;
  const categoryName = familyDict[family] || familyDict.other;
  const generatorName = getLocalizedGeneratorShortTitle(
    generatorId,
    interfaceLanguage,
    meta?.shortTitle || generatorId
  );

  // Unknown or non-standard runtime language code check (transparent fallback, never invented)
  if (!KNOWN_GEN_LANGUAGE_SET.has(String(requestedLanguage))) {
    const notes = enh.compatibility.domainNotes[domain];
    return {
      generatorId,
      requestedLanguage: requestedLanguage as GenLanguageCode,
      effectiveLanguage: 'en',
      level: 'not-evaluated',
      badgeLabel: enh.compatibility.indicators['not-evaluated'],
      statusExplanation: enh.compatibility.indicatorDescriptions['not-evaluated'],
      isEvaluated: false,
      quickSuggestedLanguages: ['en', 'fr'],
      profile: {
        generatorId,
        generatorName,
        categoryId: family,
        categoryName,
        domain,
        suitableLanguages: ['English', 'Français'],
        otherSupportedLanguages: ['Español', 'Deutsch', 'Italiano'],
        recommendedLanguage: null,
        whyLanguagesFit: notes.whyFit,
        knownLimitations: notes.limitations,
        culturalConsiderations: notes.cultural,
        contextualExample: notes.example,
      },
    };
  }

  const effectiveLanguage: GenLanguageCode =
    requestedLanguage === 'auto'
      ? (resolveGenerationLanguage('auto', interfaceLanguage as never) as GenLanguageCode)
      : (requestedLanguage as GenLanguageCode);

  const scriptProfile = getLanguageScriptProfile(effectiveLanguage);
  const isNonLatin =
    effectiveLanguage !== 'auto' &&
    scriptProfile.scripts.length > 0 &&
    !scriptProfile.scripts.includes('Latin');

  let level: CompatibilityLevel = 'compatible';
  let suitableLanguages: string[] = [];
  let otherSupportedLanguages: string[] = [];
  let recommendedLanguage: string | null = null;
  let quickSuggestedLanguages: GenLanguageCode[] = [];

  if (domain === 'attested') {
    const hasArabicBank = effectiveLanguage === 'ar' && Boolean(LOCALIZED_BABY_NAMES.ar?.length);
    const hasLatinBank = ATTESTED_LATIN_LANGUAGES.has(effectiveLanguage);
    suitableLanguages = ['Français', 'English', 'Español', 'Deutsch', 'Italiano', 'Português', 'العربية (Arabic)', 'Svenska', 'Polski', 'Nederlands'];
    otherSupportedLanguages = ['Dansk', 'Norsk bokmål', 'Suomi', 'Čeština', 'Română', 'Latin & Mythic'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['fr', 'en', 'es', 'de', 'it', 'ar'];
    if (hasArabicBank || hasLatinBank) {
      level = 'highly-compatible';
    } else if (isNonLatin) {
      level = 'requires-review';
    } else {
      level = 'alternative-style';
    }
  } else if (domain === 'phraseBank') {
    suitableLanguages = ['28 UI languages (EN, FR, ES, DE, IT, PT, AR, JA, KO, ZH, RU, HI…)'];
    otherSupportedLanguages = ['Nordic & Runic', 'Latin & Mythic', 'Cyber & Tech'];
    recommendedLanguage = null;
    if (PHRASE_BANK_NATIVE_LANGUAGES.has(effectiveLanguage)) {
      level = 'highly-compatible';
    } else {
      level = 'alternative-style';
    }
  } else if (domain === 'anime') {
    suitableLanguages = ['日本語 (Japanese)', 'English (Romaji)', 'Français (Romaji)'];
    otherSupportedLanguages = ['Español', 'Deutsch', 'العربية (Arabic)', '한국어 (Korean)', '中文 (Chinese)'];
    recommendedLanguage = '日本語 (Japanese) · English / Français (Romaji)';
    quickSuggestedLanguages = ['ja', 'en', 'fr', 'ar'];
    if (effectiveLanguage === 'ja') {
      level = 'compatible';
    } else if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else if (effectiveLanguage === 'en' || effectiveLanguage === 'fr' || effectiveLanguage === 'es' || effectiveLanguage === 'de' || effectiveLanguage === 'it' || effectiveLanguage === 'pt') {
      level = 'compatible';
    } else {
      level = 'alternative-style';
    }
  } else if (domain === 'desert') {
    suitableLanguages = ['العربية (Arabic)', 'Latin & Mythic', 'Français', 'English'];
    otherSupportedLanguages = ['Español', 'Italiano', 'Deutsch', 'Português', 'Türkçe'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['ar', 'fr', 'en', 'latin'];
    if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (!isNonLatin) {
      level = 'compatible';
    } else {
      level = 'limited-resources';
    }
  } else if (domain === 'nordic') {
    suitableLanguages = ['Nordic & Runic', 'Svenska', 'Dansk', 'Norsk bokmål', 'Deutsch', 'English'];
    otherSupportedLanguages = ['Français', 'Nederlands', 'Suomi', 'Latin & Mythic'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['nordic', 'sv', 'da', 'nb', 'en', 'de'];
    if (effectiveLanguage === 'nordic') {
      level = 'highly-compatible';
    } else if (['sv', 'da', 'nb', 'de', 'en', 'nl'].includes(effectiveLanguage)) {
      level = 'compatible';
    } else if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else {
      level = 'alternative-style';
    }
  } else if (domain === 'medieval') {
    suitableLanguages = ['Latin & Mythic', 'English', 'Français', 'Deutsch', 'Nordic & Runic', 'Español', 'Italiano'];
    otherSupportedLanguages = ['Português', 'Polski', 'Nederlands', 'Svenska', 'Čeština', 'العربية (Arabic)'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['latin', 'en', 'fr', 'de', 'nordic'];
    if (effectiveLanguage === 'latin' || effectiveLanguage === 'nordic') {
      level = 'highly-compatible';
    } else if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else {
      level = 'compatible';
    }
  } else if (domain === 'tech') {
    suitableLanguages = ['Cyber & Tech', 'English', 'Français', 'Deutsch', 'Español'];
    otherSupportedLanguages = ['日本語 (Japanese)', '한국어 (Korean)', '中文 (Chinese)', 'Português', 'Italiano', 'Nederlands'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['tech', 'en', 'fr', 'de'];
    if (effectiveLanguage === 'tech' || effectiveLanguage === 'en') {
      level = 'highly-compatible';
    } else if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else {
      level = 'compatible';
    }
  } else if (domain === 'business') {
    suitableLanguages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português', 'Cyber & Tech'];
    otherSupportedLanguages = ['Nederlands', 'Svenska', 'Polski', 'Türkçe', 'العربية (Arabic)', '日本語 (Japanese)'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['en', 'fr', 'es', 'de'];
    if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else {
      level = 'compatible';
    }
  } else {
    // creative / general
    suitableLanguages = ['English', 'Français', 'Español', 'Deutsch', 'Italiano', 'Português'];
    otherSupportedLanguages = ['Latin & Mythic', 'Nordic & Runic', 'العربية (Arabic)', 'Türkçe', 'Nederlands'];
    recommendedLanguage = null;
    quickSuggestedLanguages = ['en', 'fr', 'es'];
    if (effectiveLanguage === 'ar') {
      level = 'alternative-style';
    } else if (isNonLatin) {
      level = 'limited-resources';
    } else {
      level = 'compatible';
    }
  }

  // Ensure current selected language isn't awkwardly omitted if compatible
  const formattedEffective = formatLanguageTag(effectiveLanguage);
  if (
    level === 'highly-compatible' &&
    domain !== 'phraseBank' &&
    !suitableLanguages.includes(formattedEffective)
  ) {
    suitableLanguages = [formattedEffective, ...suitableLanguages];
  }

  const notes = enh.compatibility.domainNotes[domain];

  return {
    generatorId,
    requestedLanguage: requestedLanguage as GenLanguageCode,
    effectiveLanguage,
    level,
    badgeLabel: enh.compatibility.indicators[level],
    statusExplanation: enh.compatibility.indicatorDescriptions[level],
    isEvaluated: true,
    quickSuggestedLanguages,
    profile: {
      generatorId,
      generatorName,
      categoryId: family,
      categoryName,
      domain,
      suitableLanguages,
      otherSupportedLanguages,
      recommendedLanguage,
      whyLanguagesFit: notes.whyFit,
      knownLimitations: notes.limitations,
      culturalConsiderations: notes.cultural,
      contextualExample: notes.example,
    },
  };
}

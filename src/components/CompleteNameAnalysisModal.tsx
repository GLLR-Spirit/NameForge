import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Heart,
  Info,
  Lightbulb,
  Palette,
  Printer,
  Scale,
  ShieldAlert,
  Sparkles,
  Star,
  Volume2,
  Wand2,
  X,
} from 'lucide-react';
import { GeneratedName, GeneratorId, GeneratorMeta, GenLanguageCode, LanguageCode } from '../types';
import { CreativeStudioTransferContext } from '../types/nameInsight';
import { GENERATORS_METADATA } from '../data/generators';
import { getAppSettings } from '../services/settings';
import {
  findSavedEntry,
  getStoredRating,
  setStoredRating,
  subscribeToStorage,
  toggleLikeName,
  toggleSaveName,
} from '../services/storage';
import { analyzeNameCompletely } from '../services/unifiedNameAnalysis';
import { formatReportAsJson, formatReportAsText } from '../services/nameIntelligenceReport';
import { getNameDetailsLabels } from '../i18n/nameDetails';
import { getNameInsightSectionLabels } from '../i18n/nameInsightLabels';
import {
  formatTargetLanguageName,
  getUnifiedAnalysisLabels,
  type UnifiedAnalysisStatus,
} from '../i18n/unifiedAnalysisLabels';
import { getNameIntelligenceLabels } from '../i18n/nameIntelligenceLabels';
import { copyToClipboard } from '../utils/clipboard';
import { getTextDirection } from '../utils/locale';
import { resolveCanonicalLocale } from '../i18n/localeRegistry';
import { useEscapeKey, useModalFocus } from '../hooks';
import { BrandMoodboard } from './BrandMoodboard';
import { CompareModal } from './CompareModal';
import './name-insight.css';

const STRUCTURE_LABELS: Record<string, { heading: string; vowelShare: string; vowelNote: string }> = {
  en: { heading: 'Name structure', vowelShare: 'Latin vowel share', vowelNote: 'This ratio is shown only when every letter in the name uses the Latin alphabet.' },
  fr: { heading: 'Structure du nom', vowelShare: 'Part de voyelles latines', vowelNote: 'Ce ratio est affiché uniquement si toutes les lettres du nom utilisent l’alphabet latin.' },
  es: { heading: 'Estructura del nombre', vowelShare: 'Proporción de vocales latinas', vowelNote: 'Este índice solo se muestra si todas las letras del nombre usan el alfabeto latino.' },
  de: { heading: 'Namensstruktur', vowelShare: 'Anteil lateinischer Vokale', vowelNote: 'Dieser Anteil wird nur angezeigt, wenn alle Buchstaben des Namens zum lateinischen Alphabet gehören.' },
  it: { heading: 'Struttura del nome', vowelShare: 'Quota di vocali latine', vowelNote: 'Questo rapporto viene mostrato solo se tutte le lettere del nome appartengono all’alfabeto latino.' },
  pt: { heading: 'Estrutura do nome', vowelShare: 'Proporção de vogais latinas', vowelNote: 'Esta proporção só é exibida quando todas as letras do nome usam o alfabeto latino.' },
  ar: { heading: 'بنية الاسم', vowelShare: 'نسبة حروف العلة اللاتينية', vowelNote: 'تُعرض هذه النسبة فقط عندما تكون جميع حروف الاسم مكتوبة بالأبجدية اللاتينية.' },
  tr: { heading: 'İsim yapısı', vowelShare: 'Latin sesli harf oranı', vowelNote: 'Bu oran yalnızca addaki tüm harfler Latin alfabesiyle yazıldığında gösterilir.' },
  ja: { heading: '名前の構造', vowelShare: 'ラテン文字の母音比率', vowelNote: 'この比率は、名前のすべての文字がラテン文字の場合にのみ表示されます。' },
  ko: { heading: '이름 구조', vowelShare: '라틴 모음 비율', vowelNote: '이 비율은 이름의 모든 글자가 라틴 문자일 때만 표시됩니다.' },
  zh: { heading: '名称结构', vowelShare: '拉丁字母元音占比', vowelNote: '仅当名称中的所有字母均为拉丁字母时，才会显示此比例。' },
  ru: { heading: 'Структура имени', vowelShare: 'Доля латинских гласных', vowelNote: 'Этот показатель отображается, только если все буквы имени написаны латиницей.' },
  hi: { heading: 'नाम की संरचना', vowelShare: 'लैटिन स्वरों का अनुपात', vowelNote: 'यह अनुपात तभी दिखाया जाता है जब नाम के सभी अक्षर लैटिन लिपि में हों।' },
  nl: { heading: 'Naamstructuur', vowelShare: 'Aandeel Latijnse klinkers', vowelNote: 'Deze verhouding wordt alleen getoond als alle letters van de naam uit het Latijnse alfabet komen.' },
  pl: { heading: 'Struktura nazwy', vowelShare: 'Udział samogłosek łacińskich', vowelNote: 'Ten wskaźnik jest widoczny tylko wtedy, gdy wszystkie litery nazwy należą do alfabetu łacińskiego.' },
  sv: { heading: 'Namnstruktur', vowelShare: 'Andel latinska vokaler', vowelNote: 'Andelen visas bara när alla bokstäver i namnet tillhör det latinska alfabetet.' },
  vi: { heading: 'Cấu trúc tên', vowelShare: 'Tỷ lệ nguyên âm Latin', vowelNote: 'Tỷ lệ này chỉ hiển thị khi tất cả chữ cái trong tên đều thuộc bảng chữ cái Latin.' },
  id: { heading: 'Struktur nama', vowelShare: 'Proporsi vokal Latin', vowelNote: 'Rasio ini hanya ditampilkan jika semua huruf dalam nama menggunakan alfabet Latin.' },
  th: { heading: 'โครงสร้างชื่อ', vowelShare: 'สัดส่วนสระละติน', vowelNote: 'จะแสดงสัดส่วนนี้เมื่ออักษรทุกตัวในชื่อใช้ตัวอักษรละตินเท่านั้น' },
  el: { heading: 'Δομή ονόματος', vowelShare: 'Ποσοστό λατινικών φωνηέντων', vowelNote: 'Το ποσοστό εμφανίζεται μόνο όταν όλα τα γράμματα του ονόματος ανήκουν στο λατινικό αλφάβητο.' },
  he: { heading: 'מבנה השם', vowelShare: 'שיעור התנועות הלטיניות', vowelNote: 'היחס מוצג רק כאשר כל האותיות בשם כתובות באלפבית הלטיני.' },
  cs: { heading: 'Struktura názvu', vowelShare: 'Podíl latinských samohlásek', vowelNote: 'Tento podíl se zobrazí pouze tehdy, když jsou všechna písmena názvu zapsána latinkou.' },
  ro: { heading: 'Structura numelui', vowelShare: 'Proporția vocalelor latine', vowelNote: 'Acest raport este afișat numai dacă toate literele numelui folosesc alfabetul latin.' },
  da: { heading: 'Navnestruktur', vowelShare: 'Andel latinske vokaler', vowelNote: 'Denne andel vises kun, når alle bogstaver i navnet bruger det latinske alfabet.' },
  fi: { heading: 'Nimen rakenne', vowelShare: 'Latinalaisten vokaalien osuus', vowelNote: 'Tämä osuus näytetään vain, kun kaikki nimen kirjaimet kuuluvat latinalaiseen aakkostoon.' },
  uk: { heading: 'Структура назви', vowelShare: 'Частка латинських голосних', vowelNote: 'Цей показник відображається лише тоді, коли всі літери назви записані латиницею.' },
  bn: { heading: 'নামের গঠন', vowelShare: 'ল্যাটিন স্বরবর্ণের অনুপাত', vowelNote: 'নামের সব অক্ষর ল্যাটিন বর্ণমালায় লেখা থাকলেই এই অনুপাত দেখানো হয়।' },
  nb: { heading: 'Navnestruktur', vowelShare: 'Andel latinske vokaler', vowelNote: 'Denne andelen vises bare når alle bokstaver i navnet bruker det latinske alfabetet.' },
};

const METRIC_LABELS: Record<string, { words: string; digits: string; symbols: string; uppercase: string; mixed: string; repeated: string }> = {
  en: { words: 'Words', digits: 'Digits', symbols: 'Symbols', uppercase: 'Uppercase', mixed: 'Mixed scripts', repeated: 'Repeated letters' },
  fr: { words: 'Mots', digits: 'Chiffres', symbols: 'Symboles', uppercase: 'Majuscules', mixed: 'Écritures mixtes', repeated: 'Lettres répétées' },
  es: { words: 'Palabras', digits: 'Dígitos', symbols: 'Símbolos', uppercase: 'Mayúsculas', mixed: 'Escrituras mixtas', repeated: 'Letras repetidas' },
  de: { words: 'Wörter', digits: 'Ziffern', symbols: 'Symbole', uppercase: 'Großbuchstaben', mixed: 'Gemischte Schriften', repeated: 'Wiederholte Buchstaben' },
  it: { words: 'Parole', digits: 'Cifre', symbols: 'Simboli', uppercase: 'Maiuscole', mixed: 'Scritture miste', repeated: 'Lettere ripetute' },
  pt: { words: 'Palavras', digits: 'Dígitos', symbols: 'Símbolos', uppercase: 'Maiúsculas', mixed: 'Escritas mistas', repeated: 'Letras repetidas' },
  ar: { words: 'الكلمات', digits: 'الأرقام', symbols: 'الرموز', uppercase: 'الأحرف الكبيرة', mixed: 'أنظمة كتابة مختلطة', repeated: 'الأحرف المتكررة' },
  tr: { words: 'Kelimeler', digits: 'Rakamlar', symbols: 'Semboller', uppercase: 'Büyük harfler', mixed: 'Karışık alfabeler', repeated: 'Tekrarlanan harfler' },
  ja: { words: '単語', digits: '数字', symbols: '記号', uppercase: '大文字', mixed: '複数の文字体系', repeated: '繰り返し文字' },
  ko: { words: '단어', digits: '숫자', symbols: '기호', uppercase: '대문자', mixed: '혼합 문자 체계', repeated: '반복 문자' },
  zh: { words: '词数', digits: '数字', symbols: '符号', uppercase: '大写字母', mixed: '混合文字系统', repeated: '重复字符' },
  ru: { words: 'Слова', digits: 'Цифры', symbols: 'Символы', uppercase: 'Заглавные', mixed: 'Смешанные письменности', repeated: 'Повторы букв' },
  hi: { words: 'शब्द', digits: 'अंक', symbols: 'प्रतीक', uppercase: 'बड़े अक्षर', mixed: 'मिश्रित लिपियाँ', repeated: 'दोहराए अक्षर' },
  nl: { words: 'Woorden', digits: 'Cijfers', symbols: 'Symbolen', uppercase: 'Hoofdletters', mixed: 'Gemengde schriften', repeated: 'Herhaalde letters' },
  pl: { words: 'Słowa', digits: 'Cyfry', symbols: 'Symbole', uppercase: 'Wielkie litery', mixed: 'Mieszane pisma', repeated: 'Powtórzone litery' },
  sv: { words: 'Ord', digits: 'Siffror', symbols: 'Symboler', uppercase: 'Versaler', mixed: 'Blandade skriftsystem', repeated: 'Upprepade bokstäver' },
  vi: { words: 'Từ', digits: 'Chữ số', symbols: 'Ký hiệu', uppercase: 'Chữ hoa', mixed: 'Hệ chữ hỗn hợp', repeated: 'Ký tự lặp lại' },
  id: { words: 'Kata', digits: 'Angka', symbols: 'Simbol', uppercase: 'Huruf kapital', mixed: 'Aksara campuran', repeated: 'Huruf berulang' },
  th: { words: 'คำ', digits: 'ตัวเลข', symbols: 'สัญลักษณ์', uppercase: 'ตัวพิมพ์ใหญ่', mixed: 'ระบบอักษรผสม', repeated: 'อักษรซ้ำ' },
  el: { words: 'Λέξεις', digits: 'Ψηφία', symbols: 'Σύμβολα', uppercase: 'Κεφαλαία', mixed: 'Μικτά συστήματα γραφής', repeated: 'Επαναλαμβανόμενα γράμματα' },
  he: { words: 'מילים', digits: 'ספרות', symbols: 'סמלים', uppercase: 'אותיות גדולות', mixed: 'מערכות כתב מעורבות', repeated: 'אותיות חוזרות' },
  cs: { words: 'Slova', digits: 'Číslice', symbols: 'Symboly', uppercase: 'Velká písmena', mixed: 'Smíšená písma', repeated: 'Opakovaná písmena' },
  ro: { words: 'Cuvinte', digits: 'Cifre', symbols: 'Simboluri', uppercase: 'Majuscule', mixed: 'Scrieri mixte', repeated: 'Litere repetate' },
  da: { words: 'Ord', digits: 'Tal', symbols: 'Symboler', uppercase: 'Store bogstaver', mixed: 'Blandede skriftsystemer', repeated: 'Gentagne bogstaver' },
  fi: { words: 'Sanat', digits: 'Numerot', symbols: 'Symbolit', uppercase: 'Isot kirjaimet', mixed: 'Sekalaiset kirjoitusjärjestelmät', repeated: 'Toistuvat kirjaimet' },
  uk: { words: 'Слова', digits: 'Цифри', symbols: 'Символи', uppercase: 'Великі літери', mixed: 'Змішані писемності', repeated: 'Повторені літери' },
  bn: { words: 'শব্দ', digits: 'অঙ্ক', symbols: 'প্রতীক', uppercase: 'বড় হাতের অক্ষর', mixed: 'মিশ্র লিপি', repeated: 'পুনরাবৃত্ত অক্ষর' },
  nb: { words: 'Ord', digits: 'Tall', symbols: 'Symboler', uppercase: 'Store bokstaver', mixed: 'Blandede skriftsystemer', repeated: 'Gjentatte bokstaver' },
};

const SLOGAN_HEADING: Record<string, string> = {
  en: 'Slogan', fr: 'Slogan', es: 'Eslogan', de: 'Slogan', it: 'Slogan', pt: 'Slogan', ar: 'عبارة تعريفية',
  tr: 'Slogan', ja: 'キャッチコピー', ko: '슬로건', zh: '宣传语', ru: 'Слоган', hi: 'नारा', nl: 'Slogan',
  pl: 'Hasło', sv: 'Slogan', vi: 'Khẩu hiệu', id: 'Slogan', th: 'สโลแกน', el: 'Σλόγκαν', he: 'סיסמה',
  cs: 'Slogan', ro: 'Slogan', da: 'Slogan', fi: 'Iskulause', uk: 'Слоган', bn: 'স্লোগান', nb: 'Slagord',
};

const WRITING_SYSTEMS_HEADING: Record<string, string> = {
  en: 'Writing systems detected', fr: 'Systèmes d’écriture détectés',
  es: 'Sistemas de escritura detectados', de: 'Erkannte Schriftsysteme',
  it: 'Sistemi di scrittura rilevati', pt: 'Sistemas de escrita detetados',
  ar: 'أنظمة الكتابة المكتشفة', tr: 'Tespit edilen yazı sistemleri',
  ja: '検出された文字体系', ko: '감지된 문자 체계', zh: '检测到的文字系统',
  ru: 'Обнаруженные системы письма', hi: 'पहचानी गई लिपियाँ',
  nl: 'Gedetecteerde schriftsystemen', pl: 'Wykryte systemy pisma',
  sv: 'Identifierade skriftsystem', vi: 'Hệ chữ được phát hiện',
  id: 'Sistem tulisan yang terdeteksi', th: 'ระบบอักษรที่ตรวจพบ',
  el: 'Συστήματα γραφής που εντοπίστηκαν', he: 'מערכות הכתב שזוהו',
  cs: 'Zjištěné systémy písma', ro: 'Sisteme de scriere detectate',
  da: 'Registrerede skriftsystemer', fi: 'Havaitut kirjoitusjärjestelmät',
  uk: 'Виявлені системи письма', bn: 'শনাক্ত করা লিপি',
  nb: 'Oppdagede skriftsystemer',
};

const WRITING_SYSTEM_CODES: Record<string, string> = {
  latin: 'Latn', arabic: 'Arab', cyrillic: 'Cyrl', greek: 'Grek', hebrew: 'Hebr',
  devanagari: 'Deva', han: 'Hani', hiragana: 'Hira', katakana: 'Kana', hangul: 'Hang',
  thai: 'Thai', bengali: 'Beng', armenian: 'Armn', georgian: 'Geor', ethiopic: 'Ethi',
  tamil: 'Taml', telugu: 'Telu', gurmukhi: 'Guru', gujarati: 'Gujr', kannada: 'Knda',
  malayalam: 'Mlym', sinhala: 'Sinh', lao: 'Laoo', myanmar: 'Mymr', khmer: 'Khmr',
};

const REVIEW_GUIDANCE: Record<string, string> = {
  en: 'Before using a name publicly, test its pronunciation and clarity with people in your target audience. For commercial use, check domain and trademark availability separately; NameForge does not perform those checks.',
  fr: 'Avant d’utiliser un nom publiquement, testez sa prononciation et sa clarté auprès du public visé. Pour un usage commercial, vérifiez séparément la disponibilité du domaine et des marques : NameForge n’effectue pas ces contrôles.',
  es: 'Antes de usar un nombre públicamente, prueba su pronunciación y claridad con personas de tu público objetivo. Para uso comercial, comprueba por separado la disponibilidad del dominio y de la marca; NameForge no realiza esas verificaciones.',
  de: 'Bevor du einen Namen öffentlich verwendest, teste Aussprache und Verständlichkeit mit Personen aus deiner Zielgruppe. Prüfe bei kommerzieller Nutzung die Domain- und Markenverfügbarkeit separat; NameForge führt diese Prüfungen nicht durch.',
  it: 'Prima di usare pubblicamente un nome, verifica pronuncia e chiarezza con persone del pubblico a cui ti rivolgi. Per un uso commerciale, controlla separatamente la disponibilità del dominio e del marchio: NameForge non effettua queste verifiche.',
  pt: 'Antes de usar um nome publicamente, teste a pronúncia e a clarté com pessoas do público-alvo. Para uso comercial, verifique separadamente a disponibilidade do domínio e da marca; o NameForge não realiza essas verificações.',
  ar: 'قبل استخدام الاسم علنًا، اختبر سهولة نطقه ووضوحه مع أشخاص من الجمهور المستهدف. وللاستخدام التجاري، تحقّق بشكل مستقل من توفر النطاق والعلامة التجارية؛ فـ NameForge لا يجري هذه الفحوصات.',
  tr: 'Bir adı herkese açık şekilde kullanmadan önce telaffuzunu ve anlaşılırlığını hedef kitlenizden kişilerle test edin. Ticari kullanım için alan adı ve marka uygunluğunu ayrıca kontrol edin; NameForge bu kontrolleri yapmaz.',
  ja: '名前を公開して使う前に、対象となる人々に発音や分かりやすさを確認してもらいましょう。商用利用では、ドメインと商標の利用可能性を別途確認してください。NameForgeはこれらを確認しません。',
  ko: '이름을 공개적으로 사용하기 전에 대상 사용자에게 발음과 명확성을 확인하세요. 상업적으로 사용하려면 도메인과 상표 사용 가능 여부를 별도로 확인해야 합니다. NameForge는 이러한 확인을 수행하지 않습니다.',
  zh: '公开使用名称前，请向目标受众测试其发音和清晰度。若用于商业用途，请另行核查域名和商标是否可用；NameForge 不执行这些核查。',
  ru: 'Перед публичным использованием имени проверьте его произношение и понятность на представителях целевой аудитории. Для коммерческого применения отдельно проверьте доступность домена и товарного знака: NameForge этого не делает.',
  hi: 'किसी नाम का सार्वजनिक उपयोग करने से पहले लक्षित दर्शकों के साथ उसके उच्चारण और स्पष्टता की जाँच करें। व्यावसायिक उपयोग के लिए डोमेन और ट्रेडमार्क की उपलब्धता अलग से जाँचें; NameForge ये जाँच नहीं करता।',
  nl: 'Test voordat je een naam openbaar gebruikt de uitspraak en duidelijkheid bij mensen uit je doelgroep. Controleer voor commercieel gebruik afzonderlijk de beschikbaarheid van de domeinnaam en het handelsmerk; NameForge voert deze controles niet uit.',
  pl: 'Przed publicznym użyciem nazwy sprawdź jej wymowę i czytelność wśród osób z grupy docelowej. W przypadku zastosowań komercyjnych osobno zweryfikuj dostępność domeny i znaku towarowego; NameForge tego nie sprawdza.',
  sv: 'Testa uttal och tydlighet med personer i målgruppen innan du använder ett namn offentligt. Vid kommersiell användning bör du separat kontrollera domän- och varumärkestillgänglighet; NameForge gör inte dessa kontroller.',
  vi: 'Trước khi sử dụng tên công khai, hãy thử kiểm tra cách phát âm và độ rõ ràng với những người thuộc nhóm đối tượng mục tiêu. Nếu dùng cho mục đích thương mại, hãy tự kiểm tra riêng tính khả dụng của tên miền và nhãn hiệu; NameForge không thực hiện các kiểm tra này.',
  id: 'Sebelum menggunakan nama secara publik, uji pelafalan dan kejelasannya kepada orang-orang dalam audiens sasaran. Untuk penggunaan komersial, periksa ketersediaan domain dan merek dagang secara terpisah; NameForge tidak melakukan pemeriksaan tersebut.',
  th: 'ก่อนนำชื่อไปใช้ในที่สาธารณะ โปรดลองตรวจสอบการออกเสียงและความชัดเจนกับกลุ่มเป้าหมายก่อน หากใช้ในเชิงพาณิชย์ ควรตรวจสอบโดเมนและเครื่องหมายการค้าแยกต่างหาก เนื่องจาก NameForge ไม่ได้ดำเนินการตรวจสอบเหล่านี้',
  el: 'Πριν χρησιμοποιήσετε δημόσια ένα όνομα, δοκιμάστε την προφορά και τη σαφήνειά του με άτομα από το κοινό-στόχο σας. Για εμπορική χρήση, ελέγξτε ξεχωριστά τη διαθεσιμότητα domain και εμπορικού σήματος· το NameForge δεν πραγματοποιεί αυτούς τους ελέγχους.',
  he: 'לפני שימוש פומבי בשם, בדקו את ההגייה והבהירות שלו עם אנשים מקהל היעד. לשימוש מסחרי, בדקו בנפרד זמינות של דומיין וסימן מסחר; NameForge אינו מבצע בדיקות אלה.',
  cs: 'Před veřejným použitím názvu ověřte jeho výslovnost a srozumitelnost u lidí z cílové skupiny. Pro komerční použití samostatně zkontrolujte dostupnost domény a ochranné známky; NameForge tyto kontroly neprovádí.',
  ro: 'Înainte de a folosi public un nume, testați pronunția și claritatea acestuia cu persoane din publicul țintă. Pentru uz comercial, verificați separat disponibilitatea domeniului și a mărcii; NameForge nu efectuează aceste verificări.',
  da: 'Før du bruger et navn offentligt, bør du teste udtale og tydelighed med personer fra målgruppen. Ved kommerciel brug skal du separat kontrollere, om domænet og varemærket er tilgængeligt; NameForge udfører ikke disse kontroller.',
  fi: 'Testaa nimen ääntämistä ja selkeyttä kohderyhmään kuuluvilla ihmisillä ennen julkista käyttöä. Tarkista kaupallisessa käytössä verkkotunnuksen ja tavaramerkin saatavuus erikseen; NameForge ei tee näitä tarkistuksia.',
  uk: 'Перш ніж використовувати назву публічно, перевірте її вимову та зрозумілість на представниках цільової аудиторії. Для комерційного використання окремо перевірте доступність домену й торговельної марки; NameForge цього не робить.',
  bn: 'কোনো নাম প্রকাশ্যে ব্যবহারের আগে লক্ষ্য শ্রোতার মানুষের সঙ্গে এর উচ্চারণ ও স্পষ্টতা পরীক্ষা করুন। বাণিজ্যিক ব্যবহারের জন্য ডোমেইন ও ট্রেডমার্কের প্রাপ্যতা আলাদাভাবে যাচাই করুন; NameForge এই যাচাই করে না।',
  nb: 'Test uttale og tydelighet med personer i målgruppen før du bruker et navn offentlig. Ved kommersiell bruk bør du kontrollere tilgjengeligheten til domenet og varemerket separat; NameForge utfører ikke disse kontrollene.',
};

const LEGAL_NOTICE: Partial<Record<LanguageCode, string>> = {
  en: 'Creative suggestion only. Check official trademark and domain registries before using this name commercially.',
  fr: 'Suggestion créative uniquement. Vérifiez les registres officiels des marques et des domaines avant tout usage commercial.',
  es: 'Sugerencia creativa únicamente. Consulte los registros oficiales de marcas y dominios antes de usar este nombre comercialmente.',
  de: 'Nur ein kreativer Vorschlag. Prüfen Sie vor der kommerziellen Nutzung die offiziellen Marken- und Domainregister.',
  it: 'Solo un suggerimento creativo. Prima dell’uso commerciale, verifica i registri ufficiali di marchi e domini.',
  pt: 'Apenas uma sugestão criativa. Verifique os registos oficiais de marcas e domínios antes de usar este nome comercialmente.',
  ar: 'اقتراح إبداعي فقط. تحقّق من السجلات الرسمية للعلامات التجارية والنطاقات قبل استخدام هذا الاسم تجاريًا.',
  tr: 'Yalnızca yaratıcı bir öneridir. Bu adı ticari amaçla kullanmadan önce resmî marka ve alan adı kayıtlarını kontrol edin.',
  ja: '創作上の提案です。商用利用の前に、公式の商標登録とドメイン登録状況を確認してください。',
  ko: '창작용 제안입니다. 상업적으로 사용하기 전에 공식 상표 및 도메인 등록 정보를 확인하세요.',
  zh: '此内容仅为创意建议。用于商业用途前，请查询官方商标和域名注册信息。',
  ru: 'Это только творческое предложение. Перед коммерческим использованием проверьте официальные реестры товарных знаков и доменов.',
  hi: 'यह केवल एक रचनात्मक सुझाव है। व्यावसायिक उपयोग से पहले आधिकारिक ट्रेडमार्क और डोमेन रजिस्ट्रियों की जाँच करें।',
  nl: 'Dit is alleen een creatieve suggestie. Controleer officiële merken- en domeinregisters voordat je de naam commercieel gebruikt.',
  pl: 'To wyłącznie propozycja kreatywna. Przed użyciem komercyjnym sprawdź oficjalne rejestry znaków towarowych i domen.',
  sv: 'Detta är endast ett kreativt förslag. Kontrollera officiella varumärkes- och domänregister före kommersiell användning.',
  vi: 'Đây chỉ là gợi ý sáng tạo. Hãy kiểm tra cơ sở dữ liệu nhãn hiệu và tên miền chính thức trước khi sử dụng cho mục đích thương mại.',
  id: 'Ini hanya saran kreatif. Periksa daftar resmi merek dagang dan domain sebelum menggunakan nama ini secara komersial.',
  th: 'นี่เป็นเพียงข้อเสนอเชิงสร้างสรรค์ โปรดตรวจสอบทะเบียนเครื่องหมายการค้าและโดเมนอย่างเป็นทางการก่อนนำชื่อไปใช้ในเชิงพาณิชย์',
  el: 'Πρόκειται μόνο για δημιουργική πρόταση. Ελέγξτε τα επίσημα μητρώα εμπορικών σημάτων και domain πριν από εμπορική χρήση.',
  he: 'זוהי הצעה יצירתית בלבד. לפני שימוש מסחרי, בדקו במאגרים הרשמיים של סימני מסחר ודומיינים.',
  cs: 'Jde pouze o kreativní návrh. Před komerčním použitím ověřte oficiální rejstříky ochranných známek a domén.',
  ro: 'Aceasta este doar o sugestie creativă. Verifică registrele oficiale de mărci și domenii înainte de utilizarea comercială.',
  da: 'Dette er kun et kreativt forslag. Kontrollér officielle varemærke- og domæneregistre før kommerciel brug.',
  fi: 'Tämä on vain luova ehdotus. Tarkista viralliset tavaramerkki- ja verkkotunnusrekisterit ennen kaupallista käyttöä.',
  uk: 'Це лише творча пропозиція. Перш ніж використовувати ім’я комерційно, перевірте офіційні реєстри торгових марок і доменів.',
  bn: 'এটি শুধুই একটি সৃজনশীল প্রস্তাব। বাণিজ্যিকভাবে এই নাম ব্যবহারের আগে অফিসিয়াল ট্রেডমার্ক ও ডোমেন নিবন্ধন যাচাই করুন।',
  nb: 'Kun et kreativt forslag. Sjekk offisielle varemerke- og domeneregistre før du bruker navnet kommersielt.',
};

export interface CompleteNameAnalysisModalProps {
  item: GeneratedName;
  meta?: GeneratorMeta;
  generationLanguage?: GenLanguageCode;
  batchNames?: string[];
  onClose: () => void;
  onUpdate?: () => void;
  onOpenNote?: (name: string, generatorId: GeneratorId, style: string) => void;
}

const StatusPill: React.FC<{ status: UnifiedAnalysisStatus; label: string }> = ({ status, label }) => (
  <span className="name-analysis-status" data-status={status}>
    {label}
  </span>
);

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const CompleteNameAnalysisModal: React.FC<CompleteNameAnalysisModalProps> = ({
  item: initialItem,
  meta: providedMeta,
  generationLanguage,
  batchNames = [],
  onClose,
  onUpdate,
  onOpenNote,
}) => {
  const [activeItem, setActiveItem] = useState<GeneratedName>(initialItem);
  useEffect(() => {
    setActiveItem(initialItem);
  }, [initialItem]);

  useEscapeKey(() => {
    if (document.querySelector('[data-modal-layer="top"]')) return;
    onClose();
  });
  const modalRef = useModalFocus<HTMLElement>();

  const settings = getAppSettings();
  const language = settings.language;
  const dir = getTextDirection(language);
  const meta = providedMeta || GENERATORS_METADATA[activeItem.generatorId] || GENERATORS_METADATA.fantasy;

  const existing = findSavedEntry(activeItem.name, activeItem.generatorId);
  const [isSaved, setIsSaved] = useState(existing?.saved || false);
  const [isLiked, setIsLiked] = useState(existing?.liked || false);
  const [hasNote, setHasNote] = useState(Boolean(existing?.note));
  const [rating, setRating] = useState<number>(getStoredRating(activeItem.name));
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('archetype-primary');
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  useEffect(() => {
    const syncFromStorage = () => {
      const updated = findSavedEntry(activeItem.name, activeItem.generatorId);
      setIsSaved(updated?.saved || false);
      setIsLiked(updated?.liked || false);
      setHasNote(Boolean(updated?.note));
      setRating(getStoredRating(activeItem.name));
    };
    syncFromStorage();
    return subscribeToStorage(syncFromStorage);
  }, [activeItem.name, activeItem.generatorId]);

  const labels = useMemo(() => getNameDetailsLabels(language), [language]);
  const sectionLabels = useMemo(() => getNameInsightSectionLabels(language), [language]);
  const analysisLabels = useMemo(() => getUnifiedAnalysisLabels(language), [language]);
  const intel = useMemo(() => getNameIntelligenceLabels(language), [language]);

  const analysis = useMemo(
    () =>
      analyzeNameCompletely({
        name: activeItem.name,
        generatorId: activeItem.generatorId,
        style: activeItem.style,
        interfaceLanguage: language,
        generationLanguage: generationLanguage ?? settings.defaultGenLanguage,
        batchNames,
        humanNaturalness: rating > 0 ? rating : undefined,
        item: activeItem,
      }),
    [activeItem, language, generationLanguage, settings.defaultGenLanguage, batchNames, rating]
  );

  const report = analysis.report;
  const canonicalLang = resolveCanonicalLocale(language);
  const structureCopy = STRUCTURE_LABELS[canonicalLang] ?? STRUCTURE_LABELS.en;
  const metricCopy = METRIC_LABELS[canonicalLang] ?? METRIC_LABELS.en;

  const activePreset = useMemo(() => {
    const presets = report.visualIdentity.presets;
    return presets.find((p) => p.id === selectedPresetId) ?? presets[0];
  }, [report.visualIdentity.presets, selectedPresetId]);

  const writingSystemNames = analysis.identity.metrics.writingSystems.map((system) => {
    const code = WRITING_SYSTEM_CODES[system];
    if (!code) return system;
    try {
      const display = new Intl.DisplayNames([language], { type: 'script' }).of(code);
      return display ? `${display} (${code})` : system;
    } catch {
      return system;
    }
  });

  const metricItems = [
    { label: labels.length, value: analysis.identity.metrics.characterCount },
    { label: metricCopy.words, value: analysis.identity.metrics.wordCount ?? '—' },
    { label: metricCopy.digits, value: analysis.identity.metrics.digitCount },
    { label: metricCopy.symbols, value: analysis.identity.metrics.symbolCount },
    { label: metricCopy.uppercase, value: analysis.identity.metrics.uppercaseCount },
    { label: metricCopy.repeated, value: analysis.identity.metrics.repeatedCharacterCount },
    { label: metricCopy.mixed, value: analysis.identity.metrics.hasMixedScripts ? '✓' : '—' },
    {
      label: structureCopy.vowelShare,
      value:
        analysis.identity.metrics.latinVowelShare === null
          ? '—'
          : `${analysis.identity.metrics.latinVowelShare}%`,
    },
  ];

  const copyText = async (key: string, value: string) => {
    if (await copyToClipboard(value)) {
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1300);
    }
  };

  const handleCopyFullSummary = async () => {
    await copyText('__summary__', formatReportAsText(report, language));
  };

  const handleExportTxt = () => {
    const safeSlug = (analysis.identity.normalizedName || 'name').replace(/[^\p{L}\p{N}_-]+/gu, '-');
    downloadFile(`${safeSlug}-intelligence-report.txt`, formatReportAsText(report, language), 'text/plain');
  };

  const handleExportJson = () => {
    const safeSlug = (analysis.identity.normalizedName || 'name').replace(/[^\p{L}\p{N}_-]+/gu, '-');
    downloadFile(`${safeSlug}-intelligence-report.json`, formatReportAsJson(report), 'application/json');
  };

  const handleSave = () => {
    const next = toggleSaveName(activeItem.name, activeItem.generatorId, activeItem.style);
    setIsSaved(next);
    if (onUpdate) onUpdate();
  };

  const handleLike = () => {
    const next = toggleLikeName(activeItem.name, activeItem.generatorId, activeItem.style);
    setIsLiked(next);
    if (onUpdate) onUpdate();
  };

  const handleRate = (star: number) => {
    const next = rating === star ? 0 : star;
    setRating(next);
    setStoredRating(activeItem.name, next);
    if (onUpdate) onUpdate();
  };

  const handleSpeak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeItem.name);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const openInCreativeStudio = () => {
    if (analysis.visual.insight) {
      const vd = analysis.visual.insight.visualDirection;
      const preset = activePreset;
      const studioContext: CreativeStudioTransferContext = {
        name: activeItem.name,
        styleId: preset?.studioMapping.styleId ?? vd.studioMapping.styleId,
        effectId: preset?.studioMapping.effectId ?? vd.studioMapping.effectId,
        fontId: preset?.studioMapping.fontId ?? vd.studioMapping.fontId,
        palette: (preset?.colors ?? vd.colors).map((c) => c.hex),
        slogan: analysis.semantic.slogan ?? undefined,
        personality: vd.personality,
        sourceCategoryLabel: analysis.identity.generatorLabel,
        archetype: preset?.archetype ?? vd.archetype,
        language: language as LanguageCode,
        visualDirectionLabel: preset ? intel.labels.presetNames[preset.presetKey] : undefined,
      };
      window.dispatchEvent(
        new CustomEvent('nameforge:navigate', {
          detail: {
            view: 'creative-studio',
            name: activeItem.name,
            studioContext,
          },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('nameforge:navigate', {
          detail: { view: 'style-studio', name: activeItem.name },
        })
      );
    }
    onClose();
  };

  const openInStyleStudio = () => {
    window.dispatchEvent(
      new CustomEvent('nameforge:navigate', {
        detail: { view: 'style-studio', name: activeItem.name },
      })
    );
    onClose();
  };

  const openOriginalGenerator = () => {
    window.dispatchEvent(
      new CustomEvent('nameforge:navigate', {
        detail: { view: 'generator-detail', generatorId: activeItem.generatorId },
      })
    );
    onClose();
  };

  const isOnThisGenerator =
    typeof window !== 'undefined' &&
    window.location.hash.includes(`/generator/${activeItem.generatorId}`);

  return (
    <>
      {showCompareModal && (
        <CompareModal
          initialNames={Array.from(new Set([activeItem.name, ...batchNames])).slice(0, 2)}
          availableBatchNames={batchNames}
          defaultGeneratorId={activeItem.generatorId}
          generationLanguage={generationLanguage}
          onInspectReport={(targetName, targetGen, targetStyle) => {
            const genMeta = GENERATORS_METADATA[targetGen] || meta;
            setActiveItem({
              name: targetName,
              generatorId: targetGen,
              style: targetStyle,
              description: genMeta.description,
              icon: genMeta.icon,
              bestFor: genMeta.shortTitle,
              tone: targetStyle,
            });
            setShowCompareModal(false);
          }}
          onClose={() => setShowCompareModal(false)}
          onUpdate={onUpdate}
        />
      )}

      <div
        className="name-insight-overlay fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <section
          ref={modalRef}
          tabIndex={-1}
          data-testid="name-insight-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="name-analysis-title"
          dir={dir}
          lang={language}
          className="name-insight-dialog flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* Sticky Header */}
          <header className="name-insight-header sticky top-0 z-10 flex items-start justify-between gap-4 border-b backdrop-blur">
            <div className="min-w-0 flex-1">
              <div className="name-insight-eyebrow mb-1 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{analysisLabels.sheetTitle}</span>
                <span aria-hidden="true">·</span>
                <span>{intel.reportTitle}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{analysis.identity.generatorLabel}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <h2 id="name-analysis-title" className="name-insight-title break-words font-black">
                  {analysis.identity.normalizedName || activeItem.name}
                </h2>
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-semibold text-sky-700 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title={labels.listen}
                  aria-label={labels.listen}
                >
                  <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{analysisLabels.fields.listenButton}</span>
                </button>
              </div>

              {/* Unboxed typographic metadata + interactive action bar */}
              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {analysis.identity.styleLabel} ·{' '}
                  <span className="font-semibold">
                    {intel.originClassifications[report.identification.originClassification]}
                  </span>{' '}
                  ·{' '}
                  <span>{intel.verificationStatuses[report.identification.overallVerificationStatus]}</span>
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCompareModal(true)}
                    className="nf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cursor-pointer"
                  >
                    <Scale className="h-3 w-3" aria-hidden="true" />
                    <span>{intel.actions.compareNames}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportTxt}
                    className="nf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cursor-pointer"
                  >
                    <Download className="h-3 w-3" aria-hidden="true" />
                    <span>{intel.actions.exportTxt}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="nf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cursor-pointer"
                  >
                    <Download className="h-3 w-3" aria-hidden="true" />
                    <span>{intel.actions.exportJson}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="nf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cursor-pointer"
                  >
                    <Printer className="h-3 w-3" aria-hidden="true" />
                    <span>{intel.actions.printReport}</span>
                  </button>
                  {!isOnThisGenerator && (
                    <button
                      type="button"
                      onClick={openOriginalGenerator}
                      className="nf-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] cursor-pointer"
                    >
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      <span>{intel.actions.backToGenerator}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="name-insight-close shrink-0 rounded-xl p-2 cursor-pointer"
              aria-label={labels.close}
              data-testid="name-insight-close"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          {/* Scrollable Content */}
          <div className="name-insight-content flex-1 overflow-y-auto">
            {/* Quick Executive Snapshot */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="name-insight-metric rounded-xl p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider">{analysisLabels.fields.qualityScore}</p>
                <p className="mt-1 font-bold tabular-nums">
                  {analysis.quality.result.score !== null ? `${analysis.quality.result.score}/100` : '—'}
                </p>
              </div>
              <div className="name-insight-metric rounded-xl p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider">{analysisLabels.fields.qualityCoverage}</p>
                <p className="mt-1 font-bold tabular-nums">{analysis.quality.result.coverage}%</p>
              </div>
              <div className="name-insight-metric rounded-xl p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider">{labels.length}</p>
                <p className="mt-1 font-bold tabular-nums">
                  {analysis.identity.metrics.characterCount} {labels.letters}
                </p>
              </div>
              <div className="name-insight-metric rounded-xl p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider">{analysisLabels.fields.targetLanguageLabel}</p>
                <p className="mt-1 truncate text-base font-bold">
                  {formatTargetLanguageName(analysis.linguistic.effectiveLanguage, language)}
                </p>
              </div>
            </div>

            {/* SECTION 01 (FIRST <details>): Identification & Structure — must NEVER contain 'phonetics' / 'phonétique' */}
            <details open className="name-insight-details group rounded-2xl border p-4" data-testid="analysis-section-structure">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <span>01. {structureCopy.heading}</span>
                  <StatusPill
                    status={analysis.identity.status}
                    label={analysisLabels.statusLabels[analysis.identity.status]}
                  />
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {report.identification.categoryLabel} · {report.identification.styleLabel}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              {/* 8-cell structural metric grid required by automated layout checks */}
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {metricItems.map((metric, index) => (
                  <div key={index} className="name-insight-metric rounded-xl p-3">
                    <p className="text-[11px] leading-4">{metric.label}</p>
                    <p className="mt-1 text-lg font-bold tabular-nums">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700/80 pt-2.5">
                <span>
                  <strong>{intel.labels.generationMethod}:</strong>{' '}
                  {intel.labels.generationMethods[report.identification.generationMethod]}
                </span>
                <span>
                  <strong>{intel.labels.originClassification}:</strong>{' '}
                  {intel.originClassifications[report.identification.originClassification]}
                </span>
                <span>
                  <strong>{intel.labels.overallStatus}:</strong>{' '}
                  {intel.verificationStatuses[report.identification.overallVerificationStatus]}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                {structureCopy.vowelNote}
              </p>

              {analysis.identity.orthographicUnits.length > 0 && (
                <div className="mt-3 border-t border-slate-200 dark:border-slate-700/80 pt-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {analysisLabels.fields.orthographicUnits} ({analysis.identity.orthographicUnits.length})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {analysis.identity.orthographicUnits.slice(0, 28).map((unit, idx) => (
                      <span
                        key={`${unit}-${idx}`}
                        className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-0.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200"
                      >
                        {unit === ' ' ? '␣' : unit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {writingSystemNames.length > 0 && (
                <div className="mt-3 border-t border-slate-200 dark:border-slate-700/80 pt-3" data-testid="name-insight-writing-systems">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {WRITING_SYSTEMS_HEADING[canonicalLang] ?? WRITING_SYSTEMS_HEADING.en}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {writingSystemNames.map((system) => (
                      <li
                        key={system}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-800 dark:text-slate-200"
                      >
                        {system}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </details>

            {/* SECTION 02: Deep Linguistic Analysis */}
            <details className="name-insight-details group rounded-2xl border p-4" data-testid="analysis-section-linguistic">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <span>{intel.sectionTitles.s02}</span>
                  <StatusPill
                    status={analysis.linguistic.status}
                    label={analysisLabels.statusLabels[analysis.linguistic.status]}
                  />
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    {report.linguistic.alphabetClass} · {report.linguistic.writingDirection.toUpperCase()} ·{' '}
                    {intel.pronunciationLevels[report.linguistic.pronunciationDifficulty]}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              <div className="mt-3 space-y-3 text-xs">
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {intel.labels.alphabetClass}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                      {report.linguistic.alphabetClass}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {intel.labels.writingDirection}: {report.linguistic.writingDirection.toUpperCase()}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {intel.labels.pronunciationDifficulty}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
                      {intel.pronunciationLevels[report.linguistic.pronunciationDifficulty]}
                    </p>
                    <p className="mt-1">
                      <span className="ni-verif-tag" data-verif={report.linguistic.pronunciationStatus}>
                        {intel.verificationStatuses[report.linguistic.pronunciationStatus]}
                      </span>
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {analysisLabels.fields.pronunciationGuide}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="truncate font-mono text-sm font-semibold text-sky-700 dark:text-cyan-300">
                        {analysis.linguistic.pronunciationGuide || '—'}
                      </span>
                      <button
                        type="button"
                        onClick={handleSpeak}
                        className="rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                      >
                        {analysisLabels.fields.listenButton}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Syllabic / Mora / Hangul / Phonetic Observations */}
                {report.linguistic.syllabicUnits.length > 0 && (
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      {intel.labels.syllabicUnits} (~{report.linguistic.syllableCountEstimated})
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {report.linguistic.syllabicUnits.map((unit, idx) => (
                        <span
                          key={`${unit}-${idx}`}
                          className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-0.5 font-mono font-semibold"
                        >
                          {unit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.linguistic.hangulSyllables.length > 0 && (
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">
                      {analysisLabels.fields.hangulParts}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {analysis.linguistic.hangulSyllables.map(({ syllable, parts }, idx) => (
                        <span
                          key={`${syllable}-${idx}`}
                          className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1 font-mono"
                        >
                          <strong>{syllable}</strong> = {parts.onset}+{parts.nucleus}
                          {parts.coda ? `+${parts.coda}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Arabic-specific inspection */}
                {(report.linguistic.arabicDetails.isArabicScript || report.linguistic.arabicDetails.notes.length > 0) && (
                  <div className="rounded-xl border border-sky-200/80 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/20 p-3 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{intel.labels.arabicChecks}</p>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {report.linguistic.arabicDetails.notes.map((n, i) => (
                        <li key={i}>• {n}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Japanese-specific inspection */}
                {report.linguistic.japaneseDetails.isJapaneseContext && (
                  <div className="rounded-xl border border-sky-200/80 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/20 p-3 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{intel.labels.japaneseChecks}</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      Hiragana: <strong className="tabular-nums">{report.linguistic.japaneseDetails.hiraganaCount}</strong> ·{' '}
                      Katakana: <strong className="tabular-nums">{report.linguistic.japaneseDetails.katakanaCount}</strong> ·{' '}
                      Kanji: <strong className="tabular-nums">{report.linguistic.japaneseDetails.kanjiCount}</strong> ·{' '}
                      Romaji: <strong className="tabular-nums">{report.linguistic.japaneseDetails.romajiCount}</strong>
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {report.linguistic.japaneseDetails.authenticityDistinction}
                    </p>
                    {report.linguistic.japaneseDetails.notes.map((n, i) => (
                      <p key={i} className="text-slate-600 dark:text-slate-400">• {n}</p>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{intel.labels.phoneticProfile}</p>
                    {report.linguistic.phoneticCharacteristics.map((p, idx) => (
                      <p key={idx} className="leading-5 text-slate-600 dark:text-slate-300">• {p}</p>
                    ))}
                    <p className="leading-5 text-slate-600 dark:text-slate-400">{report.linguistic.readabilitySummary}</p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{intel.labels.morphologicalNotes}</p>
                    {report.linguistic.morphologicalNotes.map((m, idx) => (
                      <p key={idx} className="leading-5 text-slate-600 dark:text-slate-300">• {m}</p>
                    ))}
                    {report.linguistic.transliterationNote && (
                      <p className="leading-5 text-slate-600 dark:text-slate-400">
                        <strong>{intel.labels.transliteration}:</strong> {report.linguistic.transliterationNote}
                      </p>
                    )}
                  </div>
                </div>

                {analysis.linguistic.compatibility.showNotice && (
                  <div className="rounded-xl border border-blue-200/80 dark:border-sky-500/30 bg-blue-50/70 dark:bg-sky-950/20 p-3 leading-5 text-slate-700 dark:text-slate-300">
                    <strong className="block font-bold">{analysis.linguistic.compatibility.noticeTitle}</strong>
                    <span>{analysis.linguistic.compatibility.noticeMessage}</span>
                  </div>
                )}

                {report.linguistic.ambiguitiesAndRisks.length > 0 && (
                  <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 p-3 space-y-1">
                    <p className="font-bold text-amber-800 dark:text-amber-300">{intel.labels.ambiguitiesRisks}</p>
                    {report.linguistic.ambiguitiesAndRisks.map((risk, idx) => (
                      <p key={idx} className="text-slate-700 dark:text-slate-300">• {risk}</p>
                    ))}
                  </div>
                )}

                <p className="leading-5 text-slate-600 dark:text-slate-400">
                  {analysisLabels.fields.nonNativeDisclaimer}
                </p>
              </div>
            </details>

            {/* SECTION 03 (OPEN BY DEFAULT): Quality Evaluation — 10 Transparent Criteria */}
            <details open className="name-insight-details group rounded-2xl border p-4" data-testid="analysis-section-quality">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <span>{intel.sectionTitles.s03}</span>
                  <StatusPill
                    status={analysis.quality.status}
                    label={analysisLabels.statusLabels[analysis.quality.status]}
                  />
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400 tabular-nums">
                    {report.quality.measuredCount}/10 {analysisLabels.fields.measuredLabel}
                  </span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              <div className="mt-3 space-y-4">
                {/* Interactive human rating contributing directly to Naturalness */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 p-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {analysisLabels.fields.humanRatingLabel}
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {analysisLabels.fields.humanRatingHint}
                    </p>
                  </div>
                  <div className="flex items-center gap-1" role="group" aria-label={labels.rating}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRate(star)}
                        aria-label={`${labels.rating} ${star}/5`}
                        aria-pressed={rating === star}
                        className="p-1 cursor-pointer hover:scale-110 transition"
                      >
                        <Star
                          className={`h-4 w-4 ${
                            star <= rating
                              ? 'text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400'
                              : 'text-slate-400 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ms-1.5 text-xs font-bold tabular-nums text-slate-700 dark:text-slate-300">
                      {rating > 0 ? `${rating}/5` : '—'}
                    </span>
                  </div>
                </div>

                {/* 10 Criteria Grid */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {report.quality.criteria.map((criterion) => {
                    const hasScore = criterion.score !== null;
                    return (
                      <div
                        key={criterion.key}
                        className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 p-3 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            {intel.criteriaLabels[criterion.key]}
                          </span>
                          <span className="font-bold tabular-nums text-slate-800 dark:text-slate-100 shrink-0">
                            {hasScore ? `${criterion.score}/100` : '—'}
                          </span>
                        </div>
                        <div className="name-analysis-meter-track">
                          <div
                            className="name-analysis-meter-fill"
                            style={{
                              width: hasScore ? `${criterion.score}%` : '0%',
                              opacity: hasScore ? (criterion.verificationStatus === 'estimated' ? 0.65 : 1) : 0.2,
                            }}
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-1.5 pt-0.5">
                          <span className="ni-verif-tag" data-verif={criterion.verificationStatus}>
                            {intel.verificationStatuses[criterion.verificationStatus]}
                          </span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {intel.criteriaMethods[criterion.method]}
                          </span>
                        </div>
                        <p className="text-[11px] leading-4 text-slate-600 dark:text-slate-400">
                          {criterion.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {report.quality.overallCompositeNote} · {analysisLabels.fields.qualityInterpretation}
                </p>
              </div>
            </details>

            {/* SECTION 04 (OPEN BY DEFAULT): Creative & Semantic Analysis */}
            <details open className="name-insight-details group rounded-2xl border p-4" data-testid="analysis-section-semantic">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <span>04. {labels.whyFits}</span>
                  <StatusPill
                    status={analysis.semantic.status}
                    label={analysisLabels.statusLabels[analysis.semantic.status]}
                  />
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              <div className="mt-3 space-y-3">
                {analysis.semantic.etymologyMode === 'attested' ? (
                  <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/80 dark:bg-emerald-950/20 p-3.5 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        <span>{labels.attested}</span>
                      </span>
                      {analysis.semantic.origin && (
                        <span className="rounded-md border border-emerald-200 dark:border-emerald-500/30 bg-white dark:bg-slate-900 px-2.5 py-0.5 font-semibold text-slate-800 dark:text-slate-200">
                          {analysis.semantic.origin}
                        </span>
                      )}
                    </div>
                    {analysis.semantic.meaning && (
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        <strong>{labels.etymology}</strong> « {analysis.semantic.meaning} »
                      </p>
                    )}
                    {analysis.semantic.variants.length > 0 && (
                      <p className="text-slate-600 dark:text-slate-400">
                        <strong>{labels.variants}</strong> {analysis.semantic.variants.join(', ')}
                      </p>
                    )}
                  </div>
                ) : analysis.semantic.creativeReading ? (
                  <div className="space-y-2">
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {analysis.semantic.creativeReading}
                    </p>
                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {analysis.semantic.contextDescription}
                    </p>
                    <p className="text-xs leading-5 italic text-slate-600 dark:text-slate-400">
                      {analysisLabels.fields.noEtymologyNotice}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {analysis.semantic.contextDescription}
                    </p>
                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {analysisLabels.fields.semanticUnavailable}
                    </p>
                  </div>
                )}

                {/* Interpretive Sound Identity & Relevant Universes */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{intel.labels.soundIdentityHeading}</p>
                    <p className="leading-5 text-slate-700 dark:text-slate-300">
                      {report.creativeSemantic.soundIdentityNote}
                    </p>
                    <p className="text-[11px] italic text-slate-500 dark:text-slate-400">
                      {intel.labels.soundIdentityDisclaimer}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-1.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{intel.labels.thematicUniverses}</p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {report.creativeSemantic.thematicUniverses.join(' · ')}
                    </p>
                    <p className="font-bold text-slate-900 dark:text-slate-100 pt-1">{intel.labels.targetAudience}</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {report.creativeSemantic.targetAudience.join(' · ')}
                    </p>
                  </div>
                </div>

                {analysis.semantic.slogan && (
                  <div className="name-insight-slogan rounded-2xl border bg-violet-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold">{SLOGAN_HEADING[canonicalLang] || SLOGAN_HEADING.en}</h3>
                      <button
                        type="button"
                        onClick={() => void copyText('slogan', analysis.semantic.slogan!)}
                        className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                        aria-label={labels.copy}
                      >
                        {copied === 'slogan' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6">{analysis.semantic.slogan}</p>
                  </div>
                )}

                <div className="name-insight-transparency rounded-xl border px-3.5 py-2.5 text-xs leading-5">
                  <p>{labels.transparency}</p>
                </div>
              </div>
            </details>

            {/* SECTION 05: Visual Identity, Typography, Variations & Creative Studio Transfer */}
            <details className="name-insight-details group rounded-2xl border p-4" data-testid="name-insight-visual-direction">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <Palette className="h-4 w-4 text-[var(--ni-eyebrow)] shrink-0" aria-hidden="true" />
                  <span>{intel.sectionTitles.s05}</span>
                  <StatusPill
                    status={analysis.visual.status}
                    label={analysisLabels.statusLabels[analysis.visual.status]}
                  />
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              {analysis.visual.status === 'ready' && analysis.visual.insight ? (
                <div className="mt-3 space-y-4">
                  {/* Interactive visual direction preset switcher */}
                  {report.visualIdentity.presets.length > 1 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        {intel.labels.visualPresets}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {report.visualIdentity.presets.map((preset) => {
                          const active = (activePreset?.id ?? 'archetype-primary') === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setSelectedPresetId(preset.id)}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                                active
                                  ? 'bg-[var(--nf-primary)] text-[var(--nf-primary-ink)] border-[var(--nf-primary)]'
                                  : 'nf-btn-secondary'
                              }`}
                            >
                              {intel.labels.presetNames[preset.presetKey]}
                            </button>
                          );
                        })}
                      </div>
                      {activePreset && (
                        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {activePreset.intentionNote}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {sectionLabels.brandMoodboard}
                    </p>
                    <BrandMoodboard
                      name={activeItem.name}
                      categoryLabel={analysis.identity.generatorLabel}
                      slogan={analysis.semantic.slogan || ''}
                      visualDirection={analysis.visual.insight.visualDirection}
                      activePreset={activePreset}
                      labels={sectionLabels}
                      dir={dir}
                    />
                  </div>

                  {/* Color Palette with Role Intentions */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {sectionLabels.colorPalette}
                    </p>
                    <div className="name-insight-palette grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {(activePreset?.colors ?? analysis.visual.insight.visualDirection.colors).map((swatch) => {
                        const isCopied = copied === swatch.hex;
                        return (
                          <div key={swatch.role} className="name-insight-swatch-card flex flex-col rounded-xl border p-2">
                            <div
                              className="flex h-16 items-end justify-between rounded-lg border border-black/10 dark:border-white/10 p-2"
                              style={{ backgroundColor: swatch.hex, color: swatch.contrastInk }}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                                {sectionLabels.roleLabels[swatch.role]}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-1.5 px-0.5">
                              <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {swatch.hex}
                              </span>
                              <button
                                type="button"
                                onClick={() => void copyText(swatch.hex, swatch.hex)}
                                className="inline-flex items-center justify-center rounded-md p-1.5 text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10 cursor-pointer"
                                aria-label={`${sectionLabels.copyHex} ${swatch.hex}`}
                                title={sectionLabels.copyHex}
                              >
                                {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                              </button>
                            </div>
                            <p className="mt-1 px-0.5 text-[10px] leading-4 text-slate-500 dark:text-slate-400">
                              {report.visualIdentity.colorIntentions[swatch.role]}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Script-Compatible Typography & Personality */}
                  <div className="grid gap-3 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3.5 sm:grid-cols-2 text-xs">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {intel.labels.typographyGuide}
                      </p>
                      <ul className="mt-1.5 space-y-1 text-slate-800 dark:text-slate-100">
                        {report.visualIdentity.recommendedTypography.map((fontName, idx) => (
                          <li key={idx}>• {fontName}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {sectionLabels.brandPersonality}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {analysis.visual.insight.visualDirection.personality
                          .map((trait) => sectionLabels.personalityLabels[trait])
                          .join(' · ')}
                      </p>
                    </div>
                  </div>

                  {/* Categorized Name Variations */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {intel.labels.categorizedVariations}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(
                        [
                          ['short', report.visualIdentity.categorizedVariations.short],
                          ['extended', report.visualIdentity.categorizedVariations.extended],
                          ['alternativeSpelling', report.visualIdentity.categorizedVariations.alternativeSpelling],
                          ['username', report.visualIdentity.categorizedVariations.username],
                          ['logoFriendly', report.visualIdentity.categorizedVariations.logoFriendly],
                        ] as const
                      ).map(([groupKey, list]) =>
                        list.length > 0 ? (
                          <div
                            key={groupKey}
                            className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-2.5"
                          >
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                              {intel.labels.variationGroups[groupKey]}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {list.map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => void copyText(`var-${v}`, v)}
                                  className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-0.5 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-[var(--nf-primary)] cursor-pointer"
                                  title={labels.copy}
                                >
                                  {copied === `var-${v}` ? `✓ ${v}` : v}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>

                  {/* Preserved Suggested Variations List */}
                  <div data-testid="name-insight-variations">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      {sectionLabels.suggestedVariations}
                    </p>
                    <p className="mb-2.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                      {sectionLabels.suggestedVariationsNote}
                    </p>
                    <ul className="name-insight-variants space-y-2">
                      {analysis.visual.insight.variations.map((variation) => (
                        <li key={variation.name} className="flex items-center justify-between gap-3 px-3 py-2.5">
                          <div className="min-w-0 flex-1">
                            <span className="block break-words text-sm font-semibold">{variation.name}</span>
                            <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {sectionLabels.variationDirectionLabels[variation.direction]}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => void copyText(variation.name, variation.name)}
                            className="shrink-0 rounded-lg p-2 text-blue-700 dark:text-sky-300 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
                            aria-label={`${sectionLabels.copyVariation}: ${variation.name}`}
                          >
                            {copied === variation.name ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual Extensions */}
                  {report.visualIdentity.extensions.length > 0 && (
                    <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 text-xs">
                      <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {intel.labels.visualExtensions}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-700 dark:text-slate-300">
                        {report.visualIdentity.extensions.map((ext) => (
                          <span key={ext.channel}>
                            <strong>{intel.labels.extensionChannels[ext.channel]}:</strong>{' '}
                            <code className="font-mono">{ext.example}</code>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] leading-4 text-slate-500 dark:text-slate-400">
                    {sectionLabels.creativeSuggestionNote}
                  </p>

                  <button
                    type="button"
                    data-testid="name-insight-customize-studio"
                    onClick={openInCreativeStudio}
                    className="name-insight-studio-cta flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition cursor-pointer"
                  >
                    <Wand2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{sectionLabels.customizeInStudio}</span>
                  </button>
                </div>
              ) : (
                <div className="mt-3 space-y-3 text-xs">
                  <p className="leading-5 text-slate-600 dark:text-slate-400">
                    {analysisLabels.fields.visualUnavailable}
                  </p>
                  <button
                    type="button"
                    onClick={openInStyleStudio}
                    className="nf-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs cursor-pointer"
                  >
                    <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{analysisLabels.fields.openStyleStudio}</span>
                  </button>
                </div>
              )}
            </details>

            {/* SECTION 06: Recommendations, Decision & Verification Checklist */}
            <details className="name-insight-details group rounded-2xl border p-4" data-testid="name-insight-review-guidance">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold">
                <span className="flex flex-wrap items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-[var(--ni-eyebrow)] shrink-0" aria-hidden="true" />
                  <span>{intel.sectionTitles.s06}</span>
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
              </summary>

              <div className="mt-3 space-y-3 text-xs">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {report.recommendations.strengths.length > 0 && (
                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 p-3 space-y-1.5">
                      <p className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{intel.labels.strengths}</span>
                      </p>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {report.recommendations.strengths.map((s, idx) => (
                          <li key={idx}>✓ {s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {report.recommendations.weaknesses.length > 0 && (
                    <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 p-3 space-y-1.5">
                      <p className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{intel.labels.weaknesses}</span>
                      </p>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {report.recommendations.weaknesses.map((w, idx) => (
                          <li key={idx}>• {w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Actionable Improvement Paths & Variation Rationales */}
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-2">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{intel.labels.improvements}</p>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {report.recommendations.improvementSuggestions.map((s, idx) => (
                      <li key={idx}>→ {s}</li>
                    ))}
                  </ul>
                  {report.recommendations.recommendedVariations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 space-y-1">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {intel.labels.recommendedVariations}
                      </p>
                      {report.recommendations.recommendedVariations.map((rv) => (
                        <p key={rv.variant} className="text-slate-700 dark:text-slate-300">
                          <code className="font-mono font-bold">{rv.variant}</code> — {rv.rationale}
                        </p>
                      ))}
                    </div>
                  )}
                  {report.recommendations.potentialConfusions.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 space-y-1">
                      <p className="font-bold text-amber-800 dark:text-amber-300">
                        {intel.labels.potentialConfusions}
                      </p>
                      {report.recommendations.potentialConfusions.map((pc, idx) => (
                        <p key={idx} className="text-slate-700 dark:text-slate-300">• {pc}</p>
                      ))}
                    </div>
                  )}
                  {report.recommendations.usageRecommendations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 space-y-1">
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {intel.labels.usageRecommendations}
                      </p>
                      {report.recommendations.usageRecommendations.map((ur, idx) => (
                        <p key={idx} className="text-slate-700 dark:text-slate-300">• {ur}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Verification Checklist */}
                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-2">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    {intel.labels.verificationChecklist}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {report.recommendations.checklist.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-2 rounded-lg border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/70 px-2.5 py-1.5"
                      >
                        <span className="text-slate-700 dark:text-slate-300">
                          {intel.labels.checklistItems[item.labelKey]}
                        </span>
                        <span
                          className={`shrink-0 font-bold ${
                            item.completed
                              ? 'text-emerald-700 dark:text-emerald-300'
                              : 'text-amber-700 dark:text-amber-300'
                          }`}
                        >
                          {item.completed ? intel.labels.completedBadge : intel.labels.pendingBadge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 space-y-1.5">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{labels.chooseTip}</p>
                  <p className="leading-5 text-slate-700 dark:text-slate-300">
                    {REVIEW_GUIDANCE[canonicalLang] ?? REVIEW_GUIDANCE.en}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/60 dark:bg-slate-900/50 p-3 flex items-start gap-2 text-slate-600 dark:text-slate-400">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-cyan-400" aria-hidden="true" />
                  <div>
                    <strong className="block font-bold text-slate-800 dark:text-slate-200">
                      {analysisLabels.fields.legalHeading}
                    </strong>
                    <span>{LEGAL_NOTICE[canonicalLang] || LEGAL_NOTICE.en}</span>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Sticky Interactive Actions Footer */}
          <footer className="name-analysis-footer sticky bottom-0 z-10 flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                aria-pressed={isSaved}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                  isSaved
                    ? 'bg-[var(--nf-primary-soft)] text-[var(--nf-accent-ink)] border-[var(--nf-primary)]'
                    : 'nf-btn-secondary'
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? labels.saved : labels.save}</span>
              </button>

              <button
                type="button"
                onClick={handleLike}
                aria-pressed={isLiked}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition cursor-pointer ${
                  isLiked
                    ? 'bg-[var(--nf-danger-bg)] text-[var(--nf-danger)] border-[var(--nf-danger-border)]'
                    : 'nf-btn-secondary'
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? labels.liked : labels.like}</span>
              </button>

              {onOpenNote && (
                <button
                  type="button"
                  onClick={() => onOpenNote(activeItem.name, activeItem.generatorId, activeItem.style)}
                  className="nf-btn-secondary inline-flex items-center gap-1.5 px-3 py-2 text-xs cursor-pointer"
                >
                  <FileText className="h-3.5 w-3.5 text-[var(--nf-accent-ink)]" />
                  <span>{hasNote ? analysisLabels.fields.editNote : analysisLabels.fields.addNote}</span>
                </button>
              )}

              <button
                type="button"
                onClick={openInStyleStudio}
                className="nf-btn-secondary inline-flex items-center gap-1.5 px-3 py-2 text-xs cursor-pointer"
                title={labels.style}
              >
                <Wand2 className="h-3.5 w-3.5 text-[var(--nf-primary)]" />
                <span className="hidden sm:inline">{analysisLabels.fields.openStyleStudio}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void handleCopyFullSummary()}
                className="nf-btn-secondary inline-flex items-center gap-1.5 px-3 py-2 text-xs cursor-pointer"
              >
                {copied === '__summary__' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied === '__summary__' ? analysisLabels.fields.summaryCopied : analysisLabels.fields.copyFullSummary}</span>
              </button>

              <button
                type="button"
                onClick={() => void copyText(activeItem.name, activeItem.name)}
                className="name-insight-primary-action inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold transition cursor-pointer"
              >
                {copied === activeItem.name ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied === activeItem.name ? labels.copied : labels.copy}</span>
              </button>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
};

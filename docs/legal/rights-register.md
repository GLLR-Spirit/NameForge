# NameForge — registre préliminaire des droits et de la provenance

- Date de l'audit : 2026-11-20
- Dépôt : https://github.com/GLLR-Spirit/NameForge
- Branche de référence auditée : `main`
- Commit de référence : `41ba34bb3ebc502ccd1b39ca9462bd98f2b8ad77`
- Statut : **préliminaire — ce document n'est ni une certification juridique ni une preuve de titularité**
- Périmètre : contenus de données, traductions, images, dépendances npm/Rust, licence globale et historique visible.

## 1. Règles de lecture

- **Vérifié dans le dépôt** : présence du fichier, contenu technique, métadonnée ou notice constatée.
- **À confirmer** : l'origine, le titulaire ou la portée juridique ne peut pas être établi à partir des seuls fichiers examinés.
- **Bloqué pour redistribution/monétisation** : ne pas considérer l'élément comme juridiquement validé tant que les pièces manquantes ne sont pas réunies.
- Une entrée dans Git, un nom de commit ou une attribution à un compte GitHub ne prouve pas à lui seul qui a créé l'œuvre ni qui détient les droits.
- Ne pas supprimer l'historique ni réécrire les auteurs/commits pour tenter de résoudre un problème de provenance.

## 2. Banques de phrases et données éditoriales

| Fichier / ensemble | Constat technique | Provenance / droits | Décision provisoire |
|---|---|---|---|
| `src/data/phraseBanks.ts` | Banque de phrases multilingues; importe les deux extensions ci-dessous; utilisée par le moteur | Licence non déclarée. Le dépôt historique `hhkskkkdjwbf-bot/NFV2` contient un fichier apparenté et l'historique montre des contributions sous un compte; identité et droits de chaque auteur non établis. Usage éventuel de Google AI Studio par le propriétaire du projet non documenté à ce jour. | **Bloqué pour validation juridique**; conserver le fichier et les preuves; inventorier les phrases et leur origine |
| `src/data/phraseBanksExpansionA.ts` | Banque additionnelle importée par `phraseBanks.ts` | Source initiale non identifiée dans les éléments examinés; pas de licence/autorisation jointe | **Bloqué pour validation juridique** |
| `src/data/phraseBanksExpansionB.ts` | Banque additionnelle importée par `phraseBanks.ts` | Source initiale non identifiée dans les éléments examinés; pas de licence/autorisation jointe | **Bloqué pour validation juridique** |
| `src/data/attestedBabyNames.ts` | Prénoms avec genre, origine, signification et variantes; le commentaire revendique des données historiquement documentées | Pas de références par entrée visibles dans le fichier examiné. L'exactitude étymologique et les sources de compilation restent à établir. | **À documenter**; ne pas présenter les étymologies comme certifiées avant vérification |
| `src/data/englishDomainPools.ts` | Pools de préfixes, suffixes, titres et catégories utilisés par les générateurs | Contenu éditorial; origine et auteurs non consignés entrée par entrée | **À confirmer**; distinguer créations originales, termes communs et emprunts |
| `src/data/businessAndCreativeCategories.ts` | Catégories, libellés, descriptions et suggestions éditoriales | Pas de registre de sources par entrée visible | **À confirmer** |
| `src/data/japaneseKatakanaReference.ts` | Paires romaji/katakana de test; le fichier précise qu'il ne s'agit pas d'un dictionnaire de prénoms attestés | Source des paires non documentée dans le fichier; qualité linguistique à vérifier séparément | **À confirmer**; conserver la limitation déclarée dans le code |
| `src/data/datasetManifest.ts` | Déclare `nameforge-editorial-phrase-banks` comme `editorial-unverified`, licence non déclarée et redistribution non vérifiée | Le manifeste reconnaît le problème, mais les banques sont importées directement dans le moteur; `runtimeEnabled: true` dans l'entrée du manifeste ne signifie pas que le contrôle d'approbation du manifeste les autorise | **Incohérence de gouvernance à corriger après analyse d'impact**; ne pas supposer que passer ce champ à false désactive les imports directs |
| `docs/corpus-preproduction/native-bank-source-register.md` | Registre documentaire de sources candidates | Décrit les conditions propres à plusieurs corpus; ne vaut pas autorisation générale d'import | Garder les sources candidates hors production tant que les conditions ne sont pas satisfaites |
| `docs/corpus-preproduction/raw/ru/names.csv` et notices associées | Snapshot russe de 1 551 lignes conservé en préproduction; source et révision amont identifiées | CC BY 4.0 selon la notice conservée; attribution en ligne exigée : « Данные: НЭН — сервис „Имена“, https://n-e-n.ru/imena/ » avec lien actif. Le registre indique que ce snapshot n'est pas connecté à un générateur public. | **Conserver séparément en préproduction**; ne pas intégrer sans préserver l'attribution et les conditions |
| `src/data/syllableEnrichment.ts` | Fichier de données linguistiques mentionné dans l'audit de langue | Sources et méthode d'élaboration à examiner | **À confirmer** |

### Contrôle d'usage runtime

Les trois banques `phraseBanks.ts`, `phraseBanksExpansionA.ts` et `phraseBanksExpansionB.ts` sont importées par le moteur. Leur entrée de manifeste n'est pas une barrière effective contre ces imports directs. Une éventuelle mise en quarantaine exige une modification du chemin d'import et des tests de non-régression; aucune modification de runtime n'est faite par ce registre.

## 3. Traductions et contenus localisés

| Fichiers / ensemble | Constat | Provenance / droits | Décision provisoire |
|---|---|---|---|
| `src/i18n/index.ts` | Dictionnaire principal de l'interface, volume important de chaînes | Traducteur, méthode et source des traductions non consignés chaîne par chaîne | **À confirmer** |
| `src/i18n/extraLanguages.ts` | Traductions pour plusieurs langues, dont zh, ru, hi, nl, pl, sv, vi, id, th, el, he, cs, ro, da, fi | Même lacune de provenance; vérifier si traduction humaine, machine, IA ou mixte | **À confirmer** |
| `src/i18n/newLanguageTranslations.ts` | Traductions uk, bn et nb | Auteur et méthode non documentés | **À confirmer** |
| `src/i18n/addedLanguages.ts` | Libellés d'interface et alias de langues | Auteur/méthode non documentés | **À confirmer** |
| `src/i18n/generatorContent.ts` | Descriptions localisées des générateurs | Copywriting multilingue sans registre de traduction/source visible | **À confirmer** |
| `src/i18n/generatorTitles.ts` | Titres et modèles de titres localisés | Source et méthode non consignées | **À confirmer** |
| `src/i18n/localizedGeneratorMeta.ts` | Textes éditoriaux, FAQ, avantages et limites localisés | Source et méthode non consignées | **À confirmer** |
| Autres modules `src/i18n/**` | D'autres modules localisés existent | Audit exhaustif fichier par fichier encore requis | **À inventorier** |

Une traduction automatique ou assistée par IA n'est pas automatiquement libre de droits ni automatiquement interdite. Il faut vérifier les conditions du service utilisé, les contributions humaines, les textes sources et les éventuels contenus tiers. Ne pas affirmer une origine IA sans preuve.

## 4. Images, logos, icônes et médias

| Fichier | Usage connu | Auteur / source / licence | Décision provisoire |
|---|---|---|---|
| `public/images/nameforge-logo.jpg` | Logo public | Non documentés dans les fichiers consultés | **À confirmer; ne pas déclarer propriété exclusive sans preuve** |
| `public/images/og-image.jpg` | Image Open Graph | Non documentés | **À confirmer** |
| `public/images/icon-32.png` | Icône | Non documentés | **À confirmer** |
| `public/images/icon-180.png` | Icône | Non documentés | **À confirmer** |
| `public/images/icon-192.png` | Icône/PWA | Non documentés | **À confirmer** |
| `public/images/icon-512.png` | Icône/PWA | Non documentés | **À confirmer** |
| `src/assets/images/nameforge-logo-128.png` | Logo importé par `src/components/Logo.tsx` | Non documentés | **À confirmer** |
| Autres images et illustrations | Le dépôt peut contenir d'autres médias | Inventaire binaire complet et métadonnées EXIF/XMP non réalisés dans cette passe | **À inventorier** |

Aucun fichier `SOURCE.md` ou `README.md` de provenance n'a été trouvé aux emplacements d'images interrogés. Cela ne prouve pas que les images sont tierces; cela signifie que leur origine n'est pas documentée à ces emplacements. Pour chaque image, conserver le fichier original, le fichier de travail, la date de création, les sources éventuelles, les licences et les preuves d'achat/autorisation. Si l'origine ne peut pas être établie, préparer un remplacement original ou dûment licencié avant usage public/commercial.

Les icônes d'interface fournies par `lucide-react` doivent être couvertes par la notice de dépendance correspondante; ne pas confondre ces icônes de bibliothèque avec les fichiers d'images de marque.

## 5. Dépendances npm

Source technique : `package-lock.json` (276 entrées de packages avec métadonnées de licence dans le lockfile examiné). Les éléments suivants ont une métadonnée de licence nécessitant une notice/validation ciblée :

| Package verrouillé | Version | Licence déclarée dans le lockfile | Portée observée | Action |
|---|---:|---|---|---|
| `axe-core` | 4.14.0 | MPL-2.0 | dépendance dev | Vérifier notice/LICENSE du package et si un artefact est redistribué |
| `caniuse-lite` | 1.0.30001826 | CC-BY-4.0 | dépendance dev | Vérifier attribution requise et si ses données sont embarquées dans les livrables distribués |
| `graceful-fs` | 4.2.12 | BlueOak-1.0.0 | dépendance dev | Conserver la notice et vérifier les conditions de cette licence |
| `lightningcss` | 1.33.0 | MPL-2.0 | dépendance dev | Vérifier notice/LICENSE et le traitement des binaires/artefacts distribués |
| `lightningcss-android-arm64` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-darwin-arm64` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-darwin-x64` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-freebsd-x64` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-linux-arm-gnueabihf` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-linux-arm64-gnu` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-linux-arm64-musl` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-linux-x64-gnu` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-linux-x64-musl` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-win32-arm64-msvc` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `lightningcss-win32-x64-msvc` | 1.33.0 | MPL-2.0 | dev, optionnelle | Même vérification |
| `type-fest` | 4.41.0 | MIT OR CC0-1.0 | dépendance dev | Vérifier le choix de licence et conserver les notices appropriées |

**Important :** ces entrées sont marquées `dev: true` dans le lockfile. Elles sont donc déclarées comme dépendances de développement, ce qui réduit généralement le risque de redistribution directe avec l'application. Cela ne dispense pas de vérifier les artefacts réellement distribués, les outils de build et les notices applicables. Les métadonnées du lockfile ne remplacent pas l'examen des fichiers LICENSE/NOTICE des versions exactes.

Le lockfile contient également des packages sous MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC et 0BSD. Il faut générer un inventaire complet et conserver les notices des versions réellement utilisées; les seules étiquettes SPDX ne constituent pas un dossier de conformité complet.

## 6. Dépendances Rust

Fichier : `rust/Cargo.toml`.

| Dépendance directe | Version déclarée | Version résolue | Licence | État |
|---|---|---|---|---|
| `unicode-normalization` | `0.1` | Non vérifiée : pas de `Cargo.lock` identifié dans les fichiers examinés | À vérifier sur la version exacte et ses dépendances | **En attente** |
| `unicode_categories` | `0.1` | Non vérifiée | À vérifier | **En attente** |
| `serde_json` | `1` | Non vérifiée | À vérifier | **En attente** |

Le manifeste du crate porte `license = "UNLICENSED"`. Ce champ ne déclare pas les licences des dépendances et ne doit pas être interprété comme une licence globale du dépôt. Avant de distribuer le crate ou un binaire, créer/valider le `Cargo.lock`, examiner les dépendances transitives et archiver les notices.

## 7. Licence globale et titularité du projet

- Aucun fichier racine `LICENSE` ni `NOTICE` n'a été identifié dans l'audit.
- `package.json` contient `"private": true` et aucun champ `license`. Cela empêche principalement la publication accidentelle du package npm; cela ne rend pas le dépôt GitHub privé et ne constitue pas une licence de copyright.
- `rust/Cargo.toml` contient `license = "UNLICENSED"`; ce réglage concerne ce crate et ne règle pas la titularité des autres éléments.
- L'absence de licence ouverte ne signifie pas que les tiers peuvent librement réutiliser le code; elle ne prouve pas non plus que le propriétaire du dépôt détient les droits sur chaque élément importé.
- Ne pas ajouter MIT, Apache-2.0, GPL ou une autre licence globale tant que la chaîne de titularité du code, des données, des traductions et des images n'est pas établie.
- Examiner les contributions et les commits du dépôt actuel et du dépôt historique; les métadonnées Git ne prouvent pas l'identité civile ni la cession de droits.

## 8. Actions prioritaires

### P0 — Avant de déclarer NameForge juridiquement prêt

1. Établir, pour chaque banque de phrases, les auteurs, sources de départ, éventuelles générations IA, conditions du service utilisé et autorisations écrites.
2. Demander/consigner au propriétaire du projet les informations dont il se souvient sur l'utilisation de Google AI Studio; ne pas inventer de provenance si les souvenirs sont incomplets.
3. Inventorier toutes les images, identifier les créations originales, les ressources achetées et les ressources tierces; remplacer celles dont les droits restent impossibles à établir.
4. Vérifier les significations/étymologies des prénoms avec des sources fiables et lier chaque entrée à une référence.
5. Vérifier les notices exactes des dépendances npm et Rust et produire un dossier de licences.
6. Vérifier les contributions et droits sur le code avant de choisir une licence globale.

### P1 — Gouvernance et réduction du risque

1. Mettre en place un registre par entrée de données : `sourceId`, `sourceRecordId`, URL, version, date d'accès, licence, attribution, transformations et statut de validation.
2. Ajouter des notices de provenance pour chaque image et chaque bloc de traduction.
3. Corriger l'incohérence entre statut éditorial non vérifié et imports runtime après avoir conçu et testé une vraie mise en quarantaine.
4. Générer une SBOM et un rapport de licences à chaque release.
5. Conserver les snapshots sources, hashes SHA-256, licences, autorisations et échanges de permission.

## 9. Décisions non prises dans cet audit

Aucune banque n'a été supprimée ou modifiée. Aucun générateur n'a été désactivé. Aucune image n'a été remplacée. Aucune licence globale n'a été ajoutée. Aucun changement n'a été apporté à `main`. Ce registre est un document de travail destiné à rendre visibles les preuves manquantes et à guider les décisions suivantes.

## 10. Limites

Cet audit est une revue technique et documentaire du contenu visible du dépôt et de ses métadonnées. Il ne prouve pas l'originalité de chaque phrase, l'identité de chaque auteur, la titularité juridique ni la conformité complète des livrables. Les conclusions définitives et les réponses à une réclamation doivent être validées par un professionnel compétent en propriété intellectuelle dans les juridictions concernées.


## 11. Traçage complémentaire des banques de phrases — dépôt historique

Un contrôle complémentaire a été effectué sur le dépôt historique `hhkskkkdjwbf-bot/NFV2`.

### Faits établis

1. Le dépôt historique contient `src/data/phraseBanks.ts`. Le fichier porte un commentaire le décrivant comme des banques de phrases « curated » et explique leur format multilingue. Cette description est une déclaration du code, pas une preuve indépendante de l'auteur ou de la licence.
2. Le fichier historique `src/data/phraseBanks.ts` a le blob Git SHA `d114d56df07efca6d05d993f75beb270672c8704` dans la version consultée.
3. Les chemins `src/data/phraseBanksExpansionA.ts` et `src/data/phraseBanksExpansionB.ts` n'ont pas été trouvés dans le dépôt historique interrogé. Cela ne prouve pas qu'ils n'ont jamais existé ailleurs ou sous un autre chemin.
4. L'historique de l'ancien dépôt expose au moins les commits suivants modifiant le fichier principal :
   - `e88c8edfe455d6cf15d3525ae923b824a73c8c67` — « Complete English videogame phrase bank ».
   - `198e19787dfc7a4a577126f8645885a9054acbaa` — « Expand localized videogame phrase banks ».
   - `46c97ba825fd95f539f17c2a617cd3d46148bf62` — « Expand localized shop name phrase banks ».
5. Les patches consultés montrent des ajouts/modifications de chaînes dans les banques videogame et shop. Les messages de commit ne documentent pas les sources des formulations, les auteurs réels de chaque phrase, ni une autorisation d'utiliser des corpus externes.
6. Le dépôt historique interrogé ne contient pas de fichier racine `LICENSE` à l'emplacement vérifié.
7. Le README historique identifie le projet et l'hébergement GitHub Pages, mais ne constitue pas une licence de réutilisation des banques de phrases.

### Ce que ces éléments ne prouvent pas

- Ils ne prouvent pas que toutes les phrases ont été écrites par le titulaire du compte GitHub.
- Ils ne prouvent pas que les phrases proviennent de Google AI Studio, d'un autre modèle IA, d'un site tiers ou d'un corpus précis.
- Ils ne prouvent pas qu'une violation de droits a eu lieu.
- Ils ne prouvent pas que les phrases sont toutes protégeables par le droit d'auteur : la protection dépend notamment de l'originalité et du droit applicable.
- Ils ne permettent pas d'attribuer une titularité juridique à une personne sur la seule base des métadonnées Git.

### Conclusion de traçage

La piste historique est partiellement établie pour le fichier principal : il existait dans le dépôt NFV2 et a été enrichi par plusieurs commits identifiables. En revanche, la provenance intellectuelle et les droits de redistribution des formulations restent **non démontrés**. Les extensions A et B ont une provenance encore moins documentée puisqu'elles n'ont pas été retrouvées sous ces chemins dans le dépôt historique.

### Mesures conservatoires recommandées

1. Conserver les trois fichiers et leurs blobs/commits sans réécrire l'historique.
2. Ne pas ajouter de licence globale qui prétendrait couvrir rétroactivement ces formulations.
3. Avant toute monétisation ou republication présentée comme corpus propriétaire, décider entre :
   - obtenir des preuves/permissions et documenter les formulations conservables ;
   - réécrire les éléments dont l'origine est incertaine avec un processus de création traçable ;
   - remplacer les données par des sources explicitement licenciées, avec attribution et respect des conditions.
4. Si le corpus est réécrit, garder un instantané de l'ancien corpus en archive privée de travail pour préserver la traçabilité, sans le redistribuer comme contenu validé.

### Informations encore nécessaires du propriétaire du projet

- Souvenirs, prompts, exports ou historiques Google AI Studio éventuellement conservés.
- Documents de travail ou fichiers locaux antérieurs à l'ajout des phrases.
- Identification des personnes ayant rédigé ou fourni les banques.
- Toute source externe utilisée comme inspiration, référence ou matière première.


## 12. Traçage de l'import dans le dépôt actuel

Le commit de migration du dépôt actuel `5272543c19b6986db3675657a077b8a5d0abccef` (« Replace legacy NameForge app with React Vite platform ») a introduit **255 fichiers** dans le dépôt actuel. Parmi les fichiers présents dans ce commit figurent :
- les trois banques `phraseBanks.ts`, `phraseBanksExpansionA.ts`, `phraseBanksExpansionB.ts` ;
- les fichiers de prénoms et le manifeste de datasets ;
- les images `public/images/*` et `src/assets/images/nameforge-logo-128.png` ;
- de nombreux modules de traduction `src/i18n/*`.

GitHub associe ce commit au compte `GLLR-Spirit` comme auteur et committer. Les métadonnées visibles ne donnent pas de nom ni d'adresse email publics et ne prouvent pas qui a créé chaque fichier avant la migration. Le commit de migration établit donc la date d'import dans le dépôt actuel, pas la création originale ni la titularité des droits.

Conséquence : pour les fichiers binaires et modules dont l'historique antérieur n'est pas présent dans le dépôt actuel, il faut retrouver les copies de travail, archives, commits d'autres dépôts, exports et preuves de création antérieurs. La migration ne doit pas être utilisée comme preuve unique de propriété.

### État de traçabilité après cette vérification

| Élément | Trace d'import actuelle | Trace antérieure retrouvée | Conclusion |
|---|---|---|---|
| `phraseBanks.ts` | Importé par le commit de migration | Fichier apparenté trouvé dans NFV2 avec plusieurs commits d'évolution | Historique partiel; droits des formulations non établis |
| `phraseBanksExpansionA.ts` | Importé par le commit de migration | Pas retrouvé dans NFV2 au même chemin | Provenance antérieure inconnue |
| `phraseBanksExpansionB.ts` | Importé par le commit de migration | Pas retrouvé dans NFV2 au même chemin | Provenance antérieure inconnue |
| Images/logo | Importés par le commit de migration | Pas d'historique de création/source vérifié dans cette passe | Origine et droits à prouver |
| Traductions | Importées par le commit de migration | Historique de traduction et auteurs non établis dans cette passe | Origine et droits à documenter |
| Prénoms/données | Importés par le commit de migration | Références par entrée non établies dans cette passe | Sources et exactitude à documenter |


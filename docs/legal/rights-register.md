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

**Précision sur le contrôle effectif :** `isDatasetEligibleForRuntime()` exige notamment `status === 'approved'`, `runtimeEnabled === true`, une licence et une attribution renseignées, une URL HTTPS, une version et des obligations documentées, ainsi qu'un statut de redistribution différent de `restricted-or-unverified`. Le manifeste marque actuellement les banques éditoriales `editorial-unverified` et `restricted-or-unverified`; elles ne satisfont donc pas ce contrôle, même si leur champ `runtimeEnabled` vaut `true`. Le test `src/tests/datasetManifest.test.ts` vérifie explicitement qu'elles ne sont pas éligibles et qu'elles ne figurent pas dans la liste des sources runtime approuvées. Cela ne neutralise toutefois pas les imports directs des fichiers de banques dans le moteur : le contrôle de manifeste et le chemin d'import runtime sont deux mécanismes distincts.

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



## 13. Compléments de vérification — inventaire exact du dépôt

Contrôle complémentaire effectué le 2026-11-20 sur l'arbre Git récursif de `main` (255 entrées, réponse non tronquée).

### 10.1 Inventaire des images versionnées

Les fichiers image présents dans les répertoires de marque examinés sont exactement :

- `public/images/nameforge-logo.jpg`
- `public/images/og-image.jpg`
- `public/images/icon-32.png`
- `public/images/icon-180.png`
- `public/images/icon-192.png`
- `public/images/icon-512.png`
- `src/assets/images/nameforge-logo-128.png`

L'arbre confirme leur présence, mais ne donne pas leur auteur, leur licence ni leur historique de création. Le contenu binaire et les métadonnées EXIF/XMP n'ont pas été inspectés dans cette passe. Il n'est donc pas possible de conclure qu'elles sont originales ou tierces. Aucune image n'a été remplacée.

### 10.2 Inventaire des modules de traduction

Les modules versionnés dans `src/i18n/` sont :

`addedFaq.ts`, `addedGeneratorContent.ts`, `addedGeneratorTitles.ts`, `addedLanguages.ts`, `addedNameTranslations.ts`, `attestedNameTranslations.ts`, `collectionModal.ts`, `compareModal.ts`, `enhancementsLabels.ts`, `extraLanguages.ts`, `generatorContent.ts`, `generatorDiscoveryLabels.ts`, `generatorTitles.ts`, `index.ts`, `languageModal.ts`, `localeRegistry.ts`, `localizedFaq.ts`, `localizedGeneratorMeta.ts`, `moduleLabels.ts`, `myNames.ts`, `nameDetails.ts`, `nameInsightLabels.ts`, `nameIntelligenceLabels.ts`, `newLanguageTranslations.ts`, `seoMetadata.ts`, `shell.ts`, `studio.ts`, `styleLabels.ts`, `unifiedAnalysisLabels.ts`.

L'inventaire confirme 29 modules. Les fichiers examinés ne contiennent pas de registre de traducteur ou de méthode suffisamment systématique. Il faut attribuer un statut par module (rédaction originale, traduction humaine, traduction machine/IA, traduction mixte, source tierce ou inconnu) et ne pas déduire ce statut du style du texte.

### 10.3 Métadonnées exactes des licences npm

Le `package-lock.json` actuellement lu est au format lockfile version 3 et contient 277 entrées de packages. Les métadonnées de licence particulières relevées sont :

| Package | Version verrouillée | Métadonnée SPDX |
|---|---:|---|
| `axe-core` | 4.14.0 | MPL-2.0 |
| `caniuse-lite` | 1.0.30001826 | CC-BY-4.0 |
| `graceful-fs` | 4.2.12 | BlueOak-1.0.0 |
| `lightningcss` | 1.33.0 | MPL-2.0 |
| `lightningcss-android-arm64` | 1.33.0 | MPL-2.0 |
| `lightningcss-darwin-arm64` | 1.33.0 | MPL-2.0 |
| `lightningcss-darwin-x64` | 1.33.0 | MPL-2.0 |
| `lightningcss-freebsd-x64` | 1.33.0 | MPL-2.0 |
| `lightningcss-linux-arm-gnueabihf` | 1.33.0 | MPL-2.0 |
| `lightningcss-linux-arm64-gnu` | 1.33.0 | MPL-2.0 |
| `lightningcss-linux-arm64-musl` | 1.33.0 | MPL-2.0 |
| `lightningcss-linux-x64-gnu` | 1.33.0 | MPL-2.0 |
| `lightningcss-linux-x64-musl` | 1.33.0 | MPL-2.0 |
| `lightningcss-win32-arm64-msvc` | 1.33.0 | MPL-2.0 |
| `lightningcss-win32-x64-msvc` | 1.33.0 | MPL-2.0 |
| `type-fest` | 4.41.0 | (MIT OR CC0-1.0) |

Ces métadonnées proviennent du lockfile; elles ne remplacent pas les textes de licence des paquets exacts. Les entrées particulières ci-dessus sont marquées `dev: true` dans le lockfile. Il faut néanmoins vérifier si les exécutables, binaires ou données de ces outils sont inclus dans les livrables distribués. Le présent contrôle ne certifie pas encore la conformité des notices.

### 10.4 Données et fichiers éditoriaux — observations complémentaires

- `attestedBabyNames.ts` (20 940 caractères au moment du contrôle) contient des prénoms, origines, significations et variantes. Les entrées visibles ne portent pas de référence source individuelle. Une révision linguistique et documentaire reste nécessaire; la présence d'un commentaire de fichier ne suffit pas à sourcer chaque étymologie.
- `englishDomainPools.ts` (78 174 caractères) contient des pools de vocabulaire et des noms propres ou semi-propres. Séparer les mots courants, créations éditoriales et éléments qui peuvent évoquer des marques ou personnes existantes.
- `businessAndCreativeCategories.ts` (35 513 caractères) contient des catégories et textes descriptifs. Les avertissements relatifs à la disponibilité des marques ne remplacent pas une recherche de disponibilité ni un avis juridique.
- `japaneseKatakanaReference.ts` précise que ses paires sont des exemples de conversion et non un dictionnaire de prénoms japonais attestés. Conserver cette limitation et faire valider la translittération par une personne compétente avant de présenter les sorties comme linguistiquement fiables.
- Les banques Expansion A et B contiennent notamment des phrases de présentation, titres de chansons fictifs, noms de groupes, opérations et boutiques. Leur forme éditoriale ne permet pas, à elle seule, de conclure qu'elles sont originales ou issues d'une source externe.

### 10.5 Correction de périmètre

Le précédent tableau décrivait 276 entrées npm. Le contrôle direct du lockfile actuellement sur `main` compte 277 entrées. Ce chiffre est la référence de ce complément. Il peut évoluer à chaque changement de dépendances; régénérer l'inventaire après toute mise à jour de `package-lock.json`.

## 14. Plan d'exécution restant

1. **Images** : obtenir les fichiers originaux et les preuves de création/achat/licence; examiner visuellement chaque fichier et ses métadonnées; remplacer seulement ceux qui restent non justifiables.
2. **Banques A/B et base** : reconstruire la provenance depuis les historiques, les fichiers de travail, exports IA et conversations/outils éventuellement conservés. Une provenance inconnue reste explicitement inconnue; ne pas fabriquer une déclaration rétroactive.
3. **Traductions** : produire un registre par module avec langue, rédacteur/relecteur, méthode, date, texte source et preuve disponible. Faire réviser les langues à risque par des locuteurs compétents.
4. **Prénoms et étymologies** : sourcer les significations et origines au niveau de chaque entrée; retirer ou reformuler les affirmations non vérifiées si une publication fiable est recherchée.
5. **npm/Rust** : générer les notices complètes à partir des versions réellement résolues et des artefacts distribués; créer et contrôler `Cargo.lock`; archiver les fichiers de licence des versions exactes.
6. **Code** : établir un inventaire des auteurs/contributions et des éventuelles parties réutilisées avant de choisir une licence pour le dépôt.
7. **Validation finale** : tests de build, tests fonctionnels, revue des attributions, comparaison du diff et vérification du site de préproduction avant toute fusion dans `main`.

Aucune modification du moteur, des données runtime, des images, des licences ou de la branche `main` n'est effectuée par cet ajout documentaire.


## 14. État des contenus encore actifs — vérification du 2026-11-20

Cette section complète le registre à partir de l'état réel de `main` au commit de référence `41ba34bb3ebc502ccd1b39ca9462bd98f2b8ad77`. Elle distingue impérativement `main` de la branche de quarantaine de la PR #6.

### 14.1 Banques de phrases : différence entre production actuelle et correctif proposé

- Dans `main`, `src/data/phraseBanks.ts` importe encore `phraseBanksExpansionA.ts` et `phraseBanksExpansionB.ts`. Le moteur utilise ces banques pour les générateurs concernés.
- La PR #6, branche `security/quarantine-unverified-phrase-banks-2026-11-20`, commit `a09fb5a256219d06d6be520b3b5d86d745a68d84`, remplace le registre runtime par une liste vide et retire les deux extensions du répertoire source actif.
- Au moment de cette vérification, la PR #6 est ouverte, en brouillon et non fusionnée. Son correctif ne doit donc pas être décrit comme déjà appliqué à `main` ou à la production.
- La réussite des tests de la branche #6 prouve le comportement testé sur cette branche, pas l'état de la branche principale.

**Décision conservatoire :** les banques restent classées « provenance et droits non établis » dans `main`. Ne pas les présenter comme des contenus dont la titularité ou l'autorisation de redistribution est démontrée. La quarantaine de la PR #6 est une mesure technique de réduction du risque, pas une preuve de propriété ni une décision juridique sur l'origine des phrases.

### 14.2 Inventaire des autres contenus actifs à documenter

| Élément actif ou intégré au produit | Ce que le dépôt permet d'établir | Ce qui manque pour établir la provenance et l'autorisation | Statut |
|---|---|---|---|
| `src/data/attestedBabyNames.ts` | Un corpus de prénoms est utilisé comme données présentées comme attestées; le fichier contient des champs de nom et d'informations linguistiques | Source primaire par entrée, référence vérifiable, licence/conditions de la source, méthode de compilation et preuve de vérification des étymologies/significations | **Non validé pour les affirmations étymologiques** |
| `src/data/englishDomainPools.ts` | Des pools lexicaux anglais sont employés par les générateurs | Liste des sources, auteurs des formulations, distinction entre mots communs, créations éditoriales et emprunts; conditions de réutilisation de toute source externe | **Provenance incomplète** |
| `src/data/businessAndCreativeCategories.ts` | Catégories, libellés et contenu éditorial sont présents dans le runtime | Auteur/rédacteur, sources de référence, statut des textes originaux ou repris et autorisations éventuelles | **Provenance incomplète** |
| `src/data/japaneseKatakanaReference.ts` | Références de conversion/écriture en katakana présentes dans le code; le projet indique que les résultats ne sont pas nécessairement des prénoms japonais attestés | Source de chaque paire, version, méthode de translittération et revue linguistique compétente; licence si corpus externe | **Source et validation linguistique à établir** |
| `src/data/syllableEnrichment.ts` | Données/règles d'enrichissement syllabique présentes dans le projet | Origine des listes, auteur, références linguistiques et conditions de réutilisation | **Provenance incomplète** |
| Modules `src/i18n/**` (29 modules recensés) | Chaînes d'interface et contenus localisés dans plusieurs langues | Statut par module/segment : rédaction originale, traduction humaine, traduction automatique/assistée, contenu tiers; auteur, langue source, date, outil/service utilisé et conditions applicables | **Méthode et contributions à documenter** |
| `public/images/*` et `src/assets/images/nameforge-logo-128.png` (7 images recensées) | Fichiers logo, Open Graph et icônes intégrés au site | Fichier source de création, auteur, date, outil, ressources incorporées, licence/achat/autorisation et preuve correspondante | **Droits non établis par le dépôt** |
| Code applicatif et contributions importées lors de la migration `5272543c19b6986db3675657a077b8a5d0abccef` | Le commit de migration a introduit 255 fichiers et est attribué au compte GitHub du dépôt | Historique de création antérieur, contributions de tiers, accords de contribution/cession si applicables, origine des fichiers importés | **Titularité globale non démontrée par le seul commit de migration** |

Aucun de ces statuts ne signifie qu'une infraction a eu lieu. Ils signifient uniquement que les éléments examinés ne suffisent pas à prouver l'origine et le droit de redistribution.

### 14.3 Registre de preuves à constituer

Pour chaque jeu de données ou bloc éditorial, enregistrer au minimum :

- identifiant stable de l'élément et chemin exact dans le dépôt;
- auteur/créateur et rôle de chaque contributeur, selon les preuves disponibles;
- source originale, URL précise et identifiant de l'enregistrement source;
- version/date d'accès et empreinte du fichier source lorsque disponible;
- licence exacte ou autorisation écrite, titulaire qui l'accorde et périmètre de l'autorisation;
- attribution et mentions obligatoires;
- transformations, traductions, corrections ou génération assistée par IA;
- outil/service utilisé et conditions applicables à la date de création, si l'IA a été utilisée;
- statut de validation, personne ayant vérifié et date de vérification.

Pour les images, joindre le fichier de travail/export d'origine, les reçus ou licences d'actifs incorporés et l'autorisation du créateur lorsqu'elle est nécessaire. Pour les traductions, consigner la langue source, la méthode et les contributions humaines. Pour les prénoms attestés, rattacher les références aux enregistrements individuels plutôt qu'à une simple page générale.

### 14.4 Informations qui ne peuvent pas être déduites automatiquement

Les fichiers et métadonnées Git consultés ne permettent pas de déterminer avec certitude :
- si un texte a été écrit personnellement, fourni par un tiers ou généré/retouché avec un outil d'IA;
- qui détient les droits sur un logo ou une image;
- si un traducteur a autorisé la redistribution de ses traductions;
- si une source de prénoms autorise la redistribution des données dérivées;
- si les contributeurs ont conclu un accord transférant ou autorisant les droits nécessaires.

Ces éléments doivent être fournis par le propriétaire du projet ou par les contributeurs concernés, avec pièces justificatives lorsque disponibles. En l'absence de preuve, conserver le statut « non vérifié » et ne pas inventer d'auteur, de licence ou d'autorisation.

### 14.5 Actions de validation prioritaires

1. Confirmer l'origine de chaque banque, fichier de traduction, corpus de prénoms, liste lexicale et image.
2. Rassembler les fichiers sources, prompts/exports ou historiques de création disponibles, sans les considérer comme preuve suffisante à eux seuls.
3. Obtenir les autorisations écrites nécessaires auprès des auteurs/titulaires ou remplacer les éléments dont les droits restent impossibles à établir.
4. Ajouter des références par enregistrement pour les données présentées comme attestées.
5. Refaire l'audit des bundles de production après intégration de la quarantaine de la PR #6.
6. Ne choisir une licence globale pour NameForge qu'après clarification des droits sur le code, les contenus, les traductions et les médias.



---

## 15. Mise à jour après fusion des PR #4, #5 et #6 — 2026-11-20

Cette section prévaut sur les passages historiques antérieurs qui décrivent les PR comme ouvertes ou la quarantaine comme non fusionnée.

### 15.1 État technique désormais constaté dans `main`

- Les PR #4 (registre des droits), #5 (migration SEO/Cloudflare) et #6 (quarantaine des banques de phrases) sont fermées et fusionnées.
- Le commit de référence actuel vérifié est `aaaf61ff42516435ddbeb493aa4e83a7d74a8c2e`.
- La PR #6 a retiré les banques éditoriales non vérifiées du chemin runtime actif et ajouté une documentation de quarantaine dans `docs/legal/quarantine/phrase-banks.md`.
- Les anciennes versions des banques demeurent dans l'historique Git. La fusion n'a pas réécrit l'historique.
- La validation GitHub Actions du commit `aaaf61f` a réussi : installation Chromium, audit npm, type-check, tests de régression, audit i18n, build, Playwright et Lighthouse.
- Le check Cloudflare consulté indique un déploiement réussi avec une URL de prévisualisation. Ce résultat ne constitue pas, à lui seul, une preuve que l'URL de production `https://nameforge-bhk.pages.dev/` sert le commit courant. La production doit être vérifiée séparément par une requête HTTP et un contrôle de contenu/empreinte.

### 15.2 Correction de statut des banques de phrases

Les paragraphes précédents qui indiquent que les banques sont encore importées dans `main`, que la PR #6 est ouverte ou que le correctif n'est pas appliqué à `main` décrivent un état historique antérieur à la fusion. Ils ne décrivent plus l'état actuel du dépôt.

La situation actuelle est la suivante : les banques concernées sont mises en quarantaine dans la branche principale et ne doivent pas être réactivées tant que leur provenance, leur auteur, leur licence ou autorisation et leurs obligations d'attribution ne sont pas documentés et vérifiés. Cette mesure technique ne prouve ni une violation ni la titularité des droits.

### 15.3 Éléments juridiques qui restent non établis

La fusion du registre et de la quarantaine ne crée aucune preuve de propriété et ne complète pas les pièces manquantes. Restent notamment à documenter :

1. Les sources, auteurs, éventuels prompts/exports IA et conditions d'utilisation applicables aux banques de phrases historiques.
2. Les sources et références par entrée pour les prénoms et affirmations étymologiques.
3. Les auteurs, sources et méthodes de rédaction/traduction des 29 modules i18n.
4. Les fichiers de travail, auteurs, ressources incorporées, licences, achats ou autorisations pour les sept images recensées et tout autre média.
5. Les sources, versions, licences et obligations des corpus lexicaux, catégories, références katakana et enrichissements syllabiques.
6. Les notices des versions exactes des dépendances npm/Rust, les artefacts réellement distribués et les notices à joindre.
7. L'historique de création et les contributions tierces au code avant de choisir une licence globale.

Aucune donnée d'auteur, licence, permission, prompt ou source ne doit être inventée pour remplir les champs manquants. En l'absence de pièce, conserver explicitement le statut « non vérifié » et ne pas présenter le contenu concerné comme propriété exclusive ou librement redistribuable.

### 15.4 Prochaine étape probante

Le propriétaire du projet et, le cas échéant, les contributeurs doivent fournir les éléments de preuve disponibles : fichiers sources datés, exports, historiques de travail, factures/licences, autorisations écrites, URL et versions des corpus, noms/coordonnées des créateurs avec leur accord, et notices des dépendances. Chaque pièce doit être rattachée à un élément précis du registre. Les éléments non justifiables devront rester exclus du runtime/publication ou être remplacés par des créations nouvelles et traçables.

Cette mise à jour est documentaire. Elle ne modifie pas les données applicatives, les images, les licences du projet ni la visibilité du dépôt.


## 16. Audit des deux archives Google AI Studio / NameForge — 2026-11-20

### 16.1 Pièces examinées

Deux archives fournies par le propriétaire du projet ont été examinées en lecture seule :

| Archive | Entrées ZIP | Éléments significatifs | SHA-256 |
|---|---:|---|---|
| `NameForge.Version.2.zip` | 92 | Snapshot React/TypeScript/Vite; README décrivant 11 générateurs spécialisés et 21 archétypes; aucun dossier `.aistudio/` ni historique Git détecté | `452bc8a52a368979984cd83071c3a1782c6bda50ba2ce77fb55515293a67ba12` |
| `nfv2.zip` | 266 | Projet plus volumineux; dossier `.aistudio/`; manifeste de transfert; patch; archive de transfert complémentaire; banques de phrases historiques et documentation de corpus | `c10a2d553808e3c573cc1ff6c4dd2795bf148f73638aa016967bbb7b28d6c768` |

L'archive complémentaire incluse dans `nfv2.zip` contient 60 entrées. Le manifeste décrit un transfert de 62 opérations de fichiers (47 modifications, 9 ajouts et 6 suppressions) à partir d'un commit de référence du dépôt historique mentionné dans ce manifeste.

### 16.2 Ce que les archives établissent

- `nfv2.zip` contient des traces matérielles d'un flux de transfert associé à Google AI Studio : répertoire `.aistudio/artifacts/brain/`, manifeste, patch unifié et archive miroir des fichiers.
- Le manifeste décrit les changements, leur ordre d'application, les contrôles et les fichiers concernés. Il constitue une trace de travail utile, mais ne prouve pas à lui seul l'auteur humain de chaque ligne ni la titularité juridique de tous les contenus.
- Le projet `nfv2.zip` contient les fichiers historiques `src/data/phraseBanks.ts`, `phraseBanksExpansionA.ts` et `phraseBanksExpansionB.ts`, ainsi que des registres de sources et de corpus. Ces éléments permettent une comparaison de contenu et de structure avec les versions ultérieures.
- Le manifeste et la documentation de `nfv2.zip` décrivent une version du projet et un dépôt historique distincts de l'état actuel de `GLLR-Spirit/NameForge`. Ils ne doivent pas être assimilés automatiquement à la version actuellement déployée.
- `NameForge.Version.2.zip` est un snapshot distinct, dont le README décrit 11 générateurs et 21 archétypes. Il ne contient pas le dossier d'artefacts Google AI Studio ni de métadonnées Git. Il ne peut donc pas être daté par son nom de fichier ni déclaré plus récent sur cette seule base.

### 16.3 Limites techniques des archives

- Aucun répertoire `.git/` n'a été trouvé dans les deux archives. Elles ne contiennent donc pas l'historique Git complet, les objets de commit ni les métadonnées d'auteur/committer qui permettraient de reconstruire toutes les contributions.
- Aucun enregistrement d'adresse e-mail n'a été trouvé dans les fichiers textuels examinés des deux ZIP. Aucune adresse e-mail de compte n'est reproduite dans ce registre.
- Aucun motif courant de clé API Google AI Studio ou de jeton GitHub n'a été détecté dans les fichiers textuels analysés. Ce contrôle par motifs ne garantit pas l'absence de tout secret encodé ou obfusqué; les clés doivent rester révoquées/privées et ne jamais être ajoutées au dépôt.
- Les noms de fichiers arbitraires ou oubliés ne constituent pas un obstacle à l'identification : le contenu, les chemins internes, les manifestes, les empreintes et les correspondances de fichiers sont des critères plus fiables.

### 16.4 Déclaration du propriétaire et attribution souhaitée

Le propriétaire déclare que les deux archives et les comptes utilisés dans le cadre de leur création lui appartiennent. Il demande que l'identité publique de contributeur du projet soit `GLLR-Spirit` uniquement et que les adresses e-mail de ses comptes ne soient pas conservées dans les documents de provenance, les rapports ou les fichiers du projet.

Cette déclaration est consignée comme une déclaration du propriétaire; les ZIP seuls ne permettent pas de vérifier l'identité civile ni la propriété des comptes historiques. Les identifiants de comptes historiques ne sont pas recopiés dans ce registre.

### 16.5 Contrôle de l'historique Git actuel

Une lecture de l'API GitHub sur la branche `main` du dépôt actuel a retourné 128 commits au total (100 sur la première page et 28 sur la deuxième). Pour les 128 commits retournés, le compte auteur lié est `GLLR-Spirit`. Les identités de committer automatisées utilisées par GitHub lors des fusions ne sont pas comptées comme des contributeurs humains distincts.

Ce résultat établit que l'historique de commits actuellement accessible sur `main` est attribué au compte auteur `GLLR-Spirit` dans les réponses GitHub consultées. Il ne prouve pas à lui seul l'origine de chaque contenu importé depuis les archives ni l'absence de contributions antérieures dans des dépôts externes.

Aucune réécriture de l'historique, aucun force-push et aucune modification de `main` n'ont été effectués pendant cet audit. Il n'est pas nécessaire de réécrire l'historique actuel pour obtenir une attribution d'auteur unique sur les 128 commits consultés : GitHub les associe déjà tous à `GLLR-Spirit`.

### 16.6 Décisions et suites

1. Conserver les deux ZIP comme pièces d'audit locales, identifiées par leurs empreintes SHA-256 ci-dessus; ne pas les publier dans le dépôt.
2. Utiliser `GLLR-Spirit` comme seule identité publique de contributeur dans les nouveaux documents du projet.
3. Ne pas recopier d'adresse e-mail de compte dans `AUTHORS`, `CONTRIBUTORS`, les registres, les prompts, les exports ou les notices.
4. Comparer les banques historiques, traductions, données de prénoms et images des archives avec l'état actuel du dépôt, sans réactiver automatiquement les fichiers mis en quarantaine.
5. Traiter les manifestes Google AI Studio comme preuves de flux de travail et de transfert, et non comme preuve automatique de titularité ou de licence.
6. Ne pas modifier l'historique Git actuel : l'attribution des 128 commits de `main` est déjà unifiée sous `GLLR-Spirit`.

Cette section ne certifie pas juridiquement la propriété de chaque contenu. Elle consigne les éléments techniques observés, la déclaration du propriétaire et les limites de vérification.


### 16.7 Comparaison structurelle entre les deux ZIP

Après retrait du seul préfixe de dossier racine de `NameForge.Version.2.zip`, la comparaison des chemins internes donne :

- 75 fichiers dans `NameForge.Version.2.zip`;
- 228 fichiers dans `nfv2.zip`;
- 71 chemins présents dans les deux archives;
- 11 fichiers identiques octet pour octet parmi ces 71 chemins;
- 60 chemins communs dont le contenu diffère.

Les 11 fichiers strictement identiques comprennent notamment des fichiers de générateurs, de styles, de tests et de configuration. Les chemins communs mais modifiés comprennent notamment des composants d'interface, des modules i18n, des générateurs et des scripts SEO.

Cette comparaison confirme une parenté technique entre les deux snapshots, mais pas leur ordre chronologique. Le nombre de fichiers, les noms des archives et les différences de contenu ne suffisent pas à dater précisément chaque snapshot. Le manifeste de transfert contenu dans `nfv2.zip` décrit une opération par rapport à un commit de référence historique, mais il ne prouve pas que `NameForge.Version.2.zip` est exactement ce commit de base.

Aucune fusion automatique des deux archives n'est justifiée. Pour toute réutilisation, comparer les fichiers individuellement avec le dépôt actuel, conserver les empreintes et examiner les différences avant intégration.


## 17. Comparaison des archives avec `main` — 2026-11-20

### 17.1 Méthode

Les fichiers des deux ZIP ont été extraits en lecture seule. Pour chaque fichier, une empreinte Git blob SHA-1 a été calculée sur les octets exacts (en-tête Git `blob <taille>\0` inclus), puis comparée à l'empreinte du blob correspondant dans l'arbre GitHub de `main` au commit `aaaf61ff42516435ddbeb493aa4e83a7d74a8c2e`. Une empreinte identique établit une identité octet par octet; une empreinte différente établit seulement que les octets diffèrent, pas que le contenu est juridiquement tiers ou original.

### 17.2 Banques de phrases historiques

Dans `nfv2.zip`, les trois fichiers historiques suivants sont présents :

- `src/data/phraseBanks.ts` — 177 745 octets;
- `src/data/phraseBanksExpansionA.ts` — 67 842 octets;
- `src/data/phraseBanksExpansionB.ts` — 59 455 octets.

Dans `main`, seul `src/data/phraseBanks.ts` existe à ce chemin; il s'agit d'un fichier de quarantaine de 972 octets, dont l'empreinte diffère de celle du fichier historique. Les deux fichiers d'expansion ne sont pas présents dans l'arbre actuel. Le fichier actif de `main` expose une liste vide de banques approuvées et retourne une liste vide de phrases; les 19 identifiants historiques sont explicitement placés en quarantaine.

Conséquence : les archives contiennent des copies historiques des banques, mais elles ne constituent pas une autorisation de les remettre en production. Le manifeste de transfert Google AI Studio ne fournit pas de provenance d'auteur ou de licence entrée par entrée pour ces banques. Elles restent non vérifiées et doivent rester hors runtime jusqu'à preuve suffisante.

### 17.3 Images et ressources graphiques

Les sept images présentes dans `nfv2.zip` correspondent toutes, octet pour octet, aux sept images de `main` :

| Fichier | Taille dans l'archive | Résultat |
|---|---:|---|
| `public/images/icon-180.png` | 36 831 octets | Identique à `main` |
| `public/images/icon-192.png` | 41 351 octets | Identique à `main` |
| `public/images/icon-32.png` | 1 783 octets | Identique à `main` |
| `public/images/icon-512.png` | 264 891 octets | Identique à `main` |
| `public/images/nameforge-logo.jpg` | 454 191 octets | Identique à `main` |
| `public/images/og-image.jpg` | 32 379 octets | Identique à `main` |
| `src/assets/images/nameforge-logo-128.png` | 44 208 octets | Identique à `main` |

Cette identité établit la continuité des fichiers entre l'archive et le dépôt actuel, mais ne prouve pas qui les a créés ni les droits sur les éléments graphiques éventuellement incorporés. Les métadonnées d'image inspectées ne fournissent pas d'auteur ou de licence exploitable.

Dans `NameForge.Version.2.zip`, `public/images/nameforge-logo.jpg` est également identique à la version de `main`. Le fichier homonyme `public/images/nameforge-logo.png` contient exactement les mêmes octets, mais ses octets sont encodés au format JPEG malgré l'extension `.png`. Cette extension trompeuse doit être corrigée si ce snapshot est réutilisé.

La même archive contient aussi `src/assets/images/82a33697-4af9-41fd-ae0a-940c4c556c06.png`, une image carrée de 1254 × 1254 pixels, absente de l'arbre actuel de `main`. Aucun auteur, source, outil ou licence n'est identifiable dans ses métadonnées intégrées. Son nom UUID n'est pas une preuve de provenance. Ne pas la réintégrer avant d'avoir retrouvé le fichier source/export et confirmé les droits sur l'image.

### 17.4 Modules de traduction et d'interface

`nfv2.zip` contient les 29 fichiers de `src/i18n/` présents dans `main`. Vingt-huit sont identiques octet par octet. Le seul fichier différent est `src/i18n/moduleLabels.ts`; l'inspection des fins de fichier montre que la copie de l'archive comporte un saut de ligne final supplémentaire. Le contenu utile des deux fichiers est par ailleurs identique selon la comparaison effectuée.

Cela établit que les modules de traduction/interface actuels sont présents dans l'archive de transfert et que leur copie correspond à celle de `main`, à l'exception de ce saut de ligne final. Cela ne démontre pas qui a rédigé ou traduit les chaînes, ni si des traductions externes ont été incorporées. Les 29 modules restent soumis à une vérification de méthode et d'éventuelles contributions de tiers.

`NameForge.Version.2.zip` contient 15 modules `src/i18n/`. Un seul, `extraLanguages.ts`, est identique à `main`; les 14 autres ont des octets différents. Ce snapshot n'inclut donc pas une copie exacte de l'ensemble des modules actuels. En l'absence d'historique Git ou d'un identifiant de commit fiable dans cette archive, il n'est pas possible de déterminer son ordre chronologique par rapport à `nfv2.zip` ou à `main`.

### 17.5 Conclusion de provenance

- **Banques :** copies historiques retrouvées; origine et droits toujours non établis; quarantaine maintenue.
- **Images :** continuité binaire des sept images de `nfv2.zip` vers `main` établie; auteur et droits non établis.
- **Image UUID de l'autre ZIP :** absente de `main`; source et droits non établis.
- **Traductions :** correspondance presque complète entre `nfv2.zip` et `main`; attribution humaine et méthode de traduction non établies.
- **Archives :** elles apportent des preuves de possession de copies et de continuité technique, pas une preuve autonome de titularité juridique.

Aucun fichier applicatif, image ou traduction n'a été modifié par cette comparaison. Aucune banque n'a été restaurée. La branche `main` n'a pas été modifiée.

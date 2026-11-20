# NameForge — fiches de provenance des contenus historiques

- Date d'établissement : 2026-11-20
- Dépôts / archives examinés : `GLLR-Spirit/NameForge`, `nfv2.zip`, `NameForge.Version.2.zip`
- Branche documentaire : `docs/legal-provenance-status-2026-11-20`
- Commit de base de la branche : `d26b7dd32335ce51aa0ed058227807b1b168f2f8`
- Statut : inventaire documentaire préliminaire; aucune certification de titularité, d'originalité ou de conformité juridique.

## 1. Méthode et niveaux de preuve

Les catégories décrivent le **type d'origine documenté**, et non une conclusion juridique :

- **Création personnelle déclarée** : le propriétaire déclare avoir créé le contenu. À défaut de brouillon daté, fichier source, historique de travail ou autre élément contemporain, cette origine reste une déclaration à corroborer.
- **Production assistée par IA documentée** : une trace identifie le service ou l'étape IA et relie cette trace au contenu exact. Un simple export présent dans un compte, un fichier généré ou un nom d'outil ne suffit pas à attribuer chaque élément à l'IA.
- **Source externe identifiée** : une source, une version et des conditions de réutilisation sont retrouvées. Il faut encore vérifier la correspondance exacte entre le contenu repris et la source.
- **Mixte** : plusieurs méthodes ou origines sont établies pour un même lot; les sous-ensembles doivent être séparés.
- **Indéterminée** : les pièces examinées ne permettent pas de choisir entre les catégories précédentes.

### Règles d'interprétation

1. La déclaration de l'utilisateur selon laquelle les archives et comptes Google AI Studio/GitHub lui appartiennent est consignée comme déclaration du propriétaire du projet; elle ne démontre pas l'auteur de chaque phrase, traduction, image ou donnée.
2. Un commit Git, un auteur de commit, un compte propriétaire ou la présence d'un fichier dans une archive prouvent une trace technique, pas la titularité du droit d'auteur.
3. Une mention « Earlier Session », « Current QA » ou similaire dans le manifeste de transfert décrit une origine de session revendiquée dans ce manifeste; ce n'est pas un journal de prompts ni une preuve d'utilisation d'un modèle pour chaque ligne.
4. Aucune provenance IA ne sera inventée en l'absence d'un export, d'un prompt, d'un historique ou d'une déclaration précise reliée au lot.
5. Aucun élément classé indéterminé ne doit être réintégré en production ou monétisé sur la seule base de cette fiche.

## 2. Banques historiques de phrases — 19 familles

### Constat commun aux 19 familles

Le ZIP `nfv2.zip` contient trois fichiers historiques : `src/data/phraseBanks.ts` (128 021 octets), `src/data/phraseBanksExpansionA.ts` (48 575 octets) et `src/data/phraseBanksExpansionB.ts` (42 584 octets). Le fichier principal importe les deux extensions. Le code décrit les entrées comme des phrases « curated » et indique qu'elles servent à des générateurs de phrases complètes. Cette description est une auto-description du code, pas une preuve indépendante de curation, d'auteur ou de licence.

Les 19 clés/familles repérées dans le fichier principal sont listées ci-dessous. Les extensions A et B reprennent des sous-ensembles de ces familles; elles ne constituent pas 16 familles supplémentaires. Les fichiers d'extension ne contiennent pas de registre par entrée qui permettrait de relier chaque phrase à son auteur, à un prompt ou à une source externe.

**Statut commun actuel :** provenance indéterminée; origine personnelle, génération IA et emprunts externes non séparés au niveau des entrées; licence/autorisation non établie; banques maintenues en quarantaine et non restaurées dans `main`.

| ID | Famille historique | Présence dans les archives | Fiche de provenance actuelle | Action requise |
|---|---|---|---|---|
| PB-01 | `slogan` | fichier principal + extension A | Indéterminée. Aucune source, attribution ou trace IA reliée aux formulations. | Comparer les entrées aux brouillons et exports; isoler les formulations communes ou sourcées. |
| PB-02 | `book` | fichier principal + extension A | Indéterminée. Les titres peuvent être originaux, générés ou inspirés d'œuvres existantes; aucun lien individuel n'est documenté. | Contrôle de similarité et examen des sources revendiquées; conserver uniquement les éléments suffisamment justifiés. |
| PB-03 | `song_title` | fichier principal + extension A | Indéterminée. Aucun registre d'auteur, de prompt ou de source par titre. | Vérifier les titres exacts et leurs éventuelles correspondances avec des œuvres publiées. |
| PB-04 | `podcast` | fichier principal + extension A | Indéterminée. Pas de preuve d'origine par entrée. | Documenter les brouillons, prompts ou sources et vérifier les noms existants. |
| PB-05 | `blog_name` | fichier principal + extension A | Indéterminée. Pas de preuve d'origine par entrée. | Même contrôle : brouillon, prompt/export ou source; vérifier les collisions de marques/noms. |
| PB-06 | `newsletter` | fichier principal + extension A | Indéterminée. Pas de preuve d'origine par entrée. | Identifier les formulations créées, assistées ou reprises; vérifier les noms existants. |
| PB-07 | `album_title` | fichier principal + extension A | Indéterminée. Pas de preuve d'origine par entrée. | Vérifier les correspondances avec des titres d'albums et documenter les créations. |
| PB-08 | `novel_series` | fichier principal + extension A | Indéterminée. Pas de preuve d'origine par entrée. | Vérifier les correspondances avec des séries publiées et documenter les créations. |
| PB-09 | `tactical_operation` | fichier principal + extension B | Indéterminée. Le lot contient des noms fictifs de type opération; aucune source ou provenance individuelle n'est consignée. | Garder hors runtime; ne pas republier les chaînes pendant l'audit; vérifier origine et pertinence produit. |
| PB-10 | `restaurant` | fichier principal uniquement | Indéterminée. Pas de source ou auteur par entrée. | Distinguer noms fictifs, noms d'établissements réels et éventuelles marques. |
| PB-11 | `coffee_shop` | fichier principal + extension B | Indéterminée. Pas de source ou auteur par entrée. | Distinguer créations fictives, établissements existants et marques. |
| PB-12 | `tavern` | fichier principal uniquement | Indéterminée. Pas de source ou auteur par entrée. | Documenter la création ou les inspirations; vérifier les noms existants. |
| PB-13 | `band_name` | fichier principal + extensions A et B | Indéterminée. Pas de source ou auteur par entrée. | Vérifier les correspondances avec des groupes réels et documenter les créations. |
| PB-14 | `videogame` | fichier principal uniquement | Indéterminée. L'historique de l'ancien dépôt contient des commits nommés « Complete English videogame phrase bank » et « Expand localized videogame phrase banks »; les messages ne révèlent ni les sources ni l'auteur réel des formulations. | Examiner chaque lot et les patches historiques; ne pas déduire l'auteur du message de commit. |
| PB-15 | `youtube` | fichier principal + extensions A et B | Indéterminée. Pas de source ou auteur par entrée. | Distinguer formulations originales, références à des chaînes existantes et marques. |
| PB-16 | `shop` | fichier principal + extensions A et B | Indéterminée. L'historique comporte un commit nommé « Expand localized shop name phrase banks »; aucune source individuelle n'est indiquée. | Examiner patches et sources; contrôler les noms de commerces/marques existants. |
| PB-17 | `guild` | fichier principal + extensions A et B | Indéterminée. Pas de source ou auteur par entrée. | Documenter les créations, prompts ou références externes. |
| PB-18 | `bakery` | fichier principal + extensions A et B | Indéterminée. Pas de source ou auteur par entrée. | Distinguer noms fictifs, commerces réels et marques. |
| PB-19 | `hotel_name` | fichier principal + extensions A et B | Indéterminée. Pas de source ou auteur par entrée. | Vérifier les établissements et marques existants; documenter les créations. |

### Traçabilité historique disponible

Le manifeste `.aistudio/artifacts/brain/.../HANDOFF-MANIFEST.md` de `nfv2.zip` identifie un transfert de code depuis `hhkskkkdjwbf-bot/NFV2`, à partir du commit `81d1d3791128a52a7da56fa0419b2ffa1a030148`, avec un patch et une archive compagnon. Il décrit des opérations de fichiers et des origines de sessions pour certains changements, mais ne contient pas de transcript de prompts Google AI Studio ni de mapping phrase → prompt → auteur → source. Les deux archives examinées ne contiennent pas de répertoire `.git/`.

L'historique ancien consulté montre des commits modifiant les banques de phrases, notamment pour les lots videogame et shop. Ces métadonnées établissent l'existence de modifications dans le dépôt historique, pas la paternité des textes ni leur licence.

## 3. Autres familles de données et contenus éditoriaux

| Famille / fichiers dans `nfv2.zip` | Constat documentaire | Origine classée | Décision provisoire |
|---|---|---|---|
| Prénoms et étymologies — `src/data/attestedBabyNames.ts` | Le code revendique des prénoms et informations d'origine/sens; pas de références par entrée visibles dans les éléments examinés. | Indéterminée; une compilation à partir de sources externes est possible mais non démontrée entrée par entrée. | Bloquer toute revendication d'étymologie vérifiée jusqu'à références primaires/spécialisées et contrôle des droits sur les compilations. |
| Pools linguistiques — `src/data/englishDomainPools.ts` | Préfixes, suffixes, titres et éléments combinatoires; aucun journal d'origine par entrée. | Indéterminée. | Séparer vocabulaire courant, créations éditoriales et emprunts; documenter le mode de constitution. |
| Catégories et contenus métier/créatifs — `src/data/businessAndCreativeCategories.ts`, `src/data/subcategories.ts`, `src/data/styles.ts` | Libellés, catégories, descriptions et suggestions. Pas de registre de source/auteur au niveau des blocs. | Indéterminée. | Comparer aux brouillons, exports IA et références externes; identifier les marques et textes tiers. |
| Références japonaises — `src/data/japaneseKatakanaReference.ts` | Le code précise qu'il s'agit de paires de référence/test et non d'un dictionnaire de prénoms attestés; la source des paires n'est pas documentée dans le fichier. | Indéterminée; source linguistique externe éventuelle non identifiée. | Retrouver la référence linguistique et faire vérifier les correspondances par une personne compétente. |
| Enrichissement syllabique — `src/data/syllableEnrichment.ts` | Données linguistiques utilisées par le moteur; sources et méthode non établies dans les éléments examinés. | Indéterminée. | Identifier les corpus/règles de départ et les transformations. |
| FAQ et contenus éditoriaux — `src/data/faqData.ts`, `src/data/nameInsightData.ts` | Contenu explicatif et descriptif; absence de provenance entrée par entrée dans l'inventaire consulté. | Indéterminée. | Identifier rédaction humaine, assistance IA et éventuelles sources documentaires. |
| Définitions de générateurs — `src/data/generators.ts`, `generatorsBatchA.ts`, `generatorsBatchB.ts`, `generatorsBatchCDE.ts`, `generatorsBatchF.ts`, `generatorsBatchG.ts`, `gamingAndSystemsGenerators.ts` | Définitions/configurations de générateurs; le manifeste de transfert attribue certains changements à des sessions, sans prompts ni preuve d'auteur pour chaque composant. | Mixte ou indéterminée; impossible de ventiler précisément avec les traces présentes. | Relier les composants aux commits/patches, puis aux brouillons ou exports; identifier les dépendances externes éventuelles. |
| Données de capacité/domaines — `src/data/domainCapacityExpansion.ts` | Données d'expansion du moteur; provenance par élément non identifiée dans cette passe. | Indéterminée. | Identifier la méthode de création et les sources éventuelles. |

## 4. Traductions et contenus localisés

Dans `nfv2.zip`, 29 modules `src/i18n/` correspondent aux modules du dépôt `main`; 28 sont identiques octet pour octet et le dernier ne diffère que par un saut de ligne final. Cette comparaison prouve une continuité technique entre les snapshots, pas l'identité du traducteur, la méthode de traduction, la qualité linguistique ou les droits sur chaque texte.

| Sous-famille | Fichiers / périmètre | Origine classée | Preuve manquante |
|---|---|---|---|
| Interface générale | `index.ts`, `shell.ts`, `languageModal.ts`, `collectionModal.ts`, `compareModal.ts`, `myNames.ts`, `nameDetails.ts`, `studio.ts`, `styleLabels.ts`, `moduleLabels.ts`, `localeRegistry.ts` | Indéterminée; humaine, IA, traduction automatique ou mixte non établie. | Langue source, traducteur, outil, prompts/export éventuels, relecteur et date. |
| Contenu générateur et SEO | `generatorContent.ts`, `generatorTitles.ts`, `localizedGeneratorMeta.ts`, `seoMetadata.ts`, `localizedFaq.ts`, `addedFaq.ts`, `addedGeneratorContent.ts`, `addedGeneratorTitles.ts`, `generatorDiscoveryLabels.ts`, `nameInsightLabels.ts`, `unifiedAnalysisLabels.ts`, `enhancementsLabels.ts` | Indéterminée; textes originaux et traductions non distingués. | Texte source/version, méthode de traduction, auteur et validation linguistique. |
| Noms, significations et familles d'origine | `addedNameTranslations.ts`, `attestedNameTranslations.ts`, `addedLanguages.ts`, `newLanguageTranslations.ts` | Indéterminée; le code indique un texte source français et des colonnes de traduction, mais ne nomme pas les traducteurs ni les outils. | Source des significations, auteur de chaque lot, méthode, relecture native et sources étymologiques. |
| Modules supplémentaires | Tous les autres modules `src/i18n/**` présents dans l'archive | Indéterminée. | Compléter l'inventaire détaillé fichier par fichier et lot par lot. |

Le README de `NameForge.Version.2.zip` revendique une licence MIT pour cette version, mais cette déclaration dans un README ne démontre pas à elle seule la titularité de tous les contenus incorporés. La présence et le contenu d'un fichier de licence distinct doivent être vérifiés avant de considérer cette mention comme une autorisation fiable pour chaque banque, traduction ou média.

## 5. Corpus externe identifié — préproduction seulement

Le dossier `docs/corpus-preproduction/` de `nfv2.zip` distingue des sources candidates pour plusieurs langues. Le registre interne indique qu'un seul snapshot a franchi le seuil documentaire de cette phase : le corpus russe NEN, conservé sous `raw/ru/`, avec `SOURCE.md`, `LICENSE-NEN.txt`, `SHA256SUMS` et un fichier CSV de 1 551 lignes. Les notices du dossier déclarent CC BY 4.0 et donnent une attribution requise.

**Classement : source externe identifiée au niveau du snapshot, à confirmer sur les notices originales et la version source.** Ce corpus n'est pas une preuve de provenance des banques historiques de phrases et ne doit pas être mélangé à celles-ci. Le registre de préproduction indique que le snapshot n'est pas connecté à un générateur public. Le conserver isolé jusqu'à vérification de l'attribution, des conditions exactes, de la qualité des données et de leur éventuelle redistribution.

Les autres sources candidates mentionnées dans le registre restent conditionnelles ou bloquées; elles ne sont pas des sources approuvées par leur seule présence dans le registre.

## 6. Images, logos et icônes

### Images communes à `nfv2.zip` et au dépôt `main`

Les sept fichiers ci-dessous sont identiques octet pour octet entre le snapshot `nfv2.zip` et le dépôt `main`. Cette identité établit une continuité de fichier, pas son créateur, sa licence ou son droit à l'exploitation commerciale.

| Fichier | Origine classée | Éléments de preuve disponibles | Action |
|---|---|---|---|
| `public/images/icon-180.png` | Indéterminée | Identité binaire avec main; pas de métadonnée d'auteur/licence exploitable relevée. | Demander fichier source, auteur, outil, date et ressources intégrées. |
| `public/images/icon-192.png` | Indéterminée | Identité binaire avec main; pas de métadonnée d'auteur/licence exploitable relevée. | Idem. |
| `public/images/icon-32.png` | Indéterminée | Identité binaire avec main; pas de métadonnée d'auteur/licence exploitable relevée. | Idem. |
| `public/images/icon-512.png` | Indéterminée | Identité binaire avec main; pas de métadonnée d'auteur/licence exploitable relevée. | Idem. |
| `public/images/nameforge-logo.jpg` | Indéterminée | Identité binaire avec main; pas de preuve de création ou de licence. | Demander source éditable, historique de création et ressources incorporées. |
| `public/images/og-image.jpg` | Indéterminée | Identité binaire avec main; pas de preuve de création ou de licence. | Demander source éditable, historique de création et ressources incorporées. |
| `src/assets/images/nameforge-logo-128.png` | Indéterminée | Identité binaire avec main; pas de preuve de création ou de licence. | Demander source éditable, historique de création et ressources incorporées. |

### Image supplémentaire dans `NameForge.Version.2.zip`

`src/assets/images/82a33697-4af9-41fd-ae0a-940c4c556c06.png` est une image PNG carrée de 1254 × 1254, absente de `main`, sans métadonnée d'auteur exploitable relevée. **Origine indéterminée** : elle pourrait être créée manuellement, générée par IA ou issue d'une ressource externe; l'image seule ne permet pas de trancher. Demander le fichier de travail, prompt/export si IA, ou URL/licence/facture si source externe. Ne pas l'ajouter au site avant validation.

Dans `NameForge.Version.2.zip`, le fichier `public/images/nameforge-logo.png` contient en réalité les mêmes octets qu'un JPEG; l'extension est trompeuse. Ce point est technique et ne renseigne pas sur la provenance.

## 7. Code, composants et dépendances

Le manifeste de transfert de `nfv2.zip` décrit un patch de 62 opérations de fichiers (47 modifications, 9 ajouts, 6 suppressions) et attribue certains changements à des sessions antérieures ou à une session de QA. Le patch est une preuve de transfert et de modification de code; il n'est pas une preuve générale de création personnelle ni une trace complète des interactions avec l'IA.

Pour les composants de code, la provenance doit être établie par fichier ou groupe cohérent : commit d'origine, contributeur, code préexistant, éventuel extrait externe, licence et modifications. Les dépendances npm/Rust relèvent d'un registre distinct de licences de logiciels; elles ne doivent pas être classées comme « contenu personnel » ou « contenu IA ».

## 8. Collecte à demander au propriétaire du projet

Pour chaque lot, recueillir sans forcer une réponse si le souvenir est incertain :

1. **Création personnelle** : confirmation que le lot a été rédigé directement; période approximative; brouillons, notes, fichiers source ou versions antérieures conservés.
2. **IA** : outil exact (Google AI Studio ou autre), période approximative, modèle si connu, prompts/export/conversation disponibles, nature de l'intervention humaine (sélection, correction, réécriture, traduction, validation).
3. **Externe** : URL, livre, corpus ou fichier source; auteur/éditeur; version/date d'accès; licence ou autorisation; attribution; transformations effectuées.
4. **Mixte** : identifier les sous-lots distincts et ne pas attribuer une origine unique à un fichier qui agrège plusieurs sources.
5. **Inconnu** : consigner « souvenir incertain / preuve indisponible » sans reconstituer artificiellement une histoire.

## 9. Décisions et état technique

- Les banques historiques de phrases restent en quarantaine et ne sont pas réintégrées.
- Aucune phrase, traduction, image, donnée ou ligne de code de production n'a été modifiée par cette fiche.
- Aucun contenu n'a été supprimé.
- Aucune licence globale ou permission de redistribution n'est présumée.
- Aucun changement n'est apporté à `main`; ce document est destiné à la branche documentaire.
- Les fiches ne seront clôturées que lorsque l'origine, le titulaire ou l'autorisation, la portée de licence et les obligations de crédit seront étayés par des pièces vérifiables.


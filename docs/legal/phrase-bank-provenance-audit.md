# NameForge — audit de provenance des 19 banques historiques

- Date : 2026-11-20
- Dépôt : `GLLR-Spirit/NameForge`
- Branche documentaire : `docs/legal-provenance-status-2026-11-20`
- Périmètre : `src/data/phraseBanks.ts`, `src/data/phraseBanksExpansionA.ts`, `src/data/phraseBanksExpansionB.ts` dans l'archive `nfv2.zip`, plus les documents de gouvernance et de transfert de cette archive.
- Statut : audit technique/documentaire préliminaire; ce document ne certifie ni titularité, ni originalité, ni conformité juridique.

## 1. Conclusion générale

Les pièces examinées permettent d'établir un élément important : le document interne `docs/I18N.md` affirme explicitement que **les traductions créées pour les ajouts du projet, dont les banques de phrases, ont été écrites par l'assistant de manière automatique et n'ont pas été relues par des locuteurs natifs**.

Cette déclaration documente une origine assistée/produite par IA pour les **versions traduites** des banques. En complément, le propriétaire du projet déclare rétrospectivement que **la plupart des phrases originales ont été générées par une IA, principalement ChatGPT**. Cette déclaration constitue un renseignement de provenance fourni par le propriétaire; elle n'est pas corroborée, dans les archives examinées, par des prompts ou exports reliant les phrases aux générations concernées. Le terme « la plupart » signifie que des exceptions sont possibles et que leur répartition par famille ou par lot reste inconnue. Cette déclaration ne permet toutefois pas d'identifier :
- le service ou modèle exact utilisé;
- les prompts, conversations ou exports qui auraient produit chaque lot;
- la langue qui aurait servi de texte source initial;
- l'origine exacte de chaque formulation de départ, notamment la répartition des exceptions à la génération IA;
- la part éventuelle de rédaction, sélection ou réécriture humaine;
- l'existence ou l'absence d'éléments repris de sources externes.

**Conclusion de classement :** les traductions sont documentées comme machine-écrites par l'assistant selon la documentation du projet. Le propriétaire déclare que la plupart des phrases originales ont été générées par une IA, principalement ChatGPT, mais les archives ne permettent pas encore de vérifier ni de ventiler cette déclaration par famille/lot. La génération IA du texte source est donc **déclarée par le propriétaire pour la majorité du corpus**, et non indépendamment démontrée pour chaque entrée. L'origine des exceptions éventuelles et la présence éventuelle de sources externes restent indéterminées. Il serait inexact de classer toutes les 19 familles sans distinction comme intégralement générées par ChatGPT.

## 2. Sources effectivement examinées

| Pièce | Constat | Ce qu'elle prouve | Ce qu'elle ne prouve pas |
|---|---|---|---|
| `src/data/phraseBanks.ts` | 19 clés de famille, chacune avec 28 codes de langue. | Structure et contenu exact du snapshot examiné. | Auteur, prompts, source des phrases, licence. |
| `src/data/phraseBanksExpansionA.ts` | 8 familles reprises avec un lot supplémentaire. | Existence de lots d'expansion pour ces familles. | Auteur, outil, date de génération ou source. |
| `src/data/phraseBanksExpansionB.ts` | 8 familles reprises avec un lot supplémentaire. | Existence de lots d'expansion pour ces familles. | Auteur, outil, date de génération ou source. |
| `docs/I18N.md` | Déclare les traductions des ajouts du projet, y compris les banques, « machine-written by the assistant » et non relues par des locuteurs natifs. | Déclaration documentaire explicite sur la méthode des traductions et l'absence de revue native. | Identité du modèle/service, prompts, auteur du texte source, droits sur les formulations. |
| `docs/PHASE3-DATA-SOURCES.md` | Classe les 19 familles existantes comme `editorial-unverified`; indique qu'aucune preuve d'auteur/contributeur ni licence explicite par entrée n'est disponible dans le dépôt. | Le projet a lui-même enregistré l'absence de preuve et de licence par entrée. | Que les phrases seraient nécessairement tierces ou nécessairement générées par IA. |
| `src/data/datasetManifest.ts` | La source `nameforge-editorial-phrase-banks` est déclarée sans licence, avec titularité/contributeurs à confirmer et redistribution non vérifiée. | Statut de gouvernance et de redistribution du dataset. | Une provenance individuelle ou une permission. |
| `.aistudio/.../HANDOFF-MANIFEST.md` | Décrit un transfert depuis le dépôt historique, un commit de base, un patch et des opérations de fichiers. | Chaîne de transfert et opérations documentées dans ce manifeste. | Un journal de prompts ou une preuve de génération IA de chaque phrase. |
| Patch de transfert et archive compagnon | Patch de modifications du projet; les occurrences de `phraseBanks` observées concernent notamment des imports/références dans le moteur et la compatibilité linguistique. | Certaines dépendances techniques du moteur envers les banques. | Une chaîne de création des formulations. |
| README et documentation des générateurs | Décrivent les banques comme « curated » et indiquent leur rôle et leur taille. | Description fonctionnelle faite par le projet. | Une curation indépendante, la qualité native ou la provenance juridique. |

Aucun transcript de prompts Google AI Studio ni export de conversation permettant de relier un prompt à une famille ou à une phrase n'a été trouvé dans le dossier `.aistudio` de l'archive examinée. Le manifeste de transfert n'est pas un tel transcript.

## 3. Inventaire technique des familles

Le comptage a été réalisé sur les chaînes de chaque fichier, en comptant les éléments séparés par le délimiteur `|` dans chaque ligne de langue. Les nombres ci-dessous sont des comptes de chaînes dans le snapshot, pas des nombres d'œuvres dont la titularité serait établie.

| ID | Famille | Fichiers concernés | Langues | Chaînes comptées dans les archives | État de provenance |
|---|---|---|---:|---:|---|
| PB-01 | `slogan` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-02 | `book` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-03 | `song_title` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-04 | `podcast` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-05 | `blog_name` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-06 | `newsletter` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-07 | `album_title` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-08 | `novel_series` | principal + expansion A | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-09 | `tactical_operation` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-10 | `restaurant` | principal | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-11 | `coffee_shop` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-12 | `tavern` | principal | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-13 | `band_name` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-14 | `videogame` | principal | 28 | 588 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-15 | `youtube` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-16 | `shop` | principal + expansion B | 28 | 588 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-17 | `guild` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-18 | `bakery` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |
| PB-19 | `hotel_name` | principal + expansion B | 28 | 560 | Texte source indéterminé; traductions déclarées machine-écrites. |

**Total compté : 10 696 chaînes sur 19 familles et 28 langues.** Ce total correspond aux chaînes présentes dans les trois fichiers d'archive; il ne représente pas 10 696 créations originales prouvées. Il ne faut pas non plus additionner les lignes d'un même fichier deux fois : le tableau compte les lots de base et d'expansion une seule fois chacun.

## 4. Fiche de provenance commune — à appliquer à chaque famille

| Dimension | Résultat documenté | Classement |
|---|---|---|
| Création personnelle du texte source | Aucun brouillon, historique de rédaction ou déclaration détaillée reliant la création aux familles n'est présent dans les pièces examinées. | **Non établi** |
| Génération IA du texte source | Le propriétaire déclare rétrospectivement que la plupart des phrases originales ont été générées par une IA, principalement ChatGPT; aucun prompt/export ne relie actuellement les entrées à ces générations. | **Déclarée pour la majorité; non vérifiée entrée par entrée** |
| Traductions | `docs/I18N.md` indique que les traductions des banques ont été machine-écrites par l'assistant. | **IA documentée au niveau de la déclaration projet** |
| Service/modèle IA | Non nommé dans la documentation consultée. | **Inconnu** |
| Intervention humaine | Sélection, correction, adaptation et validation par famille non détaillées. | **Inconnu** |
| Sources externes | Aucune source externe précise n'est reliée à une entrée dans les fichiers examinés. | **Aucune source identifiée dans ce corpus documentaire; absence non démontrée** |
| Licence et redistribution | Licence non déclarée; manifeste marqué `restricted-or-unverified`. | **Non validées — blocage de redistribution** |
| Revue linguistique | La documentation indique que les traductions n'ont pas été revues par des locuteurs natifs. | **Non effectuée selon la déclaration projet** |

## 5. Déclaration rétrospective du propriétaire

Le propriétaire du projet indique : **« Elles avaient été générées par une IA la plupart du temps, principalement ChatGPT. »** Cette déclaration porte sur les phrases originales avant traduction. Elle est consignée comme déclaration du propriétaire, et non comme preuve technique indépendante.

- Portée déclarée : la majorité des phrases originales.
- Outil le plus souvent utilisé selon le souvenir du propriétaire : ChatGPT.
- Modèle exact, dates, prompts, conversations et exports : non fournis/non établis.
- Familles et lots concernés par les éventuelles exceptions : non précisés.
- Cette déclaration ne permet pas d'exclure une éventuelle utilisation de sources externes pour certaines entrées.

## 6. Points particuliers de l'historique

- Le dépôt historique est mentionné dans le manifeste de transfert comme dépôt source de la chaîne de développement.
- Des messages de commits historiques cités dans le registre de droits existant mentionnent des expansions de banques videogame et shop. Ces intitulés montrent des opérations de développement; ils ne prouvent pas la création originale des formulations ni leurs sources.
- Les extensions A et B sont des lots supplémentaires structurés par famille. Aucun champ de ces fichiers ne relie chaque chaîne à une personne, un prompt, une URL ou une licence.
- Le mot « curated » dans un commentaire ou un README est une qualification éditoriale du projet, pas une preuve d'origine.
- La mention « machine-written by the assistant » concerne les traductions des ajouts selon `docs/I18N.md`; elle ne permet pas d'affirmer que Google AI Studio est le service qui les a produites.

## 7. Décision provisoire par famille

Les 19 familles reçoivent le même statut de droits à ce stade, mais pas parce que leur contenu serait nécessairement de même origine :

- **Texte source : génération IA déclarée par le propriétaire pour la majorité des phrases, principalement via ChatGPT; vérification et ventilation par famille/entrée encore manquantes.**
- **Versions traduites : production machine/IA déclarée dans la documentation du projet; outil exact et traçabilité par phrase manquants.**
- **Sources externes : aucune source précise identifiée dans les pièces examinées; vérification exhaustive non réalisée.**
- **Création personnelle : non démontrée par les pièces examinées.**
- **Licence : non déclarée; redistribution non validée.**
- **Production : conserver en quarantaine; ne pas restaurer, republier ou monétiser sur la base de ce seul audit.**

## 8. Informations à recueillir pour lever les incertitudes

Pour chaque famille et, si nécessaire, pour chaque lot de langue :

1. Le propriétaire reconnaît-il avoir écrit directement le texte source? Si oui, période approximative et brouillons/versions antérieures disponibles.
2. Le texte source a-t-il été produit par un assistant IA? Si oui, outil et modèle connus, période approximative, prompts ou exports disponibles.
3. Les traductions ont-elles été produites par le même outil ou par un autre outil? Une intervention humaine a-t-elle suivi?
4. Des textes, listes, livres, sites, corpus ou exemples externes ont-ils servi de point de départ? Si oui, identifier précisément la source et ses conditions.
5. Des phrases ont-elles été reprises ou adaptées d'une source tierce? Si le souvenir est incertain, consigner « inconnu ».
6. Existe-t-il des preuves de création ou de permission : fichiers source, exports, historiques, factures, licences, autorisations écrites?

Une réponse rétrospective du propriétaire doit être identifiée comme **déclaration**, séparément des preuves contemporaines. Elle peut orienter l'audit mais ne doit pas être présentée comme une preuve indépendante.

## 9. État des changements

- Ce document ajoute uniquement un résultat d'audit documentaire.
- Aucun fichier de banque, générateur, traduction ou image n'a été modifié.
- Aucune banque n'a été réintégrée dans `main`.
- Aucune licence n'a été ajoutée ou modifiée.
- La branche `main` reste inchangée.


## 10. Recherche complémentaire de conversations, exports et brouillons — 2026-11-20

Une recherche complémentaire a été effectuée dans les fichiers de conversation et la bibliothèque de fichiers accessibles, avec des requêtes portant notamment sur `phraseBanks.ts`, `phraseBanksExpansionA.ts`, `phraseBanksExpansionB.ts`, les noms des familles et les termes ChatGPT/prompt/génération.

### Résultats retrouvés

- Des captures de terminal et journaux de préparation d'intégration datés du 20 novembre 2026 montrent que les trois fichiers de banques étaient présents dans le projet importé et suivis par Git. Ces éléments corroborent l'existence et l'intégration technique des fichiers, pas la manière dont les phrases ont été créées.
- Des documents de travail NameForge retrouvés dans la bibliothèque contiennent du code de générateurs et des échanges de conception du site. Les extraits examinés ne contiennent pas de prompts de génération des 19 banques ni de correspondance entre prompts et familles.
- La recherche de contexte des conversations antérieures n'a pas fait ressortir de conversation retrouvée décrivant la génération de ces banques, ni de prompt, export ChatGPT ou brouillon relié à une famille précise.
- Les archives `nfv2.zip` et `NameForge.Version.2.zip` ont déjà été examinées dans le présent audit. Le dossier `.aistudio` de `nfv2.zip` contient un manifeste de transfert, un patch et une archive compagnon, mais pas de transcript de prompts ou d'historique de conversation.

### Limite de la recherche

Ce résultat signifie uniquement qu'aucune pièce probante n'a été retrouvée dans les éléments actuellement accessibles et indexés. Il ne démontre pas que les conversations n'existent plus ou qu'elles n'ont jamais existé. Les historiques ChatGPT non exportés ou non présents dans les fichiers accessibles ne peuvent pas être inspectés directement par cet audit.

### Tableau de traçabilité après cette recherche

| Élément recherché | Résultat | Valeur probante |
|---|---|---|
| Conversations ChatGPT précises | Non retrouvées dans les éléments accessibles | Aucune corroboration directe supplémentaire |
| Prompts associés aux 19 familles | Non retrouvés | Aucun lien prompt-famille établi |
| Exports de conversations | Aucun export pertinent retrouvé | Aucune corroboration directe supplémentaire |
| Brouillons de phrases sources | Aucun brouillon pertinent retrouvé | Aucune comparaison brouillon-corpus possible |
| Journaux Git/terminal et inventaires de fichiers | Retrouvés | Corroborent l'existence et le transfert des fichiers, pas leur auteur ni leur méthode de génération |
| Documentation I18N | Déjà identifiée | Déclaration documentaire sur la génération IA des traductions |
| Déclaration du propriétaire | Recueillie dans cette conversation | Déclare une génération IA majoritaire, principalement ChatGPT, sans ventilation par famille |

### Décision de provenance mise à jour

La déclaration du propriétaire demeure la seule indication disponible concernant l'usage de ChatGPT pour la majorité des phrases originales. La recherche complémentaire n'a pas permis de la corroborer par des conversations ou prompts contemporains. Le statut reste donc : **génération IA déclarée par le propriétaire pour la majorité du texte source; corroboration indépendante et attribution par famille non disponibles**.

Aucun contenu des banques n'a été modifié ou réintégré. Aucune modification n'a été apportée à la branche `main`.


## 11. Complément de recherche : souvenir d'utilisation de Google AI Studio et décision de réintégration — 2026-11-20

### Déclaration complémentaire du propriétaire

Dans une conversation antérieure du 20 novembre 2026, le propriétaire a indiqué avoir parfois utilisé « Google AI Studio » pour produire des phrases NameForge, puis a précisé ne plus se souvenir de son utilisation exacte pour ce projet. Il a également indiqué posséder l'archive ZIP Google AI Studio et les comptes associés.

Cette information complète la déclaration précédente sur ChatGPT : **l'origine IA pourrait être mixte (ChatGPT et, pour certains lots, Google AI Studio), mais la répartition entre outils, familles et versions reste inconnue**. Il s'agit d'un souvenir du propriétaire, pas d'une preuve technique du contenu de chaque fichier. La possession d'une archive ou d'un compte ne prouve pas que les prompts de génération des banques s'y trouvent.

### Réexamen des traces Google AI Studio

Le dossier .aistudio/artifacts/brain/... de nfv2.zip contient un manifeste de transfert, un patch unifié et une archive compagnon. L'examen du manifeste et de la structure de ce dossier ne révèle pas de transcript de conversation, de journal de prompts ni d'export de génération relié aux 19 familles. Les éléments retrouvés documentent un transfert technique du dépôt historique, pas la création du corpus.

### Sources externes et droits de réutilisation

Les documents historiques du projet recensent des ressources candidates telles qu'Open English WordNet, Wiktionary/Kaikki, Tatoeba et CMU Pronouncing Dictionary. Ils précisent que ces ressources ne sont pas importées dans le moteur comme sources approuvées et imposent une traçabilité par entrée pour tout futur import.

Aucune des pièces examinées ne relie une entrée des 19 banques à l'une de ces ressources, ni à une URL externe, un identifiant de source, une licence ou une attribution. Il est donc impossible de conclure que les banques proviennent de ces ressources; il est tout aussi impossible de certifier qu'aucune phrase n'a été reprise ou adaptée d'une source externe. La recherche n'a pas constitué une comparaison exhaustive de chaque chaîne avec le Web, des livres ou des bases sous licence.

Le manifeste src/data/datasetManifest.ts classe les banques historiques comme editorial-unverified, indique une licence non déclarée, demande de confirmer les contributeurs et la titularité, et marque la redistribution restricted-or-unverified. Dans cette structure, runtimeEnabled: true signifie uniquement que les données étaient utilisées par la version historique de l'application : ce champ n'est pas une autorisation juridique de redistribution. docs/PHASE3-DATA-SOURCES.md précise également que les banques ne doivent pas être présentées comme domaine public ou données libres, ni être relicenciées sans confirmation des droits.

### Évaluation de réutilisation

| Question | Conclusion à partir des preuves disponibles |
|---|---|
| Le propriétaire se souvient-il d'un recours à ChatGPT ? | Oui, principalement pour la majorité des phrases originales, selon sa déclaration rétrospective. |
| Le propriétaire se souvient-il d'un recours à Google AI Studio ? | Oui, parfois; il ne se souvient pas des lots ou usages exacts. |
| Peut-on attribuer une famille à un outil précis ? | Non. |
| Peut-on prouver que chaque chaîne est un résultat IA original non repris ? | Non. |
| Une source externe précise est-elle identifiée pour une entrée ? | Non dans les pièces examinées. |
| Peut-on exclure une reprise/adaptation externe ? | Non. |
| Une licence de redistribution est-elle documentée ? | Non. |
| La génération par IA suffit-elle à établir automatiquement un droit exclusif et une libre redistribution ? | Non; la provenance, les conditions du service au moment de la génération, les éventuelles contributions humaines et les ressemblances avec des contenus tiers restent à examiner. |

### Décision finale de cette passe

**Décision : NE PAS RÉINTÉGRER les 19 banques historiques dans la version publique à ce stade.**

Motifs :
1. aucune traçabilité prompt/famille/entrée n'a été retrouvée;
2. l'usage déclaré de ChatGPT et de Google AI Studio n'est pas ventilé par lot;
3. aucune source externe n'est attribuée par entrée et aucune recherche exhaustive d'antériorité n'a été réalisée;
4. aucune licence ou preuve suffisante de titularité/permission ne valide actuellement la redistribution;
5. la documentation historique du projet elle-même classe ces banques comme editorial-unverified et restricted-or-unverified.

Cette décision n'affirme pas que les banques sont illicites ou qu'elles contiennent nécessairement des contenus tiers. Elle signifie que les éléments disponibles ne permettent pas de les autoriser de manière responsable pour la republication ou la monétisation.

### Conséquences opérationnelles

- Maintenir les trois fichiers historiques en quarantaine/hors du runtime public.
- Ne pas rétablir les anciennes chaînes à partir des ZIP.
- Ne pas ajouter de licence ouverte ni revendiquer une exclusivité sur les phrases.
- Conserver les archives originales en tant que pièces de référence, sans les présenter comme preuve suffisante de titularité.
- Une réévaluation ne sera justifiée que si des exports/prompts contemporains, des brouillons ou une vérification entrée par entrée apportent de nouvelles preuves.

Aucun code applicatif, fichier de banque, traduction, image, branche main ou déploiement n'a été modifié par cette décision documentaire.


## 12. Examen de trois archives supplémentaires — 2026-11-20

Une nouvelle recherche dans la bibliothèque de fichiers a permis d'identifier et d'examiner trois archives supplémentaires qui n'étaient pas incluses dans la première passe :

| Archive | Taille compressée | SHA-256 | Contenu pertinent |
|---|---:|---|---|
| `NameForge-corrige-local.zip` | 2 910 485 octets | `e2cc9198d9cf0dec9fcaf1e048030bf9669e8f557522c028fabdb5f7bd3a9c` | Snapshot de projet sous `nameforge-audit/NameForge-main/`; contient les trois fichiers de banques et le manifeste de datasets. |
| `NameForge.Version.3(1).zip` | 2 895 273 octets | `f2d486adaa7cdd447f031f4565b970eea0f042ddce8ecd50db0a10dd2c86150f` | Snapshot de projet; contient les trois fichiers de banques et le manifeste de datasets. |
| `NameForge.Version.3.zip` | 10 476 184 octets | `4ff5390dd064b41d7e4500fb116845655e9f2713ed9d534bb82f0d5691a2413` | Archive avec dossier `.aistudio`, manifeste de transfert, patch et archive compagnon; contient aussi les trois fichiers de banques et le manifeste de datasets. |

### Comparaison des fichiers de banques

Les SHA-256 des trois fichiers de banques sont identiques dans les trois archives supplémentaires et dans `nfv2.zip` :

| Fichier | Taille en octets | SHA-256 |
|---|---:|---|
| `src/data/phraseBanks.ts` | 177 745 | `6f7ad2fdde491c78…` |
| `src/data/phraseBanksExpansionA.ts` | 67 842 | `c2c37b9b1c07916e…` |
| `src/data/phraseBanksExpansionB.ts` | 59 455 | `8aacae5ada1eeaa1…` |
| `src/data/datasetManifest.ts` | 7 116 | `2ddc2080219a45e0…` |

Cette identité binaire établit que ces archives supplémentaires ne fournissent pas une nouvelle version des banques ni une nouvelle provenance des mêmes chaînes. Elles corroborent la persistance des mêmes fichiers dans plusieurs snapshots. Elles ne prouvent pas leur auteur, leur date de création initiale ou leurs conditions de réutilisation.

### Vérification du manifeste de données

Les quatre snapshots comparés portent le même manifeste `datasetManifest.ts`. Il maintient les banques historiques sous le statut `editorial-unverified`, sans licence déclarée, avec redistribution `restricted-or-unverified`. Les ressources candidates (Open English WordNet, Wiktionary/Kaikki, Tatoeba, CMUdict, etc.) restent au statut `candidate-review`; elles ne sont pas déclarées comme sources effectivement importées pour les banques historiques.

### Traces de tests retrouvées dans la bibliothèque

Un journal de terminal archivé contient notamment les résultats suivants : `Existing banks are not cleared for redistribution`, `External candidates are not runtime-enabled` et `Current editorial banks remain flagged but are not represented as approved sources`, avec un bilan de 6/6 contrôles de provenance du manifeste. Ces sorties corroborent le fait que les contrôles du projet appliquaient le statut de non-approbation. Elles ne constituent ni une expertise juridique ni une preuve de provenance des phrases.

### Résultat de cette passe

- Trois archives supplémentaires examinées.
- Aucun prompt, transcript ou export Google AI Studio/ChatGPT relié aux banques n'a été trouvé dans ces archives.
- Les trois fichiers de banques et le manifeste sont binaires identiques aux versions déjà examinées.
- Aucun nouvel élément ne justifie de modifier la décision de quarantaine.
- **Décision maintenue : ne pas réintégrer les 19 banques dans la version publique à ce stade.**

Les archives ont été examinées en lecture seule. Aucun fichier de banque, code applicatif, branche `main` ou déploiement n'a été modifié par cette passe.

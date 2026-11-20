# NameForge — dossier de collecte des preuves de provenance

Date de création : 2026-11-20
Branche : `docs/legal-provenance-status-2026-11-20`
Statut : modèle de collecte — aucun droit n'est présumé acquis.

## Règle absolue

Ne pas compléter un champ par supposition. Une déclaration rétrospective peut consigner un souvenir, mais elle ne remplace pas une preuve contemporaine ou une autorisation du titulaire. Marquer « inconnu / preuve manquante » lorsqu'aucun justificatif n'existe.

## 1. Banques de phrases historiques

Pour chaque fichier/catégorie/lot :
- Chemin ou identifiant exact :
- Auteur(s) et rôle(s) :
- Date/période de création :
- Source de départ (URL, fichier, corpus, livre, autre) :
- Si outil IA utilisé : service, version/date approximative, prompt/export conservé, conditions applicables à la date d'utilisation :
- Contributions humaines (sélection, réécriture, traduction, validation) :
- Licence ou autorisation du titulaire :
- Attribution/obligations :
- Pièce jointe ou emplacement de preuve :
- Décision : conserver en quarantaine / réécrire / remplacer / réintégrer après validation.

## 2. Prénoms et étymologies

Pour chaque entrée :
- Identifiant/nom :
- Source primaire ou référence spécialisée :
- URL/édition/page :
- Sens et origine réellement attestés :
- Licence/conditions de réutilisation :
- Date de vérification et réviseur linguistique :
- Statut : vérifié / à corriger / non vérifié.

Ne pas reprendre une définition d'un agrégateur sans vérifier la source et les conditions de réutilisation.

## 3. Traductions et contenus i18n

Pour chacun des 29 modules :
- Chemin :
- Langue source et langue cible :
- Rédacteur/traducteur/relecteur :
- Méthode : rédaction originale / humaine / automatique / assistée par IA / mixte / inconnue :
- Outil/service et conditions applicables, si pertinents :
- Texte source et version :
- Autorisation ou contrat :
- Relecture par locuteur compétent :
- Preuve et statut.

## 4. Images, logos, icônes et médias

Pour chaque fichier :
- Chemin et empreinte SHA-256 :
- Créateur :
- Fichier source/projet éditable :
- Date et outil de création :
- Ressources incorporées (polices, photos, textures, icônes, modèles) :
- Licence, facture ou autorisation écrite :
- Restrictions commerciales/attribution :
- Preuve conservée :
- Décision : validé / remplacer / non vérifié.

## 5. Dépendances npm et Rust

Pour chaque dépendance effectivement utilisée/distribuée :
- Nom et version exacte :
- URL du dépôt officiel/version :
- Fichier LICENSE/NOTICE de la version :
- Licence SPDX vérifiée :
- Présente dans le bundle ou seulement outil de développement :
- Notice à redistribuer :
- SBOM et date de génération :
- Conclusion du contrôle.

Pour Rust, conserver le Cargo.lock résolu et analyser les dépendances transitives.

## 6. Code et contributions

Pour chaque composant non créé intégralement par le propriétaire :
- Fichier/commit d'origine :
- Auteur/contributeur :
- Source externe :
- Licence ou accord de contribution :
- Modifications effectuées :
- Preuve de permission :
- Statut.

## 7. Journal des décisions

| Date | Élément | Preuve examinée | Décision | Réviseur |
|---|---|---|---|---|
| À compléter | À compléter | À compléter | À compléter | À compléter |

## Critère de clôture

Un élément ne passe à « vérifié » que si l'origine, le titulaire ou l'autorisation, la licence/portée d'utilisation et les obligations applicables sont établis par des pièces vérifiables. Le statut technique « retiré du runtime » ou « en quarantaine » ne vaut pas validation juridique.

# NameForge — audit et durcissement local

Date : 20 novembre 2026  
Périmètre : archive `NameForge.Version.3(1).zip`, copie locale uniquement.  
Synchronisation : branche dédiée, sans modification de `main` et sans fusion automatique.

## Modifications proposées

1. **Serveur de développement local** : Vite et les scripts `dev` / `preview` écoutent désormais sur `127.0.0.1` au lieu de `0.0.0.0`. L'option `allowedHosts: true` est supprimée et `strictPort` activé.
2. **Build navigateur** : `sourcemap: false` et `minify: 'esbuild'` sont explicitement définis. Cela réduit l'exposition de détails de développement, mais ne rend pas le JavaScript livré au navigateur secret ni impossible à copier.
3. **Fichiers sensibles** : `.gitignore` exclut désormais les fichiers `.env`, clés privées, certificats, journaux et sorties de tests/build. Ce filtre ne retire pas un secret déjà suivi par Git.
4. **Installations reproductibles** : les étapes d'installation des workflows modifiés utilisent `npm ci` plutôt que `npm install`, afin de respecter `package-lock.json`.
5. **Compatibilité CI** : le workflow de qualité et les workflows de déploiement utilisent Node.js 22.19.0, requis par Lighthouse 13.5.0.
6. **Moindre privilège GitHub Actions** : les permissions Pages et OIDC sont accordées uniquement au job de déploiement. Les jobs de build et d'audit conservent un accès en lecture au contenu.

## Vérifications rapportées lors de l'audit local

- Intégrité de l'archive ZIP et analyse des chemins d'archive.
- Recherche de marqueurs de secrets connus et de fichiers de clés : aucun résultat détecté dans l'archive.
- Recherche des usages dangereux `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` et `document.write` dans les sources examinées : aucun résultat.
- Cohérence de `package.json` et `package-lock.json`.
- Chargement syntaxique des 8 workflows YAML.
- Compilation syntaxique des scripts Python.
- Tests de métadonnées du site et tests unitaires de préproduction du corpus russe.

## Vérifications qui restent à exécuter dans GitHub Actions

L'installation `npm ci` a dépassé le délai d'exécution dans l'environnement local. Les tests TypeScript complets, le build Vite, les tests Playwright et Lighthouse ne sont donc pas déclarés comme validés localement. La Pull Request doit être examinée avec les résultats CI avant toute fusion.

## Risques et décisions humaines encore nécessaires

1. **Droits sur les banques de phrases historiques** : certaines banques sont identifiées comme `editorial-unverified` dans `src/data/datasetManifest.ts`, alors que leur utilisation d'exécution est activée. Ne pas affirmer une propriété exclusive avant d'avoir clarifié les droits.
2. **Données russes CC BY 4.0** : conserver les attributions et obligations présentes dans `docs/corpus-preproduction/raw/ru/`.
3. **Licence du projet** : aucun fichier `LICENSE` global n'a été ajouté. Ne pas appliquer une licence globale avant vérification des contributions et droits des sources tierces.
4. **Code client public** : minification et absence de source maps ne protègent pas contre l'extraction du JavaScript livré au navigateur. Les secrets ne doivent jamais être intégrés au bundle public; un traitement serveur serait nécessaire pour protéger une logique confidentielle.
5. **Historique Git** : l'archive ne contient pas `.git`; cet audit ne couvre donc ni les anciens commits, ni les anciennes branches, ni les secrets précédemment commités.


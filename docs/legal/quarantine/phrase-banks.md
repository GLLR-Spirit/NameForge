# Quarantaine des banques de phrases non vérifiées

Date : 2026-11-20

Les 19 catégories de banques éditoriales historiquement intégrées à NameForge ont été désactivées du runtime et retirées du répertoire source actif, car leur auteur, leur provenance et les droits de redistribution ne sont pas suffisamment établis.

## Périmètre

- `src/data/phraseBanks.ts` : remplacé par une interface runtime vide qui ne retourne aucune phrase.
- `src/data/phraseBanksExpansionA.ts` : retiré du répertoire source actif.
- `src/data/phraseBanksExpansionB.ts` : retiré du répertoire source actif.
- Les 19 identifiants concernés sont listés dans `QUARANTINED_PHRASE_BANK_GENERATORS` dans `src/data/phraseBanks.ts`.
- Le manifeste marque désormais le corpus éditorial comme non activé en runtime.

## Effet attendu

Les générateurs qui utilisaient ces phrases doivent poursuivre leur traitement avec le pipeline procédural existant. Les tests couvrent les 234 générateurs et les 28 langues de l'interface, puis vérifient explicitement le fallback de catégories auparavant fondées sur des phrases.

## Limites importantes

- Cette modification ne constitue pas une conclusion d'infraction ou de contrefaçon.
- Elle ne prouve pas que le contenu était tiers ; elle évite son utilisation publique tant que les preuves manquent.
- La suppression des fichiers de la branche actuelle ne réécrit pas l'historique Git. Les anciennes versions restent consultables dans les commits antérieurs, forks, clones et caches éventuels.
- Aucune réécriture d'historique, suppression de dépôt ou purge de forks n'est entreprise.
- Ne restaurer aucune banque dans le runtime avant d'avoir documenté l'auteur, la source, la version, la licence ou l'autorisation écrite et les obligations applicables.

Voir le registre des droits pour la procédure de validation avant toute réintégration.

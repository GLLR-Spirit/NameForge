/**
 * Stage D capacity expansion pools for every non-phrase-bank generator whose base
 * vocabulary had < 15 prefixes or < 12 suffixes (< 150 raw combinations).
 * Merged via union-dedup in `enrichSubcategories` at module initialization.
 */
export interface DomainExpansionPool {
  prefixes: string[];
  suffixes: string[];
}

export const DOMAIN_CAPACITY_EXPANSION: Record<string, Record<string, DomainExpansionPool>> = {
  // === ANIME & JAPANESE-INSPIRED GENERATORS (strict Hepburn romaji only) ===
  anime: {
    hero: {
      prefixes: ['Kenji', 'Daiki', 'Katsuki', 'Shun', 'Kazuya', 'Tetsuya', 'Ryota', 'Haruki'],
      suffixes: ['taro', 'masa', 'kichi', 'nobu', 'haru', 'kazu'],
    },
    ninja: {
      prefixes: ['Raizo', 'Shiden', 'Hotaru', 'Kazuma', 'Kagerou', 'Genji', 'Hattori', 'Fuuma'],
      suffixes: ['maru', 'shin', 'zen', 'kage', 'garu', 'sai'],
    },
    demon: {
      prefixes: ['Rasetsu', 'Shura', 'Meizu', 'Gouki', 'Kagero', 'Doku', 'Shinigami', 'akuryou'],
      suffixes: ['zou', 'gami', 'kiba', 'shiro', 'zaki', 'rou'],
    },
    warrior: {
      prefixes: ['Musashi', 'Kojiro', 'Nobunaga', 'Tadakatsu', 'Shingen', 'Kenshiro', 'Raiden', 'Tatsuya'],
      suffixes: ['haru', 'nobu', 'masa', 'taro', 'mitsu', 'katsu'],
    },
    villain: {
      prefixes: ['Oboro', 'Kokuryu', 'Kurogane', 'Shikkoku', 'Rengoku', 'Gekido', 'Mugen', 'Jakou'],
      suffixes: ['ou', 'shuu', 'kiba', 'satsu', 'zoku', 'gami'],
    },
    royal: {
      prefixes: ['Himiko', 'Kaguya', 'Tamamo', 'Asuka', 'Sayaka', 'Chihiro', 'Mizuki', 'Tsukasa'],
      suffixes: ['hiko', 'mitsu', 'haru', 'zono', 'kage'],
    },
    magic: {
      prefixes: ['Kirari', 'Suzuran', 'Shizuku', 'Honoka', 'Kazumi', 'Kasumi', 'Ruriko', 'Nadeshiko'],
      suffixes: ['hime', 'miko', 'tsuki', 'hoshi', 'kaze'],
    },
    default: {
      prefixes: ['Kazuki', 'Takahiro', 'Shiori', 'Chika', 'Tsukiyo', 'Fubuki', 'Jiro', 'Kyoko'],
      suffixes: ['suke', 'hiko', 'maru', 'haru', 'masa', 'hiro'],
    },
  },
  anime_hero: {
    shonen: {
      prefixes: ['Kazuki', 'Daichi', 'Tatsuma', 'Shougo', 'Ryusei', 'Kouhei', 'Yuuma', 'Takeshi'],
      suffixes: ['hiro', 'masa', 'nobu', 'taro', 'kazu', 'mitsu'],
    },
  },
  anime_rival: {
    elite: {
      prefixes: ['Kazuya', 'Souji', 'Hakurou', 'Kouga', 'Genya', 'Ryuuji', 'touya', 'Seiji'],
      suffixes: ['maru', 'masa', 'kazu', 'hiro', 'ta', 'ro'],
    },
  },
  anime_school: {
    academy: {
      prefixes: ['Aoba', 'Hakuba', 'Mikazuki', 'Yukigaya', 'Hayabusa', 'Shimizu', 'Kisaragi', 'Ootori'],
      suffixes: ['Gakkou', 'Kougakuin', 'Gakusha', 'Senmon', 'Gakuin', 'Koushou', 'Bunko'],
    },
  },
  fictional_mentor: {
    sage: {
      prefixes: ['Tetsu', 'Kuro', 'Sora', 'Raiden', 'Tora', 'Kaze', 'shifu', 'Kensei'],
      suffixes: ['shiro', 'toshi', 'hiko', 'nobu', 'suke', 'rou'],
    },
  },
  clan_name: {
    lineage: {
      prefixes: ['Hoshino', 'Kurokawa', 'Tachibana', 'Hayakawa', 'Akabane', 'Minamoto', 'Tokugawa', 'Fuji'],
      suffixes: ['zawa', 'guchi', 'shima', 'kawa', 'mori', 'bayashi'],
    },
  },
  spirit_guardian: {
    totem: {
      prefixes: ['Inari', 'Aoi', 'Hotaru', 'Akane', 'Tsubaki', 'Hoshiko', 'Mizuki', 'Yamato'],
      suffixes: ['hana', 'kaze', 'tsuki', 'yama', 'mori', 'kawa'],
    },
  },

  // === GAMING, FANTASY & SCI-FI CORE ===
  gaming: {
    fps: {
      prefixes: ['Kestrel', 'Blaze', 'Drift', 'Pulse', 'Strafe', 'Viper', 'Rogue', 'Glitch'],
      suffixes: ['Strike', 'Byte', 'Pro', 'Zero', 'Snap', 'Edge'],
    },
    streamer: {
      prefixes: ['Orbit', 'Spark', 'Vortex', 'Comet', 'Nimbus', 'Kinetik', 'prism', 'Sonic'],
      suffixes: ['Stream', 'Box', 'Vibe', 'Lab', 'Quest', 'Show'],
    },
    dark: {
      prefixes: ['Obsidian', 'Ash', 'Blight', 'Cinder', 'Onyx', 'Phantom', 'Shade', 'Crypt'],
      suffixes: ['claw', 'thorn', 'mire', 'reign', 'stalker', 'born'],
    },
    fantasy: {
      prefixes: ['Thal', 'Vor', 'Cael', 'Bryn', 'Garr', 'Mor', 'Zeph', 'Lyra'],
      suffixes: ['strider', 'crest', 'ward', 'song', 'watcher', 'forge'],
    },
    cool: {
      prefixes: ['Drift', 'Krypt', 'Vector', 'Arc', 'Zen', 'flux', 'Velo', 'Apex', 'Solar'],
      suffixes: ['Shift', 'Bolt', 'Edge', 'Drift', 'Glow', 'Spark'],
    },
    default: {
      prefixes: ['Drift', 'Pixel', 'Vector', 'Volt', 'Apex', 'Zenith', 'Krypt', 'Blaze'],
      suffixes: ['Shift', 'Zone', 'Byte', 'Snap', 'Spark', 'Pulse'],
    },
  },
  kingdom: {
    royal: {
      prefixes: ['Aethel', 'Belen', 'Corin', 'Dorian', 'Isen', 'Maren', 'Sovereign', 'Vesper'],
      suffixes: ['vale', 'keep', 'crown', 'stead', 'crest', 'haven'],
    },
    northern: {
      prefixes: ['Glacier', 'Rime', 'Boreal', 'Thane', 'fjord', 'Pine', 'Tundra', 'Storm'],
      suffixes: ['watch', 'crag', 'haven', 'stead', 'gate', 'rift'],
    },
    mystic: {
      prefixes: ['Aurelia', 'Zephyr', 'Sylvan', 'Opal', 'Star', 'Solis', 'Whisper', 'Crystal'],
      suffixes: ['glade', 'haven', 'spire', 'shore', 'mist', 'gate'],
    },
    dark: {
      prefixes: ['Obsidian', 'Ashen', 'Blight', 'Cinder', 'Iron', 'Thorn', 'Wraith', 'Night'],
      suffixes: ['keep', 'rift', 'mire', 'fen', 'gate', 'crown'],
    },
    default: {
      prefixes: ['Belen', 'Corin', 'Dorian', 'Storm', 'Winter', 'Sun', 'Iron', 'Oak', 'Stone'],
      suffixes: ['stead', 'haven', 'keep', 'crest', 'gate', 'watch'],
    },
  },

  // === BUSINESS, TECH & BRANDS ===
  brand: {
    luxury: {
      prefixes: ['Solvane', 'Bellamy', 'Lumina', 'Valmont', 'Sorel', 'Verona', 'Alba', 'Serene'],
      suffixes: ['luxe', 'aura', 'vault', 'craft', 'atelier', 'maison'],
    },
    tech: {
      prefixes: ['Axion', 'Vortex', 'Cortex', 'Quanta', 'Signal', 'Prism', 'Matrix', 'Vector'],
      suffixes: ['sync', 'core', 'flow', 'hub', 'grid', 'lab'],
    },
    lifestyle: {
      prefixes: ['Solstice', 'Meadow', 'Harbor', 'Cedar', 'Linen', 'Olive', 'Briar', 'Haven'],
      suffixes: ['craft', 'co', 'goods', 'nest', 'home', 'studio'],
    },
    default: {
      prefixes: ['Vestra', 'Solis', 'Caelia', 'Noria', 'Elan', 'Brio', 'Kora', 'Luma'],
      suffixes: ['fy', 'ia', 'ly', 'va', 'ra', 'co'],
    },
  },
  business: {
    consulting: {
      prefixes: ['Merid', 'Apex', 'Nord', 'Beacon', 'Summ', 'Pinnac', 'Vect', 'Aegis'],
      suffixes: ['ent', 'advisory', 'partners', 'bridge', 'group', 'guild'],
    },
    industrial: {
      prefixes: ['Krupp', 'Bram', 'Kinet', 'Carb', 'Vulc', 'Steel', 'Forj', 'Mech'],
      suffixes: ['dyne', 'tech', 'corp', 'works', 'forge', 'sys'],
    },
    default: {
      prefixes: ['Strata', 'Cert', 'Vero', 'Clari', 'Apex', 'Lum', 'Nord', 'Praxis'],
      suffixes: ['corp', 'labs', 'group', 'hub', 'core', 'line'],
    },
  },
  product: {
    gadget: {
      prefixes: ['Volt', 'Flux', 'Lumen', 'Wave', 'Air', 'Spark', 'Edge', 'Core'],
      suffixes: ['Mini', 'Max', 'Go', 'Air', 'Sense', 'Dock'],
    },
    sport: {
      prefixes: ['Kinet', 'Peak', 'Pace', 'Dash', 'Boost', 'Terra', 'Glide', 'Surge'],
      suffixes: ['Track', 'Gear', 'Pulse', 'Fit', 'Lite', 'Force'],
    },
    default: {
      prefixes: ['Smart', 'Bright', 'Swift', 'Flex', 'Aero', 'Clean', 'Easy', 'Prime'],
      suffixes: ['Kit', 'Pod', 'Hub', 'Deck', 'Line', 'Pack'],
    },
  },
  startup: {
    ai: {
      prefixes: ['Lumen', 'Vector', 'Cortex', 'Logic', 'Tensor', 'Prism', 'Axiom', 'Pulse'],
      suffixes: ['mind', 'bot', 'ops', 'flow', 'net', 'core'],
    },
    fintech: {
      prefixes: ['Vault', 'Ledger', 'Clear', 'Swift', 'Flow', 'Safe', 'Trust', 'Apex'],
      suffixes: ['pay', 'flow', 'hub', 'bank', 'mint', 'core'],
    },
    default: {
      prefixes: ['Spark', 'Launch', 'Glide', 'Pulse', 'Shift', 'Bridge', 'Beacon', 'Sprint'],
      suffixes: ['hub', 'box', 'flow', 'pad', 'kit', 'base'],
    },
  },
  domain: {
    brandable: {
      prefixes: ['Luma', 'Kova', 'Nori', 'Riva', 'Pavo', 'Daro', 'Vira', 'Fino'],
      suffixes: ['lo', 'mo', 'no', 'ro', 'ta', 'zo'],
    },
    tech: {
      prefixes: ['Data', 'Edge', 'Mesh', 'Port', 'Gate', 'Link', 'Core', 'Wire'],
      suffixes: ['grid', 'ops', 'sync', 'port', 'core', 'dev'],
    },
    default: {
      prefixes: ['Open', 'Next', 'Meet', 'Build', 'Find', 'Make', 'Fast', 'Pure'],
      suffixes: ['Space', 'Deck', 'Path', 'Grid', 'Base', 'Box'],
    },
  },
  app: {
    productivity: {
      prefixes: ['Brief', 'Clear', 'Sort', 'Note', 'List', 'Sync', 'Grid', 'Calm'],
      suffixes: ['pad', 'desk', 'mate', 'flow', 'box', 'hub'],
    },
    social: {
      prefixes: ['Pulse', 'Spark', 'Link', 'Circle', 'Hive', 'Vibe', 'Chime', 'Camp'],
      suffixes: ['chat', 'talk', 'hub', 'loop', 'spot', 'club'],
    },
    default: {
      prefixes: ['Dash', 'Clip', 'Ping', 'Note', 'Drop', 'Scan', 'Link', 'Loop'],
      suffixes: ['kit', 'pad', 'hub', 'flow', 'bit', 'pro'],
    },
  },
  feature: {
    smart: {
      prefixes: ['Bright', 'Adaptive', 'Fluid', 'Swift', 'Opti', 'Clear', 'Deep', 'Live'],
      suffixes: ['Assist', 'View', 'Flow', 'Track', 'Guide', 'Boost'],
    },
    security: {
      prefixes: ['Guard', 'Cipher', 'Aegis', 'Trust', 'Sentry', 'Fort', 'Anchor', 'Proof'],
      suffixes: ['Check', 'Watch', 'Safe', 'Zone', 'Guard', 'Sign'],
    },
    default: {
      prefixes: ['Instant', 'Direct', 'Rapid', 'Clean', 'Smart', 'Smooth', 'Focus', 'Pro'],
      suffixes: ['View', 'Sync', 'Pack', 'Tool', 'Link', 'Shift'],
    },
  },
  service: {
    premium: {
      prefixes: ['Summit', 'Vanguard', 'Beacon', 'Sterling', 'Horizon', 'Meridian', 'Crest', 'Atlas', 'Northstar'],
      suffixes: ['Advisory', 'Partners', 'Group', 'Desk', 'Guild', 'Council'],
    },
    audit: {
      prefixes: ['Metric', 'Signal', 'Audit', 'Verify', 'Benchmark', 'Trace', 'Radar', 'Insight'],
      suffixes: ['Lab', 'Pulse', 'Report', 'Index', 'Scan', 'Watch'],
    },
    default: {
      prefixes: ['Agile', 'Bright', 'Clear', 'Direct', 'Prime', 'Swift', 'Ready', 'Trust'],
      suffixes: ['Assist', 'Support', 'Guide', 'Hub', 'Flow', 'Team'],
    },
  },
  character: {
    protagonist: {
      prefixes: ['Gaspard', 'Baptiste', 'Camille', 'Claire', 'Hector', 'Damien', 'Estelle', 'Victor'],
      suffixes: ['Valmont', 'Delacroix', 'Mercier', 'Rochefort', 'Chevalier', 'Bellerose'],
    },
    antagonist: {
      prefixes: ['Lazare', 'Cyprien', 'Maximilien', 'Hector', 'Balthazar', 'Alphonse', 'Lucian', 'Dorian', 'Soren'],
      suffixes: ['de Noirval', 'Malkov', 'de Valombre', 'Ravel', 'de Montclair', 'Kestrel'],
    },
    default: {
      prefixes: ['Claire', 'Lucie', 'Gabriel', 'Julien', 'Sébastien', 'Margot', 'Noé', 'Adrien'],
      suffixes: ['Laurent', 'Girard', 'Bouchard', 'Chevalier', 'Vasseur', 'Renard'],
    },
  },
  handle: {
    cyber: {
      prefixes: ['Volt', 'Hex', 'Null', 'Signal', 'Krypt', 'Pixel', 'Flux', 'Pulse'],
      suffixes: ['node', 'link', 'sync', 'drift', 'core', 'wave'],
    },
    aesthetic: {
      prefixes: ['Brume', 'Aurore', 'Plume', 'Nacre', 'Ambre', 'Mousse', 'Soie', 'Perle'],
      suffixes: ['flocon', 'perle', 'rosée', 'corail', 'velours', 'éclat'],
    },
    default: {
      prefixes: ['Baron', 'Major', 'Marshal', 'Knight', 'Pilot', 'Ranger', 'Scout', 'Master'],
      suffixes: ['Lynx', 'Falcon', 'Raven', 'Badger', 'Stag', 'Crane'],
    },
  },
  community: {
    hub: {
      prefixes: ['Le Cercle des', 'La Guilde des', 'Le Port des', 'La Maison des', 'Le Forum des', 'La Place des', 'Le Phare des', 'Le Salon des', 'L’Agora des', 'L’Élan des'],
      suffixes: ['Artisans', 'Esprits', 'Voyageurs', 'Auteurs', 'Curieux', 'Artistes', 'Explorateurs'],
    },
    default: {
      prefixes: ['Cercle', 'Atelier', 'Forum', 'Réseau', 'Collectif', 'Foyer', 'Agora', 'Phare'],
      suffixes: ['Ouvert', 'Vivant', 'Créatif', 'Libres', 'Avenir', 'Savoir', 'Unie'],
    },
  },
  placename: {
    coastal: {
      prefixes: ['Anse-', 'Crique-', 'Havre-', 'Rade-', 'Plage-', 'Phare-', 'Rocher-', 'Môle-'],
      suffixes: ['des-Sables', 'du-Large', 'aux-Coraux', 'du-Phare', 'des-Goélands', 'de-Nacre'],
    },
    mountain: {
      prefixes: ['Crête-', 'Roche-', 'Puy-', 'Aiguille-', 'Sommet-', 'Gorge-', 'Neige-', 'Cime-'],
      suffixes: ['des-Neiges', 'du-Vent', 'de-Granit', 'des-Cimes', 'd’Argent', 'du-Givre'],
    },
    default: {
      prefixes: ['Val-', 'Pont-', 'Bourg-', 'Ville-', 'Champ-', 'Clair-', 'Beau-', 'Haute-'],
      suffixes: ['fleuve', 'clair', 'pierre', 'terre', 'pré', 'source'],
    },
  },
  planet: {
    terrestrial: {
      prefixes: ['Astra', 'Helios', 'Lyra', 'Ceres', 'Pallas', 'Thule', 'Avalon', 'Gaia'],
      suffixes: ['Secundus', 'Minor', 'Beta', 'Alpha', 'Outpost', 'Haven'],
    },
    gas: {
      prefixes: ['Kronos', 'Aether', 'Tempest', 'Boreas', 'Zephyr', 'Typhon', 'Hyperion', 'Atlas'],
      suffixes: ['Storm', 'Vortex', 'Ring', 'Titan', 'Nebula', 'Mass'],
    },
    default: {
      prefixes: ['Procyon', 'Canopus', 'Arcturus', 'Antares', 'Aldebaran', 'Pollux', 'Deneb', 'Spica'],
      suffixes: ['IV', 'V', 'Major', 'Minor', 'Alpha', 'Orbital'],
    },
  },
  project: {
    secret: {
      prefixes: ['Directives', 'Code', 'Programme', 'Mission', 'Sceau', 'Plan', 'Dossier', 'Secteur', 'Vektor'],
      suffixes: ['Zénith', 'Boréal', 'Solstice', 'Horizon', 'Mercure', 'Argos'],
    },
    default: {
      prefixes: ['Atlas', 'Étoile', 'Vague', 'Impulsion', 'Source', 'Piste', 'Aurore', 'Trajet'],
      suffixes: ['Vision', 'Connect', 'Impact', 'Direct', 'Future', 'Cloud'],
    },
  },
  framework: {
    method: {
      prefixes: ['Le Système', 'Le Principe', 'Le Protocole', 'La Boussole', 'Le Schéma', 'Le Modèle', 'Le Parcours', 'La Grille', 'La Carte'],
      suffixes: ['Vitesse', 'Équilibre', 'Rigueur', 'Action', 'Rythme', 'Cap'],
    },
    default: {
      prefixes: ['NEXUS', 'PULSE', 'PRISM', 'VERTEX', 'BRIDGE', 'SIGNAL', 'VECTOR', 'NORTH'],
      suffixes: ['Framework', 'Guide', 'Engine', 'Model', 'Standard', 'Playbook'],
    },
  },
  event: {
    summit: {
      prefixes: ['Open', 'Next', 'Global', 'Alpine', 'Nordic', 'Spark', 'Summit', 'Horizon'],
      suffixes: ['Forum', 'Week', 'Expo', 'Live', 'Connect', 'Stage'],
    },
    festival: {
      prefixes: ['Échos de', 'Matins de', 'Jours de', 'Ciel de', 'Rêves de', 'Fleurs de', 'Saison des', 'Vents des', 'Chants de'],
      suffixes: ['Étoiles', 'Lune', 'Aurore', 'Brume', 'Soleil', 'Flots'],
    },
    default: {
      prefixes: ['La Nuit de', 'Les Journées de', 'Le Festival de', 'L’Atelier de', 'La Scène de', 'Les Voix de', 'La Place de', 'Les Chemins de', 'Le Cercle de', 'L’Élan de'],
      suffixes: ['la Science', 'la Musique', 'l’Image', 'l’Innovation', 'la Culture', 'Demain'],
    },
  },
  ai_bot: {
    assistant: {
      prefixes: ['Cora', 'Juno', 'Vela', 'Nora', 'Taro', 'Vera', 'Rory', 'Sami'],
      suffixes: ['Spark', 'Mind', 'Help', 'Desk', 'Core', 'Flow'],
    },
    autonomous: {
      prefixes: ['Beacon', 'Vertex', 'Cipher', 'Nexus', 'Helix', 'Stratos', 'Anchor', 'Pulse'],
      suffixes: ['Guard', 'Matrix', 'Link', 'Ops', 'Node', 'Sync'],
    },
    default: {
      prefixes: ['Data', 'Logic', 'Task', 'Fast', 'Deep', 'Smart', 'Link', 'Flow'],
      suffixes: ['Helper', 'Mate', 'Pilot', 'Engine', 'Core', 'Sync'],
    },
  },
  culinary: {
    gourmet: {
      prefixes: ['Velouté de', 'Terrine de', 'Millefeuille de', 'Parfum de', 'Écume de', 'Tartelette de', 'Consommé de', 'Sablé aux', 'Délice de'],
      suffixes: ['Morilles des Bois', 'Noisettes Grillées', 'Fleur de Sel', 'Safran Doré', 'Asperges Vertes', 'Agrumes Confits'],
    },
    cocktail: {
      prefixes: ['Souffle de', 'Rosée de', 'Éclat de', 'Voile de', 'Philtre de', 'Infusion de', 'Frisson de', 'Sillage de', 'Mirage de'],
      suffixes: ['Givre', 'Clair de Lune', 'Cacao Noir', 'Agrumes', 'Menthe Douce', 'Gingembre'],
    },
    default: {
      prefixes: ['La Poêlée du', 'La Table du', 'Le Potage du', 'La Galette du', 'Le Rôti du', 'La Tarte du', 'Le Chaudron du', 'L’Assiette du'],
      suffixes: ['Meunier', 'Pêcheur', 'Vigneron', 'Voyageur', 'Montagnard', 'Jardinier'],
    },
  },
  gamertag: {
    stealth: {
      prefixes: ['Frost', 'Ash', 'Dusk', 'Shade', 'Mist', 'Veil', 'Cipher', 'Raven'],
      suffixes: ['blade', 'fang', 'step', 'wing', 'watcher', 'ghost'],
    },
    cyber: {
      prefixes: ['Neon', 'Grid', 'Spark', 'Logic', 'Synth', 'Proxy', 'Node', 'Hex'],
      suffixes: ['grid', 'net', 'mesh', 'pulse', 'sync', 'hack'],
    },
  },
  boss: {
    void_lord: {
      prefixes: ['Xul', 'Nok', 'Vor', 'Kael', 'Zhor'],
      suffixes: ['mord', 'khor', 'thar'],
    },
    ancient_titan: {
      prefixes: ['Brak', 'Gorm', 'Skar', 'Thrym', 'Vul', 'Khar'],
      suffixes: ['gron', 'morn', 'dread', 'crag'],
    },
  },
  weapon: {
    blade: {
      prefixes: ['Foudre', 'Givre', 'Aurore', 'Flamme', 'Ombre', 'Soleil', 'Acier', 'Tempête'],
      suffixes: ['garde', 'dent', 'éclat', 'aile', 'cœur', 'griffe'],
    },
    artifact: {
      prefixes: ['Stella', 'Chrono', 'Ignis', 'Umbra', 'Cael', 'Nox', 'Vesper', 'Orbis'],
      suffixes: ['lame', 'lance', 'anneau', 'couronne', 'talisman', 'diadème'],
    },
  },
  spell: {
    arcane: {
      prefixes: ['Astral', 'Lumen', 'Runo', 'Prism', 'Nébula', 'Vortex', 'Sigil', 'Solv'],
      suffixes: ['aura', 'sceau', 'lance', 'prisme', 'voile', 'élan'],
    },
    elemental: {
      prefixes: ['Gale', 'Magma', 'Zéphyr', 'Solaire', 'Éclair', 'Givre', 'Onde', 'Brume'],
      suffixes: ['furie', 'déluge', 'torrents', 'étincelle', 'lame', 'cratère'],
    },
  },
  tavern: {
    cozy_inn: {
      prefixes: ['Le Vieux', 'Le Joyeux', 'Le Chaud', 'Le Doux', 'Le Noble', 'Le Bon', 'Le Grand', 'Le Petit'],
      suffixes: ['Foyer', 'Chaudron', 'Tonneau', 'Pèlerin', 'Moulin', 'Chêne', 'Pain', 'Miel'],
    },
    smuggler: {
      prefixes: ['Le Sombre', 'Le Furtif', 'Le Noir', 'Le Pâle', 'Le Vieux', 'Le Mauvais', 'Le Sourd', 'Le Gris'],
      suffixes: ['Compas', 'Écueil', 'Mât', 'Récif', 'Sabre', 'Gouvernail', 'Cap'],
    },
  },
  dungeon: {
    catacomb: {
      prefixes: ['Nécropole', 'Sépulcre', 'Caveau', 'Hypogée', 'Sanctuaire', 'Catacombes', 'Souterrain', 'Charnier'],
      suffixes: ['du Silence', 'd’Ossements', 'des Oubliés', 'de Pierre', 'de Poussière', 'du Crépuscule'],
    },
    abyss: {
      prefixes: ['Fosse', 'Gorge', 'Crevasse', 'Rift', 'Caverne', 'Tanière', 'Puits', 'Antre'],
      suffixes: ['des Ténèbres', 'de Basalte', 'des Profondeurs', 'de Fumée', 'de Cristal Noir', 'des Échos'],
    },
  },
  starship: {
    warship: {
      prefixes: ['Aegis', 'Titan', 'Sovereign', 'Valiant', 'Bastion', 'Orion', 'Sentinel', 'Helios'],
      suffixes: ['Ascendant', 'Resolute', 'Dauntless', 'Sovereign', 'Eclipse', 'Vigilant'],
    },
    explorer: {
      prefixes: ['Discovery', 'Horizon', 'Pathfinder', 'Astrolabe', 'Polaris', 'Mariner', 'Venture', 'Surveyor'],
      suffixes: ['Dawn', 'Meridian', 'Quest', 'Aurora', 'Deep', 'Drift'],
    },
  },
  mecha: {
    heavy: {
      prefixes: ['Colossus', 'Bastion', 'Juggernaut', 'Centurion', 'Paladin', 'Hammer', 'Anvil', 'Atlas'],
      suffixes: ['MK-VII', 'Heavy', 'Core', 'Fortress', 'Guard', 'Alpha'],
    },
    striker: {
      prefixes: ['Mirage', 'Kestrel', 'Valkyrie', 'Tempest', 'Comet', 'Horizon', 'Talon', 'Vector'],
      suffixes: ['Dash', 'Wing', 'Edge', 'Blade', 'Pulse', 'Shift'],
    },
  },
  cyberpunk: {
    netrunner: {
      prefixes: ['Signal', 'Proxy', 'Ghost', 'Cipher', 'Pixel', 'Vector', 'Data'],
      suffixes: ['hack', 'trace', 'wire', 'pulse'],
    },
    megacorp: {
      prefixes: ['Synthex', 'Biogen', 'Aegis', 'Kyber', 'Helios', 'Vanguard', 'Stratos'],
      suffixes: ['systems', 'holdings', 'dynamics', 'robotics', 'solutions', 'group'],
    },
  },
  steampunk: {
    airship: {
      prefixes: ['Le Dirigeable', 'Le Navire', 'Le Galion', 'Le Frégate', 'Le Brigantin', 'Le Croiseur', 'Le Ballon', 'L’Astrolabe'],
      suffixes: ['du Zénith', 'de Cuivre', 'des Alizés', 'd’Horloge', 'des Étoiles', 'de Brume'],
    },
    clockwork: {
      prefixes: ['Le Balancier', 'La Turbine', 'L’Automate', 'Le Ressort', 'Le Compas', 'Le Baromètre', 'L’Astrolabe', 'Le Cadran', 'La Soupape', 'Le Rouage'],
      suffixes: ['d’Airain', 'de Vapeur', 'Chronométrique', 'Solstice', 'de Cuivre', 'Mécanique', 'de Précision'],
    },
  },
  alien_species: {
    hivemind: {
      prefixes: ['Krax', 'Vorn', 'Zeth', 'Thrak', 'Morn', 'Nyx', 'Syr'],
      suffixes: ['ith', 'on', 'ar', 'ul'],
    },
    ascended: {
      prefixes: ['Sol', 'Lyr', 'Vesper', 'Aur', 'Thal', 'Elor', 'Ser', 'Ilen'],
      suffixes: ['ora', 'eth', 'ion', 'aris', 'yn'],
    },
  },
  mythic_creature: {
    chimera: {
      prefixes: ['Sphin', 'Hydr', 'Manti', 'Drac', 'Gorg', 'Cerb', 'Basil'],
      suffixes: ['cor', 'oth', 'anth', 'ak'],
    },
  },
  crypto_token: {
    defi: {
      prefixes: ['Orb', 'Prism', 'Flux', 'Lumen', 'Pulse', 'Mesh', 'Edge'],
      suffixes: ['X', 'Core', 'Coin', 'Pay', 'Link'],
    },
  },
  server_cluster: {
    datacenter: {
      prefixes: ['Titan', 'Sirius', 'Vega', 'Aurora', 'Meridian', 'Helios', 'Beacon', 'Vertex'],
      suffixes: ['Core', 'Grid', 'Rack-04', 'Mesh', 'Cluster-B', 'Edge'],
    },
  },
  os_system: {
    kernel: {
      prefixes: ['Helios', 'Orion', 'Pulse', 'Vertex', 'Chrono', 'Stratos', 'Prism'],
      suffixes: ['Kernel', 'Base', 'Box', 'Link', 'Flow'],
    },
  },
  pet_name: {
    playful: {
      prefixes: ['Peb', 'Pip', 'Coco', 'Mochi', 'Zuzu', 'Kiki'],
      suffixes: ['o', 'a', 'i'],
    },
    majestic: {
      prefixes: ['Apollo', 'Atlas', 'Orion', 'Cesar', 'Titan', 'Nero', 'Soren'],
      suffixes: ['ix', 'ios', 'ius', 'ax', 'en'],
    },
  },

  // === BUSINESS & CREATIVE CATEGORIES ===
  restaurant: {
    bistro: {
      prefixes: ['Le Comptoir', 'La Table', 'Le Garde-Manger', 'Le Marché', 'La Terrine', 'Le Jardin', 'Le Petit'],
      suffixes: ['du Marché', 'du Chef', 'des Halles', 'du Terroir', 'de Saison', 'en Ville'],
    },
    chic: {
      prefixes: ['L’Orangerie', 'La Verrière', 'L’Atelier', 'Le Pavillon', 'Le Jardin', 'La Galerie', 'La Maison', 'Le Salon'],
      suffixes: ['d’Été', 'Solaire', 'Éphémère', 'Botanique', 'de Cristal', 'des Saveurs'],
    },
  },
  food_truck: {
    street: {
      prefixes: ['Nomade', 'Spice', 'Flame', 'Bistro', 'Taco', 'Burger', 'Sizzle', 'Urban'],
      suffixes: ['Wagon', 'Truck', 'Express', 'Corner', 'Stop', 'Kitchen'],
    },
  },
  clothing_brand: {
    urban: {
      prefixes: ['Knit', 'Weave', 'Thread', 'Loom', 'Selvedge', 'Canvas', 'Studio', 'Tailor'],
      suffixes: ['goods', 'club', 'project', 'house', 'supply', 'denim'],
    },
  },
  jewelry_brand: {
    precious: {
      prefixes: ['Vesper', 'Elara', 'Helios', 'Sola', 'Lyra', 'Aurea', 'Coral'],
      suffixes: ['gold', 'gems', 'fine', 'luxe', 'craft'],
    },
  },
  cosmetics_brand: {
    clean: {
      prefixes: ['Velvet', 'Clear', 'Soft', 'Herb', 'Nectar', 'Mineral', 'Dew'],
      suffixes: ['skin', 'botanicals', 'essence', 'pure', 'serum'],
    },
  },
  fitness_studio: {
    power: {
      prefixes: ['Kinetic', 'Prime', 'Peak', 'Core', 'Sprint', 'Pulse', 'Stride'],
      suffixes: ['athletics', 'training', 'motion', 'zone', 'track', 'hub'],
    },
  },
  travel_agency: {
    horizon: {
      prefixes: ['Solaris', 'Meridian', 'Nautil', 'Polaris', 'Vento', 'Zephyr', 'Caelum'],
      suffixes: ['trails', 'compass', 'escapes', 'adventures', 'routes', 'voyager'],
    },
  },
  real_estate: {
    prestige: {
      prefixes: ['Beacon', 'Horizon', 'Crest', 'Summit', 'Harbor', 'Sterling', 'Keystone'],
      suffixes: ['group', 'estates', 'realty', 'living', 'residences', 'spaces'],
    },
  },
  architecture_studio: {
    geometric: {
      prefixes: ['Axis', 'Form', 'Grid', 'Span', 'Timber', 'Stone', 'Plinth'],
      suffixes: ['partners', 'works', 'build', 'space', 'form', 'house'],
    },
  },
  interior_decor: {
    harmonie: {
      prefixes: ['Chêne', 'Lin', 'Argile', 'Verrière', 'Éclat', 'Soleil', 'Pierre', 'Velours'],
      suffixes: ['matière', 'lignes', 'espace', 'cocon', 'couleurs', 'lumière'],
    },
  },
  photo_studio: {
    light: {
      prefixes: ['Prisme', 'Chambre', 'Argentique', 'Clarté', 'Pellicule', 'Diaphragme', 'Silhouettes', 'Cadre'],
      suffixes: ['portraits', 'reportage', 'noir & blanc', 'cadre', 'atelier', 'galerie'],
    },
  },
  wedding_planner: {
    romance: {
      prefixes: ['Atelier', 'Rêve', 'Jardin', 'Soie', 'Ruban', 'Éclat', 'Bouquet', 'Aurore'],
      suffixes: ['réceptions', 'instants', 'alliances', 'jours heureux', 'cortège', 'histoires'],
    },
  },
  festival_event: {
    festive: {
      prefixes: ['Pulse', 'Sonic', 'Prism', 'Horizon', 'Aurora', 'Drift', 'Vibe'],
      suffixes: ['stage', 'sessions', 'nights', 'beats', 'grounds', 'lights'],
    },
  },
  webradio_station: {
    waves: {
      prefixes: ['Station', 'Canal', 'Sonore', 'Horizon', 'Fréquences', 'Onde', 'Mélodie'],
      suffixes: ['radio', 'mix', 'sound', 'beat', 'play', 'air'],
    },
  },
  indie_game_studio: {
    indie: {
      prefixes: ['Lantern', 'Clockwork', 'Hollow', 'Paper', 'Starlight', 'Timber', 'Briar'],
      suffixes: ['labs', 'collective', 'guild', 'house', 'pixels', 'arts'],
    },
  },
  streaming_channel: {
    stream: {
      prefixes: ['Pixel', 'Orbit', 'Pulse', 'Spark', 'Level', 'Arcade', 'Prime'],
      suffixes: ['zone', 'club', 'spot', 'play', 'deck', 'arena'],
    },
  },
  publishing_house: {
    letters: {
      prefixes: ['Les Presses de', 'L’Atelier des', 'La Plume de', 'Les Pages de', 'L’Encre des', 'Le Salon des', 'La Bibliothèque de', 'Les Livres de', 'Les Écrits de'],
      suffixes: ['Saisons', 'Horizons', 'Songes', 'Cimes', 'Ombres', 'Mers'],
    },
  },
  comic_manga_series: {
    action: {
      prefixes: ['Flame', 'Storm', 'Spirit', 'Thunder', 'Blade', 'Star', 'Void'],
      suffixes: ['walker', 'strike', 'heart', 'knight', 'seeker', 'reign'],
    },
  },
  board_game: {
    table: {
      prefixes: ['Chronicles of', 'Towers of', 'Merchants of', 'Voyage to', 'Builders of', 'Harbor of', 'Isles of', 'Keepers of'],
      suffixes: ['Harbor', 'Crown', 'Frontier', 'Horizon', 'Valleys', 'Kingdoms'],
    },
  },
  sports_team: {
    totem: {
      prefixes: ['Les Loups de', 'Les Ours de', 'Les Aigles du', 'Les Faucons du', 'Les Dragons de', 'Les Cerfs de', 'Les Lynx de', 'Les Tigres de', 'Les Éclairs de', 'Les Renards de'],
      suffixes: ['la Côte', 'la Montagne', 'la Forêt', 'la Rivière', 'l’Est', 'du Nord'],
    },
  },
  educational_project: {
    learning: {
      prefixes: ['Les Ateliers', 'La Maison des', 'Le Parcours', 'L’Horizon des', 'L’École des', 'La Fabrique des', 'Le Cercle des', 'Le Pont des', 'Les Clés des'],
      suffixes: ['Découvertes', 'Idées', 'Projets', 'Talents', 'Métiers', 'Échanges'],
    },
  },
  charity_ngo: {
    solidarity: {
      prefixes: ['Tous pour', 'Les Amis de', 'Cœurs pour', 'Bâtir pour', 'Veiller sur', 'Protéger', 'Partager pour', 'Aider', 'Soutenir'],
      suffixes: ['Demain', 'la Nature', 'les Forêts', 'l’Éducation', 'l’Eau Pure', 'l’Espoir'],
    },
  },
  coworking_space: {
    hub: {
      prefixes: ['La Verrière', 'Le Phare', 'La Fabrique', 'L’Espace', 'La Maison', 'Le Comptoir', 'Le Loft', 'Le Studio'],
      suffixes: ['Ouvert', 'Collaboratif', 'Collectif', 'Hub', 'Moderne', 'des Idées'],
    },
  },
  marketing_agency: {
    growth: {
      prefixes: ['Beacon', 'Signal', 'Momentum', 'Spark', 'Lift', 'Peak', 'Bridge'],
      suffixes: ['labs', 'studio', 'digital', 'creative', 'brand', 'works'],
    },
  },
  ecommerce_store: {
    store: {
      prefixes: ['Sunny', 'Bright', 'Oak', 'Craft', 'Good', 'Fair', 'Fresh'],
      suffixes: ['goods', 'corner', 'supply', 'guild', 'mart', 'depot'],
    },
  },

  // === BATCH B CREATIVE & GENRE ===
  magical_girl: {
    sparkle: {
      prefixes: ['Crystal', 'Sakura', 'Velvet', 'Sapphire', 'Ruby', 'Pearl', 'Celestia', 'Hana'],
      suffixes: ['Light', 'Ribbon', 'Crown', 'Bell', 'Jewel', 'Feather'],
    },
  },
  mecha_pilot: {
    ace: {
      prefixes: ['Vega', 'Orion', 'Draco', 'Titan', 'Helios', 'Falcon', 'Nova'],
      suffixes: ['Seven', 'Knight', 'Star', 'Wing', 'Strike', 'Core'],
    },
  },
  secret_order: {
    occult: {
      prefixes: ['La Garde de', 'Le Cercle de', 'L’Éclipse de', 'Les Veilleurs de', 'L’Ombre de', 'La Voûte de', 'Le Pacte de', 'Les Gardiens de', 'Le Sanctuaire de'],
      suffixes: ['l’Aube', 'Minuit', 'l’Étoile', 'l’Abîme', 'la Clé', 'l’Ancien'],
    },
  },
  sky_citadel: {
    floating: {
      prefixes: ['Nimbus', 'Solaris', 'Strata', 'Boreal', 'Cirrus', 'Vesper', 'Aurora', 'Halcyon'],
      suffixes: ['bastion', 'peak', 'watch', 'sanctum', 'tower', 'crest'],
    },
  },
  special_attack: {
    ultimate: {
      prefixes: ['Éclat de', 'Fureur de', 'Vague de', 'Souffle de', 'Jugement de', 'Pluie de', 'Rayon de', 'Orage de'],
      suffixes: ['Lune Rouge', 'Givre Éternel', 'Ciel Ouvert', 'Flamme Bleue', 'Lame d’Or', 'Foudre Blanche'],
    },
  },
  elemental_power: {
    primal: {
      prefixes: ['Chrono', 'Umbra', 'Lumen', 'Thermo', 'Electro', 'Magma', 'Flora'],
      suffixes: ['weave', 'pulse', 'surge', 'wave', 'blast', 'flare'],
    },
  },
  bio_chimera: {
    mutant: {
      prefixes: ['Cryo', 'Pyro', 'Neuro', 'Toxo', 'Spore', 'Osteo', 'Hemo'],
      suffixes: ['spine', 'scale', 'beast', 'stalk', 'shell', 'wing'],
    },
  },
  monster_beast: {
    wild: {
      prefixes: ['Thorn', 'Ash', 'Rime', 'Iron', 'mire', 'Storm', 'Skar'],
      suffixes: ['tooth', 'wing', 'pelt', 'horn', 'beast', 'reaver'],
    },
  },
  magic_relic: {
    sacred: {
      prefixes: ['L’Anneau de', 'La Couronne de', 'Le Bâton de', 'La Clé de', 'Le Sablier de', 'Le Bouclier de', 'L’Étoile de', 'Le Grimoire de', 'La Plume de'],
      suffixes: ['Clarté', 'Sagesse', 'l’Éclipse', 'Courage', 'Mémoire', 'Lumière'],
    },
  },
  interstellar_empire: {
    galaxy: {
      prefixes: ['La Coalition de', 'L’Alliance de', 'Le Concordat de', 'La République de', 'L’Empire des', 'Le Protectorat de', 'La Ligue de', 'La Dynastie de', 'Le Royaume de', 'L’Ordre de'],
      suffixes: ['Procyon', 'Arcturus', 'Andromède', 'Altair', 'Rigel', 'Capella'],
    },
  },
  anime_faction: {
    syndicate: {
      prefixes: ['Le Clan du', 'La Garde du', 'La Division du', 'Les Lames du', 'L’Ombre du', 'Le Cercle du', 'Les Ailes du', 'La Flotte du', 'Le Pacte du', 'La Meute du'],
      suffixes: ['Lotus Blanc', 'Soleil Noir', 'Vent d’Est', 'Dragon d’Or', 'Tigre Bleu', 'Phénix Rouge', 'Loup d’Argent'],
    },
  },

  // === BATCH C/D/E SOFTWARE, SCIENCE, MATH & LEARNING ===
  software_tool: {
    saas: {
      prefixes: ['Relay', 'Beacon', 'Grid', 'Spark', 'Metric', 'Launch', 'Bridge', 'Track'],
      suffixes: ['board', 'space', 'works', 'kit', 'base', 'box'],
    },
  },
  browser_extension: {
    addon: {
      prefixes: ['Smart', 'Focus', 'Clean', 'Bright', 'Swift', 'Lite', 'Clear', 'Peak'],
      suffixes: ['note', 'guard', 'zoom', 'find', 'skip', 'view'],
    },
  },
  ai_agent_workflow: {
    agent: {
      prefixes: ['Prism', 'Vector', 'Signal', 'Logic', 'Metric', 'Spark', 'Relay', 'Bridge'],
      suffixes: ['core', 'ops', 'sync', 'mesh', 'assist', 'engine'],
    },
  },
  opensource_project: {
    repo: {
      prefixes: ['Swift', 'Light', 'Tiny', 'Clear', 'Pure', 'Fast', 'Direct', 'Solid'],
      suffixes: ['pack', 'flow', 'box', 'base', 'grid', 'lib'],
    },
  },
  code_library: {
    pkg: {
      prefixes: ['Clean', 'Tiny', 'Zero', 'Pure', 'Quick', 'Nano', 'Sharp', 'Core'],
      suffixes: ['utils', 'hooks', 'tools', 'base', 'dom', 'spec'],
    },
  },
  api_service: {
    endpoint: {
      prefixes: ['Edge', 'Core', 'Sync', 'Fast', 'Open', 'Mesh', 'Stream', 'Pipe'],
      suffixes: ['edge', 'hub', 'bus', 'port', 'sync', 'core'],
    },
  },
  database_engine: {
    engine: {
      prefixes: ['Granite', 'Iron', 'Pulse', 'Slate', 'Titan', 'Spark', 'Core', 'Flint'],
      suffixes: ['grid', 'graph', 'cache', 'shard', 'ledger', 'core'],
    },
  },
  cloud_platform: {
    cloud: {
      prefixes: ['Horizon', 'Vertex', 'Vector', 'Beacon', 'North', 'Atlas', 'Zenith', 'Orb'],
      suffixes: ['grid', 'kube', 'stack', 'core', 'ops', 'pod'],
    },
  },
  cyber_lab: {
    defense: {
      prefixes: ['Cipher', 'Rampart', 'Watch', 'Gate', 'Lock', 'Beacon', 'Iron', 'Ward'],
      suffixes: ['audit', 'mesh', 'watch', 'shield', 'core', 'wall'],
    },
  },
  math_app: {
    edtech: {
      prefixes: ['Sum', 'Count', 'Logic', 'Grid', 'Cube', 'Vector', 'Ratio', 'Fract'],
      suffixes: ['spark', 'mind', 'path', 'step', 'play', 'wiz'],
    },
  },
  math_puzzle: {
    riddle: {
      prefixes: ['Le Mystère des', 'La Suite de', 'Le Casse-Tête des', 'L’Équation des', 'Le Secret des', 'L’Épreuve des', 'Le Théorème des', 'La Clef des', 'Le Voyage des', 'Le Calcul des'],
      suffixes: ['Miroirs', 'Cercles', 'Spirales', 'Portes', 'Cadrans', 'Polygones'],
    },
  },
  fictional_theorem: {
    law: {
      prefixes: ['Axiome de', 'Loi de', 'Hypothèse de', 'Corollaire de', 'Paradoxe de', 'Invariant de', 'Critère de', 'Formule de', 'Relation de', 'Symétrie de'],
      suffixes: ['Voss-Belen', 'Sorel-Nox', 'Alder-Mir', 'Cael-Aris', 'Korr-Valen', 'Hald-Orr', 'Maren-Vyr'],
    },
  },
  geometric_object: {
    polyhedron: {
      prefixes: ['Iso', 'Penta', 'Hexa', 'Dodeca', 'Poly', 'Sym', 'Gyro', 'Heli'],
      suffixes: ['gon', 'sphere', 'axis', 'node', 'prism', 'lattice'],
    },
  },
  fractal_pattern: {
    fractal: {
      prefixes: ['Courbe de', 'Réseau de', 'Flocon de', 'Jardin de', 'Labyrinthe de', 'Fougère de', 'Écume de', 'Voûte de', 'Miroir de', 'Horizon de'],
      suffixes: ['Sierpinski', 'Glace Étoilée', 'Mille Miroirs', 'Corail Doré', 'Récifs Infini', 'Neige Éternelle'],
    },
  },
  number_system: {
    system: {
      prefixes: ['Notation', 'Code', 'Table', 'Échelle', 'Mesure', 'Numération', 'Chiffrage', 'Comptage', 'Symétrie', 'Ordre'],
      suffixes: ['duodécimal', 'ternaire', 'hexagonal', 'stellaire', 'boréal', 'lunaire', 'harmonique', 'solaire'],
    },
  },
  math_olympiad_team: {
    olympiad: {
      prefixes: ['Les Vecteurs de', 'L’Équipe de', 'Les Penseurs de', 'Le Cercle de', 'Les Étoiles de', 'La Ligue de', 'Les Pionniers de', 'L’Atelier de', 'Les Sages de', 'La Garde de'],
      suffixes: ['Gauss', 'Noether', 'Archimède', 'Fibonacci', 'Descartes', 'Thalès'],
    },
  },
  scientific_model: {
    model: {
      prefixes: ['Diagramme de', 'Analyse de', 'Dynamique de', 'Structure de', 'Principe de', 'Modélisation des', 'Cartographie des'],
      suffixes: ['Ondes Gravitationnelles', 'Plasma Froid', 'Équilibre Thermique', 'Orbits Stables', 'Réseaux Complexes', 'Flux Magnétiques'],
    },
  },
  science_popularization: {
    media: {
      prefixes: ['L’Éveil des', 'À la Découverte des', 'Exploration des', 'Le Labo des', 'Regard sur les', 'L’Écho des', 'Clés des', 'Voyage au Cœur des', 'Les Secrets des'],
      suffixes: ['Étoiles', 'Ondes', 'Planètes', 'Océans', 'Forêts', 'Galaxies'],
    },
  },
  research_project: {
    academic: {
      prefixes: ['Program', 'Network', 'Consortium', 'Center', 'Atlas', 'Grant', 'Institute', 'Archive', 'Survey', 'Observatory'],
      suffixes: ['AETHER', 'POLARIS', 'VERITAS', 'CLARITY', 'QUANTUM', 'MERIDIAN'],
    },
  },
  hackathon_team: {
    hacker: {
      prefixes: ['Stack', 'Kernel', 'Pixel', 'Turbo', 'Zero', 'Relay', 'Binary', 'Swift'],
      suffixes: ['Runners', 'Makers', 'Coders', 'Crafts', 'Ninjas', 'Founders'],
    },
  },
  tactical_operation: {
    military: {
      prefixes: ['Opération', 'Code', 'Plan', 'Directives', 'Protocole', 'Action', 'Mission', 'Séquence', 'Projet'],
      suffixes: ['Étoile Polaire', 'Brume Bleue', 'Vent du Nord', 'Crête d’Argent', 'Roc Noir', 'Mer Calme'],
    },
  },
  creative_workshop: {
    craft: {
      prefixes: ['Le Studio des', 'La Maison des', 'Le Cercle des', 'La Ruche des', 'Le Jardin des', 'La Palette des', 'Les Mains des', 'L’Écho des', 'Le Comptoir des', 'La Cour des'],
      suffixes: ['Encres', 'Bois', 'Fils', 'Terres', 'Formes', 'Tissus'],
    },
  },
  online_course: {
    course: {
      prefixes: ['Les Bases du', 'L’École du', 'Le Labo du', 'Atelier', 'L’Art du', 'Maîtriser le', 'Le Cap du', 'Le Guide du', 'Les Clés du', 'La Voie du'],
      suffixes: ['Design', 'Code', 'Craft', 'Studio', 'System', 'Focus'],
    },
  },
  study_group: {
    group: {
      prefixes: ['Les Étudiants de', 'La Salle de', 'Le Réseau de', 'La Table des', 'Le Forum des', 'Le Groupe des', 'L’Atelier des', 'Le Banc des', 'Les Esprits de', 'Le Phare des'],
      suffixes: ['Sciences', 'Lettres', 'Maths', 'Projets', 'Recherches', 'Savants'],
    },
  },
  sprint_ritual: {
    ritual: {
      prefixes: ['Le Rythme', 'La Pause', 'L’Élan', 'Le Temps', 'Le Point', 'La Cadence', 'Le Cap', 'Le Cercle', 'La Fenêtre', 'La Trace'],
      suffixes: ['Clair', 'Matin', 'Calme', 'Focus', 'Direct', 'Serein'],
    },
  },
  personal_portfolio: {
    folio: {
      prefixes: ['Projets de', 'Carnets de', 'Galerie de', 'Œuvres de', 'Archives de', 'Regard de', 'Profil de', 'Esquisses de', 'Lignes de', 'Images de'],
      suffixes: ['Studio', 'Art', 'Motion', 'Web', 'Code', 'Print'],
    },
  },
  local_association: {
    community: {
      prefixes: ['Les Voisins de', 'Le Cercle de', 'L’Élan de', 'Les Jardins de', 'Ensemble à', 'Le Lien de', 'La Place de', 'La Maison de', 'Les Sentiers de', 'Le Phare de'],
      suffixes: ['la Rivière', 'l’Église', 'Belleville', 'la Place', 'du Canal', 'des Chênes'],
    },
  },
  eco_initiative: {
    green: {
      prefixes: ['L’Avenir de', 'Protéger', 'Racines de', 'Souffle de', 'Jardins de', 'Forêts de', 'Océans de', 'Eaux de', 'Soleil pour', 'Villes de'],
      suffixes: ['la Planète', 'la Mer', 'nos Bois', 'nos Cours d’Eau', 'la Biodiversité', 'Demain'],
    },
  },
  exotic_resort: {
    resort: {
      prefixes: ['La Plage des', 'Le Lagon des', 'La Crique des', 'Le Cap des', 'L’Horizon des', 'Le Jardin des', 'Le Refuge des', 'Les Eaux des', 'Le Phare des', 'Les Rives des'],
      suffixes: ['Palmiers', 'Étoiles', 'Eaux Claires', 'Flots Doux', 'Soleils', 'Brises'],
    },
  },
  calendar_era: {
    era: {
      prefixes: ['Les Années de', 'L’Aube des', 'Le Siècle des', 'La Saison des', 'Le Règne des', 'Le Temps du', 'L’Époque des', 'Le Jour des', 'L’Âge d’Or des', 'Le Crépuscule des'],
      suffixes: ['Rois Blancs', 'Grandes Mers', 'Villes Hautes', 'Soleils Clairs', 'Ciels Ouverts', 'Moissons'],
    },
  },

  // === BATCH F & BATCH G GENERATORS ===
  griffin_rider: {
    default: {
      prefixes: ['Gale', 'Feather', 'Cloud', 'Horizon'],
      suffixes: ['Aile', 'Plume', 'Vent'],
    },
  },
  nordic_valkyrie: {
    default: {
      prefixes: ['Skadi', 'Valk', 'Run', 'Solv'],
      suffixes: ['heim', 'val', 'dis'],
    },
  },
  celtic_druid: {
    default: {
      prefixes: ['Oisin', 'Niamh', 'Elow', 'Rowan'],
      suffixes: ['yn', 'ar', 'el'],
    },
  },
  abyssal_leviathan: {
    default: {
      prefixes: ['Mael', 'Naut', 'Krag', 'Neth'],
      suffixes: ['os', 'yx', 'ak'],
    },
  },
  desert_djinn: {
    default: {
      prefixes: ['Miraj', 'Kadir', 'Faris', 'Nadir'],
      suffixes: ['ar', 'on', 'el'],
    },
  },
  gargoyle_sentinel: {
    default: {
      prefixes: ['Slate', 'Obsid', 'Flint', 'Basalt'],
      suffixes: ['stone', 'ward', 'watch'],
    },
  },
  phoenix_flame: {
    default: {
      prefixes: ['Cind', 'Ash', 'Brim', 'Lumin'],
      suffixes: ['ara', 'ion', 'ax'],
    },
  },
  enchanted_forest: {
    default: {
      prefixes: ['Clairière', 'Feuillage', 'Vallon', 'Sanctuaire', 'Sentier'],
      suffixes: ['des Roches', 'des Fougères', 'de Rosée'],
    },
  },
  sacred_artifact: {
    default: {
      prefixes: ['Couronne', 'Miroir', 'Amulette', 'Anneau', 'Étoile', 'Talisman'],
      suffixes: ['d’Argent', 'd’Émeraude', 'du Soleil', 'des Cieux'],
    },
  },
  undead_lich: {
    default: {
      prefixes: ['Varn', 'Thar', 'Orr', 'Drak'],
      suffixes: ['os', 'is', 'ak'],
    },
  },
  shadow_assassin_guild: {
    default: {
      prefixes: ['Les Ombres', 'Les Griffes', 'La Confrérie', 'Le Cercle', 'Les Masques', 'Les Pas'],
      suffixes: ['du Silence', 'de la Nuit', 'des Toits', 'de Brume'],
    },
  },
  elemental_golem: {
    default: {
      prefixes: ['Basalt', 'Granit', 'Titan', 'Quartz'],
      suffixes: ['ix', 'or', 'us'],
    },
  },
  orbital_station: {
    default: {
      prefixes: ['Cercle', 'Citadelle', 'Anneau', 'Plateforme', 'Observatoire', 'Phare'],
      suffixes: ['Atlas', 'Vega', 'Lyra'],
    },
  },
  cyber_hacker: {
    default: {
      prefixes: ['Proxy', 'Daemon', 'Root', 'Vector'],
      suffixes: ['_01', '_core', 'Sys'],
    },
  },
  quantum_reactor: {
    default: {
      prefixes: ['Chambre', 'Matrice', 'Injecteur', 'Module', 'Anneau', 'Cavité', 'Puits'],
      suffixes: ['Photon', 'Quark', 'Plasma'],
    },
  },
  terraformed_colony: {
    default: {
      prefixes: ['Cité', 'Oasis', 'Havre', 'Avant-Poste', 'Base', 'Bastion'],
      suffixes: ['Solaria', 'Boréal', 'Céleste'],
    },
  },
  interstellar_corridor: {
    default: {
      prefixes: ['Le Couloir', 'Le Pont', 'Le Détroit', 'L’Artère', 'La Trace', 'Le Sillage', 'Le Tunnel'],
      suffixes: ['d’Aldébaran', 'de Sirius', 'd’Altaïr', 'du Nord'],
    },
  },
  ai_megacorp: {
    default: {
      prefixes: ['Vertex', 'Helios', 'Meridian', 'Cipher'],
      suffixes: ['Labs', 'Holdings', 'Solutions'],
    },
  },
  cyborg_bounty_hunter: {
    default: {
      prefixes: ['Vex', 'Korr', 'Steel', 'Strider'],
      suffixes: ['_X', 'Steel', 'Prime'],
    },
  },
  exoplanet_biodome: {
    default: {
      prefixes: ['Dôme', 'Jardin', 'Serre', 'Écrin', 'Havre', 'Verrière', 'Sanctuaire', 'Enclos', 'Atrium', 'Terrarium'],
      suffixes: ['Aurore', 'Sylve', 'Boréal', 'Solaire', 'Émeraude', 'Fleurie'],
    },
  },
  deep_space_probe: {
    default: {
      prefixes: ['Vigie', 'Balise', 'Navire', 'Écho', 'Horizon', 'Capteur', 'Optique'],
      suffixes: ['Polaris', 'Sirius', 'Véga'],
    },
  },
  plasma_weapon: {
    default: {
      prefixes: ['Rayon', 'Disrupteur', 'Arc', 'Pulse', 'Projecteur', 'Faisceau', 'Impulsion'],
      suffixes: ['Photon', 'Aether', 'Flux'],
    },
  },
  nanotech_swarm: {
    default: {
      prefixes: ['Matrice', 'Voile', 'Flux', 'Réseau', 'Onde', 'Manteau', 'Courant'],
      suffixes: ['Micro', 'Vortex', 'Matrix'],
    },
  },
  neural_interface: {
    default: {
      prefixes: ['Cerveau', 'Opti', 'Signal', 'Onde', 'Axone', 'Flux', 'Réseau'],
      suffixes: ['Bridge', 'Node', 'Matrix'],
    },
  },
  dystopian_city_sector: {
    default: {
      prefixes: ['Quartier', 'Aile', 'Enclave', 'Bas-Fond', 'Quai', 'Passage', 'Bloc', 'Tranchée', 'Secteur Nord', 'Sous-Ville'],
      suffixes: ['Acier', 'Cendre', 'Brume', 'Carbone', 'Néon Gris', 'Rouille'],
    },
  },
  carnivorous_plant: {
    default: {
      prefixes: ['Gueule', 'Corolle', 'Spore', 'Ronce', 'Feuille', 'Tige', 'Bulbe'],
      suffixes: ['Rouge', 'd’Ébène', 'des Marais', 'Acide'],
    },
  },
  ancient_tree: {
    default: {
      prefixes: ['Le Saule', 'Le Cèdre', 'Le Hêtre', 'L’If', 'L’Orme', 'Le Pin', 'Le Bouleau'],
      suffixes: ['de Pierre', 'de Brume', 'd’Hiver', 'des Sages'],
    },
  },
  deep_sea_species: {
    default: {
      prefixes: ['Lanterne', 'Mante', 'Nautile', 'Crabe', 'Raie', 'Anguille', 'Corail', 'Pieuvre'],
      suffixes: ['Abyssal', 'd’Encre', 'Lunaire', 'd’Opale', 'Solaire'],
    },
  },
  arctic_creature: {
    default: {
      prefixes: ['Renard', 'Morse', 'Phoque', 'Caribou', 'Lynx', 'Hermine', 'Béluga', 'Narval'],
      suffixes: ['des Banquises', 'de Neige', 'Polaires', 'du Fjord'],
    },
  },
  tropical_rainforest: {
    default: {
      prefixes: ['Vallée', 'Delta', 'Parc', 'Sanctuaire', 'Canopée', 'Lagune', 'Île'],
      suffixes: ['de Jade', 'd’Ambre', 'Solaire', 'des Sources'],
    },
  },
  crystal_mineral: {
    default: {
      prefixes: ['Obsid', 'Beryl', 'Topaz', 'Zirc'],
      suffixes: ['el', 'ar', 'ux'],
    },
  },
  mountain_summit: {
    default: {
      prefixes: ['La Crête', 'Le Sommet', 'Le Col', 'Le Roc', 'Le Massif', 'L’Arête', 'Le Cap'],
      suffixes: ['de Neige', 'de Granit', 'du Ciel', 'd’Argent'],
    },
  },
  coral_reef: {
    default: {
      prefixes: ['Crique', 'Passe', 'Chenal', 'Jardin', 'Baie', 'Écueil', 'Havre'],
      suffixes: ['d’Émeraude', 'des Coraux', 'Solaire', 'de Cristal'],
    },
  },
  wild_sanctuary: {
    default: {
      prefixes: ['Vallée', 'Prairie', 'Clairière', 'Forêt', 'Plateau', 'Rivière', 'Île'],
      suffixes: ['des Loups', 'd’Émeraude', 'Sereine', 'du Nord'],
    },
  },
  volcanic_geyser: {
    default: {
      prefixes: ['Bouche', 'Cratère', 'Évent', 'Chaudière', 'Nappe', 'Cheminée', 'Fosse'],
      suffixes: ['de Basalte', 'd’Obsidienne', 'Bouillonnant', 'd’Ambre'],
    },
  },
  desert_oasis: {
    default: {
      prefixes: ['Puits', 'Bassin', 'Jardin', 'Vallon', 'Lagune', 'Halte', 'Source', 'Refuge', 'Mirage', 'Clairière'],
      suffixes: ['du Soleil', 'des Dunes', 'de Jasmin', 'du Sud', 'de Nacre', 'du Mirage'],
    },
  },
  luminescent_fungi: {
    default: {
      prefixes: ['Chapeau', 'Agaric', 'Pleurote', 'Morille', 'Pied', 'Calice', 'Voile'],
      suffixes: ['d’Azote', 'Étoilé', 'd’Améthyste', 'd’Argent'],
    },
  },
  predatory_raptor: {
    default: {
      prefixes: ['Gerfaut', 'Épervier', 'Balbuzard', 'Milan', 'Busard', 'Fauconneau', 'Caracara', 'Condor'],
      suffixes: ['du Nord', 'des Cimes', 'Argenté', 'Nocturne'],
    },
  },
  specialty_coffee: {
    default: {
      prefixes: ['Torréfaction', 'Comptoir', 'Arôme', 'Maison', 'Expresso', 'Tasse'],
      suffixes: ['du Matin', 'Doré', 'Éthiopie'],
    },
  },
  artisanal_bakery: {
    default: {
      prefixes: ['Boulangerie', 'Farine', 'Levain', 'Épi', 'Miche', 'Brioche', 'Croissant'],
      suffixes: ['de Campagne', 'Croustillant', 'des Halles', 'Dorée'],
    },
  },
  luxury_perfume: {
    default: {
      prefixes: ['Notes', 'Flacon', 'Essence', 'Cœur', 'Sillage', 'Extraits'],
      suffixes: ['d’Iris', 'de Santal', 'd’Or', 'd’Ambre'],
    },
  },
  architect_firm: {
    default: {
      prefixes: ['Axe', 'Volume', 'Espace', 'Cercle', 'Plinthe', 'Façade'],
      suffixes: ['Structures', 'Matière', 'Espaces'],
    },
  },
  eco_fashion: {
    default: {
      prefixes: ['Coton', 'Chanvre', 'Soie', 'Laine', 'Écorce'],
      suffixes: ['Brut', 'Simple', 'Tissé'],
    },
  },
  creative_coworking: {
    default: {
      prefixes: ['La Fabrique', 'La Galerie', 'Le Comptoir', 'La Place', 'L’Agora', 'Le Phare'],
      suffixes: ['Moderne', 'Ouvert', 'des Talents', 'Connect'],
    },
  },
  cocktail_lounge: {
    default: {
      prefixes: ['Le Verre', 'La Fiole', 'Le Comptoir', 'Le Cercle', 'La Voûte', 'Le Velours', 'L’Alambic', 'Le Phare'],
      suffixes: ['Fumé', 'de Minuit', 'Ambré', 'de Velours'],
    },
  },
  game_dev_studio: {
    default: {
      prefixes: ['Lantern', 'Clockwork', 'Hollow', 'Paper'],
      suffixes: ['Labs', 'Works', 'Interactive'],
    },
  },
  green_energy_corp: {
    default: {
      prefixes: ['Solaris', 'Strata', 'Boreal', 'Kinet'],
      suffixes: ['Watt', 'Flow', 'Volt'],
    },
  },
  microbrewery_craft: {
    default: {
      prefixes: ['Le Malt', 'Le Chêne', 'Le Baril', 'La Mousse', 'L’Orge', 'La Robe', 'La Cave'],
      suffixes: ['de Printemps', 'Ambrée', 'Dorée', 'du Nord'],
    },
  },
  fintech_app: {
    default: {
      prefixes: ['Vault', 'Mint', 'Clear', 'Bridge'],
      suffixes: ['Pay', 'Sync', 'Flow'],
    },
  },
  wellness_spa: {
    default: {
      prefixes: ['Sources', 'Jardin', 'Pause', 'Harmonie', 'Équilibre', 'Oasis'],
      suffixes: ['de Jade', 'du Temps', 'Sereine'],
    },
  },
  detective_noir: {
    default: {
      prefixes: ['Victor', 'Ray', 'Arthur', 'Miles'],
      suffixes: ['Blackwood', 'Mercer', 'Steele'],
    },
  },
  steampunk_inventor: {
    default: {
      prefixes: ['Gideon', 'Arthur', 'Victor', 'Barnaby', 'Thaddeus'],
      suffixes: ['Gear', 'Pendulum', 'Clockwork'],
    },
  },
  space_pirate: {
    default: {
      prefixes: ['Commander', 'Raider', 'Rogue', 'Vance'],
      suffixes: ['Falcon', 'Nova', 'Iron'],
    },
  },
  alchemist_healer: {
    default: {
      prefixes: ['Docteur', 'Frère', 'Sœur', 'Érudit', 'Guérisseur', 'Sage'],
      suffixes: ['des Herbes', 'de l’Élixir', 'des Racines', 'du Mortier', 'de l’Aube', 'des Sources'],
    },
  },
  court_diplomat: {
    default: {
      prefixes: ['Marquis', 'Duc', 'Chancelier', 'Émissaire', 'Viconte', 'Dame', 'Régent'],
      suffixes: ['de Montfort', 'de Clairefont', 'de Belmont', 'de Clairvaux', 'de Hauterive', 'de Rochefort'],
    },
  },
  bounty_hunter_guild: {
    default: {
      prefixes: ['La Guilde', 'Les Limiers', 'Le Bureau', 'L’Escouade', 'La Meute', 'Le Cercle', 'La Garde'],
      suffixes: ['des Sables', 'du Fer', 'de l’Ouest', 'des Routes', 'du Nord', 'Sans Pitié'],
    },
  },
  gladiator_champion: {
    default: {
      prefixes: ['Cassius', 'Marcus', 'Brutus', 'Varro', 'Darius'],
      suffixes: ['de Fer', 'de la Fosse', 'le Lion', 'de Pierre', 'le Tonnerre', 'du Cirque'],
    },
  },
  wandering_bard: {
    default: {
      prefixes: ['Orphée', 'Gaspard', 'Soren', 'Élian', 'Léon'],
      suffixes: ['des Taverne', 'au Chant Clair', 'du Vent', 'des Saisons', 'le Conteur', 'aux Cordes d’Or'],
    },
  },
  cyber_medic: {
    default: {
      prefixes: ['Med', 'Pulse', 'Bio', 'Trauma', 'Synth'],
      suffixes: ['des Bas-Fonds', 'du Secteur 4', 'Express', 'Mobile', 'Clinique'],
    },
  },
  royal_knight_order: {
    default: {
      prefixes: ['Les Paladins', 'Le Bouclier', 'Les Lances', 'La Table', 'Les Sentinelles', 'La Bannière', 'L’Étendard', 'L’Armée', 'Les Templiers'],
      suffixes: ['de la Couronne', 'du Soleil', 'du Chêne', 'du Trône', 'd’Honneur', 'du Lion d’Or', 'de Fer Blanc'],
    },
  },
  smuggler_pilot: {
    default: {
      prefixes: ['Kestrel', 'Vance', 'Spike', 'Dash', 'Cole'],
      suffixes: ['Drift', 'Runner', 'Ghost', 'Comet'],
    },
  },
  mystic_oracle: {
    default: {
      prefixes: ['Delphine', 'Sélène', 'Aurore', 'Morgane', 'Isolde', 'Céleste'],
      suffixes: ['des Brumes', 'de la Lune', 'du Miroir', 'du Destin', 'des Songes', 'de Vérité'],
    },
  },
  vampire_coven: {
    default: {
      prefixes: ['Cour', 'Dynastie', 'Ordre', 'Cercle', 'Sang', 'Maison Noble', 'Secte', 'Garde', 'Conclave', 'Assemblée'],
      suffixes: ['de Minuit', 'd’Ébène', 'de Velours', 'des Ombres', 'de l’Éclipse', 'Cramoisi', 'Nocturne'],
    },
  },
  floating_skyland: {
    default: {
      prefixes: ['Le Sommet', 'La Citadelle', 'L’Archipel', 'Le Pic', 'La Tour', 'Le Jardin', 'Le Refuge', 'Le Roc'],
      suffixes: ['des Cieux', 'des Vents', 'du Zénith', 'Éthéré', 'Solaire'],
    },
  },
  dwarven_citadel: {
    default: {
      prefixes: ['Thar', 'Bryn', 'Krag', 'Grom', 'Dain'],
      suffixes: ['forge', 'vault', 'hammer', 'gate'],
    },
  },
  elven_sanctuary: {
    default: {
      prefixes: ['Eryn', 'Fael', 'Lira', 'Cael', 'Thal'],
      suffixes: ['glade', 'vale', 'spire', 'moon'],
    },
  },
  sunken_atlantis: {
    default: {
      prefixes: ['Corail', 'Abysse', 'Marée', 'Perle', 'Lagune', 'Poséidon', 'Médée'],
      suffixes: ['de Nacre', 'du Fond', 'Éternelle', 'des Flots', 'Silencieuse', 'd’Azur'],
    },
  },
  desert_empire: {
    default: {
      prefixes: ['Thèbes', 'Khepri', 'Osiris', 'Anubis', 'Sakkara', 'Memphis', 'Karnak', 'Louxor'],
      suffixes: ['des Dunes', 'des Pharaons', 'Éternel', 'de Pierre', 'du Nil', 'd’Ambre', 'du Désert'],
    },
  },
  frozen_fjord: {
    default: {
      prefixes: ['Skal', 'Boreal', 'Thule', 'Vinter', 'Kald', 'Rime'],
      suffixes: ['fjord', 'haven', 'peak', 'crag', 'berg'],
    },
  },
  pirate_haven: {
    default: {
      prefixes: ['La Passe', 'Le Cap', 'La Plage', 'La Taverne', 'Le Phare', 'Le Refuge', 'Le Bassin', 'La Falaise'],
      suffixes: ['des Écumeurs', 'des Galions', 'des Perles', 'du Large', 'des Sirènes'],
    },
  },
  merchant_crossroad: {
    default: {
      prefixes: ['La Place', 'Le Carrefour', 'La Halle', 'Le Quai', 'Le Passage', 'La Bourse', 'La Route'],
      suffixes: ['des Étoffes', 'des Joyaux', 'du Commerce', 'des Marchands', 'du Levant', 'du Port'],
    },
  },
  haunted_manor: {
    default: {
      prefixes: ['Donjon', 'Abbaye', 'Bastide', 'Pavillon', 'Prieuré', 'Maison Haute', 'Tour', 'Fort'],
      suffixes: ['des Corbeaux', 'du Vent', 'de Brume', 'Sans Lumière', 'de Minuit', 'Maudit'],
    },
  },
  magical_academy: {
    default: {
      prefixes: ['Conservatoire', 'Lycée', 'Faculté', 'Tour', 'Cercle', 'Séminaire', 'Athenaeum', 'Palais'],
      suffixes: ['des Runes', 'du Savoir', 'des Cristaux', 'de Lumière', 'des Éléments', 'des Sages', 'des Sorts'],
    },
  },
  forbidden_wasteland: {
    default: {
      prefixes: ['Le Bassin', 'Le Gouffre', 'La Vallée', 'Le Plateau', 'La Fosse', 'Le Marais', 'Le Ravin', 'La Lande'],
      suffixes: ['de Soufre', 'Maudit', 'Dévasté', 'de Rouille', 'Calciné'],
    },
  },
  ancient_pyramid_tomb: {
    default: {
      prefixes: ['Le Sanctuaire', 'La Chambre', 'La Nécropole', 'Le Sépulcre', 'Le Monument', 'Le Labyrinthe', 'L’Autel', 'La Galerie', 'Le Palais'],
      suffixes: ['d’Obsidienne', 'du Soleil', 'des Sables', 'du Nil', 'Scellé'],
    },
  },
  esport_team_pro: {
    default: {
      prefixes: ['Orbit', 'Kestrel', 'Pulse', 'Vertex'],
      suffixes: ['Roster', 'Force', 'Prime', 'Vanguard'],
    },
  },
  epic_quest_name: {
    default: {
      prefixes: ['L’Aube', 'Le Serment', 'La Couronne', 'L’Ombre', 'Le Chant', 'La Flamme', 'Le Voyage'],
      suffixes: ['du Nord', 'de la Lumière', 'du Phénix', 'des Étoiles', 'du Temps', 'des Anciens'],
    },
  },
  legendary_armor: {
    default: {
      prefixes: ['Bouclier', 'Gantelet', 'Heaume', 'Manteau', 'Bannière', 'Garde', 'Pavois'],
      suffixes: ['d’Or', 'Éternelle', 'des Rois', 'de Lumière', 'des Ombres'],
    },
  },
  magic_potion: {
    default: {
      prefixes: ['Essence', 'Nectar', 'Breuvage', 'Rosée', 'Baume', 'Infusion', 'Goutte'],
      suffixes: ['d’Or', 'de Sagesse', 'de Flamme', 'de Givre', 'd’Émeraude', 'Solaire'],
    },
  },
  raid_dungeon_boss: {
    default: {
      prefixes: ['Vexar', 'Morgath', 'Kaelith', 'Thrax', 'Zulkar', 'Azar'],
      suffixes: ['le Fléau', 'du Néant', 'l’Ancien', 'de Cendre', 'l’Impérissable', 'des Profondeurs'],
    },
  },
  moba_champion: {
    default: {
      prefixes: ['Toren', 'Vesper', 'Nyx'],
      suffixes: ['l’Éclair', 'de Fer', 'l’Étoile', 'du Nord', 'du Givre'],
    },
  },
  survival_server: {
    default: {
      prefixes: ['Frost', 'Wild', 'Frontier', 'Iron', 'Timber'],
      suffixes: ['Frontier', 'Outpost', 'Wilds'],
    },
  },
  tcg_card_spell: {
    default: {
      prefixes: ['Tempête', 'Sceau', 'Flamme', 'Souffle', 'Chaîne', 'Élan', 'Onde'],
      suffixes: ['de Lumière', 'd’Ombre', 'de Fer', 'd’Éther', 'Éternelle'],
    },
  },
  speedrun_marathon: {
    default: {
      prefixes: ['Turbo', 'Hyper', 'Apex', 'Sprint', 'Pulse', 'Dash'],
      suffixes: ['Relay', 'Masters', 'Run', 'Arena'],
    },
  },
  loot_box_tier: {
    default: {
      prefixes: ['Écrin', 'Coffret', 'Trophée', 'Boîte', 'Cache', 'Sceau', 'Urne', 'Malle'],
      suffixes: ['Royal', 'Mythique', 'de Rubis', 'du Vainqueur', 'd’Argent'],
    },
  },
  retro_arcade_cabinet: {
    default: {
      prefixes: ['Hyper', 'Omega', 'Nova', 'Star', 'Space'],
      suffixes: ['Racer', 'Runner', 'Storm', 'Zero'],
    },
  },
  mmorpg_server_realm: {
    default: {
      prefixes: ['Aurelia', 'Vespera', 'Caelum', 'Thalassa', 'Borea', 'Lyria'],
      suffixes: ['Citadel', 'Haven', 'Crown', 'Frontier'],
    },
  },
  deep_learning_model: {
    default: {
      prefixes: ['Prism', 'Vector', 'Beacon', 'Cipher', 'Helix'],
      suffixes: ['Vision', 'Flow', 'Reason'],
    },
  },
  quantum_particle: {
    default: {
      prefixes: ['Ferm', 'Bos', 'Mu', 'Neutr', 'Phot', 'Glu', 'Gravit', 'Tachy'],
      suffixes: ['ino', 'on', 'quark', 'spin', 'flux', 'field'],
    },
  },
  space_telescope: {
    default: {
      prefixes: ['Optique', 'Horizons', 'Capteur', 'Miroir d’Or', 'Viseur', 'Balise', 'Écho', 'Phare'],
      suffixes: ['Huygens', 'Cassini', 'Halley', 'Lagrange', 'Boréal'],
    },
  },
  cryptographic_protocol: {
    default: {
      prefixes: ['Bastion', 'Citadel', 'Sentinel', 'Anchor', 'Vault', 'Beacon'],
      suffixes: ['Lock', 'Guard', 'Hash'],
    },
  },
  astronomy_constellation: {
    default: {
      prefixes: ['L’Épée', 'La Flèche', 'Le Loup', 'Le Lion', 'L’Aigle', 'Le Char', 'La Courbe'],
      suffixes: ['d’Été', 'd’Hiver', 'du Nord', 'Brillante', 'du Sud'],
    },
  },
  open_source_framework: {
    default: {
      prefixes: ['Swift', 'Prism', 'Pulse', 'Spark', 'Lite'],
      suffixes: ['craft', 'base', 'grid'],
    },
  },
  scientific_expedition: {
    default: {
      prefixes: ['Traversée', 'Exploration', 'Relevé', 'Programme', 'Route', 'Trace', 'Enquête', 'Sonde', 'Piste'],
      suffixes: ['Boréale', 'Australe', 'des Glaces', 'des Cimes', 'du Large'],
    },
  },
  literary_magazine: {
    default: {
      prefixes: ['L’Encre', 'Les Lettres', 'La Plume', 'Le Carnet', 'L’Atelier', 'La Tribune', 'Le Journal', 'Les Feuilles'],
      suffixes: ['des Saisons', 'de Minuit', 'du Monde', 'd’Aujourd’hui', 'Classique'],
    },
  },
  experimental_cinema: {
    default: {
      prefixes: ['Le Souffle', 'L’Aube', 'Le Miroir', 'L’Écho', 'Les Jours', 'Le Vent', 'Le Fil'],
      suffixes: ['de Pluie', 'd’Hiver', 'de Nuit', 'en Silence', 'de Brume'],
    },
  },
  indie_music_label: {
    default: {
      prefixes: ['Velvet', 'Echo', 'Harbor', 'Amber', 'Cedar', 'Drift'],
      suffixes: ['Sounds', 'Tracks', 'Vinyl'],
    },
  },
  ted_talk_theme: {
    default: {
      prefixes: ['Comprendre', 'Repenser', 'Oser', 'Construire', 'Observer', 'Libérer', 'Cultiver', 'Révéler', 'Explorer'],
      suffixes: ['la Curiosité', 'l’Écoute', 'le Courage', 'la Clarté', 'l’Avenir'],
    },
  },
  boardgame_title: {
    default: {
      prefixes: ['Aethel', 'Solis', 'Vesper', 'Aurum', 'Nautil', 'Caelum'],
      suffixes: ['Hold', 'Harbor', 'Realm'],
    },
  },
  educational_escape_game: {
    default: {
      prefixes: ['La Piste', 'L’Enquête', 'Le Code', 'Les Archives', 'L’Épreuve', 'Le Voyage', 'La Quête', 'Le Sceau'],
      suffixes: ['de Galilée', 'de Newton', 'de Curie', 'd’Archimède', 'du Temps'],
    },
  },
};

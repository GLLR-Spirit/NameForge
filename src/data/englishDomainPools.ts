import type { SubcategoryData } from '../types';

export interface LocalizedDomainPool {
  prefixes: string[];
  suffixes: string[];
  titles?: string[];
  groupTypes?: string[];
}

/**
 * Clean English / international domain vocabularies used when generation language is
 * non-French (e.g., `en`, `de`, `es`, `it`, `pt`, `nl`, etc., or `ar` phonetic transliteration),
 * preventing French articles/prepositions/phrases from leaking into English and other locales.
 */
const ENGLISH_STYLE_POOLS: Record<string, LocalizedDomainPool> = {
  'brand.luxury': {
    prefixes: [
      'Aurelia', 'Vesper', 'Lumis', 'Caelum', 'Solstice', 'Seraph', 'Valen', 'Marais',
      'Elysia', 'Bellamy', 'Vervain', 'Clarion', 'Sovereign', 'Alabaster', 'Oriel', 'Celeste',
    ],
    suffixes: [
      'Maison', 'Atelier', 'Luxe', 'Line', 'Studio', 'Craft', 'Aura', 'Vault',
      'House', 'Reserve', 'Edition', 'Collection',
    ],
  },
  'brand.tech': {
    prefixes: [
      'Vektor', 'Kinetix', 'Synapse', 'Quant', 'Nexus', 'Helix', 'Strata', 'Core',
      'Signal', 'Prism', 'Lattice', 'Metric', 'Tensor', 'Cortex', 'Logic', 'Apex',
    ],
    suffixes: [
      'Labs', 'Systems', 'Cloud', 'Works', 'Engine', 'Tech', 'Stack', 'Flow',
      'Pulse', 'Grid', 'Core', 'AI',
    ],
  },
  'brand.lifestyle': {
    prefixes: [
      'Sunday', 'Linen', 'Willow', 'Amber', 'Cedar', 'Meadow', 'Kindred', 'Harbor',
      'Bright', 'Ever', 'Clover', 'Warm', 'Still', 'Quiet', 'Moss', 'Timber',
    ],
    suffixes: [
      'Living', 'Co.', 'Goods', 'Club', 'Everyday', 'Home', 'Supply', 'Craft',
      'Studio', 'Daily', 'Collective', 'Folk',
    ],
  },
  'brand.default': {
    prefixes: [
      'North', 'Bridge', 'Harbor', 'Beacon', 'Atlas', 'Vanguard', 'Vertex', 'Clear',
      'Sterling', 'Foundry', 'Spark', 'Summit', 'Alder', 'Cairn', 'Meridian', 'Opal',
    ],
    suffixes: [
      'Works', 'Group', 'Lab', 'Brand', 'Studio', 'Co.', 'Craft', 'House',
      'Way', 'Ventures', 'Line', 'Collective',
    ],
  },
  'domain.brandable': {
    prefixes: [
      'Velo', 'Luma', 'Kora', 'Nexo', 'Zeni', 'Brio', 'Sola', 'Miro',
      'Taro', 'Orbi', 'Cora', 'Pixa', 'Aeri', 'Fino', 'Lyra', 'Koda',
    ],
    suffixes: [
      'fy', 'ly', 'io', 'ia', 'ra', 'ix', 'on', 'za',
      'va', 'lo', 'ma', 'si',
    ],
  },
  'pet_name.majestic': {
    prefixes: [
      'King', 'Noble', 'Royal', 'Duke', 'Baron', 'Earl', 'Prince', 'Crown',
      'Caesar', 'Rex', 'Sovereign', 'Regal', 'Gold', 'Silver', 'High', 'Grand',
    ],
    suffixes: [
      'leon', 'paw', 'mane', 'crest', 'heart', 'fang', 'wing', 'tail',
      'stride', 'noble', 'crown', 'coat',
    ],
  },
  'shop.boutique': {
    prefixes: [
      'Velvet', 'Linen', 'Amber', 'Cedar', 'Silver', 'Sunlit', 'Quiet', 'Gilded',
      'Harbor', 'Oak', 'Ivory', 'Bramble', 'Pearl', 'Rowan', 'Lantern', 'Clover',
    ],
    suffixes: [
      'Parlor', 'Gallery', 'Corner', 'Mercantile', 'Studio', 'House', 'Workshop', 'Loft',
      'Boutique', 'Room', 'Salon', 'Arcade',
    ],
  },
  'shop.cafe': {
    prefixes: [
      'Roast', 'Amber', 'Velvet', 'Copper', 'Morning', 'Bramble', 'Cedar', 'Golden',
      'Steam', 'Harbor', 'Caramel', 'Toasted', 'Honey', 'Maple', 'Clover', 'Hazel',
    ],
    suffixes: [
      'House', 'Cup', 'Roastery', 'Table', 'Bench', 'Counter', 'Corner', 'Brew',
      'Press', 'Kettle', 'Bistro', 'Bar',
    ],
  },
  'shop.default': {
    prefixes: [
      'Copper', 'Market', 'North', 'Silver', 'Harbor', 'Green', 'Bright', 'Oak',
      'Stone', 'Timber', 'Willow', 'Bridge', 'Alder', 'Beacon', 'Meadow', 'River',
    ],
    suffixes: [
      'Goods', 'Market', 'Workshop', 'Hall', 'Supply', 'Depot', 'Square', 'House',
      'Store', 'Trade', 'Exchange', 'Emporium',
    ],
  },
  'service.premium': {
    prefixes: [
      'Summit', 'Vanguard', 'Atlas', 'Apex', 'Beacon', 'Sterling', 'Horizon', 'Meridian',
      'Crest', 'Northstar', 'Harbor', 'Pinnacle', 'Sovereign', 'Aegis', 'Foundry', 'Bridge',
    ],
    suffixes: [
      'Advisory', 'Partners', 'Concierge', 'Associates', 'Group', 'Circle', 'Desk', 'Guild',
      'Counsel', 'Practices', 'Trust', 'Solutions',
    ],
  },
  'service.audit': {
    prefixes: [
      'Clarity', 'Verity', 'Ledger', 'Signal', 'Metric', 'Sentinel', 'Anchor', 'Proof',
      'Compass', 'Benchmark', 'Rigour', 'Clear', 'Precision', 'Axis', 'Standard', 'Vector',
    ],
    suffixes: [
      'Audit', 'Assurance', 'Review', 'Compliance', 'Metrics', 'Diagnostics', 'Inspect', 'Control',
      'Verification', 'Practice', 'Advisory', 'Index',
    ],
  },
  'service.default': {
    prefixes: [
      'Bridge', 'Harbor', 'Relay', 'Beacon', 'Craft', 'Steward', 'Field', 'Cornerstone',
      'Compass', 'Anchor', 'Path', 'Keystone', 'Lantern', 'Direct', 'Solid', 'True',
    ],
    suffixes: [
      'Services', 'Desk', 'Works', 'Support', 'Care', 'Agency', 'Team', 'Guild',
      'Collective', 'Network', 'Partners', 'Bureau',
    ],
  },
  'slogan.action': {
    prefixes: [
      'Build', 'Launch', 'Shape', 'Unlock', 'Advance', 'Spark', 'Elevate', 'Refine',
      'Craft', 'Drive', 'Ignite', 'Scale', 'Lead', 'Master', 'Forge', 'Move',
    ],
    suffixes: [
      'Your Future', 'Bold Ideas', 'Real Impact', 'Next Horizons', 'Every Step', 'Tomorrow Today',
      'True Clarity', 'Lasting Value', 'Great Work', 'New Ground', 'Quiet Strength', 'Shared Goals',
    ],
  },
  'slogan.vision': {
    prefixes: [
      'The Art of', 'Built for', 'Shaping', 'Reimagining', 'Designed Around', 'Beyond',
      'Crafting', 'Guided by', 'Devoted to', 'Rooted in', 'Inspired by', 'Made for',
      'Opening Doors to', 'A New Standard in', 'Looking Toward',
    ],
    suffixes: [
      'Human Progress', 'Quiet Excellence', 'Bold Thinking', 'Shared Ambition', 'Modern Craft', 'Clear Purpose',
      'Open Horizons', 'Better Days', 'Meaningful Design', 'Enduring Quality', 'Simple Genius', 'Creative Freedom',
    ],
  },
  'slogan.default': {
    prefixes: [
      'At the Heart of', 'Your Partner in', 'Moving Forward with', 'The Power of', 'Closer to',
      'Built Around', 'Designed for', 'Focused on', 'Trusted for', 'Engineered for',
      'Created with', 'Ready for', 'Powered by', 'Committed to', 'Simplified for',
    ],
    suffixes: [
      'Real Ideas', 'Everyday Clarity', 'Smart Teams', 'Better Work', 'Modern Makers', 'Global Reach',
      'True Speed', 'Bold Builders', 'Simple Flow', 'Steady Growth', 'Smarter Habits', 'Seamless Craft',
    ],
  },
  'book.thriller': {
    prefixes: [
      'The Silence of', 'Shadow Over', 'The Last Witness of', 'Whispers Behind', 'Midnight at',
      'Fracture in', 'After the', 'No Trace at', 'Deadlock on', 'The Vanishing of',
      'Beneath the', 'Cold Trail to', 'Smoke Over', 'Letters from', 'The Lock at',
    ],
    suffixes: [
      'Blackwood Harbor', 'Hollow Pines', 'the Glass Tower', 'Winter Station', 'Red Pier',
      'Broken Oath', 'Closed Door', 'Salt Marsh', 'North Bridge', 'Ashen Ridge',
      'Grey Ward', 'Signal Hill',
    ],
  },
  'book.fantasy': {
    prefixes: [
      'Chronicles of', 'Legacy of', 'The Crown of', 'Song of', 'Ashes of', 'Spires of',
      'Oath of', 'Keepers of', 'Throne of', 'Blood of', 'Gates of', 'Starlight Over',
      'Wardens of', 'Echoes of', 'Shield of',
    ],
    suffixes: [
      'Sunken Realms', 'Iron Winter', 'Amber Dawn', 'Silver Thorns', 'Fallen Stars', 'Ashen Kings',
      'Old Crowns', 'Shattered Moons', 'Deep Forests', 'Frost Kingdoms', 'Gilded Storms', 'Broken Seals',
    ],
  },
  'book.default': {
    prefixes: [
      'Beyond the', 'Under the Sign of', 'Season of', 'Echoes of', 'Notes from', 'Letters to',
      'Way to', 'Voices of', 'Before the', 'Hours in', 'Portraits of', 'Journeys Through',
      'Windows on', 'Light Across', 'Memories of',
    ],
    suffixes: [
      'Distant Shores', 'Quiet Summers', 'Changing Winds', 'Hidden Roads', 'Broken Bridges', 'High Tide',
      'Clear Light', 'Silent Hills', 'Winter Gardens', 'Open Skies', 'Old Harbors', 'Long Mornings',
    ],
  },
  'character.protagonist': {
    prefixes: [
      'Theo', 'Alex', 'Julian', 'Arthur', 'Miles', 'Emile', 'Gideon', 'Bastien',
      'Caleb', 'Rowan', 'Elena', 'Clara', 'Nora', 'Liam', 'Marcus', 'Iris',
    ],
    suffixes: [
      'Vandor', 'Beaufort', 'Sterling', 'Castle', 'Rivers', 'Mercer', 'Hawthorne', 'Ashford',
      'Bennett', 'Hayes', 'Caldwell', 'Sinclair',
    ],
  },
  'character.antagonist': {
    prefixes: [
      'Victor', 'Gideon', 'Malor', 'Octave', 'Severin', 'Leopold', 'Cassian', 'Corvin',
      'Morgana', 'Draven', 'Lucian', 'Vesper', 'Dorian', 'Evelyn', 'Alistair', 'Sabine',
    ],
    suffixes: [
      'Blackwood', 'Vane', 'Crow', 'Delaney', 'Thorne', 'Graves', 'Morval', 'Ashmore',
      'Vance', 'Coldwell', 'Rutherford', 'Rook',
    ],
  },
  'character.default': {
    prefixes: [
      'Felix', 'Anthony', 'Leo', 'Robin', 'Simon', 'Mathias', 'Paul', 'Hugo',
      'Owen', 'Arthur', 'Sophie', 'Hannah', 'Claire', 'Nathan', 'Samuel', 'Audrey',
    ],
    suffixes: [
      'Fountain', 'Morel', 'Dumont', 'Carter', 'Lambert', 'Mercer', 'Faber', 'Bennett',
      'Walker', 'Porter', 'Brooks', 'Miller',
    ],
  },
  'videogame.action': {
    prefixes: [
      'Iron', 'Shadow', 'Apex', 'Crimson', 'Hyper', 'Neon', 'Rogue', 'Titan',
      'Phantom', 'Strike', 'Storm', 'Steel', 'Omega', 'Vector', 'Zero',
    ],
    suffixes: [
      'Protocol', 'Vanguard', 'Reckoning', 'Breach', 'Frontline', 'Warfare', 'Horizon', 'Velocity',
      'Strike', 'Siege', 'Overdrive', 'Zero',
    ],
  },
  'videogame.indie': {
    prefixes: [
      'Hollow', 'Lantern', 'Moss', 'Paper', 'Starlit', 'Driftwood', 'Clockwork', 'Silent',
      'Glass', 'Autumn', 'Copper', 'Feather', 'Cloud', 'Pebble', 'Amber',
    ],
    suffixes: [
      'Odyssey', 'Hollow', 'Valley', 'Chronicle', 'Garden', 'Harbor', 'Tale', 'Meadow',
      'Isle', 'Passage', 'Beacon', 'Song',
    ],
  },
  'videogame.default': {
    prefixes: [
      'Astral', 'Chrono', 'Echo', 'Nova', 'Ember', 'Aether', 'Cinder', 'Lunar',
      'Frost', 'Solar', 'Mythic', 'Cobalt', 'Arcane', 'Distant', 'Wild',
    ],
    suffixes: [
      'Odyssey', 'Realms', 'Frontier', 'Quest', 'Legacy', 'Chronicles', 'Sanctum', 'Legends',
      'Awakening', 'Drift', 'Horizon', 'Citadel',
    ],
  },
  'guild.raid': {
    prefixes: [
      'Obsidian', 'Crimson', 'Ironclad', 'Ashen', 'Mythic', 'Eternal', 'Sovereign', 'Apex',
      'Celestial', 'Shadow', 'Vanguard', 'Titans of', 'Keepers of', 'Knights of', 'Wardens of',
    ],
    suffixes: [
      'Covenant', 'Bastion', 'Citadel', 'Raiders', 'Ascendant', 'Dominion', 'Order', 'Legion',
      'Vanguard', 'Sanctum', 'Reckoning', 'Phoenix',
    ],
  },
  'guild.pvp': {
    prefixes: [
      'Venom', 'Razor', 'Blitz', 'Phantom', 'Gladiator', 'Predator', 'Savage', 'Rogue',
      'Blood', 'Swift', 'Merciless', 'Iron', 'Storm', 'Zero', 'Ruthless',
    ],
    suffixes: [
      'Squad', 'Syndicate', 'Reapers', 'Hunters', 'Fury', 'Blade', 'Pack', 'Force',
      'Raiders', 'Strike', 'Hounds', 'Wolves',
    ],
  },
  'guild.default': {
    prefixes: [
      'Silver', 'Golden', 'Wanderer', 'Starlight', 'Lantern', 'Harbor', 'Compass', 'Summit',
      'Dawn', 'Northstar', 'Emerald', 'Hearth', 'Valor', 'Beacon', 'Oak',
    ],
    suffixes: [
      'Fellowship', 'Circle', 'Alliance', 'Guild', 'Watch', 'Collective', 'Company', 'Brotherhood',
      'Banner', 'Union', 'Pact', 'Council',
    ],
  },
  'youtube.tech': {
    prefixes: [
      'Inside', 'Deep Dive', 'Field Notes', 'Blueprint', 'Hardware', 'Kernel', 'Silicon', 'Circuit',
      'Codebase', 'Debug', 'Byte', 'Signal', 'Stack', 'Benchmark', 'Open Source',
    ],
    suffixes: [
      'Lab', 'Daily', 'Decoded', 'Review', 'Unpacked', 'Engineering', 'Show', 'Breakdown',
      'Chronicles', 'Cast', 'Workshop', 'Central',
    ],
  },
  'youtube.gaming': {
    prefixes: [
      'Pixel', 'Level Up', 'Boss Fight', 'Speedrun', 'Respawn', 'Arcade', 'Crit Hit', 'Loot Drop',
      'Controller', 'Quest', 'Arena', 'High Score', 'Lore', 'Combo', 'Frame One',
    ],
    suffixes: [
      'Central', 'Play', 'Live', 'Chronicles', 'Network', 'Channel', 'TV', 'Squad',
      'Show', 'Digest', 'World', 'Zone',
    ],
  },
  'youtube.default': {
    prefixes: [
      'The Corner of', 'Chronicles of', 'Inside', 'Studio', 'Field Notes on', 'Deep Dive into',
      'Makers of', 'Stories from', 'Behind', 'Notes on', 'Exploring', 'Focus on',
      'Spotlight on', 'Journey into', 'Weekly',
    ],
    suffixes: [
      'Tech', 'Cinema', 'Design', 'History', 'Science', 'Stories', 'Craft', 'Gaming',
      'Culture', 'Music', 'Makers', 'Discovery',
    ],
  },
  'podcast.talk': {
    prefixes: [
      'Voices from', 'Roundtable on', 'Behind the Scenes of', 'Coffee &', 'Open Mic on', 'Late Night',
      'Conversations with', 'Inside Stories of', 'Unfiltered', 'Studio Talks:', 'Crossroads of',
      'Candid Hours:', 'After Hours with', 'The Desk of', 'Close Up on',
    ],
    suffixes: [
      'Founders', 'Makers', 'Writers', 'Designers', 'Engineers', 'Builders', 'Thinkers',
      'Artists', 'Editors', 'Producers', 'Leaders', 'Innovators',
    ],
  },
  'podcast.growth': {
    prefixes: [
      'Next Step in', 'Keys to', 'Leaders &', 'Strategy for', 'Clarity on', 'Blueprint for',
      'Pathways to', 'Playbooks for', 'Compounding', 'Momentum in', 'Foundations of', 'Scale Without',
      'Edge of', 'Craft of', 'Signal in',
    ],
    suffixes: [
      'Growth', 'Scale', 'Craft', 'Leadership', 'Product', 'Systems', 'Impact',
      'Strategy', 'Execution', 'Focus', 'Teams', 'Mastery',
    ],
  },
  'podcast.default': {
    prefixes: [
      'Waves of', 'Open Signal:', 'In Focus:', 'Dispatches from', 'Voices of', 'Signal on',
      'Field Audio:', 'Stories Around', 'Listening to', 'Soundtrack of', 'Horizon on', 'Letters on',
      'Notes from', 'Deep Listen:', 'Perspective on',
    ],
    suffixes: [
      'Tomorrow', 'Culture', 'Science', 'Work', 'Music', 'Discovery', 'World',
      'Design', 'Cities', 'Society', 'Ideas', 'Craft',
    ],
  },
  'handle.cyber': {
    prefixes: [
      'Cyber', 'Null', 'Hex', 'Byte', 'Neon', 'Root', 'Proxy', 'Packet',
      'Cipher', 'Kernel', 'Glitch', 'Syn', 'Optik', 'Vector', 'Zero', 'Flux',
    ],
    suffixes: [
      '_dev', '_sec', '_node', '_404', '_sys', '_hex', '_bit', '_net',
      '_ops', '_io', '_exe', '_core',
    ],
  },
  'handle.aesthetic': {
    prefixes: [
      'Moon', 'Velvet', 'Sora', 'Aura', 'Sunlit', 'Mist', 'Starlight', 'Soft',
      'Cloud', 'Amber', 'Petal', 'Linen', 'Willow', 'Breeze', 'Honey', 'Clover',
    ],
    suffixes: [
      'pastel', 'honey', 'glen', 'cloud', 'dream', 'bloom', 'flora', 'glow',
      'dew', 'petal', 'song', 'light',
    ],
  },
  'handle.default': {
    prefixes: [
      'North', 'Echo', 'Nova', 'Rowan', 'Cedar', 'Atlas', 'Koda', 'Orion',
      'Milo', 'Soren', 'River', 'Wren', 'Lumen', 'Briar', 'Juno', 'Harbor',
    ],
    suffixes: [
      'works', 'hq', 'daily', 'writes', 'makes', 'notes', 'studio', 'lab',
      'craft', 'zone', 'live', 'field',
    ],
  },
  'community.hub': {
    prefixes: [
      'Harbor of', 'Workshop of', 'Hive of', 'Commons for', 'Circle of', 'Commons of',
      'Guild of', 'Foundry for', 'Beacon of', 'Forum for', 'Table of', 'Loft of',
      'Agora of', 'Square of', 'Studio for',
    ],
    suffixes: [
      'Builders', 'Pioneers', 'Makers', 'Designers', 'Free Thinkers', 'Writers',
      'Creators', 'Engineers', 'Founders', 'Scholars', 'Artists', 'Curators',
    ],
  },
  'community.default': {
    prefixes: [
      'Alliance', 'Guild', 'League', 'Circle', 'Union', 'Network', 'Commons', 'Forum',
      'Chapter', 'Council', 'Hub', 'Collective', 'Exchange', 'Harbor', 'Society',
    ],
    suffixes: [
      'Open', 'Modern', 'Horizon', 'Unity', 'Spark', 'Share', 'Future', 'Craft',
      'North', 'Bridge', 'Forward', 'Commons',
    ],
  },
  'placename.coastal': {
    prefixes: [
      'Port', 'Bay', 'Cape', 'Isle', 'Harbor', 'Cove', 'Point', 'Reef',
      'Landing', 'Sound', 'Head', 'Quay', 'Anchorage', 'Cliff', 'Firth',
    ],
    suffixes: [
      'of Mists', 'Haven', 'Gulls', 'Windward', 'Tempest', 'Reach', 'Foam', 'Light',
      'Tide', 'Beacon', 'Saltwind', 'Shell',
    ],
  },
  'placename.mountain': {
    prefixes: [
      'Mount', 'Peak', 'Vale', 'Pass', 'Fort', 'Gorge', 'Crag', 'Ridge',
      'Highland', 'Summit', 'Hollow', 'Gap', 'Bluff', 'Tor', 'Spire',
    ],
    suffixes: [
      'Ironwood', 'Eagles', 'Graystone', 'Frostfall', 'Wolftrack', 'Highkeep', 'Coldwater', 'Stonegate',
      'Pinecrest', 'Stormwatch', 'Granite', 'Snowpeak',
    ],
  },
  'placename.default': {
    prefixes: [
      'Oak', 'Silver', 'High', 'Briar', 'Brook', 'Sun', 'Mill', 'Stone',
      'Alder', 'Ash', 'Fair', 'West', 'North', 'Green', 'Red', 'Clear',
    ],
    suffixes: [
      'ford', 'wood', 'haven', 'bridge', 'field', 'ridge', 'brook', 'dale',
      'stead', 'bourne', 'well', 'bury',
    ],
  },
  'project.secret': {
    prefixes: [
      'Operation', 'Project', 'Initiative', 'Protocol', 'Directive', 'Program', 'Mission', 'Taskforce',
      'Code', 'Campaign', 'Blueprint', 'Plan', 'Mandate', 'Cipher', 'Dossier',
    ],
    suffixes: [
      'Aurora', 'Nemesis', 'Olympus', 'Phoenix', 'Titan', 'Aegis', 'Valkyrie', 'Chimera',
      'Obsidian', 'Horizon', 'Helios', 'Vanguard',
    ],
  },
  'project.default': {
    prefixes: [
      'Project', 'Initiative', 'Venture', 'Blueprint', 'Program', 'Launchpad', 'Foundry', 'Bridge',
      'Track', 'Sprint', 'Atlas', 'Northstar', 'Signal', 'Horizon', 'Anchor',
    ],
    suffixes: [
      'Atlas', 'Beacon', 'Mosaic', 'Compass', 'Meridian', 'Spark', 'Keystone', 'Harbor',
      'Pulse', 'Orbit', 'Summit', 'Catalyst',
    ],
  },
  'framework.method': {
    prefixes: [
      'The', 'Core', 'Open', 'Signal', 'North', 'Atlas', 'Bridge', 'Compass',
      'Clear', 'Agile', 'Lean', 'Deep', 'Unified', 'Modular', 'First',
    ],
    suffixes: [
      'Method', 'Matrix', 'Framework', 'Compass', 'Pillar', 'Focus', 'Impact', 'Synergy',
      'Pulse', 'Loop', 'Protocol', 'Model',
    ],
  },
  'framework.default': {
    prefixes: [
      'System', 'Signal', 'Pattern', 'Core', 'Open', 'Anchor', 'Vector', 'Ladder',
      'Prism', 'Grid', 'Cycle', 'Bridge', 'Arc', 'Scale', 'Flow',
    ],
    suffixes: [
      'Architecture', 'Canvas', 'Engine', 'Playbook', 'Stack', 'Blueprint', 'Index', 'Grid',
      'System', 'Protocol', 'Compass', 'Standard',
    ],
  },
  'geometric_object.polyhedron': {
    prefixes: [
      'Hyper', 'Aero', 'Tetra', 'Ortho', 'Stella', 'Mytho', 'Chrono', 'Omni',
      'Hexa', 'Dodeca', 'Iso', 'Poly', 'Crypto', 'Heli', 'Prism',
    ],
    suffixes: [
      'hedron', 'tope', 'form', 'graph', 'pod', 'tessera', 'sphere', 'lattice',
      'dome', 'mesh', 'gon', 'prism',
    ],
  },
  'travel_agency.horizon': {
    prefixes: [
      'Terra', 'Helios', 'Odyssey', 'Alti', 'Vasco', 'Nomad', 'Atlas', 'Aura',
      'Merid', 'Solis', 'Boreal', 'Windward', 'Wander', 'Starlight', 'Coast',
    ],
    suffixes: [
      'voyages', 'expeditions', 'tours', 'escapes', 'horizon', 'routes', 'travel', 'trails',
      'adventures', 'journeys', 'passages', 'way',
    ],
  },
  'webradio_station.waves': {
    prefixes: [
      'Waves', 'Radio', 'Flux', 'Vibe', 'Signal', 'Echo', 'Air', 'Sonic',
      'Pulse', 'Groove', 'Drift', 'Hertz', 'Stereo', 'Orbit', 'Velvet',
    ],
    suffixes: [
      'fm', 'web', 'live', 'wave', 'stream', 'cast', 'station', 'beat',
      'sound', 'air', 'loop', 'radio',
    ],
  },
  'magical_girl.sparkle': {
    prefixes: [
      'Cure', 'Prism', 'Starlight', 'Chibi', 'Luna', 'Stella', 'Mimi', 'Aura',
      'Fairy', 'Twinkle', 'Crystal', 'Cherry', 'Celestia', 'Pixie', 'Ribbon',
    ],
    suffixes: [
      'Heart', 'Star', 'Moon', 'Rose', 'Angel', 'Bloom', 'Spark', 'Wish',
      'Glow', 'Wings', 'Dream', 'Melody',
    ],
  },
  'event.summit': {
    prefixes: [
      'Summit on', 'Forum for', 'Symposium on', 'Congress of', 'Dialogue on', 'Assembly for',
      'Conclave on', 'Keynote:', 'Founders at', 'Next Wave:', 'Global', 'Annual',
      'Frontiers of', 'Alliance for', 'Focus on',
    ],
    suffixes: [
      'Future Work', 'Clean Tech', 'Open Systems', 'Design Craft', 'Deep Science', 'Digital Trust',
      'AI Ethics', 'Smart Cities', 'Modern Teams', 'Creative Capital', 'Climate Action', 'Leadership',
    ],
  },
  'event.festival': {
    prefixes: [
      'Nights of', 'Festival of', 'Electro', 'Lights of', 'Echoes of', 'Summer at',
      'Sound of', 'Solstice at', 'Lanterns over', 'Rhythm of', 'Sunset at', 'Stage of',
      'Open Air:', 'Midwinter', 'Harbor',
    ],
    suffixes: [
      'Solstice', 'Harbor', 'Horizon', 'Lanterns', 'Resonance', 'Bloom', 'Pulse',
      'Mirage', 'Tides', 'Meadow', 'Starlight', 'Waves',
    ],
  },
  'event.default': {
    prefixes: [
      'Gathering of', 'Summit on', 'Evening of', 'Challenge for', 'Crossroads of', 'Forum of',
      'Showcase of', 'Workshop on', 'Week of', 'Festival of', 'Expo for', 'Exchange on',
      'Spotlight on', 'Days of', 'Roundtable:',
    ],
    suffixes: [
      'Builders', 'Ideas', 'Sound', 'Craft', 'Vision', 'Future', 'Creators',
      'Makers', 'Design', 'Innovation', 'Culture', 'Discovery',
    ],
  },
  'culinary.gourmet': {
    prefixes: [
      'Essence of', 'Medley of', 'Symphony of', 'Velvet', 'Roasted', 'Glazed', 'Crisp',
      'Seared', 'Braised', 'Poached', 'Caramelized', 'Smoked', 'Infused', 'Whipped', 'Charred',
    ],
    suffixes: [
      'Wild Lobster', 'Black Truffle', 'Golden Chanterelle', 'Forest Berries', 'Toasted Hazelnut',
      'Sea Salt', 'Saffron Broth', 'Artichoke Heart', 'Heirloom Carrot', 'Spring Morels',
      'Blood Orange', 'Roasted Shallot',
    ],
  },
  'culinary.cocktail': {
    prefixes: [
      'Mist of', 'Tears of', 'Elixir of', 'Nectar of', 'Dew of', 'Secret of', 'Whisper of',
      'Spark of', 'Velvet', 'Bitter', 'Smoked', 'Golden', 'Ruby', 'Amber', 'Midnight',
    ],
    suffixes: [
      'Midnight', 'Sapphire', 'Saffron', 'Ember', 'Frost', 'Moonlight', 'Dark Cacao', 'Citrus',
      'Bergamot', 'Juniper', 'Wild Fig', 'Cardamom',
    ],
  },
  'culinary.default': {
    prefixes: [
      'Stew of', 'Kettle of', 'Feast of', 'Pie of', 'Roast of', 'Velvet Soup of',
      'Harvest Plate of', 'Tart of', 'Skillet of', 'Bistro Bowl of', 'Crusty Loaf of',
      'Herb Bake of', 'Simmered Pot of', 'Platter of', 'Griddle of',
    ],
    suffixes: [
      'Old Mill', 'Woodland Keeper', 'Merry Baker', 'Green Valley', 'Golden Woods', 'Clear Brook',
      'Red Inn', 'Stone Hearth', 'Harbor Market', 'Orchard House', 'Briar Cottage', 'Meadow Farm',
    ],
  },
  'weapon.blade': {
    prefixes: [
      'Flame', 'Storm', 'Frost', 'Shadow', 'Sun', 'Star', 'Iron', 'Dawn',
      'Crimson', 'Night', 'Thunder', 'Ash', 'Gale', 'Silver', 'Blood',
    ],
    suffixes: [
      'breaker', 'edge', 'fang', 'splitter', 'caller', 'warden', 'thorn', 'cleaver',
      'seeker', 'reaver', 'song', 'bite',
    ],
  },
  'weapon.artifact': {
    prefixes: [
      'Astral', 'Chrono', 'Solar', 'Aether', 'Obsidian', 'Sanctum', 'Oath', 'Runic',
      'Celestial', 'Relic', 'Titan', 'Ebon', 'Gilded', 'Void', 'Sacred',
    ],
    suffixes: [
      'Scepter', 'Halberd', 'Trident', 'Glaive', 'Spear', 'Hammer', 'Bow', 'Scythe',
      'Mace', 'Aegis', 'Rapier', 'Claymore',
    ],
  },
  'spell.arcane': {
    prefixes: [
      'Aether', 'Astral', 'Rune', 'Prism', 'Chrono', 'Void', 'Star', 'Arcane',
      'Lumen', 'Sigil', 'Ether', 'Phase', 'Nexus', 'Cipher', 'Mirage',
    ],
    suffixes: [
      'sphere', 'barrier', 'lance', 'weave', 'sigil', 'cascade', 'shield', 'pulse',
      'ward', 'flare', 'bind', 'rift',
    ],
  },
  'spell.elemental': {
    prefixes: [
      'Storm', 'Frost', 'Ember', 'Thunder', 'Gale', 'Tidal', 'Solar', 'Stone',
      'Magma', 'Glacier', 'Cyclone', 'Spark', 'Quake', 'Blizzard', 'Cinder',
    ],
    suffixes: [
      'surge', 'tempest', 'fury', 'deluge', 'burst', 'spire', 'crown', 'flare',
      'vortex', 'lance', 'wave', 'blast',
    ],
  },
  'tavern.cozy_inn': {
    prefixes: [
      'The Golden', 'The Silver', 'The Wandering', 'The Hearth', 'The Oak', 'The Amber',
      'The Lantern', 'The Merry', 'The Quiet', 'The Warm', 'The Mossy', 'The Sleepy',
      'The Copper', 'The Maple', 'The Old',
    ],
    suffixes: [
      'Tankard', 'Traveler', 'Stag', 'Anchor', 'Shield', 'Feather', 'Barrel', 'Flagon',
      'Kettle', 'Fox', 'Hearth', 'Badger',
    ],
  },
  'tavern.smuggler': {
    prefixes: [
      'The Rusty', 'The Broken', 'The Drunken', 'The Salt', 'The Blind', 'The Smoked',
      'The Lost', 'The Crooked', 'The Black', 'The Sunken', 'The Red', 'The Silent',
      'The Stormy', 'The Iron', 'The Bitter',
    ],
    suffixes: [
      'Anchor', 'Compass', 'Gull', 'Sailor', 'Mug', 'Oar', 'Ship', 'Bell',
      'Cutlass', 'Lantern', 'Parrot', 'Barrel',
    ],
  },
  'dungeon.catacomb': {
    prefixes: [
      'Mausoleum of', 'Necropolis of', 'Crypt of', 'Vault of', 'Barrow of', 'Sanctum of',
      'Ossuary of', 'Sepulcher of', 'Catacombs of', 'Tomb of', 'Shrine of', 'Halls of',
      'Chambers of', 'Cellars of', 'Cloister of',
    ],
    suffixes: [
      'Fallen Kings', 'Silent Bone', 'Ashen Choirs', 'Forgotten Seals', 'Iron Tombs', 'Pale Dust',
      'Weeping Stone', 'Lost Crowns', 'Cold Relics', 'Hollow Saints', 'Grim Oaths', 'Sunken Bells',
    ],
  },
  'dungeon.abyss': {
    prefixes: [
      'Abyss of', 'Pit of', 'Chasm of', 'Hollow of', 'Rift of', 'Trench of',
      'Maw of', 'Deep of', 'Gullet of', 'Labyrinth of', 'Shadow of', 'Gorge of',
      'Cavern of', 'Sinkhole of', 'Underworld of',
    ],
    suffixes: [
      'Obsidian', 'Dark Wyrms', 'Deep Echoes', 'Endless Night', 'Black Salt', 'Cold Fire',
      'Shattered Echoes', 'Drowned Stars', 'Basalt Teeth', 'Blind Shadows', 'Ashen Mist', 'Deep Silence',
    ],
  },
  'steampunk.airship': {
    prefixes: [
      'The Brass', 'The Skyborne', 'The Copper', 'The Zephyr', 'The Cloud', 'The Clockwork',
      'The Steam', 'The Ironclad', 'The Aloft', 'The Riveted', 'The Piston', 'The Storm',
      'The Gilded', 'The Windward', 'The Aero',
    ],
    suffixes: [
      'Albatross', 'Vanguard', 'Sovereign', 'Nautilus', 'Navigator', 'Comet', 'Horizon', 'Tempest',
      'Peregrine', 'Courier', 'Galleon', 'Corsair',
    ],
  },
  'steampunk.clockwork': {
    prefixes: [
      'The Brass', 'The Chrono', 'The Piston', 'The Copper', 'The Pendulum', 'The Gearwork',
      'The Cogwheel', 'The Mainspring', 'The Iron', 'The Valve', 'The Boiler', 'The Ratchet',
      'The Dynamo', 'The Balance', 'The Torsion',
    ],
    suffixes: [
      'Regulator', 'Automaton', 'Engine', 'Astrolabe', 'Calibrator', 'Turbine',
      'Chronometer', 'Golem', 'Compass', 'Oscillator', 'Foundry', 'Mechanism',
    ],
  },
  'mythic_creature.chimera': {
    prefixes: [
      'Drak', 'Gryph', 'Manti', 'Krak', 'Basili', 'Cerb', 'Wyv', 'Chimer',
      'Hydr', 'Sphin', 'Lev', 'Pegas', 'Gorg', 'Fenir', 'Banshe',
    ],
    suffixes: [
      'ora', 'ion', 'ax', 'is', 'on', 'eus', 'rak', 'or',
      'en', 'oth', 'anth', 'ar',
    ],
  },
  'restaurant.bistro': {
    prefixes: [
      'Bistro', 'The Copper', 'The Olive', 'The Corner', 'Market', 'Garden', 'Oak', 'Sunlit',
      'Harbor', 'Linen', 'Stone', 'Maple', 'Willow', 'Red Brick', 'Fireside',
    ],
    suffixes: [
      'Table', 'Kitchen', 'Pantry', 'Hearth', 'Plate', 'Bistro', 'Fork', 'Hall',
      'Pot', 'Cellar', 'Corner', 'Grill',
    ],
  },
  'restaurant.chic': {
    prefixes: [
      'Atrium', 'Velvet', 'Saffron', 'Solstice', 'Glasshouse', 'Cedar', 'Amber', 'Harbor',
      'Ivory', 'Alabaster', 'Oriel', 'Marble', 'Serene', 'Vesper', 'Aurelia',
    ],
    suffixes: [
      'Room', 'Table', 'Terrace', 'Dining', 'House', 'Pavilion', 'Gallery', 'Salon',
      'Conservatory', 'Bistro', 'Atelier', 'Lounge',
    ],
  },
  'coffee_shop.default': {
    prefixes: [
      'Copper', 'North', 'Roast', 'Amber', 'Cedar', 'Morning', 'Harbor', 'Velvet',
      'Maple', 'Steep', 'Golden', 'Bramble', 'Hazel', 'Quiet', 'Brick',
    ],
    suffixes: [
      'Coffee', 'Roasters', 'Espresso', 'Kettle', 'Brew', 'Press', 'Corner', 'House',
      'Bar', 'Beans', 'Cup', 'Table',
    ],
  },
  'coffee_shop.roaster': {
    prefixes: [
      'Copper', 'North', 'Roast', 'Amber', 'Cedar', 'Morning', 'Harbor', 'Velvet',
      'Origin', 'Small Batch', 'Sunlit', 'Timber', 'Iron', 'Wild', 'Highland',
    ],
    suffixes: [
      'Roasters', 'Coffee', 'Espresso', 'Beans', 'Brew', 'Kettle', 'Press', 'Lab',
      'Roastery', 'Mill', 'Co.', 'Works',
    ],
  },
  'bakery.artisan': {
    prefixes: [
      'Golden', 'Hearth', 'Wheat', 'Briar', 'Stone', 'Morning', 'Honey', 'Mill',
      'Sourdough', 'Warm', 'Sweet', 'Rye', 'Butter', 'Oat', 'Crusty',
    ],
    suffixes: [
      'Loaf', 'Bakery', 'Oven', 'Crust', 'Grain', 'Mill', 'Pastry', 'Crumb',
      'Hearth', 'Roll', 'Bakehouse', 'Boulanger',
    ],
  },
  'food_truck.street': {
    prefixes: [
      'Rolling', 'Street', 'Sizzling', 'Urban', 'Smokey', 'Spice', 'Crispy', 'Neon',
      'Midnight', 'Flame', 'Baja', 'Golden', 'Crunch', 'Savory', 'Turbo',
    ],
    suffixes: [
      'Wagon', 'Kitchen', 'Cart', 'Grill', 'Bites', 'Van', 'Skillet', 'Express',
      'Truck', 'Shack', 'Taco', 'Smoke',
    ],
  },
  'clothing_brand.urban': {
    prefixes: [
      'Nord', 'Ver', 'Aest', 'Kult', 'Mork', 'Raw', 'Form', 'Axis',
      'Brut', 'Sartor', 'Concrete', 'District', 'Loft', 'Shade', 'Metro',
    ],
    suffixes: [
      'label', 'studio', 'wear', 'atelier', 'craft', 'dept', 'line', 'works',
      'thread', 'supply', 'archive', 'fit',
    ],
  },
  'jewelry_brand.precious': {
    prefixes: [
      'Aur', 'Lumi', 'Solis', 'Argent', 'Cael', 'Gem', 'Opal', 'Astr',
      'Vera', 'Orea', 'Beryl', 'Pearl', 'Ivory', 'Carat', 'Prism',
    ],
    suffixes: [
      'ia', 'is', 'a', 'or', 'ance', 'ette', 'line', 'el',
      'io', 'lux', 'gems', 'fine',
    ],
  },
  'cosmetics_brand.clean': {
    prefixes: [
      'Botan', 'Pure', 'Derm', 'Aura', 'Flora', 'Vege', 'Seren', 'Lys',
      'Hydra', 'Alba', 'Oat', 'Dew', 'Silk', 'Bloom', 'Herba',
    ],
    suffixes: [
      'derm', 'care', 'lab', 'bio', 'ceutic', 'ia', 'is', 'glow',
      'pure', 'skin', 'balm', 'botanics',
    ],
  },
  'hotel_name.resort': {
    prefixes: [
      'The Horizon', 'The Cedar', 'The Harbor', 'The Pine', 'The Lakeview', 'The Summit',
      'The Shore', 'The Meadow', 'The Ridge', 'The Driftwood', 'The Sunlit', 'The Willow',
      'The Silver', 'The Cliffside', 'The Haven',
    ],
    suffixes: [
      'Inn', 'Lodge', 'Resort', 'Retreat', 'House', 'Manor', 'Pavilion', 'Suites',
      'Hotel', 'Sanctuary', 'Cottage', 'Hideaway',
    ],
  },
  'interior_decor.harmonie': {
    prefixes: [
      'Oak', 'Linen', 'Stone', 'Studio', 'Calm', 'Timber', 'Clay', 'Pure',
      'Warm', 'Plaster', 'Reed', 'Moss', 'Alder', 'Canvas', 'Birch',
    ],
    suffixes: [
      'Interiors', 'Living', 'Space', 'Form', 'Home', 'Texture', 'Design', 'Nest',
      'Rooms', 'Objects', 'Studio', 'Craft',
    ],
  },
  'photo_studio.light': {
    prefixes: [
      'Silver', 'Aperture', 'Daylight', 'Amber', 'Frame', 'Focus', 'Still', 'Prism',
      'Shutter', 'Velvet', 'Golden Hour', 'Sunlit', 'grain', 'North', 'Candid',
    ],
    suffixes: [
      'Studio', 'Lens', 'Frames', 'Visuals', 'Portraits', 'Captures', 'Film', 'Light',
      'Lab', 'Archive', 'Works', 'Gallery',
    ],
  },
  'wedding_planner.romance': {
    prefixes: [
      'Ivory', 'Garden', 'Golden', 'Meadow', 'Silk', 'Blossom', 'Starlight', 'Willow',
      'Velvet', 'Rosewood', 'Honey', 'Orchard', 'Sunlit', 'Briar', 'Lace',
    ],
    suffixes: [
      'Events', 'Weddings', 'Vows', 'Gatherings', 'Ceremonies', 'Moments', 'Soirees', 'Celebrations',
      'Chapel', 'Archive', 'Affairs', 'Floral',
    ],
  },
  'newsletter.edition': {
    prefixes: [
      'The Daily', 'Signal', 'Dispatch', 'Focus', 'Friday', 'Brief', 'Pulse', 'Morning',
      'Weekly', 'Sunday', 'Field', 'Margin', 'Beacon', 'Ledger', 'Horizon',
    ],
    suffixes: [
      'Digest', 'Briefing', 'Note', 'Edition', 'Letter', 'Report', 'Roundup', 'Bulletin',
      'Chronicle', 'Post', 'Update', 'Index',
    ],
  },
  'blog_name.voice': {
    prefixes: [
      'Notes from', 'Field Log of', 'Dispatch from', 'Chronicles of', 'Essays on', 'Walks with',
      'Pages for', 'Letters from', 'Marginalia of', 'Sketches by', 'Quiet Hours with',
      'Reflections on', 'Postcards from', 'Benchmarks for', 'Stories of',
    ],
    suffixes: [
      'Designers', 'Travelers', 'Makers', 'Readers', 'Builders', 'Thinkers',
      'Writers', 'Engineers', 'Photographers', 'Founders', 'Wanderers', 'Crafters',
    ],
  },
  'publishing_house.letters': {
    prefixes: [
      'Northbound', 'Inkwell', 'Lantern', 'Folio', 'Paperback', 'Cedar', 'Margin', 'Quill',
      'Alder', 'Vellum', 'Bookmark', 'Typecase', 'Harbor', 'Bindery', 'Pressmark',
    ],
    suffixes: [
      'Press', 'Books', 'Editions', 'Publishing', 'House', 'Library', 'Prints', 'Imprint',
      'Ink', 'Letters', 'Folios', 'Catalog',
    ],
  },
  'novel_series.saga': {
    prefixes: [
      'The Fall of', 'Song of', 'Secret of', 'Heirs of', 'Shadow over', 'Quest for',
      'Crown of', 'Oath of', 'Shield of', 'Ashes of', 'Echoes of', 'Children of',
      'Keepers of', 'Storm over', 'Gates of',
    ],
    suffixes: [
      'Broken Kingdoms', 'Ashen Skies', 'Silver Seas', 'Iron Towers', 'Lost Cities', 'Wild Moons',
      'Fallen Crowns', 'Sunken Realms', 'Silent Peaks', 'Amber Thrones', 'Frozen Shores', 'Ancient Stars',
    ],
  },
  'band_name.rock': {
    prefixes: [
      'Velvet', 'Copper', 'Midnight', 'Static', 'Glass', 'Crimson', 'Hollow', 'Neon',
      'Electric', 'Rust', 'Silver', 'Iron', 'Wild', 'Broken', 'Echo',
    ],
    suffixes: [
      'Tides', 'Rebels', 'Static', 'Pilots', 'Riot', 'Mirrors', 'Youth', 'Wolves',
      'Transit', 'Thunder', 'Echoes', 'Hounds',
    ],
  },
  'album_title.concept': {
    prefixes: [
      'Letters from', 'After the', 'Songs for', 'Ghosts of', 'Under', 'Nocturne in',
      'Echoes of', 'Shadows on', 'Beyond the', 'Hours of', 'Colors of', 'Midnight at',
      'Silence Before', 'Notes on', 'Waves of',
    ],
    suffixes: [
      'Static Sky', 'Quiet Rooms', 'Glass Harbors', 'Amber Light', 'Winter Trains', 'Open Roads',
      'Lost Radios', 'Silver Rain', 'Empty Stages', 'Distant Lights', 'Paper Cities', 'High Tide',
    ],
  },
  'song_title.melody': {
    prefixes: [
      'In the Shadow of', 'Before the', 'Under the Lights of', 'Memory of', 'After the', 'Echoes of',
      'Waiting for', 'Walking Through', 'Letters in', 'Colors of', 'Shadows of', 'Dreaming of',
      'Closer to', 'Whispers in', 'Running Past',
    ],
    suffixes: [
      'Midnight', 'Rain', 'Wind', 'Silence', 'Dawn', 'Morning', 'Horizon', 'Time',
      'Starlight', 'Summer', 'Harbor', 'Static',
    ],
  },
  'sports_team.totem': {
    prefixes: [
      'The Eagles of', 'The Titans of', 'The Falcons of', 'The Panthers of', 'The Lions of',
      'The Wolves of', 'The Hawks of', 'The Bears of', 'The Mustangs of', 'The Wildcats of',
      'The Rangers of', 'The Knights of', 'The Thunder of', 'The Blazers of', 'The Giants of',
    ],
    suffixes: [
      'Highland', 'Westport', 'the Arena', 'the Plains', 'the Bay', 'the Valley',
      'the Ridge', 'the Coast', 'Northside', 'Harbor City', 'Pinecrest', 'Riverbend',
    ],
  },
  'educational_project.learning': {
    prefixes: [
      'Seeds of', 'Spark', 'Bridge', 'Compass', 'Horizon', 'Launchpad', 'Studio', 'Path',
      'Beacon', 'Open', 'Ladder', 'Sprout', 'Atlas', 'Quest', 'Foundry',
    ],
    suffixes: [
      'Learning', 'Futures', 'Discovery', 'Science', 'Scholars', 'Minds', 'Growth', 'Academy',
      'Skills', 'Literacy', 'Curiosity', 'Lab',
    ],
  },
  'charity_ngo.solidarity': {
    prefixes: [
      'Steps for', 'Hope for', 'Hands for', 'Together for', 'Action for', 'Voices for',
      'Care for', 'Bridges for', 'Light for', 'Shelter for', 'Seeds for', 'Roots for',
      'Allies of', 'Future for', 'Heart for',
    ],
    suffixes: [
      'Tomorrow', 'the Earth', 'Everyone', 'Clean Water', 'Young Minds', 'the Oceans',
      'Communities', 'Healthy Forests', 'Open Schools', 'Safe Homes', 'Dignity', 'Renewal',
    ],
  },
  'coworking_space.hub': {
    prefixes: [
      'The Foundry', 'The Hive', 'The Loft', 'The Commons', 'The Dock', 'The Desk',
      'The Studio', 'The Beacon', 'The Atrium', 'The Mill', 'The Quarter', 'The Exchange',
      'The Yard', 'The Annex', 'The Harbor',
    ],
    suffixes: [
      'Hub', 'Workspace', 'Collective', 'Lab', 'Quarter', 'Works', 'House', 'Space',
      'Commons', 'Guild', 'Club', 'Center',
    ],
  },
  'fictional_mentor.sage': {
    prefixes: [
      'Gen', 'Muto', 'Haku', 'Oga', 'Roshi', 'Baku', 'Sensei', 'Ten',
      'Kenz', 'Jir', 'Kazu', 'Taka', 'Shiro', 'Mori', 'Ren',
    ],
    suffixes: [
      'shin', 'zan', 'ryu', 'ken', 'maru', 'zen', 'zo', 'hei',
      'do', 'ji', 'kaze', 'yama',
    ],
  },
  'secret_order.occult': {
    prefixes: [
      'Order of', 'Veil of', 'Brotherhood of', 'Keepers of', 'Circle of', 'Sanctum of',
      'Conclave of', 'Watchers of', 'Covenant of', 'Society of', 'Choir of', 'Syndicate of',
      'Wardens of', 'Archivists of', 'Heralds of',
    ],
    suffixes: [
      'Obsidian Keys', 'Silent Owls', 'Amber Seals', 'Pale Moons', 'Hidden Stars', 'Iron Oaths',
      'Velvet Masks', 'Silver Keys', 'Broken Clocks', 'Midnight Bells', 'Ashen Scrolls', 'Crimson Rings',
    ],
  },
  'special_attack.ultimate': {
    prefixes: [
      'Dance of the', 'Strike of the', 'Fist of the', 'Blade of the', 'Tempest of the',
      'Seal of the', 'Flash of the', 'Fury of the', 'Roar of the', 'Fang of the',
      'Surge of the', 'Burst of the', 'Edge of the', 'Judgment of the', 'Spiral of the',
    ],
    suffixes: [
      'Comet', 'Blue Lightning', 'Sky Dragon', 'Endless Void', 'Black Flame', 'Tidal Wave',
      'Frost Dawn', 'Golden Star', 'Crimson Gale', 'Iron Lotus', 'Silver Falcon', 'Thunder Phoenix',
    ],
  },
  'magic_relic.sacred': {
    prefixes: [
      'Eye of', 'Chalice of', 'Mirror of', 'Seal of', 'Scepter of', 'Tear of',
      'Crown of', 'Lantern of', 'Bell of', 'Compass of', 'Ring of', 'Key of',
      'Diadem of', 'Staff of', 'Feather of',
    ],
    suffixes: [
      'Seraphs', 'Solitude', 'Truth', 'Daybreak', 'Eternity', 'Lost Kingdoms',
      'Dawnlight', 'Starlight', 'the Ancients', 'Quiet Seas', 'Grace', 'High Heaven',
    ],
  },
  'interstellar_empire.galaxy': {
    prefixes: [
      'Hegemony of', 'Federation of', 'Empire of', 'Dominion of', 'Commonwealth of', 'Alliance of',
      'Republic of', 'Syndicate of', 'Concordat of', 'Coalition of', 'Regency of', 'Protectorate of',
      'Union of', 'Imperium of', 'League of',
    ],
    suffixes: [
      'Cygnus', 'Orion', 'Andromeda', 'Centauri', 'Outer Worlds', 'Core Systems',
      'Vega', 'Lyra', 'the Rim', 'Solaris', 'Polaris', 'Draconis',
    ],
  },
  'anime_faction.syndicate': {
    prefixes: [
      'The Ten of', 'Brigade of', 'Squadron of', 'League of', 'Division of', 'Vanguard of',
      'Order of', 'Guild of', 'Company of', 'Seventh', 'Phantom', 'Crimson',
      'Iron', 'Zero', 'Shadow',
    ],
    suffixes: [
      'Raven', 'Crimson Steel', 'White Lotus', 'Black Sun', 'Rising Tide', 'Silent Blade',
      'Red Moon', 'Silver Fang', 'Golden Bell', 'Azure Wing', 'Storm Gate', 'Night Watch',
    ],
  },
  'math_puzzle.riddle': {
    prefixes: [
      'Paradox of', 'Riddle of', 'Labyrinth of', 'Challenge of', 'Cipher of', 'Conundrum of',
      'Puzzle of', 'Enigma of', 'Mystery of', 'Maze of', 'Gambit of', 'Trial of',
      'Knot of', 'Quest of', 'Theorem of',
    ],
    suffixes: [
      'Seven Doors', 'Twin Coins', 'Prime Mirrors', 'Spiral Towers', 'Locked Vaults', 'Golden Scales',
      'Three Bridges', 'Hidden Digits', 'Even Rings', 'Broken Clocks', 'Endless Steps', 'Chess Knights',
    ],
  },
  'fictional_theorem.law': {
    prefixes: [
      'Theorem of', 'Conjecture of', 'Principle of', 'Lemma of', 'Axiom of', 'Law of',
      'Corollary of', 'Rule of', 'Identity of', 'Invariant of', 'Postulate of', 'Bound of',
      'Criterion of', 'Duality of', 'Formula of',
    ],
    suffixes: [
      'Bounded Spirals', 'Prime Echoes', 'Dual Lattices', 'Folded Manifolds', 'Harmonic Rings', 'Modular Trees',
      'Convex Orbits', 'Symmetric Maps', 'Fixed Points', 'Open Graphs', 'Closed Loops', 'Dense Fields',
    ],
  },
  'fractal_pattern.fractal': {
    prefixes: [
      'Set of', 'Spiral of', 'Canopy of', 'Lace of', 'Lattice of', 'Branching of',
      'Cascade of', 'Web of', 'Bloom of', 'Mosaic of', 'Ripple of', 'Drift of',
      'Cluster of', 'Dust of', 'Fold of',
    ],
    suffixes: [
      'Infinite Mirrors', 'Sierpinski Shards', 'Golden Ferns', 'Snowflake Rings', 'Recursive Echoes',
      'Self-Similar Waves', 'Cantor Bridges', 'Dragon Curves', 'Hexagon Cells', 'Branching Vines',
      'Frost Crystals', 'Nested Spirals',
    ],
  },
  'number_system.system': {
    prefixes: [
      'Base', 'Notation', 'Calculus', 'Arithmetic', 'Numeral', 'Radix', 'Scale', 'Cipher',
      'Algebra', 'Lattice', 'Metric', 'Index', 'Vector', 'Order', 'System',
    ],
    suffixes: [
      'Twelve', 'Octal', 'Ternary', 'Balanced', 'Modular', 'Polyhedral', 'Dual', 'Spiral',
      'Prime', 'Hexa', 'Fibonacci', 'Harmonic',
    ],
  },
  'math_olympiad_team.olympiad': {
    prefixes: [
      'Primes of', 'Vectors of', 'Squad of', 'Geometers of', 'Theorems of', 'Logicians of',
      'Knights of', 'Pioneers of', 'Solvers of', 'Fellows of', 'Captains of', 'Analysts of',
      'Titans of', 'Scholars of', 'Alliance of',
    ],
    suffixes: [
      'Euler', 'Pascal', 'Gauss', 'Noether', 'Hypotenuse', 'Sigma', 'Matrix', 'Pi',
      'Archimedes', 'Euclid', 'Fibonacci', 'Riemann',
    ],
  },
  'scientific_model.model': {
    prefixes: [
      'Model of', 'Matrix of', 'Simulation of', 'Theory of', 'Framework for', 'Equation of',
      'Topology of', 'Hypothesis of', 'Dynamics of', 'Geometry of', 'Spectrum of', 'Kinetics of',
      'Atlas of', 'Structure of', 'Field of',
    ],
    suffixes: [
      'Scalar Fields', 'Dark Fluid', 'Stellar Resonance', 'Soft Singularity', 'Ether Matter',
      'Quantum Gravity', 'Subtle Vacuum', 'Harmonic Strings', 'Phase Transitions', 'Thermal Flux',
      'Magnetic Waves', 'Orbital Drift',
    ],
  },
  'science_popularization.media': {
    prefixes: [
      'Curious About', 'Lens on', 'Wonder of', 'Minute', 'Keys to', 'Edge of',
      'Inside', 'Atlas of', 'Stories of', 'Simply', 'Decoded:', 'Signals of',
      'Open', 'Notes on', 'Exploring',
    ],
    suffixes: [
      'Science', 'Cosmos', 'Atoms', 'Knowledge', 'Discovery', 'Physics', 'Patterns',
      'Nature', 'Molecules', 'Light', 'Matter', 'Space',
    ],
  },
  'tactical_operation.military': {
    prefixes: [
      'Operation', 'Protocol', 'Directive', 'Code', 'Plan', 'Taskforce', 'Mission', 'Sector',
      'Strike', 'Vanguard', 'Bastion', 'Shield', 'Recon', 'Watch', 'Beacon',
    ],
    suffixes: [
      'Red Storm', 'Long Shadow', 'Boreal Dawn', 'Silent Compass', 'Iron Tide', 'Cold Harbor',
      'Granite Wall', 'Silver Wolf', 'Night Watch', 'Clear Sky', 'North Ridge', 'Amber Signal',
    ],
  },
  'creative_workshop.craft': {
    prefixes: [
      'Workshop of', 'Studio of', 'Bench of', 'Foundry of', 'Loom of', 'Kiln of',
      'Table of', 'Forge of', 'Press of', 'Atrium of', 'Corner of', 'Circle of',
      'House of', 'Craft of', 'Guild of',
    ],
    suffixes: [
      'Clay & Wood', 'Paper & Ink', 'Copper & Thread', 'Linen & Glass', 'Fine Print', 'Handcraft',
      'Silver & Wire', 'Wool & Loom', 'Oak & Chisel', 'Glaze & Wheel', 'Brush & Canvas', 'Wax & Brass',
    ],
  },
  'online_course.course': {
    prefixes: [
      'Academy of', 'Craft of', 'Foundations of', 'Mastery in', 'Principles of', 'Guide to',
      'Workshop on', 'Blueprint for', 'Studio in', 'Field School:', 'Deep Dive:', 'Path to',
      'Handbook of', 'Bootcamp in', 'Essentials of',
    ],
    suffixes: [
      'Systems', 'Typography', 'Product', 'Algorithms', 'Illustration', 'Architecture',
      'Data Modeling', 'Visual Design', 'Clean Code', 'Writing', 'Storytelling', 'Research',
    ],
  },
  'study_group.group': {
    prefixes: [
      'Circle of', 'Guild of', 'Alliance of', 'Study Desk for', 'Cohort of', 'Forum of',
      'Club for', 'Bench of', 'Lab of', 'Table for', 'Union of', 'Squad for',
      'Collective of', 'Fellows of', 'House of',
    ],
    suffixes: [
      'Focus', 'Review', 'Exams', 'Algorithms', 'Languages', 'Research',
      'Mathematics', 'History', 'Design', 'Physics', 'Reading', 'Practice',
    ],
  },
  'sprint_ritual.ritual': {
    prefixes: [
      'Sprint', 'Flow', 'Focus', 'Zero-Noise', 'Silent', 'Deep-Work', 'Morning', 'Calm',
      'Anchor', 'Pulse', 'Clear', 'Steady', 'Golden', 'Northstar', 'Bright',
    ],
    suffixes: [
      'Hour', 'Pulse', 'Block', 'Sync', 'Ritual', 'Window', 'Session', 'Reset',
      'Cadence', 'Loop', 'Kickoff', 'Check-in',
    ],
  },
  'personal_portfolio.folio': {
    prefixes: [
      'Folio of', 'Studio of', 'Showcase of', 'Selected Works by', 'Index of', 'Archive of',
      'Notebook of', 'Gallery of', 'Collection:', 'Works in', 'Monograph:', 'Journal of',
      'Benchmarks in', 'Sketchbook of', 'Catalog of',
    ],
    suffixes: [
      'Design', 'Code', 'Motion', 'Architecture', 'Product', 'Crafts',
      'Illustration', 'Typography', 'Systems', 'Photography', 'Direction', 'Interfaces',
    ],
  },
  'local_association.community': {
    prefixes: [
      'Neighbors of', 'Friends of', 'Collective of', 'Living in', 'Stewards of', 'Keepers of',
      'Gardeners of', 'Alliance of', 'Walkers of', 'Volunteers for', 'Council of', 'Circle of',
      'Patrons of', 'Builders of', 'Commons of',
    ],
    suffixes: [
      'Green Park', 'Riverbend', 'Old Town', 'Harbor Ward', 'Oak Street', 'Eastside',
      'Oak Island', 'Meadow Lane', 'Cedar Hill', 'Mill Creek', 'Beacon Square', 'Willow Brook',
    ],
  },
  'eco_initiative.green': {
    prefixes: [
      'Seeds of', 'Canopy of', 'Earth', 'Watershed', 'Greenway', 'Meadow', 'Solar', 'River',
      'Forest', 'Wildflower', 'Prairie', 'Kelp', 'Timber', 'Clean', 'Living',
    ],
    suffixes: [
      'Renewal', 'Rewilding', 'Stewardship', 'Regeneration', 'Harvest', 'Commons', 'Resilience', 'Alliance',
      'Corridor', 'Future', 'Trust', 'Sanctuary',
    ],
  },
  'exotic_resort.resort': {
    prefixes: [
      'Atoll of', 'Isle of', 'Bay of', 'Cove of', 'Lagoon of', 'Point of', 'Sanctuary of',
      'Cape of', 'Shores of', 'Haven of', 'Breeze of', 'Harbor of', 'Palms of', 'Reef of', 'Sands of',
    ],
    suffixes: [
      'Turquoise Palms', 'Quiet Coral', 'White Sands', 'Trade Winds', 'Clear Shallows', 'Golden Tide',
      'Emerald Waves', 'Sunlit Horizons', 'Pearl Shoals', 'Warm Breezes', 'Starlit Waters', 'Blue Lagoons',
    ],
  },
  'calendar_era.era': {
    prefixes: [
      'Era of', 'Age of', 'Cycle of', 'Epoch of', 'Reign of', 'Years of',
      'Dawn of', 'Season of', 'Century of', 'Chronicle of', 'Span of', 'Rule of',
      'Turn of', 'Time of', 'Millennium of',
    ],
    suffixes: [
      'Glass Suns', 'Wandering Stars', 'Rising Tides', 'Iron Oaks', 'Quiet Skies', 'First Lanterns',
      'Golden Harvests', 'Silver Rivers', 'High Bridges', 'Open Seas', 'Clear Mirrors', 'Long Winters',
    ],
  },
};

/**
 * Fallback clean English domain pools keyed by generatorId (for Batch F/G and default styles).
 */
const ENGLISH_GENERATOR_POOLS: Record<string, LocalizedDomainPool> = {
  griffin_rider: {
    prefixes: [
      'Sky', 'Gale', 'Storm', 'Aerie', 'Talon', 'Kestrel', 'Golden', 'Sun',
      'Cloud', 'Wind', 'Crest', 'Feather', 'High', 'Azure', 'Swift',
    ],
    suffixes: [
      'Wing', 'Guard', 'Swoop', 'Talon', 'Soarer', 'Flight', 'Rider', 'Strider',
      'Watch', 'Skies', 'Crest', 'Lancer',
    ],
  },
  enchanted_forest: {
    prefixes: [
      'Emerald', 'Silver', 'Whispering', 'Mist', 'Moss', 'Dew', 'Glade', 'Bramble',
      'Moon', 'Silent', 'Fern', 'Willow', 'Starlit', 'Sunlit', 'Lantern',
    ],
    suffixes: [
      'Woods', 'Glade', 'Thicket', 'Canopy', 'Grove', 'Hollow', 'Briar', 'Wilds',
      'Sanctuary', 'Shade', 'Glen', 'Vale',
    ],
  },
  sacred_artifact: {
    prefixes: [
      'Chalice', 'Scepter', 'Relic', 'Phylactery', 'Orb', 'Talisman', 'Seal', 'Jewel',
      'Amulet', 'Crown', 'Lantern', 'Bell', 'Diadem', 'Censer', 'Mirror',
    ],
    suffixes: [
      'of Clarity', 'of Stars', 'of Grace', 'of First Kings', 'of Dawn', 'of Eternity',
      'of Wisdom', 'of Light', 'of Peace', 'of Mercy', 'of Truth', 'of Haven',
    ],
  },
  shadow_assassin_guild: {
    prefixes: [
      'Blades', 'Veil', 'Hand', 'Talons', 'Shadow', 'Scissors', 'Raven', 'Masks',
      'Circle', 'Daggers', 'Needles', 'Silhouettes', 'Ghosts', 'Cloak', 'Knives',
    ],
    suffixes: [
      'of Midnight', 'of Ebony', 'Silent', 'of Dusk', 'Traceless', 'of Steel',
      'of Silk', 'of Rooftops', 'of Mist', 'of Ash', 'Unseen', 'of Bells',
    ],
  },
  orbital_station: {
    prefixes: [
      'Station', 'Outpost', 'Port', 'Relay', 'Base', 'Module', 'Ring', 'Citadel',
      'Hub', 'Beacon', 'Spindle', 'Dock', 'Array', 'Platform', 'Gantry',
    ],
    suffixes: [
      'Kepler', 'Celestial', 'Orion', 'Solaria', 'Prometheus', 'Hermes', 'Astra', 'Horizon',
      'Zenith', 'Boreal', 'Lagrange', 'Polaris',
    ],
  },
  quantum_reactor: {
    prefixes: [
      'Core', 'Generator', 'Coil', 'Thruster', 'Reactor', 'Matrix', 'Containment', 'Injector',
      'Chamber', 'Conduit', 'Turbine', 'Lattice', 'Array', 'Dynamo', 'Emitter',
    ],
    suffixes: [
      'Tachyon', 'Singularity', 'Boson-X', 'Chronos', 'Apex', 'Flux', 'Vortex', 'Aether',
      'Pulse', 'Helios', 'Harmonic', 'Vector',
    ],
  },
  terraformed_colony: {
    prefixes: [
      'New', 'Port', 'Dome', 'Valley', 'Colony', 'Citadel', 'Camp', 'Oasis',
      'Bay', 'Outpost', 'Haven', 'Mesa', 'Settlement', 'Ridge', 'Terrace',
    ],
    suffixes: [
      'Hope', 'Ares', 'Aurora', 'Horizon', 'Pioneer', 'Elysium', 'Redstone', 'Frontier',
      'Demeter', 'Solaris', 'Veritas', 'Meridian',
    ],
  },
  interstellar_corridor: {
    prefixes: [
      'Route of', 'Pass of', 'Channel of', 'Lane of', 'Corridor of', 'Wake of', 'Artery of',
      'Rift of', 'Stream of', 'Bridge of', 'Current of', 'Slipstream of', 'Reach of', 'Track of', 'Arc of',
    ],
    suffixes: [
      'Orion', 'Vega', 'Centauri', 'the Mists', 'Tachyon', 'Cygnus', 'Starlight', 'Solaris',
      'Deep Space', 'the Rim', 'Altair', 'Polaris',
    ],
  },
  exoplanet_biodome: {
    prefixes: [
      'Biodome', 'Biosphere', 'Ark', 'Cocoon', 'Garden', 'Bubble', 'Sanctuary', 'Conservatory',
      'Terrarium', 'Canopy', 'Atrium', 'Greenhouse', 'Enclosure', 'Pavilion', 'Refuge',
    ],
    suffixes: [
      'Eden', 'Flora', 'Gaia', 'Verdant', 'Oasis', 'Tropic', 'Boreal', 'Vitalis',
      'Sylva', 'Solaris', 'Aurora', 'Meadow',
    ],
  },
  deep_space_probe: {
    prefixes: [
      'Probe', 'Telescope', 'Explorer', 'Pathfinder', 'Voyager', 'Eye', 'Vigilant', 'Beacon',
      'Surveyor', 'Scout', 'Sentinel', 'Seeker', 'Mapper', 'Listener', 'Courier',
    ],
    suffixes: [
      'Kepler', 'Cassini', 'Pioneer', 'Horizon', 'Pulsar', 'Cosmos', 'Apex', 'Halley',
      'Galileo', 'Copernicus', 'Tycho', 'Lagrange',
    ],
  },
  plasma_weapon: {
    prefixes: [
      'Cannon', 'Rifle', 'Blaster', 'Carbine', 'Launcher', 'Projector', 'Sidearm', 'Disruptor',
      'Lance', 'Emitter', 'Repeater', 'Arcgun', 'Caster', 'Accelerator', 'Scattergun',
    ],
    suffixes: [
      'Plasma', 'Ion-9', 'Thermal', 'Overcharge', 'Vortex', 'Solar', 'Beam', 'Pulse',
      'Arc', 'Mag', 'Photon', 'Helios',
    ],
  },
  nanotech_swarm: {
    prefixes: [
      'Swarm', 'Cloud', 'Mist', 'Haze', 'Matrix', 'Lattice', 'Fleet', 'Network',
      'Veil', 'Tide', 'Cascade', 'Stream', 'Cluster', 'Hive', 'Field',
    ],
    suffixes: [
      'Nano', 'Molecular', 'Atomix', 'Synapse', 'Locust', 'Mender', 'Vortex', 'Gray',
      'Stealth', 'Synth', 'Micro', 'Prism',
    ],
  },
  neural_interface: {
    prefixes: [
      'Neuro', 'Synapse', 'Cortex', 'Chip', 'Interface', 'Connector', 'Link', 'Cerebro',
      'Axon', 'Dendrite', 'Signal', 'Optic', 'Echo', 'Soma', 'Bridge',
    ],
    suffixes: [
      'Link', 'Chip', 'Plus', 'Direct', 'Sense', 'Wave', 'Vision', 'Core',
      'Prime', 'Mesh', 'Node', 'Relay',
    ],
  },
  dystopian_city_sector: {
    prefixes: [
      'Sector', 'District', 'Zone', 'Level', 'Block', 'Ward', 'Quay', 'Enclave',
      'Alley', 'Concourse', 'Spire', 'Undergrid', 'Quarter', 'Depot', 'Stack',
    ],
    suffixes: [
      'Neon', 'Lowtown', 'Sublevel', 'Shadow', 'Steel', 'Acid Rain', 'Foundry', 'Terminal',
      'Black', 'Glitch', 'Cinder', 'Rust',
    ],
  },
  carnivorous_plant: {
    prefixes: [
      'Bloom', 'Vine', 'Pitcher', 'Root', 'Fern', 'Leaf', 'Maw', 'Spore',
      'Briar', 'Thorn', 'Nettle', 'Orchid', 'Tendril', 'Pod', 'Bulb',
    ],
    suffixes: [
      'Snare', 'Thorny', 'Crimson', 'Venom', 'Strangler', 'Ravenous', 'Acid', 'Nocturnal',
      'Honeytrap', 'Fang', 'Sting', 'Marsh',
    ],
  },
  ancient_tree: {
    prefixes: [
      'Great', 'Elder', 'Ancient', 'Heartwood', 'Silver', 'Silent', 'Deep', 'Iron',
      'Mossy', 'Gnarled', 'Whispering', 'Old', 'Hollow', 'Golden', 'Starlit',
    ],
    suffixes: [
      'Oak', 'Ash', 'Cedar', 'Willow', 'Yew', 'Redwood', 'Sentinel', 'Guardian',
      'Father', 'Birch', 'Alder', 'Cypress',
    ],
  },
  deep_sea_species: {
    prefixes: [
      'Jellyfish', 'Squid', 'Lanternfish', 'Siphonophore', 'Leviathan', 'Nautilus', 'Manta', 'Eel',
      'Cuttlefish', 'Kraken', 'Angler', 'Octopus', 'Ray', 'Viperfish', 'Seadragon',
    ],
    suffixes: [
      'Bioluminescent', 'Glass', 'Starlit', 'Translucent', 'Abyssal', 'Phosphor', 'Pearled', 'Drifter',
      'Velvet', 'Inkborn', 'Gleaming', 'Deepwater',
    ],
  },
  arctic_creature: {
    prefixes: [
      'Bear', 'Wolf', 'Snowy Owl', 'Panther', 'Fox', 'Stalker', 'Colossus', 'Lynx',
      'Walrus', 'Narwhal', 'Caribou', 'Falcon', 'Ermine', 'Seal', 'Elk',
    ],
    suffixes: [
      'of Snows', 'Blizzard', 'Boreal', 'Frost', 'White', 'Pack', 'Polar', 'Glacial',
      'of Ice', 'Tundra', 'Northwind', 'Drift',
    ],
  },
  tropical_rainforest: {
    prefixes: [
      'Reserve', 'Jungle', 'Basin', 'Forest', 'Valley', 'Delta', 'Park', 'Highlands',
      'Canopy', 'Lagoon', 'Watershed', 'Sanctuary', 'Cascade', 'Grove', 'Island',
    ],
    suffixes: [
      'Emerald', 'Verdant', 'Sunwarm', 'Toucan', 'Orchid', 'Wild', 'Mist', 'Equatorial',
      'Jade', 'Monsoon', 'Parrot', 'River',
    ],
  },
  crystal_mineral: {
    prefixes: [
      'Aerol', 'Pyrit', 'Sapphir', 'Lumin', 'Celest', 'Astr', 'Quartz', 'Emer',
      'Obsid', 'Rubin', 'Opal', 'Zircon', 'Beryl', 'Topaz', 'Amet',
    ],
    suffixes: [
      'ite', 'ium', 'azur', 'or', 'ine', 'on', 'is', 'an',
      'gem', 'shard', 'spar', 'lith',
    ],
  },
  mountain_summit: {
    prefixes: [
      'Peak', 'Mount', 'Spire', 'Tooth', 'Dome', 'Crest', 'Crag', 'Throne',
      'Ridge', 'Pinnacle', 'Horn', 'Pass', 'Massif', 'Cliff', 'Crown',
    ],
    suffixes: [
      'of Winds', 'of Ice', 'of Eagles', 'Razor', 'Celestial', 'Stormborn', 'White', 'Solitary',
      'Granite', 'Snowcap', 'Highwatch', 'Frost',
    ],
  },
  coral_reef: {
    prefixes: [
      'Reef', 'Lagoon', 'Atoll', 'Shoal', 'Barrier', 'Garden', 'Islet', 'Channel',
      'Cove', 'Key', 'Shelf', 'Bank', 'Passage', 'Arch', 'Sanctuary',
    ],
    suffixes: [
      'Coral', 'Turquoise', 'Pearl', 'Starlit', 'Azure', 'Tide', 'Sunlit', 'Turtle',
      'Sandbar', 'Emerald', 'Siren', 'Shell',
    ],
  },
  wild_sanctuary: {
    prefixes: [
      'Sanctuary', 'Haven', 'Refuge', 'Reserve', 'Glade', 'Hollow', 'Land', 'Oasis',
      'Meadow', 'Valley', 'Clearing', 'Forest', 'Island', 'Waters', 'Crest',
    ],
    suffixes: [
      'of Stags', 'Wild', 'Peace', 'Mists', 'Natural', 'Hills', 'Protective', 'Wolves',
      'Eden', 'Quiet', 'Herons', 'Pines',
    ],
  },
  volcanic_geyser: {
    prefixes: [
      'Geyser', 'Spring', 'Basin', 'Fumarole', 'Pool', 'Gusher', 'Vent', 'Well',
      'Caldera', 'Chimney', 'Crevice', 'Pillar', 'Fountain', 'Cone', 'Crater',
    ],
    suffixes: [
      'Sulfur', 'Blazing', 'Steam', 'Mist', 'Volcanic', 'Emerald', 'Thermal', 'Mineral',
      'Basalt', 'Amber', 'Obsidian', 'Boiling',
    ],
  },
  desert_oasis: {
    prefixes: [
      'Oasis', 'Spring', 'Palm Grove', 'Fountain', 'Basin', 'Rest', 'Haven', 'Well',
      'Shade', 'Pool', 'Lagoon', 'Camp', 'Garden', 'Hollow', 'Brook',
    ],
    suffixes: [
      'of Palms', 'of Mirage', 'of Emerald', 'of Amber', 'of Stars', 'of Caravans', 'Secret', 'of Dawn',
      'of Jasmine', 'of Coolness', 'of Dates', 'of Dusk',
    ],
  },
  luminescent_fungi: {
    prefixes: [
      'Bolete', 'Cap', 'Spore', 'Mycelium', 'Morel', 'Fungus', 'Agaric', 'Oyster',
      'Toadstool', 'Chanterelle', 'Cluster', 'Bell', 'Moss-Cap', 'Veil', 'Crown',
    ],
    suffixes: [
      'Phosphor', 'Blueglow', 'Nocturne', 'Cavern', 'Ether', 'Gleaming', 'Lunar', 'Fae',
      'Shadow', 'Starlight', 'Indigo', 'Dew',
    ],
  },
  predatory_raptor: {
    prefixes: [
      'Falcon', 'Hawk', 'Goshawk', 'Eagle', 'Harrier', 'Kite', 'Osprey', 'Talon',
      'Kestrel', 'Merlin', 'Condor', 'Peregrine', 'Buzzard', 'Owl', 'Shrike',
    ],
    suffixes: [
      'Swoop', 'Golden', 'Tempest', 'Swift', 'Apex', 'Razor', 'Gale', 'Crest',
      'Skybound', 'Shadow', 'Wind', 'Strike',
    ],
  },
  specialty_coffee: {
    prefixes: [
      'Roast', 'Coffee', 'Bean', 'Copper', 'Amber', 'Morning', 'Harbor', 'Mill',
      'Steep', 'Origin', 'Timber', 'Kettle', 'Velvet', 'North', 'Sunlit',
    ],
    suffixes: [
      'Roasters', 'Roastery', 'Blend', 'Craft', 'House', 'Bar', 'Origin', 'Brew',
      'Press', 'Grind', 'Table', 'Cup',
    ],
  },
  artisanal_bakery: {
    prefixes: [
      'Golden', 'Hearth', 'Wheat', 'Briar', 'Stone', 'Morning', 'Honey', 'Mill',
      'Sourdough', 'Warm', 'Rye', 'Butter', 'Oat', 'Crust', 'Country',
    ],
    suffixes: [
      'Loaf', 'Bakery', 'Oven', 'Crust', 'Sourdough', 'Mill', 'Pastry', 'Crumb',
      'Hearth', 'Bakehouse', 'Roll', 'Table',
    ],
  },
  luxury_perfume: {
    prefixes: [
      'Elixir', 'Atelier', 'Velvet', 'Amber', 'Saffron', 'Orris', 'Cedar', 'Neroli',
      'Bergamot', 'Iris', 'Jasmine', 'Myrrh', 'Sandal', 'Vetiver', 'Rose',
    ],
    suffixes: [
      'Noir', 'Blossom', 'Imperial', 'Silk', 'Botanical', 'Essence', 'Dawn', 'Musk',
      'Velvet', 'Gold', 'Mist', 'Reserve',
    ],
  },
  architect_firm: {
    prefixes: [
      'Timber', 'Stone', 'Form', 'North', 'Atrium', 'Axis', 'Meridian', 'Beam',
      'Span', 'Plinth', 'Volume', 'Cantilever', 'Line', 'Glass', 'Grid',
    ],
    suffixes: [
      'Architects', 'Partners', 'Studio', 'Design', 'Collective', 'Build', 'Space', 'Works',
      'Practice', 'Group', 'Associates', 'Structure',
    ],
  },
  eco_fashion: {
    prefixes: [
      'Linen', 'Cotton', 'Moss', 'Earth', 'Reed', 'Willow', 'Oat', 'Origin',
      'Hemp', 'Wool', 'Clover', 'Sage', 'Canvas', 'Clay', 'Nettle',
    ],
    suffixes: [
      'Wear', 'Studio', 'Loom', 'Craft', 'Thread', 'Collective', 'Pure', 'Apparel',
      'Cloth', 'Woven', 'Line', 'Goods',
    ],
  },
  creative_coworking: {
    prefixes: [
      'Hub', 'Foundry', 'Hive', 'Loft', 'Square', 'Commons', 'Agora', 'Dock',
      'Atrium', 'Beacon', 'Bench', 'Gallery', 'Exchange', 'Studio', 'Annex',
    ],
    suffixes: [
      'Creative', 'Coworking', 'Shared', 'Studio', 'Collective', 'Lab', 'Works', 'Hybrid',
      'Space', 'House', 'Guild', 'Club',
    ],
  },
  cocktail_lounge: {
    prefixes: [
      'The Velvet', 'The Copper', 'The Brass', 'The Night', 'The Tiger', 'The Lantern',
      'The Corner', 'The Smoked', 'The Amber', 'The Midnight', 'The Gilded', 'The Ruby',
      'The Quiet', 'The Silver', 'The Blind',
    ],
    suffixes: [
      'Lounge', 'Apothecary', 'Speakeasy', 'Salon', 'Bar', 'Parlor', 'Room', 'Cellar',
      'Club', 'Hideaway', 'House', 'Vault',
    ],
  },
  green_energy_corp: {
    prefixes: [
      'Helio', 'Volt', 'Aero', 'Terra', 'Sol', 'Bio', 'Green', 'Pure',
      'Nexus', 'Clear', 'Apex', 'Nova', 'Wind', 'Hydro', 'Geo',
    ],
    suffixes: [
      'Energy', 'Power', 'Solar', 'Renewable', 'Grid', 'Watt', 'Clean', 'Solutions',
      'Volt', 'Works', 'Dynamics', 'Systems',
    ],
  },
  microbrewery_craft: {
    prefixes: [
      'Copper', 'Hop', 'Malt', 'Cedar', 'Barrel', 'Amber', 'Pine', 'Oak',
      'Kettle', 'Barley', 'Bridge', 'River', 'Forge', 'Wild', 'Brick',
    ],
    suffixes: [
      'Brewery', 'Brewing', 'Alehouse', 'Taproom', 'Hops', 'Craft', 'Works', 'Cellar',
      'Co.', 'Maltings', 'Beerhall', 'Kettle',
    ],
  },
  wellness_spa: {
    prefixes: [
      'Serenity', 'Lotus', 'Cedar', 'Spring', 'Haven', 'Sanctuary', 'Oasis', 'Willow',
      'Stillwater', 'Mist', 'Jasmine', 'Pebble', 'Birch', 'Calm', 'Breeze',
    ],
    suffixes: [
      'Spa', 'Baths', 'Retreat', 'Wellness', 'Thermae', 'Calm', 'Silk', 'Rest',
      'Springs', 'Sanctuary', 'House', 'Garden',
    ],
  },
  alchemist_healer: {
    prefixes: [
      'Master', 'Apothecary', 'Aurelius', 'Gideon', 'Bram', 'Bramwell', 'Severus', 'Linus',
      'Sage', 'Brother', 'Sister', 'Herbalist', 'Aldous', 'Corin', 'Tobias',
    ],
    suffixes: [
      'the Herbalist', 'of the Flask', 'of Alembic Hall', 'the Sage', 'the Distiller', 'of Remedies',
      'of the Mortar', 'of Green Leaves', 'the Mender', 'of Clear Springs', 'of Tinctures', 'the Wise',
    ],
  },
  court_diplomat: {
    prefixes: [
      'Lord', 'Baron', 'Envoy', 'Ambassador', 'Emissary', 'Marquis', 'Chancellor', 'Count',
      'Regent', 'Steward', 'Viscount', 'Lady', 'Consul', 'Marshal', 'Chamberlain',
    ],
    suffixes: [
      'of Highgate', 'of Ravenswood', 'of Stonebridge', 'of Ashford', 'of the Truce', 'of Fairhaven',
      'of Oakridge', 'of Belmont', 'of Silverton', 'of Clearview', 'of Whitecliff', 'of Thornhill',
    ],
  },
  bounty_hunter_guild: {
    prefixes: [
      'Agency', 'League', 'Syndicate', 'Trackers', 'Bureau', 'Hounds', 'Chain', 'Wardens',
      'Marshals', 'Order', 'Guild', 'Watch', 'Companions', 'Seekers', 'Rangers',
    ],
    suffixes: [
      'of Shadow', 'of the Frontier', 'of Iron', 'of the Lasso', 'Unbroken', 'of Reckoning',
      'of Dust', 'of the North', 'of Amber', 'of Spurs', 'of Steel', 'of Debt',
    ],
  },
  gladiator_champion: {
    prefixes: [
      'Titus', 'Maximus', 'Sparta', 'Vulkan', 'Brutus', 'Goliath', 'Draco', 'Thrax',
      'Varro', 'Cassius', 'Darius', 'Leonidas', 'Severus', 'Aurelius', 'Magnus',
    ],
    suffixes: [
      'the Unbeaten', 'the Breaker', 'the Lion', 'of the Arena', 'the Ironclad', 'the Titan',
      'of Stone', 'theThunder', 'of Crimson Sand', 'the Shield', 'the Victor', 'of Iron',
    ],
  },
  wandering_bard: {
    prefixes: [
      'Robin', 'Lyra', 'Finn', 'Milo', 'Pippin', 'Jasper', 'Celeste', 'Elian',
      'Julian', 'Rowan', 'Orpheus', 'Soren', 'Gideon', 'Clover', 'Bram',
    ],
    suffixes: [
      'of the Green Lute', 'of the High Road', 'the Songweaver', 'of the Tavern', 'the Merry',
      'Swift-Rhyme', 'of the Winds', 'of Golden Strings', 'the Storyteller', 'of Four Seasons',
      'Silver-Tongue', 'of the Crossroads',
    ],
  },
  cyber_medic: {
    prefixes: [
      'Doc', 'Saw', 'Patch', 'Stitch', 'Suture', 'Chrome', 'Bio', 'Mender',
      'Jack', 'Cortex', 'Trauma', 'Pulse', 'Synth', 'Med', 'Zero',
    ],
    suffixes: [
      '_MD', 'Fixer', 'Mender', 'of Neon Row', 'of the Undercity', 'Relay', 'Clinic', 'Pulse',
      'Unit', 'Express', 'Mobile', 'Surge',
    ],
  },
  royal_knight_order: {
    prefixes: [
      'Order', 'Guard', 'Knights', 'Fellowship', 'Shield', 'Table', 'Paladins', 'Sentinels',
      'Vanguard', 'Banner', 'Lances', 'Wardens', 'Templars', 'Champions', 'Watch',
    ],
    suffixes: [
      'of the Golden Lily', 'of the White Lion', 'of the Pure Blade', 'of the Crown', 'of the Throne',
      'of Honor', 'of Dawn', 'of the Oak', 'of High Keep', 'of Silver Light', 'of Valor', 'of the Realm',
    ],
  },
  mystic_oracle: {
    prefixes: [
      'Cassandra', 'Sibyl', 'Vera', 'Phoebe', 'Miria', 'Thalia', 'Morrigan', 'Elora',
      'Selene', 'Isolde', 'Aurora', 'Celeste', 'Lyra', 'Astrid', 'Seraphina',
    ],
    suffixes: [
      'the Seer', 'of the Veil', 'of the Stars', 'Golden-Eye', 'of Delphi', 'of Fate',
      'of the Moon', 'of Mirrors', 'of Dreams', 'of Mist', 'of Omens', 'the Prophetess',
    ],
  },
  vampire_coven: {
    prefixes: [
      'House', 'Coven', 'Bloodline', 'Clan', 'Dynasty', 'Circle', 'Court', 'Order',
      'Conclave', 'Assembly', 'Throne', 'Choir', 'Cabals', 'Shadow', 'Lineage',
    ],
    suffixes: [
      'of Nightfall', 'Karnstein', 'Bathory', 'of Dusk', 'of Black Velvet', 'of Ebony',
      'of Shadows', 'of Midnight', 'of Eclipse', 'of Crimson Glass', 'Nocturne', 'of Pale Silk',
    ],
  },
  floating_skyland: {
    prefixes: [
      'Sky', 'Cloud', 'High', 'Wind', 'Sun', 'Crystal', 'Zenith', 'Star',
      'Breeze', 'Zephyr', 'Aether', 'Storm', 'Azure', 'Summit', 'Crown',
    ],
    suffixes: [
      'Isle', 'Crag', 'Citadel', 'Archipelago', 'Sanctuary', 'Plateau', 'Haven', 'Spire',
      'Bastion', 'Terrace', 'Drift', 'Peak',
    ],
  },
  sunken_atlantis: {
    prefixes: [
      'Atlantis', 'Thalassa', 'Nereid', 'Pelagos', 'Corallia', 'Aqualia', 'Abyssa', 'Maris',
      'Coral', 'Abyss', 'Pearl', 'Lagoon', 'Poseidon', 'Tide', 'Nautilus',
    ],
    suffixes: [
      'the Sunken', 'of the Abyss', 'Lost', 'Submerged', 'Marble-Deep', 'of Pearls',
      'Silent', 'of Azure', 'Drowned', 'Deepborn', 'of Tides', 'Eternal',
    ],
  },
  desert_empire: {
    prefixes: [
      'Amun', 'Heliopolis', 'Karnak', 'Thebes', 'Solaris', 'Nubia', 'Khepri', 'Osiris',
      'Memphis', 'Luxor', 'Sakkara', 'Siwa', 'Aten', 'Khem', 'Ra',
    ],
    suffixes: [
      'of Gold', 'of Zenith', 'Sunlit', 'of Sands', 'Eternal', 'of Pharaohs',
      'of Pyramids', 'of Dunes', 'of the Nile', 'of Amber', 'of Pillars', 'of Dusk',
    ],
  },
  pirate_haven: {
    prefixes: [
      'Bay', 'Cove', 'Port', 'Isle', 'Rock', 'Harbor', 'Anchor', 'Cape',
      'Reef', 'Landing', 'Shoal', 'Cutlass', 'Lagoon', 'Passage', 'Cliff',
    ],
    suffixes: [
      'of Skulls', 'of Corsairs', 'of Plunder', 'of Treasure', 'of Rum', 'Secret',
      'of the Tide', 'of Galleons', 'of Sirens', 'of Pearls', 'of Storms', 'Freeport',
    ],
  },
  merchant_crossroad: {
    prefixes: [
      'Bridge', 'Ford', 'Port', 'Gate', 'Post', 'Market', 'Exchange', 'Hall',
      'Quay', 'Crossing', 'Square', 'Carrefour', 'Depot', 'Arcade', 'Landing',
    ],
    suffixes: [
      'of Gold', 'of Spices', 'of Rivers', 'of Silk', 'Freeport', 'of Trade',
      'of Commerce', 'of Amber', 'of Caravans', 'of Guilds', 'of Bells', 'of Maps',
    ],
  },
  haunted_manor: {
    prefixes: [
      'Manor', 'Estate', 'Castle', 'House', 'Villa', 'Lodge', 'Hall', 'Keep',
      'Abbey', 'Tower', 'Pavilion', 'Priory', 'Grange', 'Mansion', 'Bastion',
    ],
    suffixes: [
      'Blackwood', 'of Shadows', 'of Whispers', 'Forgotten', 'of Specters', 'Ravenskeep',
      'Miststone', 'of Midnight', 'of Fog', 'of Bells', 'Hollow', 'Ashen',
    ],
  },
  magical_academy: {
    prefixes: [
      'Academy', 'University', 'Institute', 'College', 'Sanctuary', 'Cloister', 'Spires',
      'Conservatory', 'Library', 'Circle', 'Hall', 'Athenaeum', 'Tower', 'Seminary', 'Scholaria',
    ],
    suffixes: [
      'of Arcana', 'of Aeloria', 'of Stars', 'of High Sorcery', 'of Alchemy', 'of Lore',
      'of Runes', 'of Crystals', 'of Light', 'of Elements', 'of Wisdom', 'of Spells',
    ],
  },
  forbidden_wasteland: {
    prefixes: [
      'Plains', 'Desert', 'Crater', 'Rift', 'Barrens', 'Badlands', 'Zone', 'Basin',
      'Chasm', 'Mire', 'Plateau', 'Sands', 'Gorge', 'Flats', 'Moor',
    ],
    suffixes: [
      'of Ash', 'Forbidden', 'Toxic', 'Scorched', 'of Chaos', 'No Return',
      'of Soot', 'Dead', 'of Sulfur', 'Broken', 'of Rust', 'Charred',
    ],
  },
  ancient_pyramid_tomb: {
    prefixes: [
      'Pyramid', 'Tomb', 'Mastaba', 'Crypt', 'Vault', 'Temple', 'Sanctuary', 'Chamber',
      'Necropolis', 'Sepulcher', 'Labyrinth', 'Gallery', 'Obelisk', 'Shrine', 'Hall',
    ],
    suffixes: [
      'of Gold', 'of Khufu', 'Solar', 'Sealed', 'of Pharaohs', 'of Eternity',
      'of Traps', 'of Anubis', 'of Obsidian', 'of Sands', 'of Silence', 'of Sun',
    ],
  },
  epic_quest_name: {
    prefixes: [
      'Awakening', 'Fall', 'Secret', 'Quest', 'Sword', 'Return', 'Chalice', 'Shadow',
      'Oath', 'Crown', 'Song', 'Flame', 'Dawn', 'Trial', 'Journey',
    ],
    suffixes: [
      'of the Dragon', 'of the Lost King', 'of Arcana', 'of the Prophecy', 'of Emerald', 'of Destiny',
      'of the Ancients', 'of Light', 'of Stars', 'of the North', 'of Time', 'of Ashes',
    ],
  },
  legendary_armor: {
    prefixes: [
      'Breastplate', 'Harness', 'Cuirass', 'Aegis', 'Mail', 'Armor', 'Shield', 'Cloak',
      'Gauntlet', 'Helm', 'Greaves', 'Mantle', 'Pauldrons', 'Vambrace', 'Buckler',
    ],
    suffixes: [
      'of the Dragon', 'of Mithril', 'of Clarity', 'Unbroken', 'of the Titan', 'of Storms',
      'of Kings', 'Runic', 'of Light', 'of Dawn', 'of Shadows', 'Eternal',
    ],
  },
  magic_potion: {
    prefixes: [
      'Potion', 'Elixir', 'Philter', 'Decoction', 'Brew', 'Tear', 'Essence', 'Drop',
      'Tonic', 'Nectar', 'Dew', 'Balm', 'Infusion', 'Draft', 'Vial',
    ],
    suffixes: [
      'of Healing', 'of Vitality', 'of Pure Might', 'of Blue Mana', 'of Speed', 'of Night Sight',
      'of Amber', 'of Wisdom', 'of Flame', 'of Frost', 'of Emerald', 'Solar',
    ],
  },
  raid_dungeon_boss: {
    prefixes: [
      'Malakor', 'Gorgoroth', 'Ignis', 'Vorgath', 'Archon', 'Balar', 'Nekros', 'Kharath',
      'Titan', 'Vexar', 'Morgath', 'Thrax', 'Zulkar', 'Drakmor', 'Vorath',
    ],
    suffixes: [
      'Worldbreaker', 'the Relentless', 'the Devourer', 'Shadowlord', 'the Colossus', 'the Eternal',
      'the Scourge', 'of Ash', 'the Undying', 'of the Abyss', 'the Ironclad', 'Stormcaller',
    ],
  },
  moba_champion: {
    prefixes: [
      'Jax', 'Kael', 'Vex', 'Rik', 'Lyra', 'Zane', 'Sora', 'Kira',
      'Aura', 'Talon', 'Bane', 'Nova', 'Toren', 'Vesper', 'Nyx',
    ],
    suffixes: [
      'the Marksman', 'the Blade', 'the Shadow', 'the Colossus', 'the Arcane', 'the Wind',
      'the Just', 'the Flash', 'the Shield', 'the Hunter', 'the Frost', 'the Spark',
    ],
  },
  tcg_card_spell: {
    prefixes: [
      'Strike', 'Bolt', 'Blessing', 'Summoning', 'Revelation', 'Judgment', 'Shield', 'Wrath',
      'Tempest', 'Seal', 'Flame', 'Breath', 'Chain', 'Surge', 'Nova',
    ],
    suffixes: [
      'Divine', 'of the Skies', 'Thunderous', 'Blazing', 'of Purity', 'of the Mage',
      'Solar', 'of Souls', 'of Light', 'of Shadow', 'of Iron', 'Eternal',
    ],
  },
  loot_box_tier: {
    prefixes: [
      'Chest', 'Reliquary', 'Capsule', 'Treasure', 'Pact', 'Crate', 'Urn', 'Casket',
      'Trophy', 'Cache', 'Vault', 'Lockbox', 'Trunk', 'Coffer', 'Satchel',
    ],
    suffixes: [
      'of Diamond', 'Legendary', 'of Stars', 'Celestial', 'of Pure Gold', 'of the Champion',
      'Mythic', 'Royal', 'of Ruby', 'of Silver', 'Ascendant', 'Grand',
    ],
  },
  space_telescope: {
    prefixes: [
      'Telescope', 'Observatory', 'Gaze', 'Mirror', 'Eye', 'Vision', 'Probe', 'Beacon',
      'Lens', 'Horizon', 'Sensor', 'Optic', 'Array', 'Watcher', 'Scanner',
    ],
    suffixes: [
      'Copernicus', 'Galileo', 'Sagan', 'Urania', 'Kepler', 'Celestial', 'Deepfield', 'of Stars',
      'Huygens', 'Cassini', 'Halley', 'Lagrange',
    ],
  },
  astronomy_constellation: {
    prefixes: [
      'Crown', 'Dragon', 'Lyre', 'Phoenix', 'Swan', 'Vessel', 'Arrow', 'Wolf',
      'Chariot', 'Lantern', 'Compass', 'Harp', 'Serpent', 'Falcon', 'Shield',
    ],
    suffixes: [
      'Boreal', 'of Gold', 'of Stars', 'of Silver', 'Austral', 'Celestial', 'of Midnight', 'of Centauri',
      'of Orion', 'of Dawn', 'of Polaris', 'of Glass',
    ],
  },
  scientific_expedition: {
    prefixes: [
      'Expedition', 'Mission', 'Operation', 'Project', 'Campaign', 'Voyage', 'Survey', 'Traverse',
      'Passage', 'Quest', 'Team', 'Odyssey', 'Pioneer', 'Outpost', 'Taskforce',
    ],
    suffixes: [
      'Amundsen', 'Shackleton', 'Hadal', 'Polar', 'Abyssal', 'Horizon', 'Terra Nova', 'Borealis',
      'Nansen', 'Humboldt', 'Mariana', 'Meridian',
    ],
  },
  literary_magazine: {
    prefixes: [
      'Review', 'Notebooks', 'Gazette', 'Echo', 'Pages', 'Mask', 'Studio', 'Folio',
      'Margin', 'Chronicle', 'Letters', 'Journal', 'Compass', 'Lantern', 'Quarter',
    ],
    suffixes: [
      'Literary', 'of Letters', 'of the Times', 'of Writings', 'Modern', 'Poetic', 'of Ideas', 'Vellum',
      'Press', 'Essays', 'Dispatch', 'Culture',
    ],
  },
  experimental_cinema: {
    prefixes: [
      'Quiet Hours', 'Silence', 'One Summer', 'Nightfall', 'Shadow', 'Waves', 'Breath', 'Glimmer',
      'Winter Light', 'Broken Glass', 'Empty Streets', 'Still Water', 'Paper Moon', 'Cold Dawn', 'Slow Rain',
    ],
    suffixes: [
      'of Ash', 'of Gold', 'Suspended', 'of Sight', 'of Azure', 'of Dreams', 'Forgotten', 'Fading',
      'Unspoken', 'in Motion', 'Before Rain', 'Without Sound',
    ],
  },
  ted_talk_theme: {
    prefixes: [
      'The Art of', 'The Power of', 'Why We Must', 'Reinventing', 'The Future of', 'The Hidden Force of',
      'Rethinking', 'Beyond', 'Designing for', 'Building', 'Lessons from', 'The Science of',
      'How to Master', 'What Comes After', 'Inside',
    ],
    suffixes: [
      'Failure', 'Creativity', 'Trust', 'Empathy', 'Imagination', 'Resilience', 'Simplicity',
      'Curiosity', 'Listening', 'Focus', 'Courage', 'Discovery',
    ],
  },
  educational_escape_game: {
    prefixes: [
      'The Mystery', 'The Secret', 'The Riddle', 'The Case', 'The Challenge', 'The Treasure',
      'The Mission', 'The Enigma', 'The Cipher', 'The Labyrinth', 'The Trial', 'The Archive',
      'The Vault', 'The Code', 'The Quest',
    ],
    suffixes: [
      'of Da Vinci', 'of Pasteur', 'of the Pharaoh', 'of the Stars', 'of the Observatory',
      'of the Lab', 'of Manuscripts', 'of Archimedes', 'of Curie', 'of Galileo', 'of Maps', 'of Time',
    ],
  },
  clothing_brand: {
    prefixes: [
      'Nord', 'Ver', 'Aest', 'Kult', 'Mork', 'Raw', 'Form', 'Axis',
      'Brut', 'Sartor', 'Loom', 'Thread', 'Cairn', 'Timber', 'Slate',
    ],
    suffixes: [
      'label', 'studio', 'wear', 'atelier', 'craft', 'dept', 'line', 'works',
      'apparel', 'supply', 'tailor', 'cloth',
    ],
  },
  cosmetics_brand: {
    prefixes: [
      'Botan', 'Pure', 'Derm', 'Aura', 'Flora', 'Vege', 'Seren', 'Lys',
      'Hydra', 'Alba', 'Petal', 'Oat', 'Sage', 'Dew', 'Clay',
    ],
    suffixes: [
      'derm', 'care', 'lab', 'bio', 'ceutic', 'ia', 'is', 'glow',
      'pure', 'balm', 'botanics', 'skin',
    ],
  },
  jewelry_brand: {
    prefixes: [
      'Aur', 'Lumi', 'Solis', 'Argent', 'Cael', 'Gem', 'Opal', 'Astr',
      'Vera', 'Orea', 'Beryl', 'Pearl', 'Ivory', 'Carat', 'Prism',
    ],
    suffixes: [
      'ia', 'is', 'a', 'or', 'ance', 'ette', 'line', 'el',
      'io', 'fine', 'gems', 'craft',
    ],
  },
  mythic_creature: {
    prefixes: [
      'Peg', 'Gryf', 'Chim', 'Lev', 'Basili', 'Cer', 'Hydr', 'Manti',
      'Sphin', 'Wyv', 'Drak', 'Krak', 'Gorg', 'Fenir', 'Bansh',
    ],
    suffixes: [
      'or', 'ion', 'us', 'as', 'anth', 'cor', 'eon', 'oth',
      'rak', 'al', 'ax', 'en',
    ],
  },
  fictional_mentor: {
    prefixes: [
      'Gen', 'Muto', 'Haku', 'Oga', 'Roshi', 'Baku', 'Sensei', 'Ten',
      'Kenz', 'Jir', 'Kazu', 'Taka', 'Shiro', 'Mori', 'Ren',
    ],
    suffixes: [
      'shin', 'zan', 'ryu', 'ken', 'maru', 'zen', 'zo', 'hei',
      'do', 'ji', 'kaze', 'yama',
    ],
  },
  nordic_valkyrie: {
    prefixes: [
      'Brun', 'Sig', 'Hild', 'Gunn', 'Rann', 'Astr', 'Freya', 'Thrud',
      'Eira', 'Kara', 'Gerd', 'Skadi', 'Solv', 'Helg', 'Ingr',
    ],
    suffixes: [
      'hild', 'run', 'veig', 'dis', 'laug', 'gunn', 'gird', 'frida',
      'borg', 'maer', 'vor', 'linn',
    ],
  },
  phoenix_flame: {
    prefixes: [
      'Pyr', 'Sol', 'Ign', 'Flam', 'Aur', 'Heli', 'Kaly', 'Braiz',
      'Ether', 'Rayon', 'Vesta', 'Dawn', 'Ember', 'Cinder', 'Ash',
    ],
    suffixes: [
      'ix', 'ior', 'ael', 'ora', 'on', 'aris', 'flame', 'spark',
      'wing', 'zenith', 'crest', 'flare',
    ],
  },
  undead_lich: {
    prefixes: [
      'Mal', 'Mor', 'Nekr', 'Khar', 'Zul', 'Xan', 'Varn', 'Vex',
      'Than', 'Ghul', 'Oss', 'Sepul', 'Dread', 'Grim', 'Mourn',
    ],
    suffixes: [
      'az', 'mord', 'gath', 'zar', 'iel', 'oth', 'karn', 'vox',
      'thas', 'dred', 'mor', 'crypt',
    ],
  },
  desert_djinn: {
    prefixes: [
      'Qas', 'Ifr', 'Zaf', 'Rash', 'Sam', 'Far', 'Badr', 'Mal',
      'Dahr', 'Solh', 'Zayd', 'Tariq', 'Kareem', 'Nadir', 'Sabir',
    ],
    suffixes: [
      'im', 'rimal', 'qamar', 'ouan', 'azur', 'emir', 'khan', 'shir',
      'abad', 'oud', 'mir', 'dinar',
    ],
  },
};

export function resolveEnglishDomainPool(
  generatorId: string,
  style: string,
  base: SubcategoryData
): SubcategoryData {
  const styleKey = `${generatorId}.${style}`;
  const exact = ENGLISH_STYLE_POOLS[styleKey];
  if (exact) {
    return { ...base, ...exact };
  }

  // Fallback for other styles of the same generator (e.g., default style alias)
  const genPool = ENGLISH_GENERATOR_POOLS[generatorId];
  if (genPool) {
    return { ...base, ...genPool };
  }

  // If requesting an alternate style under a generator defined in ENGLISH_STYLE_POOLS,
  // check for `<generatorId>.default` or first matching entry for that generatorId.
  const defaultStylePool =
    ENGLISH_STYLE_POOLS[`${generatorId}.default`] ||
    Object.entries(ENGLISH_STYLE_POOLS).find(([k]) => k.startsWith(`${generatorId}.`))?.[1];
  if (defaultStylePool) {
    return { ...base, ...defaultStylePool };
  }

  return base;
}

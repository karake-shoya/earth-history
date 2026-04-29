export type ParticleConfig = {
  count: number;
  colors: string[];
  shape: 'circle' | 'star' | 'triangle' | 'spark' | 'snowflake';
  speed: number;
  size: { min: number; max: number };
  behavior: 'float' | 'lava' | 'glow' | 'freeze' | 'swim' | 'meteor' | 'orbit';
  opacity: { min: number; max: number };
};

export type EraEvent = {
  id: string;
  title: string;
  detail: string;
  icon: string;
  timeLabel: string;
};

export type Era = {
  id: string;
  name: string;
  nameEn: string;
  period: string;
  eon: string;
  tagline: string;
  bgGradient: string;
  accentColor: string;
  textColor: string;
  particles: ParticleConfig;
  events: EraEvent[];
};

export const ERAS: Era[] = [
  {
    id: 'bigbang',
    name: 'ビッグバン〜太陽系形成',
    nameEn: 'Big Bang & Solar System',
    period: '138億〜46億年前',
    eon: '宇宙の夜明け',
    tagline: '無から宇宙が生まれた',
    bgGradient: 'linear-gradient(180deg, #000000 0%, #0a0015 50%, #00001a 100%)',
    accentColor: '#7c3aed',
    textColor: '#e2d9f3',
    particles: {
      count: 200,
      colors: ['#ffffff', '#ffe066', '#a78bfa', '#60a5fa', '#f472b6'],
      shape: 'star',
      behavior: 'orbit',
      speed: 0.3,
      size: { min: 1, max: 4 },
      opacity: { min: 0.2, max: 1.0 },
    },
    events: [
      {
        id: 'bigbang-event',
        title: 'ビッグバン',
        detail: '時間・空間・エネルギーが一点から誕生した',
        icon: '💥',
        timeLabel: '138億年前',
      },
      {
        id: 'first-stars',
        title: '最初の星の誕生',
        detail: '水素とヘリウムが集まり、宇宙最初の星が輝いた',
        icon: '⭐',
        timeLabel: '135億年前',
      },
      {
        id: 'milkyway',
        title: '天の川銀河の形成',
        detail: '数千億の星を抱く銀河が姿を現した',
        icon: '🌌',
        timeLabel: '135億年前',
      },
      {
        id: 'solar-nebula',
        title: '太陽系星雲の収縮',
        detail: '超新星爆発の残骸が渦を巻き、太陽と惑星の種が生まれた',
        icon: '🌀',
        timeLabel: '46億年前',
      },
      {
        id: 'sun-born',
        title: '太陽の誕生',
        detail: '核融合が始まり、太陽が点火した',
        icon: '☀️',
        timeLabel: '46億年前',
      },
      {
        id: 'earth-born',
        title: '地球の誕生',
        detail: '微惑星の衝突・合体が繰り返され、原始地球が形成された',
        icon: '🌍',
        timeLabel: '45.6億年前',
      },
    ],
  },
  {
    id: 'hadean',
    name: '冥王代',
    nameEn: 'Hadean Eon',
    period: '46億〜40億年前',
    eon: '冥王代',
    tagline: '地獄のような灼熱の世界',
    bgGradient: 'linear-gradient(180deg, #1a0000 0%, #3d0000 40%, #7f1200 100%)',
    accentColor: '#ef4444',
    textColor: '#fecaca',
    particles: {
      count: 150,
      colors: ['#ff4500', '#ff8c00', '#ffd700', '#ff6347', '#ff1a00'],
      shape: 'spark',
      behavior: 'lava',
      speed: 1.5,
      size: { min: 2, max: 8 },
      opacity: { min: 0.4, max: 1.0 },
    },
    events: [
      {
        id: 'magma-ocean',
        title: 'マグマオーシャン',
        detail: '地球全体がマグマに覆われ、灼熱の海が広がっていた',
        icon: '🌋',
        timeLabel: '45億年前',
      },
      {
        id: 'moon-formation',
        title: '月の誕生（ジャイアントインパクト）',
        detail: 'テイアという天体が衝突し、飛び散った破片が月を形成した',
        icon: '🌕',
        timeLabel: '45億年前',
      },
      {
        id: 'late-heavy-bombardment',
        title: '後期重爆撃期',
        detail: '無数の隕石が地球に降り注ぎ、クレーターを刻んだ',
        icon: '☄️',
        timeLabel: '41億年前',
      },
      {
        id: 'first-ocean',
        title: '原始海洋の誕生',
        detail: '地球が冷え始め、水蒸気が凝結して最初の海が生まれた',
        icon: '🌊',
        timeLabel: '40億年前',
      },
      {
        id: 'zircon',
        title: '最古の鉱物（ジルコン）',
        detail: '現存する最古の鉱物。当時の地球環境を今に伝える証人',
        icon: '💎',
        timeLabel: '44億年前',
      },
    ],
  },
  {
    id: 'archean',
    name: '太古代',
    nameEn: 'Archean Eon',
    period: '40億〜25億年前',
    eon: '太古代',
    tagline: '深海の暗闇に生命が灯る',
    bgGradient: 'linear-gradient(180deg, #000d1a 0%, #001a33 50%, #002b4d 100%)',
    accentColor: '#06b6d4',
    textColor: '#a5f3fc',
    particles: {
      count: 100,
      colors: ['#00ffcc', '#0099ff', '#66ffcc', '#33ccff', '#00e5ff'],
      shape: 'circle',
      behavior: 'glow',
      speed: 0.2,
      size: { min: 2, max: 7 },
      opacity: { min: 0.1, max: 0.8 },
    },
    events: [
      {
        id: 'first-life',
        title: '最初の生命の誕生',
        detail: '深海熱水噴出孔付近で、最初の単細胞生物が誕生した',
        icon: '🦠',
        timeLabel: '38億年前',
      },
      {
        id: 'stromatolite',
        title: 'ストロマトライトの繁栄',
        detail: 'シアノバクテリアが積み重なり、岩のような構造体を形成した',
        icon: '🪨',
        timeLabel: '35億年前',
      },
      {
        id: 'photosynthesis',
        title: '光合成の始まり',
        detail: 'シアノバクテリアが太陽光を使ってエネルギーを生産し始めた',
        icon: '🌿',
        timeLabel: '34億年前',
      },
      {
        id: 'first-continent',
        title: '最初の大陸核の形成',
        detail: 'プレートテクトニクスが始まり、原始大陸が形成された',
        icon: '🗺️',
        timeLabel: '30億年前',
      },
      {
        id: 'first-eukaryote',
        title: '真核生物の出現',
        detail: '核を持つ複雑な細胞が登場。生命進化の大きな一歩',
        icon: '🔬',
        timeLabel: '27億年前',
      },
    ],
  },
  {
    id: 'proterozoic',
    name: '原生代',
    nameEn: 'Proterozoic Eon',
    period: '25億〜5.41億年前',
    eon: '原生代',
    tagline: '地球が凍り、生命が進化した',
    bgGradient: 'linear-gradient(180deg, #001533 0%, #002244 50%, #0a1a3d 100%)',
    accentColor: '#93c5fd',
    textColor: '#dbeafe',
    particles: {
      count: 120,
      colors: ['#ffffff', '#bfdbfe', '#e0f2fe', '#dde9ff', '#c7d2fe'],
      shape: 'snowflake',
      behavior: 'freeze',
      speed: 0.5,
      size: { min: 3, max: 12 },
      opacity: { min: 0.3, max: 0.9 },
    },
    events: [
      {
        id: 'great-oxidation',
        title: '大酸化イベント',
        detail: 'シアノバクテリアが大量の酸素を放出し、大気を一変させた',
        icon: '💨',
        timeLabel: '24億年前',
      },
      {
        id: 'snowball-earth-1',
        title: '全球凍結（スノーボールアース）',
        detail: '地球全体が氷に覆われ、表面温度はマイナス50℃以下になった',
        icon: '🧊',
        timeLabel: '22億年前',
      },
      {
        id: 'endosymbiosis',
        title: '細胞内共生',
        detail: '細菌が別の細胞に取り込まれ、ミトコンドリアと葉緑体の起源となった',
        icon: '🔗',
        timeLabel: '20億年前',
      },
      {
        id: 'multicellular',
        title: '多細胞生物の出現',
        detail: '複数の細胞が協力して生きる、新しい生命の形が誕生した',
        icon: '🧬',
        timeLabel: '12億年前',
      },
      {
        id: 'snowball-earth-2',
        title: '第二次全球凍結',
        detail: '再び地球全体が氷河に覆われた。凍結と融解が生命進化を加速させた',
        icon: '❄️',
        timeLabel: '7億年前',
      },
      {
        id: 'ediacaran',
        title: 'エディアカラ生物群の繁栄',
        detail: '軟体性の大型多細胞生物が海底に広がり、生態系が多様化した',
        icon: '🐾',
        timeLabel: '5.7億年前',
      },
    ],
  },
  {
    id: 'paleozoic',
    name: '古生代',
    nameEn: 'Paleozoic Era',
    period: '5.41億〜2.52億年前',
    eon: '古生代',
    tagline: '生命が爆発的に多様化した',
    bgGradient: 'linear-gradient(180deg, #052e16 0%, #14532d 50%, #166534 100%)',
    accentColor: '#4ade80',
    textColor: '#bbf7d0',
    particles: {
      count: 80,
      colors: ['#86efac', '#4ade80', '#6ee7b7', '#34d399', '#a7f3d0'],
      shape: 'triangle',
      behavior: 'swim',
      speed: 0.8,
      size: { min: 4, max: 12 },
      opacity: { min: 0.2, max: 0.7 },
    },
    events: [
      {
        id: 'cambrian-explosion',
        title: 'カンブリア爆発',
        detail: '短期間で動物の主要な体制（ボディプラン）が一気に出現した',
        icon: '💫',
        timeLabel: '5.41億年前',
      },
      {
        id: 'first-fish',
        title: '最初の魚類の出現',
        detail: '顎のない原始的な魚が登場。脊椎動物の歴史が始まった',
        icon: '🐟',
        timeLabel: '5億年前',
      },
      {
        id: 'land-plants',
        title: '植物の陸上進出',
        detail: '苔類が海から陸へ進出し、緑の大地を作り始めた',
        icon: '🌱',
        timeLabel: '4.7億年前',
      },
      {
        id: 'first-insect',
        title: '昆虫の出現',
        detail: '最初の昆虫が陸上に登場し、後に空を制覇した',
        icon: '🦋',
        timeLabel: '4億年前',
      },
      {
        id: 'first-tetrapod',
        title: '四肢動物の陸上進出',
        detail: 'ヒレが足に進化し、魚類が陸に上がり始めた',
        icon: '🦎',
        timeLabel: '3.75億年前',
      },
      {
        id: 'first-reptile',
        title: '爬虫類の出現',
        detail: '完全に陸上で繁殖できる羊膜卵を持つ爬虫類が誕生した',
        icon: '🐊',
        timeLabel: '3.1億年前',
      },
      {
        id: 'permian-extinction',
        title: 'ペルム紀大絶滅',
        detail: '地球史最大の絶滅事件。海洋種の96%、陸生種の70%が消えた',
        icon: '💀',
        timeLabel: '2.52億年前',
      },
    ],
  },
  {
    id: 'mesozoic',
    name: '中生代',
    nameEn: 'Mesozoic Era',
    period: '2.52億〜6600万年前',
    eon: '中生代',
    tagline: '恐竜たちの王国が栄えた',
    bgGradient: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #3d2b1f 100%)',
    accentColor: '#f97316',
    textColor: '#fed7aa',
    particles: {
      count: 60,
      colors: ['#fed7aa', '#fb923c', '#f97316', '#ea580c', '#fbbf24'],
      shape: 'star',
      behavior: 'meteor',
      speed: 3.0,
      size: { min: 2, max: 6 },
      opacity: { min: 0.5, max: 1.0 },
    },
    events: [
      {
        id: 'first-dinosaur',
        title: '恐竜の出現',
        detail: '最初の恐竜が登場。小型で二足歩行だった',
        icon: '🦕',
        timeLabel: '2.3億年前',
      },
      {
        id: 'first-mammal',
        title: '哺乳類の出現',
        detail: '夜行性の小型哺乳類が恐竜の足元で生き延びた',
        icon: '🐀',
        timeLabel: '2.2億年前',
      },
      {
        id: 'pangaea-split',
        title: 'パンゲア大陸の分裂',
        detail: '超大陸パンゲアが分裂し、現在の大陸配置へと変化し始めた',
        icon: '🌍',
        timeLabel: '2億年前',
      },
      {
        id: 'first-bird',
        title: '鳥類の出現（始祖鳥）',
        detail: '羽毛を持つ恐竜から鳥類へ。空への進出が始まった',
        icon: '🦅',
        timeLabel: '1.5億年前',
      },
      {
        id: 'flowering-plants',
        title: '花を咲かせる植物の出現',
        detail: '被子植物が登場し、昆虫との共進化で爆発的に多様化した',
        icon: '🌸',
        timeLabel: '1.3億年前',
      },
      {
        id: 'kpg-extinction',
        title: 'K-Pg絶滅（隕石衝突）',
        detail: '直径10kmの隕石がユカタン半島に衝突。恐竜時代が終焉した',
        icon: '☄️',
        timeLabel: '6600万年前',
      },
    ],
  },
  {
    id: 'cenozoic',
    name: '新生代',
    nameEn: 'Cenozoic Era',
    period: '6600万年前〜現在',
    eon: '新生代',
    tagline: '哺乳類の時代、そして人類へ',
    bgGradient: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 50%, #075985 100%)',
    accentColor: '#38bdf8',
    textColor: '#bae6fd',
    particles: {
      count: 70,
      colors: ['#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#e0f7ff'],
      shape: 'circle',
      behavior: 'float',
      speed: 0.4,
      size: { min: 3, max: 8 },
      opacity: { min: 0.2, max: 0.6 },
    },
    events: [
      {
        id: 'mammals-dominate',
        title: '哺乳類の爆発的多様化',
        detail: '恐竜絶滅後、哺乳類が空いたニッチを埋めるように多様化した',
        icon: '🐘',
        timeLabel: '6500万年前',
      },
      {
        id: 'himalaya-rise',
        title: 'ヒマラヤ山脈の隆起',
        detail: 'インドプレートがアジアに衝突し、世界最高峰の山脈が形成された',
        icon: '⛰️',
        timeLabel: '5000万年前',
      },
      {
        id: 'first-primate',
        title: '霊長類の出現',
        detail: '木の上で生活する霊長類が登場。人類への道が始まった',
        icon: '🐒',
        timeLabel: '5500万年前',
      },
      {
        id: 'ice-age',
        title: '氷河時代の始まり',
        detail: '地球が寒冷化し、繰り返す氷河期が生態系を大きく変えた',
        icon: '🏔️',
        timeLabel: '260万年前',
      },
      {
        id: 'homo-sapiens',
        title: 'ホモ・サピエンスの誕生',
        detail: '現代人類がアフリカで誕生し、やがて全世界へと広がった',
        icon: '👤',
        timeLabel: '30万年前',
      },
      {
        id: 'agriculture',
        title: '農業革命',
        detail: '人類が農業を始め、文明の礎が築かれた',
        icon: '🌾',
        timeLabel: '1万年前',
      },
      {
        id: 'today',
        title: '現在',
        detail: '46億年の歴史が積み重なり、今この瞬間がある',
        icon: '🌏',
        timeLabel: '現在',
      },
    ],
  },
];

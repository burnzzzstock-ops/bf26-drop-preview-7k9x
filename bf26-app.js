if (new URLSearchParams(location.search).get('owner') === '1') document.body.classList.add('show-owner-ctrl');
const FREE_SHIP_AT = 150;
const FREE_GIFT_AT = 200;
const FREE_GIFT_ID = 'sp01-slopcc-tech-sticker-pack';

let DATA = { hero: [], products: [] };
const DEFAULT_FUNKY_SIX = [
  'fk01-acid-checker-socks',
  'fk02-flir-thermal-socks',
  'fk03-crt-glitch-socks',
  'fk04-graffiti-bomb-socks',
  'fk05-popart-snout-socks',
  'fk06-acid-slime-socks'
];
const VARSITY_SNOUT_SIX = [
  'so01-acid-snout-socks',
  'so02-varsity-snout-socks',
  'so06-slopcannon-script-socks',
  'sv03-oxblood-split-socks',
  'sv04-bone-cobalt-varsity-socks',
  'sv06-obsidian-varsity-socks'
];
let state = { coll: 'all', q: '', sort: 'featured', owner: false, cart: [], activeProd: null, activeSize: null, activeColor: null, activeGallery: [], activeImgIdx: 0, cardColors: {}, suitTopSz: 'L', suitBotSz: 'L', customSockBox: [], lastDroppedSlot: -1, slopBox25: { stickers: ['sp01-slopcc-tech-sticker-pack', 'sp02-snout-logo-sticker-pack'], keychain: 'kc03-chrome-snout-keychain', sock: 'so02-varsity-snout-socks', mystery: false } };

// Official 2-Piece Tracksuit Sets (automatic discount in cart + 1-click Set Selector!)
const TRACKSUIT_SETS = [
  {
    key: 'speed-snout-set',
    title: 'Speed Snout Full Tracksuit',
    sub: 'Speed Snout Jacket + Snout Surge Pants · Save $14 automatically in bag',
    topId: 'ts07-move-loud-track-jacket',
    botId: '12-snout-surge',
    save: 14
  },
  {
    key: 'coral-topo-set',
    title: 'Coral Topo Full Tracksuit',
    sub: 'Topo Shell Jacket + Topo Track Pants · Save $10 automatically in bag',
    topId: 'ts10-topo-windbreaker',
    botId: 'ts10-topo-track-pants',
    save: 10
  }
];

// Curated Cross-Sell Pairings (all wired to live approved merch!)
const PAIRINGS = {
  "jh02-archive-snout-bone": [
    "sh20-cannon-coral-topo",
    "13-repeat-offender",
    "so02-varsity-snout-socks"
  ],
  "jh03-burnt-orange-collegiate": [
    "sv03-oxblood-split-socks",
    "carryover-slop-script-beanie",
    "sh21-riso-zine"
  ],
  "jh18-explosive-thermal": [
    "fk02-flir-thermal-socks",
    "sh19-alt-charcoal-boro",
    "acid-camo-joggers"
  ],
  "jh20-brutalist-zine": [
    "sh21-riso-zine",
    "fk04-graffiti-bomb-socks",
    "sp04-graffiti-sticker-pack"
  ],
  "ts07-move-loud-track-jacket": [
    "12-snout-surge",
    "sh30-snout-slide",
    "sv04-bone-cobalt-varsity-socks"
  ],
  "ts10-topo-windbreaker": [
    "ts10-topo-track-pants",
    "sh20-cannon-coral-topo",
    "so02-varsity-snout-socks"
  ],
  "ts10-topo-track-pants": [
    "ts10-topo-windbreaker",
    "sh20-cannon-coral-topo",
    "so02-varsity-snout-socks"
  ],
  "jh17-jacquard-knit-hoodie": [
    "sh19-alt-charcoal-boro",
    "carryover-slopcannon-cuffed-beanie",
    "sv06-obsidian-varsity-socks"
  ],
  "qz10-indigo-boro-quarter-zip": [
    "sh19-indigo-boro",
    "keep-06-slop-script-snapback",
    "sv04-bone-cobalt-varsity-socks"
  ],
  "x03-holiday-broadcast-static": [
    "fk03-crt-glitch-socks",
    "carryover-slopcannon-cuffed-beanie",
    "sh09-rainbow-crt-slipon"
  ],
  "x05-icicle-slop": [
    "carryover-slop-script-beanie",
    "sh28-alt-cad-schematic",
    "sv06-obsidian-varsity-socks"
  ],
  "x02-north-pole-ordnance": [
    "carryover-slop-script-beanie",
    "sv03-oxblood-split-socks",
    "so6pk-funky-6pack-box"
  ],
  "ls10-cyber-camo-long-sleeve": [
    "acid-camo-joggers",
    "so01-acid-snout-socks",
    "sh04-acid-checker"
  ],
  "acid-camo-joggers": [
    "ls10-cyber-camo-long-sleeve",
    "11-acid-transmission",
    "sh04-acid-checker"
  ],
  "channel-drip-mesh-shorts-v3": [
    "ls10-cyber-camo-long-sleeve",
    "so01-acid-snout-socks",
    "sh30-snout-slide"
  ],
  "08-sonic-snout": [
    "12-snout-surge",
    "13-repeat-offender",
    "sh19-alt-charcoal-boro"
  ],
  "09-dot-riot": [
    "13-repeat-offender",
    "sh21-riso-zine",
    "sv04-bone-cobalt-varsity-socks"
  ],
  "10-orbit-breaker": [
    "13-repeat-offender",
    "jh02-archive-snout-bone",
    "sv04-bone-cobalt-varsity-socks"
  ],
  "11-acid-transmission": [
    "acid-camo-joggers",
    "so01-acid-snout-socks",
    "fk06-acid-slime-socks"
  ],
  "12-snout-surge": [
    "ts07-move-loud-track-jacket",
    "08-sonic-snout",
    "sv06-obsidian-varsity-socks"
  ],
  "13-repeat-offender": [
    "08-sonic-snout",
    "sh30-snout-slide",
    "so02-varsity-snout-socks"
  ],
  "t15-late-night-crt": [
    "sh09-rainbow-crt-slipon",
    "fk03-crt-glitch-socks",
    "t02d-dead-channel-box-tee"
  ],
  "t02d-dead-channel-box-tee": [
    "sh09-rainbow-crt-slipon",
    "fk03-crt-glitch-socks",
    "ls04a-code-shader"
  ],
  "t07-airbrush-vortex-box-tee": [
    "sh28-alt-cad-schematic",
    "ls04b-wireframe-keynote",
    "kc03-chrome-snout-keychain"
  ],
  "t09-acid-checker-tee": [
    "sh04-acid-checker",
    "fk01-acid-checker-socks",
    "channel-drip-mesh-shorts-v3"
  ],
  "ls04a-code-shader": [
    "sh28-alt-cad-schematic",
    "acid-camo-joggers",
    "fk07-vhs-broadcast-socks"
  ],
  "ls04b-wireframe-keynote": [
    "sh28-alt-cad-schematic",
    "t02d-dead-channel-box-tee",
    "fk07-vhs-broadcast-socks"
  ],
  "sh19-indigo-boro": [
    "qz10-indigo-boro-quarter-zip",
    "sv04-bone-cobalt-varsity-socks",
    "keep-06-slop-script-snapback"
  ],
  "sh19-alt-charcoal-boro": [
    "jh17-jacquard-knit-hoodie",
    "jh20-brutalist-zine",
    "sv06-obsidian-varsity-socks"
  ],
  "sh20-cannon-coral-topo": [
    "ts10-topo-windbreaker",
    "ts10-topo-track-pants",
    "so02-varsity-snout-socks"
  ],
  "sh09-rainbow-crt-slipon": [
    "t15-late-night-crt",
    "t02d-dead-channel-box-tee",
    "fk03-crt-glitch-socks"
  ],
  "sh21-riso-zine": [
    "jh20-brutalist-zine",
    "09-dot-riot",
    "fk04-graffiti-bomb-socks"
  ],
  "sh21-alt-midnight-riso": [
    "jh20-brutalist-zine",
    "t02d-dead-channel-box-tee",
    "fk08-comic-halftone-socks"
  ],
  "sh28-alt-cad-schematic": [
    "ls04b-wireframe-keynote",
    "ls04a-code-shader",
    "sv06-obsidian-varsity-socks"
  ],
  "sh04-acid-checker": [
    "t09-acid-checker-tee",
    "fk01-acid-checker-socks",
    "acid-camo-joggers"
  ],
  "sh30-snout-slide": [
    "13-repeat-offender",
    "channel-drip-mesh-shorts-v3",
    "so6pk-funky-6pack-box"
  ],
  "so01-acid-snout-socks": [
    "channel-drip-mesh-shorts-v3",
    "sh04-acid-checker",
    "so6pk-funky-6pack-box"
  ],
  "so02-varsity-snout-socks": [
    "jh02-archive-snout-bone",
    "sh20-cannon-coral-topo",
    "so4pk-snout-crew-4pack"
  ],
  "so06-slopcannon-script-socks": [
    "carryover-wiglet-slop-hoodie",
    "carryover-slop-script-tee",
    "so4pk-snout-crew-4pack"
  ],
  "fk01-acid-checker-socks": [
    "t09-acid-checker-tee",
    "sh04-acid-checker",
    "so6pk-funky-6pack-box"
  ],
  "fk02-flir-thermal-socks": [
    "jh18-explosive-thermal",
    "sh30-snout-slide",
    "so6pk-funky-6pack-box"
  ],
  "fk03-crt-glitch-socks": [
    "t15-late-night-crt",
    "sh09-rainbow-crt-slipon",
    "so6pk-funky-6pack-box"
  ],
  "fk04-graffiti-bomb-socks": [
    "jh20-brutalist-zine",
    "sh21-riso-zine",
    "so6pk-funky-6pack-box"
  ],
  "fk05-popart-snout-socks": [
    "09-dot-riot",
    "sh21-riso-zine",
    "so6pk-funky-6pack-box"
  ],
  "fk06-acid-slime-socks": [
    "ls10-cyber-camo-long-sleeve",
    "channel-drip-mesh-shorts-v3",
    "so6pk-funky-6pack-box"
  ],
  "fk07-vhs-broadcast-socks": [
    "t02d-dead-channel-box-tee",
    "x03-holiday-broadcast-static",
    "so6pk-funky-6pack-box"
  ],
  "fk08-comic-halftone-socks": [
    "jh20-brutalist-zine",
    "sh21-alt-midnight-riso",
    "so6pk-funky-6pack-box"
  ],
  "fk09-liquid-marble-socks": [
    "11-acid-transmission",
    "ls04a-code-shader",
    "so6pk-funky-6pack-box"
  ],
  "sv03-oxblood-split-socks": [
    "jh03-burnt-orange-collegiate",
    "x02-north-pole-ordnance",
    "so6pk-funky-6pack-box"
  ],
  "sv04-bone-cobalt-varsity-socks": [
    "qz10-indigo-boro-quarter-zip",
    "sh19-indigo-boro",
    "so6pk-funky-6pack-box"
  ],
  "sv06-obsidian-varsity-socks": [
    "jh17-jacquard-knit-hoodie",
    "sh19-alt-charcoal-boro",
    "so4pk-snout-crew-4pack"
  ],
  "so4pk-snout-crew-4pack": [
    "sh30-snout-slide",
    "carryover-wiglet-slop-hoodie",
    "jh02-archive-snout-bone"
  ],
  "so6pk-funky-6pack-box": [
    "slop-box-25-starter-kit",
    "sh30-snout-slide",
    "jh02-archive-snout-bone"
  ],
  "slop-box-25-starter-kit": [
    "so6pk-funky-6pack-box",
    "carryover-wiglet-slop-hoodie",
    "sh30-snout-slide"
  ],
  "sp01-slopcc-tech-sticker-pack": [
    "ls04a-code-shader",
    "kc04-cannon-jet-tag",
    "t02d-dead-channel-box-tee"
  ],
  "sp02-snout-logo-sticker-pack": [
    "jh02-archive-snout-bone",
    "kc03-chrome-snout-keychain",
    "08-sonic-snout"
  ],
  "sp04-graffiti-sticker-pack": [
    "jh20-brutalist-zine",
    "fk04-graffiti-bomb-socks",
    "sh21-riso-zine"
  ],
  "kc03-chrome-snout-keychain": [
    "t07-airbrush-vortex-box-tee",
    "jh02-archive-snout-bone",
    "keep-06-slop-script-snapback"
  ],
  "kc04-cannon-jet-tag": [
    "ts10-topo-windbreaker",
    "jh20-brutalist-zine",
    "sh20-cannon-coral-topo"
  ],
  "kc06-enamel-cannon-keychain": [
    "jh03-burnt-orange-collegiate",
    "carryover-wiglet-slop-hoodie",
    "keep-06-slop-script-snapback"
  ],
  "carryover-wiglet-slop-hoodie": [
    "keep-06-slop-script-snapback",
    "carryover-slop-script-tee",
    "so06-slopcannon-script-socks"
  ],
  "carryover-slop-script-tee": [
    "carryover-wiglet-slop-hoodie",
    "keep-06-slop-script-snapback",
    "so06-slopcannon-script-socks"
  ],
  "carryover-slop-script-polo": [
    "keep-06-slop-script-snapback",
    "sh19-alt-charcoal-boro",
    "sv06-obsidian-varsity-socks"
  ],
  "carryover-slopcannon-cuffed-beanie": [
    "jh17-jacquard-knit-hoodie",
    "x03-holiday-broadcast-static",
    "carryover-wiglet-slop-hoodie"
  ],
  "carryover-slop-script-beanie": [
    "jh02-archive-snout-bone",
    "x05-icicle-slop",
    "carryover-wiglet-slop-hoodie"
  ],
  "keep-06-slop-script-snapback": [
    "carryover-wiglet-slop-hoodie",
    "carryover-slop-script-tee",
    "t02d-dead-channel-box-tee"
  ]
};

// Blank-accurate Fit, Model Reference, Size Charts & Care Specs
function getFitSpec(p) {
  const pid = p.pf_id;
  if (pid === 1628) return {
    badge: 'Oversized boxy fit',
    model: 'Studio model is 6\'1" (185 cm) wearing Size L — roomy drop-shoulder cut.',
    care: '<strong>Dispatch &amp; Care:</strong> Cut &amp; sewn to order in 3–5 biz days &middot; Cold wash inside-out, hang dry.',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
    rows: [['S','45.5','27.5','24.0'],['M','47.2','28.3','24.4'],['L','50.4','29.1','24.8'],['XL','53.5','29.9','25.2'],['2XL','56.7','30.7','25.6']]
  };
  if (pid === 734 || pid === 146) return {
    badge: 'Relaxed heavyweight',
    model: 'Studio model is 6\'1" (185 cm) wearing Size L — true streetwear drape.',
    care: '<strong>Dispatch &amp; Care:</strong> Printed to order in 2–4 biz days &middot; Cold wash inside-out, low tumble or hang dry.',
    headers: ['Size', 'Chest (in)', 'Length (in)'],
    rows: [['S','44.0','27.5'],['M','47.0','28.5'],['L','50.0','29.5'],['XL','53.0','30.5'],['2XL','56.0','31.5']]
  };
  if (pid === 1699 || pid === 1703 || pid === 769) return {
    badge: 'Custom jacquard knit',
    model: 'Studio model is 6\'0" (183 cm) wearing Size L — relaxed true-to-size sweater cut.',
    care: '<strong>Dispatch &amp; Care:</strong> Knitted yarn-by-yarn in 4–6 biz days &middot; Cold gentle wash flat-dry only (never hang wet knitwear).',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
    rows: [['S','43.3','26.8','23.6'],['M','45.7','27.6','24.0'],['L','48.0','28.3','24.4'],['XL','50.4','29.1','24.8'],['2XL','52.8','29.9','25.2']]
  };
  if (pid === 917 || pid === 586 || pid === 71 || pid === 340) return {
    badge: pid === 917 ? 'Boxy 7.5 oz tee' : 'Classic relaxed fit',
    model: 'Studio model is 6\'0" (183 cm) wearing Size L — structured collar, boxy drape.',
    care: '<strong>Dispatch &amp; Care:</strong> Printed in 2–4 biz days &middot; Wash cold inside-out with mild detergent, hang dry to keep ink crisp.',
    headers: ['Size', 'Chest (in)', 'Length (in)'],
    rows: [['S','41.0','27.5'],['M','44.0','28.5'],['L','47.5','29.5'],['XL','51.0','30.7'],['2XL','54.5','31.8']]
  };
  if (pid === 748 || pid === 753 || pid === 920 || pid === 956) return {
    badge: 'Streetwear long sleeve',
    model: 'Studio model is 6\'0" (183 cm) wearing Size L — relaxed sleeve rib.',
    care: '<strong>Dispatch &amp; Care:</strong> Made to order in 2–5 biz days &middot; Cold wash inside-out, hang dry.',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
    rows: [['S','40.0','28.0','25.0'],['M','44.0','29.0','25.6'],['L','48.0','30.0','26.2'],['XL','52.0','31.0','26.8'],['2XL','56.0','32.0','27.4']]
  };
  if (pid === 801 || pid === 615) return {
    badge: 'Technical track shell',
    model: 'Studio model is 6\'1" (185 cm) wearing Size L — room to layer over a tee or hoodie.',
    care: '<strong>Dispatch &amp; Care:</strong> Cut &amp; sewn to order in 3–5 biz days &middot; Cold gentle wash, zip closed, hang dry.',
    headers: ['Size', 'Chest (in)', 'Length (in)'],
    rows: [['S','43.5','27.2'],['M','46.5','28.0'],['L','49.5','28.8'],['XL','52.5','29.6'],['2XL','55.5','30.4']]
  };
  if (pid === 618 || pid === 784 || pid === 693) return {
    badge: 'Elastic drawstring waist',
    model: 'Studio model is 6\'1" (185 cm, 32" waist) wearing Size L — relaxed tapered leg.',
    care: '<strong>Dispatch &amp; Care:</strong> Cut &amp; sewn in 3–5 biz days &middot; Cold wash, hang dry.',
    headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)'],
    rows: [['S','29–31','39.5', pid===693?'6.5':'29.5'],['M','31–33','41.5', pid===693?'6.8':'30.0'],['L','33–36','44.0', pid===693?'7.0':'30.5'],['XL','36–39','47.0', pid===693?'7.3':'31.0'],['2XL','39–42','50.0', pid===693?'7.5':'31.5']]
  };
  if (p.collection === 'footwear') return {
    badge: 'True US men\'s sizing',
    model: 'Women size down 1.5 sizes (e.g. Women\'s 8.5 = US 7). Between sizes? Size up.',
    care: '<strong>Dispatch &amp; Care:</strong> Custom lasted in 4–6 biz days &middot; Spot clean canvas/EVA with damp cloth.',
    headers: ['US Men', 'US Women', 'EU', 'Foot (cm)'],
    rows: [['US 8','9.5','41','26.0'],['US 9','10.5','42.5','27.0'],['US 10','11.5','44','27.8'],['US 11','12.5','45','28.6'],['US 12','13.5','46','29.4']]
  };
  if (pid === 186) return {
    badge: 'Cushioned crew height',
    model: 'Sublimated knit crew w/ reinforced black heel &amp; footbed. Mix any 4 singles (-$12), or any 6 (-$26 + FREE Sloppy Six Pack Box)!',
    care: '<strong>Dispatch &amp; Care:</strong> Ships in 2–4 biz days &middot; Machine wash cold, tumble low.',
    headers: ['Sock Size', 'US Men\'s Shoe', 'US Women\'s Shoe'],
    rows: [['M','6 – 8.5','7 – 9.5'],['L','9 – 11.5','10 – 12.5'],['XL','12 – 14','13+']]
  };
  if (pid === 882) return {
    badge: p.id === 'so6pk-funky-6pack-box' ? 'Pick Any 6 + Collector Box' : (p.id === 'so4pk-snout-crew-4pack' ? '4-Pack Bundle ($11/pair)' : 'Mix 6 = $58 + Free Box'),
    model: p.id === 'so6pk-funky-6pack-box'
      ? 'The Sloppy Six Pack: pick ANY 6 pairs from all 15 crew socks for $58 ($9.67/pair) packed inside the matte-black magnetic-lid collector box.'
      : (p.id === 'so4pk-snout-crew-4pack'
        ? 'Four banded cushioned crew pairs ($11/pair vs $14–$16 singles).'
        : 'All-over sublimated cushioned ribbed crew. Buy single ($14), mix ANY 4 for $44 (-$12), or mix ANY 6 for $58 (-$26 + FREE Sloppy Six Pack Box)!'),
    care: '<strong>Dispatch &amp; Care:</strong> Ships in 2–4 biz days &middot; Machine wash cold inside-out, tumble low.',
    headers: ['Sock Size', 'US Men\'s Shoe', 'US Women\'s Shoe'],
    rows: [['S','4 – 6.5','5.5 – 8'],['M','7 – 9.5','8.5 – 11'],['L','10 – 13','11.5+']]
  };
  if (p.id === 'slop-box-25-starter-kit') return {
    badge: '2 Stickers + Keychain + Socks · Save $19',
    model: 'The $25 Slop Box ($44 value): pick ANY 2 vinyl sticker packs + ANY 1 keychain + ANY 1 pair of cushioned crew socks packed in the matte-black Slop Box.',
    care: '<strong>Dispatch &amp; Care:</strong> Packed to order in 2–4 biz days &middot; Exact picks printed on your packing slip.',
    headers: ['Sock Size', 'US Men\'s Shoe', 'US Women\'s Shoe'],
    rows: [['S','4 – 6.5','5.5 – 8'],['M','7 – 9.5','8.5 – 11'],['L','10 – 13','11.5+']]
  };
  if (pid === 853) return {
    badge: 'XL 16" × 32" desk mat',
    model: 'Full keyboard + wide mouse sweep (40.6 × 81.3 cm · 4mm thick anti-fray edge).',
    care: '<strong>Dispatch &amp; Care:</strong> Sublimated in 2–4 biz days &middot; Wipe clean with warm damp cloth.',
    headers: ['Spec', 'Measurement'],
    rows: [['Dimensions','16" × 32" (40.6 × 81.3 cm)'],['Thickness','4 mm non-slip natural rubber'],['Edge','360° stitched anti-fray border']]
  };
  return {
    badge: 'One size / everyday carry',
    model: 'Verified daily spec — built to survive backpacks, laptops &amp; late nights.',
    care: '<strong>Dispatch &amp; Care:</strong> Made to order in 2–4 biz days &middot; Ships tracked from US fulfillment.',
    headers: ['Spec', 'Details'],
    rows: [['Fit / Format', (p.sizes || ['One size']).join(', ')],['Blank', p.blank || 'Premium streetwear spec']]
  };
}

function fmt(n) { return '$' + Number(n).toFixed(2).replace(/\.00$/, ''); }
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.remove('show'), 2400);
}
function setCollection(c) {
  state.coll = c;
  document.querySelectorAll('[data-coll]').forEach(el => el.classList.toggle('active', el.dataset.coll === c));
  renderBundles();
  renderGrid();
}

function isFlatImg(p, imgObj) {
  if (!imgObj) return false;
  const lbl = (imgObj.label || '').toLowerCase();
  const src = (imgObj.src || '').toLowerCase();
  if (src.includes('studio_') || src.includes('editorial-galleries-v28') || src.includes('candid_') || src.includes('recast_') || (src.includes('crisp-galleries-v35') && !src.includes('pf_crisp_'))) return false;
  if (p.collection === 'footwear') return true;
  return lbl.includes('flat') || lbl.includes('angle') || lbl.includes('colorway') || lbl.includes('primary') || lbl.includes('front') || lbl.includes('main') || lbl.includes('context');
}

function updateTabCounts() {
  const counts = { all: DATA.products.length, doorbusters: DATA.products.filter(p => p.doorbuster).length };
  DATA.products.forEach(p => { counts[p.collection] = (counts[p.collection] || 0) + 1; });
  const labels = {
    all: 'All',
    doorbusters: 'Doorbusters',
    bundles: 'Tracksuit sets (2)',
    outerwear: 'Hoodies & suits',
    knits: 'Knits & bottoms',
    snout: 'Snout capsule',
    broadcast: 'Late Night TV',
    footwear: 'Footwear',
    accessories: 'Stickers, keys & socks',
    carryovers: 'Originals'
  };
  document.querySelectorAll('#filterTabs .tab').forEach(btn => {
    const c = btn.dataset.coll;
    if (c === 'bundles') btn.textContent = labels.bundles;
    else if (labels[c]) btn.textContent = `${labels[c]} (${counts[c] || 0})`;
  });
}

function renderBundles() {
  const box = document.getElementById('bundleShowcase');
  if (state.coll === 'accessories' && !state.q) {
    const p25 = DATA.products.find(x => x.id === 'slop-box-25-starter-kit');
    const p4 = DATA.products.find(x => x.id === 'so4pk-snout-crew-4pack');
    const p6 = DATA.products.find(x => x.id === 'so6pk-funky-6pack-box');
    box.classList.add('visible');
    box.innerHTML = `
      <div class="bundle-card">
        <div class="bundle-thumbs">
          <img src="${p25 ? p25.images[0].src : ''}" alt="The $25 Slop Box" onclick="openModal('slop-box-25-starter-kit')" style="cursor:pointer; grid-column:span 2; object-fit:cover;" />
        </div>
        <div class="bundle-meta">
          <div class="bundle-kicker">
            <span>Stocking Stuffer Starter Box</span>
            <span class="bundle-save-pill">Save $19 · $44 Value</span>
          </div>
          <div class="bundle-title">The $25 Slop Box</div>
          <div class="bundle-sub">2 Sticker Packs + 1 Keychain + 1 Pair of Slop Socks inside the matte-black Snout collector box. Pick your exact 4 items or tap Mystery Box!</div>
          <div class="bundle-pickers">
            <label class="bundle-sel-group">Sock Size
              <select id="slopBox25Sz">
                <option value="S">S (US 4–6.5)</option>
                <option value="M">M (US 7–9.5)</option>
                <option value="L" selected>L (US 10–13)</option>
              </select>
            </label>
          </div>
          <div class="bundle-cta-row">
            <div class="bundle-price-wrap">
              <span class="bundle-price">$25</span>
              <span class="bundle-old">$44</span>
            </div>
            <button class="btn-lime" onclick="openModal('slop-box-25-starter-kit', document.getElementById('slopBox25Sz').value)">Build your $25 box</button>
          </div>
        </div>
      </div>
      <div class="bundle-card">
        <div class="bundle-thumbs">
          <img src="${p6 ? p6.images[0].src : ''}" alt="The Sloppy Six Pack" onclick="openModal('so6pk-funky-6pack-box')" style="cursor:pointer; grid-column:span 2; object-fit:cover;" />
        </div>
        <div class="bundle-meta">
          <div class="bundle-kicker">
            <span>Custom 6-Pack + Collector Box</span>
            <span class="bundle-save-pill">$9.67/pair · Save $26</span>
          </div>
          <div class="bundle-title">SLOP.CC // The Sloppy Six Pack</div>
          <div class="bundle-sub">Pick ANY 6 pairs from all 15 crew socks for $58 ($9.67/pair) — packed in the matte-black Sloppy Six Pack Box. Or mix 6 singles in bag to auto-unlock $58 + FREE Box!</div>
          <div class="bundle-pickers">
            <label class="bundle-sel-group">Size
              <select id="sock6pkSz">
                <option value="S">S (US 4–6.5)</option>
                <option value="M">M (US 7–9.5)</option>
                <option value="L" selected>L (US 10–13)</option>
              </select>
            </label>
          </div>
          <div class="bundle-cta-row">
            <div class="bundle-price-wrap">
              <span class="bundle-price">$58</span>
              <span class="bundle-old">$84</span>
            </div>
            <button class="btn-lime" onclick="openModal('so6pk-funky-6pack-box', document.getElementById('sock6pkSz').value)">Pick your 6 socks</button>
          </div>
        </div>
      </div>
      <div class="bundle-card">
        <div class="bundle-thumbs">
          <img src="${p4 ? p4.images[0].src : ''}" alt="4-Pack Crew" onclick="openModal('so4pk-snout-crew-4pack')" style="cursor:pointer; grid-column:span 2; object-fit:cover;" />
        </div>
        <div class="bundle-meta">
          <div class="bundle-kicker">
            <span>Core 4-Pack Bundle</span>
            <span class="bundle-save-pill">Save $12</span>
          </div>
          <div class="bundle-title">slop.cc Core 4-Pack Crew Socks</div>
          <div class="bundle-sub">Acid Snout + Varsity Snout + SlopCannon Script + Obsidian Varsity (auto-expands at checkout w/ -$12 bundle savings).</div>
          <div class="bundle-pickers">
            <label class="bundle-sel-group">Size
              <select id="sock4pkSz">
                <option value="S">S (US 4–6.5)</option>
                <option value="M">M (US 7–9.5)</option>
                <option value="L" selected>L (US 10–13)</option>
              </select>
            </label>
          </div>
          <div class="bundle-cta-row">
            <div class="bundle-price-wrap">
              <span class="bundle-price">$46</span>
              <span class="bundle-old">$58</span>
            </div>
            <button class="btn-lime" onclick="addById('so4pk-snout-crew-4pack', document.getElementById('sock4pkSz').value); openDrawer();">Cop 4-Pack</button>
          </div>
        </div>
      </div>
    `;
    return;
  }
  const show = (state.coll === 'bundles' || state.coll === 'outerwear') && !state.q;
  box.classList.toggle('visible', show);
  if (!show) { box.innerHTML = ''; return; }

  box.innerHTML = TRACKSUIT_SETS.map(s => {
    const top = DATA.products.find(x => x.id === s.topId);
    const bot = DATA.products.find(x => x.id === s.botId);
    if (!top || !bot) return '';
    const reg = top.price + bot.price;
    const bundlePrice = reg - s.save;
    return `
      <div class="bundle-card">
        <div class="bundle-thumbs">
          <img src="${top.images[0].src}" alt="${top.name}" onclick="openModal('${top.id}')" style="cursor:pointer;" />
          <img src="${bot.images[0].src}" alt="${bot.name}" onclick="openModal('${bot.id}')" style="cursor:pointer;" />
        </div>
        <div class="bundle-meta">
          <div class="bundle-kicker">
            <span>2-Piece Co-Ord Bundle</span>
            <span class="bundle-save-pill">Save $${s.save}</span>
          </div>
          <div class="bundle-title">${s.title}</div>
          <div class="bundle-sub">${s.sub}</div>
          <div class="bundle-pickers">
            <label class="bundle-sel-group">Top
              <select id="bTop_${s.key}">
                ${top.sizes.map(sz => `<option value="${sz}" ${sz==='L'?'selected':''}>${sz}</option>`).join('')}
              </select>
            </label>
            <label class="bundle-sel-group">Bottom
              <select id="bBot_${s.key}">
                ${bot.sizes.map(sz => `<option value="${sz}" ${sz==='L'?'selected':''}>${sz}</option>`).join('')}
              </select>
            </label>
          </div>
          <div class="bundle-cta-row">
            <div class="bundle-price-wrap">
              <span class="bundle-price">$${bundlePrice}</span>
              <span class="bundle-old">$${reg}</span>
            </div>
            <button class="btn-lime" onclick="addTracksuitSet('${s.key}')">Cop full suit</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addTracksuitSet(setKey, customTopSz, customBotSz) {
  const s = TRACKSUIT_SETS.find(x => x.key === setKey);
  if (!s) return;
  const topSz = customTopSz || (document.getElementById(`bTop_${s.key}`)?.value) || 'L';
  const botSz = customBotSz || (document.getElementById(`bBot_${s.key}`)?.value) || 'L';
  addByIdSilent(s.topId, topSz);
  addByIdSilent(s.botId, botSz);
  renderCart();
  closeModal();
  openDrawer();
  showToast(`Added ${s.title} (-$${s.save} set savings applied!)`);
}

function renderGrid() {
  if (state.coll === 'bundles' && !state.q) {
    // Under the 2 bundle cards, show the 4 individual tracksuit pieces for inspection
    const suitIds = new Set(['ts07-move-loud-track-jacket','12-snout-surge','ts10-topo-windbreaker','ts10-topo-track-pants']);
    const suitList = DATA.products.filter(p => suitIds.has(p.id));
    renderProductCards(suitList);
    return;
  }
  let list = DATA.products.filter(p => {
    if (state.coll === 'doorbusters') {
      if (!p.doorbuster) return false;
    } else if (state.coll !== 'all' && p.collection !== state.coll) {
      return false;
    }
    if (state.q) {
      const hay = (p.name + ' ' + p.subtitle + ' ' + p.code + ' ' + p.collection).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  });
  if (state.coll === 'doorbusters' && state.sort === 'featured') list.sort((a,b) => a.price - b.price);
  if (state.sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  renderProductCards(list);
}

function pickCardColor(prodId, colorIdx) {
  const p = DATA.products.find(x => x.id === prodId);
  if (!p || !p.colors || !p.colors[colorIdx]) return;
  const c = p.colors[colorIdx];
  if (c.sibling_id && c.sibling_id !== prodId) {
    openModal(c.sibling_id);
    return;
  }
  state.cardColors[prodId] = colorIdx;
  const card = document.querySelector(`article.card[data-pid="${prodId}"]`);
  if (!card) return;
  const media = card.querySelector('.card-media');
  const mainImg = card.querySelector('.main-img');
  const hoverImg = card.querySelector('.hover-img');
  if (c.is_hero || !c.front) {
    const m0 = p.images[0], m1 = p.images[1];
    media.classList.toggle('flat-bg', isFlatImg(p, m0));
    media.classList.toggle('contain-fit', isFlatImg(p, m0));
    mainImg.src = m0.src;
    if (hoverImg && m1) {
      hoverImg.src = m1.src;
      hoverImg.style.display = '';
      mainImg.classList.add('has-alt');
    }
  } else {
    media.classList.add('flat-bg', 'contain-fit');
    mainImg.src = c.front;
    if (hoverImg) {
      if (c.back) {
        hoverImg.src = c.back;
        hoverImg.classList.add('flat-hover');
        hoverImg.style.display = '';
        mainImg.classList.add('has-alt');
      } else {
        hoverImg.style.display = 'none';
        mainImg.classList.remove('has-alt');
      }
    }
  }
  card.querySelectorAll('.swatch-dot').forEach((d, idx) => d.classList.toggle('active', idx === colorIdx));
}

function renderProductCards(list) {
  document.getElementById('productGrid').innerHTML = list.map(p => {
    const activeColIdx = (p.colors && p.colors.length) ? (state.cardColors[p.id] || 0) : -1;
    const activeCol = activeColIdx >= 0 ? p.colors[activeColIdx] : null;
    const usingAltColor = activeCol && !activeCol.is_hero && activeCol.front;
    const main = usingAltColor ? { src: activeCol.front, label: activeCol.name + ' Front' } : p.images[0];
    const alt = usingAltColor ? (activeCol.back ? { src: activeCol.back, label: activeCol.name + ' Back' } : null) : p.images[1];
    const useFlat = usingAltColor ? true : isFlatImg(p, main);
    const useFlatAlt = usingAltColor ? true : (alt ? isFlatImg(p, alt) : false);
    const margin = (p.price - p.pf_cost).toFixed(2);
    const marginPct = Math.round(((p.price - p.pf_cost) / p.price) * 100);
    const tag = p.collection === 'carryovers' ? 'OG' : (['DROP HERO','REAL KNIT','SLOP U','DESK HERO','PACK SAVINGS','BUILD YOUR BOX','FUNKY DROP'].includes(p.badge) ? p.badge : '');
    const tagCls = (tag === 'DROP HERO' || tag === 'REAL KNIT' || tag === 'DESK HERO' || tag === 'PACK SAVINGS' || tag === 'BUILD YOUR BOX') ? 'lime' : '';
    const qSizes = p.sizes.slice(0, 6);
    const isCustomBox = p.id === 'so6pk-funky-6pack-box';
    const isSlopBox25 = p.id === 'slop-box-25-starter-kit';
    const swatchesHtml = (p.colors && p.colors.length > 1) ? `
      <div class="card-swatches" onclick="event.stopPropagation()">
        ${p.colors.map((c, ci) => `<button type="button" class="swatch-dot ${ci === activeColIdx ? 'active' : ''}" style="background:${c.hex};" title="${c.name}" onclick="pickCardColor('${p.id}', ${ci})"></button>`).join('')}
        <span class="swatch-count-lbl">${p.colors.length} colors</span>
      </div>
    ` : '';
    return `
      <article class="card" data-pid="${p.id}" onclick="openModal('${p.id}')">
        <div class="card-media ${useFlat ? 'flat-bg contain-fit' : ''}">
          ${tag ? `<span class="pill-tag ${tagCls}">${tag}</span>` : ''}
          <img class="main-img ${alt ? 'has-alt' : ''}" src="${main.src}" alt="${p.name}" loading="lazy" />
          ${alt ? `<img class="hover-img ${useFlatAlt ? 'flat-hover' : ''}" src="${alt.src}" alt="${p.name} alternate" loading="lazy" />` : `<img class="hover-img flat-hover" src="" alt="" style="display:none;" />`}
          <div class="quick-size-bar" onclick="event.stopPropagation()">
            <div class="qs-label">${isCustomBox ? 'Pick any 6 socks + box' : (isSlopBox25 ? '2 Stickers + Keychain + Socks' : 'Cop fast')}</div>
            <div class="qs-row">
              ${isCustomBox
                ? `<button class="qs-btn" style="padding:0 12px; width:auto; border-color:var(--accent); color:var(--accent);" onclick="openModal('${p.id}')">Build your 6-pack &rarr;</button>`
                : (isSlopBox25
                  ? `<button class="qs-btn" style="padding:0 12px; width:auto; border-color:var(--accent); color:var(--accent);" onclick="openModal('${p.id}')">Build your $25 box &rarr;</button>`
                  : qSizes.map(sz => `<button class="qs-btn" onclick="addById('${p.id}','${sz}')">${sz.replace('US ','')}</button>`).join(''))}
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-row">
            <div class="card-title">${p.name}</div>
            <div class="card-price">${fmt(p.price)}</div>
          </div>
          <div class="card-meta-sub">${p.subtitle}</div>
          ${swatchesHtml}
          <div class="owner-strip">
            ${p.code} &middot; PF #${p.pf_id} &middot; All-in COGS $${p.pf_cost.toFixed(2)} &middot; +$${margin} (${marginPct}%)
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function openModal(id, preSize) {
  const p = DATA.products.find(x => x.id === id);
  if (!p) return;
  state.activeProd = p;
  state.activeSize = (preSize && p.sizes.includes(preSize))
    ? preSize
    : (p.sizes.includes('L') ? 'L' : (p.sizes.includes('US 10') ? 'US 10' : p.sizes[0]));

  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalPrice').textContent = fmt(p.price);
  document.getElementById('modalDesc').textContent = p.desc;

  const spec = getFitSpec(p);
  document.getElementById('modalFitBadge').textContent = spec.badge;
  document.getElementById('modalModelNote').innerHTML = spec.model;
  document.getElementById('modalCareSpec').innerHTML = spec.care;

  const chartBox = document.getElementById('sizeChartBox');
  chartBox.classList.remove('open');
  chartBox.innerHTML = `
    <table class="size-chart-table">
      <thead><tr>${spec.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${spec.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  `;

  const margin = (p.price - p.pf_cost).toFixed(2);
  const marginPct = Math.round(((p.price - p.pf_cost) / p.price) * 100);
  const plusNote = p.sizes.includes('2XL') ? ' &middot; Shopify +$4 (2XL) / +$6 (3XL)' : '';
  document.getElementById('modalOwnerStrip').innerHTML =
    `<strong>OWNER SPECS:</strong> ${p.code} &middot; PF #${p.pf_id} &middot; True COGS $${p.pf_cost.toFixed(2)} &middot; Gross <strong>+$${margin} (${marginPct}%)</strong> &middot; ${p.pf_task}${plusNote}`;

  const initColIdx = (p.colors && p.colors.length) ? (state.cardColors[p.id] || 0) : -1;
  state.activeColor = initColIdx >= 0 ? p.colors[initColIdx] : null;
  renderModalColors();
  rebuildModalGallery();

  // Render Custom 6-Pack Collector Box Builder (above Add button) OR 1-Click Tracksuit Bundle Box (below Add button)
  const suit = TRACKSUIT_SETS.find(s => s.topId === p.id || s.botId === p.id);
  const builderContainer = document.getElementById('modalBuilderContainer');
  const suitContainer = document.getElementById('modalSuitContainer');
  if (p.id === 'so6pk-funky-6pack-box') {
    suitContainer.innerHTML = '';
    if (!Array.isArray(state.customSockBox)) {
      state.customSockBox = [];
    }
    state.lastDroppedSlot = -1;
    renderSockBoxBuilder();
  } else if (p.id === 'slop-box-25-starter-kit') {
    suitContainer.innerHTML = '';
    renderSlopBox25Builder();
  } else if (suit) {
    builderContainer.innerHTML = '';
    const topP = DATA.products.find(x => x.id === suit.topId);
    const botP = DATA.products.find(x => x.id === suit.botId);
    const setPrice = (topP.price + botP.price) - suit.save;
    suitContainer.innerHTML = `
      <div class="modal-suit-box">
        <div class="modal-suit-top">
          <span class="modal-suit-title">${suit.title}</span>
          <span class="modal-suit-save">Save $${suit.save} Set Deal</span>
        </div>
        <div class="bundle-pickers">
          <label class="bundle-sel-group">Top (${topP.code})
            <select id="mSuitTop">
              ${topP.sizes.map(sz => `<option value="${sz}" ${sz==='L'?'selected':''}>${sz}</option>`).join('')}
            </select>
          </label>
          <label class="bundle-sel-group">Pants (${botP.code})
            <select id="mSuitBot">
              ${botP.sizes.map(sz => `<option value="${sz}" ${sz==='L'?'selected':''}>${sz}</option>`).join('')}
            </select>
          </label>
          <button class="btn-lime" style="margin-left:auto; height:34px; padding:0 15px; font-size:12.5px;"
            onclick="addTracksuitSet('${suit.key}', document.getElementById('mSuitTop').value, document.getElementById('mSuitBot').value)">
            Cop Full Suit &mdash; $${setPrice}
          </button>
        </div>
      </div>
    `;
  } else {
    builderContainer.innerHTML = '';
    suitContainer.innerHTML = '';
  }

  // Render Smart Outfit-Matched Stack the Fit cross-sells (all 65 SKUs curated!)
  const pairIds = PAIRINGS[p.id] || [];
  const pairs = pairIds.map(pid => DATA.products.find(x => x.id === pid)).filter(Boolean).slice(0, 3);
  document.getElementById('modalUpsells').innerHTML = pairs.length ? `
    <div class="upsell-head">Pair it with</div>
    <div class="upsell-list">
      ${pairs.map(up => {
        const defSz = up.sizes.includes('L') ? 'L' : (up.sizes.includes('US 10') ? 'US 10' : up.sizes[0]);
        const isBox = up.id === 'so6pk-funky-6pack-box' || up.id === 'slop-box-25-starter-kit';
        return `
          <div class="upsell-item" style="cursor:pointer;" onclick="openModal('${up.id}')">
            <img src="${up.images[0].src}" alt="${up.name}" />
            <div>
              <div class="u-name">${up.name}</div>
              <div class="u-price">${fmt(up.price)}</div>
            </div>
            ${isBox
              ? `<button class="u-add" onclick="event.stopPropagation(); openModal('${up.id}')">Build</button>`
              : `<button class="u-add" onclick="event.stopPropagation(); addById('${up.id}','${defSz}')">+ Add</button>`}
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  renderModalSizes();
  updateModalAddButton();
  document.getElementById('modalBackdrop').classList.add('open');
}

function getAllSingleSocks() {
  return DATA.products.filter(p => SINGLE_SOCK_IDS.has(p.id));
}
function updateModalAddButton() {
  const btn = document.getElementById('modalAddBtn');
  const p = state.activeProd;
  if (!btn || !p) return;
  if (p.id === 'so6pk-funky-6pack-box') {
    const n = state.customSockBox.length;
    if (n === 6) {
      btn.disabled = false;
      btn.textContent = `Add The Sloppy Six Pack \u2014 ${fmt(p.price)}`;
    } else {
      btn.disabled = true;
      const need = 6 - n;
      btn.textContent = `Pick ${need} more pair${need === 1 ? '' : 's'} (${n}/6)`;
    }
  } else if (p.id === 'slop-box-25-starter-kit') {
    const b = state.slopBox25;
    if (b.mystery || (b.stickers.length === 2 && b.keychain && b.sock)) {
      btn.disabled = false;
      btn.textContent = `Add The $25 Slop Box \u2014 $25`;
    } else {
      btn.disabled = true;
      btn.textContent = `Pick ${2 - b.stickers.length} more sticker pack${2 - b.stickers.length === 1 ? '' : 's'}`;
    }
  } else {
    btn.disabled = false;
    btn.textContent = 'Add to bag';
  }
}
function renderSockBoxBuilder() {
  const box = document.getElementById('modalBuilderContainer');
  if (!box) return;
  const allSocks = getAllSingleSocks();
  const picked = state.customSockBox;
  const counts = {};
  picked.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  const slotsHtml = Array.from({ length: 6 }, (_, i) => {
    const sid = picked[i];
    const sp = sid ? DATA.products.find(x => x.id === sid) : null;
    if (sp) {
      return `
        <div class="sock-slot filled" title="Remove ${sp.name}" onclick="removeSockSlot(${i})">
          <img src="${sp.images[0].src}" alt="${sp.name}" />
          <span class="sock-slot-x">&times;</span>
        </div>
      `;
    }
    return `<div class="sock-slot">#${i + 1}</div>`;
  }).join('');

  box.innerHTML = `
    <div class="sock-builder">
      <div class="sock-builder-head">
        <span class="sock-builder-title">Build your 6-pack &middot; Collector Box included</span>
        <span class="sock-builder-count ${picked.length === 6 ? 'ready' : ''}">${picked.length}/6 ${picked.length === 6 ? 'READY' : 'PICKED'}</span>
      </div>
      <div class="sock-slots">${slotsHtml}</div>
      <div class="sock-presets">
        <button class="sock-preset-btn" type="button" onclick="loadSockPreset('funky')">Funky 6</button>
        <button class="sock-preset-btn" type="button" onclick="loadSockPreset('varsity')">Varsity 6</button>
        <button class="sock-preset-btn" type="button" onclick="clearSockBox()">Clear</button>
        <span style="margin-left:auto; font-family:var(--mono); font-size:9px; color:var(--faint);">Tap sock to add &middot; doubles OK</span>
      </div>
      <div class="sock-pick-grid">
        ${allSocks.map(s => {
          const c = counts[s.id] || 0;
          const shortName = s.name.replace(/ Crew Socks$/i, '').replace(/ Socks$/i, '').replace(/ Varsity$/i, '');
          return `
            <div class="sock-pick-tile ${c > 0 ? 'picked' : ''}" title="${s.name} (${s.code})" onclick="addSockToBox('${s.id}')">
              ${c > 0 ? `<button class="sock-pick-minus" type="button" title="Remove 1" onclick="event.stopPropagation(); removeSockById('${s.id}')">&minus;</button>` : ''}
              ${c > 0 ? `<span class="sock-pick-badge">&times;${c}</span>` : ''}
              <img src="${s.images[0].src}" alt="${s.name}" loading="lazy" />
              <div class="sock-pick-name">${shortName}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  updateModalAddButton();
  renderLiveBoxOverlay();
}
function renderLiveBoxOverlay() {
  const stage = document.getElementById('liveBoxStage');
  const mainImg = document.getElementById('modalMainImg');
  const tray = document.getElementById('liveBoxTray');
  const bg = document.getElementById('liveBoxBg');
  const p = state.activeProd;
  const showLive = Boolean(p && p.id === 'so6pk-funky-6pack-box' && state.activeImgIdx === 0);
  if (!stage || !mainImg || !tray) return;
  stage.classList.toggle('active', showLive);
  mainImg.style.display = showLive ? 'none' : '';
  if (!showLive) return;
  if (bg && p.images && p.images[0]) bg.src = p.images[0].src;
  const picked = state.customSockBox || [];
  tray.innerHTML = Array.from({ length: 6 }, (_, i) => {
    const sid = picked[i];
    const sp = sid ? DATA.products.find(x => x.id === sid) : null;
    if (sp) {
      const slotSrc = sp.slot_img || sp.images[0].src;
      const anim = (state.lastDroppedSlot === i || state.lastDroppedSlot === 99) ? 'just-dropped' : '';
      const delay = state.lastDroppedSlot === 99 ? `style="animation-delay:${i * 55}ms"` : '';
      return `
        <div class="live-box-cell filled ${anim}" title="${sp.name} — Click to remove" onclick="removeSockSlot(${i})">
          <img src="${slotSrc}" alt="${sp.name}" ${delay} />
          <span class="live-box-rm">&times;</span>
        </div>
      `;
    }
    const isNext = (i === picked.length);
    return `
      <div class="live-box-cell ${isNext ? 'next-up' : ''}">
        <span class="live-box-num">0${i + 1}</span>
        ${isNext ? '<span class="live-box-hint">NEXT</span>' : ''}
      </div>
    `;
  }).join('');
  const lbl = document.getElementById('modalImgLabel');
  if (lbl) {
    lbl.textContent = picked.length === 6
      ? 'Live Box · 6/6 Ready — Click any sock to swap'
      : `Live Box · ${picked.length}/6 Packed — Tap socks to fill Slot 0${picked.length + 1}`;
  }
}
function addSockToBox(sockId) {
  if (state.customSockBox.length >= 6) {
    showToast('Box full (6/6) — click any sock in the box or slot above to swap');
    return;
  }
  state.lastDroppedSlot = state.customSockBox.length;
  state.customSockBox.push(sockId);
  if (state.activeImgIdx !== 0) setModalImg(0);
  renderSockBoxBuilder();
}
function removeSockSlot(idx) {
  state.lastDroppedSlot = -1;
  state.customSockBox.splice(idx, 1);
  if (state.activeImgIdx !== 0) setModalImg(0);
  renderSockBoxBuilder();
}
function removeSockById(sockId) {
  const idx = state.customSockBox.lastIndexOf(sockId);
  if (idx >= 0) {
    state.lastDroppedSlot = -1;
    state.customSockBox.splice(idx, 1);
    if (state.activeImgIdx !== 0) setModalImg(0);
    renderSockBoxBuilder();
  }
}
function loadSockPreset(kind) {
  state.customSockBox = kind === 'varsity' ? [...VARSITY_SNOUT_SIX] : [...DEFAULT_FUNKY_SIX];
  state.lastDroppedSlot = 99;
  if (state.activeImgIdx !== 0) setModalImg(0);
  renderSockBoxBuilder();
}
function clearSockBox() {
  state.customSockBox = [];
  state.lastDroppedSlot = -1;
  if (state.activeImgIdx !== 0) setModalImg(0);
  renderSockBoxBuilder();
}
function addCustomSockBoxToCart(sz) {
  const p = DATA.products.find(x => x.id === 'so6pk-funky-6pack-box');
  if (!p || state.customSockBox.length !== 6) return;
  const counts = {};
  let rawSum = 0;
  state.customSockBox.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
    const sp = DATA.products.find(x => x.id === id);
    rawSum += sp ? Number(sp.price) : 14;
  });
  const boxPrice = Math.max(58, Number((rawSum - 26).toFixed(2)));
  const summary = Object.entries(counts).map(([id, qty]) => {
    const sp = DATA.products.find(x => x.id === id);
    const shortName = sp ? sp.name.replace(/ Crew Socks$/i, '').replace(/ Socks$/i, '') : id;
    return qty > 1 ? `${shortName} \u00d7${qty}` : shortName;
  }).join(' \u00b7 ');
  const key = sz + '|' + [...state.customSockBox].sort().join(',');
  const ex = state.cart.find(c => c.id === p.id && c.customKey === key);
  if (ex) ex.qty++;
  else state.cart.push({
    id: p.id,
    name: p.name,
    price: boxPrice,
    img: p.images[0].src,
    size: `${sz} \u00b7 Matte-Black Collector Box included`,
    rawSize: sz,
    rawColor: null,
    customPicks: [...state.customSockBox],
    customDetail: summary,
    customKey: key,
    qty: 1
  });
  renderCart();
  showToast(`Added The Sloppy Six Pack (${fmt(boxPrice)} — Collector Box included!)`);
}

const SB25_STICKER_IDS = ['sp01-slopcc-tech-sticker-pack', 'sp02-snout-logo-sticker-pack', 'sp04-graffiti-sticker-pack'];
const SB25_KEYCHAIN_IDS = ['kc03-chrome-snout-keychain', 'kc04-cannon-jet-tag', 'kc06-enamel-cannon-keychain'];
function getSlopBox25Socks() {
  return DATA.products.filter(p => SINGLE_SOCK_IDS.has(p.id) && p.id !== 'so01-acid-snout-socks');
}
function renderSlopBox25Builder() {
  const box = document.getElementById('modalBuilderContainer');
  if (!box) return;
  const b = state.slopBox25;
  const stickers = SB25_STICKER_IDS.map(id => DATA.products.find(x => x.id === id)).filter(Boolean);
  const keychains = SB25_KEYCHAIN_IDS.map(id => DATA.products.find(x => x.id === id)).filter(Boolean);
  const socks = getSlopBox25Socks();
  const sCounts = {};
  b.stickers.forEach(id => { sCounts[id] = (sCounts[id] || 0) + 1; });

  box.innerHTML = `
    <div class="sock-builder">
      <div class="sock-builder-head">
        <span class="sock-builder-title">Build your $25 Slop Box &middot; $44 Value</span>
        <span class="sock-builder-count ready">${b.mystery ? 'MYSTERY READY' : `${b.stickers.length}/2 ST · 1 KC · 1 SOCK`}</span>
      </div>
      <div class="sock-presets">
        <button class="sock-preset-btn" type="button" onclick="setSlopBox25Preset('classic')">Classic Box</button>
        <button class="sock-preset-btn" type="button" style="${b.mystery ? 'border-color:var(--accent);color:var(--accent);' : ''}" onclick="setSlopBox25Preset('mystery')">Mystery Box (Surprise Me)</button>
      </div>
      ${b.mystery ? `
        <div style="padding:10px 12px; border:1px dashed var(--accent); border-radius:10px; font-size:12px; color:#d5f79d; line-height:1.45;">
          <strong>Slop HQ Mystery Pick armed!</strong> We'll hand-pack 2 random vinyl sticker sheets + 1 keychain + 1 pair of crew socks in your chosen size inside the matte-black Slop Box. Tap <em>Classic Box</em> to pick each item manually.
        </div>
      ` : `
        <div style="font-family:var(--mono); font-size:10px; color:var(--muted); margin:6px 0 4px;">1. PICK 2 STICKER PACKS (${b.stickers.length}/2 · tap to swap)</div>
        <div class="sock-pick-grid" style="grid-template-columns:repeat(3,1fr); max-height:none;">
          ${stickers.map(s => {
            const c = sCounts[s.id] || 0;
            const sn = s.name.replace(/ Sticker Pack$/i, '').replace(/^slop\.cc /i, '');
            return `
              <div class="sock-pick-tile ${c > 0 ? 'picked' : ''}" onclick="pickSB25Sticker('${s.id}')">
                ${c > 0 ? `<button class="sock-pick-minus" type="button" onclick="event.stopPropagation(); removeSB25Sticker('${s.id}')">&minus;</button>` : ''}
                ${c > 0 ? `<span class="sock-pick-badge">&times;${c}</span>` : ''}
                <img src="${s.images[0].src}" alt="${s.name}" />
                <div class="sock-pick-name">${sn}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="font-family:var(--mono); font-size:10px; color:var(--muted); margin:10px 0 4px;">2. PICK 1 KEYCHAIN</div>
        <div class="sock-pick-grid" style="grid-template-columns:repeat(3,1fr); max-height:none;">
          ${keychains.map(k => {
            const on = b.keychain === k.id;
            const kn = k.name.replace(/ Keychain$/i, '').replace(/ Strap$/i, '');
            return `
              <div class="sock-pick-tile ${on ? 'picked' : ''}" onclick="pickSB25Keychain('${k.id}')">
                ${on ? `<span class="sock-pick-badge">&#10003;</span>` : ''}
                <img src="${k.images[0].src}" alt="${k.name}" />
                <div class="sock-pick-name">${kn}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="font-family:var(--mono); font-size:10px; color:var(--muted); margin:10px 0 4px;">3. PICK 1 PAIR OF SLOP SOCKS</div>
        <div class="sock-pick-grid" style="max-height:170px;">
          ${socks.map(s => {
            const on = b.sock === s.id;
            const sn = s.name.replace(/ Crew Socks$/i, '').replace(/ Socks$/i, '').replace(/ Varsity$/i, '');
            return `
              <div class="sock-pick-tile ${on ? 'picked' : ''}" onclick="pickSB25Sock('${s.id}')">
                ${on ? `<span class="sock-pick-badge">&#10003;</span>` : ''}
                <img src="${s.images[0].src}" alt="${s.name}" loading="lazy" />
                <div class="sock-pick-name">${sn}</div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
  updateModalAddButton();
}
function setSlopBox25Preset(kind) {
  if (kind === 'mystery') {
    state.slopBox25.mystery = true;
  } else {
    state.slopBox25 = { stickers: ['sp01-slopcc-tech-sticker-pack', 'sp02-snout-logo-sticker-pack'], keychain: 'kc03-chrome-snout-keychain', sock: 'so02-varsity-snout-socks', mystery: false };
  }
  renderSlopBox25Builder();
}
function pickSB25Sticker(id) {
  state.slopBox25.mystery = false;
  if (state.slopBox25.stickers.length >= 2) state.slopBox25.stickers.shift();
  state.slopBox25.stickers.push(id);
  renderSlopBox25Builder();
}
function removeSB25Sticker(id) {
  const idx = state.slopBox25.stickers.lastIndexOf(id);
  if (idx >= 0) state.slopBox25.stickers.splice(idx, 1);
  renderSlopBox25Builder();
}
function pickSB25Keychain(id) {
  state.slopBox25.mystery = false;
  state.slopBox25.keychain = id;
  renderSlopBox25Builder();
}
function pickSB25Sock(id) {
  state.slopBox25.mystery = false;
  state.slopBox25.sock = id;
  renderSlopBox25Builder();
}
function addSlopBox25ToCart(sz) {
  const p = DATA.products.find(x => x.id === 'slop-box-25-starter-kit');
  const b = state.slopBox25;
  if (!p) return;
  let detail, props, key;
  if (b.mystery) {
    detail = 'Mystery Slop Box (2 Random Sticker Packs · 1 Keychain · 1 Crew Sock)';
    props = { 'Box Mode': 'Mystery Slop Box (Slop HQ Curated)', 'Sock Size': sz };
    key = sz + '|MYSTERY';
  } else {
    const sNames = b.stickers.map(id => (DATA.products.find(x => x.id === id)?.name || id).replace(/ Sticker Pack$/i, ''));
    const kName = (DATA.products.find(x => x.id === b.keychain)?.name || b.keychain);
    const sockName = (DATA.products.find(x => x.id === b.sock)?.name || b.sock);
    detail = `${sNames.join(' + ')} Stickers · ${kName} · ${sockName}`;
    props = { 'Stickers (2)': sNames.join(' + '), 'Keychain': kName, 'Socks': `${sockName} (${sz})` };
    key = `${sz}|${[...b.stickers].sort().join(',')}|${b.keychain}|${b.sock}`;
  }
  const ex = state.cart.find(c => c.id === p.id && c.customKey === key);
  if (ex) ex.qty++;
  else state.cart.push({
    id: p.id,
    name: p.name,
    price: p.price,
    img: p.images[0].src,
    size: `Sock Size ${sz} \u00b7 Matte-Black Slop Box`,
    rawSize: sz,
    rawColor: null,
    customDetail: detail,
    boxProps: props,
    customKey: key,
    qty: 1
  });
  renderCart();
  showToast('Added The $25 Slop Box ($44 value)!');
}

function renderModalColors() {
  const p = state.activeProd;
  const block = document.getElementById('modalColorBlock');
  if (!p || !p.colors || p.colors.length <= 1) {
    block.classList.remove('show');
    return;
  }
  block.classList.add('show');
  const activeName = state.activeColor ? state.activeColor.name : p.colors[0].name;
  document.getElementById('modalColorName').textContent = activeName;
  document.getElementById('modalSwatches').innerHTML = p.colors.map((c, idx) => `
    <button type="button" class="m-swatch ${c.name === activeName ? 'active' : ''}" style="background:${c.hex};" title="${c.name}" onclick="selectModalColor(${idx})"></button>
  `).join('');
}
function selectModalColor(idx) {
  const p = state.activeProd;
  if (!p || !p.colors || !p.colors[idx]) return;
  const c = p.colors[idx];
  if (c.sibling_id && c.sibling_id !== p.id) {
    openModal(c.sibling_id, state.activeSize);
    return;
  }
  state.activeColor = c;
  state.cardColors[p.id] = idx;
  renderModalColors();
  rebuildModalGallery();
}
function rebuildModalGallery() {
  const p = state.activeProd;
  if (!p) return;
  const c = state.activeColor;
  let gallery = [...p.images];
  if (c && !c.is_hero && c.front) {
    const colorPics = [{ src: c.front, label: `${c.name} · Printful Proof Front`, forceFlat: true }];
    if (c.back) colorPics.push({ src: c.back, label: `${c.name} · Printful Proof Back`, forceFlat: true });
    gallery = [...colorPics, ...p.images];
  }
  state.activeGallery = gallery;
  setModalImg(0);
  document.getElementById('modalThumbs').innerHTML = gallery.map((im, i) => `
    <div class="thumb ${i === 0 ? 'active' : ''}" onclick="setModalImg(${i})">
      <img src="${im.src}" alt="${im.label}" />
    </div>
  `).join('');
}

function setModalImg(idx) {
  const p = state.activeProd;
  const gal = state.activeGallery.length ? state.activeGallery : p.images;
  const im = gal[idx] || gal[0];
  state.activeImgIdx = idx;
  document.getElementById('modalGallery').classList.toggle('flat-modal', im.forceFlat || isFlatImg(p, im));
  document.getElementById('modalMainImg').src = im.src;
  document.getElementById('modalImgLabel').textContent = `${idx + 1}/${gal.length} \u00b7 ${im.label}`;
  document.querySelectorAll('#modalThumbs .thumb').forEach((t, i) => t.classList.toggle('active', i === idx));
  renderLiveBoxOverlay();
}
function renderModalSizes() {
  const p = state.activeProd;
  document.getElementById('modalSizes').innerHTML = p.sizes.map(sz => `
    <button class="size-btn ${sz === state.activeSize ? 'active' : ''}" onclick="state.activeSize='${sz}'; renderModalSizes()">${sz}</button>
  `).join('');
}
function closeModal() { document.getElementById('modalBackdrop').classList.remove('open'); }

function addByIdSilent(id, sz, colorObj) {
  const p = DATA.products.find(x => x.id === id);
  if (!p) return null;
  const useSz = sz || (p.sizes.includes('L') ? 'L' : p.sizes[0]);
  let c = colorObj;
  if (!c && p.colors && p.colors.length > 1) {
    c = p.colors[state.cardColors[p.id] || 0];
  }
  const variantLabel = (c && p.colors && p.colors.length > 1) ? `${c.name} \u00b7 ${useSz}` : useSz;
  const useImg = (c && !c.is_hero && c.front) ? c.front : p.images[0].src;
  const ex = state.cart.find(item => item.id === p.id && item.size === variantLabel);
  if (ex) ex.qty++;
  else state.cart.push({
    id: p.id,
    name: p.name,
    price: p.price,
    img: useImg,
    size: variantLabel,
    rawSize: useSz,
    rawColor: (c && p.colors && p.colors.length > 1) ? c.name : null,
    qty: 1
  });
  return p;
}
function addById(id, sz, colorObj) {
  const p = addByIdSilent(id, sz, colorObj);
  if (!p) return;
  renderCart();
  const cName = colorObj ? `${colorObj.name} · ` : '';
  showToast(`Added ${p.name} (${cName}${sz || p.sizes[0]})`);
}
function changeQty(idx, delta) {
  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  renderCart();
}

const SINGLE_SOCK_IDS = new Set([
  'so01-acid-snout-socks', 'so02-varsity-snout-socks', 'so06-slopcannon-script-socks',
  'fk01-acid-checker-socks', 'fk02-flir-thermal-socks', 'fk03-crt-glitch-socks',
  'fk04-graffiti-bomb-socks', 'fk05-popart-snout-socks',
  'fk06-acid-slime-socks', 'fk07-vhs-broadcast-socks', 'fk08-comic-halftone-socks', 'fk09-liquid-marble-socks',
  'sv03-oxblood-split-socks', 'sv04-bone-cobalt-varsity-socks', 'sv06-obsidian-varsity-socks'
]);

function calcBundleSavings() {
  let suitSavings = 0;
  TRACKSUIT_SETS.forEach(s => {
    const topQty = state.cart.filter(c => c.id === s.topId).reduce((a, b) => a + b.qty, 0);
    const botQty = state.cart.filter(c => c.id === s.botId).reduce((a, b) => a + b.qty, 0);
    const pairs = Math.min(topQty, botQty);
    suitSavings += pairs * s.save;
  });
  // Mix & match single socks: every 6 pairs = -$26 ($58 + Sloppy Six Pack Box), remainder 4+ pairs = -$12 ($44)
  const sockQty = state.cart.filter(c => SINGLE_SOCK_IDS.has(c.id)).reduce((a, b) => a + b.qty, 0);
  const sixPacks = Math.floor(sockQty / 6);
  const rem = sockQty % 6;
  const fourPacks = rem >= 4 ? 1 : 0;
  const sockSavings = sixPacks * 26 + fourPacks * 12;

  let label = 'Bundle & pack savings';
  if (suitSavings > 0 && sockSavings === 0) label = 'Tracksuit set discount';
  else if (sockSavings > 0 && suitSavings === 0) label = sixPacks > 0 ? 'Sloppy Six Pack + Box' : 'Sock 4-pack discount';
  return { total: suitSavings + sockSavings, label, sockQty, sixPacks };
}

function renderCart() {
  saveCart();
  const rawSub = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const savInfo = calcBundleSavings();
  const savings = savInfo.total;
  const sub = Math.max(0, rawSub - savings);
  const unlockedGift = sub >= FREE_GIFT_AT;
  const unlockedSockBox = savInfo.sixPacks > 0;
  const count = state.cart.reduce((s, x) => s + x.qty, 0) + (unlockedGift ? 1 : 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartSubtotal').textContent = '$' + sub.toFixed(2);

  const savRow = document.getElementById('cartSavingsRow');
  savRow.classList.toggle('show', savings > 0);
  document.getElementById('cartSavingsLabel').textContent = savInfo.label;
  document.getElementById('cartSavingsVal').textContent = `-$${savings.toFixed(2)}`;

  // 2-Stop Spend Progress Bar ($150 Free Ship -> $220 Free Sticker Sheet)
  const pct = Math.min(100, (sub / FREE_GIFT_AT) * 100);
  document.getElementById('shipFill').style.width = pct + '%';
  document.getElementById('stopShip').classList.toggle('unlocked', sub >= FREE_SHIP_AT);
  document.getElementById('stopGift').classList.toggle('unlocked', unlockedGift);

  if (sub === 0) {
    document.getElementById('shipMsg').innerHTML = `Spend <strong>$${FREE_SHIP_AT}</strong> for free US shipping &middot; <strong>$${FREE_GIFT_AT}</strong> for free Sticker Sheet`;
  } else if (sub < FREE_SHIP_AT) {
    document.getElementById('shipMsg').innerHTML = `<strong>$${(FREE_SHIP_AT - sub).toFixed(2)}</strong> away from <strong>Free US Shipping</strong> (feed the cannon)`;
  } else if (sub < FREE_GIFT_AT) {
    document.getElementById('shipMsg').innerHTML = `&#10003; Free US Shipping unlocked! Add <strong>$${(FREE_GIFT_AT - sub).toFixed(2)}</strong> for a <strong>FREE Tech Sticker Pack</strong>`;
  } else {
    document.getElementById('shipMsg').innerHTML = `&#9733; Max tier unlocked: <strong>Free US Shipping + FREE Tech Sticker Pack!</strong>`;
  }

  const el = document.getElementById('cartItems');
  const bagUpEl = document.getElementById('bagUpsells');

  if (!state.cart.length) {
    el.innerHTML = `<div style="color:var(--muted); text-align:center; padding:42px 16px; font-size:13.5px;">Your bag is empty &mdash; load the cannon whenever you're ready.</div>`;
    bagUpEl.style.display = 'none';
    return;
  }

  let rowsHtml = state.cart.map((c, i) => `
    <div class="cart-item">
      <img src="${c.img}" alt="${c.name}" />
      <div>
        <div style="font-weight:500; font-size:13px;">${c.name}</div>
        <div style="font-family:var(--mono); font-size:10.5px; color:var(--muted); margin-top:2px;">${c.size}</div>
        ${c.customDetail ? `<div style="font-family:var(--mono); font-size:9.5px; color:#d5f79d; margin-top:3px; line-height:1.35;">${c.customDetail}</div>` : ''}
        <div class="qty-row">
          <button class="qty-btn" onclick="changeQty(${i},-1)">-</button>
          <span style="font-family:var(--mono); font-size:11.5px;">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
      <div style="font-weight:600; font-size:13.5px;">$${(c.price * c.qty).toFixed(2)}</div>
    </div>
  `).join('');

  // Auto-inject FREE Matte-Black Collector Box whenever shopper mixes 6+ single socks!
  if (unlockedSockBox) {
    const boxP = DATA.products.find(x => x.id === 'so6pk-funky-6pack-box');
    const boxImg = boxP ? boxP.images[0].src : 'https://cdn.shopify.com/s/files/1/0739/0806/0262/files/00_studio_so6pk_sloppy_six_pack_v39.jpg?v=1795406083';
    rowsHtml += `
      <div class="cart-item free-gift-row">
        <img src="${boxImg}" alt="Matte-Black Collector Box" />
        <div>
          <div style="font-weight:600; font-size:12.5px; color:var(--accent);">Sloppy Six Pack Box${savInfo.sixPacks > 1 ? ` (&times;${savInfo.sixPacks})` : ''}</div>
          <div style="font-family:var(--mono); font-size:10px; color:var(--muted); margin-top:2px;">Unlocked with any 6 single socks &middot; Auto-added</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700; font-size:12.5px; color:var(--accent);">FREE</div>
        </div>
      </div>
    `;
  }

  // Auto-inject locked FREE slop.cc Tech Sticker Pack when cart >= $220!
  if (unlockedGift) {
    const giftP = DATA.products.find(x => x.id === FREE_GIFT_ID);
    const giftImg = giftP ? giftP.images[0].src : 'https://cdn.shopify.com/s/files/1/0739/0806/0262/files/00_studio_jh20_model_front_v49.jpg?v=1795416121';
    rowsHtml += `
      <div class="cart-item free-gift-row">
        <img src="${giftImg}" alt="Free Tech Sticker Pack" />
        <div>
          <div style="font-weight:600; font-size:12.5px; color:var(--accent);">slop.cc Tech Sticker Pack</div>
          <div style="font-family:var(--mono); font-size:10px; color:var(--muted); margin-top:2px;">Tier 2 VIP Reward &middot; Auto-added</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:var(--mono); font-size:10.5px; color:var(--faint); text-decoration:line-through;">$8</div>
          <div style="font-weight:700; font-size:12.5px; color:var(--accent);">FREE</div>
        </div>
      </div>
    `;
  }
  el.innerHTML = rowsHtml;

  // Render In-Bag Smart Cross-Sell Strip (prioritizes curated outfit PAIRINGS for items in bag!)
  const inBagIds = new Set(state.cart.map(c => c.id));
  if (unlockedGift) inBagIds.add(FREE_GIFT_ID);
  const smartPool = [];
  state.cart.forEach(c => {
    (PAIRINGS[c.id] || []).forEach(pid => {
      if (!inBagIds.has(pid) && !smartPool.includes(pid)) smartPool.push(pid);
    });
  });
  const fallbackPool = [
    'slop-box-25-starter-kit',
    'so6pk-funky-6pack-box',
    'keep-06-slop-script-snapback',
    'sh30-snout-slide',
    'so01-acid-snout-socks',
    'fk01-acid-checker-socks',
    'sp04-graffiti-sticker-pack',
    'kc03-chrome-snout-keychain',
    'kc04-cannon-jet-tag'
  ];
  const combinedPool = [...smartPool, ...fallbackPool.filter(id => !smartPool.includes(id))];
  const picks = combinedPool
    .filter(id => !inBagIds.has(id))
    .map(id => DATA.products.find(x => x.id === id))
    .filter(Boolean)
    .slice(0, 3);

  if (picks.length) {
    bagUpEl.style.display = 'block';
    bagUpEl.innerHTML = `
      <div class="bag-upsells-head">Complete your fit</div>
      <div class="bag-upsell-row">
        ${picks.map(up => {
          const defSz = up.sizes.includes('L') ? 'L' : (up.sizes.includes('US 10') ? 'US 10' : up.sizes[0]);
          const isBox = up.id === 'so6pk-funky-6pack-box' || up.id === 'slop-box-25-starter-kit';
          return `
            <div class="bag-up-card" style="cursor:pointer;" onclick="closeDrawer(); openModal('${up.id}')">
              <img src="${up.images[0].src}" alt="${up.name}" />
              <div class="bag-up-name" title="${up.name}">${up.name}</div>
              <div class="bag-up-foot">
                <span class="bag-up-price">${fmt(up.price)}</span>
                ${isBox
                  ? `<button class="bag-up-btn" onclick="event.stopPropagation(); closeDrawer(); openModal('${up.id}')">Build</button>`
                  : `<button class="bag-up-btn" onclick="event.stopPropagation(); addById('${up.id}','${defSz}')">+ Add</button>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    bagUpEl.style.display = 'none';
  }
}

function openDrawer() { document.getElementById('drawerBackdrop').classList.add('open'); document.getElementById('cartDrawer').classList.add('open'); }
function closeDrawer() { document.getElementById('drawerBackdrop').classList.remove('open'); document.getElementById('cartDrawer').classList.remove('open'); }

document.querySelectorAll('[data-coll]').forEach(b => b.addEventListener('click', () => setCollection(b.dataset.coll)));
document.getElementById('searchInput').addEventListener('input', e => { state.q = e.target.value; renderBundles(); renderGrid(); });
document.getElementById('sortSelect').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
document.getElementById('ownerToggle').addEventListener('click', () => {
  state.owner = !state.owner;
  document.body.classList.toggle('owner-mode', state.owner);
  document.getElementById('ownerToggle').classList.toggle('on', state.owner);
  showToast(state.owner ? 'Owner specs: on' : 'Customer view');
});
document.getElementById('sizeGuideBtn').addEventListener('click', () => {
  document.getElementById('sizeChartBox').classList.toggle('open');
});
const CORE_4PK_SOCKS = [
  'so01-acid-snout-socks',
  'so02-varsity-snout-socks',
  'so06-slopcannon-script-socks',
  'sv06-obsidian-varsity-socks'
];

function saveCart() {
  try { localStorage.setItem('slop_bf26_cart_v1', JSON.stringify(state.cart)); } catch (e) {}
}
function loadCart() {
  try {
    const raw = localStorage.getItem('slop_bf26_cart_v1');
    if (!raw) return;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return;
    const validIds = new Set(DATA.products.map(p => p.id));
    state.cart = arr.filter(c => c && validIds.has(c.id) && c.qty > 0);
  } catch (e) {}
}
function resolveVariantId(prod, rawColor, rawSize) {
  if (!prod || !prod.vids) return null;
  const v = prod.vids;
  if (rawColor && rawSize && v[rawColor + '|' + rawSize]) return v[rawColor + '|' + rawSize];
  if (rawSize && v[rawSize]) return v[rawSize];
  if (rawSize === 'S' && v['M']) return v['M']; // SO-01 PF#186 starts at M
  if (v['Default']) return v['Default'];
  const vals = Object.values(v);
  return vals.length ? vals[0] : null;
}
function buildShopifyCheckoutItems() {
  const rawItems = [];
  state.cart.forEach(c => {
    const prod = DATA.products.find(x => x.id === c.id);
    if (!prod) return;
    const sz = c.rawSize || (c.size ? c.size.split(' \u00b7 ').pop().trim() : (prod.sizes[0] || 'L'));
    const col = c.rawColor || (c.size && c.size.includes(' \u00b7 ') && prod.colors && prod.colors.length > 1 ? c.size.split(' \u00b7 ')[0].trim() : null);
    if (c.id === 'so6pk-funky-6pack-box') {
      const picks = (Array.isArray(c.customPicks) && c.customPicks.length === 6) ? c.customPicks : DEFAULT_FUNKY_SIX;
      picks.forEach(sid => {
        const sp = DATA.products.find(x => x.id === sid);
        const vid = resolveVariantId(sp, null, sz);
        if (vid) rawItems.push({ id: vid, quantity: c.qty, properties: { 'Bundle': 'The Sloppy Six Pack (Collector Box)', 'Pack Size': sz } });
      });
    } else if (c.id === 'so4pk-snout-crew-4pack') {
      CORE_4PK_SOCKS.forEach(sid => {
        const sp = DATA.products.find(x => x.id === sid);
        const vid = resolveVariantId(sp, null, sz);
        if (vid) rawItems.push({ id: vid, quantity: c.qty, properties: { 'Bundle': 'slop.cc Core 4-Pack Crew', 'Pack Size': sz } });
      });
    } else if (c.id === 'slop-box-25-starter-kit') {
      const vid = resolveVariantId(prod, null, sz);
      if (vid) rawItems.push({ id: vid, quantity: c.qty, properties: c.boxProps || { 'Box Mode': 'The $25 Slop Box', 'Sock Size': sz } });
    } else {
      const vid = resolveVariantId(prod, col, sz);
      if (vid) rawItems.push({ id: vid, quantity: c.qty });
    }
  });
  // Auto-add Free Tech Sticker Pack (SP-01) when net subtotal >= $150 so Shopify automatic 100%-off reward fires!
  const rawSub = state.cart.reduce((s, x) => s + x.price * x.qty, 0);
  const netSub = Math.max(0, rawSub - calcBundleSavings().total);
  if (netSub >= FREE_GIFT_AT) {
    const giftP = DATA.products.find(x => x.id === FREE_GIFT_ID);
    const gVid = resolveVariantId(giftP, null, giftP ? giftP.sizes[0] : null);
    if (gVid) rawItems.push({ id: gVid, quantity: 1, properties: { 'Reward': 'FREE VIP Tech Sticker Pack ($200+ Order)' } });
  }
  // Merge identical (id + properties) entries cleanly
  const merged = [];
  const idxMap = new Map();
  rawItems.forEach(it => {
    const key = it.id + '|' + JSON.stringify(it.properties || {});
    if (idxMap.has(key)) merged[idxMap.get(key)].quantity += it.quantity;
    else { idxMap.set(key, merged.length); merged.push({ ...it }); }
  });
  return merged;
}
async function goToCheckout(expressHint) {
  if (!state.cart.length) {
    showToast('Your bag is empty \u2014 load the cannon first.');
    return;
  }
  const items = buildShopifyCheckoutItems();
  const isLiveShopify = Boolean(window.Shopify && window.Shopify.shop);
  if (!isLiveShopify) {
    const via = expressHint ? `${expressHint} · ` : '';
    showToast(`${via}Checkout armed (${items.length} Shopify line item${items.length === 1 ? '' : 's'}) \u2014 live on shop.slop.cc`);
    return;
  }
  const btn = document.getElementById('checkoutBtn');
  const origTxt = btn ? btn.textContent : 'Checkout';
  if (btn) { btn.disabled = true; btn.textContent = 'Opening Shopify Checkout...'; }
  try {
    await fetch('/cart/clear.js', { method: 'POST', credentials: 'same-origin' });
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ items })
    });
    if (!res.ok) {
      let msg = 'Could not load checkout';
      try { const err = await res.json(); msg = err.description || err.message || msg; } catch (e) {}
      showToast(msg.includes('not available') || msg.includes('cannot find') ? 'Preview mode: publish BF26 drafts in Shopify Admin to test live checkout.' : msg);
      if (btn) { btn.disabled = false; btn.textContent = origTxt; }
      return;
    }
    window.location.href = '/checkout';
  } catch (e) {
    showToast('Network error opening checkout \u2014 please retry.');
    if (btn) { btn.disabled = false; btn.textContent = origTxt; }
  }
}

document.getElementById('dropListForm').addEventListener('submit', async e => {
  e.preventDefault();
  const inp = document.getElementById('dropListInput');
  const email = (inp.value || '').trim();
  if (!email) return;
  if (window.Shopify && window.Shopify.shop) {
    try {
      const fd = new FormData();
      fd.append('form_type', 'customer');
      fd.append('utf8', '\u2713');
      fd.append('contact[tags]', 'newsletter,bf26-droplist');
      fd.append('contact[email]', email);
      await fetch('/contact#contact_form', { method: 'POST', body: fd, credentials: 'same-origin' });
    } catch (err) {}
  }
  showToast(`Locked in: ${email} \u2014 you're on the drop wire.`);
  inp.value = '';
});
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalBackdrop').addEventListener('click', closeModal);
document.getElementById('modalAddBtn').addEventListener('click', () => {
  if (!state.activeProd) return;
  if (state.activeProd.id === 'so6pk-funky-6pack-box') {
    if (state.customSockBox.length !== 6) {
      showToast(`Pick ${6 - state.customSockBox.length} more pair(s) to complete your Collector Box`);
      return;
    }
    addCustomSockBoxToCart(state.activeSize);
    closeModal();
    openDrawer();
    return;
  }
  if (state.activeProd.id === 'slop-box-25-starter-kit') {
    const b = state.slopBox25;
    if (!b.mystery && b.stickers.length !== 2) {
      showToast(`Pick ${2 - b.stickers.length} more sticker pack(s) to finish your $25 Slop Box`);
      return;
    }
    addSlopBox25ToCart(state.activeSize);
    closeModal();
    openDrawer();
    return;
  }
  addById(state.activeProd.id, state.activeSize, state.activeColor);
  closeModal();
  openDrawer();
});
document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
document.getElementById('drawerBackdrop').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

fetch(window.BF26_CATALOG_URL).then(r => r.json()).then(d => {
  DATA = d;
  loadCart();
  document.getElementById('heroCountMeta').textContent = `${DATA.products.length} pieces \u00b7 zero filler`;
  const h = DATA.products.find(p => p.id === 'jh18-explosive-thermal');
  if (h && h.images[0]) document.getElementById('heroThumb').src = h.images[0].src;
  updateTabCounts();
  renderBundles();
  renderGrid();
  renderCart();
});
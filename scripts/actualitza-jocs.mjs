// Descarrega el catàleg de jocs de Steam i el desa a steam-games.json
// Format: [[appid, "nom"], ...] ordenat per appid.
// Necessita la variable d’entorn STEAM_API_KEY (al GitHub: Settings → Secrets → Actions).
import { writeFile } from 'node:fs/promises';

const KEY = process.env.STEAM_API_KEY;
if (!KEY) { console.error('Falta el secret STEAM_API_KEY.'); process.exit(1); }
const MIN_JOCS = Number(process.env.MIN_JOCS || 1000);
const BASE = 'https://api.steampowered.com/IStoreService/GetAppList/v1/';

const apps = new Map();
let last = 0, pagines = 0;

while (true) {
  if (++pagines > 40) throw new Error('Massa pàgines, s’atura per seguretat.');
  const url = new URL(BASE);
  url.search = new URLSearchParams({
    key: KEY, include_games: 'true', include_dlc: 'false', include_software: 'false',
    include_videos: 'false', include_hardware: 'false', max_results: '50000', last_appid: String(last)
  });
  let r;
  for (let intent = 1; intent <= 3; intent++) {
    r = await fetch(url);
    if (r.ok) break;
    if (intent === 3) throw new Error('Steam ha respost amb l’error ' + r.status + '. Revisa el secret STEAM_API_KEY.');
    await new Promise(s => setTimeout(s, 3000 * intent));
  }
  const d = (await r.json()).response || {};
  for (const a of d.apps || []) {
    const nom = String(a.name || '').trim();
    if (nom) apps.set(a.appid, nom);
  }
  console.log(`Pàgina ${pagines}: ${apps.size} jocs`);
  if (!d.have_more_results || !d.last_appid) break;
  last = d.last_appid;
}

if (apps.size < MIN_JOCS) throw new Error(`Només ${apps.size} jocs: no es desa per no esborrar el catàleg bo.`);
const sortida = [...apps].sort((a, b) => a[0] - b[0]);
await writeFile('steam-games.json', JSON.stringify(sortida));
console.log(`Desats ${sortida.length} jocs a steam-games.json`);

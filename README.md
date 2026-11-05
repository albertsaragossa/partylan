# Partylan: a què juguem? (versió de prova)

Còpia de l’aplicació de votacions per a la partylan **sense contrasenya**: qualsevol persona amb l’enllaç entra directament i només ha d’escriure el seu nom (la primera vegada; després el recorda al mateix navegador).

Serveix per provar-la. Per al grup real, fes servir la versió amb contrasenya (`partylan-votacions`).

## Què fa

- Cercador que troba qualsevol joc de Steam, amb el catàleg actualitzat automàticament per GitHub. Els jocs preferits de `games.js` surten primer.
- Opció d’afegir qualsevol altre joc enganxant-ne l’enllaç de Steam.
- Els jocs es mostren com a miniatures (cartell de Steam). En tocar-ne una s’obre la fitxa amb el comentari, qui l’ha proposat i l’enllaç a Steam.
- Data límit de propostes: fins a aquest moment només es poden proposar jocs; després s’obren les votacions.
- Cada persona té un nombre limitat de vots i pot treure’ls i tornar-los a posar.
- Les miniatures s’ordenen per vots, amb el guanyador ressaltat, i la fitxa mostra els noms de qui ha votat.

## Fitxers

| Fitxer | Per a què serveix |
| --- | --- |
| `index.html` | L’aplicació |
| `config.js` | Títol, base de dades, data límit de propostes i vots per persona |
| `games.js` | Jocs preferits, que surten primer al cercador |
| `steam-games.json` | Catàleg de jocs de Steam (el genera sol GitHub) |
| `scripts/actualitza-jocs.mjs` | Procés que descarrega el catàleg de Steam |
| `.github/workflows/actualitzar-jocs.yml` | Fa que GitHub executi el procés cada setmana |

## Posar-ho en marxa

### 1. Penjar-ho a GitHub Pages

1. Crea un repositori i puja tots els fitxers a l’arrel.
2. A **Settings → Pages**, tria la branca `main` i la carpeta `/ (root)`.
3. L’adreça serà `https://el-teu-usuari.github.io/nom-del-repositori/`.

### 2. Només per provar sola: mode prova

Amb `databaseUrl` buit a `config.js`, l’app guarda les dades només al teu navegador. Entra directament i no cal configurar res més. Cadascú veu només les seves dades.

### 3. Provar-ho amb més gent (Firebase)

1. Crea un projecte a [console.firebase.google.com](https://console.firebase.google.com) i una **Realtime Database**.
2. A **Regles**, posa-hi això i publica:

   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```

3. Copia l’adreça de la base de dades (acaba en `firebasedatabase.app` o `firebaseio.com`) a `databaseUrl` de `config.js`.

### 4. Fixar la data límit de propostes

A `config.js`, canvia `dataLimit` (hora local, format `AAAA-MM-DDTHH:MM`). Si el deixes buit (`""`), propostes i votacions estan sempre obertes, que va bé per provar. La data es comprova amb el rellotge del dispositiu de cada persona.

### 5. Cerca automàtica a tot el catàleg de Steam

Steam no deixa consultar el seu catàleg directament des d’una pàgina web (el navegador ho bloqueja). Per això un procés de GitHub descarrega la llista de jocs i la desa a `steam-games.json`, i la pàgina hi cerca. S’actualitza sol cada dilluns.

1. Demana una clau de l’API web de Steam a [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey). Al camp del domini pots posar-hi l’adreça de la teva pàgina de GitHub. Steam pot exigir que el compte hagi comprat alguna cosa per poder-ne generar una.
2. Al repositori, entra a **Settings → Secrets and variables → Actions → New repository secret**. Posa-hi el nom `STEAM_API_KEY` i la clau com a valor. Així la clau no queda al codi.
3. Ves a la pestanya **Actions**, tria **Actualitzar catàleg de Steam** i prem **Run workflow**. Al cap d’uns minuts apareix `steam-games.json` al repositori.
4. Comprova que has pujat la carpeta `.github` (és oculta i la web de GitHub o el Finder poden no mostrar-la; és més fàcil pujar-ho amb `git` o GitHub Desktop).

Mentre no existeixi `steam-games.json`, el cercador només troba els jocs de `games.js` i es pot afegir qualsevol joc amb l’enllaç de Steam. L’arxiu pesa uns quants MB i el navegador només el descarrega quan algú comença a cercar. Per canviar la freqüència, edita la línia `cron` del fitxer de `.github/workflows`.

### 6. Afegir jocs preferits

Edita `games.js`. L’`appid` és el número de l’enllaç de Steam (`store.steampowered.com/app/550/` és l’`appid` 550).

## Seguretat

Aquesta versió **no té cap protecció**. Amb les regles obertes, qualsevol persona que conegui l’adreça de la base de dades pot llegir-ne i modificar-ne les dades. No hi desis res privat i no l’usis per a la votació real.

## Autoria

Albert Saragossa Alòs

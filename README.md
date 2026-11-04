# Partylan: a què juguem? (versió de prova)

Còpia de l’aplicació de votacions per a la partylan **sense contrasenya**: qualsevol persona amb l’enllaç entra directament i només ha d’escriure el seu nom (la primera vegada; després el recorda al mateix navegador).

Serveix per provar-la. Per al grup real, fes servir la versió amb contrasenya (`partylan-votacions`).

## Què fa

- Cercador de jocs amb el llistat que tu defineixes (`games.js`).
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
| `games.js` | Llistat de jocs que surten al cercador |

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

### 5. Afegir els jocs més sol·licitats

Edita `games.js`. L’`appid` és el número de l’enllaç de Steam (`store.steampowered.com/app/550/` és l’`appid` 550).

## Seguretat

Aquesta versió **no té cap protecció**. Amb les regles obertes, qualsevol persona que conegui l’adreça de la base de dades pot llegir-ne i modificar-ne les dades. No hi desis res privat i no l’usis per a la votació real.

## Autoria

Albert Saragossa Alòs

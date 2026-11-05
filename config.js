// Configuració de l’aplicació. Edita només aquest fitxer.
// VERSIÓ DE PROVA: sense contrasenya. Qualsevol persona amb l’enllaç hi pot entrar.
window.CONFIG = {
  // Títol que es mostra a dalt
  titol: "Partylan: a què juguem?",

  // Adreça de la teva Firebase Realtime Database (sense barra final).
  // Exemple: "https://el-teu-projecte-default-rtdb.europe-west1.firebasedatabase.app"
  // Mentre estigui buida, l’app funciona en mode prova (dades només en aquest navegador).
  databaseUrl: "",

  // Catàleg de tots els jocs de Steam (el genera sol GitHub, mira el README).
  // Deixa-ho buit ("") per fer servir només els jocs de games.js.
  cataleg: "steam-games.json",

  // Data límit per fer propostes (hora local, format AAAA-MM-DDTHH:MM).
  // Fins aquest moment només es poden proposar jocs; després s’obren les votacions.
  // Deixa-ho buit ("") perquè propostes i votacions estiguin sempre obertes.
  dataLimit: "2026-11-20T23:59",

  // Vots que pot repartir cada persona
  votsPerPersona: 5,

  // Segons entre actualitzacions de la llista compartida
  refrescSegons: 5
};

const http = require("http"); //on importe le package http de node
const app = require("./app"); //on importe l'appli

const normalizePort = (val) => {
  //le port valide est renvoyé que ce soit sous la forme d'un numéro ou d'une string
  const port = parseInt(val, 10); //converti une string en entier en base 10

  if (isNaN(port)) {
    //si la conversion échoue, on renvoi le port tel quel (en string)
    return val;
  }
  if (port >= 0) {
    //si c'est un nombre, on renvoi le port en tant que numéro
    return port;
  }
  return false; //dans les autres cas on renvoie false
};

const port = normalizePort(process.env.PORT || "3000"); // le port sur lequel l'appli tournera : le port inscrit dans les variables d'env ou le port 3000
app.set("port", port);

const errorHandler = (error) => {
  //recherche les erreurs et les gère comme il faut avant de les enregistrer dans le serveur
  if (error.syscall !== "listen") {
    // Si l'erreur n'est pas liée à l'appel système "listen"
    throw error; //on la propage
  }
  const address = server.address(); // On récupère l'adresse du serveur.
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port; // Détermine si l'adresse est une chaîne ou un port.

  switch (
    error.code // Gère les erreurs courantes liées à l'écoute du port.
  ) {
    case "EACCES": // L'utilisateur n'a pas les privilèges requis pour utiliser le port.
      console.error(bind + " requires elevated privileges.");
      process.exit(1); // Quitte le processus avec un code d'erreur.
      break;

    case "EADDRINUSE": // Le port est déjà en cours d'utilisation.
      console.error(bind + " is already in use.");
      process.exit(1); // Quitte le processus avec un code d'erreur.
      break;

    default:
      throw error; // Propage les autres erreurs inattendues.
  }
};

const server = http.createServer(app); //méthode du package http, argument : fonction appelée à chaque requête du serveur

server.on("error", errorHandler); // Gestionnaire d'erreur pour le serveur en cas d'erreur lors de la liaison du port.
server.on("listening", () => {
  // Gestionnaire d'événement pour le serveur lorsqu'il est en cours d'écoute sur le port.
  const address = server.address(); // Obtient l'adresse sur laquelle le serveur écoute.
  const bind = typeof address === "string" ? "pipe " + address : "port " + port; // Détermine si l'adresse est une chaîne ou un port.
  console.log("Listening on " + bind); // Affiche un message indiquant que le serveur est en cours d'écoute sur l'adresse/port spécifié.
});

server.listen(port); //le port employé pour que le serveur écoute les requêtes

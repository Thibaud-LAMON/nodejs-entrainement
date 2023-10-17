const http = require("http"); //on importe le package http de node

const server = http.createServer(
  //méthode du package http, argument : fonction appelée à chaque requête du serveur
  (req, res) => {
    //2 arguments : requête & réponse
    res.end("Voilà la réponse du serveur !"); //méthode end, renvoie une réponse
  }
);

server.listen(process.env.PORT || 3000); //le port employé pour que le serveur écoute les requêtes : le port inscrit dans les variables d'env ou le port 3000

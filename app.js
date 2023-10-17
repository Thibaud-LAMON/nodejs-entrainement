const express = require("express"); //import express

const app = express(); //créer une appli express

app.use((req, res, next) => {
  //premier middleware, il sera appliqué à toutes les requêtes envoyées
  res.setHeader("Access-Control-Allow-Origin", "*"); //tout le monde peut avoir accès à l'API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //on ajoute les headers qui seront mentionnés aux requêtes envoyées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //on ajoute les méthodes avec lesquelles on effectue les requête
  next();
});

app.use("/api/stuff", (req, res, next) => {
  //2 arguments : URL & réponse
  const stuff = [
    //on créer un tableau avec 2 objets
    {
      _id: "oeihfzeoi", //id
      title: "Mon premier objet", //titre
      description: "Les infos de mon premier objet", //description
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg", //url d'image
      price: 4900, //prix en centime
      userId: "qsomihvqios", //clé secondaire : id utilisateur
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff); //on retourne un code 200 et une réponse json : stuff
});

module.exports = app; //on l'exporte pour y accéder depuis les autres fichiers dont le serveur node

/* 

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  res.status(201);
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  //3 arguments : requête, réponse & suivant
  res.json({ message: "Votre requête est reçue !" }); //méthode json, renvoie une réponse en json (JS Object Notation)
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

*/

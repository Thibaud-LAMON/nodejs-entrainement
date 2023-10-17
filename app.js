const express = require("express"); //import express

const app = express(); //créer une appli express

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  res.status(201);
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  //2 arguments : requête & réponse
  res.json({ message: "Votre requête est reçue !" }); //méthode json, renvoie une réponse en json (JS Object Notation)
  next(); //necéssaire pour passer au middleware suivant
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app; //on l'exporte pour y accéder depuis les autres fichiers dont le serveur node

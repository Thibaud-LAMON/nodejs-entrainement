const express = require("express"); //import express
const bodyParser = require("body-parser"); //import body-parser
const mongoose = require("mongoose"); //import mongoose

const stuffRoutes = require("./routes/stuff.js");

const app = express(); //créer une appli express

mongoose
  .connect(
    "mongodb+srv://Thalom:QqngXeBBO8gY2CPF@cluster0.ehp2nwf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ) //connexion à la BDD
  .then(() => console.log("Connexion à MongoDB réussie !")) //si la connection est réussie
  .catch(() => console.log("Connexion à MongoDB échouée !")); //si la connection a échoué

app.use(express.json()); //intercepte TOUTES les requêtes en JSON, ce contenu est envoyé dans req.body

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

app.use(bodyParser.json()); //issue de la formation, j'ignore ce que cela fait

app.use("/api/stuff", stuffRoutes);

module.exports = app; //on l'exporte pour y accéder depuis les autres fichiers dont le serveur node

const express = require("express"); //import express
const mongoose = require("mongoose"); //import mongoose

const Thing = require("./models/Thing");

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

app.post("/api/stuff", (req, res, next) => {
  //intercepte uniquement les requêtes HTTP de type POST
  delete req.body._id; //on enlève le champs id avant de copier l'objet
  const thing = new Thing({
    //nouvelle instance de Thing
    ...req.body, //opérateur spread va copier les champs dans le body de la request
  });
  thing
    .save() //enregistre l'objet
    .then(res.status(201).json({ message: "Objet enregistré !" })) //promise : code 201 d'enregistrement réussi
    .catch((error) => res.status(400).json({ error })); //code 400 d'erreur
});

app.get("/api/stuff/:id", (req, res, next) => {
  // :id = segment dynamique, pour récupérer un objet selon son id
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error })); //erreur 404 item not found
});

app.get("/api/stuff", (req, res, next) => {
  //2 arguments : URL & réponse ; n'intercepte que les requêtes GET
  Thing.find() //récupère la liste d'objet
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app; //on l'exporte pour y accéder depuis les autres fichiers dont le serveur node

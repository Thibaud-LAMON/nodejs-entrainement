const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //on hash le mot de passe 10 fois, ne pas faire trop de fois cela prendrait trop de temps
    .then((hash) => {
      //on récupère le hash
      const user = new User({
        //on crée un nouveau User
        email: req.body.email, //son email sera celui de la requête
        password: hash, //son mdp celui résultant de hash
      });
      user
        .save() //on enregistre en BDD
        .then(() => res.status(201).json({ message: "Utilisateur crée!" })) //création réussie
        .catch(() => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //erreur 500, erreur serveur
};

exports.login = (req, res, next) => {};

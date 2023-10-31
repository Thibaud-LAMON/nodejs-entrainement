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

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) //on cherche l'user selon l'email
    .then((user) => {
      //si ça marche on vérifie si l'user à été trouvé
      if (user === null) {
        //si la valeur est nulle
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" }); //on ne dit pas quel paramètre est érroné pour ne pas créer de faille de sécurité
      } else {
        //si la valeur n'est pas nulle
        bcrypt
          .compare(req.body.password, user.password) //on compare le mdp de la requète avec celui de la BDD
          .then((valid) => {
            //on vérifie sa validité
            if (!valid) {
              //s'il est invalide
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              //s'il est valide
              res.status(200).json({
                //on renvoi un objet avec les infos necéssaires à l'auth des requêtes émises par le client
                userId: user._id, //userId
                token: "TOKEN", //TOKEN
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

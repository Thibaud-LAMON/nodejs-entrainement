const Thing = require("../models/Thing"); // on importe le model Thing

//fonction pour créer un objet
exports.createThing = (req, res, next) => {
  //l'objet de requête sera envoyé en chaine de caractères JSON
  const thingObject = JSON.parse(req.body.thing); //il faut donc le parser
  delete thingObject._id; //on enlève le champs id car la BDD le génère automatiquement
  delete thingObject._userId; //on enlève le champs user_id, ne jamais faire confiance au client
  //On empêche les malintentionnés de faire une requête avec leur token qui permettrait d'utiliser le user_id de quelqu'un d'autre

  const thing = new Thing({
    //nouvelle instance de Thing
    ...thingObject, //opérateur spread (...) va copier les champs dans le body de la request
    userId: req.auth.userId, //extrait de l'objet requête
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, //on génère l'URL : [protocole HTTP]://[nom d'hôte]/images/[nom de fichier donné par multer]
  });
  thing
    .save() //enregistre l'objet
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    }) //promise : code 201 d'enregistrement réussi
    .catch((error) => {
      res.status(400).json({ error });
    }); //code 400 d'erreur
};

//fonction pour modifier un objet
exports.modifyThing = (req, res, next) => {
  //S'il y a un champ file
  const thingObject = req.file
    ? {
        ...JSON.parse(req.body.thing), //on parse la requête
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, //on crée l'URL d'image
      }
    : { ...req.body }; //sinon on récupère l'objet directement

  delete thingObject._userId; //on supprime l'user_id de la requête
  //empêche la réassignation à quelqu'un d'autre d'un objet créé

  Thing.findOne({ _id: req.params.id }) //on cherche l'objet en BDD pour vérifier si c'est bien le créateur qui veut le modifier
    .then((thing) => {
      //en cas de succès, on prend l'objet...
      if (thing.userId != req.auth.userId) {
        //...si userId dans requête diffère de celui du token
        res.status(401).json({ message: "Not authorized" }); //erreur 401
      } else {
        Thing.updateOne(
          //sinon...
          { _id: req.params.id }, //on passe un filtre pour savoir quel enregistrement mettre à jour...
          { ...thingObject, _id: req.params.id } //...sur l'objet
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

//fonction pour supprimer un objet
exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) //on en supprime un seul : celui dont l'id est égal à celui des paramètres de requête
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

//fonction pour récupérer un objet
exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) //on en récupère un seul
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error })); //erreur 404 item not found
};

//fonction pour récupéter tous les objets
exports.getAllThings = (req, res, next) => {
  Thing.find() //récupère la liste d'objet
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

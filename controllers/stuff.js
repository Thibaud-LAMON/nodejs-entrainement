const Thing = require("../models/Thing"); // on importe le model Thing

//fonction pour créer un objet
exports.createThing = (req, res, next) => {
  delete req.body._id; //on enlève le champs id avant de copier l'objet
  const thing = new Thing({
    //nouvelle instance de Thing
    ...req.body, //opérateur spread va copier les champs dans le body de la request
  });
  thing
    .save() //enregistre l'objet
    .then(res.status(201).json({ message: "Objet enregistré !" })) //promise : code 201 d'enregistrement réussi
    .catch((error) => res.status(400).json({ error })); //code 400 d'erreur
};

//fonction pour modifier un objet
exports.modifyThing = (req, res, next) => {
  Thing.updateOne(
    { _id: req.params.id }, //on en modifie un seul : celui dont l'id est égal à celui des paramètres de requête
    { ...req.body, _id: req.params.id }
  ) //on le remplace par un nouvel objet dont l'id correspond à celui des paramètres
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
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

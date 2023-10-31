const express = require("express"); //on importe express
const router = express.Router(); //on créer le routeur avec la méthode Router
const stuffCtrl = require("../controllers/stuff"); // on importe le controller stuff

//2 arguments : URL & fonction réponse appelée depuis le contrôleur
router.post("/", stuffCtrl.createThing); //intercepte uniquement les requêtes HTTP de type POST
router.put("/:id", stuffCtrl.modifyThing); //intercepte uniquement les requêtes HTTP de type PUT
router.delete("/:id", stuffCtrl.deleteThing); //intercepte uniquement les requêtes HTTP de type DELETE
router.get("/:id", stuffCtrl.getOneThing); // :id = segment dynamique, pour récupérer un objet selon son id
router.get("/", stuffCtrl.getAllThings); //n'intercepte que les requêtes GET

module.exports = router;

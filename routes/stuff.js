const express = require("express"); //on importe express
const auth = require("../middleware/auth");
const router = express.Router(); //on créer le routeur avec la méthode Router
const stuffCtrl = require("../controllers/stuff"); // on importe le controller stuff
const multer = require("../middleware/multer-config");

//3 arguments : URL, authentification & fonction réponse appelée depuis le contrôleur
//4 pour post : on le met après auth car il doit récupérer le token, ses infos puis les vérifier
router.post("/", auth, multer, stuffCtrl.createThing); //intercepte uniquement les requêtes HTTP de type POST
router.put("/:id", auth, multer, stuffCtrl.modifyThing); //intercepte uniquement les requêtes HTTP de type PUT
router.delete("/:id", auth, stuffCtrl.deleteThing); //intercepte uniquement les requêtes HTTP de type DELETE
router.get("/:id", auth, stuffCtrl.getOneThing); // :id = segment dynamique, pour récupérer un objet selon son id
router.get("/", auth, stuffCtrl.getAllThings); //n'intercepte que les requêtes GET

module.exports = router;

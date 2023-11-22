const multer = require("multer"); //import multer

//MultipurposeInternetMailExtension (MIME) : type de media
//permet de générer l'extension du fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//objet de configuration pour multer
//deux arguments : destination et filename
const storage = multer.diskStorage({
  //explique dans quel dossier sont envoyés les fichiers
  //trois argument : requête, fichier, callback
  destination: (req, file, callback) => {
    callback(null, "images"); //on appel le callback tout de suite, arguments : null = pas d'erreur, nom du dossier de stockage
  },
  //explique quel nom de fichier utiliser
  //trois argument : requête, fichier, callback
  filename: (req, file, callback) => {
    //le fichier est nommé à partir du nom d'origine
    //split(" ") sépare la string du nom en un tableau, les espaces détermines les fins des éléments du tableau
    //join(" ") réunni les éléments du tableau en une string, deux élément sont liés par un "_"
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype]; //extension = MIME_TYPE du fichier envoyé par le frontend
    callback(null, name + Date.now() + "." + extension); //genère le nom complet : nom + date à la ms prêt + . + extension
  },
});

module.exports = multer({ storage }).single("image"); //single('image') : fichier image unique

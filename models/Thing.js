const mongoose = require("mongoose"); //on importe mongoose

//la fonction Schema de mongoose nous permet de lister les colonnes de Thing, le type de données et la nécessité
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Thing", thingSchema); //export pour exploiter le modèle

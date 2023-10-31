const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1]; //on récupère le header et le divise en tableau au niveau de l'espace entre le bearer[0] et le token[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //on le décode avec verify(le token, la clé secrète)
    const userId = decodedToken.userId; // on récupère le userId
    req.auth = {
      userId: userId, //on rajoute userId
    };
    next();
  } catch (error) {
    //en cas d'erreur (dont token invalide)
    res.status(401).json({ error });
  }
};

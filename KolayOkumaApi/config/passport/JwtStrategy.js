const JWTStrategy = require("passport-jwt").Strategy;
const Admin = require("../../models/admin.js");

const getToken = (req) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    // Bearer tokenini ayrıştırın
    const token = authHeader.split(" ")[1];
    return token; // Tokeni req nesnesine ekleyin
  }
};
const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: (req) => getToken(req),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
  },
  async function (req, jwtPayload, done) {
    if (!jwtPayload) {
      return done("Cookieler Bulunmuyor", null, "Cookieler Bulunmuyor");
    }

    const admin = await Admin.findById(jwtPayload.data.id).lean();
    if (!admin) {
      return done("No user found", null, "Kullanıcı Bulunamadı");
    }

    req.user = admin;
    return done(null, admin);
  }
);

module.exports = jwtStrategy;

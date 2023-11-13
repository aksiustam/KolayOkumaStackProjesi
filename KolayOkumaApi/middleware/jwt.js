const passport = require("passport");

function authenticateWithJwt(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      let errorMessage = "Bilinmeyen bir Error Oluştu...";
      console.log(error);

      // Handle errors, e.g., token expired or verification failed
      return res.status(401).json({
        error: errorMessage,
        message: "Oturumunuz Sonlanmıştır. Lütfen tekrar giriş yapın...",
      });
    }

    if (info) {
      // Handle errors, e.g., token expired or verification failed
      let errorMessage = "Bilinmeyen bir Info oluştu.";
      console.log(info);

      return res.status(401).json({
        error: errorMessage,
        message: "Oturumunuz Sonlanmıştır. Lütfen tekrar giriş yapın...",
      });
    }
    next();
  })(req, res, next);
}

module.exports = { authenticateWithJwt };

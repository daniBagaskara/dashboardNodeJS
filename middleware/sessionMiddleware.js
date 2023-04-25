// sessionMiddleware.js

const sessionMiddleware = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/dashboard"); // user sudah memiliki session, redirect ke halaman dashboard
  } else {
    return next(); // lanjut ke middleware atau handler selanjutnya
  }
};

module.exports = sessionMiddleware;

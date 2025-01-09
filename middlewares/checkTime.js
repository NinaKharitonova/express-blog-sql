function checkTime(req, res, next) {
  const now = new Date();
  const nowText = now.toLocaleString();

  console.log("Sei passato in questo middlewares alle");
  console.log(nowText);

  next();
}

module.exports = checkTime;

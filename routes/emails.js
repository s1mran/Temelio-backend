let express = require("express");
const NonProfit = require("../models/NonProfit");
const Email = require("../models/Email");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.headers["login-user"] == "admin")
    return res
      .status(404)
      .send("You do not have permission to access emails data");
  let emails = await Email.find({ foundation: req.headers["login-user"] });
  return res.status(200).send(emails);
});

router.post("/", async (req, res) => {
  if (req.headers["login-user"] == "admin")
    return res.status(404).send("You do not have permission to send an email");
  let foundation = req.headers["login-user"];
  let { message, nonprofits } = req.body;
  if (!message || !nonprofits || !nonprofits.length || !foundation)
    return res
      .status(400)
      .send(
        "Please send a valid message, reciever nonprofit and source foundation for sending an email"
      );
  let email = new Email({
    message,
    recievers: nonprofits,
    foundation,
  });
  try {
    await email.save();
    for (var i = 0; i < nonprofits.length; i++) {
        let msg = message;
        msg = msg
          .replace("{name}", nonprofits[i].name)
          .replace("{address}", nonprofits[i].address);
        console.log(msg)
    }
    return res.status(200).send(email);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;

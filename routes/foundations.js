let express = require("express");
const Foundation = require("../models/Foundation");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.headers["login-user"] != "admin") {
    let foundations = await Foundation.find({
      email: req.headers["login-user"],
    });
    return res.status(200).send(foundations);
  } else {
    let foundations = await Foundation.find();
    return res.status(200).send(foundations);
  }
});

router.post("/add", async (req, res) => {
  if (req.headers["login-user"] != "admin")
    return res
      .status(400)
      .send("You do not have permission to create a foundation");
  let { email } = req.body;
  if (!email)
    return res
      .status(400)
      .send("Please send a valid email for creating a new foundaiton");
  let foundation = new Foundation({
    email,
    name: email.split("@")[0],
  });
  try {
    await foundation.save();
    return res.status(200).send(foundation);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;

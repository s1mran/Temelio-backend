let express = require("express");
const NonProfit = require("../models/NonProfit");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.headers["login-user"] == "admin")
    return res
      .status(404)
      .send("You do not have permission to access nonprofits data");
  let { foundation } = req.body;
  let nonprofits = await NonProfit.find({
    foundations: { $elemMatch: {$eq: req.headers["login-user"]} },
  });
  console.log(nonprofits);
  return res.status(200).send(nonprofits);
});

router.post("/", async (req, res) => {
  if (req.headers["login-user"] == "admin")
    return res
      .status(404)
      .send("You do not have permission to create a nonprofits");
  let foundation = req.headers["login-user"]; 
  let { email, name, address } = req.body;
  if (!email || !name || !address || !foundation)
    return res
      .status(400)
      .send(
        "Please send a valid email, name, address and source foundation for creating a new nonprofit"
      );
  let existingNonProfit = await NonProfit.findOne({ email: email });
  if (existingNonProfit) {
    try {
      let foundations = [...existingNonProfit.foundations, foundation];
      existingNonProfit = await existingNonProfit.updateOne(
        {
          email: email,
        },
        {
          foundations: foundations,
        }
      );
      return res.status(200).send(existingNonProfit);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }
  let nonprofit = new NonProfit({
    email,
    name,
    address,
    foundations: [foundation],
  });
  try {
    await nonprofit.save();
    return res.status(200).send(nonprofit);
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;

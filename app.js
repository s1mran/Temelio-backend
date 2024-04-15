const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const foundationsRouter = require("./routes/foundations")
const emailsRouter = require("./routes/emails");
const nonprofitsRouter = require("./routes/nonprofits");
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
// DB Config
const db = process.env.MONGOURI;

// Connect to MongoDB
mongoose
  .set("strictQuery", true)
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));


// Routes
app.use("/api/foundations", foundationsRouter);
app.use("/api/emails", emailsRouter);
app.use("/api/nonprofits", nonprofitsRouter);


const port = process.env.PORT || 5002; // process.env.port is Heroku's port if we choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

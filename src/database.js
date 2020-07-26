const mongoose = require("mongoose");
const {
  database: { URI },
} = require("./keys");

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((e) => console.error(e.message));

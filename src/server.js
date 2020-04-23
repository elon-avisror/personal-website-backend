const fs = require("fs").promises;
const bodyParser = require("body-parser");
const express = require("express");
const jsonFile = __dirname + "/content.json";

const app = express();
app.use(bodyParser.json());

const store = {
  content: {},
  async read() {
    try {
      await fs.access(jsonFile);
      this.content = JSON.parse((await fs.readFile(jsonFile)).toString());
    } catch (e) {
      console.log(e);
      this.content = {};
    }
    return this.content;
  },
};

app.get("/", async (req, res) => {
  res.send(await store.read());
});

app.listen(8000, () => {
  console.log("server listen on port 8000!");
});

import fetch from "node-fetch";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

app.get("/url_word_counter", (req, res) => {
  const url = req.query.url;
  fetch(url, {
    headers: { Accept: "text/html", "Accept-Encoding": "gzip" },
  }).then(async (resp) => {
    const html_body = await resp.text();
    res.send(html_body);
  });
});

app.listen(3000);

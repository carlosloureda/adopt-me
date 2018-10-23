import express from "express";
import React from "react";
//import { renderToString } from "react-dom/server";
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "./src/App.tsx";

const PORT = process.env.PORT || 3000;

const html = fs.readdirSync("dist/index.html").toString();

const parts = html.split("not rendered"); // gr8 way to inject in that #app in html

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkUp = (
    <ServerLocation ulr={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkUp);
  stream.pipe(
    res,
    { end: false }
  );
  stream.ond("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`Listening on ${PORT}`);
app.listen(PORT);

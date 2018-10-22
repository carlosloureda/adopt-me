/* Vamos a hacer todo lo que hagamos para el browser (hecho para el SSR) */
import React from "react";
import { hydrate } from "react-dom"; //hydrate vs render -> hydrate busca marcado en la página, no asume un lienzo en blanco como render
import App from "./App";

hydrate(<App />, document.getElementById("root"));

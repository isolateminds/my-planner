import Main from "./Main";
import React from "react";
import ReactDom from "react-dom";

(({ electron }) => {
  var makePDF = (...args) => electron.send("PDF", ...args);
  return ReactDom.render(<Main makePDF={makePDF} />, document.getElementById("root"))
})(window);
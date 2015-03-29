import React from "react";
var Fluxxor = require("fluxxor");

export default Fluxxor.createStore({
  actions: {
    "displayModalWindow": "displayModalWindow",
    "hideModalWindow": "hideModalWindow"
  },

  initialize: function() {
    this.content = "hi";
    this.display = false;
  },

  getState() {
    return {
      content: this.content,
      style: {
        display: (this.display ? "flex" : "none")
      }
    };
  },

  displayModalWindow(content) {
    this.content = content;
    this.display = true;
    this.emit("change");
  },

  hideModalWindow() {
    this.display = false;
    this.emit("change");
  }
});

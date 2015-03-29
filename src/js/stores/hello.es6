var Fluxxor = require("fluxxor");

var MyStore = Fluxxor.createStore({
  actions: {
    "hello": "handleActionType"
  },

  initialize: function(options) {
    this.value = options.value;

    // We could also use this in place of the `actions` hash, above:
    this.bindActions(
      "ACTION_TYPE", this.handleActionType
    );
  },

  handleActionType: function(payload, type) {
    console.log("hello", arguments);
    // ...
  }
});

module.exports = MyStore;

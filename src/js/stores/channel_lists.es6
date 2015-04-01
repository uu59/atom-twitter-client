import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import _ from "lodash";

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "loadLists": "loadLists",
  },

  initialize() {
    this.lists = [];
  },

  getState() {
    return {
      lists: this.lists
    };
  },

  loadLists() {
    this.client.lists().then((lists) => {
      this.lists = lists;
      this.emit('change');
    }.bind(this));
  },

  changeCurrentUser(user) {
    this.client = new TwitterClient(user);
    this.loadLists();
  },
});

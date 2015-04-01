import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import Storage from '../lib/storage.es6';
import _ from "lodash";

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "searchTwitter": "append",
    "channelSearchClose": "remove",
  },

  initialize(user) {
    this.setup(user);
  },

  setup(user) {
    this.user = user;
    this.searches = JSON.parse(Storage.get(this.storageKey()) || "[]");
  },

  storageKey() {
    return `${this.user}--saved-searches`;
  },

  append(q) {
    console.log("append", q);
    this.searches.push(q);
    this.persist();
    this.emit('change');
  },

  remove(q) {
    this.searches = _.without(this.searches, q);
    this.persist();
    this.emit('change');
  },

  persist(){
    Storage.set(this.storageKey(), JSON.stringify(this.searches));
  },

  getState() {
    return {
      user: this.user,
      searches: this.searches,
    };
  },

  changeCurrentUser(user) {
    this.setup(user);
    this.emit('change');
  },
});


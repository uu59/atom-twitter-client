import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import Storage from '../lib/storage.es6';

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "updateStatus": "updateStatus",
    "retweetThis": "retweet",
  },

  initialize(screenName = null) {
    this.userNames = Storage.users();
    this.currentUser = screenName || this.userNames[0];
    this.setupClient();
  },

  setupClient() {
    this.client = new TwitterClient(this.currentUser);
  },

  getState() {
    return {
      currentUser: this.currentUser,
      userNames: this.userNames,
      client: new TwitterClient(this.currentUser),
    };
  },

  selectAccount(name) {
  },

  changeCurrentUser(user) {
    this.currentUser = user;
    this.setupClient();
    this.emit('change');
  },

  retweet(id) {
    this.client.retweet(id);
  },
});

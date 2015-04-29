import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import Storage from '../lib/storage.es6';

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "updateStatus": "updateStatus",
    "retweetThis": "retweet",
    "removeThis": "remove",
    "fetchFriendship": "fetchFriendship",
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
      client: this.client,
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

  remove(id) {
    this.client.destroy(id);
  },

  fetchFriendship(targetName) {
    this.client.friendshipsShow(this.currentUser, targetName).then((result) => {
    });
  }
});

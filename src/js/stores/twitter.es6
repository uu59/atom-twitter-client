import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "changeTimeline": "changeTimeline",
    "updateStatus": "updateStatus",
  },

  initialize(user, type = "home", args = null) {
    this.user = user;
    this.type = type;
    this.args = args;
    this.setupClient();
  },

  setupClient() {
    this.client = new TwitterClient(this.user);
  },

  getState() {
    return {
      user: this.user,
      client: this.client,
      type: this.type,
      args: this.args
    };
  },

  changeCurrentUser(user) {
    this.user = user;
    this.type = "home";
    this.args = "";
    this.setupClient();
    this.emit('change');
  },

  changeTimeline(data) {
    [this.type, this.args] = data;
    this.emit('change');
  },

  post(status) {
    this.client.updateStatus({status: status}).then((a)=> {
      this.emit('updateStatus--done');
    });
  }

});

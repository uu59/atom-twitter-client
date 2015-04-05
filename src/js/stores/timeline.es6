import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import _ from "lodash";

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "changeTimeline": "changeTimeline",
    "tweetConversationShow": "fetchConversations",
  },

  initialize(type, args = {}) {
    this.type = type || "home";
    this.args = args;
    this.tweets = [];
    this.knownConversations = {};
    this.loading = false;
  },

  getState() {
    return {
      user: (this.client && this.client.user),
      type: this.type,
      args: this.args,
      conversations: this.knownConversations,
      loading: this.loading,
      tweets: this.tweets,
    };
  },

  fetchConversations(id) {
    this.client.conversations({id: id}).then((conversations) => {
      this.knownConversations[id] = conversations;
    });
    this.emit("emit");
  },

  fetchTweets(params = {}) {
    var client = this.client;
    var reqParams = _.merge(_.clone(this.args, true), params);
    var promise;
    switch(this.type){
      case "home":
        return client.homeTimeline(reqParams);
        break;
      case "list":
        return client.listStatuses(reqParams);
        break;
      case "user":
        return client.userTimeline(reqParams);
        break;
      case "search":
        return client.search(reqParams);
        break;
      case "mentions":
        return client.mentions(reqParams);
        break;
      default:
        throw new Error(`unknown type: ${this.type}`);
    }
  },

  reloadTweets() {
    this.tweets = [];
    this.loading = true;
    this.emit("change");
    var promise = this.fetchTweets();
    return promise.then( (tweets) => {
      this.tweets = tweets;
      this.loading = false;
      this.emit("change");
    }.bind(this));
  },

  loadMore(params = {}) {
    this.loading = true;
    this.emit("change");
    var promise = this.fetchTweets(params);
    return promise.then( (tweets) => {
      this.tweets = _.chain(this.tweets.concat(tweets))
        .sortByOrder(["id_str"], [false])
        .uniq(true, "id_str")
        .value();
      this.loading = false;
      this.emit("change");
    }.bind(this));
  },

  changeTimeline(payload) {
    this.type = payload.type;
    this.args = payload.args;
    this.reloadTweets();
  },

  changeCurrentUser(user) {
    this.client = new TwitterClient(user);
    this.type = "home";
    this.args = {};
    this.reloadTweets();
  },
});

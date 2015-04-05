import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import _ from "lodash";

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "tweetConversationShow": "fetchConversations",
  },

  initialize(user = null) {
    this.client = new TwitterClient(user);
    this.conversation = [];
    this.loading = false;
  },

  getState() {
    return {
      conversation: this.conversation,
      loading: this.loading,
    };
  },

  fetchConversations(id) {
    this.client.conversations({id: id}).then((tweets) => {
      this.conversation = tweets;
      console.log("fetched");
      this.emit("change");
    });
  },

  changeCurrentUser(user) {
    if(this.client && this.client.user === user) {
      return;
    }
    this.client = new TwitterClient(user);
  },
});

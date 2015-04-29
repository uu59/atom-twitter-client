import Storage from './lib/storage.es6';

export default {
  initialLoad(initialAccount) {
    this.dispatch('changeCurrentUser', initialAccount);
  },

  registerAccountTokens(params) {
    Storage.set(`token--${params.screenName}`, JSON.stringify(params.tokens));
    var users = JSON.parse(Storage.get('users') || "[]");
    users.push(params.screenName);
    Storage.set('users', JSON.stringify(users));
  },

  changeCurrentUser(screenName) {
    this.dispatch('changeCurrentUser', screenName);
  },

  changeTimeline(type, args) {
    this.dispatch('changeTimeline', {type: type, args: args});
    if(type === "user") {
      this.dispatch('displayUserTimeline', args.screen_name);
    }
  },

  searchTwitter(params = {}) {
    this.dispatch('searchTwitter', params.q)
    this.dispatch('changeTimeline', {type: "search", args: params});
  },

  tweetRetweet(id) {
    this.dispatch('retweetThis', id);
  },

  tweetRemove(id) {
    this.dispatch('removeThis', id);
  },

  tweetConversationShow(id) {
    this.dispatch('tweetConversationShow', id);
  },

  channelSearchClose(q) {
    this.dispatch('channelSearchClose', q)
  },

  channelUserTimelineClose(user) {
    this.dispatch('channelUserTimelineClose', user)
  },

  displayUserTimeline(user) {
    this.dispatch("displayUserTimeline", user);
  },

  updateStatus(status) {
    this.dispatch('updateStatus', status);
  },
};

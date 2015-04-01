import Fluxxor from "fluxxor";
import TwitterClient from "../lib/twitter_client.es6";
import _ from "lodash";

import Storage from '../lib/storage.es6';

export default Fluxxor.createStore({
  actions: {
    "changeCurrentUser": "changeCurrentUser",
    "displayUserTimeline": "append",
    "channelUserTimelineClose": "remove"
  },

  initialize(user) {
    this.setup(user);
  },

  setup(user) {
    this.user = user;
    this.userTimelines = JSON.parse(Storage.get(this.storageKey()) || '[]');
  },

  storageKey() {
    return `${this.user}--saved-user-timelines`;
  },

  getState() {
    return {
      userTimelines: this.userTimelines
    };
  },

  append(user) {
    if(!user) return;
    this.userTimelines = _.uniq(this.userTimelines.concat(user));
    this.persist();
    this.emit('change');
  },

  remove(user) {
    this.userTimelines = _.without(this.userTimelines, user);
    this.persist();
    this.emit('change');
  },

  persist(){
    Storage.set(this.storageKey(), JSON.stringify(this.userTimelines));
  },

  changeCurrentUser(user) {
    this.setup(user);
    this.emit('change');
  },
});

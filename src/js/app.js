import Fluxxor from "fluxxor";
import React from "react";

import Application from "./components/application.jsx";

import ContextMenuStore from "./stores/context_menu.es6";
import ModalWindowStore from "./stores/modal_window.es6";
import TwitterAccountStore from "./stores/twitter_account.es6";
import TimelineStore from "./stores/timeline.es6";
import ChannelListsStore from "./stores/channel_lists.es6";
import ChannelSearchesStore from "./stores/channel_searches.es6";
import ChannelUserTimelinesStore from "./stores/channel_user_timelines.es6";

import TwitterClient from "./lib/twitter_client.es6";

import actions from "./actions.es6";

// require('./oauth.js');

var acc = "uu59";
var stores = {
  contextmenu: new ContextMenuStore(),
  twitterAccount: new TwitterAccountStore(acc),
  channelList: new ChannelListsStore(),
  channelSearch: new ChannelSearchesStore(acc),
  channelUserTimelines: new ChannelUserTimelinesStore(acc),
  timeline: new TimelineStore(new TwitterClient(acc)),
  modalWindow: new ModalWindowStore()
};

var flux = new Fluxxor.Flux(stores, actions);

// Fix superagent urlencode
if(typeof global.encodeURIComponent === "function") {
  var _encodeURIComponent = global.encodeURIComponent;
  global.encodeURIComponent = function(str){
    return _encodeURIComponent(str)
        .replace(new RegExp("!", "g"), "%21")
        .replace(new RegExp("\\*", "g"), "%2A")
        .replace(new RegExp("'", "g"), "%27")
        .replace(new RegExp("\\(", "g"), "%28")
        .replace(new RegExp("\\)", "g"), "%29");
  };
}

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

React.render(<Application screenName={acc} flux={flux} />, document.body);

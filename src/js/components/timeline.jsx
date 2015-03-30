import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import Tweet from "./tweet.jsx";
import TweetForm from "./tweet_form.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('timeline'),
  ],

  getInitialState() {
    return { };
  },

  getStateFromFlux() {
    var store = this.getFlux().store('timeline');
    return store.getState();
  },

  render() {
    return <div className="timeline" onScroll={this.onScroll}>
      <TweetForm client={this.props.client} />
      <div className="timeline__tweets">
        {this.state.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      </div>
    </div>;
  },

  onScroll(ev) {
    if(this._fetching) return;
    var node = ev.currentTarget;
    var height = node.scrollHeight;
    var top = node.scrollTop;
    var pad = node.offsetHeight;
    if (height - top - pad < 100) {
      this._fetching = true;
      var lastTweet = this.state.tweets[this.state.tweets.length - 1];
      var maxIdParam = (lastTweet ? {max_id: lastTweet.id_str} : {});
      var store = this.getFlux().store('timeline');
      store.loadMore(maxIdParam).then(()=> {
        this._fetching = false;
      }.bind(this));
    }
  }
})

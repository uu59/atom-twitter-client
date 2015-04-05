import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import Tweet from "./tweet.jsx";
import TweetForm from "./tweet_form.jsx";
import Conversation from "./conversation.jsx";

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
    var className = this.state.loading ?  "timeline__tweets--loading" : "timeline__tweets";
    return <div className="timeline" onScroll={this.onScroll}>
      <TweetForm client={this.props.client} />
      <div className={className}>
        {
          this.state.tweets.map((tweet) => {
            var key = `tweet-${tweet.id_str}`;
            return <div>
              <Tweet key={key} tweet={tweet} />
            </div>
          })
        }
        {
          this.state.loading ?
            <i className="el el-refresh el-3x el-spin"></i> :
            ""
        }
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

import Fluxxor from "fluxxor";
import React from "react";
import TweetForm from "./tweet_form.jsx";
import Tweet from "./tweet_avoid_dirty.jsx";
import Dummy from "./dummy.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('conversation')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    var store = this.getFlux().store('conversation');
    return store.getState();
  },

  render() {
    var conversations = this.state.conversation || [
    ];
    console.log(conversations);
    return <div className="tweets">
      {
        conversations.map((tweet) => {
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
    </div>;
  }
})

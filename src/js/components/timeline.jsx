import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import Tweet from "./tweet.jsx";
import TweetForm from "./tweet_form.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
  ],

  getInitialState() {
    return {
      tweets: [],
    }
  },

  componentWillReceiveProps(nextProps) {
    this.fetchTimeline(nextProps).then((tweets) => {
      console.log(tweets[0]);
      this.setState({tweets: tweets});
    });
  },


  fetchTimeline(props, params = {}) {
    var client = props.client;
    console.log("fetchTimeline", client.user, props, props.type, props.args);
    switch(props.type){
      case "home":
        return client.homeTimeline(_.merge(params));
        break;
      case "list":
        // TODO
        return client.listStatuses(_.merge({list_id: props.args}, params));
        break;
      case "user":
        return client.userTimeline(_.merge({screen_name: props.args}, params));
        break;
    }
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
      this.fetchTimeline(this.props, maxIdParam).then((tweets) => {
        this._fetching = false;
        this.setState({tweets: this.state.tweets.concat(tweets)})
      }.bind(this));
    }
  }
})

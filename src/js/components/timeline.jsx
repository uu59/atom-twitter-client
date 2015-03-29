import Fluxxor from "fluxxor";
import React from "react";

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


  fetchTimeline(props) {
    var client = props.client;
    console.log("fetchTimeline", client.user, props);
    switch(props.type){
      case "home":
        return client.homeTimeline();
        break;
      case "list":
        // TODO
        return client.listStatuses({list_id: props.args});
        break;
    }
  },

  render() {
    return <div className="timeline">
      <p>timeline of {this.props.client.user}</p>
      <TweetForm client={this.props.client} />
      {this.state.tweets.map((tweet) => {
        return <Tweet key={tweet.id} tweet={tweet} />;
      })}
    </div>;
  }
})

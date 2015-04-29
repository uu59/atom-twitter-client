import Fluxxor from "fluxxor";
import React from "react";
import Timeline from "./timeline.jsx";
import TweetForm from "./tweet_form.jsx";
import UserHeader from "./user_header.jsx";
import TwitterClient from "../lib/twitter_client.es6";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('timeline')
  ],

  getInitialState() {
    return { };
  },

  getStateFromFlux() {
    var store = this.getFlux().store('timeline');
    return store.getState();
  },

  render() {
    console.log(this.state);
    return <div className="main">
      <TweetForm client={this.props.client} />
      {
        this.state.type === "user" ? <UserHeader key={this.state.args.screen_name} client={this.props.client} screenName={this.state.args.screen_name} /> : ""
      }
      <Timeline client={this.props.client} type={this.state.type} args={this.state.args} />
    </div>;
  }
})

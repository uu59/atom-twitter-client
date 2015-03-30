import Fluxxor from "fluxxor";
import React from "react";
import Timeline from "./timeline.jsx";
import TwitterClient from "../lib/twitter_client.es6";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterAccount')
  ],

  getInitialState() {
    return {
      type: "home",
    };
  },

  getStateFromFlux() {
    var store = this.getFlux().store('twitterAccount');
    return store.getState();
  },

  render() {
    return <div className="main">
      <Timeline client={this.state.client} type={this.state.type} args={this.state.args} />
    </div>;
  }
})

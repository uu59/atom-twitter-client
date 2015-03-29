import Fluxxor from "fluxxor";
import React from "react";
import Timeline from "./timeline.jsx";
import TwitterClient from "../lib/twitter_client.es6";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterAccount')
  ],

  getStateFromFlux() {
    var store = this.getFlux().store('twitterAccount');
    store.on('changeTimeline', ()=>{
      this.emit('change');
    });
    return store.getState();
  },

  render() {
    return <div className="main">
      <Timeline client={this.state.client} type={this.state.type} args={this.state.args} />
    </div>;
  }
})

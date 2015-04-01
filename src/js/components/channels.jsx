import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import ChannelsSearch from "./channels_search.jsx";
import ChannelsList from "./channels_list.jsx";
import ChannelsUserTimeline from "./channels_user_timeline.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('timeline'),
  ],

  getInitialState() {
    return { }
  },

  getStateFromFlux() {
    var state = this.getFlux().store('timeline');
    return {
      currentTimeline: {type: state.type, args: state.args},
    };
  },

  timelineClassName(type) {
    if(this.state.currentTimeline.type === type) {
      return "channel--current";
    }else{
      return "channel";
    }
  },

  render() {
    return <div className="channels">
      <section className="channels__fixed">
        <h1>Channels</h1>
        <p className={this.timelineClassName("home")} onClick={this.onClick.bind(this, "home", {})}>Home</p>
        <p className={this.timelineClassName("mentions")} onClick={this.onClickMentions.bind(this, "mentions", {})}>@{this.props.currentUser}</p>
        <p>DM(TODO)</p>
      </section>
      <ChannelsList currentTimeline={this.state.currentTimeline} currentUser={this.props.currentUser} />
      <ChannelsUserTimeline currentTimeline={this.state.currentTimeline} />
      <ChannelsSearch currentTimeline={this.state.currentTimeline} />
    </div>;
  },

  onClick(type, args, ev) {
    this.getFlux().actions.changeTimeline(type, args);
  },

  onClickMentions(ev) {
    this.getFlux().actions.changeTimeline("mentions");
  },

})


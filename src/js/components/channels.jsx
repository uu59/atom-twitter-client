import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import ChannelsSearch from "./channels_search.jsx";
import ChannelsList from "./channels_list.jsx";
import ChannelsUserTimeline from "./channels_user_timeline.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
  ],

  getInitialState() {
    return { }
  },

  render() {
    return <div className="channel">
      <section className="channel__fixed">
        <h1>Channels</h1>
        <p onClick={this.onClick.bind(this, "home", {})}>Home</p>
        <p onClick={this.onClickMentions.bind(this, "mentions", {})}>@{this.props.currentUser}</p>
        <p>DM(TODO)</p>
      </section>
      <ChannelsList currentUser={this.props.currentUser} />
      <ChannelsUserTimeline />
      <ChannelsSearch />
    </div>;
  },

  onClick(type, args, ev) {
    this.getFlux().actions.changeTimeline(type, args);
  },

  onClickMentions(ev) {
    this.getFlux().actions.changeTimeline("mentions");
  },

})


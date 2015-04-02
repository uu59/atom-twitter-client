import Fluxxor from "fluxxor";
import React from "react";

import MixinChannel from "./mixin_channel.es6";

export default React.createClass({
  mixins: [
    MixinChannel,
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('channelUserTimelines')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    return this.getFlux().store('channelUserTimelines').getState();
  },

  timelineClassName(screen_name) {
    if(this.props.currentTimeline.type === "user" && this.props.currentTimeline.args.screen_name === screen_name) {
      return "channel--current";
    } else {
      return "channel";
    }
  },

  render() {
    return <section className="channels__userTimelines" style={this.state.userTimelines.length === 0 ? {display: "none"} : {}}>
      <h1 onClick={this.toggleChannel}>Users<small>({this.state.userTimelines.length})</small></h1>
      <section style={this.channelStyle()}>
      {this.state.userTimelines.map((user) => {
        return <p key={user} className={this.timelineClassName(user)}>
          <span onClick={this.onClickName.bind(this, user)}>@{user}</span>
          <i className="el el-remove" onClick={this.onClickClose.bind(this, user)}></i>
        </p>;
      })}
      </section>
    </section>;
  },

  onClickName(user, ev) {
    this.getFlux().actions.changeTimeline("user", {screen_name: user});
  },

  onClickClose(user, ev) {
    this.getFlux().actions.channelUserTimelineClose(user);
  }
})


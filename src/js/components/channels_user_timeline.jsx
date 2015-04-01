import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('channelUserTimelines')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    return this.getFlux().store('channelUserTimelines').getState();
  },

  render() {
    return <section className="channel__userTimelines" style={this.state.userTimelines.length === 0 ? {display: "none"} : {}}>
      <h1>Users</h1>
      {this.state.userTimelines.map((user) => {
        return <p key={user}>
          <span onClick={this.onClickName.bind(this, user)}>@{user}</span>
          <i className="el el-remove" onClick={this.onClickClose.bind(this, user)}></i>
        </p>;
      })}
    </section>;
  },

  onClickName(user, ev) {
    this.getFlux().actions.changeTimeline("user", {screen_name: user});
  },

  onClickClose(user, ev) {
    this.getFlux().actions.channelUserTimelineClose(user);
  }
})


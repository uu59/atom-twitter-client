import React from "react";

export default {
  getInitialState() {
    return {opened: true};
  },

  componentDidMount() {
    this.opened = true;
  },

  toggleChannel(ev) {
    this.opened = !this.opened;
    this.setState({opened: this.opened})
  },

  channelStyle(){
    return {
      display: (this.state.opened ? "block" : "none")
    };
  }
};

import Fluxxor from "fluxxor";
import React from "react";
import Sidebar from "./sidebar.jsx";
import Channels from "./channels.jsx";
import Main from "./main.jsx";
import ContextMenu from "./context_menu.jsx";
import ModalWindow from "./modal_window.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterAccount'),
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    var store = this.getFlux().store('twitterAccount');
    return store.getState();
  },

  componentDidMount() {
    this.getFlux().actions.initialLoad(this.state.currentUser);
  },

  render() {
    return <div className="container" onClick={this.onClick}>
      <div className="container--sidebar">
        <Sidebar client={this.state.client} userNames={this.state.userNames} />
      </div>
      <div className="container--channels">
        <Channels currentUser={this.state.currentUser} />
      </div>
      <div className="container--main">
        <Main currentUser={this.state.currentUser} />
      </div>
      <ContextMenu />
      <ModalWindow />
    </div>;
  },

  onClick() {
    this.getFlux().actions.contextMenuClose();
  }
});

import Fluxxor from "fluxxor";
import React from "react";
import Sidebar from "./sidebar.jsx";
import Channels from "./channels.jsx";
import Main from "./main.jsx";
import ContextMenu from "./context_menu.jsx";
import ModalWindow from "./modal_window.jsx";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  getInitialState() {
    return {
      knownNames: ["aa808", "uu59"],
      lists: []
    }
  },

  store() {
    return this.getFlux().store('twitterAccount');
  },

  componentDidMount() {
    this.updateLists();
    this.store().on('change', ()=>{
      this.updateLists();
    });
  },

  updateLists() {
    this.store().client.lists().then((lists) => {
      this.setState({lists: lists});
    });
  },

  render() {
    return <div className="container" onClick={this.onClick}>
      <div className="container--sidebar">
        <Sidebar knownNames={this.state.knownNames} />
      </div>
      <div className="container--channels">
        <Channels lists={this.state.lists} screenName={this.props.screenName} />
      </div>
      <div className="container--main">
        <Main screenName={this.props.screenName} />
      </div>
      <ContextMenu />
      <ModalWindow />
    </div>;
  },

  onClick() {
    this.getFlux().actions.contextMenuClose();
  }
});

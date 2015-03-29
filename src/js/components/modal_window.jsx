import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('modalWindow')
  ],


  getStateFromFlux() {
    var store = this.getFlux().store('modalWindow');
    return store.getState();
  },

  componentDidMount() {
  },

  render() {
    return <div onClick={this.onClick} className="modalWindow" style={this.state.style}>
      <div className="modalWindow--content">{this.state.content}</div>
    </div>;
  },

  onClick(ev) {
    if(ev.target !== ev.currentTarget) return;
    this.getFlux().actions.hideModalWindow();
  }
});


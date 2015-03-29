import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  render() {
    return <div className="sidebar--account">
      <p onClick={this.onClick}>{this.props.screenName}</p>
    </div>;
  },

  onClick(ev) {
    this.getFlux().actions.changeCurrentUser(this.props.screenName);
  }
})


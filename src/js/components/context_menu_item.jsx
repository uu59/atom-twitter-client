import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  render() {
    return <li className="contextmenu--item" onClick={this.props.item.action}>
      {this.props.item.label}
    </li>;
  }
});


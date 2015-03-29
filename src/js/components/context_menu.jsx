import Fluxxor from "fluxxor";
import React from "react";
import ContextMenuItem from "./context_menu_item.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('contextmenu')
  ],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var ctx = flux.store("contextmenu").getState();
    return {
      style: {
        display: (ctx.display ? "block" : "none"),
        position: "absolute",
        top: ctx.pos.top,
        left: ctx.pos.left
      },
      items: ctx.items
    };
  },

  render() {
    return <ul className="contextmenu" style={this.state.style}>
      {this.state.items.map((item) => {
        return <ContextMenuItem item={item} />;
      })}
    </ul>;
  },
});

import Fluxxor from "fluxxor";
import React from "react";

import MixinChannel from "./mixin_channel.es6";

export default React.createClass({
  mixins: [
    MixinChannel,
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('channelList')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    return this.getFlux().store('channelList').getState();
  },

  render() {
    return <section className="channel__lists">
      <h1 onClick={this.toggleChannel}>Lists</h1>
      <section style={this.channelStyle()}>
        {this.state.lists.map((list) => {
          var slug = `@${this.props.currentUser}/${list.slug}`;
          return <p key={`list--${list.id}`} onClick={this.onClick.bind(this, {list_id: list.id})} data-type="list" data-slug={{id: list.id}}>{list.name}</p>
        })}
      </section>
    </section>;
  },

  onClick(args, ev) {
    this.getFlux().actions.changeTimeline("list", args);
  },
})


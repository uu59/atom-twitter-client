import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterLists')
  ],

  store() {
    return this.getFlux().store('twitterLists');
  },

  getStateFromFlux() {
    return this.store().getState();
  },

  render() {
    return <div className="channel">
      <div className="channel--fixed">
        <h1>ch</h1>
        <p onClick={this.onClick.bind(this, "home", {})} data-type="home">Home</p>
      </div>
      <div className="channel--lists">
        <h1>lists</h1>
        {this.state.lists.map((list) => {
          var slug = `@${this.props.currentUser}/${list.slug}`;
          return <p key={list.id} onClick={this.onClick.bind(this, "list", {list_id: list.id})} data-type="list" data-slug={{id: list.id}}>{list.name}</p>
        })}
      </div>
    </div>;
  },

  onClick(type, args, ev) {
    this.getFlux().actions.changeTimeline(type, args);
  }
})


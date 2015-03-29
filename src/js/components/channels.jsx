import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterAccount')
  ],

  store() {
    return this.getFlux().store('twitterAccount');
  },

  getStateFromFlux() {
    return {
      lists: []
    }
  },

  render() {
    return <div className="channel">
      <div className="channel--fixed">
        <h1>ch</h1>
        <p onClick={this.onClick} data-type="home">Home</p>
      </div>
      <div className="channel--lists">
        <h1>lists</h1>
        {this.props.lists.map((list) => {
          var slug = `@${this.props.screenName}/${list.slug}`;
          return <p onClick={this.onClick} data-type="list" data-slug={list.id}>{list.name}</p>
        })}
      </div>
    </div>;
  },

  onClick(ev) {
    var node = ev.currentTarget;
    var type = node.getAttribute('data-type');
    var args = node.getAttribute('data-slug');
    this.getFlux().actions.changeTimeline(type, args);
  }
})


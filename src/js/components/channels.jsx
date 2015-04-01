import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

import ChannelsSearch from "./channels_search.jsx";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterLists')
  ],

  getInitialState() {
    return {
      searches: []
    }
  },

  getStateFromFlux() {
    return this.getFlux().store('twitterLists').getState();
  },

  render() {
    return <div className="channel">
      <section className="channel__fixed">
        <h1>Channels</h1>
        <p onClick={this.onClick.bind(this, "home", {})}>Home</p>
        <p onClick={this.onClickMentions.bind(this, "mentions", {})}>@{this.props.currentUser}</p>
        <p>DM(TODO)</p>
      </section>
      <ChannelsSearch />
      <section className="channel__lists">
        <h1>Lists</h1>
        {this.state.lists.map((list) => {
          var slug = `@${this.props.currentUser}/${list.slug}`;
          return <p key={list.id} onClick={this.onClick.bind(this, "list", {list_id: list.id})} data-type="list" data-slug={{id: list.id}}>{list.name}</p>
        })}
      </section>
    </div>;
  },

  onClick(type, args, ev) {
    this.getFlux().actions.changeTimeline(type, args);
  },

  onClickMentions(ev) {
    this.getFlux().actions.changeTimeline("mentions");
  },

  onSubmitSearch(ev) {
    ev.preventDefault();
    var form = ev.currentTarget;
    this.doSearch(form.q.value);
  },

  onClickSearchClose(q, ev) {
    console.log(arguments);
    this.setState({
      searches: _.remove(this.state.searches, q)
    });
  },

  doSearch(q) {
    this.getFlux().actions.searchTwitter({q: q});
    this.setState({
      searches: _.uniq(this.state.searches.concat(q))
    });
  },
})


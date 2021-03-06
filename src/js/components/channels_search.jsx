import Fluxxor from "fluxxor";
import React from "react";

import MixinChannel from "./mixin_channel.es6";

export default React.createClass({
  mixins: [
    MixinChannel,
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('channelSearch')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    return this.getFlux().store('channelSearch').getState();
  },

  timelineClassName(q) {
    if(this.props.currentTimeline.type === "search" && this.props.currentTimeline.args.q === q) {
      return "channel--current";
    } else {
      return "channel";
    }
  },

  render() {
    return <section className="channels__searches">
      <h1 onClick={this.toggleChannel}>Search<small>({this.state.searches.length})</small></h1>
      <section style={this.channelStyle()}>
        <form onSubmit={this.onSubmitSearch}>
          <input type="text" name="q" />
        </form>
        {this.state.searches.map((q) => {
          return <p key={`search--${q}`} className={this.timelineClassName(q)}>
            <span onClick={this.doSearch.bind(this, q)}>{q}</span>
            <i className="el el-remove" onClick={this.onClickSearchClose.bind(this, q)}></i>
          </p>
        })}
      </section>
    </section>;
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
    this.getFlux().actions.channelSearchClose(q);
  },

  doSearch(q) {
    this.getFlux().actions.searchTwitter({q: q});
  },
})


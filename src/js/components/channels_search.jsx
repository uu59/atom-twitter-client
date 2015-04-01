import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('channelSearch')
  ],

  getInitialState() {
    return {};
  },

  getStateFromFlux() {
    return this.getFlux().store('channelSearch').getState();
  },

  render() {
    console.log("a", this.state);
    return <section className="channel__searches">
      <h1>Search</h1>
      <form onSubmit={this.onSubmitSearch}>
        <input type="text" name="q" />
      </form>
      {this.state.searches.map((q) => {
        return <p key={q}>
          <span onClick={this.doSearch.bind(this, q)}>{q}</span>
          <i className="el el-remove" onClick={this.onClickSearchClose.bind(this, q)}></i>
        </p>
      })}
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
    console.log(arguments);
    this.getFlux().actions.channelSearchClose(q);
  },

  doSearch(q) {
    this.getFlux().actions.searchTwitter({q: q});
  },
})


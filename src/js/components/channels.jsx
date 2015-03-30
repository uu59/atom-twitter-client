import Fluxxor from "fluxxor";
import React from "react";
import _ from "lodash";

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
        <h1>ch</h1>
        <p onClick={this.onClick.bind(this, "home", {})} data-type="home">Home</p>
      </section>
      <section className="channel__searches">
        <h1>search</h1>
        <form onSubmit={this.onSubmitSearch}>
          <input type="text" name="q" />
        </form>
        {this.state.searches.map((q) => {
          return <p key={q}>
            <span onClick={this.doSearch.bind(this, q)}>{q}</span>
            <i className="el el-remove" onClick={this.onClickSearchClose.bind(this, q)}></i>
          </p>
        })}
      </section>
      <section className="channel__lists">
        <h1>lists</h1>
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


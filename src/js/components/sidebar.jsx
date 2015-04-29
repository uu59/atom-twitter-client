import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  render() {
    var currentUser = this.props.client.user;
    return <div className="sidebar">
      {this.props.userNames.map( (n) =>{
        var className = (n === currentUser ? "sidebar__account--current" : "sidebar__account");
        return <p className={className} key={n} onClick={this.onClickName} data-screen-name={n}>
          <img width="32px" height="32px" src={`http://twiticon.herokuapp.com/${n}`} alt={n} title={n} />
        </p>;
      })}
      <p className="sidebar__plus">
        <i className="el el-plus" onClick={this.onClickPlus} />
      </p>
    </div>;
  },

  onClickName(ev) {
    var name = ev.currentTarget.getAttribute('data-screen-name')
    this.getFlux().actions.changeCurrentUser(name);
  },

  onClickPlus(ev) {
    var client = this.props.client;
    var flux = this.getFlux();
    client.authenticateUrl().then((result) => {
      window.open(result.url);
      var onSubmit = function(ev) {
        ev.preventDefault();
        client.authenticate(ev.currentTarget.pin.value, result.params).then((params) => {
          flux.actions.registerAccountTokens(params);
        });
      }
      flux.actions.modalWindow.open(
        <form flux={flux} onSubmit={onSubmit}>
          <input type="text" name="pin" />
        </form>
      );
    });
  }
})

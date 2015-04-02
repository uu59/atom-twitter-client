import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  render() {
    return <div className="sidebar">
      {this.props.userNames.map( (n) =>{
        return <p className="sidebar__account" key={n} onClick={this.onClickName} data-screen-name={n}>
          <img src={`http://twiticon.herokuapp.com/${n}`} alt={n} title={n} />
        </p>;
      })}
      <p className="sidebar__plus" onClick={this.onClickPlus}>
        <i className="el el-plus" />
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
      flux.actions.displayModalWindow(
        <form flux={flux} onSubmit={onSubmit}>
          <input type="text" name="pin" />
        </form>
      );
    });
  }
})

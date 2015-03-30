import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  render() {
    return <div className="sidebar">
      {this.props.userNames.map( (n) =>{
        return <p key={n} onClick={this.onClickName} data-screen-name={n}>
          <img src={`http://twiticon.herokuapp.com/${n}`} alt={n} title={n} />
        </p>;
      })}
    </div>;
  },

  onClickName(ev) {
    var name = ev.currentTarget.getAttribute('data-screen-name')
    this.getFlux().actions.changeCurrentUser(name);
  }
})

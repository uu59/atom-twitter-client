import Fluxxor from "fluxxor";
import React from "react";

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
  ],

  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    var n = this.props.screenName;
    return <div className="userHeader">
      <img className="userHeader__image" width="32" height="32" src={`http://twiticon.herokuapp.com/${n}`} alt={n} title={n} />
      <p>
        {this.props.screenName}
        WIP: follow/unfollow, etc
      </p>
    </div>;
  }
})

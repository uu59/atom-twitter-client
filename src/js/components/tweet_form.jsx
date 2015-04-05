import Fluxxor from "fluxxor";
import React from "react";

import * as foo from "./tweet.jsx";
var Tweet = foo.factory();

export default React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('twitterAccount')
  ],

  getStateFromFlux() {
    var store = this.getFlux().store('twitterAccount');
    return {
      textCount: 0,
      client: store.getState().client,
      status: (this.props.replyTo ? `@${this.props.replyTo.user.screen_name} ` : "")
    };
  },

  render() {
    var replyTo = this.props.replyTo;
    return <form className="postform" onSubmit={this.onSubmit}>
      {replyTo ? <Tweet key={`form-${replyTo.id_str}`} tweet={replyTo} /> : ""}
      <textarea placeholder={`Post from @${this.state.client.user}`} type="text" name="status" onKeyUp={this.onTextChange} defaultValue={this.state.status} />
      <p>
        <input type="hidden" name="inReplyTo" value={replyTo && replyTo.id_str} />
        <input type="submit" value="post" />
        {this.state.textCount} / 140
      </p>
    </form>;
  },

  onSubmit(ev) {
    ev.preventDefault();
    var form = ev.target;
    form.status.disabled = true;
    var payload = {
      status: form.status.value,
      in_reply_to_status_id: form.inReplyTo.value
    };
    this.state.client.updateStatus(payload).then(()=> {
      form.status.disabled = false;
      form.status.value = "";
      this.setState({textCount: 0});
    });
  },

  onTextChange(ev) {
    this.setState({
      textCount: ev.currentTarget.value.length
    });
  },
})



import Fluxxor from "fluxxor";
import React from "react";
import strftime from "strftime";

var clipboard = global.clipboard || {}
import ContextMenu from "../lib/context_menu.es6";
import TweetForm from "./tweet_form.jsx";

export default React.createClass({
  mixins: [Fluxxor.FluxMixin(React)],

  markupBody(tweet) {
    var html = `<span>${tweet.text}</span>`;
    //return virtualize.fromHTML(text.replace(/https?:\/\/[^ ]*/g, '<a href="\1">\1</a>'));
    var re = new RegExp('(https?://[^ ]*)',"g");
    tweet.entities.urls.forEach( (url) => {
      html = html.replace(url.url, `<a target="_blank" href="${url.expanded_url || url.url}">${url.expanded_url || url.url}</a>`);
    });
    (tweet.entities.media || []).forEach( (url) => {
      html = html.replace(url.url, `<a target="_blank" href="${url.media_url_https}">${url.expanded_url || url.url}</a>`);
    });
    (tweet.entities.hashtags || []).forEach( (tag) => {
      var hashtag = `#${tag.text}`
      html = html.replace(hashtag, `<a target="_blank" href="https://twitter.com/search?q=${encodeURIComponent(hashtag)}">${hashtag}</a>`);
    });
    (tweet.entities.user_mentions || []).forEach( (mention) => {
      var m = `@${mention.screen_name}`
      html = html.replace(m, `<a target="_blank" href="https://twitter.com/${mention.screen_name}">${m}</a>`);
    });
    html = html.replace(new RegExp("\n","g"), '<br />');
    return html;
  },

  renderRetweet(tweet) {
    return <div className="tweet__retweet">
      <img src={tweet.user.profile_image_url} />
      <small>
        <strong>RT by {tweet.user.screen_name}</strong>
        <em>({strftime("%F %T", new Date(tweet.created_at))})</em>
      </small>
    </div>
  },

  onContextmenu(ev, tweet) {
    // select(ev.currentTarget);
    this.getFlux().actions.contextMenuOpen({
      pos: {
        left: `${ev.pageX}px`,
        top: `${ev.pageY}px`
      },
      items: [
        {label: "リプライ", action: (ev) => this.itemReplyTo(tweet) },
        {label: "RT", action: (ev) => this.itemRetweet(tweet) },
        {label: "本文をコピー", action: (ev) => this.itemCopyText(tweet) },
        {label: "ツイートURLをコピー", action: (ev) => this.itemCopyUrl(tweet) },
        {label: `@${tweet.user.screen_name}`, action: (ev) => this.itemUserInfo(tweet) },
        {label: "会話を表示", action: (ev) => this.itemConversation(tweet) },
      ]
    });
  },

  onSelect(ev) {
    // select(ev.currentTarget)
  },

  itemCopyText(tweet) {
    console.log('item copy text', tweet.text);
    clipboard.writeText(tweet.text);
  },

  itemCopyUrl(tweet) {
    if (tweet.retweeted_status) {
      var url = `https://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`;
    }else{
      var url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    }
    console.log('item copy url', url);
    clipboard.writeText(url);
  },

  itemReplyTo(tweet) {
    this.getFlux().actions.displayModalWindow(<TweetForm flux={this.getFlux()} replyTo={tweet} />);
  },

  itemRetweet(tweet) {
  },

  itemConversation(tweet) {
    console.log(tweet.id_str);
  },

  itemUserInfo(tweet) {
    console.log('itemUserInfo clicked');
  },

  render() {
    var tweet = this.props.tweet;
    var mainTweet = tweet.retweeted_status || tweet;
    var body = this.markupBody(mainTweet);
    var onContext = (ev) => {
      this.onContextmenu(ev, tweet);
    };
    var protectedIcon = (tweet.user.protected ? <i className="tweet__protectedIcon el el-lock" /> : "");
    var url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    return <div className="tweet" onContextMenu={onContext}>
      <div className="tweet__userimage">
        <img src={mainTweet.user.profile_image_url} />
      </div>
      <div className="tweetBody">
        <p className="tweetBody__head">
          {protectedIcon}
          <a href={`https://twitter.com/${mainTweet.user.screen_name}`}>
            <strong className="tweetBody__screenName">{mainTweet.user.screen_name}</strong>
          </a>
          <small className="tweetBody__userName">{mainTweet.user.name}</small>
          <a href={url} className="tweetBody__timestamp">{strftime("%F %T", new Date(mainTweet.created_at))}</a>
        </p>
        <p className="tweetBody__body" dangerouslySetInnerHTML={{__html: body}}>
        </p>
        <span dangerouslySetInnerHTML={{__html: mainTweet.source.replace("<a", '<a target="blank"')}} />
        {tweet.retweeted_status ? this.renderRetweet(tweet) : ""}
      </div>
    </div>;
  }
})


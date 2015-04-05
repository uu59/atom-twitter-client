import _ from "lodash";
import Promise from 'bluebird';
import Qs from "qs";
import superagent from "superagent";
import oauth from './oauth.es6';
import Storage from './storage.es6';

export default class TwitterClient {
  constructor(user) {
    this.user = user;
    this.token = JSON.parse(Storage.get(`token--${user}`));
    this.endpoint = "https://api.twitter.com/1.1";
  }

  request(path, method, params = {}) {
    var url = this.endpoint + path;
    var commonHeader = {
    }
    var req = {
      url: url,
      method: method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: params
    };
    var form = oauth.authorize(req, this.token.access);
    var req = superagent[method.toLowerCase()](url)
      .set(req.headers)
      .set(oauth.toHeader(form))
      ;
    if(method === "GET" || method === "HEAD") {
      req.query(params);
    } else {
      req.send(form);
      console.log(form);
    }

    return new Promise(function(resolve, reject) {
      req.end((err, response)=> {
        if(err) {
          reject(err, response);
        } else {
          resolve(response.body, response);
        }
      });
    });
  }

  authenticateUrl() {
    return new Promise(function(resolve, reject){
      var req = {
        url: "https://api.twitter.com/oauth/request_token",
        method: "POST"
      };
      var a = oauth.authorize(req);
      superagent[req.method.toLowerCase()](req.url)
        .set(oauth.toHeader(a))
        .end(function(err, response){
          if(err) {
            reject(err, response);
          } else {
            var params = Qs.parse(response.text);
            var url = "https://api.twitter.com/oauth/authorize?oauth_token=" + params.oauth_token;
            resolve({url: url, params: params, resolve: response});
          }
        });
    });
  }

  authenticate(pin, params){
    return new Promise(function(resolve, reject){
      var req = {
        url: "https://api.twitter.com/oauth/access_token",
        method: "POST",
        data: {
          oauth_verifier: pin
        }
      };
      var a = oauth.authorize(req, {public: params.oauth_token, secret: params.oauth_token_secret});
      superagent[req.method.toLowerCase()](req.url, a)
        .set(oauth.toHeader(a))
        .end(function(err, response){
          if(err) {
            reject(err, response);
          } else {
            var params = Qs.parse(response.text);
            var tokens = {
              consumer: oauth.consumer,
              access: {
                public: params.oauth_token,
                secret: params.oauth_token_secret
              }
            };
            resolve({tokens: tokens, screenName: params.screen_name});
          }
        });
    });

  }

  rateLimit() {
    return this.request("/application/rate_limit_status.json", "GET");
  }

  homeTimeline(params = {}) {
    var defaultParams = { count: 100, include_entities: "true" };
    return this.request("/statuses/home_timeline.json", "GET", _.merge(defaultParams, params));
  }

  mentions(params = {}) {
    var defaultParams = { count: 100, include_entities: "true" };
    return this.request("/statuses/mentions_timeline.json", "GET", _.merge(defaultParams, params));
  }

  updateStatus(params = {}){
    return this.request("/statuses/update.json", "POST", params);
  }

  listStatuses(params = {}){
    var defaultParams = { count: 100, include_entities: "true", include_rts: "true" };
    return this.request("/lists/statuses.json", "GET", _.merge(defaultParams, params));
  }

  lists(params = {}){
    return this.request("/lists/list.json", "GET", params);
    // dummy value for rate limited
    // var u = this.user;
    // return new Promise(function(r){
    //   r([{id: u, slug: u, name: u}]);
    // });
  }

  search(params = {}){
    return this.searchRaw(params).then((result) => {
      return result.statuses;
    });
  }

  searchRaw(params = {}) {
    var defaultParams = {result_type: "recent", count: 100, include_entities: "true"}
    return this.request("/search/tweets.json", "GET", _.merge(defaultParams, params));
  }

  retweet(id) {
    return this.request(`/statuses/retweet/${id}.json`, "POST");
  }

  userTimeline(params = {}){
    var defaultParams = { count: 100, include_entities: "true", include_rts: "true" };
    return this.request("/statuses/user_timeline.json", "GET", _.merge(defaultParams, params));
  }

  destroy(id) {
    return this.request(`/statuses/destroy/${id}.json`, "POST");
  }

  // undocumented
  conversations(params = {}) {
    var defaultParams = { count: 100, include_entities: "true"};
    console.log(_.merge(defaultParams, params));
    return this.request("/conversation/show.json", "GET", _.merge(defaultParams, params));
  }
}

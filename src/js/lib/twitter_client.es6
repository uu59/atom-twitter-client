import _ from "lodash";
import Promise from 'bluebird';
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

  rateLimit() {
    return this.request("/application/rate_limit_status.json", "GET");
  }

  homeTimeline(params = {}) {
    var defaultParams = { count: 100, include_entities: "true" };
    return this.request("/statuses/home_timeline.json", "GET", _.merge(defaultParams, params));
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
    return this.request("/search/tweets.json", "GET", params);
  }

  retweet(id) {
    return this.request(`/statuses/retweet/${id}.json`, "POST");
  }

  userTimeline(params = {}){
    var defaultParams = { count: 100, include_entities: "true", include_rts: "true" };
    return this.request("/statuses/user_timeline.json", "GET", _.merge(defaultParams, params));
  }
}

var consumerKey = {
  public:  "3nVuSoBZnx6U4vzUxf5w", 
  secret:  "Bcs59EFbbsdF6Sl9Ng71smgStWEGwXXKSjYvPVt7qys"
};
var consumerKey = {
  public:  "yN3DUNVO0Me63IAQdhTfCA", 
  secret:  "c768oTKdzAjIYCmpSNIdZbGaG0t6rOhSFQP0S5uC79g"
};

var oauth = require('./lib/oauth.es6');

var request_data = {
  url: "https://api.twitter.com/oauth/request_token",
  method: "POST"
};

var Qs = require("qs");
var request = require("browser-request");
    var a = oauth.authorize(request_data)
  console.log(a);
  console.log(oauth.toHeader(a));
  request({
    url: request_data.url,
    method: request_data.method,
    form: a
  }, function(err, resp, body){
    var params = Qs.parse(body);
    window.open("https://api.twitter.com/oauth/authorize?oauth_token=" + params.oauth_token);
    var pin;
    debugger;
    var data = {
      url: 'https://api.twitter.com/oauth/access_token',
      method: "POST",
      data: {
        oauth_verifier: pin
      }
    };
    console.log(params);
    console.log({public: params.oauth_token, secret: params.oauth_token_secret});
    request({
      url: data.url,
      method: data.method,
      form: oauth.authorize(data, {public: params.oauth_token, secret: params.oauth_token_secret})
    }, function(err, _, body2){
      var params = Qs.parse(body2);
      console.log(arguments);
      console.log(params);
      var token = {
        consumer: consumerKey,
        access: {
          public: params.oauth_token,
          secret: params.oauth_token_secret
        },
      }
      localStorage.setItem('token--uu59', JSON.stringify(token));
      debugger;
    });
  });


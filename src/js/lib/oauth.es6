// var consumerKey = {
//   public:  "3nVuSoBZnx6U4vzUxf5w", 
//   secret:  "Bcs59EFbbsdF6Sl9Ng71smgStWEGwXXKSjYvPVt7qys"
// };
var consumerKey = {
  public:  "yN3DUNVO0Me63IAQdhTfCA", 
  secret:  "c768oTKdzAjIYCmpSNIdZbGaG0t6rOhSFQP0S5uC79g"
};

var OAuth = require('oauth-1.0a');
var oauth = OAuth({
    consumer: consumerKey,
    version: "1.0",
    signature_method: 'HMAC-SHA1'
});

module.exports = oauth;


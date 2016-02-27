module.exports = function($http) {

  var User = {};

  /**
   * @namespace User
   * @desc Filter users based on first character in their name
   * @memberOf Factories.User
   */
  User.filter = function(character, cb) {
    if(!character) {
      return false;
    }

    var params = {
      filter: character
    };

    $http.get('/users/', { params: params })
    .then(function(res) {
      cb(res.data)
    }, function(res) {
      cb()
    });
  };

  /**
   * @namespace User
   * @desc Tap a user
   * @memberOf Factories.User
   */
  User.tap = function(userId, cb) {
    var url = '/users/' + userId + '/tap/'

    $http.post(url)
    .then(function(res) {
      cb(res.data)
    }, function(res) {
      cb()
    });
  };

  /**
   * @namespace User
   * @desc Untap a user
   * @memberOf Factories.User
   */
  User.untap = function(userId, passphrase, cb) {
    var url = '/users/' + userId + '/untap/';
    console.log(url);

    var data = $.param({
      passphrase: passphrase
    })

    $http({
      method: 'POST',
      url: url,
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(function(res) {
      cb(res.data)
    }, function() {
      cb()
    });
  }

  return User;
}

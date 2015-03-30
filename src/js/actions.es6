export default {
  initialLoad(initialAccount) {
    this.dispatch('changeCurrentUser', initialAccount);
  },

  contextMenuSet: function(items) {
    this.dispatch('contextMenuSet', items);
  },

  contextMenuOpen: function(data) {
    this.dispatch('contextMenuOpen', data);
  },

  contextMenuClose: function() {
    this.dispatch('contextMenuSet', {display: false});
  },

  changeCurrentUser(screenName) {
    this.dispatch('changeCurrentUser', screenName);
  },

  changeTimeline(type, args) {
    this.dispatch('changeTimeline', {type: type, args: args});
  },

  updateStatus(status) {
    this.dispatch('updateStatus', status);
  },

  displayModalWindow(content) {
    this.dispatch('displayModalWindow', content);
  },

  hideModalWindow() {
    this.dispatch('hideModalWindow');
  }
};

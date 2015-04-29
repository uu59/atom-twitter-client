import Fluxxor from "fluxxor";

export default Fluxxor.createStore({
  actions: {
    "contextMenuClose": "onMenuClose",
    "contextMenuOpen": "onMenuOpen"
  },

  initialize() {
    this.display = false;
    this.items = [];
    this.pos = {
      top: 0,
      left: 0
    }
  },

  getState() {
    return {
      items: this.items,
      pos: this.pos,
      display: this.display
    };
  },

  onMenuClose() {
    this.display = false;
    this.emit('change');
  },

  onMenuOpen(data) {
    this.pos = data.pos;
    this.items = data.items;
    this.display = true;
    this.emit('change');
  }
});

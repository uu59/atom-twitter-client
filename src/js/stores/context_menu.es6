import Fluxxor from "fluxxor";

export default Fluxxor.createStore({
  actions: {
    "contextMenuSet": "onContextMenuSet",
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

  onContextMenuSet(state) {
    this.display = false;
    Object.keys(state).forEach((key) => {
      this[key] = state[key];
    })
    this.emit('change');
  },

  onChangeContextMenuItem(items) {
    this.items = items;
    this.emit('change');
  },

  onMenuOpen(data) {
    this.pos = data.pos;
    this.items = data.items;
    this.display = true;
    this.emit('change');
  }
});

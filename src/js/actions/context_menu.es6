export default {
  contextMenu: {
    open(data) {
      this.dispatch('contextMenuOpen', data)
    },
    close() {
      this.dispatch('contextMenuClose', {display: false})
    }
  },
}



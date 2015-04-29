export default {
  open(data) {
    this.dispatch('contextMenuOpen', data)
  },
  close() {
    this.dispatch('contextMenuClose', {display: false})
  }
}



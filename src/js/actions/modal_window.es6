export default {
  open(content) {
    this.dispatch('displayModalWindow', content);
  },
  close() {
    this.dispatch('hideModalWindow');
  }
}




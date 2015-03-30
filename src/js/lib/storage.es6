var data = {};

var storage = localStorage || {
  setItem: (key, value) => { data[key] = value },
  getItem: (key) => { return data[key] },
  removeItem: (key) => { data[key] = null },
  clear: ()=> { data = {} },
};

import EventEmitter from 'events';

class Storage extends EventEmitter {
  set(key, value) {
    var oldValue = this.get(key);
    if(oldValue === value) return;
    storage.setItem(key, value);
    this.emit("update", key, value, oldValue);
  }

  get(key) {
    return storage.getItem(key);
  }

  users() {
    return JSON.parse(this.get('users'));
  }
}

var instance = new Storage;

module.exports = instance;


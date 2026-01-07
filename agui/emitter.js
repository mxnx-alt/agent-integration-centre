const listeners = [];

function emit(event) {
  listeners.forEach((listener) => listener(event));
}

function subscribe(listener) {
  listeners.push(listener);
}

module.exports = { emit, subscribe };


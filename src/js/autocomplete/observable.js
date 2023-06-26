class Observable {
  constructor() {
    this.observerCallbacks = [];
  }

  subscribe(observerCallback) {
    this.observerCallbacks.push(observerCallback);
  }

  unsubscribe(observerCallback) {
    this.observerCallbacks = this.observers.filter((obs) => obs !== observerCallback);
  }

  notify(event, data) {
    this.observerCallbacks.forEach((observerCallback) => observerCallback(event, data));
  }
}

export default Observable;

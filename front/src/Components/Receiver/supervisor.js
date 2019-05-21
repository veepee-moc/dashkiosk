let maxDelay = 5000;          
  // maximum delay between two probes

// Extract timeout from location hash
let timeoutFromLocationHash = () => {
  var timeouts = window.location.hash.slice(1).split(/[,#]/)
    .map(function (item) {
      var mo = /^timeout=(\d+)$/.exec(item);
      if (!mo) {
        return null;
      }
      return parseInt(mo[1], 10);
    })
    .filter(function (item) { return item !== null; });
  if (timeouts.length === 0) {
    return undefined;
  }
  return timeouts[0];
}

let lastTimeout = null;

let ready = () => {
  // Tell through a message
  console.debug('[Dashkiosk] send heartbeat to supervisor');
  if (window.parent && window.parent.postMessage) {
    window.parent.postMessage('ready', '*');
  }
  // Tell through a JSInterface
  if (window.JSInterface && window.JSInterface.ready) {
    window.JSInterface.ready();
  }
  // Heartbeat
  var timeout;
  if (window.JSInterface && window.JSInterface.timeout) {
    timeout = window.JSInterface.timeout();
  }
  timeout = timeout || timeoutFromLocationHash();
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  if (timeout) {
    var delay = Math.min(timeout * 0.3, maxDelay);
    lastTimeout = window.setTimeout(ready, delay);
  }
};

let exp = {
  ready: ready,
};

export default exp;

let IframeQueue = require('./iframe-queue'),
  queue = new IframeQueue({
    ready: function () {
      document.querySelector('#loading').classList.remove('show');
    }
  });

/* Display connecting symbol */
let connecting = () => {
  document.querySelector('.connecting').classList.add('show');
  console.log(document.querySelector('.connecting').classList);
}

let connected = () => {
  document.querySelector('.connecting').classList.remove('show');
}

/* Display the given dashboard */
let dashboard = (d) => {
  // Check URL validity
  if (typeof d.url !== 'string') {
    console.warn('[Dashkiosk] received an URL without target: ' + d.url);
    return;
  }
  // Push it
  queue.push(d);
}

let exp = {
  connecting: connecting,
  connected: connected,
  dashboard: dashboard,
};

export default exp;
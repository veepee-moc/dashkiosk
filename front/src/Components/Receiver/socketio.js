import io from 'socket.io-client';
import localStorage from './localstorage';

export default function (receiver) {

  var socket = io.connect('/displays', {
    'reconnection limit': 60 * 1000,
    'max reconnection attempts': Infinity
  });

  socket.on('connect', function () {
    console.info('[Dashkiosk] connected to socket.io server');
    receiver.props.setStoreState({
      receiverConnected: true,
      connectionLost: false
    });
    // We register by providing a blob the server handed us to
    // remember us. If we get null, that's fine, the server will see
    // us as a new fresh screen.
    var blob = localStorage.getItem('register') || null;
    socket.emit('register', {
      blob: blob
    }, function (data) {
      console.info('[Dashkiosk] registered to server');
      localStorage.setItem('register', data);
    });
  });

  // Log various events
  socket.on('connecting', function () {
    console.info('[Dashkiosk] connect in progress to socket.io server');
    receiver.props.setStoreState({
      connectionLost: true,
    });
  });

  socket.on('connect_failed', function () {
    console.warn('[Dashkiosk] unable to connect to socket.io server');
    receiver.props.setStoreState({
      receiverConnected: false,
    });
  });

  socket.on('error', function (message) {
    console.warn('[Dashkiosk] uncaught error with socket.io server: ' + message);
    receiver.props.setStoreState({
      connectionLost: true,
    });
  });

  socket.on('reconnecting', function (delay, attempts) {
    console.info('[Dashkiosk] reconnect in progress to socket.io server (next: ' +
      delay + ' attempts: ' + attempts + ')');
    receiver.props.setStoreState({
      connectionLost: true
    });
  });

  socket.on('reconnect_failed', function () {
    console.warn('[Dashkiosk] unable to reconnect to socket.io server');
    receiver.props.setStoreState({
      receiverConnected: false
    });
  });

  socket.on('disconnect', function () {
    console.warn('[Dashkiosk] connection to socket.io lost');
    receiver.props.setStoreState({
      connectionLost: true
    });
  });

  socket.on('dashboard', function (dashboard) {
    console.info('[Dashkiosk] should display dashboard ' + dashboard.url);
    receiver.props.setStoreState({
      dashboardToDisplay: dashboard
    });
  });

  socket.on('reload', function () {
    console.info('[Dashkiosk] reload requested');
    receiver.props.setStoreState({
      reloadRequired: true
    });
  });

  socket.on('osd', function (text) {
    if (text === undefined || text === null) {
      console.info('[Dashkiosk] hide OSD');
      receiver.props.setStoreState({
        osd: ''
      });
    } else {
      console.info('[Dashkiosk] display OSD');
      receiver.props.setStoreState({
        osd: text
      });
    }
  });

  socket.on('viewport', function (vp) {
    console.info('[Dashkiosk] viewport change to ' + (vp || 'default') + ' requested');
    receiver.props.setStoreState({
      displayViewport: vp
    });
  });

  socket.on('settings', function (config) {
    console.info('[Dashkiosk] settings updated');
    receiver.props.setStoreState({
      settings:config
    });
  });

  return socket;
}

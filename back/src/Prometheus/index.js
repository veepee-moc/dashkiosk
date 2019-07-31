const Prometheus = require('prom-client');
const EventEmitter = require('../EventEmitter');
const { Types } = require('../Redux/Actions');
const register = Prometheus.register;
//const metricsInterval = Prometheus.collectDefaultMetrics();

const displayStatus = new Prometheus.Gauge({
    name: 'display_status',
    help: 'Metrics is at 0 if display is disconnected',
    labelNames: ['display', 'description', 'ip']
})

const setDisplayStatus = (display, connected) => {
    displayStatus.set({ display: display.name, description: display.description || null, ip: display.ip }, connected, Date.now())
}

const metrics = (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(Prometheus.register.metrics())
}

EventEmitter.on(Types.DeleteDisplay, (prevState, state, payload) => {
    regenMetrics(state);
});

EventEmitter.on(Types.LoadModel, (prevState, state, payload) => {
    regenMetrics(state);
});

const regenMetrics = (state) => {
    register.resetMetrics();
    const { Displays } = state.Data;
    for (const display of Displays) {
        if (display.connected)
            setDisplayStatus(display, 1);
        else
            setDisplayStatus(display, 0);
    }
}

module.exports = { metrics, setDisplayStatus, register, regenMetrics }
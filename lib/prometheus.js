const Prometheus = require('prom-client');
const register = Prometheus.register;
//const metricsInterval = Prometheus.collectDefaultMetrics();

const displayStatus = new Prometheus.Gauge({
    name: 'display_status',
    help: 'Metrics is at 0 if display is disconnected',
    labelNames: ['display', 'description']
})

const setDisplayStatus = (display, connected) => {
    displayStatus.set({ display: display.name, description: display.description || null }, connected, Date.now())
}

const metrics = (req, res) => {
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(Prometheus.register.metrics())
}

module.exports = { metrics, setDisplayStatus, register }
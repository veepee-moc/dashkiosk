function setLogs(state, logs) {
    return (Object.assign({}, state, {
        history: Object.assign({}, state.history, {
            historyLogs: logs
        })
    }));
}

export default setLogs;
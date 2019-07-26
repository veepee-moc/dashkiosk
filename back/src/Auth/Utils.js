function includesAll(arr, roles) {
    for (const role of roles) {
        if (!arr.includes(role))
            return false;
    }
    return true;
}

module.exports = { includesAll };
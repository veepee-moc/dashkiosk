
function removeTime(obj) {
    if (obj.createdAt)
        delete obj.createdAt;
    if (obj.updatedAt)
        delete obj.updatedAt;
}

module.exports = { removeTime };
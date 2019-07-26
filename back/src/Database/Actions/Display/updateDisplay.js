const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { action, Types } = require('../../../Redux/Actions');
const { removeTime } = require('../Utils');

module.exports = (id, display) => {
    return new Promise((resolve, reject) => {
        db.Displays.findOne({ where: { id } })
            .then((res) => {
                if (!res) {
                    reject();
                    return;
                }
                if (display.id)
                    delete display.id;
                return res.update(display);
            })
            .then((res) => {
                removeTime(res.dataValues);
                const data = Object.assign({}, res.dataValues);
                Store.dispatch(action(Types.UpdateDisplay, data));
                resolve(data);
            })
            .catch((err) => reject(err));
    });
}
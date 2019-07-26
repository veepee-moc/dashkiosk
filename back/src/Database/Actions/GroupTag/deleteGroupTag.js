const db = require('../../Models');
const Store = require('../../../Redux/Store');
const { Types, action } = require('../../../Redux/Actions');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        db.GroupTags.destroy({ where: { id } })
            .then((number) => {
                if (number === 0) {
                    resolve();
                    return;
                }
                Store.dispatch(action(Types.DeleteGroupTag, id));
                resolve(id);
            })
            .catch((err) => reject(err));
    })
}
const Manager = {
    modals: [],

    show(name, args) {
        const modal = this.modals.find(obj => obj.name === name);
        modal.setShow(true);
        modal.setArgs(args);
    },

    hide(name) {
        const modal = this.modals.find(obj => obj.name === name);
        modal.setShow(false);
    },

    register(name, setShow, setArgs) {
        this.modals.push({
            name, setShow, setArgs
        });
    }
};

export default Manager;
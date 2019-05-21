function setModal(state, data) {
  return Object.assign({}, state, {
    modal: Object.assign({}, state.modal, data.modal)
  });
}

export default setModal;
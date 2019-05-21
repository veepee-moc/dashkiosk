import React from 'react';
import ModalDashboard from '../Modals/dashboard';
import ModalEditDashboard from '../Modals/editDashboard';
import { connect } from 'react-redux';
import Store from '../../Store';
import { Types, action } from '../../Actions';

const closeModal = () => Store.dispatch(action(Types.SetModal, {
  modal: {
    group: null,
    rest: null,
    dashboard: {},
    show: false
  }
}));

const AllModals = (props) =>
  <div>
    <ModalDashboard show={props.modalShow === 'addDashboard'} rest={props.modalRest}
      group={props.modalGroup} onHide={() => closeModal()} />
    <ModalEditDashboard
      dashboard={props.modalDashboard} show={props.modalShow === 'editDashboard'} rest={props.modalRest}
      group={props.modalGroup} onHide={() => closeModal()} />
  </div>

function mapStateToProps(state) {
  return ({
      modalDashboard: state.modal.dashboard,
      modalGroup: state.modal.group,
      modalRest: state.modal.rest,
      modalShow: state.modal.show
  });
}

export default connect(mapStateToProps)(AllModals);
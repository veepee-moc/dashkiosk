import React from 'react';
import ModalDashboard from '../Modals/dashboard/dashboard';
import ModalEditDashboard from '../Modals/dashboard/editDashboard';
import ModalBroadcast from '../Modals/broadcast';
import ModalSettings from '../Settings/index';
import SavedDashboard from '../Modals/dashboard/savedDashboard';
import ModalEditDisplay from '../Modals/editDisplay';
import Modals from '../Modals/index';
import { connect } from 'react-redux';
import ImportedImage from '../uploadImage/importedImage';

var ModalImages = (props) => {
  return (
    <Modals
      show={props.modalShow === 'savedImage'}
      title='Imported images management'
      subtitle={props.modalImages}
    >
      <ImportedImage
        handleInput={() => { }}
        value=''
        folder={props.modalImages}
        management={true}
        images={{ index: 0 }}
      />
    </Modals>
  );
}

var ModalSavedDashboard = (props) => {
  return (
    <Modals
      show={props.modalShow === 'savedDashboard'}
      title='Saved dashboard management'
    >
      <SavedDashboard
        handleInput={() => { }}
        group={0}
        submitLoad={() => { }}
        management={true}
      />
    </Modals>
  );
}

ModalSavedDashboard = connect(mapStateToProps)(ModalSavedDashboard)
ModalImages = connect(mapStateToProps)(ModalImages)
const AllModals = () =>
  <>
    <ModalDashboard />
    <ModalEditDashboard/>
    <ModalBroadcast />
    <ModalSettings />
    <ModalImages />
    <ModalSavedDashboard />
    <ModalEditDisplay />
  </>

function mapStateToProps(state) {
  return ({
    modalShow: state.modal.show,
    modalImages: state.modal.images
  });
}

export default AllModals;
import { combineReducers } from 'redux';
import Admin from './Admin';
import Data from './Data';
import Settings from './Settings';
import Modal from './Modal';
import DnD from './DnD';
import History from './History';
import Receiver from './Receiver';

export default combineReducers({
    Admin,
    Data,
    Settings,
    Modal,
    DnD,
    History,
    Receiver
});

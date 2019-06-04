import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Types, action } from '../../Actions';
import Store from '../../Store';
import Rest from './Rest';
import {
	IoMdArrowBack,
	IoMdAdd,
	IoMdRemove,
	IoMdTime,
	IoMdBook,
	IoMdWifi,
	IoMdGrid,
	IoMdSettings,
	IoMdBookmark,
	IoMdImages,
	IoMdExit,
	IoMdBookmarks
} from 'react-icons/io';
import Collapse from '../Collapse';
import ModalBroadcast from '../Modals/broadcast';
import ModalSettings from '../Settings';
import Modals from '../Modals';
import GroupTagsMenu from './GroupTagsMenu';
import './SideMenu.css';
import ImportedImage from '../uploadImage/importedImage';
import SavedDashboard from '../Modals/dashboard/savedDashboard';

function ModalImages(props) {
	return (
		<Modals 
			show={props.show} 
			onHide={props.onHide} 
			title='Imported images management'
			subtitle={`${props.folder}`}
		>
			<ImportedImage
				handleInput={() => {}}
				images={props.images}
				value={props.images.value}
				folder={props.folder} 
				management={true} 
			/>
		</Modals>
	);
}

function ModalDashboards(props) {
	return (
		<Modals 
			show={props.show} 
			onHide={props.onHide}
			title='Saved dashboard management'
		>
			<SavedDashboard
				handleInput={() => {}}
				group={props.group}
				submitLoad={() => {}}
				management={true} 
			/>
		</Modals>
	);
}

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			layoutSizeCollapsed: true,
			groupTagsCollapsed: true,
			settings: false,
			keycloakLogout: null,
			images: false,
			disableAddGroup: false
		};
		this.Rest = new Rest(this);
	}

	componentDidMount() {
		Store.dispatch(action(Types.SetAdminState, { sideMenuWidth: this.mainDiv.clientWidth }));
		this.Rest.getKeycloakLogout();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.toggleMenu !== this.props.toggleMenu) {
			if (this.props.toggleMenu)
				this.animateSideMenu('Open');
			else
				this.animateSideMenu('Close');
		}
	}

	openBroadcast = () => {
		this.setState({ broadcast: true, settings: false });
	}

	addNewGroup = () => {
		this.setState({ disableAddGroup: true });
		this.Rest.addNewGroup().then(() => this.setState({ disableAddGroup: false }));
	}

	animateSideMenu(action) {
		switch (action) {
			case 'Open':
				this.mainDiv.animate([
					{ transform: 'translateX(-100%)' },
					{ transform: 'translateX(0%)' }
				], { duration: 400, easing: 'ease-out' });
				this.mainDiv.style.transform = 'translateX(0%)';
				return;
			case 'Close':
				this.mainDiv.animate([
					{ transform: 'translateX(0%)' },
					{ transform: 'translateX(-100%)' }
				], { duration: 400, easing: 'ease-out' });
				this.mainDiv.style.transform = 'translateX(-100%)';
				return;
			default:
				return;
		}
	}

	closeSideMenu = () => {
		Store.dispatch(action(Types.SetAdminState, { toggleMenu: false }));
	}

	render() {
		return (
			<div ref={(elem) => this.mainDiv = elem} className="bg-dark sb">
				<button className="btn btn-noframe-light m-1 sb-arrow-btn" onClick={this.closeSideMenu}>
					<IoMdArrowBack className={`sb-arrow-icon ${this.props.toggleMenu ? 'active' : ''}`} />
				</button>
				<ul className="container nav flex-column px-0">
					<li className="nav-item">
						<button className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdTime width="20" height="20" /> History
            </button>
					</li>
					<li className="nav-item">
						<a className="btn btn-noframe-light d-block w-100 rounded-0 text-left"
							target='_blank'
							rel='noopener noreferrer'
							href="https://dashkiosk.readthedocs.io/en/v2.7.3/usage.html#administration">
							<IoMdBook width="20" height="20" /> Documentation
            </a>
					</li>
					<hr className="border-bottom w-90 my-2" />
					<li className="nav-item">
						<button onClick={this.openBroadcast}
							className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdWifi width="20" height="20" /> Broadcast
                        </button>
					</li>
					<li className="nav-item">
						<button onClick={this.addNewGroup}
							disabled={this.state.disableAddGroup}
							className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdAdd width="20" height="20" /> Add new group
            </button>
					</li>
					<li className="nav-item">
						<button className="btn btn-noframe-light d-block w-100 rounded-0 text-left position-relative"
							onClick={() => this.setState({ groupTagsCollapsed: !this.state.groupTagsCollapsed })}>
							<IoMdBookmark width="20" height="20" /> Group tags
                            <IoMdArrowBack className={`sb-collapse-arrow mr-2 ${this.state.groupTagsCollapsed ? '' : 'active'}`} />
						</button>
						<Collapse collapsed={this.state.groupTagsCollapsed}>
							<GroupTagsMenu Rest={this.Rest} />
						</Collapse>
					</li>
					<li className="nav-item">
						<button className="btn btn-noframe-light d-block w-100 rounded-0 text-left position-relative"
							onClick={() => this.setState({ layoutSizeCollapsed: !this.state.layoutSizeCollapsed })}>
							<IoMdGrid width="20" height="20" /> Layout Size
                            <IoMdArrowBack className={`sb-collapse-arrow mr-2 ${this.state.layoutSizeCollapsed ? '' : 'active'}`} />
						</button>
						<Collapse collapsed={this.state.layoutSizeCollapsed}>
							<div className="bg-light mx-auto position-relative sb-container-layoutsize">
								<button className="btn btn-noframe-dark absolute vcenter left" onClick={() => this.props.decrLayoutSize()}>
									<IoMdRemove />
								</button>
								<span className="absolute center">{this.props.layoutSize}</span>
								<button className="btn btn-noframe-dark absolute vcenter right" onClick={() => this.props.incrLayoutSize()}>
									<IoMdAdd />
								</button>
							</div>
						</Collapse>
					</li>
					<hr className="border-bottom w-90 my-2" />
					<li className="nav-item">
						<button onClick={() => { this.setState({ settings: false, broadcast: false, images: false, dashboards: true }) }}
							className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdBookmarks width="20" height="20" /> Dashboards
            </button>
					</li>
					<li className="nav-item">
						<button className="btn btn-noframe-light d-block w-100 rounded-0 text-left position-relative"
							onClick={() => this.setState({ imagesCollapsed: !this.state.imagesCollapsed})}>
							<IoMdImages width="20" height="20" /> Images
              <IoMdArrowBack className={`sb-collapse-arrow mr-2 ${!this.state.imagesCollapsed ? '' : 'active'}`} />
						</button>
						<Collapse collapsed={this.state.imagesCollapsed}>
							<div className="bg-light mx-auto text-left">
								<button className="btn btn-block btn-noframe-dark vcenter rounded-0" onClick={() => this.setState({
									settings: false, broadcast: false, images: 'dashboard', dashboards: false
								})}>
									Dashboards
								</button>
								<button className="btn btn-block btn-noframe-dark vcenter mt-0 rounded-0" onClick={() => this.setState({
									settings: false, broadcast: false, images: 'unassigned', dashboards: false
								})}>
									Unassigned
								</button>
								<button className="btn btn-block btn-noframe-dark vcenter mt-0 rounded-0" onClick={() => this.setState({
									settings: false, broadcast: false, images: 'brand', dashboards: false
								})}>
									Branding
								</button>
							</div>
						</Collapse>
					</li>
					<hr className="border-bottom w-90 my-2" />
					<li className="nav-item">
						<button onClick={() => { this.setState({ settings: true, broadcast: false }) }}
							className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdSettings width="20" height="20" /> Settings
            </button>
					</li>
					<li className="nav-item" hidden={!this.state.keycloakLogout}>
						<a href={this.state.keycloakLogout} className="btn btn-noframe-light d-block w-100 rounded-0 text-left">
							<IoMdExit /> Logout
            </a>
					</li>
				</ul>
				<ModalBroadcast show={this.state.broadcast} onHide={() => { this.setState({ broadcast: false }) }} />
				<ModalSettings
					show={this.state.settings}
					onHide={() => { this.setState({ settings: false }) }}
				/>
				<ModalDashboards
					show={this.state.dashboards}
					onHide={() => { this.setState({ dashboards: false }) }}
				/>
				<ModalImages
					show={this.state.images}
					images={{ index: 0, name: 'test', folderName: 'unassigned' }}
					folder={this.state.images}
					onHide={() => { this.setState({ images: false }) }}
				/>
			</div>
		);
	}
};

function mapStateWithProps(state) {
	return {
		toggleMenu: state.admin.toggleMenu,
		layoutSize: state.admin.layoutSize
	};
}

function mapDispatchWithProps(dispatch) {
	return {
		incrLayoutSize: () => dispatch(action(Types.IncrLayoutSize)),
		decrLayoutSize: () => dispatch(action(Types.DecrLayoutSize))
	};
}

export default connect(mapStateWithProps, mapDispatchWithProps)(SideMenu);
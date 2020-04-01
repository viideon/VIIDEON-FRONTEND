import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthState, User } from '../../Redux/Types/auth';
import { logout } from '../../Redux/Actions/auth';

import './style.css';


type IProps = {
  history: any;
  auth: AuthState
  logout: (user: object) => void;

};
type IState = {
};
class SideBar extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className='MainDrawer'>
          <div className='OptionIcons'>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling'>Dashboard</h4>
          </div>
          <div className='OptionIcons'>
            <i className="fa fa-fw fa-video" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling' onClick={() => { this.props.history.push('/videotab') }}>Videos</h4>
          </div>
          <div className='OptionIcons'>
            <i className="fa fa-user-o" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling' onClick={() => { this.props.history.push('/profile') }}>Profile</h4>
          </div>
          <div className='OptionIcons'>
            <i className="fa fa-camera-retro fa-lg" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling' onClick={() => { this.props.history.push('/video/create') }}>Upload Video</h4>
          </div>
          <div className='OptionIcons'>
            <i className="fa fa-fw fa-feed" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling'>Connentions</h4>
          </div>
          <div className='OptionIcons'>
            <i className="fa fa-user-circle-o" style={{ fontSize: "1.50em", color: 'white' }} />
            <h4 className='IconNameStyling' onClick={() => { this.props.logout(this.props.auth) }}>Logout</h4>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: (user: User) => dispatch(logout(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
// export default SideBar
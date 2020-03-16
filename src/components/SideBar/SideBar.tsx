import React, { Component } from 'react';
import './style.css';


type IProps = {
  navigation: any;
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
      <i className="fa fa-fw fa-home" style={{ fontSize: "1.50em",color:'white' }} />
      <h4 className='IconNameStyling'>Dashboard</h4>
      </div>
      <div className='OptionIcons'>
      <i className="fa fa-fw fa-video" style={{ fontSize: "1.50em",color:'white' }} />
      <h4 className='IconNameStyling'>Videos</h4>
      </div>
      <div className='OptionIcons'>
      <i className="fa fa-fw fa-feed" style={{ fontSize: "1.50em",color:'white' }} />
      <h4 className='IconNameStyling'>Dashboard</h4>
      </div>
      </div>
      </>
    );
  }
}

export default SideBar
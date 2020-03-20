import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Label } from 'reactstrap';
import classnames from 'classnames';
import { SketchPicker } from 'react-color';
import * as Constants from '../../constants/components/videotab';

const Design = () => {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div>
      <Nav tabs style={{ display: 'flex', justifyContent: "space-evenly" }}>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            {Constants.PLAYER}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            {Constants.CTA}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} style={{ marginLeft: '20%', marginTop: '5%' }} >
        <TabPane tabId="1" >
          <SketchPicker />
          <Input type="checkbox" style={{ width: '20px' }} /> <Label>{Constants.DEFAULT_SET}</Label>
          <div style={{ display: 'flex', marginTop: '5%' }}>
            <h6>{Constants.BACKGROUND}</h6>
            <p style={{ marginLeft: '15px' }}>{Constants.CUSTOM_BACKGROUND}</p>
          </div>
        </TabPane>
        <TabPane tabId="2">
          <SketchPicker />
        </TabPane>
      </TabContent>
    </div>
  );
}
export default Design;
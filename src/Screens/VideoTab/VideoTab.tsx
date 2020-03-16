import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap';
import classnames from 'classnames';
import { FaInfo, FaChartLine, FaCut, FaPalette, FaRegEye, FaReply } from "react-icons/fa";
import './style.css';
import Header from './Header';
import Detail from './Detail';
import Editing from './Editing';
import Design from './Design';
import Privacy from './Privacy';
import VideoReplies from './VideoReplies';
// import PercentageCircle from 'reactjs-percentage-circle';



const Example = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = (tab: any) => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <Container fluid>
            <br /><br />
            <Header />
            <br /><br />
            <Nav tabs id="videoTabWrap">
                <NavItem >
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        <span><i><FaInfo id="videoTabIcon" /></i></span>
                        <p>DETAILS</p>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '2' })}

                        onClick={() => { toggle('2'); }}
                    >
                        <span><i><FaChartLine id="videoTabIcon" /></i></span>
                        <p>ANALYTICS</p>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        <span><i><FaCut id="videoTabIcon" /></i></span>
                        <p>EDITING</p>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '4' })}
                        onClick={() => { toggle('4'); }}
                    >
                        <span><i><FaPalette id="videoTabIcon" /></i></span>
                        <p>DESIGN</p>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '5' })}
                        onClick={() => { toggle('5'); }}
                    >
                        <span><i><FaRegEye id="videoTabIcon" /></i></span>
                        <p>PRIVACY</p>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink id="videoTabNavLink"
                        className={classnames({ active: activeTab === '6' })}
                        onClick={() => { toggle('6'); }}
                    >
                        <span><i><FaReply id="videoTabIcon" /></i></span>
                        <p>VIDEO REPLIES</p>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Container>
                        <Detail />
                    </Container>

                </TabPane>
                <TabPane tabId="2">
                    <h4>Tab 2</h4>

                    {/* <div>
                        <PercentageCircle percent={80}></PercentageCircle>
                        <PercentageCircle percent={80}>
                            <p>Children</p>
                        </PercentageCircle>
                    </div> */}
                </TabPane>
                <TabPane tabId="3">
                    <Editing />
                </TabPane>
                <TabPane tabId="4">
                    <Design />
                </TabPane>
                <TabPane tabId="5">
                    <Privacy />
                </TabPane>
                <TabPane tabId="6">
                    <VideoReplies />
                </TabPane>
            </TabContent>
        </Container>
    );
}

export default Example;
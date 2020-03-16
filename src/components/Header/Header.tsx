import React, { FC } from 'react';
import { Images } from '../../config';
import './styles.css';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

type IProps = {
  navigation: any;
};
const Header: FC<IProps> = ({
  navigation
}) => {

  return (
    <>
      <div className='HeaderContainer'>
        <div className='HeaderComponent'>
          <div className='HeaderStyling'>
            <h3 className='HeaderStyle'>VIDIONPRO</h3>
          </div>
          <div className='IconComponents'>
            <img src={Images.plus} className='ImagePlusTag' alt="ImagePlusTag" />
            <img src={Images.gift} className='ImageGiftTag' alt="ImageGiftTag" />
          </div>
          <div style={{marginTop:'10px', marginRight:'20px'}}>
            <UncontrolledDropdown>
              <DropdownToggle caret>
                Dropdown
            </DropdownToggle>
              <DropdownMenu>
                <DropdownItem >Your Setting</DropdownItem>
                <DropdownItem >Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Another Action</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
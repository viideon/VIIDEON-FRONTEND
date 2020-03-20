import React, { FC } from 'react';
import { Images } from '../../config';
import './styles.css';
import PopupMenu from './PopupList';

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
            <PopupMenu />
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
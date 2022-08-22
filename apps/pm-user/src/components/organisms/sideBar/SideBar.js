import React from 'react';
import { useHistory } from 'react-router-dom';
import { DEFAULT_SELECTED_ITEM_KEY, MENU_ITEMS } from './constants';
import { Menu } from '../../atoms';
import { ProfileSummary } from '../../molecules';
import { QuickInfoBar } from '../../molecules';
import styles from './sideBar.module.scss';

function SideBar() {
  const history = useHistory();
  const handleMenuItemClick = ({ key }) => {
    history.push(`/${key}`);
  };
  const handleRedirectToMatches = (matchStatus) => {
    history.push(`/matches/${matchStatus}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSummary}>
        <ProfileSummary
          imageChangeLink="#"
          userDetails="Software Developer, 32"
          userImageSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          userName="Vinit Sharma"
        />
      </div>
      <div className={styles.quickInfoBarWraper}>
        <QuickInfoBar onClick={handleRedirectToMatches} />
      </div>
      <div className={styles.menu}>
        <Menu
          defaultSelectedKeys={[DEFAULT_SELECTED_ITEM_KEY]}
          items={MENU_ITEMS}
          onClick={handleMenuItemClick}
          style={{
            borderRight: 'none',
          }}
        />
      </div>
      <div className={styles.settings}></div>
    </div>
  );
}

export default SideBar;

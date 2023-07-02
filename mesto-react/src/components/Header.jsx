import React from 'react';

import headerLogo from '../images/header-logo.svg';

export const Header = () => {
  return (
    <div className="header">
    <img src={headerLogo} className="header__logo" alt="Место"/>
</div>
  );
}



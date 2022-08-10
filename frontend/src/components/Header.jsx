import { useState, useContext, useEffect } from 'react';
import logo from '../img/logo/logo.svg';
import Image from './Image';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useScreenWidth from '../utils/effects/useScreenWidth';
import { mobileWidth } from '../constant/constant';

export function Header({  onLogOut }) {
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const screenWidth = useScreenWidth();

  const isSignInPage = pathname === '/signin';
  const isSignUpPage = pathname === '/signup';
  const isProfilePage = pathname === '/profile';

  const handleMenuClick = () => {
    setIsMobileHeaderVisible((state) => !state);
  };

  if (isProfilePage) {
    if (screenWidth < mobileWidth) {
      return (
        <>
          <div
            className={`header__status-container header__mobile ${
              isMobileHeaderVisible && 'header__mobile_isVisible'
            }`}
          >
            <span>{currentUser?.email}</span>
            <Link className="link link__logout" to="/signin" onClick={onLogOut}>
              Log out
            </Link>
          </div>
          <header className="header">
            <Image
              id="headerLogo"
              src={logo}
              className="logo"
              alt="logo of Around the U.S."
            />
            <div className="header__status-container">
              <button
                aria-label="menu button"
                onClick={handleMenuClick}
                className={`${
                  isMobileHeaderVisible
                    ? 'btn-close header__close'
                    : 'btn-three-menu'
                }`}
                type="button"
              />
            </div>
          </header>
        </>
      );
    }
  }
  return (
    <header className="header">
      <Image
        id="headerLogo"
        src={logo}
        className="logo"
        alt="logo of Around the U.S."
      />
      <div className="header__status-container">
  
        {isSignInPage && (
          <Link className="link" to="/signup">
            Sign up
          </Link>
        )}
        {isSignUpPage && (
          <Link className="link" to="/signin">
            Log in
          </Link>
        )}
        {isProfilePage && (
          <>
            <span className="header__email">{currentUser?.email}</span>
            <Link className="link link__logout" to="/signin" onClick={onLogOut}>
              Log out
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

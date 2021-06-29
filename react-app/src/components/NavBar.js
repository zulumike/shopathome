import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthLogin } from './AuthLogin';
import { AuthLogout } from './AuthLogout';

const captains = console;

function NavBar(props) {
  const providers = ['twitter', 'github', 'aad'];
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      captains.error('No profile could be found');
      return undefined;
    }
  }

  return (
    <div className="column is-2">
      <nav className="menu">
        <p className="menu-label">Menu</p>
        <ul className="menu-list">
          <NavLink to="/home" activeClassName="active-link">
            Hometown
          </NavLink>
          <NavLink to="/products" activeClassName="active-link">
            My jallaList
          </NavLink>
          <NavLink to="/discounts" activeClassName="active-link">
            My Discounts
          </NavLink>
        </ul>
        {props.children}
      </nav>
      <nav className="menu auth">
        <p className="menu-label">Auth</p>
        <div className="menu-list auth">
          {!userInfo && (
            <div>
              {providers.map((provider) => (
                <AuthLogin key={provider} provider={provider}></AuthLogin>
              ))}
            </div>
          )}
          {userInfo && (
            <div>
              <AuthLogout></AuthLogout>
            </div>
          )}
        </div>
      </nav>
      {userInfo && (
        <div>
          <div className="user">
            <p>Welcome</p>
            <p>{userInfo && userInfo.userDetails}</p>
            <p>{userInfo && userInfo.identityProvider}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default NavBar;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon, Menu, Dropdown } from 'antd';
import { redirect_path } from '../../config/config';

const StyledHeader = styled.header`
  position: fixed;
  background-color: #227093;
  top: 0;
  z-index: 10;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  grid-area: header;
`;

const Brand = styled.div`
  margin: 0;
  padding: 0;
`;

const BrandLink = styled(Link)`
  background-color: #357ca5;
  width: ${props => props.viewmenu ? '14em' : '6em'};
  display: inline-block;
  color: #ffffff;
  text-align: center;
  padding: 18px 0;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  min-height: 25px;
  transition: width 0.5s;

  @media(max-width: 970px) {
    width: ${props => props.viewmenu ? '6em' : '14em'};
  }
`;

const BrandName = styled.span`
  font-weight: 600;
`;

const Toggle = styled.button`
  min-height: 25px;
  height: 100%;
  width: 50px;
  background-color: #398AB9;
  color: #fff;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
`;

const SideMenu = styled.nav`
  display: flex;
  justify-items: center;
  align-items: center;
  padding-right: 15px;
  color: #fff;
`;

const Username = styled.span`
  margin: 0 10px;
  font-size: 16px;
  text-transform: uppercase;
`;



const Header = ({ username, setViewMenu, viewMenu, setLoggedOutCLicked }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={() => setLoggedOutCLicked(true)}>Log out</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledHeader>
      <Brand>
        <BrandLink viewmenu={+viewMenu} to={redirect_path}>
          <BrandName>{process.env.REACT_APP_PROJECT_NAME}</BrandName>
        </BrandLink>
        <Toggle
          type="button"
          onClick={() => setViewMenu(val => !val)}
        >
          <FontAwesomeIcon style={{ fontSize: 18 }} icon="bars" />
        </Toggle>
      </Brand>
      <SideMenu>
        <Username>{username}</Username>
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="down" />
        </Dropdown>
      </SideMenu>
    </StyledHeader>
  )
}
Header.propTypes = {
  username: PropTypes.string,
  viewMenu: PropTypes.bool.isRequired,
  setViewMenu: PropTypes.func.isRequired,
  setLoggedOutCLicked: PropTypes.func.isRequired,
}

Header.defaultProps = {
  username: '',
}
export default Header

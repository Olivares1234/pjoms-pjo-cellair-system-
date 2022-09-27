import React from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';

import { routes } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const menuStatus = css`
  background-color: #1b2529;
  color: #fff;
  border-left: 3px solid #3c8dbc;
`;

const Aside = styled.aside`
  top: 0;
  left: 0;
  display: block;
  position: fixed;
  min-height: 100%;
  transition: all 0.20s;
  z-index: 5;
  background-color: #222d32;
  padding-top : 60px;
  ${props => props.viewmenu
    ? `width: 14em; opacity:1;`
    : `width: 0px; opacity:0;`
  };

  @media(max-width: 970px) {
  ${props => props.viewmenu
    ? `width: 0px; opacity:0;`
    : `width: 14em; opacity:1;`
  };
  }
`;

const DateViewer = styled.div`
  color: white;
  text-align: center;
  padding: 20px 0;
  border-bottom: 2px solid gray;
  font-size: 14px;

  & i {
    margin-right: 5px;
  }
`;

const StyledUL = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const StyledList = styled.li`
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  padding: 16px 5px 16px 15px;
  display: block;
  border-bottom: 1px solid gray;
  text-decoration: none;
  text-transform: capitalize;
  
  ${props => props.active ? menuStatus : 'color: #95a5a6;'}

  :hover {
    ${menuStatus}
  }
`;

const Sidebar = ({ viewMenu }) => {

  const pathname = useLocation().pathname;
  return (
    <Aside viewmenu={+viewMenu}>
      <DateViewer>
        <Icon type="calendar" />
        {moment().format('ddd MMM D, Y')}
      </DateViewer>
      <StyledUL>
        {routes.map((data, i) => {
          if (!data.view)
            return false

          return (
            <StyledList key={i}>
              <StyledLink
                to={data.path}
                active={+(data.path === pathname)}
              >
                <FontAwesomeIcon
                  icon={data.icon}
                  style={{ marginLeft: 5, marginRight: 10 }}
                />
                <span>{data.title}</span>
              </StyledLink>
            </StyledList>
          )
        })}
      </StyledUL>
    </Aside>
  )
}

export default Sidebar;


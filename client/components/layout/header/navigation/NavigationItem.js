import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({ path, label, color }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <NavItem>
      <Ring $hover={isHover ? 'true' : undefined} color={color}/>
      <OuterRing $hover={isHover ? 'true' : undefined} color={color}/>
      <StyledNavLink
        to={path}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
      >
        {label}
      </StyledNavLink>
    </NavItem>
  );
};

const ringMixin = css`
  border-radius: 100%;
  border: 2px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
`
const Ring = styled.div`
  ${ringMixin}
  height: ${({$hover}) => ($hover ? '100px' : '50px')};
  width: ${({$hover}) => ($hover ? '100px' : '50px')};
  background-color: ${({color}) => `var(${color})`};
`;
const OuterRing = styled.div`
  ${ringMixin}
  border: 0px solid transparent;
  height: ${({$hover}) => ($hover ? '0px' : '100px')};
  width: ${({$hover}) => ($hover ? '0px' : '100px')};
  background-color: white;
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.25rem;
  text-transform: uppercase;
  font-family: var(--primary-font);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  z-index: 2;
  background-color: transparent;
  &:hover {
    background-color: transparent;
    color: white;
    transition: color 0.25s ease;
  }
`;

export default NavigationItem;

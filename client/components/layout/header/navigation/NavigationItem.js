import React, {useState} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';




const NavigationItem = ({ path, label, color }) => {

  const [isHover, setIsHover] = useState(false)
  console.log(color)

  return (
    <NavItem>
      <Ring $hover={isHover ? 'true' : undefined} color={color} outter={true}/>
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

const Ring = styled.div`
  height: ${({$hover}) => ($hover ? '100px' : '50px')};
  width: ${({$hover}) => ($hover ? '100px' : '50px')};
  border-radius: 100%;
  border: 1px solid black;
  background-color: ${({color}) => color};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
`;
const OuterRing = styled.div`
  height: ${({$hover}) => ($hover ? '0px' : '100px')};
  width: ${({$hover}) => ($hover ? '0px' : '100px')};
  border-radius: 100%;
  border: 1px solid black;
  background-color: white;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
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
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid transparent;
  z-index: 2;
  background-color: transparent;
  &:hover {
    background-color: transparent;
    color: white;
    transition: color 0.25s ease;
  }
`;

export default NavigationItem;

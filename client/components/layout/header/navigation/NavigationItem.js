import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavigationItem = ({ index ,path, label, color }) => {
  const [isHover, setIsHover] = useState(false)
  const [isSlide, setIsSlide] = useState(false)

  useEffect(()=>setIsSlide(true),[])
  return (
    <NavItem $isSlide={isSlide} $index={index}>
      <Ring $hover={isHover ? 'true' : undefined} color={color}/>
      <OuterRing $hover={isHover ? 'true' : undefined} color={color}/>
      <StyledNavLink
        to={path}
        onMouseEnter={()=>setIsHover(true)}
        onMouseLeave={()=>setIsHover(false)}
        color={color}
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
  transform: ${({ $isSlide }) => ($isSlide ? 'translateY(0)' : 'translateY(-200%)')};
  transition: ${({$index}) => `transform 0.5s ease-out ${$index * .2}s`}
  /* transition: transform 0.5s ease-out; */
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
  &.active {
    background-color: ${({color}) => `var(${color})`};
    color: white;
  }

`;

export default NavigationItem;

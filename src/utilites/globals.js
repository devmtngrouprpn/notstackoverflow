import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  textDarkGray,
  black,
  buttonBlue,
  tabButtonGray,
  tabButtonDarkGray,
  tabButtonBorder,
  tabButtonDarkBorder,
  tabButtonText,
  tabButtonTextDark
} from "./colors.js";

export const Logo = styled.img`
  transform: scaleX(-1) rotate(126deg);
`;

export const TabButton = styled.button`
  background-color: ${props => (props.active ? tabButtonDarkGray : "#fff")};
  font-family: Helvetica, san-serif;
  font-size: 13px;
  color: ${props => (props.active ? tabButtonTextDark : tabButtonText)};
  padding: 8px 8px 8px 8px;
  border: 1px solid
    ${props => (props.active ? tabButtonDarkBorder : tabButtonBorder)};
  border-top-right-radius: ${props =>
    props.position === "left" || props.position === "mid" ? "0px" : "3px"};
  border-bottom-right-radius: ${props =>
    props.position === "left" || props.position === "mid" ? "0px" : "3px"};
  border-top-left-radius: ${props =>
    props.position === "right" || props.position === "mid" ? "0px" : "3px"};
  border-bottom-left-radius: ${props =>
    props.position === "right" || props.position === "mid" ? "0px" : "3px"};
  border-left: ${props =>
    props.position !== "left" && !props.active ? "none" : ""};
  border-right: ${props => (props.activeNeigbor ? "none" : "")};
  :hover {
    background-color: ${props =>
      props.active ? tabButtonDarkGray : tabButtonGray};
    color: ${tabButtonTextDark};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(145, 153, 161, 0.1);
  }
`;

export const tabButton = (padding = "8px 8px 8px 8px") =>
  `
  background-color: ${props => (props.active ? tabButtonDarkGray : "#fff")};
  font-family: Helvetica, san-serif;
  font-size: 13px;
  padding: ${padding};
  border: 1px solid ${props =>
    props.active ? tabButtonDarkBorder : tabButtonBorder};
  :hover {
    background-color: ${props =>
      props.active ? tabButtonDarkGray : tabButtonGray};
  }
`;

export const blueButton = (padding = "8px 10px 8px 10px") =>
  `
    background-color: ${buttonBlue}
    color: white;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 #66bfff;
    padding: ${padding}
    outline: none;
    font-size: 13px;
    border: 1px solid #07c
    white-space: nowrap;
    :hover{
        color: rgba(255,255,255,0.9);
        background-color: #07c;
        border-color: #005999;
        box-shadow: inset 0 1px 0 #3af;
    }
    `;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: Helvetica, sans-serif;
  color: ${textDarkGray};
  :hover {
    color: ${black};
  }
`;

export const P = styled.p`
  font-family: Helvetica, sans-serif;
`;

export const H1 = styled.h1`
  font-family: Helvetica, sans-serif;
  font-size: 27px;
`;

export default {
  P,
  Logo,
  H1,
  StyledLink,
  blueButton,
  TabButton
};

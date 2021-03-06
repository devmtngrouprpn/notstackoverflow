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
  tabButtonTextDark,
  hrGray,
  inputBorderBlue
} from "./index.js";

export const Hr = styled.div`
  border: 0.5px solid ${hrGray};
`;

export const Page = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-basis: 1100px;
`;

export const Content = styled.div`
  flex-basis: 775px;
`;

export const Adds = styled.div`
  /* border: 1px black solid; */
  flex-basis: 324px;
  flex-shrink: 0;
  /* height: 5000px; */
  margin-left: 5%;
`;

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
    background-color: ${buttonBlue};
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

export const SearchBar = styled.input`
  box-sizing: border-box;
  border-radius: 3px;
  border-color: #bbc0c4;
  border: 1px solid lightgray;
  background-color: #fff;
  box-shadow: none;
  color: #3b4045;
  flex-basis: 750px;
  margin-left: 12px;
  padding: 8px 9px 8px 9px;

  :focus {
    box-sizing: border-box;

    outline: none;
    border: 1px solid #66bfff;
    box-shadow: 0 0 0 4px rgba(0, 149, 256, 0.15);
    border-radius: 3px;
  }

  :focus + button {
    opacity: 1;
  }

  ::placeholder {
    color: lightgray;
  }
`;

export const timeFunction = postedDate => {
  var currentDate = new Date();
  let first = postedDate.split("T");
  var qMade = new Date(first[0] + " " + first[1].split("Z")[0]);
  const time = function(currentTime, postTime) {
    var delta = Math.floor(
      Math.abs(currentTime.getTime() - postTime.getTime()) / 10
    );
    return delta;
  };
  let difference = time(qMade, currentDate);
  let timeType =
    difference >= 1000 && difference <= 60000
      ? `${(difference / 1000).toFixed(0)} secs ago`
      : difference >= 60000 && difference <= 3600000
      ? `${(difference / 60000).toFixed(0)} min ago`
      : difference >= 3600000 && difference <= 86400000
      ? `${(difference / 3600000).toFixed(0)} ${
          (difference / 3600000).toFixed(0) > 1 ? "hours" : "hour"
        } ago`
      : difference >= 86400000 && difference <= 604800000
      ? `${(difference / 86400000).toFixed(0)} ${
          (difference / 86400000).toFixed(0) > 1 ? "days" : "day"
        } ago`
      : postedDate.split("T")[0];
  return "asked" + " " + timeType;
};

export default {
  P,
  Logo,
  H1,
  StyledLink,
  blueButton,
  TabButton,
  Page,
  Content,
  Adds,
  Hr,
  SearchBar,
  timeFunction
};

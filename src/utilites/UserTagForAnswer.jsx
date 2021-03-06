import React, { Component } from "react";
import styled from "styled-components";
import { P, StyledLink, timeFunction } from "./index";

class UserTag extends Component {
  constructor() {
    super();

    this.state = {};
  }

  timeFunction = postedDate => {
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
  render() {
    let { question } = this.props;
    console.log(question, "answers");
    let difference = this.timeFunction(question.answer_creation_timestamp);
    return (
      <Wrapper>
        <AskedLink to={`/questions/${question.question_id}`}>
          {/* {difference} */}
        </AskedLink>
        <br />
        <P2>{difference}</P2>
        <UserInfo>
          <ProPic src={question.picture} alt="" />
          <UserName>
            <StyledCardLink user={true} to={`/users/${question.username}`}>
              <P>{question.username}</P>
            </StyledCardLink>{" "}
            <UserBadges>
              <RepP>
                {question.reputation > 1000
                  ? `${(question.reputation / 1000).toFixed(1)}k`
                  : question.reputation}
              </RepP>
              <Gold> ● </Gold>
              <BadgeP> 4</BadgeP>
              <Silver> ● </Silver>
              <BadgeP> 3</BadgeP>
              <Bronze> ● </Bronze>
              <BadgeP> 8</BadgeP>
            </UserBadges>
          </UserName>
        </UserInfo>
      </Wrapper>
    );
  }
}

const P2 = styled(P)`
  color: #9199a1;
  font-size: 12px;
  font-weight: 400;
`;

const UserInfo = styled(P)`
  display: flex;
  flex-direction: row;
`;
const ProPic = styled.img`
  border-radius: 1.5px;
  width: 32px;
  height: 32px;
  margin: 0;
  -webkit-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  -moz-box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
  box-shadow: 2px 2px 4px rgba(12, 13, 14, 0.5);
`;
const UserName = styled(P)`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;
const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  font-weight: 400;
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;
const Wrapper = styled.div``;

const Bronze = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: brown;
  font-weight: 550;
  padding-left: 8px;
  display: flex;
  padding-right: 2.5px;
`;
const Silver = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: silver;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;
const Gold = styled.div`
  font-size: 14px;
  font-weight: 0;
  color: gold;
  font-weight: 550;
  padding-left: 8px;
  padding-right: 2.5px;
`;

const UserBadges = styled(P)`
  display: flex;
  flex-direction: row;
  margin-top: 3px;
  align-items: center;
  /* margin-left: 8px; */
`;
const AskedLink = styled(StyledLink)`
  color: #9199a1;
  font-size: 12px;
  margin-right: 5px;
  :hover {
    color: #07c;
  }
  margin-bottom: 2px;
`;
const RepP = styled(P)`
  font-weight: bold;
  font-size: 12px;
  margin-right: 2px;
  color: #848d95;
`;
const BadgeP = styled.p`
  font-weight: 400;
  font-size: 12px;
  padding-left: 0;
  color: #6a737c;
`;

export default UserTag;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  P,
  hrGray,
  flex,
  tenKViews,
  oneKViews,
  TinyTag,
  green,
  questionBoxGray,
  H1,
  StyledLink,
  textLightGray
} from "./../../utilites/index";

function HQCard({ question, user }) {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    "." +
    today.getMilliseconds();
  var dateTime = date + " " + time;
  var currentDate = new Date(dateTime);
  let first = question.question_creation_timestamp.split("T");
  var qMade = new Date(first[0] + " " + first[1].split("Z")[0]);
  let qqMade = new Date("2019-2-7 9:28:0.54");
  // Date.daysBetween = function(date1, date2) {
  //   // Convert both dates to milliseconds
  //   var date1_ms = date1.getTime();
  //   var date2_ms = date2.getTime();
  //   // console.log(date1_ms - date2_ms);
  //   // Calculate the difference in milliseconds
  //   var difference_ms = date1_ms - date2_ms;
  //   // Convert back to days and return
  //   return Math.round(difference_ms);
  // };
  Date.timeBetween = function(currentTime, postTime) {
    // get total seconds between the times
    var delta = Math.abs(currentTime - postTime) / 1000;
    console.log(Math.floor(delta));
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = Math.floor(delta % 60); // in theory the modulus is not required
    return seconds;
  };
  let difference = Date.timeBetween(qMade, currentDate);
  const tags = question.tags.map(tag => <TinyTag subject={tag} />);
  return (
    <>
      <Card>
        <Data>
          <Container to={`/questions/${question.question_id}`}>
            <BigP>{question.votes}</BigP>
            <SmallP>vote{question.votes != 1 ? "s" : ""}</SmallP>
          </Container>
          <AnswerBox
            answers={question.answers}
            accepted={question.answer_accepted}
            to={`/questions/${question.question_id}`}
          >
            <BigP answers={true}>{question.answers}</BigP>
            <SmallP answers={true}>
              answer{question.answers != 1 ? "s" : ""}
            </SmallP>
          </AnswerBox>
          <Container to={`/questions/${question.question_id}`}>
            <ViewsP views={question.question_views} big={true}>
              {question.question_views > 1000
                ? `${(question.question_views / 1000).toFixed(0)}k`
                : question.question_views}{" "}
              view{question.question_views != 1 ? "s" : ""}
            </ViewsP>
          </Container>
        </Data>
        <RightContainer>
          <BiggerBox>
            <QuestionH1>
              <StyledCardLink to={`/questions/${question.question_id}`}>
                {question.question_title}
              </StyledCardLink>
            </QuestionH1>
            <QuestionH3>{question.content.substr(0, 150)}</QuestionH3>
            <TagContainer>{tags}</TagContainer>
            <br />
          </BiggerBox>
          <SmallerBox />
          <NameP>
            <AskedLink to={`/questions/${question.question_id}`}>
              asked{" "}
              {difference >= 1000 && difference <= 60000
                ? `${(difference / 1000).toFixed(0)} secs ago`
                : difference >= 60000 && difference <= 3600000
                ? `${(difference / 60000).toFixed(0)} min ago`
                : difference >= 3600000 && difference <= 86400000
                ? `${(difference / 3600000).toFixed(0)} hours ago`
                : difference >= 86400000 && difference <= 604800000
                ? `${(difference / 86400000).toFixed(0)} days ago`
                : question.question_creation_timestamp.split("T")[0]}{" "}
            </AskedLink>
            <br />
            {difference}
            <br />
            {dateTime}
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
                </UserBadges>
              </UserName>
            </UserInfo>
          </NameP>
        </RightContainer>
      </Card>
      <Hr />
    </>
  );
}

const QuestionH1 = styled(H1)`
  font-size: 16px;
  margin-bottom: 5.25px;
`;
const QuestionH3 = styled(P)`
  font-size: 100%;
  margin-bottom: 5.25px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0;
  padding-bottom: 5px;
  margin: 0;
  color: #777f87;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const RepP = styled(P)`
  font-weight: 700;
  color: #848d95;
`;

const RightContainer = styled.div`
  flex-basis: 100%;
  position: relative;
  margin: 0;
  height: 100%;
`;

const AskedLink = styled(StyledLink)`
  color: #9199a1;
  font-size: 12px;
  margin-right: 5px;
  :hover {
    color: #07c;
  }
`;

const NameP = styled(P)`
  box-sizing: border-box;
  padding: 5px 6px 7px 7px;
  width: 200px;
  float: right;
`;

const ProPic = styled.img`
  border-radius: 1px;
  width: 32px;
  height: 32px;
  margin: 0;
`;

const UserInfo = styled(P)`
  display: flex;
  flex-direction: row;
`;

const SmallerBox = styled.div`
  /* ${flex("column", "flex-start", "flex-start")} */

`;

const BiggerBox = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  flex-basis: 100%;
  position: relative;
  margin: 0;
`;
const UserName = styled(P)`
  display: flex;
  flex-direction: column;
`;

const UserBadges = styled(P)`
  display: flex;
  flex-direction: row;
`;

const StyledCardLink = styled(StyledLink)`
  color: #07c;
  font-size: ${props => (props.user ? "12px" : "")};
  margin-right: ${props => (props.user ? "5px" : "")};
  :hover {
    color: #3af;
  }
  :visited {
    color: ${props => (props.user ? "" : "#005999")};
  }
`;

const Card = styled.div`
  padding: 12px 8px;
  height: auto;
  ${flex("row", "flex-start", "flex-start")};
  padding-left: 8px;
  color: ${props => (props.tag ? "#fffbec" : "inherit")};
`;

const Data = styled.div`
  ${flex("column", "flex-start", "flex-start")}
  margin-right: 16px;
  width: 58px;
  float: none;
  margin-left: 8px;
  flex-shrink: 0;
  color: #6a737c;
  font-size: 11px;
`;
const BigP = styled(P)`
  color: ${props => (props.answers ? "inherit" : questionBoxGray)};
  font-size: 20px;
`;

const SmallP = styled.div`
  color: ${props => (props.answers ? "inherit" : questionBoxGray)};

  font-size: 12px;
`;

const AnswerBox = styled(StyledLink)`
  ${flex("column")}
  height: 52px;
  width: 58px;
  border: 1px solid ${props => (props.answers >= 1 ? green : "transparent")};
  border-radius: 3px;
  padding: 6px;
  color: ${props =>
    props.accepted ? "#fff" : props.answers >= 1 ? green : questionBoxGray};
  background-color: ${props => (props.accepted ? green : "transparent")};
`;

const ViewsP = styled(P)`
  color: ${props =>
    +props.views >= 10000
      ? tenKViews
      : +props.views >= 1000
      ? oneKViews
      : questionBoxGray};
  font-size: ${props => (props.big ? "13px" : "11px")};
  ${flex("row")}
  padding: 0;
`;

const TagContainer = styled.div`
  ${flex()}
`;

const Container = styled(StyledLink)`
  ${flex("column")}
  padding: 7px;
  height: 52px;
  width: 52px;
`;

const Hr = styled.div`
  border: 0.5px solid ${hrGray};
`;
function mapStateToProps(state) {
  let { user } = state.global;
  return {
    user
  };
}
export default connect(mapStateToProps)(HQCard);

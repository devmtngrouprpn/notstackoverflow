import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Layout from "../Layout/Layout1.jsx";
import HQCard from "./../Questions/HQCard";
import { Link } from "react-router-dom";
import {
  LoadingWraper,
  H1,
  blueButton,
  TabButton,
  flex,
  featuredBoxBlue,
  Page,
  Adds,
  Content,
  borderGray
} from "./../../utilites/index";
import { connect } from "react-redux";
import { update_home } from "./../../ducks/home";
import Ads from "../../utilites/RightSideBar";

class Home extends Component {
  state = {
    view: "interesting",
    loading: true
  };
  componentDidMount() {
    if (!this.props.interesting[0]) {
      this.getQuestions();
    } else {
      this.setState({ loading: false });
    }
  }

  async getQuestions() {
    let res = await axios.get(`/api/questions/interesting`);
    this.props.update_home(res.data);
    console.log(res.data.interesting.length);
    this.setState({ loading: false });
  }

  handleView = name => {
    this.setState({ view: name });
  };
  pushitrealgood() {
    let userId = `user1`;
    let content = `<p>werertk;'erwkt</p><p>lrtj;wer</p><p>leng9\\rere</p><p>erqwer</p><p><br></p><p>rtret<em>rtrtr</em></p>`;
    let title = `i am' a title`;
    let tags = ["javascript", "react"];
    let res = axios.post("/api/questions/ask", {
      userId,
      content,
      title,
      tags
    });
  }
  render() {
    let questions = this.props[this.state.view].map(question => (
      <HQCard question={question} />
    ));
    console.log(this.props.global);
    return (
      <Layout>
        <LoadingWraper text loading={this.state.loading}>
          <Page>
            <Content>
              <HeaderContainer>
                <H1>Top Questions</H1>
                <Link to="/create-question">
                  <AskButton>Ask Question</AskButton>
                </Link>
              </HeaderContainer>
              <ButtonContainer>
                <TabButton
                  onClick={() => this.handleView("interesting")}
                  active={this.state.view === "interesting"}
                  activeNeigbor={this.state.view === "featured"}
                  position="left"
                >
                  Interesting
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("featured")}
                  active={this.state.view === "featured"}
                  activeNeigbor={this.state.view === "hot"}
                  position="mid"
                >
                  <FeaturedBox>
                    <CountBox>
                      {(this.props.tfeatured[0] || {}).featured_total}
                    </CountBox>
                    Featured
                  </FeaturedBox>
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("hot")}
                  active={this.state.view === "hot"}
                  activeNeigbor={this.state.view === "week"}
                  position="mid"
                >
                  Hot
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("week")}
                  active={this.state.view === "week"}
                  activeNeigbor={this.state.view === "month"}
                  position="mid"
                >
                  Week
                </TabButton>
                <TabButton
                  onClick={() => this.handleView("month")}
                  active={this.state.view === "month"}
                  position="right"
                >
                  Month
                </TabButton>
              </ButtonContainer>
              <Questions>{questions}</Questions>
            </Content>
            <Adds>
              {" "}
              <Ads />{" "}
            </Adds>
          </Page>
        </LoadingWraper>
      </Layout>
    );
  }
}

const Questions = styled.div`
  border-top: 1px solid ${borderGray};
`;

const HeaderContainer = styled.div`
  ${flex("row", "space-between", "flex-start")}
  margin: 24px;
  margin-right: 0px;
  max-width: 727px;
`;

const ButtonContainer = styled.div`
  ${flex("row", "flex-end")}
  margin: 0 0 24px 16px;
`;

const FeaturedBox = styled.div`
  ${flex()}
  height: 15px;
`;

const CountBox = styled.div`
  padding: 2px 5px 2.5px 5px;
  background-color: ${featuredBoxBlue};
  color: #fff;
  font-size: 10px;
  line-height: 10px;
  border-radius: 3px;
  margin-right: 5px;
  margin-left: -2px;
  position: relative;
  top: 1px;
`;

const AskButton = styled.button`
  ${blueButton("10.4px 10.4px 10.4px 10.4px")}
`;

function mapStateToProps(state) {
  let { interesting, featured, hot, week, month, tfeatured } = state.home;
  return {
    interesting,
    featured,
    hot,
    week,
    month,
    tfeatured
  };
}
export default connect(
  mapStateToProps,
  { update_home }
)(Home);

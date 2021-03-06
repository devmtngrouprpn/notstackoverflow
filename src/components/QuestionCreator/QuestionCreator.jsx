import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { TinyTag } from "../../utilites/index.js";
import stringSimilarity from "string-similarity";
import Quill from "./Quil";
import { connect } from "react-redux";
// import { SearchBar } from '../../utilites/globals';
import Layout2 from "../Layout/Layout2";
import {
  LoadingWraper,
  flex,
  SearchBar,
  P,
  blueButton
} from "./../../utilites/index";
import { stringCheck } from "../../test/Logic.js";

class QuestionCreator extends Component {
  constructor() {
    super();
    this.state = {
      assosiated: [],
      tagsForMapping: [],
      status: "tags",
      typingTag: "",
      desc: "",
      tagNames: [],
      tagsPayload: [],
      descPayload: "",
      titlePayload: "",
      toggle: false,
      loading: true
    };
  }
  componentDidMount = async () => {
    let res = await axios.get("/api/tags/alltinytags");
    console.log(res.data.popular);
    this.setState({ tags: res.data.popular });
    let array = this.state.tags.map(e => {
      return e.tag_name;
    });
    this.setState({ tagNames: array, loading: false });
  };
  submitQuestion = async () => {
    if (
      (this.state.descPayload.length >= 1) &
      (this.state.titlePayload.length >= 1) &
      (this.state.tagsPayload.length >= 1)
    ) {
      let res = await axios.post("/api/questions/ask", {
        userId: this.props.global.user.auth_id,
        content: this.state.descPayload,
        title: this.state.titlePayload,
        tags: this.state.tagsPayload
      });
      this.props.history.push(`/questions/${res.data.question_id}`);
    } else alert("Please fill in all fields");
  };
  handleChange = async (defaultValue = "") => {
    console.log(defaultValue);
    await this.setState({ descPayload: defaultValue });
    console.log(this.state.descPayload);
  };
  removeTag = tag => {
    let newArr = this.state.tagsPayload.filter(e => {
      return e !== tag;
    });
    this.setState({ tagsPayload: newArr });
  };
  active = value => {
    if (this.state.status === value) {
      return `color:blue`;
    }
  };
  grabRelated = e => {
    this.setState({ typingTag: e.target.value });
    console.log(stringCheck(e.target.value, this.state.tagNames));
    this.setState({
      tagsForMapping: stringCheck(e.target.value, this.state.tagNames)
    });
  };
  render() {
    if (this.state.status === "tags") {
      return (
        <>
          <Layout2>
            <LoadingWraper loading={this.state.loading}>
              <Page>
                <Container>
                  <CurrentStep>
                    <Active onClick={() => this.setState({ status: "tags" })}>
                      Tags
                    </Active>
                    <Option onClick={() => this.setState({ status: "title" })}>
                      Title
                    </Option>
                    <Option onClick={() => this.setState({ status: "desc" })}>
                      Description
                    </Option>
                    <Option onClick={() => this.setState({ status: "review" })}>
                      Review
                    </Option>
                  </CurrentStep>
                  <Head>
                    What languages, technologies, and/or frameworks is your
                    question about?
                  </Head>
                  <Help>
                    Tags help the right people find and answer your question.
                  </Help>
                  <Tutorial>
                    <Identify>
                      Identify your tags by completing the sentence, “My
                      question is about…”
                    </Identify>
                    <Example>For example:</Example>
                    <P>
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z" />
                      </svg>
                      Include tags that are crucial to your question only,
                    </P>
                    <P>
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                      >
                        <X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z" />
                      </svg>
                      Only include version numbers, like c#-4.0, when absolutely
                      necessary
                    </P>
                  </Tutorial>
                  <TagBar>Tags</TagBar>
                  <DualBox>
                    <HiddenTags>
                      {this.state.tagsPayload.map(e => {
                        return (
                          <BadTag
                            onClick={() => {
                              this.removeTag(e);
                            }}
                          >
                            <TinyTag x={true} subject={e} notClickable={true} />
                          </BadTag>
                        );
                      })}
                    </HiddenTags>
                    <TagBox
                      value={this.state.typingTag}
                      onChange={value => this.grabRelated(value)}
                    />
                  </DualBox>
                  <Suggestions>
                    {this.state.tagsForMapping.map(e => {
                      return (
                        <TinyTagHolder
                          onClick={() => {
                            if (!this.state.tagsPayload.includes(e.target)) {
                              this.setState({
                                tagsPayload: [
                                  ...this.state.tagsPayload,
                                  e.target
                                ],
                                tagsForMapping: [],
                                typingTag: ""
                              });
                            }
                          }}
                        >
                          <TinyTag subject={e.target} notClickable={true} />
                        </TinyTagHolder>
                      );
                    })}
                  </Suggestions>
                  <PageTurner>
                    <RedButton
                      onClick={() => {
                        this.setState({
                          status: "tags",
                          tagsPayload: [],
                          titlePayload: "",
                          descPayload: ""
                        });
                      }}
                    >
                      Start Over
                    </RedButton>
                    {this.state.tagsPayload.length >= 1 ? (
                      <Button
                        onClick={() => {
                          this.setState({ status: "title" });
                        }}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <GrayButton>Next Step</GrayButton>
                    )}
                  </PageTurner>
                </Container>
              </Page>
            </LoadingWraper>
          </Layout2>
        </>
      );
    } else if (this.state.status === "title") {
      return (
        <>
          <Layout2>
            <Page>
              <Container>
                <CurrentStep>
                  <Option onClick={() => this.setState({ status: "tags" })}>
                    Tags
                  </Option>
                  <Active onClick={() => this.setState({ status: "title" })}>
                    Title
                  </Active>
                  <Option onClick={() => this.setState({ status: "desc" })}>
                    Description
                  </Option>
                  <Option onClick={() => this.setState({ status: "review" })}>
                    Review
                  </Option>
                </CurrentStep>
                <Head>What’s your question title?</Head>
                <Help>
                  Your title helps people quickly understand what your question
                  is about so they can answer it.
                </Help>
                <Tutorial>
                  <Identify>
                    Identify your tags by completing the sentence, “My question
                    is about…”
                  </Identify>
                  <Example>For example:</Example>
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z" />
                    </svg>
                    Say “Is there an R function for finding the index of an
                    element in a vector?”
                  </P>
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z" />
                    </svg>
                    Don’t say “Please help with R”
                  </P>
                  <br />
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z" />
                    </svg>
                    Say “How to fix ‘Headers already sent’ error in PHP”
                  </P>
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z" />
                    </svg>
                    Don’t say “PHP error: Why isn’t this working?”
                  </P>
                </Tutorial>
                <TagBar>Title</TagBar>
                <SearchBoxNotForTags
                  value={this.state.titlePayload}
                  onChange={e =>
                    this.setState({ titlePayload: e.target.value })
                  }
                />
                <PageTurner>
                  <Button
                    onClick={() => {
                      this.setState({ status: "tags" });
                    }}
                  >
                    Previous Step
                  </Button>
                  {this.state.titlePayload.length >= 1 ? (
                    <Button
                      onClick={() => {
                        this.setState({ status: "desc" });
                      }}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <GrayButton>Next Step</GrayButton>
                  )}
                </PageTurner>
              </Container>
            </Page>
          </Layout2>
        </>
      );
    } else if (this.state.status === "desc") {
      return (
        <>
          <Layout2>
            <Page>
              <Container>
                <CurrentStep>
                  <Option onClick={() => this.setState({ status: "tags" })}>
                    Tags
                  </Option>
                  <Option onClick={() => this.setState({ status: "title" })}>
                    Title
                  </Option>
                  <Active onClick={() => this.setState({ status: "desc" })}>
                    Description
                  </Active>
                  <Option onClick={() => this.setState({ status: "review" })}>
                    Review
                  </Option>
                </CurrentStep>
                <Head>Tell us more about your question</Head>
                <Help>
                  Your description gives people the information they need to
                  help you answer your question.
                </Help>
                <TextSpot
                  dataStore={this.handleChange}
                  text={this.state.descPayload}
                />
                <PageTurner>
                  <Button
                    onClick={() => {
                      this.setState({ status: "title" });
                    }}
                  >
                    Previous Step
                  </Button>
                  {this.state.descPayload.length >= 1 ? (
                    <Button
                      onClick={() => {
                        this.setState({ status: "review" });
                      }}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <GrayButton>Next Step</GrayButton>
                  )}
                </PageTurner>
              </Container>
            </Page>
          </Layout2>
        </>
      );
    } else if (this.state.status === "review") {
      return (
        <>
          <Layout2>
            <Page>
              <Container>
                <CurrentStep>
                  <Option onClick={() => this.setState({ status: "tags" })}>
                    Tags
                  </Option>
                  <Option onClick={() => this.setState({ status: "title" })}>
                    Title
                  </Option>
                  <Option onClick={() => this.setState({ status: "desc" })}>
                    Description
                  </Option>
                  <Active onClick={() => this.setState({ status: "review" })}>
                    Review
                  </Active>
                </CurrentStep>
                <Head>Review your question</Head>
                <Help>
                  Almost there! Let’s give your question one more look. And
                  don’t worry—you can edit your question after it’s posted, too.
                </Help>
                <Tutorial>
                  <Identify>
                    Identify your tags by completing the sentence, “My question
                    is about…”
                  </Identify>
                  <Example>For example:</Example>
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <Check d="M16 4.41L14.59 3 6 11.59 2.41 8 1 9.41l5 5z" />
                    </svg>
                    Format your code: SELECT * FROM Users WHERE Id = 1;
                  </P>
                  <P>
                    <svg
                      aria-hidden="true"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                    >
                      <X d="M15 4.41L13.59 3 9 7.59 4.41 3 3 4.41 7.59 9 3 13.59 4.41 15 9 10.41 13.59 15 15 13.59 10.41 9z" />
                    </svg>
                    Don’t include slang or shorthand: “u can’t bc it returns -1”
                  </P>
                </Tutorial>
                <TagBar>Title</TagBar>
                <SearchBoxNotForTags
                  value={this.state.titlePayload}
                  onChange={e =>
                    this.setState({ titlePayload: e.target.value })
                  }
                />
                <TextSpot
                  dataStore={this.handleChange}
                  reset={this.state.toggle}
                  text={this.state.descPayload}
                />
                <TagBar>Tags</TagBar>
                <DualBox>
                  <HiddenTags>
                    {this.state.tagsPayload.map(e => {
                      return (
                        <BadTag
                          onClick={() => {
                            this.removeTag(e);
                          }}
                        >
                          <TinyTag subject={e} x={true} notClickable={true} />
                        </BadTag>
                      );
                    })}
                  </HiddenTags>
                  <TagBox
                    value={this.state.typingTag}
                    onChange={value => this.grabRelated(value)}
                  />
                </DualBox>
                <Suggestions>
                  {this.state.tagsForMapping.map(e => {
                    return (
                      <TinyTagHolder
                        onClick={() => {
                          if (!this.state.tagsPayload.includes(e.target)) {
                            this.setState({
                              tagsPayload: [
                                ...this.state.tagsPayload,
                                e.target
                              ],
                              typingTag: ""
                            });
                          }
                        }}
                      >
                        <TinyTag subject={e.target} notClickable={true} />
                      </TinyTagHolder>
                    );
                  })}
                </Suggestions>
                <PageTurner>
                  <RedButton
                    onClick={async () => {
                      await this.setState({
                        tagsPayload: [],
                        titlePayload: "",
                        descPayload: "",
                        status: "tags"
                      });
                      this.setState({ descPayload: "" });
                    }}
                  >
                    Discard
                  </RedButton>
                  <Button onClick={this.submitQuestion}>Submit Question</Button>
                </PageTurner>
              </Container>
            </Page>
          </Layout2>
        </>
      );
    }
  }
}
const RedButton = styled.button`
  ${blueButton()};
  color: #9c1724;
  height: fit-content;
  background: none;
  border: none;
  box-shadow: none;
  cursor: pointer;
  :hover {
    background: #fdf3f4;
    box-shadow: none;
    color: #9c1724;
  }
`;
const PageTurner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const BadTag = styled.div`
  width: fit-content;
  height: fit-content;
`;
const TagBox = styled(SearchBar)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  max-height: 50px;
  margin-left: 0;
  border-left: none;
  width: available;
  :focus {
    box-shadow: none;
    outline: none;
    border: none;
    /* border-color: transparent; */
  }
`;
const DualBox = styled.div`
  flex-wrap: nowrap;
  display: flex;
  max-height: 40px;
  width: 100%;
  display: flex;
  border-radius: 3px;
  :focus-within {
    outline: none;
    /* border: 1px solid #66bfff; */
    border: none;
    border-color: transparent;

    box-shadow: 0 0 0 4px rgba(0, 149, 256, 0.15);
  }
`;
const HiddenTags = styled.div`
  display: flex;
  max-height: 50px;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-right: 0;
  border-right: none;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  :focus {
    /* border-color: transparent; */
    box-shadow: none;
    border-top-right-radius: 0;
    outline: none;
    border: 1px solid lightgray;
  }
  :active {
    border: none;
  }
`;
const SearchBoxNotForTags = styled(SearchBar)`
  max-height: 50px;
  margin-left: 0;
  width: 100%;
  margin-bottom: 20px;
`;
const TinyTagHolder = styled.div`
  height: 30px;
  width: fit-content;
`;
const Suggestions = styled.div`
  padding: 20px;
  display: flex;
  position: relative;
  border-radius: 3px;
  left: 6px;
  box-sizing: border-box;
  width: 100%;
  /* height: 200px; */
`;
const TextSpot = styled(Quill)`
  width: 100%;
`;
const Button = styled.button`
  margin: 10px;
  float: right;
  ${blueButton()};
  cursor: pointer;
`;
const GrayButton = styled.button`
  border: 1px solid transparent;
  margin: 10px;
  float: right;
  background-color: #afc2cf;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 8px 10px 8px 10px;
  outline: none;
  font-size: 13px;
  white-space: nowrap;
`;
const Head = styled(P)`
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 30px;
`;
const Help = styled(P)`
  margin: 15px;
  text-align: left;
  width: 100%;
  margin-bottom: 30px;
`;
const X = styled.path`
  fill: red;
`;
const Identify = styled(P)`
  text-align: left;
  width: 100%;
  font-weight: bold;
`;
const Check = styled.path`
  fill: green;
`;
const Example = styled(P)`
  font-size: 14px;
  margin: 15px;
`;
const Active = styled(P)`
  margin: 10px;
  ${blueButton()};
  width: fit-content;
  height: fit-content;
  border-radius: 50px;
  cursor: pointer;
`;
const TagBar = styled(P)`
  width: 100%;
  font-weight: bold;
  text-align: left;
  position: relative;
  padding: 10px;
`;

const Option = styled(P)`
  cursor: pointer;
  margin: 10px;
  color: #07c;
  padding: 8px 10px 8px 10px;
  :hover {
    border-radius: 50px;
    /* box-shadow: inset 0 1px 0 #66bfff; */
    padding: 8px 10px 8px 10px;
    background: #e1f0fc;
  }
`;
const CurrentStep = styled(P)`
  ${flex()}
  margin: 20px;
`;
const Tutorial = styled.div`
  text-align: left;
  border: 1px #d6d9dc solid;
  border-radius: 3px;
  margin-bottom: 24px;
  padding: 24px;
  background-color: #fafafb;
`;
const Container = styled.div`
  text-align: left;
  width: 620px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const Page = styled.div`
  margin: 10px;
  text-align: left;
  width: 100%;
  height: 100%;
  ${flex()};
  position: relative;
`;

function mapStateToProps(reduxStore) {
  return { ...reduxStore };
}

export default connect(mapStateToProps)(QuestionCreator);

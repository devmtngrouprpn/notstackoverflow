import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {
    P,
    borderGray,
    blueButton,
} from "../../utilites/index";
import axios from "axios";
import { connect } from 'react-redux';
import { timeFunction } from '../../test/Logic'

class CommentSection extends Component {
    state = {
        edit: false,
        test: '',
        loading: false,
        commentDisplay: []
    };
    upvote = async (id, owner, sourceType) => {
        console.log({
            user_id: this.props.global.user.auth_id, source_id: id, source_type: 'comment', value: 1, owner_id: owner
        })
        if (this.props.global.user.auth_id) {
            await axios.post('/api/question/vote', {
                user_id: this.props.global.user.auth_id, source_id: id, source_type: 'comment', value: 1, owner_id: owner
            })
            this.reset();
        } else {
            alert('please log in to vote')
        }
    };
    componentDidMount = async () => {
        let buffer = []
        if (this.props.comments) {
            await Promise.all(
                this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?id=${e}`);
                    console.log(res.data.comment_creation_timestamp, 'woot')
                    buffer.push(<Comment key={e}>
                        <Rep>{res.data.votes || 0} {this.props.global.user.reputation >= 15 ? <Svg onClick={() => this.upvote(res.data.comment_id, res.data.source_id, e.source_type)} aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="15" height="20" viewBox="0 0 36 36"><Path d="M2 26h32L18 10z"></Path></Svg>
                            : <></>}</Rep>
                        {res.data.content}
                        <UserName to={`/users/${res.data.username}`}> - {res.data.username}</UserName>
                        <TimeStamp>{res.data.comment_creation_timestamp.slice(0, 10)}</TimeStamp>
                    </Comment>)
                })
            )
            await this.setState({ commentDisplay: buffer.sort((a, b) => a.key - b.key) })
            console.log(this.state.commentDisplay, 'state')
        }
    };
    reset = async () => {
        let buffer = []
        if (this.props.comments) {
            await Promise.all(
                this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?id=${e}`);
                    console.log(res.data, 'comment return')
                    buffer.push(<Comment key={e}>
                        <Rep>{res.data.votes || 0} {this.props.global.user.reputation >= 15 ? <Svg onClick={() => this.upvote(res.data.comment_id, res.data.source_id, e.source_type)} aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="15" height="20" viewBox="0 0 36 36"><Path d="M2 26h32L18 10z"></Path></Svg>
                            : <></>}</Rep>
                        {res.data.content}
                        <UserName to={`/users/${res.data.username}`}> - {res.data.username}</UserName>
                        <TimeStamp>{res.data.comment_creation_timestamp.slice(0, 10)}</TimeStamp>
                    </Comment>)
                })
            )
            await this.setState({ commentDisplay: buffer.sort((a, b) => a.key - b.key) })
            console.log(this.state.commentDisplay, 'state')
        }
    }
    reRun = async () => {
        let buffer = []
        if (this.props.comments) {
            await Promise.all(
                this.props.comments.map(async e => {
                    let res = await axios.get(`/api/comment/indv?id=${e}`);
                    console.log(res.data, 'comment return')
                    buffer.push(<Comment>{res.data.content}</Comment>)
                })
            )
            this.setState({ commentDisplay: buffer })
            console.log('done')
        }
    };

    submit = async () => {
        if (this.props.global.user.auth_id) {
            console.log({
                user_id: this.props.global.user.auth_id, content: this.state.text, source_id: this.props.id, source_type: this.props.type
            })
            let res = await axios.post('/api/comment', {
                user_id: this.props.global.user.auth_id, content: this.state.text, source_id: this.props.id, source_type: this.props.type
            })
            console.log('submited')
            // this.props.reset()
            this.reRun()
            this.setState({ edit: false })
        } else { alert('please log in to post a comment') }

    }
    render() {
        console.log('buffer', this.state.commentDisplay)
        console.log(this.props.comments, 'comments')
        return (
            // <LoadingWraper loading={this.state.loading}>
            <Shell>
                <Comments>
                    {this.state.commentDisplay}
                </Comments>
                {this.state.edit ?
                    <Wrap>
                        <Text onChange={(e) => { this.setState({ text: e.target.value }) }} />
                        <SubmitComment onClick={this.submit}>Add Comment</SubmitComment>
                    </Wrap>
                    :
                    <AddComment onClick={() => { this.setState({ edit: true }) }}>add a comment</AddComment>}

            </Shell>
            // {/* </LoadingWraper> */ }
        );
    }
}
function mapStateToProps(reduxStore) {
    return { ...reduxStore };
}
export default connect(mapStateToProps)(CommentSection);
const TimeStamp = styled.div`
color: rgb(145, 153, 161);
font-size: 13px;
margin-left: 10px;
`
const Rep = styled.div`
color: rgb(145, 153, 161);
margin-right: 15px;
font-size:13px;
`
const UserName = styled(Link)`
text-decoration:none;

`
const Comment = styled.div`
display:flex;
align-items:center;
margin-top:5px;
padding-top:5px;
margin-bottom: 5px;
padding-bottom:5px;
border-bottom: 1px solid ${borderGray};

`
const SubmitComment = styled.button`
${blueButton()}
height:fit-content;
width:fit-content;
margin:5px;
`
const Wrap = styled.div`
width:100%;
display:flex;
`
const Text = styled.textarea`
width:100%;
min-height:80px;
overflow:auto;
`
const Comments = styled.div`
`
const AddComment = styled.div`
color: #848d95;
padding: 0 3px 2px;
cursor:pointer;
font-size:13px;
:hover{
    color: #3af;
}
`

const Shell = styled(P)`
border-top: 1px solid ${borderGray};
width:100%;
margin: 25px 0 25px 0px;
padding:5px 0 5px 0;

    `
const Svg = styled.svg`
color: rgb(187, 192, 196);
cursor:pointer;
`

const Path = styled.path`
    /* transform: rotate(45deg); */
    fill: rgb(187, 192, 196);
    
    `
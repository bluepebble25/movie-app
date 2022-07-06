import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input } from 'antd';

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector(state => state.user);

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onChangeHandler = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      movieId: props.comment.movieId,
      responseTo: props.comment._id // 답글을 달 댓글의 원 주인의 _id
    };

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success) {
          setCommentValue("");
          setOpenReply(false);
          props.refreshComments(response.data.result);
        } else {
          alert('댓글을 저장하지 못했습니다.');
        }
      });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && 
        <form style={{ display: 'flex' }} onSubmit={onSubmit} >
          <TextArea
              style={{ width: '100%', borderRadius: '5px' }}
              onChange={onChangeHandler}
              value={CommentValue}
              placeholder="댓글을 남겨주세요"
          />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</Button>
        </form>
      }
    </div>
  )
}

export default SingleComment
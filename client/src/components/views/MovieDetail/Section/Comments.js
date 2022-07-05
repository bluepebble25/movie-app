import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Comments(props) {
  const user = useSelector(state => state.user);
  const movieId = props.movieId;

  const [CommentValue, setCommentValue] = useState("");

  const onChangeHandler = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      movieId: movieId
    };

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if(response.data.success) {
          setCommentValue("");
        } else {
          alert('댓글을 저장하지 못했습니다.');
        }
      });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit} >
        <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onChangeHandler}
            value={CommentValue}
            placeholder="댓글을 남겨주세요"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit} >Submit</button>
      </form>
    </div>
  )
}

export default Comments
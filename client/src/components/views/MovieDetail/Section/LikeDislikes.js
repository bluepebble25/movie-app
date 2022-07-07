import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import axios from 'axios'

function LikeDislikes(props) {

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {};

  if(props.movieId) {
    variable = { movieId: props.movieId, userId: props.userId }
  } else {
    variable = { commentId: props.commentId , userID: props.userId }
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variable)
      .then(response => {
        if(response.data.success) {
          setLikes(response.data.likes.length);

          response.data.likes.map(like => {
            if(like.userId === props.userId) {
              setLikeAction(true);
            }
          })
        } else {
          alert('Likes 정보를 가져오는데 실패했습니다.')
        }
      });

      axios.post('/api/like/getDislikes', variable)
      .then(response => {
        if(response.data.success) {
          setDislikes(response.data.dislikes.length);

          response.data.dislikes.map(like => {
            if(like.userId === props.userId) {
              setDisLikeAction(true);
            }
          })
        } else {
          alert('DisLikes 정보를 가져오는데 실패했습니다.')
        }
      });

  }, [])
  
  const onLike = () => {

    if(LikeAction === null) {
      axios.post('/api/like/upLike', variable)
        .then(response => {
          if(response.data.success) {
            setLikes(Likes + 1);
            setLikeAction(true);

            // like가 null이어도 disLike가 이미 눌려있어서 그럴 수도 있기 때문에 disLike 여부도 확인한다.
            if(DisLikeAction !== null) {
              setDisLikeAction(null);
              setDislikes(Dislikes - 1);
            }

          } else {
            alert('Like를 올리는데 실패했습니다.');
          }
        });

    }
  };

  const onDisLike = () => {
    
    if(DisLikeAction === null) {
      axios.post('/api/like/upDisLike', variable)
        .then(response => {
          if(response.data.success) {
            setDislikes(Dislikes + 1);
            setDisLikeAction(true);

            // like가 null이어도 disLike가 이미 눌려있어서 그럴 수도 있기 때문에 disLike 여부도 확인한다.
            if(LikeAction !== null) {
              setLikeAction(null);
              setLikes(Likes - 1);
            }

          } else {
            alert('Dislike를 올리는데 실패했습니다.');
          }
        });
    };
  }

  return (
    <div>
      <span key="comment-basic-like" >
        <Tooltip title="Like">
          <Icon type="like"
                theme={LikeAction ? 'filled' : 'outlined'}
                onClick={onLike}
          />
        </Tooltip>
      </span>
      <span style={{ padingLeft: '8px', cursor: 'auto' }}> {Likes} </span>

      <span key="comment-basic-dislike" >
        <Tooltip title="Dislike">
          <Icon type="dislike"
                theme={DisLikeAction ? 'filled' : 'outlined'}
                onClick={onDisLike}
          />
        </Tooltip>
      </span>
      <span style={{ padingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
    </div>
  )
  
}

export default LikeDislikes
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
  Box,
  Avatar,
  CardHeader,
  Chip,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/Favorite';
import ThumbUpAltOutlined from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?.googleId || user?.result?._id;

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const hasLiked = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLiked) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <Box>
        <CardHeader 
          className={classes.cardHeader}
          avatar={
            <Avatar className={classes.purple}>
              {post.name.charAt(0)}
            </Avatar>
          }
          action={
            (user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <div className={classes.overlay2}>
                <Button
                  style={{ color: 'white' }}
                  size='small'
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(post._id);
                  }}
                >
                  <MoreVertIcon fontSize='medium' />
                </Button>
              </div>
            )
          }
          title={post.name}
          subheader={<Typography variant='body2'>
          {moment(post.createdAt).fromNow()}
        </Typography>}
        />
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <CardMedia
            className={classes.media}
            image={post.selectedFile}
            title={post.title}
          />
            <Typography className={classes.title} variant='h5' style={{ marginTop: '10px' }}>
              {post.title}
            </Typography>
          <div className={classes.details}>
            {post.tags.map((tag) => {
              return <Chip className={classes.chips} label={tag} color='primary' />
            })}
          </div>
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
      </Box>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => dispatch(deletePost(post._id, navigate))}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;

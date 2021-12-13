import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Chip,
  Container,
} from '@material-ui/core';
import moment from 'moment';

import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      // This will get us recommended posts based on similar tags
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Container component='main' maxWidth='lg'>
        <Paper elevation={6} className={classes.loadingPaper} style={{ marginTop: '1rem' }}>
          <CircularProgress size={'7rem'} />
        </Paper>
      </Container>
    );
  }

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
  };

  // The current post will appear in the list so this will filter it out
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Container component='main' maxWidth='lg'>
      <Paper
        style={{ padding: '20px', borderRadius: '15px', marginTop: '1rem' }}
        elevation={6}
      >
        <div className={classes.card}>
          <div className={classes.section} style={{ flex: '0.7' }}>
            <Typography variant='h3' component='h2'>
              {post.title}
            </Typography>
            {post.tags.map((tag) => {
              return (
                <Chip className={classes.chips} label={tag} color='primary' />
              );
            })}

            <Typography gutterBottom variant='body1' component='p'>
              {post.message}
            </Typography>
            <Typography variant='h6'>Created by: {post.name}</Typography>
            <Typography variant='body1'>
              {moment(post.createdAt).fromNow()}
            </Typography>
            <div className={classes.imageSection}>
              <img
                className={classes.media}
                src={
                  post.selectedFile ||
                  'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                }
                alt={post.title}
              />
            </div>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
          {recommendedPosts.length && (
            <div className={classes.section} style={{ flex: '0.3' }}>
              <Typography gutterBottom variant='h5'>
                You might also like:
              </Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {recommendedPosts.map(
                  ({ title, message, name, likes, selectedFile, _id }) => (
                    <div
                      style={{ margin: '20px', cursor: 'pointer' }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterBottom variant='h6'>
                        {title}
                      </Typography>
                      <Typography gutterBottom variant='subtitle2'>
                        {name}
                      </Typography>
                      <Typography gutterBottom variant='subtitle2'>
                        {message}
                      </Typography>
                      <Typography gutterBottom variant='subtitle1'>
                        Likes: {likes.length}
                      </Typography>
                      <img src={selectedFile} alt={`${title}`} width='200px' />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default PostDetails;

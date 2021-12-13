import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const { posts } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });

  const post = currentId ? posts.find((p) => p._id === currentId) : null;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please sign in to post and like bloops!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Editting' : 'Creating'} a Bloop
        </Typography>
        <Grid style={{marginTop: 0}} container spacing={3} alignItems='center'>
          <Grid item xs={12} md={5}>
            <TextField
              name='title'
              variant='outlined'
              label='Title'
              fullWidth
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <div className={classes.chipTextField}>
              <ChipInput
                name='tags'
                variant='outlined'
                label='Tags'
                fullWidth
                value={postData.tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
              />
            </div>
            <div className={classes.fileInput}>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              name='message'
              variant='outlined'
              label='Message'
              fullWidth
              multiline
              rows={6}
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
            >
              Submit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;

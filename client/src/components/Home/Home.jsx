import React, { useState, useEffect } from 'react';
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

// Components
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();

  // Query is where we get the page info from
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags) {
      // arrays should be converted to strings before being passed to backend
      const stringedTags = tags.join(',');
      dispatch(getPostsBySearch({ search, tags: stringedTags }));
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${stringedTags}`
      );
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (targetTag) =>
    setTags(tags.filter((tag) => tag !== targetTag));

  return (
    <Grow in>
      <Container maxWidth='lg'>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='center'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                  <TextField
                    name='search'
                    variant='outlined'
                    label='Search Bloops'
                    fullWidth
                    value={search}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <ChipInput
                    fullWidth
                    variant='outlined'
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label='Search Tags'
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    className={classes.searchButton}
                    color='primary'
                    variant='contained'
                    onClick={searchPost}
                    fullWidth
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
          </Grid>
          <Grid item xs={12}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

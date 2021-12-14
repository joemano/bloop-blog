import { configureStore } from '@reduxjs/toolkit';

import { bloopApi } from '../services/api';

export default configureStore({
  reducer: {
    [bloopApi.reducerPath]: bloopApi.reducer
  }
});
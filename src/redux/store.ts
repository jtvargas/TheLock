import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// reducers
import {
  gameStateReducer,
  GAME_STATE_ACTIONS,
  GAME_STATE_SELECTORS,
  useGameState,
} from './GameState';

const persistAppRatingConfig = {
  key: 'gameState',
  storage: AsyncStorage,
  // No need to persist the playScene, just the history and the sceneConfig
  blacklist: ['playScene'],
};
const persistedGameStateReducer = persistReducer(
  persistAppRatingConfig,
  gameStateReducer,
);

export const store = configureStore({
  reducer: {
    gameState: persistedGameStateReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export {
  GAME_STATE_ACTIONS,
  GAME_STATE_SELECTORS,
  useGameState,
  gameStateReducer,
};

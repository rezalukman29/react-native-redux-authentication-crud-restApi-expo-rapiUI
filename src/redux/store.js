import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
;
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";





const rootReducer = combineReducers({ 
    auth:  authReducer,
    post: postReducer
    
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(
  persistedReducer, 
 applyMiddleware(thunk)
);
export const persistor = persistStore(store);
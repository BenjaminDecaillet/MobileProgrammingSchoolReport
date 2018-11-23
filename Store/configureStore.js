import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import subjects from './Reducers/subjectReducer';
import grades from './Reducers/gradeReducuer';
import thunk from 'redux-thunk';

const rootReducer = () => (
    combineReducers({ toggleFavorite, subjects, grades })
);

const Store = createStore(
    rootReducer(),
    applyMiddleware(thunk)
);

export default Store;
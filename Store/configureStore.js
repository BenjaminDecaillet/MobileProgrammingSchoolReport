import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer';
import subjects from './Reducers/subjectReducer';
import grades from './Reducers/gradeReducuer';
import student from './Reducers/studentReducer';
import thunk from 'redux-thunk';

const rootReducer = () => (
    combineReducers({ toggleFavorite, subjects, grades, student })
);

const Store = createStore(
    rootReducer(),
    applyMiddleware(thunk)
);

export default Store;
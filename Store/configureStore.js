import { createStore, combineReducers, applyMiddleware } from 'redux';
import subjects from './Reducers/subjectReducer';
import grades from './Reducers/gradeReducuer';
import student from './Reducers/studentReducer';
import thunk from 'redux-thunk';

const rootReducer = () => (
    combineReducers({ subjects, grades, student })
);

const Store = createStore(
    rootReducer(),
    applyMiddleware(thunk)
);

export default Store;
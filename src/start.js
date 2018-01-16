import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';

// import reducer from './reducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { Provider } from 'react-redux';

//Reducers
import teacherReducer from './teacher/reducer';
import studentReducer from './student/reducer';

//Component Import
import Welcome from './auth/welcome';
import Main from './auth/main';
import Registration from './auth/registration';
import Login from './auth/login';
import { composeWithDevTools } from 'redux-devtools-extension';

//Student Component Imports
import StudentApp from './student/app';
import StudentDashboard from './student/dashboard';
import AssignmentView from './student//components/AssignmentView';

//Teacher Component Imports
import TeacherApp from './teacher/views/app';
import TeacherDashboard from './teacher/views/dashboard';
import TeacherCourses from './teacher/views/courses';
import TeacherAssignments from './teacher/views/assignments';
import TeacherNewAssignment from './teacher/views/newAssignment.js';




// Redux Setup
// when we edit the state object in teacherReduer only the teacher part of state will change. 
// It will be unable to overwrite anything in studetns.
const reducers = combineReducers({
    teachers: teacherReducer,
    students: studentReducer,
});

// store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)));


// loggedOutRouter component with routhes
const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={Registration} />
            <Route path="/login" component={Login} />
        </Route>
    </Router>
);

// studentRouter component with routhes
const studentRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/student" component={StudentApp}>
                <IndexRoute component={StudentDashboard} />
                <Route path="/student/assignment/:id" component={AssignmentView} />
            </Route>
        </Router>
    </Provider>
)

// teacherRouter component with routhes
const teacherRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/teacher" component={TeacherApp}>
                <Route path="/teacher/courses" component={TeacherCourses} />
                <Route path="/teacher/assignments" component={TeacherAssignments} />
                <Route path="/teacher/new/assignment" component={TeacherNewAssignment} />
                <IndexRoute component={TeacherDashboard} />
            </Route>
        </Router>
    </Provider>
)

// route
// condition if location.pathname have same path as /student,
// in console shows text "using student router" and 
// route has value of studentRouter
let route = loggedOutRouter;

if (location.pathname == '/student') {

    console.log('using student router');
    route = studentRouter;

} else if (location.pathname == '/teacher') {

    console.log('using teacher router');
    route = teacherRouter;

}

ReactDOM.render(
    route,
    document.querySelector('main')
);

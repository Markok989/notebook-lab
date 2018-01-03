import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

// import reducer from './reducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reduxPromise } from 'redux-promise';
import { Provider } from 'react-redux';

// Reducers
import teacherReducer from './teacher/reducer';
import studentReducer from './student/reducer';

// components
import Welcome from './auth/welcome';
import Main from './auth/main'
import Registration from './auth/registration';

// Students components
import StudentApp from './student/app';
import StudentDashboard from './student/dashboard';

// Teachers components
import TeacherApp from './teacher/views/app';
import TeacherDashboard from './teacher/views/dashboard';
import TeacherCourses from './teacher/views/courses';

import { composeWithDevTools } from 'redux-devtools-extension';


// Redux Setup
// when we edit the state object in teacherReduer only the teacher part of state will change. 
// It will be unable to overwrite anything in studetns.
const reducers = combineReducers({
    teachers: teacherReducer,
    students: studentReducer,
});

// store
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxPromise))
);


// loggedOutRouter component with routhes
const loggedOutRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={Main} />
            <Route path="/register" component={Registration} />
        </Route>
    </Router>
);

// studentRouter component with routhes
const studentRouter = (
    <Provider store={store}>{/* Provider use store*/}
        <Router history={browserHistory}>
            <Route path="/" component={StudentApp}>
                <IndexRoute component={StudentDashboard} />
            </Route>
        </Router>
    </Provider>
)

/*
function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
*/

//
//
//
// const authRouter = (
//     <Router history={hashHistory}>
//         <Route path="/" component={HelloWorld}>
//
//         </Route>
//     </Router>
// );
//
// const appRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={HelloWorld}>
//             <IndexRoute component={HelloWorld} />
//             <Route path='friends' component={HelloWorld} />
//             <Route path="profile/:id" component={HelloWorld} />
//         </Route>
//     </Router>
// );
//
//
// let route = appRouter;
// if (location.pathname == '/welcome/') {
//     route = authRouter;
// }
// const loggedOutRouter = (
//     <Router history={browserHistory}>
//         <Route path="/registration" component={Identification}>
//             <Route path="/login" component={Login}/>
//             <IndexRoute component={Registration}/>
//         </Route>
//     </Router>
// )
//
// const studentRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={StudentDashboard}/>
//         </Route>
//     </Router>
// )
//

// teacherRouter component with routhes

const teacherRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/teacher" component={TeacherApp}>
                <Route path="/teacher/courses" component={TeacherCourses} />
                <IndexRoute component={TeacherDashboard} />
            </Route>
        </Router>
    </Provider>
)

//
// <Provider store={store}>
//     <Router history={browserHistory}>
//         <Route path="/teacher" component={TeacherApp}>
//             <IndexRoute component={TeacherDashboard}/>
//         </Route>
//     </Router>
// </Provider>
//
// let route = loggedOutRouter;
// if (location.pathname == '/student') {
//     route = studentRouter;
// } else if (location.pathname == '/teacher') {
//     route = teacherRouter;
// }


// route
// condition if location.pathname have same path as /student,
// in console shows text "using student router" and 
// route has value of studentRouter

let route = loggedOutRouter;
if (location.pathname == '/student') {
    console.log('using student router');
    route = studentRouter;
} else if (location.pathname == '/teacher') {
    route = teacherRouter;
}

ReactDOM.render(
    route,
    document.querySelector('main')
);
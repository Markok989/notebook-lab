import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';

// components
import Welcome from './auth/welcome';
import Registration from './auth/registration';
import StudentApp from './student/app';
import StudentDashboard from './student/dashboard';
import TeacherApp from './teacher/views/app';
import TeacherDashboard from './teacher/views/dashboard';


// const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)));

// loggedOutRouter component with routhes
const loggedOutRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={Welcome}>
            <IndexRoute component={Registration} />
        </Route>
    </Router>
);

// studentRouter component with routhes
const studentRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={StudentApp}>
            <IndexRoute component={StudentDashboard} />
        </Route>
    </Router>
)

// function HelloWorld() {
//    return (
//        <div>Hello, World!</div>
//   );
//}
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
// const teacherRouter = (
//     <Router history={browserHistory}>
//         <Route path="/" component={AdminApp}>
//             <Route path="/admin/profile" component={AdminProfile}/>
//
//             <IndexRoute component={AdminHome}/>
//         </Route>
//     </Router>
// )
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
    console.log("using student router");
    route = studentRouter;
}

ReactDOM.render(
    <HelloWorld />,
    route,
    document.querySelector('main')
);
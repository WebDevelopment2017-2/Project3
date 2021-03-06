import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ProjectsView from './ListView/ProjectsView.jsx'
import IdeasView from './ListView/IdeasView.jsx'
import CreateProject from './Creators/CreateProject.jsx'
import SingleProject from './SingleView/SingleProject.jsx'
import { Redirect } from 'react-router';
import CreateIdea from './Creators/CreateIdea.jsx'

const browserHistory = createBrowserHistory();

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div>
      <Router history={browserHistory}>
        <div>
          <Route exact path="/" component={MainRedirect}/>
          <Route exact path="/projects" component={ProjectsView}/>
          <Route exact path="/projects/create" component={CreateProject}/>
          <Route exact path="/ideas" component={IdeasView}/>
          <Route path="/projects/view/:name" component={SingleProject}/>
          <Route exact path="/ideas/create" component={CreateIdea}/>
          <Route path="/pro" component={NotFound}/>
        </div>
      </Router>
      </div>
    );
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

const MainRedirect = () => (
  <Redirect push to="/projects"/>);

export default App;
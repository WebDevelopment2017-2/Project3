import React, {Component, PropTypes} from 'react';
import Task from '../SmallElements/Task.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '/imports/api/tasks.jsx';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import NavBar from '../SmallElements/NavBar.jsx'
import Captcha from "../SmallElements/Captcha";

// ProjectsView component - represents the whole app
class ProjectsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderWords() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Captcha/>
        <div className="row my-4">
          <div className="col-lg-4">
            <img className="img-fluid rounded" src="https://i.ibb.co/4ZsnhDC/asd.jpg" alt=""/>
          </div>
          <div className="col-lg-8">
            <br/>
            <h1>Diccionario de la lengua indígena</h1>
            <i id="sl">Haz parte de la cultura inclusiva Uniandina</i>
            <p>El proyecto tiene como finalidad que las personas comprendan el significado que tienen un conjunto de palabras, usadas a menudo en la cotidianidad, en la cultura indígena.
              ​
              ​<br/>
              <b>¿En qué consiste el proyecto?</b>
              ​​<br/>
              En el menú Palabras aparecerá un conjunto de términos que día a día nosotros usamos, con su significado para los indígenas y con una imagen que representa a dicha palabra.
              Dado que nuestro objetivo es conocer qué tanto conocen las personas lo que representan esos términos para esa cultura, en la parte inferior de cada palabra aparecerán dos botones para que indiques si realmente conocías o no su significado.
              ​​<br/>
              <b>¿Qué ocurre si no sabías? </b>
              ​​<br/>
              <b>Comenta</b> de manera breve lo que crees que podría significar para los indígenas. Como en todo, tienes derecho a equivocarte. </p>
          </div>
        </div>

        <div className="card text-white bg-secondary my-4 text-center">
          <div className="card-body" id="midbar">
            <span className="text-white m-0">¡Mira la lista de palabras más pupulares entre estudiantes! </span>
          </div>
        </div>

        <div className="row">
          {this.renderWords()}
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, ProjectsView);
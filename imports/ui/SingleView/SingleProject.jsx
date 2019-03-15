import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import NavBar from '../SmallElements/NavBar.jsx'
import { Redirect } from 'react-router';
import { Comments } from '/imports/api/comments';
import Comment from "../SmallElements/Comment";
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class SingleProject extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0,0);
    this.state = {
      task: props.location.query,
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  renderComments() {

    let filteredTasks = this.props.comments;
    // if (this.state.hideCompleted) {
    //   filteredTasks = filteredTasks.filter(task => !task.checked);
    // }
    return filteredTasks.map((task, i) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      // const showPrivateButton = task.owner === currentUserId;
      return (
        <Comment
          key={i}
          comment={task}
        />
      );
    });
  }

  sendMail() {
      // Client: Asynchronously send an email.
      // Meteor.call(
      //     'sendEmail',
      //     'Alice <dianasbeltran@gmail.com>',
      //     'admin@luisplazas.co',
      //     'Hello from Meteor!',
      //     'This is a test of Email.send.'
      // );
  }

  deleteProject() {
    confirmAlert({
      title: '¿Seguro que quieres borrar esta palabra?',                        // Title dialog
      message: 'Se eliminará la palabra junto con toda su discusión.',               // Message dialog
      // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
      confirmLabel: 'Confirmar',                           // Text button confirm
      cancelLabel: 'Cancelar',                             // Text button cancel
      onConfirm: () => this.submitDelete(),    // Action after Confirm
      onCancel: () => console.log('nothing'),      // Action after Cancel
    })
  }

  submitDelete(){
    let b = this;
    Meteor.call('tasks.remove', this.state.task._id, function (error, result) {
      if (error) {
        Bert.alert( 'Debes iniciar sesión para poder publicar!', 'danger', 'growl-top-right' );
      }
      else{
        b.setState({task:undefined})
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let b = this.state.value;
    Meteor.call('comments.insert', this.state.value, this.state.task._id, function (error, result) {
      if (error) {
        Bert.alert( 'Debes iniciar sesión para poder comentar!', 'danger', 'growl-top-right' );
      }
      else{
        console.log(this.refs)
        b = "";
      }
    });
    console.log(this.refs)
    this.setState({value: b})
    this.forceUpdate();
  }

  render() {
    if (!this.state.task) {
      return <Redirect push to="/projects"/>;
    }
    return (
      <div>
        <NavBar/>
        <div className="container" style={{marginTop:'10px'}}>

          <div className="row">

            {/*<!-- Post Content Column -->*/}
            <div className="col-lg-8">

              {/*<!-- Title -->*/}
              <h1 className="mt-4" style={{fontSize:'64px'}}>{this.state.task.name}</h1>

              {/*<!-- Author -->*/}
              <p className="lead">
                publicada por: {' '+this.state.task.username}
              </p>

              <hr/>

                {/*<!-- Date/Time -->*/}
                <p>Creada: {new Date(this.state.task.createdAt).toDateString()}</p>


                  {/*<!-- Preview Image -->*/}
                  {/*<img className="img-fluid rounded" src={this.state.task.thumbnail} alt="Project image"/>*/}

                    <hr/>

                      {/*<!-- Post Content -->*/}
                      <h3>Definición:</h3><p className="lead">{this.state.task.description}</p>

                      <hr/>

                        {/*<!-- Comments Form -->*/}
                        <div className="card my-4">
                          <h5 className="card-header">Deja un comentario!</h5>
                          <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="txa" style={{color:'white'}}> text</label>
                                <textarea id="txa" value={this.state.value} className="form-control" required rows="3" onChange={(event) => this.setState({value: event.target.value})}></textarea>
                              </div>
                              <button type="submit" className="btn btn-primary" style={{color:'white', backgroundColor:'black'}}>Submit</button>
                            </form>
                          </div>
                        </div>

                        {/*<!-- Single Comment -->*/}
                        {this.renderComments()}
                        {/*<Comment/>*/}
            </div>

            {/*<!-- Sidebar Widgets Column -->*/}
            <div className="col-md-4">

              {/*<!-- Admin Widget -->*/}
              {
                (Meteor.user() && this.state.task.username === Meteor.user().username) ?
                  (
                <div className="card my-4">
                  <h5 className="card-header">Administración</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <a type="submit" onClick={() => this.deleteProject()} id="deleteProjectButt" className="btn-default">Eliminar palabra</a>
                      </div>
                    </div>
                  </div>
                </div>
                  ) : null
              }

                {/*<!-- Participation Widget -->*/}
              { Meteor.user() ?
                (
                <div className="card my-4">
                  <h5 className="card-header">¿Algo no te gusta?</h5>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <a type="submit" href={"mailto:" + Meteor.user().emails[0].address}
                           style={{color:'white', backgroundColor:'black !important', paddingTop: '3px', paddingBottom: '3px', width: '100%' }}
                           className="btn-default">Enviar correo al creador</a>
                      </div>
                    </div>
                  </div>
                </div>
                ) : null
              }

              {/*<!-- Requirements Widget -->*/}
              {/*<div className="card my-4">*/}
                {/*<h5 className="card-header">Requerimientos</h5>*/}
                {/*<div className="card-body">*/}
                  {/*<div className="row">*/}
                    {/*<div className="col-lg-12">*/}
                      {/*<ul className="list-unstyled mb-12">*/}
                        {/*{*/}
                          {/*this.state.task.requirements.map((task,i) => {*/}
                            {/*const currentUserId = this.props.currentUser && this.props.currentUser._id;*/}
                            {/*// const showPrivateButton = task.owner === currentUserId;*/}
                            {/*return (*/}

                                {/*<li className="col-lg-12" style={{textAlign:'justify'}}>*/}
                                  {/*{task}*/}
                                {/*</li>*/}


                            {/*);*/}
                          {/*})*/}
                        {/*}*/}
                      {/*</ul>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            </div>

          </div>
          {/*<!-- /.row -->*/}

        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('comments', Session.get('projectId'));
  return {
    comments: Comments.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Comments.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, SingleProject);
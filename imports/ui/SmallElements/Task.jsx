import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'


// Task component - represents a single todo item
export default class Task extends Component {

  render() {

    const taskClassName = classnames({
      // checked: this.props.task.checked,
      // private: this.props.task.private,
    });

    let description = this.props.task.description;
    if (!description)
      description = this.props.task.andes;
    if (!description)
      description = this.props.task.valle;
    if (!description)
      description = this.props.task.cucuta;
    if (!description)
      description = this.props.task.yopal;
    if (!description)
      description = 'No hay ningún significado';
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h2 className="card-title">{this.props.task.name}</h2>
            <p className="card-text crop">{description}</p>
          </div>
          <div className="card-footer">
            <Link onClick={() => Session.set('projectId', this.props.task._id)} to={{pathname: '/projects/view/' + this.props.task.name, query: this.props.task}} className="btn btn-primary moreInfoButton">Ver discusión</Link>
          </div>
        </div>
      </div>
    );
  }
}

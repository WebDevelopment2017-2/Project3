import React, {Component, PropTypes} from 'react';

export default class Comment extends Component {

  render() {
    return(
      <div className="media mb-4">
        <img className="d-flex mr-3 rounded-circle" width="50" height="50" src={'https://robohash.org/'+this.props.comment.username} alt=""/>
        <div className="media-body">
          <h3 className="mt-0" style={{fontSize:'40px !important'}}>{this.props.comment.username+''}</h3>
          {this.props.comment.text}
        </div>
      </div>
    )
  }
}
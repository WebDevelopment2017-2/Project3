import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
// import AddPlayers from './AddPlayers.js'

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.players = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setPlayers(players) {
    this.players = players
    this.render();
    this.forceUpdate();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    var upperClass = this;
    if (event.target.value === '') {
    } else {
      axios.get('/search/' + event.target.value)
        .then(function (response) {
          upperClass.setPlayers(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
      event.preventDefault();
    }

  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    var upperClass = this;
    axios.get('/search/' + this.state.value)
      .then(function (response) {
        upperClass.setPlayers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-10">
              <input type="text" className="form-control" value={this.state.value}
                     onChange={this.handleChange} placeholder="Type players name"/>
            </div>
            <div className="col-md-1">
              <input type="submit" className="btn btn-primary" value="Buscar término"/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
import React from "react";
import MyContext from "./MyContext";
import { Link } from "react-router-dom";

const { API_ENDPOINT } = require('../config')

export default class NoteInfo extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      note: {}
    };
  }
  componentDidMount(){
  const note = this.props.match.params.noteId || null;
  fetch(`${API_ENDPOINT}/notes/${note}`)

    .then(res => res.json())
    .then(res => {
      this.setState({ 
          note: res
      })
  })
  .catch((error => {
      console.error(error);
  }));
}


render () {
const { note }  = this.state
console.log ("oneNote from noteinfo:", note)
const timestamp = Date.now();
  return (
    <MyContext.Consumer>
      {(context) => (
        <div>
          <Link to={`/`}>
            <h3>Noteful Home</h3>
          </Link>
          <h3> {note.note_name} </h3>
          <p> {note.content} </p>
          <div> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)} </div>
          <Link to={`/`}>
          </Link>
          <button className="backButton">
            <div>
              <Link to={`/`}>
                Back
                      </Link>
            </div>
          </button>
        </div>
      )}
      </MyContext.Consumer>
    );
  }
}



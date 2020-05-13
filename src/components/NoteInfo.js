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
  componentDidMount() {
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


  render() {
    const { note } = this.state
    return (
      <>
        <MyContext.Consumer>
          {(context) => (
            <div>
              <Link to={`/`}>
                <h3>Noteful Home</h3>
              </Link>
              <h3> {note.note_name} </h3>
              <p> {note.content} </p>
              <p>{note.date_created}</p>
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
      </>
    );
  }
}



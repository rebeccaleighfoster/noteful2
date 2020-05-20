import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const { API_ENDPOINT } = require('../../config')

class NotesByFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    }
  }

  fetchNotesByFolderId = () => {
    const folder_id = this.props.match.params.id;
    console.log(folder_id)
    fetch(`${API_ENDPOINT}/notes/folder/${folder_id}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        notes: res
      })
    })
    .catch((error => {
      console.error(error);
    }));
}

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id.folder_id !== prevProps.match.params.id.folder_id) {
      this.fetchNotesByFolderId();
    }
  }
  componentDidMount() {
    this.fetchNotesByFolderId();
  }

  render() {
    console.log(this.state)
    return (
      <div>
         <Link to={`/`}>
            <h3>Noteful Home</h3>
          </Link>
        {this.state.notes.map(note =>
          <div>

            <h3>{note.note_name}</h3>
            <p>{note.content}</p>
            <p>{note.date_created}</p>
          </div>
        )}
      </div>
    );
  }
}


export default NotesByFolder;
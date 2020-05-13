import React from 'react';
import Folders from "./Folders";
import { Link } from "react-router-dom";
import MyContext from "../MyContext"
import PropTypes from "prop-types";
import ErrorBoundary from '../ErrorBoundary';

class NotesContainer extends React.Component {
  static contextType = MyContext;
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.context.setFolderId(this.props.match.params.id)
    }
  }
  render() {
    const { context } = this;
    console.log("from", context)
    return (
      <ErrorBoundary>
        <Link to={`/`}>
            <h3>Noteful Home</h3>
          </Link>
            <div className="d-flex">
              <div className="folders-pane">
                <Folders />
                <div>
                  <Link to="/folder/add">
                    <button type="button">
                      Add Folder
                         </button>
                  </Link>
                </div>
              </div>
              <div className="notes-pane">
                <div>
                  {context.notes.map(note =>
                    <div key={note.id}>
                      <div key={note.id}>
                        <Link to={`/note/${note.id}`}>{note.note_name}</Link>
                      </div>
                      <p>{note.date_created}</p>
                      <button
                        className='Note__delete'
                        type='button'
                        onClick={() => context.deleteNote(note)}
                      > Delete Note </button>
                    </div>
                  )}
                  <div>
                    <Link to="/notes/add">
                      <button type="button">
                        Add Note
                         </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
      </ErrorBoundary>
    )
  }
}

NotesContainer.propTypes = {
  value: PropTypes.string
}

export default NotesContainer;

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
    const timestamp = Date.now();
    const { context } = this;
    return (
      <ErrorBoundary>
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
                      <div> {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)} </div>
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

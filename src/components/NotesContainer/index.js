import React from 'react';
import Folders from "./Folders";
import { Link } from "react-router-dom";
import MyContext from "../MyContext"
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from 'reactstrap';
import ErrorBoundary from '../ErrorBoundary';

class NotesContainer extends React.Component {
    filterByFolderId = (notes, folderId) => {
      return notes.map(note => {
        if (note.folderId === folderId) {
          return (
            <div>
              <Link to={`/note/${note.id}`} key={note.id}>
                {note.name}
              </Link>
            </div>
          );
        }
        return null;
      });
    };
    render() {
      const folderId = this.props.match.params.id || null;
      return (
        <ErrorBoundary>
        <MyContext.Consumer>
          {(context) => (
            <div className="d-flex">
                <div className="folders-pane">
                <Folders />
                <ListGroupItem>
                <Link to="/folder/add">
                        <button type="button">
                          Add folder!
                         </button>
                          </Link>
                </ListGroupItem>
              </div>
              <div className="notes-pane">
                {folderId ? (<div>
                  {this.filterByFolderId(context.notes, folderId)}
                </div>) : (
                  <ListGroup>
                    {context.notes.map(note =>
                      <ListGroupItem key={note.id}>
                        <div key={note.id}>
                          <Link to={`/note/${note.id}`}>{note.name}</Link>
                        </div>
                        <button
                          className='Note__delete'
                          type='button'
                          onClick={() => context.deleteNote(note)}
                        > Delete Note </button>
                        </ListGroupItem>
                      )}
                      <ListGroupItem>
                      <Link to="/notes/add">
                        <button type="button">
                          Add Note!
                         </button>
                          </Link>
                        </ListGroupItem>
                  </ListGroup>
                )}
              </div>
            </div>
          )}
        </MyContext.Consumer>
        </ErrorBoundary>
      )
    }
  }

  NotesContainer.propTypes = {
    value: PropTypes.string
  }

  export default NotesContainer;

import React from "react";
import MyContext from "./MyContext";
import { ListGroup } from 'reactstrap';
import { Link } from "react-router-dom";


const NoteInfo = props => {
  console.log(props)
return (
  <ListGroup>
    <MyContext.Consumer>
         {context => {
          console.log(context)
          const noteId = props.match.params.noteId || null;
          const note = context.notes.find((note) => (note.id === noteId))
          const timestamp = Date.now();
            return (
              <>
              <Link to={`/`}>
                        <h3>Noteful Home</h3>
                      </Link>
                <h3>{note.name}</h3>
                <div> {note.content}</div>
                <div> {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)} </div>
                <Link to={`/`}>
                <button
                          className='Note__delete'
                          type='button'
                          onClick={() => context.deleteNote(note)}
                        > Delete Note </button>
                 </Link>
                <button className="backButton">
                    <div>
                      <Link to={`/`}>
                        Back
                      </Link>
                    </div>
                  </button>
              </>
              );
        }}
   </MyContext.Consumer>
  </ListGroup>
)
}

export default NoteInfo;


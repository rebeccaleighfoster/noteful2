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
            return (
              <>
                <div>{note.name}</div>
                <div> {note.content}</div>
                <div className="backButton">
                    <div>
                      <Link to={`/`}>
                        back
                      </Link>
                    </div>
                  </div>
              </>
              );
        }}
   </MyContext.Consumer>
  </ListGroup>
)
}

export default NoteInfo;


import React from "react";
import MyContext from "./MyContext";
import { ListGroup } from 'reactstrap';

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
              </>
              );
        }}
   </MyContext.Consumer>
  </ListGroup>
)
}

export default NoteInfo;


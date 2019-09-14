import React from "react";
import MyContext from "./MyContext";
import { ListGroup, ListGroupItem } from 'reactstrap';






const NoteInfo = props => {
  console.log(props)
return (
  <ListGroup>
    <MyContext.Consumer>
         {context => {
          console.log(context)
          const noteId = props.match.params.noteId || null;
          const note = context.notes.find(note.id) === this.props.match.params.noteId
            return (
              <ListGroupItem key={note.name}>
                <div>{note.name}</div>
                <div> {note.content}</div>
              </ListGroupItem>
              );
        }}
   </MyContext.Consumer>
  </ListGroup>
)
}

export default NoteInfo;


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
            return context.notes.map(note => (
              <ListGroupItem key={note.name}>
                   {context.notes.filter(note => note.noteId === note.id)}
                <div>{note.name}</div>
                <div> {note.content}</div>
              </ListGroupItem>
            ));
          }}
     </MyContext.Consumer>
     </ListGroup>
    )
}


export default NoteInfo;


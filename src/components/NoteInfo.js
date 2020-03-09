import React from "react";
//import MyContext from "./MyContext";
//import { ListGroup } from 'reactstrap';
import { Link } from "react-router-dom";



//change to class componeent, make api call 
//to back end and set it in the state 
// //pass this in fetch, create variable called note and put it in the state



export default class NoteInfo extends React.Component { 
  componentDidMount(props){
 // console.log("props from noteinfo",props) //undefined
  //const note = props.match.params.noteId || null;
  //${note}
  fetch(`http://localhost:8000/notes/8`)
    .then(res => res.json())
    .then(res => {
      this.setState({
          ...this.state, 
          notes: res
      })
  })
  .catch((error => {
      console.error(error);
  }));
}

render () {
const oneNote  = this.state
console.log ("oneNote from noteinfo:", oneNote)
const timestamp = Date.now();
// <div> {oneNote}</div> not working, error about keys
return (
  <div>
              <Link to={`/`}>
                        <h3>Noteful Home</h3>
                      </Link>
                <h3> {/*oneNote.note_name* show up as null, console lots object delayed.*/} name </h3>
                <p> {/*oneNote.content*/} content</p>
                <div> {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)} </div>
               
                <Link to={`/`}>
                <button
                          className='Note__delete'
                          type='button'
                          //onClick={() => context.deleteNote(oneNote) how does this work without context?}
                        > Delete Note </button>
                 </Link>
                <button className="backButton">
                    <div>
                      <Link to={`/`}>
                        Back
                      </Link>
                    </div>
                    </button>
                    </div>
)
}
}


  /*
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
}*/

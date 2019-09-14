import React from "react";
import MyContext from "../../MyContext";
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Folders extends React.Component {
  render() {
    return (
      <ListGroup>
        <MyContext.Consumer>
          {context => {
            console.log(context)
            return context.folders.map(folder => (
              <ListGroupItem key={folder.name}>
                <div>{folder.name}</div>
                <button
                  className="Note__delete"
                  type="button"
                  onClick={() => context.deleteFolder(folder)}
                >  Delete Folder</button>
                {context.notes.filter(note => note.folderId === folder.id).length}
              </ListGroupItem>
            )
            )  
          }}
        </MyContext.Consumer>
      </ListGroup>

    );
  }
}

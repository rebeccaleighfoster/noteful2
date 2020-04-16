import React from "react";
import MyContext from "../../MyContext";
import { Link } from "react-router-dom";

export default class Folders extends React.Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {context => {
            console.log(context)
            return context.folders.map(folder => (
                <div key={folder.name}>
                  <div>
                <Link to={`/folder/${folder.id}`}>{folder.name} </Link>
                </div>
                <button
                  className="Note__delete"
                  type="button"
                  onClick={() => context.deleteFolder(folder)}
                >  Delete Folder</button>  
              </div>
            )
            )  
          }}
        </MyContext.Consumer>
      </div>

    );
  }
}

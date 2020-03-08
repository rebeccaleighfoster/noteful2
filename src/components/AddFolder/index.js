import React from 'react'
import MyContext from "../MyContext";
import { Link } from "react-router-dom";

export default class AddFolder extends React.Component {
  
    handleAddFolder = (event, context) => {
      event.preventDefault();
      const newFolder = {
        name: event.target.name.value
        // add a new id here to match the table??
      };
      fetch(`http://localhost:8000/folders`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newFolder)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((resp) => {
        console.log(resp)
        console.log(context)
        context.addFolder(resp);
      })
      .catch(error => {
        console.error({ error })
      });
    }

    render() {
        return (
          <MyContext.Consumer>
            {(context) => (
              <form className="createFolder" onSubmit={(e) => this.handleAddFolder(e, context)}>
                  <h2>Add Folder</h2>
                  <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" className="name" name="name" id="name" required />
                  </div>
                  <div className="createFolderButtons">
                      <button type="submit" className="buttonSubmit">
                          Save
                      </button>
                  </div>
                  <div>
                      <Link to={`/`}>
                        back
                      </Link>
                    </div>
              </form>
            )}
        </MyContext.Consumer>
      );
    }
}

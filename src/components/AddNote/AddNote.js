import React from 'react'
import { Link } from "react-router-dom";
import MyContext from "../MyContext";

export default class AddNote extends React.Component {
    handleAddNote = (event, context) => {
      event.preventDefault();
      const newNote = {
        note_name: event.target.name.value,
        content: event.target.content.value,
        folder_id: event.target.folder.value
      };
      console.log(newNote)
      fetch(`/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote)
      })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((resp) => {
        console.log(resp)
        console.log(context)
        window.location.href = '/'

      })
      .catch(error => {
        console.error({ error })
      });
    }

    render() {
        return (
        <MyContext.Consumer>
          {(context) => (
            console.log("from addnote", context),
            <form className="createNote" onSubmit={(e) => this.handleAddNote(e, context)}>
                Add Note
                <div className="form-group">
                          <label htmlFor="folderSelect">Folder Select</label>
                          <select 
                              className="folderSelect"
                              aria-label="select folder" 
                              name="folder">
                            { context.folders.map(folder => <option value={folder.id}> { folder.name } </option>) }
                          </select>
                      </div>
                <div className="form-group">
                    <label htmlFor="name">Name: {context.note_name} </label>
                    <input type="text" className="name" name="name" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="content"> Content: </label> 
                  <input type="text" className="content" name="content" id="content" required/>
                </div>
                <div className="createNoteButtons">
                    <button type="submit" className="buttonSubmit">
                   SAVE
                    </button>
                </div>
                <div className="backButton">
                  <div>
                    <button>
                    <Link to={`/`}>
                      Back
                    </Link>
                    </button>
                  </div>
                </div>
            </form>
          )}
    
      </MyContext.Consumer>
         )
        }
       }

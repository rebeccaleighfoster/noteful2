import React from 'react'

import MyContext from "../MyContext";

export default class AddNote extends React.Component {
    handleAddNote = (event, context) => {
      event.preventDefault();
      const newNote = {
        name: event.target.name.value,
        content: event.target.content.value
      };
      fetch(`http://localhost:9090/notes`, {
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
        context.addNote(resp);
      })
      .catch(error => {
        console.error({ error })
      });
    }

    render() {
        return (
          <MyContext.Consumer>
            {(context) => (
              <form className="createNote" onSubmit={(e) => this.handleAddNote(e, context)}>
                  <h2>Add Note</h2>
                  <div className="form-group">
                      <label htmlFor="name">Name: </label>
                      <input type="text" className="name" name="name" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content"> Content: </label> 
                    <input type="text" className="content" name="content" id="content" />
                  </div>
                  <div className="createNoteButtons">
                      <button type="submit" className="buttonSubmit">
                          Save
                      </button>
                  </div>
              </form>
            )}
        </MyContext.Consumer>
      );
    }
}



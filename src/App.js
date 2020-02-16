import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NotesContainer from "./components/NotesContainer";
import NoteInfo from "./components/NoteInfo";
import AddFolder from "./components/AddFolder";
import MyContext from "./components/MyContext";
import AddNote from "./components/AddNote/AddNote"

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  filterByFolderId = (notes, folderId) => {
    return notes.map(note => {
      if (note.folderId === folderId) {
        return (
          <div>
            <Link to={`/note/${note.id}`} key={note.id}>
              {note.name}
            </Link>
          </div>
        );
      }
      return null;
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/notes`),
      fetch(`http://localhost:9090/folders`)
    ])
      .then(([notesResponse, foldersResponse]) => {
        if (!notesResponse.ok)
          return notesResponse.json().then(e => Promise.reject(e));
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e => Promise.reject(e));
        return Promise.all([notesResponse.json(), foldersResponse.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({
          notes,
          folders
        });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleNoteDelete = (note) => {
    const noteId = note.id;
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.setState(prevState => ({
          notes: prevState.notes.filter(note => !(note.id === noteId))
        }))
      })
      .catch(error => {
        console.error({ error })
      })
  };

  handleFolderDelete = deletedFolder => {
    const { folders, notes } = this.state;
    fetch(`http://localhost:9090/folders/${deletedFolder.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        const newFolderSet = folders.filter(
          folderObj => !(folderObj.id === deletedFolder.id)
        );
        const newNoteSet = notes.filter(
          noteObj => !(noteObj.folderId === deletedFolder.id)
        );
        this.setState({
          folders: newFolderSet,
          notes: newNoteSet
        });
      })
      .catch(error => {
        console.error({ error });
      });
  };

  addFolder = newFolder => {
    console.log(newFolder);
    const { folders } = this.state;
    folders.push(newFolder);
    this.setState({
      folders
    });
  };

  addNote = newNote => {
    console.log(newNote);
    const { notes } = this.state;
    notes.push(newNote);
    this.setState({
      notes
    });
  };

  render() {
    const { folders, notes } = this.state;
    return (
      <MyContext.Provider
        value={{
          notes,
          folders,
          addFolder: this.addFolder,
          addNote: this.addNote,
          deleteNote: this.handleNoteDelete,
          deleteFolder: this.handleFolderDelete
        }}
      >
        <Router>
          <Route path="/" exact component={NotesContainer} />
          <Route path="/folder/:id" exact component={NotesContainer} />
          <Route path="/note/:noteId" exact component={NoteInfo} />
          <Route path="/folder/add" exact component={AddFolder} />
          <Route path="/notes/add" exact component={AddNote} />
        </Router>
      </MyContext.Provider>
    );
  }
}

export default App;

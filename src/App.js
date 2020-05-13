import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotesContainer from "./components/NotesContainer";
import NoteInfo from "./components/NoteInfo";
import AddFolder from "./components/AddFolder";
import MyContext from "./components/MyContext";
import AddNote from "./components/AddNote/AddNote";
import NotesByFolder from "./components/NotesContainer/Folders/NotesByFolder"
import "./App.css";

const { API_ENDPOINT } = require('./config')

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      folder_id: null
    };
  }

  setFolderId = (folder_id) => {
    console.log(folder_id)
    this.setState({
      folder_id
    }, () => {
      this.fetchNotesByFolderId()
    });
  };

  componentDidMount() {
   this.fetchFolders();
   this.fetchNotesByFolderId();
  }

  fetchNotesByFolderId = () => {
    const { folder_id } = this.state;
     const url = folder_id  ? `${API_ENDPOINT}/folder/${folder_id}` : ``;
    fetch(`${API_ENDPOINT}/notes/${url}`)
      .then((resp) => {
        if (!resp.ok)
          return resp.json().then(e => Promise.reject(e));
        return resp.json();
      }).then(data => {
        this.setState({
          notes: data
        })
      })
      .catch(error => {
        console.error({ error });
      });
  }

  fetchFolders = () => {
    fetch(`${API_ENDPOINT}/folders`)
      .then((foldersResponse) => {
        if (!foldersResponse.ok)
          return foldersResponse.json().then(e => Promise.reject(e));
        return foldersResponse.json();
      })
      .then((folders) => {
        this.setState({
          folders
        });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleNoteDelete = (note) => {
    const noteId = note.id;
    fetch(`${API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok){
          this.fetchFolders();
          this.fetchNotesByFolderId()
        }
      })
      .catch(error => {
        console.error({ error })
      })
  };


  handleFolderDelete = (folder) => {
    const folder_id = folder.id;
    console.log ({folder_id}, "deleted")
    fetch(`${API_ENDPOINT}/folders/${folder_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok){
        this.fetchFolders();
        this.fetchNotesByFolderId()
      }
    })
    .catch(error => {
      console.error({ error })
    })
};

  

  render() {
    const { folders, notes } = this.state;
    return (
      <MyContext.Provider
        value={{
          notes,
          folders,
          deleteNote: this.handleNoteDelete,
          deleteFolder: this.handleFolderDelete,
          setFolderId: this.setFolderId
        }}
      >

       { <Router>
        <Route path="/" exact component={NotesContainer} />
          <Route path="/folder/:id" exact component={NotesByFolder} />
          <Route path="/note/:noteId" exact component={NoteInfo} />
          <Route path="/folder/add" exact component={AddFolder} />
          <Route path="/notes/add" exact component={AddNote} />
       </Router>}
      </MyContext.Provider>
    );
  }
}

export default App;



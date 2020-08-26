import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // When the app loads we need to to listen to DB and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here ... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); // Stop page refreshing
    
    // Add new todo to the firestore
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Firestore server timestamp
    });
    
    setInput(''); // Clear input field
  }
  
  return (
    <div className="App">
      <h1>TODO list <span role="img" aria-label="list">📃</span></h1>
      <form>
        <FormControl>
          <InputLabel>What to do</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>
        {/* <input
          value={input}
          onChange={event => setInput(event.target.value)}
        /> */}

        < Button
          onClick={addTodo}
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
        >Add Todo</Button>
        {/* <button type="submit" onClick={addTodo}>Add TODO</button> */}
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          /* <li>{todo}</li> */
        ))}
      </ul>

    </div>
  );
}

export default App;

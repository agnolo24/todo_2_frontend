import axios from 'axios'
import { useEffect, useState } from "react";

import './App.css'

function App() {
  let [todo, setTodo] = useState('')
  let [todos, setTodos] = useState([])

  function fetchTodo() {
      axios.get('http://127.0.0.1:8000/api/all_todos/').then(
        (response) => {
          setTodos(response.data)
        }
      )
    }

  useEffect(
    () => {
      fetchTodo()
    }, []
  )

  return (
    <div className="App">
      <center><u><h1>Todo App</h1></u></center>

      <div className="inp-box">
        <input onChange={
          (e) => {
            setTodo(e.target.value)
          }
        } value={todo} type="text" />

        <button onClick={
          () => {
            axios.post('http://127.0.0.1:8000/api/new_todo/', { title: todo }).then(
              () => {
                setTodo(todo = "")
                fetchTodo()
              }
            )
          }
        }>+</button>
      </div>

      <hr />

      <div className="todos">
        {
          todos.map(
            (obj) => {
              return (
                <div className='todo'>
                  <input type="checkbox" checked={obj.status === 'd'} onChange={
                    () => {
                      axios.put(`http://127.0.0.1:8000/api/edit_todo/${obj.id}/`, { status: 'd' }).then(
                        () => {
                          fetchTodo()
                        }
                      )
                    }
                  }/>
                  <h1>{obj.title}</h1>
                  <button onClick={
                    () => {
                      axios.delete(`http://127.0.0.1:8000/api/del_todo/${obj.id}/`).then(
                        () => {
                          fetchTodo()
                        }
                      )
                    }
                  }>X</button>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  );
}

export default App;

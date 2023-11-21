import './App.css';
import Header from './MyComponents/Header';
import { Todos } from "./MyComponents/Todos";
import React, {useEffect, useState} from 'react';
import { AddTodo } from "./MyComponents/AddTodo";
import {Footer} from "./MyComponents/Footer";

function App() {
  let initTodo;
  if(localStorage.getItem("todos") === null){
    initTodo = [];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo)=>{
    console.log("I an onDelete of todo",todo);
    //Deleting this way in react does not work
    /*let index = todos.indexOf(todo);
    todos.splice(index, 1);*/
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    console.log("deleted", todos)
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const addTodo = (title, desc)=>{
    console.log("Adding this todo",title, desc)
    let sno;
    if(todos.length===0){
      sno = 0;
    }
    else{
    sno = todos[todos.length-1].sno+1;
    }
    const myTodo = {
      sno: sno,
      title:title,
      desc:desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])

  return ( 
    <> 
      <Header title="My Todos List" searchBar={false}/> 
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
          
    </>
  );

}

export default App;

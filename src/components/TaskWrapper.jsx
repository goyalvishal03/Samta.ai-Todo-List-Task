import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import {EditForm} from "./EditForm";
import { v4 as uuidv4 } from "uuid";

export const TaskWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const togglecomplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const filterTasks = (type) => {
    setFilter(type);
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((todo) => todo.completed === (filter === "completed"));
  return (
    <div className="TodoWrapper">
        <h1> Todo app</h1>
        <div className="filter-buttons">
            <button onClick={() => filterTasks('all')}> all</button>
            <button onClick={() => filterTasks('completed')}> completed</button>
            <button onClick={() => filterTasks('incomplete')}> incomplete</button>
        </div>
        <TaskForm addTodo={addTodo}/>
        {filteredTodos.map((todo,index) => (
            <div key={todo.id}>
                {todo.isEditing ? (
                    <EditForm editTodo= {editTask} task={todo} key={index}/>
                ) : (
                    <Task task={todo} key={index} index={index} togglecomplete={togglecomplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )}
            </div>
           )) }
    </div>
  );
};


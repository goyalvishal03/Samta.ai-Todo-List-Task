import React from "react";

export const Task = ({ task, deleteTodo,editTodo, togglecomplete, index }) => {
  return (
    <div className={`Todo ${task.completed ? "complted" : "incompleted"}`}>
      <div className="task-info">
        <p onClick={() => togglecomplete(task.id)}>{task.task}</p>
      </div>
      <div className="task-actions">
        <button
          className="complete-button"
          onClick={() => togglecomplete(task.id)}
        >
          {task.completed ? "incomplete" : "complete"}
        </button>
        <button className="edit-button" onClick={() => editTodo(task.id)}>Edit</button>
        <button className="delete-button" onClick={() => deleteTodo(task.id)}>Delete</button>
      </div>
      
    </div>
  );
};

import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ToDoEdit from "./ToDoEdit";

library.add(fas);

export default function SingleToDo(props) {
  const { currentUser } = useAuth();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="singleTodo col-md-5 m-4">
      <h3>{props.todo.Action}</h3>
           {props.todo.Description !== null ? (
        <p>{props.todo.Description}</p>
      ) : (
        <p>No Description Provided</p>
      )}
      <span>Status: {props.todo.Done ? "Completed" : "Incomplete"}</span>

      {/* EDIT */}
      <button onClick={() => setShowEdit(!showEdit)} id="editLink">
        <FontAwesomeIcon icon={["fas", "edit"]} />
      </button>
      {/* DELETE */}
      {currentUser.email === "miketullis@hotmail.com" && (
        <div>
          {/* this div will hose the delete and edit buttons */}
          <button
            id="deleteLink"
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete ${props.todo.Action}?`
                )
              ) {
                props.deleteToDo(props.todo.ToDoId);
              }
            }}
          >
            <FontAwesomeIcon icon={["fas", "trash-alt"]} />
          </button>
        </div>
      )}
      {showEdit && (
        <ToDoEdit
          todo={props.todo}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          getToDos={props.getToDos}
          categories={props.categories}
        />
      )}
    </div>
  );
}

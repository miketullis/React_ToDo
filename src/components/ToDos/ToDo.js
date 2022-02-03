import React, { useState, useEffect } from "react";
import sampleToDos from "../../Utilities/SampleToDos";
import SingleToDo from "./SingleToDo";
import ToDoCreate from "./ToDoCreate";
import axios from "axios";
import { Container } from "react-bootstrap";
import "./ToDo.css";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../Auth/Logout";
import FilterCat from "./FilterCat";


export default function ToDos() {
  const [todos, setToDos] = useState(sampleToDos);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState(0);

  const getToDos = () => {
    axios.get(`http://api.miketullis.com/api/todo`).then((response) => {
      console.table(response.data);
      setToDos(response.data);
    });
  };

  const getCategories = () => {
    axios.get(`http://api.miketullis.com/api/categories/`).then((response) => {
      console.table(response.data);
      setCategories(response.data);
    });
  };

  // function to delete from the API
  const deleteToDo = (id) => {
    axios.delete(`http://api.miketullis.com/api/todo/${id}`).then(() => {
      getToDos();
    });
  };

  useEffect(() => {
    console.log(todos);
    getToDos();
    getCategories();
  }, []);


  return (
    <section className="todos">
      <article className="dark pt-0 pb-3 text-center">
        <h1>projects to do</h1>
      </article>
      {currentUser.email === "miketullis@hotmail.com" && (
        <div className="dark p-2 text-center">
          <button
             onClick={() => setShowCreate(!showCreate)} 
            className="btn dark"
          >
            {!showCreate ? "Create New ToDo" : "Close"}
          </button>
          <div className="createContainer">
            {showCreate && (
              <ToDoCreate
                categories={categories}
                getToDos={getToDos}
                setShowCreate={setShowCreate}
              />
            )}
          </div>
        </div>
      )}

      <Container>
      <FilterCat setFilter={setFilter} categories={categories} />

        <article className="todoGallery row justify-content-center">
          {filter === 0
            ? todos.map((todo) => (
                <SingleToDo
                  key={todo.ToDoId}
                  todo={todo}
                  deleteToDo={deleteToDo}
                  getToDos={getToDos}
                  categories={categories}
                />
              ))
            : todos
                .filter((todo) => todo.CategoryId === filter)
                .map((todo) => (
                  <SingleToDo
                    key={todo.ToDoId}
                    todo={todo}
                    deleteToDo={deleteToDo}
                    getToDos={getToDos}
                    categories={categories}
                  />
                ))}
          {/* If the filter returns no results, then we want a message that says there are no results. */}
          {filter !== 0 &&
            todos.filter((todo) => todo.CategoryId === filter).length === 0 && (
              <h2 className="alert alert-warning text-dark">
                There are no results in this category.
              </h2>
            )}
        </article>
      </Container>
      {currentUser && <Logout />} 
    </section>
  );
}

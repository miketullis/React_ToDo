import React, { useState, useEffect } from "react";
import sampleCategories from "../../Utilities/sampleCategories";
import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import SingleCat from "./SingleCat";
import axios from 'axios'
import Logout from "../Auth/Logout";
import CatCreate from "./CatCreate";


export default function Categories(props) {
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [categories, setCategories] = useState([]);

  //Hook to get all categories from the API
  const getCategories = () => {
    axios.get(`http://localhost:55378/api/categories/`).then((response) => {
      console.table(response.data);
      setCategories(response.data);
    });
  };

  const deleteCategory = (id) =>{
    axios.delete(`http://localhost:55378/api/categories/${id}`).then(() => {getCategories()})
}

  useEffect(() => {
    console.log(sampleCategories);
    getCategories();
  }, []);

  return (
    <section className="categories">
      <article className="bg-info p-5 text-center">
        <h1>Categories Dashboard</h1>
      </article>

      {/* CREATE FUNCTIONALITY */}
      <div className="bg-dark p-2 mb-3 text-center">
          {(currentUser.email === 'miketullis@hotmail.com' && showCreate) ? 
          <>
          <button onClick={() => setShowCreate(false)} className="btn btn-warning">Cancel</button>
          {/* Render CatCreate here */}
          <CatCreate
            getCategories={getCategories}
            setShowCreate={setShowCreate}  />
          </> : 
          <button onClick={() => setShowCreate(true)} className="btn btn-info">Create New Category</button>
          }
      </div> {/* END CREATE */}

      {/*  UI to show the data */}
      <Container>
        <table className="table table-striped table-bordered rounded mt-3 mb-3">
          <thead className="bg-info text-uppercase">
            {" "}
            <tr>
              <th>Name</th>
              <th>Description</th>
              {currentUser.email === "miketullis@hotmail.com" && (
                <th>Actions</th> 
              )}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => 
            <SingleCat
            key={cat.CategoryId}
            category={cat} 
            deleteCategory={deleteCategory}
            getCategories={getCategories}
            />


            )}
          </tbody>
        </table>
      </Container>
      {currentUser &&
      <Logout/>
      }
    </section>
  );
}

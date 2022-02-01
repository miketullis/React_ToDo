import React, { useState} from "react";
import { Formik, Field, Form } from "formik";
import toDoSchema from "../../Utilities/ValidationSchema";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Switch from "./Switch";


export default function ToDoEdit(props) {
  const handleSubmit = (values) => {
    console.log(values);
    const toDoToEdit = {
      //Create all of the properties needed to communicate to the API and connect them with the values written in the form
      ToDoId: props.todo.ToDoId,
      Action: values.Action,
      Description: values.Description,
      Done: false,
      CategoryId: values.CategoryId,
    };
    console.log("ToDo", toDoToEdit);

    //axios.put("http://localhost:55378/api/ToDo/", toDoToEdit).then(() => {
    axios.put("http://api.miketullis.com/api/ToDo/", toDoToEdit).then(() => {
      props.getToDos();
      props.setShowEdit(false);
    });
  };


  // const [value, setValue] = useState(false);//old switch
  const [isToggled, setIsToggled] = useState(false)

  //THE UI
  return (
    <Modal show={props.showEdit} onHide={() => props.setShowEdit(false)}>
      <Modal.Header className="bg-info" closeButton>
        <h3>Editing {props.todo.Action}</h3>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            ToDoId: props.todo.ToDoId,
            Action: props.todo.Action,
            Description: props.todo.Description,
            // Done: false,
            Done: props.todo.Done,
            CategoryId: props.todo.CategoryId,
          }}
          validationSchema={toDoSchema}
          onSubmit={(values) => handleSubmit(values)}>

          {({ errors, touched, values }) => (
            <Form id="toDoForm">
              <div className="form-group m-3">
                <Field
                  name="Action"
                  className="form-control"
                  placeholder="Action"
                />
                {errors.Action && touched.Action ? (
                  <div className="text-danger">{errors.Action}</div>
                ) : null}
              </div>
              <div className="form-group m-3">
                <Field
                  name="Description"
                  as="textarea"
                  className="form-control"
                  placeholder="Description"
                  style={{ resize: "none", height: "5em" }}
                />
                {errors.Description && touched.Description ? (
                  <div className="text-danger">{errors.Description}</div>
                ) : //This is for when validation passed on prior to validation the form
                null}
              </div>

              <div className="form-group m-3">
                <h5> Completed?</h5>


                    <Switch name="Done" isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
              
                    {/* <Switch name="Done" isOn={value} handleToggle={() => setValue(!value)} />  */}
              
              </div>






              <div className="form-group m-3">
                <Field name="CategoryId" as="select" className="form-control">
                  <option value="0" disabled>
                    {" "}
                    [-- Please choose a category... --]
                  </option>
                  {props.categories.map((x) => (
                    //CREATE-STEP 8 - below we map the rest of the options
                    <option key={x.CategoryId} value={x.CategoryId}>
                      {x.Name}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-info m-3">
                  {" "}
                  Submit ToDo to API
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import toDoSchema from '../../Utilities/ValidationSchema'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ToDoCreate(props) {

const handleSubmit = (values) =>{
    console.log(values);
   const toDoToCreate ={
   //Create all of the properties needed to communicate to the API and connect them with the values written in the form
   Action: values.Action,
   Description: values.Description,
   Done: false,
   CategoryId: values.CategoryId
   }
   console.log('ToDo', toDoToCreate)
   
   axios.post('http://api.miketullis.com/api/ToDo/', toDoToCreate).then(() => {
       props.getToDos();
       props.setShowCreate(false);
   })
   }

    return (
       <article className='createToDo m-2 text-white justify-content-center'>
           <Formik
           initialValues={{
               //this prop will tie into the Name attibutes in the Field components below.
               Action: '',
               Description: '',
               Done: '',
               CategoryId: 0
           }}
           validationSchema={toDoSchema}
           onSubmit={(values) => handleSubmit(values)}>
                {({errors, touched}) => (
                    //Here we are rendering specific fields but passing some functionality form Formik into those fields so it can manage changes for us.
                    <Form id="toDoForm">
                        <div className='form-group m-3'>
                            <Field name="Action" className="form-control" placeholder="Action" /> 
                            {errors.Action && touched.Action ? 
                            (
                                //If there are errors and the user has typed or clicked on the input
                             <div className="text-danger">
                                 {errors.Action} 
                                 </div>
                            ) :
                            null         
                            }
                         </div>
                        <div className='form-group m-3'>
                            <Field name="Description" as="textarea" className="form-control" placeholder="Description" style={{resize: 'none', height: '5em'}} /> 
                            {errors.Description && touched.Description ? 
                            (
                             <div className="text-danger">
                                 {errors.Description} 
                                 </div>
                            ) :
                                null         
                            }
                         </div>
                        <div className='form-group m-3'>
                            <Field name="CategoryId" as="select" className="form-control"> 
                                    <option value="0" disabled> [-- Please choose a category... --]</option>
                                    {props.categories.map(x =>
                                        <option key={x.CategoryId} value={x.CategoryId}>
                                            {x.Name}
                                        </option>
                                        )}
                            </Field>
                        </div>
                        <div className='form-group'>
                            <button type="submit" className='btn dark m-1'> Submit Todo to API</button>
                        </div>
                    </Form>
                )}
           </Formik>
</article>   
 )
}

import React from 'react'
import { catSchema } from '../../Utilities/ValidationSchema'
import { Modal } from 'react-bootstrap'
import {Formik, Field, Form} from 'formik'
import axios from 'axios'

export default function CatEdit(props) {

    const handleSubmit = (values) => {
        //Create a Temporary object so we can send data to the API
        const categoryToEdit = {
            CategoryId: props.category.CategoryId,
            Name: values.Name,
            Description: values.Description
        }
        
        console.log(categoryToEdit)
        // axios.put(`http://localhost:55378/api/Categories/`, categoryToEdit).then(() => {
        axios.put(`http://api.miketullis.com/api/Categories/`, categoryToEdit).then(() => {
            props.getCategories();
            props.setShowEdit(false);
        } )
    }

    //THE UI
    return (
        <Modal show={props.showEdit} onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton>
                <h2>Editing {props.category.Name}</h2>
            </Modal.Header>
            <Modal.Body>
            <Formik
            initialValues={{
                Name: props.category.Name,
                Description: props.category.Description
            }} 
            validationSchema={catSchema}
            onSubmit={values => {handleSubmit(values)}}>
                {({errors, touched}) => (
                    <div className='container'>
                        <Form id="catForm" className='row text-center m-auto'>
                            <div className='form-group col-md-12 m-1 p-1'>
                                <Field name="Name" className="form-control" placeholder="Name" />
                                {errors.Name && touched.Name ?
                                (
                                    <div className="text-danger">{errors.Name}</div>
                                ) :
                                null
                               }
                            </div>
                            <div className='form-group col-md-12 m-1 p-1'>
                                <Field name="Description" className="form-control" placeholder="Description" />
                                {errors.Description && touched.Description ?
                                (
                                    <div className="text-danger">{errors.Description}</div>
                                ) :
                                null
                               }
                            </div>
                            <div className='form-group col-md-12-m1'>
                                <button type="submit" className='btn btn-success'>Submit</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
            </Modal.Body>
        </Modal>
    )
}

import React from 'react'
import { Formik, Field, Form } from 'formik'
import { catSchema } from '../../Utilities/ValidationSchema'
import axios from 'axios'

export default function CatCreate(props) {

    const handleSubmit = (values) => {
        //Create object to send data to the API
        const categoryToCreate = {
            Name: values.Name,
            Description: values.Description
        }

        console.log(categoryToCreate)
        // axios.post(`http://localhost:55378/api/Categories/`, categoryToCreate).then(() => {
        axios.post(`http://api.miketullis.com/api/Categories/`, categoryToCreate).then(() => {
            props.getCategories();
            props.setShowCreate(false);
        } )
    }

    return (
        <div className='createCategory m-2 text-center'>
            <Formik
            initialValues={{
                Name: '',
                Description: ''
            }} 
            validationSchema={catSchema}
            onSubmit={values => {handleSubmit(values)}}>
                {({errors, touched}) => (
                    <div>
                        <Form id="catForm" className='row text-center m-auto'>
                            <div className='form-group col-md-12 m-1 p-1'>
                                <Field name="Name" className="form-control" placeholder="Name" />
                                {errors.Name && touched.Name ?
                                (
                                    <div className="text-danger">{errors.Name}</div>
                                ) : null
                               }
                            </div>
                            <div className='form-group col-md-12 m-1 p-1'>
                                <Field name="Description" className="form-control" placeholder="Description" />
                                {errors.Description && touched.Description ?
                                (
                                    <div className="text-danger">{errors.Description}</div>
                                ) : null
                               }
                            </div>
                            <div className='form-group col-md-12-m1'>
                                <button type="submit" className='btn dark'>Submit</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
       </div>
    )
}

import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormPosts from "./FormPosts";
import "./forms.css";


const Forms = ({ values, errors, touched, status }) => {

    const [form, setForm ] = useState([]);

    useEffect(() => {
        status && setForm(form => [...form, status])
    }, [status]);

    //console.log(values);
    //console.log(form);

    return (
        <div className="formcont">
            <h1>The Mullen Group LLC</h1>
            <Form className="form">
                <label htmlFor="name"/> Name: {" "}
                <Field 
                id="name"
                type="text"
                name="name"
                placeholder="Type Here"
                />
               {touched.name && errors.name && (<p> {errors.name} </p>
               )} 

                <label htmlFor="email"/> Email:{" "}
                <Field 
                id="email"
                type="email"
                name="email"
                placeholder="Type Here"
                />
                {touched.email && errors.email && (<p> {errors.email} </p>
               )}

                <label htmlFor="password"/> Password:{" "}
                <Field 
                id="password"
                type="password"
                name="password"
                placeholder="Type Here"
                />
               {touched.password && errors.password && (<p> {errors.password} </p>
               )}

                <label htmlFor="checkbox"/>Terms of Service{" "}
               <span><Field
                id="checkbox"
                type="checkbox"
                name="checkbox"
                /> </span>
                {touched.checkbox && errors.checkbox && ( <p>{errors.checkbox}</p>)}

                
                <button>Submit</button>
            </Form>
            <FormPosts form={form}/>
        </div>
    )
}

const FormikForms = withFormik({
    mapPropsToValues(props){
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            checkbox: props.checkbox || false,
                };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is manditory Tanisha!"),
        email: Yup.string().email("Please enter a valid email").required("Email is required!"),
        password: Yup.string().max(8, "Nice try 'smart' guy... no more than 8 characters lol"),
        checkbox: Yup.bool().oneOf([true],"Please Check")

    }),

    handleSubmit(values, { setStatus, resetForm }) {
        //console.log("submitting values:", values);
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                //console.log("success", res);
                setStatus(res);
                resetForm();
            })
            .catch(res => {
                console.log("error")
            })
    }

})(Forms)

export default FormikForms;
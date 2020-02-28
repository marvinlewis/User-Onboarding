import React from "react";
import "./formposts.css";

const FormPosts = (props) => {

    console.log(props.form);

    return (
        props.form.map( form => {
            return (
        <div className="postscont">
            <div className="posts" key={form.data.email}>
               New User {form.data.name} has signed up with email {form.data.email}
               <p>Welcome to the Mullen Group. Thank you for signing up with us!</p>
            </div>
        </div>
            )
        }
        )
    )

};

export default FormPosts;
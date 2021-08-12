import Head from 'next/head'
import React, { useState } from 'react'
import mystyle from '../styles/register.module.css'
import Image from 'next/image';
import logo from '../public/logo.png';
import axios from 'axios';
function Register(){
  const [state, setState] = useState({
      
    first_name: "",
    last_name:"",
    email: "",
    phone_number: "",
    location: "",
    gender: "",
    bio: "",
    id_number: "",
    password: "",
    profile_pic:null
  }
  );
  function handleChange(e) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(state)) {
      formData.append(key, value);
    }
//POST request for the form data
await axios
      .post("https://team-the-brain-app.herokuapp.com/farmer/register", formData)
      .then(({ data }) => {
        const { redirect } = data;
        // Redirect used for reCAPTCHA and/or thank you page
        window.location.href = "/";
      })
      .catch((e) => {
        //window.location.href = e.response.data.redirect;
      });
  }
    return (
        <div>
            <Head>
	<title>Register</title>
</Head>
<main className = {mystyle.registration__form}>
<p>Register for MkulimaChapChap</p>
<form onSubmit={handleSubmit}>
    <div>
	<label>First Name</label>
	<input id="first_name" onChange={handleChange}
        value={state.first_name} type="text" name="first_name"/>
    </div>
    <div>
	<label>Last Name</label>
	<input id="last_name" onChange={handleChange}
        value={state.last_name} type="text" name="last_name"/>
    </div>
    <div>
	<label>Email</label>
	<input id="email" onChange={handleChange}
        value={state.email} type="email" name="email"/>
    </div>
    <div>
    <label>Gender</label>
	<input id="gender"  onChange={handleChange}
        value={state.gender} type="text" name="gender"/>
    </div>
    <div>
	<label>Phone Number</label>
	<input id="phone_number"onChange={handleChange}
        value={state.phone_number} type="text" name="phone_number"/>
    </div>
    <div>
	<label>Bio</label>
	<input id="bio" onChange={handleChange}
        value={state.bio} type="text" name="bio"/>
    </div>
    <div>
	<label>Location</label>
	<input id="location" onChange={handleChange}
        value={state.location} type="text" name="location"/>
    </div>
    <div>
	<label>ID Number</label>
	<input id="id_number" onChange={handleChange}
        value={state.id_number} type="text" name="id_number"/>
    </div>
    <div>
    <label>Password</label>
	<input id="password" onChange={handleChange}
        value={state.password} type="password" name="password"/>
    </div>
    <div>
	<label>Profile Pic</label>
    <fieldset>
	<input id="profile_pic" onChange={handleChange}
    type="file" name="file"/>
    </fieldset>
    </div>
    <div className = {mystyle.registration__submit}>
	<button type="submit">Submit</button>
    </div>
</form>
    </main>
        </div>
    );

    } 

export default Register

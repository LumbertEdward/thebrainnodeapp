import Head from 'next/head'
import React, { useState } from 'react'
import mystyle from '../styles/register.module.css'
import Image from 'next/image';
import logo from '../public/logo.png';
function register() {
    const [firstname, setfirstName] = useState('')
    const [email, setEmail] = useState('')
    const [lastname, setlastName] = useState('')
    const [gender, setGender] = useState('')
    const [phonenumber, setphoneNumber] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')
    const [idNo, setidNo] = useState('')
    const [password, setPassword] = useState('')
    const [profilepic, setprofilePic] = useState('')
    const [submitted, setSubmitted] = useState(false)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Sending')
  
      let data = {
          firstname,
          email,
          lastname,
          gender,
          phonenumber,
          bio,
          location,
          idNo,
          password,
          profilepic
      }
  
      fetch('https://team-the-brain-app.herokuapp.com/farmer/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  
    return (
        <div>
            <Head>
	<title>Register</title>
</Head>
<main className = {mystyle.registration__form}>
<p>Register for MkulimaChapChap</p>
<form>
    <div>
	<label>First Name</label>
	<input id="first_name" onChange={(e)=>{setfirstName(e.target.value)}} name = "first_name" type="text" name="first_name"/>
    </div>
    <div>
	<label>Last Name</label>
	<input id="last_name"  onChange={(e)=>{setlastName(e.target.value)}}name = "last_name" type="text" name="last_name"/>
    </div>
    <div>
	<label>Email</label>
	<input id="email" onChange={(e)=>{setEmail(e.target.value)}} name = "email" type="email" name="email"/>
    </div>
    <div>
    <label>Gender</label>
	<input id="gender"  onChange={(e)=>{setGender(e.target.value)}} name = "gender" type="text" name="gender"/>
    </div>
    <div>
	<label>Phone Number</label>
	<input id="phone_number"  onChange={(e)=>{setphoneNumber(e.target.value)}}name = "phone_number" type="text" name="phone_number"/>
    </div>
    <div>
	<label>Bio</label>
	<input id="bio" onChange={(e)=>{setBio(e.target.value)}}  name = "bio" type="text" name="bio"/>
    </div>
    <div>
	<label>Location</label>
	<input id="location" onChange={(e)=>{setLocation(e.target.value)}} name = "location" type="text" name="location"/>
    </div>
    <div>
	<label>ID Number</label>
	<input id="id_number" onChange={(e)=>{setidNo(e.target.value)}} name = "id_number "type="text" name="id_number"/>
    </div>
    <div>
    <label>Password</label>
	<input id="password"  onChange={(e)=>{setPassword(e.target.value)}} name = "password" type="password" name="password"/>
    </div>
    <div>
	<label>Profile Pic</label>
    <fieldset>
	<input id="profile_pic"  onChange={(e)=>{setprofilePic(e.target.value)}} name = "profile_pic" type="file" name="file"/>
    </fieldset>
    </div>
    <div className = {mystyle.registration__submit}>
	<button onClick={(e)=>{handleSubmit(e)}} type="submit">Submit</button>
    </div>
</form>
    </main>
        </div>
    );

    } 

export default register

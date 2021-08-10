import styles from '../styles/Login.module.css'
import background_loginpage from '../public/background_loginpage.jpg';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link'

export default function Login() {
  return(
    <div>
    <Head>
   
    </Head>
<div className = {styles.login__container}>
  {/*<Image className = {styles.login__background} src = {background_loginpage} alt = "background image"/>*/}
</div>
<div className = {styles.login__form}>
  <form>
  <p>Welcome to MkulimaChapChap</p>
   <label>
     E-mail
   </label>
   <input type = "text" placeholder = "Enter Email" />
   <label>
     Password
   </label>
   <input type = "password" placeholder = "Enter Password" />
   <button type = "submit">
     <Link href = "/dashboard">
     Submit
     </Link>
   </button>
  </form>
  <div className = {styles.loginpasswords}>
  <p><a>Forgot Password?</a></p>
  <p>Do not have an account? <span><a href = "./Register">Create one</a></span></p>
  </div>
</div>
</div>

  )
}
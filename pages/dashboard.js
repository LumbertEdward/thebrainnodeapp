import styles from '../styles/Home.module.css'
import Image from 'next/image';
import order from '../public/order.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileInvoice, faFileInvoiceDollar, faHome,faMoneyBillWave,faMoneyCheck,faShoppingBasket, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import Header from './dashboardheader';
import Charts from './charts';
import Chatbots from './chatbot';
import Yields from './yieldschart';
import Production from './productioncost';
export default function Home() {
  
  return (
    <div>
      <Header/>
     <main>
      <div className = {styles.mainpage}>
        <div className ={styles.agriculture__statistics}>
          <div className = {styles.mainpage__header}>
          <ul>
            <li><FontAwesomeIcon icon = {faHome} className = {styles.mainpage__home}/>
            <span>Home</span></li>
            <div className = {styles.line}></div>
            <li>Dashboard</li>
          </ul>
          </div>
          <div className = {styles.dashboard__heading}>
            </div>
          <div className = {styles.statistics__dashboard}>
          <div>
             <p>Cost of production</p>
             <span>120,000</span>
             <FontAwesomeIcon icon = {faMoneyBillWave} className = {styles.dashboard__mainimages}/>
           </div>
           <div>
             <p>Total yield in kgs</p>
             <span>120,000</span>
             <FontAwesomeIcon icon = {faShoppingBasket} className = {styles.dashboard__mainimagesone}/>
           </div>
           <div>
             <p>Total Sales and Revenue</p>
             <span>150</span>
             <FontAwesomeIcon icon = {faMoneyCheck} className = {styles.dashboard__mainimagestwo}/>
           </div> 
           </div>
        </div>
        <div className = {styles.dashboard__moreinfo}>
        <div className = {styles.dashboard__chart}>
        <Charts/>
        </div>
        <div className = {styles.dashboard__chatbot}>
          <Chatbots/>
        </div>
        <div className = {styles.production__analysis}>
        <p>Crop Production Costs</p>
        <Production/>
        
      </div>
      </div>
      <div className = {styles.yields__production}>
      <div className = {styles.yields__analysis}>
        <Yields/>
      </div>
    <div className = {styles.dashboard__orders}>
      <p>Number of Customer Orders</p>
      <div className = {styles.dashboard__orderpic}>
      <Image src ={order} alt = "Customer orders" />
      </div>
      <p className = {styles.dashboard__ordernumber}>200</p>
      <button>View orders</button>
    </div>
      </div>
      </div>
      </main>
      <footer className ={styles.footer}>
        &copy; 2021. MkulimaChapChap
      </footer>
    </div>
  )
}

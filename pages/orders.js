import Header from "./dashboardheader";
import styles from "../styles/Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faHome,faMoneyBillWave,faMoneyCheck,faShoppingBasket, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import OrderTable from "./ordertable";
export default function Orders(){
    return(
        <div>
                <Header/>
                <div  className = {styles.dashboard__product}>
       <div className = {styles.mainpage__header}>
          <ul>
            <li><FontAwesomeIcon icon = {faHome} className = {styles.mainpage__home}/>
            <span>Home</span></li>
            <div className = {styles.line}></div>
            <li>Orders</li>
          </ul>
          </div>
           <div className = {styles.dashboard__addition}>
             <p>Order Summary</p>

           </div>
           <div className = {styles.dashboard__datatable}>
           <OrderTable/>
           </div>
       </div>
        </div>
    );
}
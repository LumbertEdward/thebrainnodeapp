import Header from "./dashboardheader";
import ProductTable from "./productstable";
import styles from "../styles/Products.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faHome,faMoneyBillWave,faMoneyCheck,faShoppingBasket, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
export default function Products() {
  
    return (
        <div>
       <Header/>
       <div  className = {styles.dashboard__product}>
       <div className = {styles.mainpage__header}>
          <ul>
            <li><FontAwesomeIcon icon = {faHome} className = {styles.mainpage__home}/>
            <span>Home</span></li>
            <div className = {styles.line}></div>
            <li>Product Management</li>
          </ul>
          </div>
           <div className = {styles.dashboard__addition}>
              <button><FontAwesomeIcon icon = {faPlus}  className = {styles.product__addition}/>Add New</button>
              <button><FontAwesomeIcon icon = {faEdit}  className = {styles.product__update}/>Update</button>

           </div>
           <div className = {styles.dashboard__datatable}>
           <ProductTable/>
           </div>
       </div>
        </div>
    );
}
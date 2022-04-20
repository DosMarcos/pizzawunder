// This Component is responsible for the Order-Processing
// of a Pizza-Order
import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";


// Function + Declaration of state variables for Ordering Pizzas
const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const cart = useSelector((state) => state.cart);
  const amount = cart.total;

  // Function for creating a new order
  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  // Creating the Order-Component
  return (
    <div className={styles.container}>         
      <div className={styles.wrapper}>           
        <h1 className={styles.title}>Sie zahlen {amount} € bei Lieferung.</h1>
        <div className={styles.item}>          
          <label className={styles.label}>Name + Vorname</label>
          <input
            placeholder="Ihr Name"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Telefon</label>
          <input
            type="text"
            placeholder="+49 234 567 89"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Adresse</label>
          <textarea
            rows={5}
            placeholder="Ihre Adresse"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Verbindlich Bestellen
        </button>            
      </div>
    </div>
  );
};

export default OrderDetail;
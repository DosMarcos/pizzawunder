// This Component is responsible for the Navigation-Bar of the main-page
// This Nav-Bar is not fully implemented it is a dummy
// Cart-Item is working (Klick auf Einkaufswagen)
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

// creating the Nav-Bar component
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Hier bestellen!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="https://pizzawunder.vercel.app/#Featured" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="https://pizzawunder.vercel.app/#PizzaList" passHref>
          <li className={styles.listItem}>Pizza Sortiment</li>
          </Link>  
          <Link href="https://pizzawunder.vercel.app/#Footer" passHref>
          <li className={styles.listItem}>Niederlassungen</li>
          </Link>          
          <Link href="https://pizzawunder.vercel.app/admin" passHref>
          <li className={styles.listItem}>Admin</li>
          </Link>  
          <Image src="/img/logo.png" alt="" width="160px" height="69px" />                           
        </ul>
      </div>

      <Link href="https://pizzawunder.vercel.app/cart" passHref>
        <div className={styles.item}>
        <p className={styles.list}>Warenkorb</p>
          <div className={styles.cart}>            
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
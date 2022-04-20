// This Component is responsible for the Adding-Button
// on the start page (Button "Pizza hinzufügen")
import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
    Pizzasorte hinzufügen
    </div>
  );
};

export default AddButton;
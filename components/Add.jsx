// This Component is responsible for the Adding-Logic
// of a new Pizza-Item
import { useState } from "react";
import Router from "next/router";
import styles from "../styles/Add.module.css";
import axios from "axios";

// Function + Declaration of state variables for Adding new Pizzas
const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

// Function for handling prices
  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  // Function for setting the text of extra-item (Textfeld "Beilage") 
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  // Function for finally adding extra-item (Button "Beilage hinzufügen")
  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  // Function for finally creating a new pizza (Button "Pizza erstellen")
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    // The image file for the pizza is first uploaded to a cloudinary bucket
    // Therefore you need a free cloudinary account, which you can create at: https://cloudinary.com
    // With this solution you can upload your images from everywhere in the world not only local
    // All informations and your image-file from the cloudinary-webspace is then added to the MongoDB-Database
    // Your cloudinary-account needs further configuration, please look at the "Readme.md" in the Github-Repo
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/deo7mrwyl/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axios.post("/api/products", newProduct);
      setClose(true);
      Router.reload(window.location.pathname)
    } catch (err) {
      console.log(err);
    }
  };

  // creating the formular for adding new Pizza (Formular "Neue Pizzasorte")
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Fügen Sie eine neue Pizzasorte hinzu</h1>
        <div className={styles.item}>
          <label className={styles.label}>Bild auswählen</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Name der Pizza</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Beschreibung</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Preise</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Klein"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Mittel"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Groß"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra-Beilage</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Beilage"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Preis"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Hinzufügen
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Erstelle Pizza
        </button>
      </div>
    </div>
  );
};

export default Add;
// This Component is responsible for the Adding-Logic
// of a new Pizza-Item
import { useState, useEffect } from "react";
import Router from "next/router";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { resolveHref } from "next/dist/shared/lib/router/router";

const Edit = ({ setClose, param }) => {
    // state variables for creatin new pizza-item
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    // state variables to save existing pizza-item
    const [Oldfile, setOldFile] = useState(null);
    const [Oldtitle, setOldTitle] = useState(null);
    const [Olddesc, setOldDesc] = useState(null);
    const [Oldprices, setOldPrices] = useState([]);
    const [OldextraOptions, setOldExtraOptions] = useState([]);    

    // function runs once if component is loaded
    useEffect(() => {            
        const axiosFetch = async () => {
            const response = await axios.get("http://localhost:3000/api/products/" + param);

            const data = response.data;
            setOldTitle(data.title);
            setOldDesc(data.desc);            
            setOldPrices(Oldprices => Oldprices.concat(data.prices));                        
            setOldExtraOptions(Oldextraoptions => Oldextraoptions.concat(data.extraOptions));            
            setOldFile(data.img);                        

            console.log(data);
        };
        axiosFetch();
    }, []);

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
    const handleSave = async () => {

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");

        // The image file for the pizza is first uploaded to a cloudinary bucket
        // Therefore you need a free cloudinary account, which you can create at: https://cloudinary.com
        // With this solution you can upload your images from everywhere in the world not only local
        // All informations and your image-file from the cloudinary-webspace is then added to the MongoDB-Database
        // Your cloudinary-account needs further configuration, please look at the "Readme.md" in the Github-Repo
        try {
            // If the image-url has not changed then do not upload the image again
            const url = "";
            if (file === null) {
                url = Oldfile;
            }
            else {
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/deo7mrwyl/image/upload",
                    data
                );
                url = uploadRes.data;
            }

            if (prices.every((val, index) => val === Oldprices[index])) {
                prices = [...Oldprices];
            }
            else {
                prices = [...prices];
            }
                         
            // if the state variables contain null --> nothing has changed
            title === null ? title = Oldtitle : title;
            desc === null ? desc = Olddesc : desc;

            if (extraOptions.every((val, index) => val !== OldextraOptions[index])) {
                extraOptions = [...OldextraOptions];
            }

            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            }
            console.log(newProduct);

            await axios.post("http://localhost:3000/api/products", newProduct);
            setClose(true);
            Router.reload(window.location.pathname)
        }
        catch (err) {
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
                <h1>Ändern Sie die Pizzasorte</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Bild auswählen</label>
                    <input
                        type="file"
                        placeholder={Oldfile}
                        value={file}
                        required={true}
                        onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Name der Pizza</label>
                    <input
                        placeholder={Oldtitle}
                        value={title}
                        required={true}
                        className={styles.input}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Id der Pizza [nicht editierbar]</label>
                    <input
                        placeholder={param}
                        className={styles.input}
                        type="text"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Beschreibung</label>
                    <textarea
                        placeholder={Olddesc}
                        value={desc}
                        rows={4}
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Preise</label>
                    <div className={styles.priceContainer}>
                        <input
                            placeholder={Oldprices[0]}
                            value={prices[0]}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            onChange={(e) => changePrice(e, 0)}
                        />
                        <input
                            placeholder={Oldprices[1]}
                            value={prices[1]}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            onChange={(e) => changePrice(e, 1)}
                        />
                        <input
                            placeholder={Oldprices[2]}
                            value={prices[2]}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            onChange={(e) => changePrice(e, 2)}
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Extra-Beilage</label>
                    <div className={styles.extra}>
                        <input
                            placeholder={OldextraOptions[0]}
                            value={extraOptions[0]}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            placeholder={OldextraOptions[1]}
                            value={extraOptions[1]}
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Ändern
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
                <button className={styles.addButton} onClick={handleSave}>
                    Speichern
                </button>
            </div>
        </div>
    );
};

export default Edit;
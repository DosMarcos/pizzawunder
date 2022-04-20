// This Component is the underlying layer of the Pizza-Cards
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
import { useState } from "react";
import AddButton from "../components/AddButton";
import Add from "../components/Add";

const PizzaList = ({ pizzaList }) => {
  const [close, setClose] = useState(true);
  return (
    <section id="PizzaList">
    <div className={styles.container}>
      <h1 className={styles.title}>Die beste Pizza in Ihrer Stadt!</h1>
      <p className={styles.desc}>
        Unsere Produkte enthalten keine künstlichen Aromastoffe, und werden
        stets frisch zubereitet. Wir verwenden ausschliesslich Bio-Produkte, aus
        regionalem Anbau, und kennen jedes Huhn persönlich. Alle Tiere, aus denen 
        unsere Fleischwaren hergestellt werden, haben vorher Ihr ausdrückliches Einverständnis
        erklärt.
      </p>
      {<AddButton setClose={setClose} />}
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
      {!close && <Add setClose={setClose} />}
    </div>
    </section>
  );
};

export default PizzaList;
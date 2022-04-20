// This page renders the protected area
// only allowed for admins
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import Edit from "../../components/Edit";

function Index({ orders, products }) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [close, setClose] = useState(true);
  const [pizzaId, setPizzaId] = useState(null);
  const status = ["ist bezahlt...", "wird zubereitet...", "auf dem Weg...", "ausgeliefert..."];

  // delete database-item depending on its id
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        "https://pizzawunder.vercel.app/api/products/" + id
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // load status of database-item depending on its id
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("https://pizzawunder.vercel.app/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Produkte</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Bild</th>
              <th>Id</th>
              <th>Titel</th>
              <th>Preis</th>
              <th>Status</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt="" />
                </td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}
                    onClick={() => {
                      setPizzaId(product._id);
                      setClose(false);
                    }}>
                    Ändern
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}>
                    Löschen
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Bestellungen</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Kunde</th>
              <th>Gesamtsumme</th>
              <th>Zahlung</th>
              <th>Status</th>
              <th>Aktion</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>Barzahlung</span> : <span>PayPal</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Status ändern
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {!close && <Edit param={pizzaId} setClose={setClose}>
      </Edit>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "https://pizzawunder.vercel.app/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("https://pizzawunder.vercel.app/api/products");
  const orderRes = await axios.get("https://pizzawunder.vercel.app/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
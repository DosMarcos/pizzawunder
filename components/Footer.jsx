// This Component is responsible for the Footer
// at the end of the page
import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <section id="Footer">
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Schmeckt wie beim Italiener !
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>DosMarco's Frankfurt</h1>
          <p className={styles.text}>
            Wittelsbacherallee 700
            <br /> 61385 Frankfurt am Main
            <br /> (602) 867-1010
          </p>
          <h1 className={styles.title}>DosMarco's Stuttgart</h1>
          <p className={styles.text}>
            Rotebühlplatz 31
            <br /> 70178 Stuttgart
            <br /> (602) 867-1011
          </p>
          <h1 className={styles.title}>DosMarco's Hamburg</h1>
          <p className={styles.text}>
            Rathausmarkt 54
            <br /> 21095 Hamburg
            <br /> (602) 867-1012
          </p>
          <h1 className={styles.title}>DosMarco's Düsseldorf</h1>
          <p className={styles.text}>
            Duisburger Str. 34
            <br /> 40488 Düsseldorf
            <br /> (602) 867-1013
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Open</h1>
          <p className={styles.text}>
            Montag - Freitag
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            Samstag - Sonntag
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Footer;

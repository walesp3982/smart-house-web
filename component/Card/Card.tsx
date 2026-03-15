import styles from "./styles.module.css";

interface propsCard {
  children: React.ReactNode;
}
export default function Card({ children }: propsCard) {
  return <div className={styles.card}>{children}</div>;
}

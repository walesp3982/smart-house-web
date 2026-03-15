import { ReactNode } from "react";
import styles from "./styles.module.css";

interface propsBackground {
  children: ReactNode;
}

export default function Background({ children }: propsBackground) {
  return <div className={styles.container}>{children}</div>;
}

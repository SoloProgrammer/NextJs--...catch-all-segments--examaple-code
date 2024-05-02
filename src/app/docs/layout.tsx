import React, { ReactNode } from "react";
import styles from "./docs.layout.module.css";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`${styles.container}`}>
      <aside className={`${styles.sideBarWrapper}`}>
        <Sidebar />
      </aside>
      <main className={`${styles.main}`}>{children}</main>
    </div>
  );
};

export default layout;

import { neosType } from "@/types/dateTypeVal";
import styles from "./lists.module.scss";
import Link from "next/link";

const ListItem = ({ items }: { items: neosType[] }) => {
  return (
    <div className={styles.lists}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Color Status</th>
            <th>Name</th>
            <th>Date</th>
            <th>kilometers</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: neosType) => (
            <tr>
              <td>
                {item.colorStatus === "green" && (
                  <div className={`${styles.color} ${styles.green}`}></div>
                )}
                {item.colorStatus === "orange" && (
                  <div className={`${styles.color} ${styles.orange}`}></div>
                )}
                {item.colorStatus === "red" && (
                  <div className={`${styles.color} ${styles.red}`}></div>
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.kilometers} km</td>
              <td>
                <Link href={`/neos/${item.id}`}>
                  View here
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
                    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
                  </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListItem;

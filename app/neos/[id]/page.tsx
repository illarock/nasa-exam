"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getNeo, neosState } from "@/lib/slices/getNeos";
import LineChart from "./LineChart";
import styles from "./neo.module.scss";

export default function Page({ params }: { params: any }) {
  const dispatch = useAppDispatch();
  const { xy, isLoading } = useAppSelector(neosState);
  const id = params.id;

  useEffect(() => {
    dispatch(getNeo(id));
  }, [dispatch]);

  const backHandler = () => {
    window.history.back();
  };

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.titles}>
          <h1>line Chart</h1>
          <button onClick={backHandler}>Go back</button>
        </div>
        {isLoading && (
          <div className={styles.loader}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        )}
        {!isLoading && <LineChart axis={xy} id={id} />}
      </section>
    </main>
  );
}

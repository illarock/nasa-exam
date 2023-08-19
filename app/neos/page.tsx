"use client";

import { useState } from "react";
import DateSelector from "@/components/dateSelector";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getNeos, neosState } from "@/lib/slices/getNeos";
import useDateCombined from "@/utils/useDateCombined";
import styles from "./neo.module.scss";
import ListItem from "./ListItem";
import Pagination from "@/components/pagination";

const Neo = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const dispatch = useAppDispatch();
  const { value, isLoading } = useAppSelector(neosState);
  const [limitRange, setLimitRange] = useState("");

  const itemsPerPages = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPages);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = value.slice(firstItemIndex, lastItemIndex);
  const itemCount = value.length;

  const DateRangeHandler = (dateRange: [Date | null, Date | null]) => {
    setDateRange(dateRange);
    if (!dateRange[0] || !dateRange[1]) return;

    let difference = dateRange[1].getTime() - dateRange[0].getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if (TotalDays >= 7) {
      setLimitRange("Date limit is only 7 Days");
      return;
    }

    const start_date = useDateCombined(dateRange[0]);
    const end_date = useDateCombined(dateRange[1]);
    setLimitRange("");

    const dates = {
      start_date: start_date,
      end_date: end_date,
    };

    dispatch(getNeos(dates));
  };

  const hasError = startDate === null && endDate === null;

  return (
    <main className={styles.neo}>
      <section className={styles.section}>
        <h1>Asteroids - NeoWs</h1>
        <p>(sample: 06/07/2023 - 06/09/2023)</p>

        <div className={styles.date}>
          <label>Date Range:</label>
          <div className={styles.datepicker}>
            <DateSelector
              isDateRange={true}
              startDate={startDate}
              endDate={endDate}
              dateChange={DateRangeHandler}
            />
            {limitRange && <span>{limitRange}</span>}
          </div>
        </div>

        {isLoading && !hasError && (
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

        {!isLoading && (
          <>
            <ListItem items={currentItems} />

            {itemCount > itemsPerPages && (
              <Pagination
                totalPosts={value.length}
                postsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default Neo;

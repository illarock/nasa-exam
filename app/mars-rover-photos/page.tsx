"use client";

import styles from "./mrp.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getMarsRoverPhotos,
  marsRoverPhotosState,
} from "@/lib/slices/getMarsRoverPhotos";
import Pagination from "@/components/pagination";
import ImageItem from "./ImageItem";
import { AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";
import DateSelector from "../../components/dateSelector";
import useDateCombined from "@/utils/useDateCombined";

const MarsRoverPhotos = () => {
  const dispatch = useAppDispatch();
  const { value, isLoading } = useAppSelector(marsRoverPhotosState);

  const itemsPerPages = 18;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPages);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = value.slice(firstItemIndex, lastItemIndex);
  const itemCount = value.length;

  useEffect(() => {
    dispatch(getMarsRoverPhotos());
  }, [dispatch]);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const modalHandler = (imageUrl: string) => {
    if (modalOpen) {
      close();
    } else {
      open();
    }
    setCurrentImage(imageUrl);
  };

  const DateHandler = (date: Date) => {
    setStartDate(date);
    if (!date) return;
    const dateCombined = useDateCombined(date);
    dispatch(getMarsRoverPhotos(dateCombined));
  };

  return (
    <main className={styles.mrp}>
      <section className={styles.section}>
        <h1>Mars Rover Photos({itemCount})</h1>
        <p>On load dates are random</p>
        <div className={styles.date}>
          <label>Select Date:</label>
          <div className={styles.datepicker}>
            <DateSelector
              selDate={startDate}
              dateChange={DateHandler}
              placeholder="Choose Date"
            />
          </div>
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

        {!isLoading && (
          <>
            {itemCount !== 0 ? (
              <ImageItem items={currentItems} modalClick={modalHandler} />
            ) : (
              <div className={styles["no-items"]}>
                <h2>no items found</h2>
              </div>
            )}

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

        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Modal
              modalOpen={modalOpen}
              handleClose={close}
              image={currentImage}
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default MarsRoverPhotos;

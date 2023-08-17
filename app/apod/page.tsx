"use client";

import { useEffect, useState } from "react";
import ImageRight from "@/components/ImageRight";
import styles from "./Apod.module.scss";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getApod, apodState } from "@/lib/slices/getApod";

const Apod = () => {
  const dispatch = useAppDispatch();
  const { value, isLoading } = useAppSelector(apodState);

  const [imageLoad, setImageLoad] = useState<boolean>(false);

  useEffect(() => {
    if (imageLoad === false) {
      dispatch(getApod());
      setImageLoad(true);
    } else {
      const interval = setInterval(() => {
        dispatch(getApod());
      }, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, imageLoad]);

  return (
    <main className={styles.apod}>
      <section className={styles.section}>
        <div className={styles.left}>
          <h1>Astronomy Picture of the Day (APOD)</h1>

          {isLoading && (
            <div className={styles.loader}>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          )}
          {!isLoading && (
            <div className={styles.image}>
              <Image
                alt=""
                height="1000"
                width="1000"
                src={value}
                priority
                className="transition-opacity opacity-0 duration-[2s]"
                onLoadingComplete={(image) =>
                  image.classList.remove("opacity-0")
                }
              />
            </div>
          )}
        </div>
        <ImageRight />
      </section>
    </main>
  );
};

export default Apod;

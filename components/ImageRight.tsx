"use client";
import { motion } from "framer-motion";
import Austronaut from "@/images/austro.png";
import styles from "./ImageRight.module.scss";
import Image from "next/image";

const ImageRight = () => {
  return (
    <div className={styles.right}>
      <motion.div
        className={styles.moon}
        drag
        dragDirectionLock
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}
        whileTap={{ cursor: "grabbing" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />
      <motion.div
        initial={{ right: "-999px" }}
        animate={{ right: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={styles.austronaut}
      >
        <Image src={Austronaut} width="550" height="996" priority alt="" />
      </motion.div>
    </div>
  );
};

export default ImageRight;

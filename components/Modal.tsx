import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.scss";
import Image from "next/image";

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg) translateY(15vh)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Modal = ({
  modalOpen,
  handleClose,
  image,
}: {
  modalOpen: boolean;
  handleClose: () => void;
  image: string;
}) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Image
          src={image}
          width="1000"
          height="1000"
          priority
          alt=""
          className="transition-opacity opacity-0 duration-[2s]"
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
      </motion.div>
    </Backdrop>
  );
};

export default Modal;

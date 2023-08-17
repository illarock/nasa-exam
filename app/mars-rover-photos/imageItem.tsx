import { photoType } from "@/types/photosType";
import Image from "next/image";
import styles from "./mrp.module.scss";

const ImageItem = ({
  items,
  modalClick,
}: {
  items: photoType[];
  modalClick: (image: string) => void;
}) => {
  return (
    <div className={styles.lists}>
      {items.map((item: photoType) => (
        <div className={styles.image} key={item.id}>
          <Image
            key={item.id}
            src={item.url}
            width="240"
            height="240"
            priority
            alt=""
            className="transition-opacity opacity-0 duration-[2s]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            onClick={() => modalClick(item.url)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageItem;

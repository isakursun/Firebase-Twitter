import { doc, updateDoc } from "firebase/firestore";
import { BiSolidSave } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";
import { useRef, useState } from "react";

const EditMode = ({
  isPicDeleting,
  setIsPicDeleting,
  close,
  id,
  text,
  isImage,
}) => {
  const inputRef = useRef();

  //? değişiklikleri kaydetme
  const handleSave = async () => {
    const tweetRef = doc(db, "tweets", id);
    try {
        //? yazı içeriğini güncelleme
      await updateDoc(tweetRef, { textContent: inputRef.current.value });
        //? resim kaldırılacaksa siler
      if (isPicDeleting) {
        await updateDoc(tweetRef, { imageContent: null });
      }
    } catch (err) {
      console.log(err);
    }

    close();
  };

  //? tweet te olan fotoğrafı silme
  const deletePic = async () => {
    setIsPicDeleting(!isPicDeleting);
  };
  return (
    <>
      <input
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        defaultValue={text}
        type="text"
      />

      <button
        onClick={handleSave}
        className="mx-5 p-2 text-blue-400 rounded-full hover:bg-gray-500 "
      >
        <BiSolidSave />
      </button>

      <button
        onClick={close}
        className="p-2 text-red-400 rounded-full hover:bg-gray-500 "
      >
        <ImCancelCircle />
      </button>

      {isImage && (
        <button
          onClick={deletePic}
          className="absolute end-0 top-20 text-xl bg-white transition p-2 text-red-600 rounded-full hover:bg-gray-500 "
        >
          <BsFillTrashFill />
        </button>
      )}
    </>
  );
};

export default EditMode;

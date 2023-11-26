import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  //? oluşturduğumuz koleksiyonun referansını alma
  const tweetCol = collection(db, "tweets");

  //? resmi storage'a yükleme ve url'ini döndürme
  const uploadImage = async (file) => {
    if (!file) {
      return null;
    }

    //?dosyayı yükleyeceğimiz konumun referansını aldık
    const fileRef = ref(storage, file.name.concat(v4()));

    //? referansını aldığımız konuma dosyayı yükledik
    return await uploadBytes(fileRef, file).then((res) =>
      getDownloadURL(res.ref)
    );
  };

  //? form gönderme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //? formdaki verileri alma
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //? içerik kontrolü
    if (!textContent && !imageContent) {
      setIsLoading(false);
      return toast.info("Lütfen tweet içeriği ekleyin.");
    }

    const imageURL = await uploadImage(imageContent);

    //tweet'i kaydetme
    await addDoc(tweetCol, {
      textContent,
      imageContent: imageURL,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });

    e.target[0].value = '';
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-700"
    >
      <img
        className="rounded-full h-[35px] md:[45px] mt-1"
        src={user?.photoURL}
      />
      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none text-normal md:text-lg"
          type="text"
          placeholder="Neler oluyor?"
          
        />
        <div className="flex justify-between items-center">
          <label
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>
          <input className="hidden" type="file" id="image" />
          <button
            disabled={isLoading}
            className="bg-blue-600 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800 font-semibold"
          >
            {isLoading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;

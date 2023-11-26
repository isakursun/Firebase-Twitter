import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import "moment/locale/tr";
import { auth, db } from "../../firebase/config";
import DropDown from "./DropDown";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  //? tweetin ne zaman atıldığını hesaplama
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  //? kullanıcın like atıp atmadığını bulma
  useEffect(() => {
    const found = tweet.likes.find((id) => id === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);

  //? silme işlemi
  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musunuz?")) {
      //? silinecek tweet'in ref. alma
      const tweetRef = doc(db, "tweets", tweet.id);

      //? silme işlemi
      await deleteDoc(tweetRef);
    }
  };

  //? like atma ve kaldırma
  const toogleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked //?oturumu açık kullanıcı like attı mı
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-gray-700">
      <img className="w-12 h-12 rounded-full" src={tweet.user.photo} />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray">
              @{tweet.user.name?.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray">{date}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        <div className="my-3">
          {isEditMode ? (
            <EditMode
              isPicDeleting={isPicDeleting}
              setIsPicDeleting={setIsPicDeleting}
              close={() => {
                setIsEditMode(false);
                setIsPicDeleting(false);
              }}
              id={tweet.id}
              isImage={tweet.imageContent}
              text={tweet.textContent}
            />
          ) : (
            <p>{tweet.textContent}</p>
          )}

          {tweet.imageContent && (
            <img
              className={`${
                isPicDeleting ? "blur-sm" : ""
              } my-2 rounded-lg w-full object-cover mx-auto max-h-[350px]`}
              src={tweet.imageContent}
            />
          )}
        </div>

        <div className="flex justify-between">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#0077ff7c]">
            <BiMessageRounded />
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#00800073]">
            <FaRetweet />
          </div>
          <div
            onClick={toogleLike}
            className="flex items-center gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ff000091]"
          >
            {isLiked ? <FcLike/> : <AiOutlineHeart/> }
            {tweet.likes.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#ffc0cb77]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

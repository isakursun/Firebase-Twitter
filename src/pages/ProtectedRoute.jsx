import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

// ? bu bileşende kullancının yetkisi varsa alt route'lara
//? erişim izni veriyoruz yoksa login sayfasına gönderiyoruz.
const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //? kullanıcının oturumu her değiştiğinde bu çalışır
    //? ve içerisinde çalışan fonksiyon user i parametre olarak alır
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  //? Kullanıcının yetkisi yoksa logine yönlendir
  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }

  //? Yetkisi var ise alt route'u göster
  return <Outlet />;
};

export default ProtectedRoute;

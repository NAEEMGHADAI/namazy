import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useContent from "../hooks/useContent";
import useLocalStorage from "../hooks/useLocalStorage";
import Loading from "./Loading";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const {
    auth,
    // persist
  } = useContent();
  // console.log(auth);
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth, refresh, persist]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading, auth]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="grid h-screen place-items-center">
          <Loading />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;

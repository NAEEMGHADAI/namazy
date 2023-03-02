import axios from "../api/axios";
import { useState } from "react";
import { useEffect } from "react";

import ShowNamazTime from "../components/ShowNamazTime";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const reqApi = async () => {
      let response = await axios("/mosque");
      setData(response.data);
    };
    reqApi();
  }, []);

  return (
    <section>
      <ShowNamazTime data={data} />
    </section>
  );
};

export default Home;

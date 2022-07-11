import { API } from "../Utilities/Api";

import { useEffect, useState } from "react";

function fetchData() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, [API]);
  return data;
}

// export const fetchData = async () => {
//   const response = await fetch('https://my-json-server.typicode.com/bladwing/DB/db');
//   const data = await response.json();
//   return data;
// };
export default fetchData;

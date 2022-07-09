import { useEffect, useState } from "react";

function useFetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://my-json-server.typicode.com/DanielBarbakadze/Advanced-JS-and-React-Basics/db')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  }, []);
  return data;
}

export default useFetch;
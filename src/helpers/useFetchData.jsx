import { API } from "../Utilities/Api";
import { useState, useEffect} from "react";


function useFetchData() {
  const [data, setData] = useState();
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((json) => setData(json));
  },[]);
  return data;
}

export default useFetchData;

import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { useState } from "react";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{marginTop:'150px' ,marginLeft:'550px'}}> 
      <div className= "sweet-loading text-center">
        <HashLoader color="#000" loading={loading} size={80} />
      </div>
    </div>
  );
}
export default Loader;

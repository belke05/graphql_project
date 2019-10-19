import React, { useState } from "react";
import DirectorDetail from "./subcomponents/DirectorDetail";

export default function DirectorSearchWrapper() {
  const [director, setDirector] = useState(null);
  const [directorSearch, setDirectorSearch] = useState("");
  return (
    <div>
      <input
        type="text"
        value={directorSearch}
        onChange={e => {
          setDirectorSearch(e.target.value);
        }}
      ></input>
      <DirectorDetail directorname={directorSearch} />
    </div>
  );
}

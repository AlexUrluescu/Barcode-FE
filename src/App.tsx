import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface ImageWithData {
  name: string;
  barcode: string;
}

const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [files, setFiles] = useState<any>();
  const [imagesWithData, setImagesWithData] = useState<ImageWithData[]>([]);

  const handleClick = () => {
    const formData = new FormData();

    Object.values(files).forEach((file: any) => {
      formData.append("images", file);
    });

    axios
      .post(`${URL}/extract`, formData)
      .then((response) => {
        setImagesWithData(response.data.data);

        setFiles([]);
      })
      .catch((error) => {
        console.error("Error uploading PDF:", error);
      });
  };

  return (
    <div className="App">
      <header>Barcode App</header>
      <div>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button onClick={handleClick}>Click</button>

        <div>
          {imagesWithData.map((image) => (
            <div key={image.barcode}>
              <span>
                {image.name} - {image.barcode}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable';
import "../styles/editormeme.css";
import { getMemes } from "../../src/getMemes";

const Imgmeme = () => {
  const [memeList, setMemeList] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [inputText, setInputText] = useState({ topText: "", bottomText: "" });
  const [textColor, setTextColor] = useState({topColor: "#FFF", bottomColor: "#FFF"});
    const [textSize, setTextSize] = useState({topSize: "40px", bottomSize: "40px"});

  const handleInputChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (e) => {
    setTextColor({
      ...textColor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeChange = (e) => {
    setTextSize({
      ...textSize,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImage = (e) => {
    setActiveImage(e.target.value);
  };

  // API call

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemes();
        setMemeList(response);
        setActiveImage(response[0].url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Download
  const handleSubmit = (e) => {
    e.preventDefault();
    html2canvas(document.querySelector('.meme'), { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(canvas => {
        let img = canvas.toDataURL('image/jpg');
        let elem = document.createElement('a');
        elem.download = 'meme.jpg';
        elem.href = img;
        elem.click();
        elem.remove();
    });
}



  return (
    <div className="meme-container">
      <form onSubmit={handleSubmit}>
        <h2 className="titleText">Selecciona una imagen</h2>
        <select onChange={onChangeImage}>
          {memeList.map((meme) => (
            <option key={meme.id} value={meme.url}>
              {meme.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="topText"
          placeholder="Texto superior"
          value={inputText.topText}
          onChange={handleInputChange}
        />
        <div className="settings">
          <div>
            <h5>Color de texto</h5>
            <input
              type="color"
              name="topColor"
              onChange={handleColorChange}
            ></input>
          </div>
          <div>
            <h5>Tamaño de texto</h5>
            <select
              name="topSize"
              value={textSize.topSize}
              onChange={handleSizeChange}
            >
              <option value="30px">Pequeño</option>
              <option value="40px">Mediano</option>
              <option value="50px">Grande</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          name="bottomText"
          placeholder="Texto inferior"
          value={inputText.bottomText}
          onChange={handleInputChange}
        />
        <div className="settings">
          <div>
            <h5>Color de texto</h5>
            <input
              type="color"
              name="bottomColor"
              onChange={handleColorChange}
            ></input>
          </div>
          <div>
            <h5>Tamaño de texto</h5>
            <select
              name="bottomSize"
              value={textSize.bottomSize}
              onChange={handleSizeChange}
            >
              <option value="30px">Pequeño</option>
              <option value="40px">Mediano</option>
              <option value="50px">Grande</option>
            </select>
          </div>
        </div>
        <button type="submit">Descargar</button>
      </form>
      <div className="meme">
        <img src={activeImage} alt="Meme" />
        <Draggable>
          <h2
            className="top"
            style={{ color: textColor.topColor, fontSize: textSize.topSize }}
          >
            {inputText.topText}
          </h2>
        </Draggable>
        <Draggable>
          <h2
            className="bottom"
            style={{
              color: textColor.bottomColor,
              fontSize: textSize.bottomSize,
            }}
          >
            {inputText.bottomText}
          </h2>
        </Draggable>
      </div>
    </div>
  );
};

export default Imgmeme;

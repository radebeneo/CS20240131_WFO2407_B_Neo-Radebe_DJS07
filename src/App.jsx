import React, { useState, useEffect } from 'react';

export default function App() {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'https://i.imgflip.com/1bij.jpg', // Default meme image
  }); 

  // Fetch meme data
  useEffect(() => {
    async function getMemes() {
      const res = await fetch('https://api.imgflip.com/get_memes');
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  // Generate random meme
  function getRandomMeme() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // Handle text input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <div>
      <header className="header">
        <img src="/vite.svg" className="header--image" alt="Logo" />
        <h1 className="header--title">Meme Generator</h1>
        <h3 className="header--project">React Course - Project 3</h3>
      </header>

      <main>
        <div className="form">
          <input
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
          <button type="button" className="form--button" onClick={getRandomMeme}>
            Get a new meme image
          </button>
        </div>

        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="Meme" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </main>
    </div>
  );
}

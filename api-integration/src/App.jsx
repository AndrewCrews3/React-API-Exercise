import { useEffect, useRef, useState } from 'react'
import './App.css'
import useSound from 'use-sound';
import soundFile from "./pokemon.mp3"

function App() {

  /*
  fetch("https://pokeapi.co/api/v2/pokemon/blaziken")
  .then((res) => {
    if(!res.ok) {
      throw new Error("couldnt fetch resource");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data.name);
  })
  .catch((error) => console.error(error));

  */


    const [count, setCount] = useState(0);
    const inputRef = useRef(null);
    const imgRef = useRef(null);
    const nameRef = useRef(null);

    useEffect(() => {
      play();
    }, [])

    const [play] = useSound(soundFile);
  
    const fetchData = async () => {
      try {
        const pokemonName = inputRef.current.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
          throw new Error("This did not work out");
        }
  
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default
        imgRef.current.src = pokemonSprite

        //console.log(data.id, data.name, data);

        const pokeName = data.name
        const pokeId = data.id
        nameRef.current.textContent = pokeId + ' ' +  pokeName

      } catch (error) {
        console.error(error);
      }
    };
  
  
    return (
      <>
      <h2>Choose Your Pokemon!</h2>
      <div className="pokemon-container">
        <input className='pokemon-input' type="text" ref={inputRef} placeholder="Enter a pokemon name" />
        <button className='pokemon-button' onClick={fetchData}>Display Pokemon</button>
        <div className="pokemon-view">
          <h3 className='pokemon-name' ref={nameRef}></h3>
          <img className='pokemon-img' onClick={play} ref={imgRef} src='' alt="Pokemon Sprite" id="pokemonSprite"/>
        </div>
      </div>
      </>
    );
  }
  
  export default App
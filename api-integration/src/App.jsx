import { useEffect, useRef, useState } from 'react'
import './App.css'

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
    const myRef = useRef(null);
  
    const fetchData = async () => {
      try {
        const pokemonName = myRef.current.value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
          throw new Error("This did not work out");
        }
  
        const data = await response.json();
        console.log(data.id, data.name);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleClick = () => {
      setCount(count + 1);
    };
  
    return (
      <>
        <div className="counter">
          <h3>{count}</h3>
          <button onClick={handleClick}>Counter</button>
        </div>
  
        <input type="text" ref={myRef} placeholder="Enter a pokemon name" />
        <button onClick={fetchData}>Display Pokemon</button>
        <img src="" alt="Pokemon Sprite" id="pokemonSprite" style={{ display: 'relative' }} />
      </>
    );
  }
  
  export default App;
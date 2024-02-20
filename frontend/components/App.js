import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData () {
      const [planetData, peopleData] = await Promise.all([axios.get(urlPlanets), axios.get(urlPeople)])
      // this async function is set to put both api data into one function combining them by using the Promise.all to run through both apis
      let people = peopleData.data.map(character => {
        // this is a let so that it can be altered as the data is altered making it more dynamic || people will now represent the data pulled from the function created for character by .mapping over the peopleData to target the below information
        return {...character, homeworld: planetData.data.find(world => world.id == character.homeworld)}
        // this is calling the data at the key of homeworld to .find planetData at the .homeworld key for each character only if it matches the world.id || we do this bc the data is structured to match id on the people data api to the world on the planet data api which we could see within postman
      })
      setData(people)
      // here we call the slice of state setData using the people variable which returns the targeted data of characters and their homeworld pairs
    }

    async function getDataFake () {
      const [people, planets] = await Promise.all([
        Promise.resolve(require('../../backend/data/people.js')),
        Promise.resolve(require('../../backend/data/planets.js'))
      ])
      let characters = people.map( char => {
        return {...char, homeworld: planets.find(world => world.id == char.homeworld)}
      })
      setData(characters)
    }
    getData
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {
        data.map(char => <Character key={char.id} data={char}/>)
      }
    </div>
  )
}
/* ❗ Map over the data in state, rendering a Character at each iteration */


export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App

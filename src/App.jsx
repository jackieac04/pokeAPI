import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let cancel
  axios.get(currentPageUrl, {cancelToken: new axios.CancelToken(c => cancel = c)}).then(res => {
    setNextPageUrl(res.data.next)
    setPrevPageUrl(res.data.previous)
    setPokemon(res.data.results.map(p => p.name))
    setLoading(false)
  })    

  return () => {
    cancel() //cancels the old req everytime we make a new one
  }
  }, [currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "loading..."

  return (
    <>
    <PokemonList pokemon={pokemon}/>
    <Pagination 
    goToNextPage={nextPageUrl ? goToNextPage : null}
    goToPrevPage={prevPageUrl ? goToPrevPage : null}/>
    </>
  );
}

export default App;

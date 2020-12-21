/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchAllPokemons, fetchPokemon } from '../../services/poke.service'
import PokemonCard from '../pokemon-card/pokemon-card';
import SearchCard from '../search-card/search-card';
import Search from "antd/lib/input/Search";
import { Button } from "antd";

const styles = require("./container.module.css");

const Container: React.FC<any> = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [nextPag, setNextPag] = useState('');
  const [prevPag, setPrevPag] = useState('');
  const [urlImages, setUrlImages] = useState([]);
  const [pokeSearch, setPokeSearch] = useState('');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');

  useEffect(() => {
    fetchGetPokemons()
  }, [url]);

  async function fetchGetPokemons(){
    const pokemonsList = await fetchAllPokemons(url)
    setPokemons(pokemonsList.results)
    setNextPag(pokemonsList.next)
    setPrevPag(pokemonsList.previous)
  }

  async function fetchGetPokemon(value: string){
    const pokemonResult = await fetchPokemon(value)
    setPokemon(pokemonResult)
    let arrayImages = []
    if(pokemonResult){
      // const keys =  Object.keys(pokemonResult.sprites)
      for(var k in pokemonResult.sprites){
        console.log("K", k)
        const value = pokemonResult.sprites[k]
        if(value){
          arrayImages.push(value)
        }
      }
      setUrlImages(arrayImages.filter(e => typeof e === 'string' && e))
    }
  }

  const onSearch = (value: any) => {
    if(value) {
      fetchGetPokemon(value)
      setPokeSearch(value)
    }else{
      setPokemon(null)
    }
  }

  const clickNextPage = () => {
    setUrl(nextPag)
    setPokemon(null)
    setPokeSearch('')
  }

  const clickPrevPage = () => {
    setUrl(prevPag)
    setPokemon(null)
    setPokeSearch('')
  }

  if(urlImages){
    console.log("SPRITES", urlImages)
  }

  return( 
    <>
      <div className={styles.header}>
        PokeAPP
      </div>
      <div className={styles.searcher}>
        <p>Para buscar un pokemon en específico escribe su nombre</p>
        <Search placeholder="Escribe el nombre de un pokemon" onSearch={onSearch} enterButton />
      </div>
        {pokeSearch ? 
          <div className={`${styles.row}`}> 
            {pokemon && 
              
              urlImages.map( (key: string) => {
                return (
                  <div className={`${styles.column}`} key={key}>
                    <SearchCard
                      url={key} 
                    />
                  </div>
                );
            })}
          </div> 
          :
          <div className={`${styles.row}`}>
            {pokemons.map(({ url, name }) => {
              return (
                <div className={`${styles.column}`} key={name}>
                  <PokemonCard
                    url={url}
                    name={name} />
                </div>
              );
            })}
          </div>
        }
        <div className={styles.buttons}>
          <Button type="primary" onClick={() => clickPrevPage()} disabled={!!!prevPag}>
            Página anterior
          </Button>
          <Button type="primary" onClick={() => clickNextPage()}>
            Página siguiente
          </Button>
        </div>
        <footer className={styles.footer}>
          Desarrollado por: Marcom Moyano - API Utilizada: https://pokeapi.co/
        </footer>
    </>
  );
};

export default Container;

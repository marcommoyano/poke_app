import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";

interface IPokemonCard {
  url: string;
  name: string;
}

const PokemonCard: React.FC<IPokemonCard> = ({
  url, name
}) => {

  const [id, setId] = useState('')

  useEffect(() => {
    setPokemonId()
  });

  const setPokemonId = () => {
    const urlId = url.split('/').slice(-2)[0]
    setId(urlId)
  };

  return(
      <Card
        hoverable
        cover={<img alt="example" src={id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ''} />}
      >
        <Meta title={name}/>
      </Card>
  );
};

export default PokemonCard;

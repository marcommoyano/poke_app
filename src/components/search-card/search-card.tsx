import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";

interface ISearchCard {
  url: string;
}

const SearchCard: React.FC<ISearchCard> = ({
  url
}) => {

  // const [id, setId] = useState('')

  useEffect(() => {
    // setPokemonId()
  }, []);

  // const setPokemonId = () => {
  //   const urlId = url.split('/').slice(-2)[0]
  //   setId(urlId)
  // };

  console.log("URL", url)

  return(
    <>
      <Card
        hoverable
        cover={<img alt="example" src={url} />}
      >
      </Card>
    </>
  );
};

export default SearchCard;

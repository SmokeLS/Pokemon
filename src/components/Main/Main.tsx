import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader';
import { AppStateType } from '../../redux/redux-store';
import PokemonCard from '../PokemonCard/PokemonCard';

type PropsType = {
  count: number;
};

const Main: React.FC<PropsType> = (props) => {
  const pokemons = useSelector((state: AppStateType) => state.app.pokemons);
  const pageSize = useSelector((state: AppStateType) => state.app.pageSize);
  const offset = useSelector((state: AppStateType) => state.app.offset);

  // const [portionNumber, setPortionNumber] = useState(1);

  const pages: Array<number> = [];

  // const leftBorderPagination: number = (portionNumber - 1) * pageSize + 1;
  // const rightBorderPagination: number = portionNumber * pageSize;

  if (!pokemons) {
    return <Preloader />;
  }

  for (let i = offset; i < pageSize + offset && i < props.count; i++) {
    if (i >= 898) {
      pages.push(i + 9103);
    } else {
      pages.push(i + 1);
    }
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {pages.map((item, index) => (
          <Col
            span={6}
            style={{
              textAlign: 'center',
            }}
          >
            <PokemonCard pokemon={pokemons[index]} id={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;

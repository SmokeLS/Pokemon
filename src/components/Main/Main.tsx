import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import Preloader from '../../common/Preloader/Preloader';
import { AppStateType } from '../../redux/redux-store';
import PokemonCard from '../PokemonCard/PokemonCard';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';

type PropsType = {
  count: number;
};

const Main: React.FC<PropsType> = React.memo((props) => {
  const pokemons = useSelector((state: AppStateType) => state.app.pokemons);
  const pageSize = useSelector((state: AppStateType) => state.app.pageSize);
  const offset = useSelector((state: AppStateType) => state.app.offset);

  const pages: Array<number> = [];

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
    <Col>
      <Row gutter={[16, 16]}>
        {pages.map((item, index) => (
          <Col
            key={item}
            xxl={{ span: 4 }}
            lg={{ span: 6 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
            style={{
              textAlign: 'center',
            }}
          >
            <ErrorBoundary>
              <PokemonCard pokemon={pokemons[index]} id={item} />
            </ErrorBoundary>
          </Col>
        ))}
      </Row>
    </Col>
  );
});

export default Main;

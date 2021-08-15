import { Button, Col } from 'antd';
import React from 'react';
import pokemon from '../../assets/pokemon.png';

import classes from './NotFoundPage.module.css';
import { NavLink } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';

const NotFoundPage = () => {
  return (
    <Col span={12} offset={6} style={{ marginTop: '150px' }}>
      <Col span={12} style={{ margin: '0 auto' }}>
        <img className={`${classes.img}`} src={`${pokemon}`} alt="pokemon" />
      </Col>
      <div className={`${classes.subtitle}`}>
        <Text type="warning">Sorry, requested page can't be found</Text>
      </div>
      <Col style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button>
          <NavLink to="/pokemons/">Back to Main Menu</NavLink>
        </Button>
      </Col>
    </Col>
  );
};

export default NotFoundPage;

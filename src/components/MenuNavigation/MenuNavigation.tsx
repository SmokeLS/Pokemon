import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { actions, setInitializedPokemon } from '../../redux/app-reducer';
import { AppStateType } from '../../redux/redux-store';
import NumericInput from '../../common/NumericInput/NumericInput';
import useWindowDimensions from '../../common/WindowsDimensions/WindowsDimensions';

type PropsType = {
  count: number;
  pokemonPageSize?: string | string[];
};

const MenuNavigation: React.FC<PropsType> = React.memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const [current, setCurrent] = useState('mail');
  const pageSize = useSelector((state: AppStateType) => state.app.pageSize);  
  
  const { width } = useWindowDimensions();

  const { SubMenu } = Menu;
  const { count } = props;

  const portionCount: number = Math.ceil(count / pageSize);

  const portionArray: Array<number> = [];

  for (let i = 0; i < portionCount; i++) {
    portionArray.push(i);
  }

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  const setNewOffset = (offset: number, pageSize: number) => {
    if (params) {
      history.push('/pokemons');
    }
    dispatch(actions.setOffset(offset));
    dispatch(setInitializedPokemon(offset, pageSize));
  };

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {width > 576 && (
          <SubMenu key="SubMenu1" icon={<SettingOutlined />} title="Pokemons number">
            {portionArray.map((item) => (
              <Menu.Item onClick={() => setNewOffset(item * pageSize, pageSize)} key={`setting:${item + 1}`}>{`${
                item * pageSize + 1
              } - ${(item + 1) * pageSize}`}</Menu.Item>
            ))}
          </SubMenu>
        )}
        {width <= 576 && (
          <SubMenu key="SubMenu1" icon={<SettingOutlined style={{ marginLeft: 5, marginRight: -5 }} />}>
            {portionArray.map((item) => (
              <Menu.Item onClick={() => setNewOffset(item * pageSize, pageSize)} key={`setting:${item + 1}`}>{`${
                item * pageSize + 1
              } - ${(item + 1) * pageSize}`}</Menu.Item>
            ))}
          </SubMenu>
        )}
        {width > 576 && (
          <Menu.Item key="menuItem1">
            <span>Pokemons page size {props.pokemonPageSize ? props.pokemonPageSize : 24}</span>
            <NumericInput type="pokemonSize" style={{ width: 120, marginLeft: 20 }} />
          </Menu.Item>
        )}
        {width <= 576 && (
          <Menu.Item key="menuItem1">
            <span>Page size {props.pokemonPageSize ? props.pokemonPageSize : 24}</span>
            <NumericInput type="pokemonSize" style={{ width: 80, marginLeft: 10 }} />
          </Menu.Item>
        )}
        {width >= 992 && (
          <Menu.Item key="menuItem2">
            <span>Input the pokemon's id</span>
            <NumericInput type="pokemonId" style={{ width: 120, marginLeft: 20 }} />
          </Menu.Item>
        )}
      </Menu>
    </>
  );
});

export default MenuNavigation;

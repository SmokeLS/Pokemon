import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { actions, setInitializedPokemon } from '../../redux/app-reducer';
import { AppStateType } from '../../redux/redux-store';

type PropsType = {
  count: number;
};

const MenuNavigation: React.FC<PropsType> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const [current, setCurrent] = useState('mail');
  const pageSize = useSelector((state: AppStateType) => state.app.pageSize);

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

  const setNewOffset = (offset: number) => {
    if (params) {
      history.push('/pokemons');
    }
    dispatch(actions.setOffset(offset));
    dispatch(setInitializedPokemon(offset));
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <SubMenu key="SubMenu1" icon={<SettingOutlined />} title="Pokemons number">
        {portionArray.map((item) => (
          <Menu.Item onClick={() => setNewOffset(item * pageSize)} key={`setting:${item + 1}`}>{`${
            item * pageSize + 1
          } - ${(item + 1) * pageSize}`}</Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default MenuNavigation;

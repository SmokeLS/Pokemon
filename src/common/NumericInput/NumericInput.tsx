import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setInitializedPokemon } from '../../redux/app-reducer';

type PropsType = {
  style: any;
};

function formatNumber(value: string) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

const NumericInput: React.FC<PropsType> = React.memo((props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');

  const title = inputValue ? (
    <span className="numeric-input-title">{inputValue !== '-' ? formatNumber(inputValue) : '-'}</span>
  ) : (
    'Input to set pokemons page size minimum = 6, maximum = 36'
  );

  const onChange = (e: any) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setInputValue(value);
    }
  };

  const onBlur = () => {
    if (!inputValue) return;
    dispatch(setInitializedPokemon(0, Number(inputValue)));
    history.push('/pokemons');
  };

  const onKeydown = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(setInitializedPokemon(0, Number(inputValue)));
      history.push('/pokemons');
    }
  };

  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Input a number"
        maxLength={25}
        onKeyDown={onKeydown}
      />
    </Tooltip>
  );
});

export default NumericInput;

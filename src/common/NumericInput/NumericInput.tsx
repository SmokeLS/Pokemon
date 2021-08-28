import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setInitializedPokemon } from '../../redux/app-reducer';
import { setPokemon } from '../../redux/pokemon-reducer';

type PropsType = {
  style: any;
  type: 'pokemonSize' | 'pokemonId';
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

  let title = inputValue ? (
    <span className="numeric-input-title">{inputValue !== '-' ? formatNumber(inputValue) : '-'}</span>
  ) : (
    'Input to set pokemons page size minimum = 6, maximum = 36'
  );

  switch (props.type) {
    case 'pokemonSize':
      title = 'Input to set pokemons page size minimum = 6, maximum = 36';
      break;
    case 'pokemonId':
      title = 'Input ID to see the pokemon';
      break;
    default:
      title = <span className="numeric-input-title">{inputValue !== '-' ? formatNumber(inputValue) : '-'}</span>;
  }

  const switchCaseChoose = () => {
    switch (props.type) {
      case 'pokemonSize':
        dispatch(setInitializedPokemon(0, Number(inputValue)));
        history.push('/pokemons');
        break;
      case 'pokemonId':
        if (Number(inputValue) === 0) return;
        dispatch(setPokemon(Number(inputValue)));
        history.push(`/pokemon/${inputValue}`);
        break;
    }
  };
  const onChange = (e: any) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      setInputValue(value);
    }
  };

  const onBlur = () => {
    if (!inputValue) return;
    switchCaseChoose();
  };

  const onKeydown = (e: any) => {
    if (e.keyCode === 13) {
      switchCaseChoose();
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

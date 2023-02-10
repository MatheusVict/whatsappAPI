import { NodeResizer } from '@reactflow/node-resizer';
import React, { useState } from 'react'
import { Handle, Position } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import {AiOutlineArrowsAlt} from 'react-icons/ai';
import { Container, H1, SquareContent } from './styles';
import { useDispatch } from 'react-redux';
import { changeNode, undoChange } from '../../../redux/nodeSlice';

/*
  Position é um enum, facilita em que ponto do elemento se coloca os handles(As conexões)
*/

const RandomSquare = ({ selected, data }) => {

  const dispatch = useDispatch();

  if(selected) {
    dispatch(changeNode({data, type: 'random'}))
  } else {
    dispatch(undoChange())
  }

  return (
    <Container>
      <H1><AiOutlineArrowsAlt/>Randomizador</H1>
      <SquareContent>
        <strong>1</strong>
        {data.randomRangeOne}%
      </SquareContent>
      <SquareContent>
        <strong>2</strong>
        {data.randomRangeTwo}%
      </SquareContent>
      <SquareContent>
        <strong>3</strong>
        {data.randomRangeThree}%
      </SquareContent>
      <SquareContent>
        <strong>4</strong>
        {data.randomRangeFour}%
      </SquareContent>
      <SquareContent>
        <strong>5</strong>
        {data.randomRangeFive}%
      </SquareContent>
      <NodeResizer 
      minHeight={200}
      minWidth={200}
      isVisible={selected}
      lineClassName='border-blue-400'
      handleClassName='h-3 w-3 bg-white border-2 rounded border-blue-400'
      />
        <Handle
         id='right'
         type='source'
         position={Position.Right}
         className='-right-5 w-3 h-3 border-2 bg-transparent bg-blue-400/80'
        />
         
        <Handle
         id='left' 
         type='source' 
         position={Position.Left}
         className='-left-5 w-3 h-3 border-2 bg-transparent bg-blue-400/80'
        />

        <Handle
         id='top'
         type='source'
         position={Position.Top}
         className='-top-5 w-3 h-3 border-2 bg-transparent bg-blue-400/80'
        />
         
        <Handle
         id='bootom' 
         type='source' 
         position={Position.Bottom}
         className='-bottom-5 w-3 h-3 border-2 bg-transparent bg-blue-400/80'
        />
    </Container>
  )
}

export default RandomSquare
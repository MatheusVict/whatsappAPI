import { NodeResizer } from '@reactflow/node-resizer';
import React, { useState } from 'react'
import { Handle, Position } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import {AiOutlineClockCircle} from '../../../styles/Icons';
import { Container, DelayLogo, H1, Header } from './styles';
import { useDispatch } from 'react-redux';
import { changeNode, undoChange } from '../../../redux/nodeSlice';

/*
  Position é um enum, facilita em que ponto do elemento se coloca os handles(As conexões)
*/

const DelaySquare = ({ selected, data }) => {
  const [delayTime, setDelayTime] = useState(data.delayTime);
  const [delayFormat, setDelayFormat] = useState(data.delayFormat);
  const dispatch = useDispatch();

  if(selected) {
    dispatch(changeNode({data, type: 'delay'}))
  } else {
    dispatch(undoChange())
  }

  console.log(`Delay: ${delayTime} e formato: ${JSON.stringify(delayFormat)}`);



  return (
    <Container>
      <Header>
      <DelayLogo><AiOutlineClockCircle size={32} fill="#FFF" /></DelayLogo>
      <p>delay inteligente</p>
      </Header>
      {data.delayTime === undefined ? (
      <p>Aguardando <strong>0 </strong> e depois continua</p>
      ): (
      <p>Aguardando <strong>{delayTime} {delayFormat.label}</strong> e depois continua</p>
      )}
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

export default DelaySquare
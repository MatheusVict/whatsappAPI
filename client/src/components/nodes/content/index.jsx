import { NodeResizer } from '@reactflow/node-resizer';
import React, { useState } from 'react'
import { Handle, Position } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import {BiBookContent} from 'react-icons/bi';
import { Container, H1 } from './styles';
import { useDispatch } from 'react-redux';
import { changeNode, undoChange } from '../../../redux/nodeSlice';

/*
  Position é um enum, facilita em que ponto do elemento se coloca os handles(As conexões)
*/

const ContetntSquare = ({selected, data, setOutputData}) => {
  const [typingDelay, setTypingDelay] = useState(data.range);
  const dispatch = useDispatch();

  if(selected) {
    dispatch(changeNode({data, type: 'content'}))
  } else {
    dispatch(undoChange())
  }
  
/*   const handleClick = () => {
    setOutputData({ message: 'Hello World!' });
  }; */

  return (
    <Container /* onClick={handleClick} */>
      <H1><BiBookContent/>Conteúdo</H1>
      
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

export default ContetntSquare
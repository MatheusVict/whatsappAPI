import React, { useCallback, useState } from 'react';
import ReactFlow,
{
  Background,
  ConnectionMode, 
  Controls,  
  addEdge, 
  useEdgesState, 
  useNodesState, 
  useOnSelectionChange
} from 'reactflow';
import 'reactflow/dist/style.css';
import ContetntSquare from '../nodes/content';
import DefaultEdge from '../edges/Default-edge';
import * as Toolbar from '@radix-ui/react-toolbar';
import ButtonSquare from '../nodes/buttons';
import ConditionSquare from '../nodes/conditions';
import ConnectionSquare from '../nodes/connection';
import RandomSquare from '../nodes/random';
import DelaySquare from '../nodes/delay';
import IntegrationSquare from '../nodes/integration';
import {AiFillAlert, AiOutlineArrowsAlt, AiOutlineClockCircle, AiOutlineFileAdd, AiFillSave} from 'react-icons/ai'
import {BiBookContent} from 'react-icons/bi'
import {BsLightningChargeFill, BsArrowLeftRight, BsArrowsAngleContract, BsGraphUp} from 'react-icons/bs'
import ActionSquare from '../nodes/action';
import { ActionBody, ActionHeader, ButtonBody, ButtonHeader, ButtonTextArea, CardButtons, CardIconButton, CardTextButton, CardsButtonsContent, ConditionBody, ConditionHeader, ConnectionBody, ConnectionHeader, Container, ContentBody, ContentHeader, DelayHeader, DelayRange, InputRange, InputRangeRandom, InputTimeDelay, Modal, RandomHeader } from './styles';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { CiImageOn } from "react-icons/ci";
import { RxVideo } from "react-icons/rx";
import { FiFile } from "react-icons/fi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
/*
  Notes: 
  Nodes = Tudo que vai aparecer em tela(Pode ter seu próprio estilo e configuração),
  Edges = As conexões(As linhas de conexão, também possuindo suas próprias configurações)
*/

const NODE_TYPES = {
  square: ContetntSquare,
  button: ButtonSquare,
  action: ActionSquare,
  condition: ConditionSquare,
  connection: ConnectionSquare,
  random: RandomSquare,
  delay: DelaySquare,
  integration: IntegrationSquare,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

// data = transporta informações da aplicação até os Nodes
const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'button',
    position: {
      x: 200,
      y: 400,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  },
]

const ConditionSelectList = [
  'etiqueta',
  'Dia da semana ao passar por aqui',
  'Horário de atendimento',
  'Hora ao passar por aqui',
  'Nome completo',
  'Primeiro nome',
  'Sobrenome',
  'DDD',
  'Telefone'
]

const ConnectionSelectList = [
  'Quer Reembolsar / trocar',
  'Saudação',
  'Quer reagendar',
  'Quer cancelar',
  'Esquenta chip 1',
  'Entregador está a caminho',
  'Retorno',
  'Não saiu para rota',
  'Pedidos Agendados'
]

function Flow() {
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChanges] = useNodesState(INITIAL_NODES);
  const [activeTyping, setActiveTyping] = useState()
  const [randomRangeOne, setRandomRangeOne] = useState([])
  const [randomRangeTwo, setRandomRangeTwo] = useState([])
  const [randomRangeThree, setRandomRangeThree] = useState([])
  const [randomRangeFour, setRandomRangeFour] = useState([])
  const [randomRangeFIve, setRandomRangeFive] = useState([])
  const [actionSelect, setActionSelect] = useState('esquentaChip');
  const [buttonTextArea, setButtonTextArea] = useState('');
  const [conditionSelect, setConditionSelect] = useState(ConditionSelectList);
  const [connectionSelect, setConnectionSelect] = useState(ConnectionSelectList);
  const [conditionValue, setConditionValue] = useState()
  const [connectionValue, setConnectionValue] = useState('')
  const [delayTime, setDelayTime] = useState();
  const [delayFormat, setDelayFormat] = useState();
  const {userIns, flowId} = useParams();


  // Content Square Satet
  const [inputsContent, setInputsContent] = useState([{ value: '' }])
  const [textAreaContent, setTextAreaContent] = useState([{ value: '' }])
  const [imageContent, setImageContent] = useState([{ value: '' }])
  const [videoContent, setVideoContent] = useState([{ value: '' }])
  const [fileContent, setFileContent] = useState([{ value: '' }])
  const [audioContent, setAudioContent] = useState([{ value: '' }])

  // Content Square Funcs
  const handleAddRangesInputs = (e) => {
    setInputsContent(ranges => [
      ...ranges,
      {
        value: ''
      }
    ])
  };

  const handleRemoveInput = (index) => {
    setInputsContent(inputsContent.filter((_, i) => i !== index));
  };

  const handleChangeInputs = (index, event) => {
    const values = [...inputsContent];
    values[index].value = event.target.value;
    setInputsContent(values);
  }

  const handleRemoveTextArea = (index) => {
    setTextAreaContent(textAreaContent.filter((_, i) => i !== index));
  };

  const handleChangeTextArea = (index, event) => {
    const values = [...textAreaContent];
    values[index].value = event.target.value;
    setTextAreaContent(values);
  }

  const handleAddTextArea = (e) => {
    setTextAreaContent(content => [
      ...content,
      {
        value: ''
      }
    ])
  };

  const handleRemoveImage = (index) => {
    setImageContent(imageContent.filter((_, i) => i !== index));
  };

  const handleChangeImage = (index, event) => {
    const values = [...imageContent];
    values[index].value = event.target.value;
    setImageContent(values);
  }

  const handleAddImage = (e) => {
    setImageContent(content => [
      ...content,
      {
        value: ''
      }
    ])
  };

  const handleRemoveVideo = (index) => {
    setVideoContent(videoContent.filter((_, i) => i !== index));
  };

  const handleChangeVideo = (index, event) => {
    const values = [...videoContent];
    values[index].value = event.target.value;
    setVideoContent(values);
  }

  const handleAddVideo = (e) => {
    setVideoContent(content => [
      ...content,
      {
        value: ''
      }
    ])
  };

  const handleRemoveFile = (index) => {
    setFileContent(fileContent.filter((_, i) => i !== index));
  };

  const handleChangeFile = (index, event) => {
    const values = [...fileContent];
    values[index].value = event.target.value;
    setFileContent(values);
  }

  const handleAddFile = (e) => {
    setFileContent(content => [
      ...content,
      {
        value: ''
      }
    ])
  };

  const handleRemoveAudio = (index) => {
    setAudioContent(fileContent.filter((_, i) => i !== index));
  };

  const handleChangeAudio = (index, event) => {
    const values = [...audioContent];
    values[index].value = event.target.value;
    setAudioContent(values);
  }

  const handleAddAudio = (e) => {
    setAudioContent(content => [
      ...content,
      {
        value: ''
      }
    ])
  };

  inputsContent.map(con => {
    console.log(con.value)
  })
  
  const node = useSelector(state => state.node);
  console.log(node)
  const [rangeValue, setRangeValue] = useState(3)

  const onConnect = useCallback((connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, []);

  function addSquareNode(type) {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: type,
        position: {
          x: 750,
          y: 350,
        },
        data: {
          range: inputsContent,
          randomRangeOne: randomRangeOne,
          randomRangeTwo: randomRangeTwo,
          randomRangeThree: randomRangeThree,
          randomRangeFour: randomRangeFour,
          randomRangeFive: randomRangeFIve,
          registration: actionSelect,
          textArea: buttonTextArea,
          condtionValue: conditionValue,
          connection: connectionValue,
          delayTime: delayTime,
          delayFormat: delayFormat
        },
      }
    ])
  }
 
  return (
    <>
      <Container>
        
        <ReactFlow 
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnect}
        onNodesChange={onNodesChanges}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
        >
          <Background
            gap={1}
            size={10}
            color='#f2f5f7'
          />
          <Controls />
        </ReactFlow>
        <Toolbar.Root style={{ position: 'fixed', top: '80px' }}
        className='fixed flex top-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-24 w-4/6 overflow-hidden'>
          <Toolbar.Button
          className='h-14 w-20 mr-6  rounded-lg bg-green-300  mt-4'
          onClick={() => addSquareNode('square')}
          >
            Conteúdo 
            <BiBookContent className='ml-8'/>
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-20 mb-2 mr-6 bg-green-300 mt-4 rounded-lg'
          onClick={() => addSquareNode('button')}
          >
            Botões
            <AiFillAlert className='ml-7'/>
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
          onClick={() => addSquareNode('action')}
          >
            Ação
            <BsLightningChargeFill className='ml-7'/>
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
          onClick={() => addSquareNode('condition')}
          >
            <p>Condição</p>
            <BsArrowLeftRight className='ml-7'/>
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
          onClick={() => addSquareNode('connection')}
          >
            Conexão
            <BsArrowsAngleContract className='ml-7'/>
            
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-28 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
          onClick={() => addSquareNode('random')}
          >
            Randomização
            <AiOutlineArrowsAlt className='ml-11'/>
          </Toolbar.Button>
          <Toolbar.Button
          className='h-14 w-20 mr-6 bg-green-300 mt-4 rounded-lg houver:mt-4'
          onClick={() => addSquareNode('delay')}
          >
            Delay
            <AiOutlineClockCircle className='ml-8'/>
          </Toolbar.Button>
        </Toolbar.Root>
      </Container>
      {node.isClicked && (
        <Modal>
          {node.node.type === 'content' && (
            <>
              <ContentHeader>Conteúdo</ContentHeader>
              <ContentBody>
                 {inputsContent.map((input, index) => {
                  return (
                  <DelayRange>
                    <InputRange type='range' max={6} value={input.value} onChange={(e) => handleChangeInputs(index, e)}/>
                    <strong>{input.value}seg</strong><br />
                    <label>
                    <input type="checkbox" value={activeTyping} onChange={(e) => setActiveTyping(e.target.value)}/>
                    <strong>Ativar Digitando</strong>
                    </label>
                    <button onClick={() => handleRemoveInput(index)}>Apagar</button>
                </DelayRange>
                  )
                 })}
                 {textAreaContent.map((input, index) => {
                  return (
                    <>
                      <textarea value={input.value} onChange={(e) => handleChangeTextArea(index, e)}/>
                      <button onClick={() => handleRemoveTextArea(index)}>Deletar</button>
                    </>
                  )
                 })}
                 {imageContent.map((input, index) => {
                  return (
                    <>
                    <DelayRange>
                    Tamanho máximo permitido: 2MB, Tipos de arquivos aceitos: jpg, jpeg, png, webp
                    <input type="file" value={input.value} onChange={(e) => handleChangeImage(index, e)} />
                    <button onClick={() => handleRemoveImage(index)}>Deletar</button>
                    </DelayRange>
                    </>
                  )
                 })}
                 {videoContent.map((input, index) => {
                  return (
                    <DelayRange>
                    <p>
                      Subir Video
                      Formatos aceitos .mp4
                      Tamanho máx.: 5MB
                    </p>
                    <input type="file" value={input.value} onChange={(e) => handleChangeVideo(index, e)} />
                    <button onClick={() => handleRemoveVideo(index)}>Deletar</button>
                    </DelayRange>
                  )
                 })}
                 {fileContent.map((input, index) => {
                  return (
                    <DelayRange>
                    <p>
                      Subir Arquivo
                    </p>
                    <p> Formatos aceitos </p>
                    <p>pdf,.doc,.docx,.htm,.html,<br /> .json,.xml,.txt,.csv,.zip, <br />.7z,.xls,.xlsx,.ppt,.pptx</p>
                    <p>Tamanho máx.: 5MB</p>
                    
                    <input type="file" value={input.value} onChange={(e) => handleChangeFile(index, e)} />
                    <button onClick={() => handleRemoveFile(index)}>Deletar</button>
                    </DelayRange>
                  )
                 })}
                 {audioContent.map((input, index) => {
                  return (
                    <DelayRange>
                    <p>
                      Subir Áudio
                      Formatos aceitos .mp3
                      Tamanho máx.: 5MB
                    </p>
                    
                    <input type="file" value={input.value} onChange={(e) => handleChangeAudio(index, e)} />
                    <button onClick={() => handleRemoveAudio(index)}>Deletar</button>
                    </DelayRange>
                  )
                 })}
                  
              </ContentBody>
              <CardsButtonsContent>
                <CardButtons onClick={handleAddTextArea}>
                  <CardIconButton><AiOutlineFileAdd/></CardIconButton>  
                  <CardTextButton>Texto</CardTextButton>
                </CardButtons>  
                <CardButtons onClick={handleAddImage}>
                  <CardIconButton><CiImageOn/></CardIconButton>  
                  <CardTextButton>Imagem</CardTextButton>
                </CardButtons>  
                <CardButtons onClick={handleAddVideo}>
                  <CardIconButton><RxVideo/></CardIconButton>  
                  <CardTextButton>Video</CardTextButton>
                </CardButtons>  
                <CardButtons onClick={handleAddFile}>
                  <CardIconButton><FiFile/></CardIconButton>  
                  <CardTextButton>Arquivo</CardTextButton>
                </CardButtons>  
                <CardButtons>
                  <CardIconButton><MdOutlineKeyboardVoice/></CardIconButton>  
                  <CardTextButton>Audio</CardTextButton>
                </CardButtons>  
                <CardButtons>
                  <CardIconButton><AiFillSave/></CardIconButton>  
                  <CardTextButton>Salvar</CardTextButton>
                </CardButtons>  
                <CardButtons onClick={handleAddRangesInputs}>
                  <CardIconButton><AiOutlineClockCircle/></CardIconButton>  
                  <CardTextButton>Delay</CardTextButton>
                </CardButtons>  
                <CardButtons>
                  <CardIconButton><TbAlertTriangle/></CardIconButton>  
                  <CardTextButton>Auto Off</CardTextButton>
                </CardButtons>  
              </CardsButtonsContent>
            </>
          )}
          {node.node.type === 'random' && (
            <>
              <RandomHeader>
                Randomizador
              </RandomHeader>
              <strong>1</strong>
              <InputRangeRandom type='range' 
              value={randomRangeOne} 
              onChange={(e) => setRandomRangeOne(e.target.value)}
              />
              <strong>2</strong>
              <InputRangeRandom type='range' 
              value={randomRangeTwo} 
              onChange={(e) => setRandomRangeTwo(e.target.value)}
              />
              <strong>3</strong>
              <InputRangeRandom type='range' 
              value={randomRangeThree} 
              onChange={(e) => setRandomRangeThree(e.target.value)}
              />
              <strong>4</strong>
              <InputRangeRandom type='range' 
              value={randomRangeFour} 
              onChange={(e) => setRandomRangeFour(e.target.value)}
              />
              <strong>5</strong>
              <InputRangeRandom type='range' 
              value={randomRangeFIve} 
              onChange={(e) => setRandomRangeFive(e.target.value)}
              />
            </>
          )}
          {node.node.type === 'action' && (
            <>
              <ActionHeader>
                Ação
              </ActionHeader>
              <ActionBody>
                <label>Inscrição em Sequência</label>
                <select name="registration" value={actionSelect}
                 onChange={(e) => setActionSelect(e.target.value)}
                >
                  <option value="esquentaChip">Esquenta Chip</option>
                  <option value="8hours">8 Horas do dia seguinte</option>
                </select>
              </ActionBody>
            </>
          )}
          {node.node.type === 'button' && (
            <>
              <ButtonHeader>
                Botões
              </ButtonHeader>
              <ButtonBody>
                <ButtonTextArea value={buttonTextArea} onChange={(e) => setButtonTextArea(e.target.value)}/>
              </ButtonBody>
            </>
          )}
          {node.node.type === 'condition' && (
            <>
              <ConditionHeader>
                Condição
              </ConditionHeader>
              <ConditionBody>
                <select name="" id="" 
                onChange={(e) => setConditionValue(e.target.value)}
                >
                  {conditionSelect.map((cond, index) => {
                    return (
                      <option key={index} value={cond} 
                      >
                        {cond}
                      </option>
                    )
                  })}
                </select>
              </ConditionBody>
            </>
          )}
          {node.node.type === 'connection' && (
            <>
              <ConnectionHeader>
                Conexão de fluxo
              </ConnectionHeader>
              <ConnectionBody>
                <select name="" id="" onChange={(e) => setConnectionValue(e.target.value)}>
                  {connectionSelect.map((conn, index) => {
                    return (
                      <option key={index} value={conn} 
                      >
                        {conn}
                      </option>
                    )
                  })}
                </select>
              </ConnectionBody>
            </>
          )}
          {node.node.type === 'delay' && (
            <>
              <DelayHeader>
                Delay inteligente
              </DelayHeader>
              <InputTimeDelay type='number' value={delayTime} onChange={(e) => setDelayTime(e.target.value)}/>
              <select name="" id="" value={delayFormat} onChange={(e) => setDelayFormat(e.target.value)}>
                <option value="minutos">Minutos</option>
                <option value="horas">Horas</option>
                <option value="dias">Dias</option>
              </select>
            </>
          )}
        </Modal>
      )}
      
    </>
  );
}

export default Flow;
import styled from "styled-components";

export const Container = styled.div`
width: 75vw;
height: 100vh;
float: right;
`
//Nodes and modals styles

export const Modal = styled.div`
float: left;
width: 25vw;
height: 100vh;
background-color: #FFF;
color: #000;
overflow: scroll;
`
// Content Square

export const ContentHeader = styled.div`
width: 100%;
height: 35px;
background: #ffd8d2;
text-align: center;
`

export const CardsButtonsContent = styled.div`
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
display: flex;
margin-top: 100px;
`
export const CardButtons = styled.div`
display: flex;
flex-direction: column;
position: relative;
justify-content: center;
align-items: center;
overflow: hidden;
box-sizing: border-box;
margin: 4px;
width: 80px;
height: 90px;
border: 2px dashed #e1e5ea;
border-radius: 15px;
background-color: #fff;
color: #8492a6;
text-align: center;
cursor: pointer;
transition: border-color .15s,color .15s;
transform: translate3d(0, 0, 0);
will-change: border-color,color;
`

export const CardIconButton = styled.div`
color: #8492a6;
text-align: center;
cursor: pointer;
`

export const CardTextButton = styled.div`
color: #8492a6;
text-align: center;
cursor: pointer;
`

export const ContentBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`

export const DelayRange = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 110px;
margin-top: 10px;
width: 90%;
height: 10%;
border-radius: 10px;
color: #5a677d;
border: 1px dotted gray;
` 

export const InputRange = styled.input`
margin-right: .5rem;
max-width: 50%;
`

// Random square

export const RandomHeader = styled.div`
width: 100%;
height: 35px;
background: #e1fff6;
text-align: center;
`
export const InputRangeRandom = styled.input`
display: flex;
padding-right: 10px;
padding-bottom: 30px;
border-bottom: 1px solid #e1e5ea;
`

// Action Square

export const ActionHeader = styled.div`
width: 100%;
height: 35px;
background: #ffeca7;
text-align: center;
`

export const ActionBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 110px;
margin-top: 5px;
width: 100%;
height: 10%;
border-radius: 10px;
color: #5a677d;
border: 1px dotted gray;
` 

export const ButtonHeader = styled.div`
width: 100%;
height: 35px;
background: #ffeef8;
text-align: center;
`

export const ButtonBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 110px;
margin-top: 5px;
width: 100%;
height: 10%;
border-radius: 10px;
color: #5a677d;
`

export const ButtonTextArea = styled.textarea`
resize: vertical;
`

export const ConditionHeader = styled.div`
width: 100%;
height: 35px;
background: #efe5ff;
text-align: center;
`

export const ConditionBody = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 110px;
margin-top: 5px;
width: 12%;
padding-left: 80px;
height: 10%;
border-radius: 10px;
color: #5a677d;
`

export const ConnectionHeader = styled.div`
width: 100%;
height: 35px;
background: #efe5ff;
text-align: center;
`
export const ConnectionBody = styled.div`
display: flex;
justify-content: center;
max-width: 70%;
text-align: center;
`

export const DelayHeader = styled.div`
width: 100%;
height: 35px;
background: #ffca92;
text-align: center;
`

export const InputTimeDelay = styled.input`
border-radius: 5px;
max-width: 45%;
`

export const InputTypeTimeDelay = styled.select`
border-radius: 5px;
max-width: 45%;
`




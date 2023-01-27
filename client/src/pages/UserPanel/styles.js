import styled from "styled-components";
import {FaTrash} from "../../styles/Icons"

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  margin: 20px 0;
  flex-direction: row;
  justify-content: center;
  padding: 26px;
  align-items: center;

  form {
    background-color: #F5F5F5;
    width: 500px;
    display: flex;
    border-radius: 6px;
    padding: 24px;
    flex-direction: column;
    gap: 20px;

    input {
      padding: 10px;
      border-radius: 6px;
      border: none;
      transition: all 0.2s;
      outline: none;
      box-shadow: 0 0 2px 0;

      :focus {
        border: 3px solid #22a39f;
      }
    }
  }
`;

export const Main = styled.div`
  display: flex;
  gap: 30px;
  background-color: #DCDCDC;
  border-radius: 4px;
  padding: 20px;
`

export const MessageInput = styled.textarea`
  max-width: 450px;
  padding: 10px;
  border-radius: 6px;
  border: none;
  transition: all 0.2s;
  outline: none;
  min-height: 100px;
  max-height: 250px;
  box-shadow: 0 0 2px 0;

  :focus {
    border: 3px solid #22a39f;
  }
`;

export const ContactNameInput = styled.input`
  border-radius: 6px;
  border: none;
  transition: all 0.2s;
  outline: none;

  :focus {
    border: 3px solid #22a39f;
  }
`;

export const SendMsgBtn = styled.input`
  width: 100px;
  align-self: flex-end;
  background-color: #22a39f;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;

  :hover {
    padding: 12px;
  }
`;

export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-end;
  gap: 30px;
`;

export const FirstColumn = styled.div``;

export const ContactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContactRow = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  background-color: 	#F5F5F5;
  padding: 12px;
  border-radius: 6px;

  p {
    font-size: 14px;
    color: 	#808080;
  }

  b {
    text-transform: capitalize;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export const ContactColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProfilePicture = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100%;
`

export const DeleteContactBtn = styled(FaTrash)`
width: 26px;
height: 26px;
padding: 6px;
transition: all .2s;
cursor: pointer;

:hover {
  color: #22a39f;
  width: 28px;
  height: 28px;
}
`

export const ContactOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`
import { useEffect, useState } from "react";
import Menu from "../menu";
import { AddField, ContentTable, DownloadButton, HeaderContainer, SelectField, SelectFieldContainer } from "./styles";
import { useParams } from "react-router";

function Fields() {

    const [fields, SetField] = useState([]);
    const [selectedTable, setSelectedTable] = useState('user');
    
    const {userIns} = useParams();

    const handleAddInf = () => {
        const newInfo = [
            {
                name: 'Maria',
                type: 'texto',
                description: 'Tal tal'
            },
            {
                name: 'João',
                type: 'texto',
                description: 'Tal tal'
            },
        ]

        SetField(newInfo)
    }

    useEffect(() => {}, [])

    const handleSelectUser = () => {
        setSelectedTable('user');
      };
      
      const handleSelectRobot = () => {
        setSelectedTable('robot');
      };

    const deleteField = (name) => {
        const index = fields.findIndex(field => field.name === name);
        const oldField = [...fields];
        oldField.splice(index, 1);
        SetField(oldField);
    }

    return(
        <>
            <Menu/>
            <HeaderContainer>
                <SelectFieldContainer>
                    <SelectField onClick={handleSelectUser}>
                        <p>Campos do Usuário</p>
                    </SelectField>
                    <SelectField onClick={handleSelectRobot}>
                        <p>Campos do Robô</p>
                    </SelectField>
                </SelectFieldContainer>
                {selectedTable === 'robot' && (
                    <DownloadButton>
                        Baixe relatório
                    </DownloadButton>
                )}
                <AddField onClick={handleAddInf}>
                    +
                </AddField>
            </HeaderContainer>
            <ContentTable>
                {selectedTable === 'user' && (
                    <>
                    <tr>
                        <th><p className="titles">Nome</p></th>
                        <th><p className="titles">Tipo</p></th>
                        <th><p className="titles">Descrição</p></th>
                    </tr>
                    <tr>
                        <td>
                            <p className="itens">ajuda_cliente</p>
                        </td>
                        <td>
                            <p className="itens">texto</p>
                        </td>
                        <td>
                            <p className="itens">_________________</p>
                        </td>
                        <td>
                            <button>
                                🗑️
                            </button>
                        </td>
                    </tr>
                    </>
                )}
                {selectedTable === 'robot' && (
                    <>
                        <tr>
                            <th><p className="titles">Nome</p></th>
                            <th><p className="titles">Valor</p></th>
                            <th><p className="titles">Tipo</p></th>
                            <th><p className="titles">Descrição</p></th>
                        </tr>
                        <tr>
                            <td>Sem dados</td>
                        </tr>
                    </>
                    
                )}
                {fields.map((field, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <p>{field.name}</p>
                                </td>
                                <td>
                                    <p className="itens">{field.type}</p>
                                </td>
                                <td>
                                    <p className="itens">{field.description}</p>
                                </td>
                                <td>
                                    <button 
                                    onClick={() => deleteField(field.name)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                               </tr>
                        )
                    })}
            </ContentTable>
        </>
    )
}

export default Fields;
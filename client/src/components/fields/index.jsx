import { useState } from "react";
import Menu from "../menu";
import { AddField, ContentTable, HeaderContainer, SelectField, SelectFieldContainer } from "./styles";

function Fields() {

    const [fields, SetField] = useState([]);

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

    const deleteField = (name) => {
        fields.map((field, index) => {
            if(field.name === name) {
                const deleteFIeld = fields.splice(index, 1);
                SetField(deleteFIeld)
            }
            
        })
    }

    return(
        <>
            <Menu/>
            <HeaderContainer>
                <SelectFieldContainer>
                    <SelectField>
                        <p>Campos do Usuário</p>
                    </SelectField>
                    <SelectField>
                        <p>Campos do Robô</p>
                    </SelectField>
                </SelectFieldContainer>
                <AddField onClick={handleAddInf}>
                    +
                </AddField>
            </HeaderContainer>
            <ContentTable>
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
                {fields.map((field, index) => {
                        return <tr key={index}>
                                <td><p className="itens">{field.name}</p></td>
                                <td><p className="itens">{field.type}</p></td>
                                <td><p className="itens">{field.description}</p></td>
                                <td><button onClick={() => deleteField(field.name)}>🗑️</button></td>
                               </tr>
                        
                    })}
            </ContentTable>
        </>
    )
}

export default Fields;
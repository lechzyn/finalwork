import { View, Text, Alert, TouchableOpacity } from "react-native";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import { collection, addDoc} from "firebase/firestore"; 
import  Estilos  from '../../../Componentes/Estilos';
import TextoInput from "../../../Componentes/TextoInput";

export default function ValorHora(props) {

    const [valorHora, setValorHora] = useState('');

    const DefinirValorHora = async () =>{
        if (valorHora === '') {
            Alert.alert("Erro", "Por favor, preencha o valor da hora.");
            return;
        }
        try {
            const docRef = await addDoc(collection(firestore, "valor"), {
                valorHora: valorHora
            });
            console.log("Valor da hora definido com ID: ", docRef.id);
            Alert.alert("Sucesso", "Valor da hora definido!");
            setValorHora(''); 
        } catch (error) {
            console.error("Erro ao definir valor da hora: ", error);
            Alert.alert("Erro", "Não foi possível definir o valor da hora.");
        }
    }

    return(
        <View style={Estilos.container}>
            <Text style={Estilos.header}>Definir Valor da Hora</Text>
            <TextoInput
                label="Insira o valor da hora"
                estilo={Estilos.input}  
                value={valorHora}
                setValue={setValorHora}
                placeholder="Ex: 5.00"
            />
            
            <TouchableOpacity style={Estilos.buttonHome} onPress={DefinirValorHora}>
                <Text style={Estilos.buttonText}>Definir Valor</Text>
            </TouchableOpacity>
        </View>
    )
}
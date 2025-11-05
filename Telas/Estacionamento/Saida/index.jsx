import { collection, updateDoc, Timestamp,doc } from "firebase/firestore"; 
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import  Estilos  from '../../../Componentes/Estilos';
import TextoInput from "../../../Componentes/TextoInput";


export default function Saida(props) {

    const [placa, setPlaca] = useState('');


    const DefinirSaida = async () =>{
        if (placa === '') {
            Alert.alert("Erro", "Por favor, preencha a placa.");
            return;
        }

        const carro = doc()
    
        try {
            const dataHoraSaida = Timestamp.now(); 

            await updateDoc(collection(firestore, "carros"), {
                
            });
    

        } catch (error) {
            console.error("Erro ao registrar entrada: ", error);
            Alert.alert("Erro", "Não foi possível registrar a entrada.");
        }
    }



    return(
        <View>

        </View>
    )
}
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { Estilos } from '../../../Componentes/Estilos';
import TextoInput from "../../../Componentes/TextoInput";

export default function Entrada(props) {
    const [placa, setPlaca] = useState('');

    const RegistrarEntrada = async () => {
        if (placa === '') {
            Alert.alert("Erro", "Por favor, preencha a placa.");
            return;
        }

        try {
            const dataHoraAtual = Timestamp.now(); 

            const docRef = await addDoc(collection(firestore, "entradas"), {
                placa: placa,
                dataHoraEntrada: dataHoraAtual
            });

            console.log("Documento salvo com ID: ", docRef.id);
            Alert.alert("Sucesso", "Entrada registrada!");
            setPlaca(''); 

        } catch (error) {
            console.error("Erro ao registrar entrada: ", error);
            Alert.alert("Erro", "Não foi possível registrar a entrada.");
        }
    }

    return (
        <View style={Estilos.container}>

            <Text style={Estilos.header}>Registrar Entrada</Text>

            <TextoInput
                label="Insira a placa do veículo"
                estilo={Estilos.input}
                value={placa}
                setValue={setPlaca}
                placeholder="Ex: ABC-1234"
            />

            <TouchableOpacity style={Estilos.buttonHome} onPress={RegistrarEntrada}>
                <Text style={Estilos.buttonText}>Registrar Entrada</Text>
            </TouchableOpacity>

        </View>
    )
}
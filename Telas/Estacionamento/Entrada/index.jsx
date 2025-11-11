import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import Estilos from "../../../Componentes/Estilos";
import TextoInput from "../../../Componentes/TextoInput";

export default function Entrada(props) {
    const [placa, setPlaca] = useState('');
    const [hora, setHora] = useState('');
    const [data, setData] = useState('');
    const [carregando, setCarregando] = useState(false);

    const RegistrarEntrada = async () => {
        if (placa === '') {
            Alert.alert("Erro", "Por favor, preencha a placa.");
            return;
        }

        setCarregando(true);

        try {
            const docRef = await addDoc(collection(firestore, "carros"), {
                placa: placa.trim().toUpperCase(),
                horaEntrada: hora,
                dataEntrada: data,
                horaSaida: "",
                dataSaida: "",
                valor: 0,
                status: "ativo"
            });

            console.log("✅ Documento salvo com ID: ", docRef.id);
            Alert.alert("Sucesso", "Entrada registrada!");

            setPlaca('');
            setHora('');
            setData('');

            props.navigation.navigate("Home");

        } catch (error) {
            console.error("❌ Erro ao registrar entrada: ", error);
            Alert.alert("Erro", "Não foi possível registrar a entrada.");
        } finally {
            setCarregando(false);
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

            <TextoInput
                label="Insira a data de entrada"
                estilo={Estilos.input}
                value={data}
                setValue={setData}
                placeholder="Ex: DD/MM/AAAA"
            />

            <TextoInput
                label="Insira a hora de entrada"
                estilo={Estilos.input}
                value={hora}
                setValue={setHora}
                placeholder="Ex: HH"
            />

            <Button 
                mode="contained" 
                onPress={RegistrarEntrada}
                loading={carregando}
                disabled={carregando}
                style={{ marginTop: 20, paddingVertical: 6 }}
            >
                Registrar Entrada
            </Button>
        </View>
    )
}
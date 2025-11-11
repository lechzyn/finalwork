import { collection, updateDoc, Timestamp, doc, query, where, getDocs } from "firebase/firestore"; 
import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import Estilos from '../../../Componentes/Estilos';
import TextoInput from "../../../Componentes/TextoInput";

const criarDataHora = (dataStr, horaStr) => {
    const [dia, mes, ano] = dataStr.split('/');

    return new Date(ano, mes - 1, dia, parseInt(horaStr, 10), 0, 0); 
};

export default function Saida(props) {
    const [placa, setPlaca] = useState('');
    const [dataSaidaInput, setDataSaidaInput] = useState('');
    const [horaSaidaInput, setHoraSaidaInput] = useState('');

    const [carregando, setCarregando] = useState(false);

    const DefinirSaida = async () => {
        if (!placa.trim() || !dataSaidaInput.trim() || !horaSaidaInput.trim()) {
            Alert.alert("Erro", "Por favor, preencha a placa, a data e a hora de saída.");
            return;
        }

        setCarregando(true);

        try {
            let valorHora = 0;
            const valorHoraSnapshot = await getDocs(collection(firestore, "valor"));
            
            if (valorHoraSnapshot.empty) {
                Alert.alert("Erro", "Valor da hora não configurado. Defina-o na tela de Valor Hora.");
                setCarregando(false);
                return;
            }

            const valorHoraDoc = valorHoraSnapshot.docs[0].data();

            valorHora = parseFloat(valorHoraDoc.valorHora) || 0;

            const q = query(
                collection(firestore, "carros"), 
                where("placa", "==", placa.trim().toUpperCase()),
                where("status", "==", "ativo") 
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert("Erro", "Veículo não encontrado ou já registrou saída.\nPlaca: " + placa.trim().toUpperCase());
                setCarregando(false);
                return;
            }

            const carroDoc = querySnapshot.docs[0];
            const dadosCarro = carroDoc.data();
            
            const dataHoraEntrada = criarDataHora(dadosCarro.dataEntrada, dadosCarro.horaEntrada);
            const dataHoraSaida = criarDataHora(dataSaidaInput, horaSaidaInput);

            if (dataHoraSaida.getTime() < dataHoraEntrada.getTime()) {
                Alert.alert("Erro", "A hora/data de saída não pode ser anterior à de entrada.");
                setCarregando(false);
                return;
            }

            const diferencaMilissegundos = dataHoraSaida.getTime() - dataHoraEntrada.getTime();
            const horasEmFloat = diferencaMilissegundos / (1000 * 60 * 60);
            
            const horasCobradas = Math.max(1, Math.ceil(horasEmFloat));
            const valorTotal = horasCobradas * valorHora;
            
            console.log("💰 Valor por hora:", valorHora);
            console.log("⏱️ Horas cobradas:", horasCobradas);
            console.log("💵 Valor total:", valorTotal);

            await updateDoc(doc(firestore, "carros", carroDoc.id), {
                horaSaida: horaSaidaInput.padStart(2, '0'),
                dataSaida: dataSaidaInput,
                dataHoraSaidaTimestamp: Timestamp.fromDate(dataHoraSaida),
                valor: valorTotal,
                status: "saido"
            });

            Alert.alert(
                "Sucesso", 
                `Saída registrada!\nTempo cobrado: ${horasCobradas} hora(s)\nValor: R$ ${valorTotal.toFixed(2)}`
            );
            
            setPlaca('');
            setDataSaidaInput('');
            setHoraSaidaInput('');

        } catch (error) {
            console.error("❌ Erro ao registrar saída:", error.code, error.message);
            if (error.message.includes("Invalid time value")) {
                 Alert.alert("Erro de Data", "Formato de data ou hora inválido. Use DD/MM/AAAA e HH.");
            } else {
                 Alert.alert("Erro", error.message || "Não foi possível registrar a saída.");
            }
        } finally {
            setCarregando(false);
        }
    }

    return (
        <View style={Estilos.container}>
            <Text style={Estilos.header}>Registrar Saída</Text>

            <TextoInput
                label="Insira a placa do veículo"
                estilo={Estilos.input}
                value={placa}
                setValue={setPlaca}
                placeholder="Ex: ABC-1234"
                editable={!carregando}
            />

            <TextoInput
                label="Insira a data de saída"
                estilo={Estilos.input}
                value={dataSaidaInput}
                setValue={setDataSaidaInput}
                placeholder="Ex: DD/MM/AAAA"
                editable={!carregando}
                keyboardType="numeric"
            />
            
            <TextoInput
                label="Insira a hora de saída"
                estilo={Estilos.input}
                value={horaSaidaInput}
                setValue={setHoraSaidaInput}
                placeholder="Ex: HH (formato 24h)"
                editable={!carregando}
                keyboardType="numeric"
                maxLength={2}
            />

            <Button 
                mode="contained" 
                onPress={DefinirSaida}
                loading={carregando}
                disabled={carregando}
                style={{ marginTop: 20, paddingVertical: 6 }}
            >
                Registrar Saída e Calcular Valor
            </Button>
        </View>
    )
}
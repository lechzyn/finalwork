import { collection, updateDoc, Timestamp, doc, query, where, getDocs } from "firebase/firestore"; 
import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from '../../../firebaseConfig'; 
import { useState } from 'react';
import Estilos from '../../../Componentes/Estilos';
import TextoInput from "../../../Componentes/TextoInput";

export default function Saida(props) {
    const [placa, setPlaca] = useState('');
    const [carregando, setCarregando] = useState(false);

    const DefinirSaida = async () => {
        if (!placa.trim()) {
            Alert.alert("Erro", "Por favor, preencha a placa.");
            return;
        }

        setCarregando(true);

        try {
            console.log("🔍 Procurando carro com placa:", placa.trim().toUpperCase());
            
            const q = query(
                collection(firestore, "carros"), 
                where("placa", "==", placa.trim().toUpperCase())
            );
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert("Erro", "Veículo não encontrado com placa: " + placa.trim().toUpperCase());
                setCarregando(false);
                return;
            }

            const carroDoc = querySnapshot.docs[0];
            const dadosCarro = carroDoc.data();
            
            console.log("🚗 Carro encontrado:", dadosCarro);

            let valorTotal = 0;
            try {
                const valorHoraSnapshot = await getDocs(collection(firestore, "valor"));
                
                if (!valorHoraSnapshot.empty) {
                    const valorHoraDoc = valorHoraSnapshot.docs[0].data();
                    const valorHora = parseFloat(valorHoraDoc.valorHora) || 0;
                    
                    console.log("💰 Valor por hora:", valorHora);
                    
                    const horaEntrada = parseInt(dadosCarro.horaEntrada) || 0;
                    const horaSaida = new Date().getHours();
                    let horasEstacionadas = horaSaida - horaEntrada;
                    
                    if (horasEstacionadas < 0) {
                        horasEstacionadas += 24;
                    }
                    
                    if (horasEstacionadas === 0) {
                        horasEstacionadas = 1;
                    }
                    
                    valorTotal = horasEstacionadas * valorHora;
                    console.log("⏱️ Horas estacionadas:", horasEstacionadas);
                    console.log("💵 Valor total:", valorTotal);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar valor por hora:", error);
                Alert.alert("Aviso", "Não foi possível calcular valor. Defina valor/hora primeiro.");
            }

            await updateDoc(doc(firestore, "carros", carroDoc.id), {
                horaSaida: new Date().getHours().toString().padStart(2, '0'),
                dataSaida: new Date().toLocaleDateString('pt-BR'),
                dataHoraSaidaTimestamp: Timestamp.now(),
                valor: valorTotal,
                status: "saido"
            });

            console.log("✅ Saída registrada com sucesso!");
            Alert.alert("Sucesso", `Saída registrada!\nValor: R$ ${valorTotal.toFixed(2)}`);
            setPlaca('');

        } catch (error) {
            console.error("❌ Erro ao registrar saída:", error.code, error.message);
            Alert.alert("Erro", error.message || "Não foi possível registrar a saída.");
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

            <Button 
                mode="contained" 
                onPress={DefinirSaida}
                loading={carregando}
                disabled={carregando}
                style={{ marginTop: 20, paddingVertical: 6 }}
            >
                Registrar Saída
            </Button>
        </View>
    )
}
import { View, Text, FlatList, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from '../../../firebaseConfig'; 
import { useState, useCallback } from 'react'; 
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { useFocusEffect } from '@react-navigation/native'; 
import Estilos from "../../../Componentes/Estilos";

export default function TotalCarros(props) {
    const [carros, setCarros] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [totalCarros, setTotalCarros] = useState(0);
    const [arrecadacao, setArrecadacao] = useState(0);

    useFocusEffect(
        useCallback(() => {
            BuscarCarros();
        }, [])
    );

    const BuscarCarros = async () => {
        setCarregando(true);
        try {
            const q = query(
                collection(firestore, "carros"), 
                where("status", "==", "saido")
            );

            const querySnapshot = await getDocs(q);

            const carrosComValor = [];
            let total = 0;
            let arrecadadoTotal = 0;

            querySnapshot.forEach(doc => {
                const carro = doc.data();
                const valor = parseFloat(carro.valor) || 0;
                
                if (valor > 0) {
                    carrosComValor.push({
                        id: doc.id,
                        ...carro
                    });
                    total++;
                    arrecadadoTotal += valor;
                }
            });

            setCarros(carrosComValor);
            setTotalCarros(total);
            setArrecadacao(arrecadadoTotal);

            console.log("✅ Carros com valor encontrados:", total);
        } catch (error) {
            console.error("❌ Erro ao buscar carros:", error);
            Alert.alert("Erro", "Não foi possível carregar os carros.");
        } finally {
            setCarregando(false);
        }
    }

    const renderCarro = ({ item }) => (
        <View style={[Estilos.card, { marginBottom: 10, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 }]}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>
                🚗 {item.placa}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 3 }}>
                📅 Entrada: {item.dataEntrada} às {item.horaEntrada}h
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 3 }}>
                🚪 Saída: {item.dataSaida} às {item.horaSaida}h
            </Text>
            <Text style={{ fontSize: 14, color: '#2ecc71', fontWeight: 'bold', marginTop: 5 }}>
                💰 Valor: R$ {parseFloat(item.valor || 0).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={Estilos.container}>
            <Text style={Estilos.header}>Carros Saídos</Text>

            <View style={{ 
                backgroundColor: '#3498db', 
                padding: 15, 
                borderRadius: 10, 
                marginBottom: 20,
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>
                    📊 Resumo
                </Text>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 5 }}>
                    🚗 Carros saídos: {totalCarros}
                </Text>
                <Text style={{ fontSize: 16, color: 'white' }}>
                    💵 Arrecadação: R$ {arrecadacao.toFixed(2)}
                </Text>
            </View>

            {carros.length > 0 ? (
                <>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 10 }}>
                        Carros que já saíram:
                    </Text>
                    <FlatList
                        data={carros}
                        renderItem={renderCarro}
                        keyExtractor={item => item.id}
                    />
                </>
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#666' }}>
                        {carregando ? "Carregando..." : "Nenhum carro foi cobrado ainda"}
                    </Text>
                </View>
            )}

            <Button 
                mode="contained" 
                onPress={BuscarCarros}
                loading={carregando}
                disabled={carregando}
                style={{ marginTop: 12, paddingVertical: 6 }}
            >
                🔄 Atualizar
            </Button>
        </View>
    )
}
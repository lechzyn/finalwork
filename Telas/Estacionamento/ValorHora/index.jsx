import { View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { firestore } from '../../../firebaseConfig'; 
import { useState, useEffect } from 'react';
import { collection, addDoc , doc , setDoc} from "firebase/firestore"; 
import Estilos from "../../../Componentes/Estilos";
import TextoInput from "../../../Componentes/TextoInput";

export default function ValorHora(props) {
    const [valorHora, setValorHora] = useState('');
    const [carregando, setCarregando] = useState(false);

    const DOC_ID_VALOR = "precoFixo";

    useEffect(() => {
        const buscarValorAtual = async () => {
            const docRef = doc(firestore, "valor", DOC_ID_VALOR);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setValorHora(docSnap.data().valorHora.toString());
            }
        };
        buscarValorAtual().catch(console.error);
    }, []);

    const DefinirValorHora = async () => {
        if (valorHora === '') {
            Alert.alert("Erro", "Por favor, preencha o valor da hora.");
            return;
        }

        const valorNumerico = parseFloat(valorHora.replace(',', '.')); 

        if (isNaN(valorNumerico) || valorNumerico <= 0) {
            Alert.alert("Erro", "Por favor, insira um valor numérico válido (Ex: 5.50).");
            return;
        }

        setCarregando(true);

        try {

            const docRef = doc(firestore, "valor", DOC_ID_VALOR);

            await setDoc(docRef, { 
                valorHora: valorNumerico 
            }, { merge: true });

            console.log("✅ Valor da hora definido: ", valorHora);
            Alert.alert("Sucesso", "Valor da hora definido com sucesso!");
            
        } catch (error) {
            console.error("❌ Erro ao definir valor da hora: ", error);
            Alert.alert("Erro", "Não foi possível definir o valor da hora.");
        } finally {
            setCarregando(false);
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
                keyboardType="numeric"
            />
            
            <Button 
                mode="contained" 
                onPress={DefinirValorHora}
                loading={carregando}
                disabled={carregando}
                style={{ marginTop: 20, paddingVertical: 6 }}
            >
                Definir Valor
            </Button>
        </View>
    )
}
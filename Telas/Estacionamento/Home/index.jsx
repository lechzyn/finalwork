import { View, Text , StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import Estilos from "../../../Componentes/Estilos";

export default function Home(props) {

    const CadastroEntrada = () => {
        props.navigation.navigate('Entrada');
    }

    const Saida = () => {
        props.navigation.navigate('Saida');
    }

    const TotalCarros = () => {
        props.navigation.navigate('TotalCarros');
    }

    const ValorHora = () => {
        props.navigation.navigate('ValorHora');
    }

    return(
        <View style={Estilos.container}>
            <Text style={Estilos.header}>Menu Estacionamento</Text>

            <Button 
                mode="contained" 
                onPress={CadastroEntrada}
                style={styles.button}
                labelStyle={styles.texto}
            >
                 Entrada
            </Button>

            <Button 
                mode="contained" 
                onPress={Saida}
                style={styles.button}
                labelStyle={styles.texto}
            >
                 Saída
            </Button>

            <Button 
                mode="contained" 
                onPress={TotalCarros}
                style={styles.button}
                labelStyle={styles.texto}
            >
                 Total de Carros
            </Button>

            <Button 
                mode="contained" 
                onPress={ValorHora}
                style={styles.button}
                labelStyle={styles.texto}
            >
                 Valor por Hora
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 12, 
        paddingVertical: 8,
        justifyContent: 'center',
        width: "20%"
    },
    texto:{
        fontSize: 20, fontWeight: '600'
    }
});
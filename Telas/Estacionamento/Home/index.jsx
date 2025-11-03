import { View,Text,TouchableOpacity} from "react-native";
import  Estilos  from "../../Componentes/Estilos";

export default function Home(props) {

    const CadastroEntrada = () =>{
        props.navigation.navigate('Entrada');
    }

    const Saida = () =>{
        props.navigation.navigate('Saida');
    }

    const TotalCarros = () =>{
        props.navigation.navigate('TotalCarros');
    }

    const ValorHora = () =>{
        props.navigation.navigate('ValorHora');
    }

    return(
        <View style={Estilos.container}>

            <Text style={Estilos.header}>Tela inicial</Text>

            <TouchableOpacity style={Estilos.buttonHome} onPress={CadastroEntrada}>
                <Text style={Estilos.buttonText}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Estilos.buttonHome} onPress={Saida}>
                <Text style={Estilos.buttonText}>Saída</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Estilos.buttonHome} onPress={TotalCarros}>
                <Text style={Estilos.buttonText}>Total de Carros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Estilos.buttonHome} onPress={ValorHora}>
                <Text style={Estilos.buttonText}>Valor por Hora</Text>
            </TouchableOpacity>

        </View>
    )
}

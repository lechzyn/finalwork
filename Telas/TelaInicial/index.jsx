import { View,Text,TouchableOpacity} from "react-native";
import  Estilos  from "../../Componentes/Estilos";

export default function TelaInicial(props){

    const Cadastro = () =>{
        props.navigation.navigate('Cadastro');
    }

    const Login = () =>{
        props.navigation.navigate('Login');
    }

    return(
        <View style={Estilos.container}>

            <Text style={Estilos.header}>Tela inicial</Text>

            <TouchableOpacity style={Estilos.buttonHome} onPress={Login}>
                <Text style={Estilos.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Estilos.buttonHome} onPress={Cadastro}>
                <Text style={Estilos.buttonText}>Cadastro de Usuário</Text>
            </TouchableOpacity>

        </View>
    )
}
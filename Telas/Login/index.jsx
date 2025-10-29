import { View,Text } from "react-native";
import { useState } from "react";
import Estilos from '../../Componentes/Estilos'
import TextoInput from "../../Componentes/TextoInput";

export default function Login(props) {
  const [usuario, setusuario] = useState("");
  const [senha, setsenha] = useState("");

  const LogginVerificar = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        usuario,
        senha
      );
      console.log("Login bem-sucedido!", userCredential.user);
      Alert.alert("Sucesso", "Login bem-sucedido!");
    } catch (error) {
      //console.error('Erro ao fazer login:', error.message);
      Alert.alert("Erro", "Usuário e Senha invalidos");
    }
  };

  const ResetarSenha = () =>{
    props.navigation.navigate('Resetar Senha')
  }

  return(
    <View style={Estilos.container}>

        <Text style={Estilos.header}>Login</Text>

        <TextoInput
                label="Insira seu e-mail"
                estilo={Estilos.input}
                value={usuario}
                setValue={setUsuario}
                placeholder="E-mail"
            />

            <TextoInput
                label="Insira sua senha"
                estilo={Estilos.input}
                value={senha}
                setValue={setSenha}
                placeholder="Senha"
                password={true}
            />

            <TouchableOpacity style={Estilos.buttonHome} onPress={LogginVerificar}>
                <Text style={Estilos.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={Estilos.buttonHome} onPress={ResetarSenha}>
                <Text style={Estilos.buttonText}>Resetar Senha</Text>
            </TouchableOpacity>
        
    </View>
  )
}

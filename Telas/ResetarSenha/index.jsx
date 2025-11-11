import { useState } from "react";
import { View, Text, TouchableOpacity,Alert } from "react-native";
import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import TextoInput from "../../Componentes/TextoInput";
import Estilos from "../../Componentes/Estilos";

export default function ResetarSenha(props) {
  const [email, setEmail] = useState("");

  const resetarSenhaEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    Alert.alert("Sucesso", "Email de redefinição de senha enviado!");
    props.navigation.navigate('Login');
  };

  return(
    <View style={Estilos.container}>
        <Text style={Estilos.header}>Resetar Senha</Text>

        <TextoInput
            label="Insira o seu e-mail"
            estilo={Estilos.input}
            value={email}
            setValue={setEmail}
            placeholder="E-mail"
        />

        <TouchableOpacity style={Estilos.buttonHome} onPress={resetarSenhaEmail}>
            <Text style={Estilos.buttonText}>Enviar email</Text>
        </TouchableOpacity>
        
    </View>
  )
}

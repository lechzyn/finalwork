import { View,Text, Alert, TouchableOpacity } from "react-native";
import { auth } from '../../firebaseConfig';
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Estilos } from '../../Componentes/Estilos'
import TextoInput from "../../Componentes/TextoInput";

const db = getFirestore();

export default function Cadastro(props){
    const [usuario,setUsuario] = useState('');
    const [senha,setSenha] = useState('');

    const CriarUsuario = async () =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,usuario,senha);
            console.log(userCredential.user.email);
            await sendEmailVerification(userCredential.user);
        }catch(error){
            Alert.alert(error.message);
        }
    }

    return(
        <View style={Estilos.container}>

            <Text style={Estilos.header}>Cadastro</Text>

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
            <TouchableOpacity style={Estilos.buttonHome} onPress={CriarUsuario}>
                <Text style={Estilos.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

        </View>
    )

}

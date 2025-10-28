import { View,Text, Alert, TouchableOpacity } from "react-native";
import { auth } from '../../firebaseConfig';
import { getFirestore,collection,addDoc, doc} from 'firebase/firestore'
import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Estilos } from '../../Componentes/Estilos'
import TextoInput from "../../Componentes/TextoInput";

const db = getFirestore();

export default function Cadastro(props){
    const [usuario,setUsuario] = useState('');
    const [senha,setSenha] = useState('');

    const addData = async () => {
        try{
            await addDoc(collection(db,"Usuario"),{nome: usuario, senha: senha});
        }catch(e){
            console.error(e);
        }
    }

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

import { StyleSheet } from 'react-native';

const Estilos = StyleSheet.create({
    header:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#154360',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    imagem: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
        margin: 10
    },
    buttonHome: {
        backgroundColor: '#154360',
        width: '90%',
        margin: 10,
        height: 60,
        borderRadius: 20
    },
    buttonText: {
        fontFamily: 'Arial',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 15,
        color: '#FFFFFF',
    },

    input: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    card_dados: {
        width: '100%',
        backgroundColor: 'white',
        padding: 10,
    },
});

export default Estilos;

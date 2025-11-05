import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaInicial from "./Telas/TelaInicial";
import Login from "./Telas/Login"
import Cadastro from "./Telas/Cadastro"
import Entrada from "./Telas/Estacionamento/Entrada";
import ResetarSenha from "./Telas/ResetarSenha";
import TotalCarros from "./Telas/Estacionamento/TotalCarros";
import ValorHora from "./Telas/Estacionamento/ValorHora";
import Saida from "./Telas/Estacionamento/Saida";
import Home from "./Telas/Estacionamento/Home";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Resetar Senha" component={ResetarSenha} />
        <Stack.Screen name="Entrada" component={Entrada} />
        <Stack.Screen name="TotalCarros" component={TotalCarros} />
        <Stack.Screen name="ValorHora" component={ValorHora} />
        <Stack.Screen name="Saida" component={Saida} />
        <Stack.Screen name="Home" component={Home} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

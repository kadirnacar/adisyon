import { Home, Login, Department, Nfc, Adisyon } from "@screens";
import { createStackNavigator } from "react-navigation-stack";

export const AppNavigator = createStackNavigator({
    Department: Department,
    Login: Login,
    Home: Home,
    Nfc: Nfc,
    Adisyon: Adisyon,
}, {
    initialRouteName: 'Department',
    mode: "card",

    defaultNavigationOptions: {
        cardStyle: { backgroundColor: "transparent", opacity: 1 },
        headerTransparent: true,
        headerTitle: "",
        headerStyle: { height: 70 }
    },
    headerMode: 'screen',
})

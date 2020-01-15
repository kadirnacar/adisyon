import { Login, Department, Nfc, Adisyon } from "@screens";
import { createStackNavigator } from "react-navigation-stack";
import { colors } from "@components";

export const AppNavigator = createStackNavigator({
    Department: Department,
    Login: Login,
    Nfc: Nfc,
    Adisyon: Adisyon,
}, {
    initialRouteName: 'Department',
    mode: "card",

    defaultNavigationOptions: {
        cardStyle: { backgroundColor: "white", opacity: 1 },
        // headerTransparent: true,
        // headerTitle: "",
        headerStyle: { backgroundColor: "#266580" },
        headerTitleAlign: "center",
        headerTitleStyle: { color: colors.buttonTextColor, fontWeight: "bold", textShadowColor: "#00000090", textShadowOffset: { height: 0, width: 0 }, textShadowRadius: 7 }

    },
    headerMode: 'screen',
})

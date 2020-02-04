import { colors } from "@components";
import { Adisyon, Department, Login, Nfc, StokSelectScreen, ActivitySelectScreen, AppSelector, ActiviteTypeSelector, Aktivite } from "@screens";
import { createStackNavigator } from "react-navigation-stack";

export const AppNavigator = createStackNavigator({
    Login: Login,
    Department: Department,
    Nfc: Nfc,
    Adisyon: Adisyon,
    StokSelect: StokSelectScreen,
    ActivitySelect: ActivitySelectScreen,
    AppSelector: AppSelector,
    ActiviteTypeSelector: ActiviteTypeSelector,
    Aktivite: Aktivite,
}, {
    initialRouteName: 'Login',
    mode: "card",

    defaultNavigationOptions: {
        cardStyle: { backgroundColor: "white", opacity: 1 },
        // headerTransparent: true,
        // headerTitle: "",

        headerTintColor: "#ffffff",
        headerBackTitleStyle: { color: "#ffffff" },
        headerStyle: { backgroundColor: "#266580" },
        headerTitleAlign: "center",
        headerTitleStyle: { color: colors.buttonTextColor, fontWeight: "bold", textShadowColor: "#00000090", textShadowOffset: { height: 0, width: 0 }, textShadowRadius: 7 }

    },
    headerMode: 'screen',
})

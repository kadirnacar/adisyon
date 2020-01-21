import { Login, Department, Nfc, Adisyon } from "@screens";
import { createStackNavigator, StackHeaderLeftButtonProps } from "react-navigation-stack";
import { colors } from "@components";
import { TouchableHighlight, Text } from "react-native";
import React, { Component } from 'react';

export const AppNavigator = createStackNavigator({
    Login: Login,
    Department: Department,
    Nfc: Nfc,
    Adisyon: Adisyon,
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

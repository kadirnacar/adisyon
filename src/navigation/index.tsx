import { createAppContainer } from "react-navigation";
import { AppNavigator } from "./drawer";

export const FlexContainer = createAppContainer(AppNavigator);

export const AppContainer = FlexContainer
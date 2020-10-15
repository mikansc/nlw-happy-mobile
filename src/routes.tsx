import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import OrphanagesMap from "./pages/OrphanagesMap";
import OrphanagesDetails from "./pages/OrphanagesDetails";

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
          options={{ headerShown: false }}
        />
        <Screen
          name="OrphanagesDetails"
          component={OrphanagesDetails}
          options={{ headerShown: false }}
        />
      </Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import mapMarkerImg from "../../images/map-marker.png";

interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({
    latitude: 0,
    longitude: 0,
  });
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  console.log(currentLocation);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    })();
  }, []);

  function handleNextStep() {
    navigation.navigate("OrphanageData", { position });
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      {currentLocation.latitude !== 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude !== 0 && (
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: position?.latitude,
                longitude: position?.longitude,
              }}
            />
          )}
        </MapView>
      )}

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,

    position: "absolute",
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 16,
    color: "#FFF",
  },
});

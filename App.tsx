import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import CustomQueryClientProvider from "./App/components/CustomQueryClientProvider";
import FoodSearcher from "./App/components/FoodSearcher";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { FormProvider, useForm } from "react-hook-form";

export default function App() {
  useEffect(() => {}, []);
  const form = useForm();
  return (
    <CustomQueryClientProvider>
      <GluestackUIProvider config={config}>
        <FormProvider {...form}>
          <View style={styles.container}>
            <FoodSearcher />
            <StatusBar style="auto" />
          </View>
        </FormProvider>
      </GluestackUIProvider>
    </CustomQueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

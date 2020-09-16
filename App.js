import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { initTasks, initSections } from "./database/db";

import SectionList from "./components/sectionList";

// Main App

export default function App() {
  initTasks()
    .then(console.log("Database Initialized..."))
    .catch((err) => {
      console.log(err);
    });

  initSections()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={styles.taskView}>
          <Text style={{ fontSize: 45, color: "#2c92b8" }}>Todo List</Text>
        </View>
        <View
          style={{ height: "70%", marginHorizontal: 70, marginBottom: 300 }}
        >
          <SectionList />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// Stylesheets

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  touchButton: {
    margin: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "orange",
    width: 120,
    height: 45,
  },
  taskView: {
    backgroundColor: "white",
    width: 500,
    height: 100,
    marginTop: "10%",
    alignItems: "center",
  },
});

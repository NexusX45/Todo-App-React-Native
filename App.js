import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { init } from "./database/db";

import Tasks from "./components/tasks";

// Main App

export default function App() {
  init()
    .then(console.log("Database Initialized..."))
    .catch((err) => {
      console.log(err);
    });

  const [data, setData] = useState([]);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={styles.taskView}>
          <Text style={{ fontSize: 45, color: "#2c92b8" }}>Todo list</Text>
        </View>
        <View
          style={{ height: "35%", marginHorizontal: 70, marginBottom: 300 }}
        >
          <Tasks data={data} setData={setData} />
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
    backgroundColor: "#def6ff",
    width: 500,
    height: 100,
    marginBottom: 15,
    alignItems: "center",
  },
});

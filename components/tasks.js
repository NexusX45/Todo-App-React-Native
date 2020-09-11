import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  CheckBox,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  saveToDB,
  fetchAllData,
  changeData,
  deleteData,
  changeCheck,
} from "../database/db";

export default function Tasks({ data, setData }) {
  const handleDelete = (itemID) => {
    deleteData(itemID).then((res) => {
      console.log(res);
    });
    fetchAllData().then((res) => {
      setData(res.rows._array);
      console.log(data);
    });
  };

  useEffect(() => {
    fetchAllData().then((res) => {
      setData(res.rows._array);
      console.log(data);
    });
  }, []);

  const handleSaveToDatabase = () => {
    saveToDB("", 0)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAllData()
      .then((res) => {
        console.log(res);
        setData(res.rows._array);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetch = () => {
    fetchAllData().then((res) => {
      setData(res.rows._array);
    });
  };

  const handleChange = (item, text) => {
    let arr = data;
    console.log(arr);
    arr[arr.indexOf(item)].title = text;
    setData((currData) => [...currData]);
    changeData(item.id, text);
  };

  const handleCheck = (id, event) => {
    // let ar = data;
    // //ar[id].completed = !ar[id].completed;
    // if (ar[id].completed) {
    //   console.log("lol");
    //   ar[id].completed = 0;
    // } else {
    //   console.log("lol");
    //   ar[id].completed = 1;
    // }
    // setData((currData) => [...currData]);
    console.log(id);
    console.log(event.nativeEvent.value ? 1 : 0);
    changeCheck(id, event.nativeEvent.value ? 1 : 0).then((res) => {
      console.log(res);
    });
    fetchAllData().then((res) => {
      setData(res.rows._array);
      console.log(data);
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: 400,
          // borderBottomWidth: 1,
          // borderBottomColor: "grey",
        }}
      >
        <View
          style={{
            height: 60,
            width: 300,
            flexDirection: "row",
          }}
        >
          <CheckBox
            style={{
              marginTop: 15,
              marginHorizontal: 5,
              color: "black",
            }}
            onChange={handleCheck.bind(this, item.id)}
            value={item.completed == 1 ? true : false}
          />

          <TextInput
            value={item.title}
            placeholder="Task"
            style={[
              styles.default,
              item.completed == 1 ? styles.checked : styles.unchecked,
            ]}
            onChangeText={handleChange.bind(this, item)}
            autoCorrect={false}
            onBlur={handleFetch}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
          }}
          onPress={handleDelete.bind(this, item.id)}
        >
          <AntDesign
            name="delete"
            style={{ marginTop: 15, fontSize: 25, color: "#e38f8f" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 40,
          width: "100%",
          marginBottom: 30,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#def6ff",
            height: 70,
            width: 70,
            alignContent: "center",
            alignItems: "center",
            borderRadius: 40,
            elevation: 5,
          }}
          onPress={handleSaveToDatabase}
        >
          <AntDesign
            name="plus"
            style={{ marginTop: 20, fontSize: 30, color: "#2c92b8" }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 350 }}>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
}

//StyleSheets

const styles = StyleSheet.create({
  default: { fontSize: 20, color: "grey", width: "80%" },
  checked: {
    color: "#d1d1d1",
    textDecorationLine: "line-through",
  },
  unchecked: {
    textDecorationLine: "none",
  },
});

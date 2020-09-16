import React from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  CheckBox,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  saveToDB,
  fetchAllData,
  changeData,
  deleteData,
  changeCheck,
  changeSection,
} from "../database/db";

export default function Tasks({ secData, setSecData, secItem }) {
  const [data, setData] = useState([]);
  const handleDelete = (itemID) => {
    deleteData(itemID).then((res) => {
      console.log(res);
    });
    fetchAllData(secItem.id).then((res) => {
      setData(res.rows._array);
      console.log(data);
    });
  };

  useEffect(() => {
    console.log("Tasks Use effect return:");
    console.log(secItem.id);
    fetchAllData(secItem.id)
      .then((res) => {
        //setData(res.rows._array);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [secItem]);

  const handleSaveToDatabase = () => {
    saveToDB("", 0, secItem.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAllData(secItem.id)
      .then((res) => {
        console.log(res);
        setData(res.rows._array);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetch = (secID) => {
    fetchAllData(secID).then((res) => {
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
          alignItems: "center",
          justifyContent: "center",

          // borderBottomWidth: 1,
          // borderBottomColor: "grey",
        }}
      >
        <View
          style={{
            height: 50,
            width: 300,
            flexDirection: "row",
          }}
        >
          <CheckBox
            style={{
              marginTop: 10,
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
            onBlur={handleFetch.bind(this, secItem.id)}
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

  const changeSec = (secItem, name) => {
    let ar = secData;
    console.log("Change Sec...");
    console.log(secItem);
    ar[ar.indexOf(secItem)].name = name;

    setSecData((currData) => [...currData]);

    changeSection(secItem.id, name)
      .then(console.log("Section Changed..."))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <TextInput
          placeholder="Title"
          style={{ margin: "7%", fontSize: 30 }}
          onChangeText={changeSec.bind(this, secItem)}
          value={secItem ? secItem.name : ""}
        />
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "80%",
        }}
      >
        <FlatList data={data} renderItem={renderItem} />
      </View>
      <View
        style={{
          backgroundColor: "#def6ff",
          top: "95%",
          width: "100%",
          marginBottom: 30,
          alignContent: "center",
          position: "absolute",
          height: 70,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#def6ff",
            margin: "1%",
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
          }}
          onPress={handleSaveToDatabase}
        >
          <AntDesign name="plus" style={{ fontSize: 25, color: "#2c92b8" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

//StyleSheets

const styles = StyleSheet.create({
  default: { fontSize: 20, color: "grey", width: "100%" },
  checked: {
    color: "#d1d1d1",
    textDecorationLine: "line-through",
  },
  unchecked: {
    textDecorationLine: "none",
  },
});

import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { deleteSection, fetchSection, saveSection } from "../database/db";
import Tasks from "../components/tasks";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function SectionList({}) {
  const [show, setShow] = useState(false);
  const [curItem, setCurItem] = useState([]);

  const [secData, setSecData] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    fetchSection()
      .then((res) => {
        setSecData(res.rows._array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("SecData status");

    console.log(secData.length);
    setTemp(secData[secData.length - 1]);
  }, [secData]);

  useEffect(() => {
    console.log("Temp status:");
    console.log(temp);
  }, [temp]);

  const createSec = () => {
    saveSection("")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setShow(true);
    setCurItem(temp);
    fetchSection().then((res) => {
      console.log("Updating sec data");
      setSecData(res.rows._array);
    });
  };

  const handleShow = (item) => {
    setShow(true);
    setCurItem(item);
  };
  useEffect(() => {
    fetchSection()
      .then((res) => {
        setSecData(res.rows._array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteSection = (id) => {
    deleteSection(id)
      .then()
      .catch((err) => {
        console.log(err);
      });

    fetchSection()
      .then((res) => {
        setSecData(res.rows._array);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          borderColor: "firebrick",
          borderWidth: 2,
          height: 50,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleShow.bind(this, item)}>
          <Text style={{ color: "black", fontSize: 30 }}>{item.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteSection.bind(this, item.id)}>
          <Entypo name="cross" size={40} color="#e38f8f" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <View style={{ width: "100%" }}>
        <FlatList data={secData} renderItem={renderItem} />
        <Modal
          visible={show}
          animationType="slide"
          onRequestClose={() => {
            setShow(false);
            fetchSection()
              .then((res) => {
                setSecData(res.rows._array);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <Tasks secData={secData} setSecData={setSecData} secItem={curItem} />
        </Modal>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#def6ff",
            height: 45,
            width: 45,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
            elevation: 5,
            top: "100%",
          }}
          onPress={createSec}
        >
          <AntDesign name="plus" style={{ fontSize: 20, color: "#2c92b8" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

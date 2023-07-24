import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";

const headerHeight = 50;

const MyDropDownPicker = ({ isDropDownOpen, onPressAddAlbum, onPressHeader, albums, onPressAlbum, selectedAlbum }) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressHeader}
        style={{ height: headerHeight, justifyContent: "center", alignItems: "center", flexDirection: "row" }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons name={isDropDownOpen ? "arrow-down" : "arrow-up"} size={12} color="black" style={{ marginLeft: 8 }} />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{ position: "absolute", right: 0, height: headerHeight, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropDownOpen && (
        <View
          style={{
            width: "100%",
            position: "absolute",
            top: headerHeight,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.5,
            borderTopColor: "lightgrey",
            borderTopWidth: 0.5,
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                key={`album-${index}`}
                style={{ paddingVertical: 12, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#FFF" }}
                onPress={() => onPressAlbum(album)}
              >
                <Text style={{ fontWeight: isSelectedAlbum ? "bold" : "normal" }}>{album.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MyDropDownPicker;

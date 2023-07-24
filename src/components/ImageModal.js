import { View, Modal, Pressable, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={{ justifyContent: "center", height: "100%", paddingHorizontal: 20 }}>
      <SimpleLineIcons name={iconName} size={12} color={disabled ? "transparent" : "black"} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  );
};

const ImageModal = ({ imageModalVisible, onPressBackDrop, selectedImage, onPressLeftArrow, onPressRightArrow, showNextArrow, showPreviousArrow }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={imageModalVisible}>
      <Pressable onPress={onPressBackDrop} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: `rgba(115,115,115,0.5)` }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow} />

          <Pressable>
            <Image source={{ uri: selectedImage?.uri }} style={{ width: 280, height: 280, backgroundColor: "white" }} resizeMode="contain" />
          </Pressable>

          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default ImageModal;

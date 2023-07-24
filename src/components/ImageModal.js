import { View, Text, Modal, Pressable, Image } from "react-native";
import React from "react";

const ImageModal = ({ imageModalVisible, onPressBackDrop, selectedImage }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={imageModalVisible}>
      <Pressable onPress={onPressBackDrop} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: `rgba(115,115,115,0.5)` }}>
        <Pressable>
          <Image source={{ uri: selectedImage?.uri }} style={{ width: 280, height: 280, backgroundColor: "white" }} resizeMode="contain" />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ImageModal;

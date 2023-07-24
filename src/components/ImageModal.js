import { View, Modal, Pressable, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";

const ArrowButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  height: 100%;
  padding: 0px 20px;
`;

const ModalContainer = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(115, 115, 115, 0.5);
`;

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <ArrowButtonContainer disabled={disabled} onPress={onPress}>
      <SimpleLineIcons name={iconName} size={12} color={disabled ? "transparent" : "black"} style={{ marginLeft: 8 }} />
    </ArrowButtonContainer>
  );
};

const ImageModal = ({ imageModalVisible, onPressBackDrop, selectedImage, onPressLeftArrow, onPressRightArrow, showNextArrow, showPreviousArrow }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={imageModalVisible}>
      <ModalContainer onPress={onPressBackDrop}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} disabled={!showPreviousArrow} />

          <Pressable>
            <Image source={{ uri: selectedImage?.uri }} style={{ width: 280, height: 280, backgroundColor: "white" }} resizeMode="contain" />
          </Pressable>

          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} disabled={!showNextArrow} />
        </View>
      </ModalContainer>
    </Modal>
  );
};

export default ImageModal;

import { Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import styled from "styled-components/native";

const width = Dimensions.get("screen").width;
const minColumSize = 130;
const divisor = width / minColumSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

const AddImageButtonContainer = styled.TouchableOpacity`
  width: ${columnSize}px;
  height: ${columnSize}px;
  background-color: lightgrey;
  justify-content: center;
  align-items: center;
`;

const ImageList = ({ onPressOpenGallery, onPressImage, imageWithAddButton, onLongPressImage }) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <AddImageButtonContainer onPress={onPressOpenGallery}>
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </AddImageButtonContainer>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
          <Image source={{ uri: uri }} style={{ width: columnSize, height: columnSize }} />
        </TouchableOpacity>
      );
    }
  };

  return <FlatList data={imageWithAddButton} renderItem={renderItem} numColumns={numColumns} style={{ zIndex: -1 }} />;
};

export default ImageList;

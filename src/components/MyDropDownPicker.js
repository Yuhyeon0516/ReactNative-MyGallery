import { View, Text } from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

const headerHeight = 50;

const HeaderContainer = styled.Pressable`
  height: ${headerHeight}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const AddAlbumButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  height: ${headerHeight}px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;

const DropDownContainer = styled.View`
  width: 100%;
  position: absolute;
  top: ${headerHeight}px;
  border-bottom: 0.5px;
  border-bottom-color: lightgrey;
  border-top: 0.5px;
  border-top-color: lightgrey;
`;

const AlbumTitleContainer = styled.Pressable`
  padding: 12px 0px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const MyDropDownPicker = ({ isDropDownOpen, onPressAddAlbum, onPressHeader, albums, onPressAlbum, selectedAlbum, onLongPressAlbum }) => {
  return (
    <View>
      <HeaderContainer onPress={onPressHeader}>
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons name={isDropDownOpen ? "arrow-up" : "arrow-down"} size={12} color="black" style={{ marginLeft: 8 }} />
        <AddAlbumButtonContainer onPress={onPressAddAlbum}>
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </AddAlbumButtonContainer>
      </HeaderContainer>
      {isDropDownOpen && (
        <DropDownContainer>
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <AlbumTitleContainer key={`album-${index}`} onPress={() => onPressAlbum(album)} onLongPress={() => onLongPressAlbum(album.id)}>
                <Text style={{ fontWeight: isSelectedAlbum ? "bold" : "normal" }}>{album.title}</Text>
              </AlbumTitleContainer>
            );
          })}
        </DropDownContainer>
      )}
    </View>
  );
};

export default MyDropDownPicker;

import { Modal, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";

const AlbumTitleTextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-width: 0.5px;
  border-color: lightgrey;
  background-color: white;
`;

const Content = ({ onPressBackDrop, albumTitle, textInputFocusRef, setAlbumTitle, onSubmitEditing }) => {
  return (
    <Pressable onPress={onPressBackDrop} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, width: "100%", position: "absolute", bottom: 0 }}>
        <AlbumTitleTextInput
          placeholder="앨범명을 입력해주세요."
          value={albumTitle}
          ref={textInputFocusRef}
          onChangeText={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
        />
      </SafeAreaView>
    </Pressable>
  );
};

const TextInputModal = ({ textInputModalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackDrop }) => {
  const textInputFocusRef = useRef(null);

  useEffect(() => {
    if (textInputModalVisible) {
      setTimeout(() => {
        textInputFocusRef.current?.focus();
      }, 200);
    }
  }, [textInputModalVisible]);

  if (Platform.OS === "ios") {
    return (
      <Modal animationType="slide" transparent={true} visible={textInputModalVisible}>
        <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
          <Content
            onPressBackDrop={onPressBackDrop}
            albumTitle={albumTitle}
            textInputFocusRef={textInputFocusRef}
            setAlbumTitle={setAlbumTitle}
            onSubmitEditing={onSubmitEditing}
          />
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView behavior={"height"}>
      <Modal animationType="slide" transparent={true} visible={textInputModalVisible}>
        <Content
          onPressBackDrop={onPressBackDrop}
          albumTitle={albumTitle}
          textInputFocusRef={textInputFocusRef}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default TextInputModal;

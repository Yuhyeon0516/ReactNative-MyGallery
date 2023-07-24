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

const TextInputModal = ({ textInputModalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackDrop }) => {
  const textInputFocusRef = useRef(null);

  const Content = () => {
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
          <Content />
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView behavior={"height"}>
      <Modal animationType="slide" transparent={true} visible={textInputModalVisible}>
        <Content />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default TextInputModal;

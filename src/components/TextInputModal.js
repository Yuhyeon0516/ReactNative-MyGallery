import { View, Text, Modal, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";

const TextInputModal = ({ textInputModalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackDrop }) => {
  const textInputFocusRef = useRef(null);

  useEffect(() => {
    if (textInputModalVisible) {
      setTimeout(() => {
        textInputFocusRef.current?.focus();
      }, 500);
    }
  }, [textInputModalVisible]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Modal animationType="slide" transparent={true} visible={textInputModalVisible}>
        <Pressable onPress={onPressBackDrop} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1, width: "100%", position: "absolute", bottom: 0 }}>
            <TextInput
              placeholder="앨범명을 입력해주세요."
              value={albumTitle}
              ref={textInputFocusRef}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              style={{ width: "100%", padding: 10, borderWidth: 0.5, borderColor: "lightgrey", backgroundColor: "white" }}
            />
          </SafeAreaView>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default TextInputModal;

import { View, Text, Modal, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";

const TextInputModal = ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackDrop }) => {
  const textInputFocusRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        textInputFocusRef.current?.focus();
      }, 100);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Pressable onPress={onPressBackDrop} style={{ flex: 1 }}>
          <SafeAreaView style={{ width: "100%", position: "absolute", bottom: 0 }}>
            <TextInput
              placeholder="앨범명을 입력해주세요."
              value={albumTitle}
              ref={textInputFocusRef}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              style={{ width: "100%", padding: 10, borderWidth: 0.5, borderColor: "lightgrey" }}
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TextInputModal;

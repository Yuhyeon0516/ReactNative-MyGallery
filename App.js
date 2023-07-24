import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useGallery } from "./src/hook/useGallery";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyDropDownPicker from "./src/components/MyDropDownPicker";
import TextInputModal from "./src/components/TextInputModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const {
    imageWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropDownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPress = (imageId) => {
    deleteImage(imageId);
  };

  const onPressAddAlbum = () => {
    setAlbumTitle("");
    openModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;

    addAlbum();
    closeModal();
    resetAlbumTitle();
  };

  const onPressBackDrop = () => {
    closeModal();
  };

  const onPressHeader = () => {
    if (isDropDownOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropDown();
  };

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{ width: columnSize, height: columnSize, backgroundColor: "lightgrey", justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onLongPress={() => onLongPress(id)}>
          <Image source={{ uri: uri }} style={{ width: columnSize, height: columnSize }} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <MyDropDownPicker
          isDropDownOpen={isDropDownOpen}
          onPressAddAlbum={onPressAddAlbum}
          onPressHeader={onPressHeader}
          albums={albums}
          onPressAlbum={onPressAlbum}
          selectedAlbum={selectedAlbum}
        />
        <TextInputModal
          modalVisible={modalVisible}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackDrop={onPressBackDrop}
        />
        <FlatList data={imageWithAddButton} renderItem={renderItem} numColumns={3} style={{ zIndex: -1 }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

import { StyleSheet } from "react-native";
import { useGallery } from "./src/hook/useGallery";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyDropDownPicker from "./src/components/MyDropDownPicker";
import TextInputModal from "./src/components/TextInputModal";
import ImageModal from "./src/components/ImageModal";
import ImageList from "./src/components/ImageList";

export default function App() {
  const {
    imageWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropDownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    imageModalVisible,
    openImageModal,
    closeImageModal,
    selectImage,
    selectedImage,
    moveToNextImage,
    moveToPreviousImage,
    showNextArrow,
    showPreviousArrow,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPressImage = (imageId) => {
    deleteImage(imageId);
  };

  const onPressAddAlbum = () => {
    setAlbumTitle("");
    openTextInputModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;

    addAlbum();
    closeTextInputModal();
    closeDropDown();
    resetAlbumTitle();
  };

  const onPressTextInputModalBackDrop = () => {
    closeTextInputModal();
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

  const onLongPressAlbum = (albumId) => {
    deleteAlbum(albumId);
  };

  const onPressImage = (image) => {
    selectImage(image);
    openImageModal();
  };

  const onPressImageModalBackDrop = () => {
    closeImageModal();
  };

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };

  const onPressRightArrow = () => {
    moveToNextImage();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <MyDropDownPicker
          isDropDownOpen={isDropDownOpen}
          onPressAddAlbum={onPressAddAlbum}
          onPressHeader={onPressHeader}
          onLongPressAlbum={onLongPressAlbum}
          albums={albums}
          onPressAlbum={onPressAlbum}
          selectedAlbum={selectedAlbum}
        />
        <TextInputModal
          textInputModalVisible={textInputModalVisible}
          albumTitle={albumTitle}
          setAlbumTitle={setAlbumTitle}
          onSubmitEditing={onSubmitEditing}
          onPressBackDrop={onPressTextInputModalBackDrop}
        />
        <ImageModal
          imageModalVisible={imageModalVisible}
          onPressBackDrop={onPressImageModalBackDrop}
          selectedImage={selectedImage}
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          showNextArrow={showNextArrow}
          showPreviousArrow={showPreviousArrow}
        />
        <ImageList
          onPressOpenGallery={onPressOpenGallery}
          onPressImage={onPressImage}
          imageWithAddButton={imageWithAddButton}
          onLongPressImage={onLongPressImage}
        />
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

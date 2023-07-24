import { Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGallery } from "./src/hook/useGallery";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const { images, imageWithAddButton, pickImage, deleteImage } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPress = (imageId) => {
    deleteImage(imageId);
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
        <FlatList data={imageWithAddButton} renderItem={renderItem} numColumns={3} />
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

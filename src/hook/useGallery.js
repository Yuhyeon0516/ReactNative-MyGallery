import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  const deleteImage = (imageId) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          const newImage = images.filter((image) => image.id !== imageId);

          setImages(newImage);
        },
      },
    ]);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const openDropDown = () => setIsDropDownOpen(true);
  const closeDropDown = () => setIsDropDownOpen(false);

  const addAlbum = () => {
    const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    setAlbums([...albums, newAlbum]);
  };

  const resetAlbumTitle = () => setAlbumTitle("");
  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);
  const imageWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  return {
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
  };
};

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  image: "IMAGES_KEY",
  album: "ALBUM_KEY",
};

export const useGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const _setImages = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.image, JSON.stringify(newImages));
  };

  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.album, JSON.stringify(newAlbums));
  };

  useEffect(() => {
    initValues();
  }, []);

  const initValues = async () => {
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.image);

    if (imagesFromStorage) {
      const parsed = JSON.parse(imagesFromStorage);
      setImages(parsed);
    }

    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.album);

    if (albumsFromStorage) {
      const parsed = JSON.parse(albumsFromStorage);
      setAlbums(parsed);
    }
  };

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
      _setImages([...images, newImage]);
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

          _setImages(newImage);
        },
      },
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);

  const openImageModal = () => setImageModalVisible(true);
  const closeImageModal = () => setImageModalVisible(false);

  const openDropDown = () => setIsDropDownOpen(true);
  const closeDropDown = () => setIsDropDownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const resetAlbumTitle = () => setAlbumTitle("");
  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId) => {
    if (albumId === defaultAlbum.id) {
      Alert.alert("기본 앨범은 삭제할 수 없습니다.");
      return;
    }
    Alert.alert("앨범을 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          const newAlbums = albums.filter((album) => album.id !== albumId);

          _setAlbums(newAlbums);
          setSelectedAlbum(defaultAlbum);
          closeDropDown();
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);

  const moveToPreviousImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const previousImageIndex = selectedImageIndex - 1;
    if (previousImageIndex < 0) return;
    const previousImage = filteredImages[previousImageIndex];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex((image) => image.id === selectedImage.id);
    const nextImageIndex = selectedImageIndex + 1;

    if (nextImageIndex > filteredImages.length - 1 || selectedImageIndex === -1) return;
    const nextImage = filteredImages[nextImageIndex];
    setSelectedImage(nextImage);
  };

  const showPreviousArrow = filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow = filteredImages.findIndex((image) => image.id === selectedImage?.id) !== filteredImages.length - 1;

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
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};

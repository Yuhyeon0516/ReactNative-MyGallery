import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export const useGallery = () => {
  const [images, setImages] = useState([]);

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

  const imageWithAddButton = [
    ...images,
    {
      id: -1,
      uri: "",
    },
  ];

  return {
    images,
    imageWithAddButton,
    pickImage,
    deleteImage,
  };
};

// import React, { useEffect, useState } from 'react';
// import { TouchableOpacity, Text, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAuth } from '../../hooks/authContext';
// import { fetchUserDetails } from '../../api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styled from 'styled-components/native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from expo
// import * as FileSystem from 'expo-file-system'; // Import FileSystem from expo

// const Container = styled(SafeAreaView)`
//   flex: 1;
//   padding: 0 8px;
//   align-items: center;
//   justify-content: center;
// `;

// const ProfileImage = styled(Image)`
//   width: 100px;
//   height: 100px;
//   border-radius: 50px;
//   margin-bottom: 20px;
// `;

// const ProfileScreen = () => {
//   const auth = useAuth();
//   const [userIcon, setUserIcon] = useState<string>(
//     'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png'
//   );
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const navigation = useNavigation<any>();

//   useEffect(() => {
//     const fetchUserIcon = async () => {
//       try {
//         const icon = await AsyncStorage.getItem('userIcon');
//         setUserIcon(icon || userIcon); // Set default icon if no icon is found
//       } catch (error) {
//         console.error('Error fetching user icon:', error);
//       }
//     };
//     fetchUserIcon();
//   }, []);

//   useEffect(() => {
//     const fetchUserDetailsData = async () => {
//       try {
//         const data = await fetchUserDetails();
//         setUserDetails(data);
//         console.log('User details:', data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetailsData();
//   }, [auth.token]);

//   const handleImageUpload = async () => {
//     try {
//       // Ask permission to access the device's image library
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission Denied', 'Please allow access to your photo library.');
//         return;
//       }

//       // Launch the image picker UI
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1], // Square aspect ratio
//         quality: 1, // Full quality
//       });

//       if (!result.canceled) {
//         // Save the image data to a local file
//         const localUri = await saveImageToFile(result.assets[0].uri);

//         // Save the local file URI in AsyncStorage
//         await AsyncStorage.setItem('userIcon', localUri);
//         setUserIcon(localUri);
//         Alert.alert('Success', 'Profile picture uploaded successfully!');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       Alert.alert('Error', 'Failed to upload profile picture.');
//     }
//   };

//   // Function to save image data to a local file using expo-file-system
//   const saveImageToFile = async (uri: string) => {
//     try {
//       const fileUri = `${FileSystem.documentDirectory}profile_image.jpg`;
//       await FileSystem.copyAsync({ from: uri, to: fileUri });
//       return fileUri;
//     } catch (error) {
//       console.error('Error saving image to file:', error);
//       throw new Error('Failed to save image');
//     }
//   };
//   return (
//     <Container>
//       <TouchableOpacity onPress={handleImageUpload}>
//         <ProfileImage source={{ uri: userIcon }} />
//       </TouchableOpacity>

//       <TouchableOpacity onPress={auth.logout} style={{ marginBottom: 10 }}>
//         <Text>Logout</Text>
//       </TouchableOpacity>

//       <Text>Email: {userDetails?.user.email}</Text>
//       <Text>Wins: {userDetails?.gamesWon}</Text>
//       <Text>Losses: {userDetails?.gamesLost}</Text>
//       <Text>Currently playing: {userDetails?.currentlyGamesPlaying}</Text>
//       <Text>Total Games Played: {userDetails?.gamesPlayed}</Text>
//     </Container>
//   );
// };

// export default ProfileScreen;
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { fetchUserDetails } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const auth = useAuth();
  const [userIcon, setUserIcon] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png"
  );
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchUserIcon = async () => {
      try {
        const icon = await AsyncStorage.getItem("userIcon");
        setUserIcon(icon || userIcon);
      } catch (error) {
        console.error("Error fetching user icon:", error);
      }
    };
    fetchUserIcon();
  }, []);

  useEffect(() => {
    const fetchUserDetailsData = async () => {
      try {
        const data = await fetchUserDetails();
        setUserDetails(data);
        setIsLoading(false);
        console.log("User details:", data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };

    fetchUserDetailsData();
  }, [auth.token]);

  const handleImageUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow access to your photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const localUri = await saveImageToFile(result.assets[0].uri);
        await AsyncStorage.setItem("userIcon", localUri);
        setUserIcon(localUri);
        Alert.alert("Success", "Profile picture uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload profile picture.");
    }
  };

  const saveImageToFile = async (uri: string) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}profile_image.jpg`;
      await FileSystem.copyAsync({ from: uri, to: fileUri });
      return fileUri;
    } catch (error) {
      console.error("Error saving image to file:", error);
      throw new Error("Failed to save image");
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loadingIndicator}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={handleImageUpload}>
        <Image source={{ uri: userIcon }} style={styles.profileImage} />
      </TouchableOpacity>

      <View>
        <Text style={styles.cardTextOne}>Profile Details</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.cardText}>Email: {userDetails?.user.email}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.cardText}>Games Won: {userDetails?.gamesWon}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.cardText}>
          Games Lost: {userDetails?.gamesLost}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.cardText}>
          Currently Playing: {userDetails?.currentlyGamesPlaying}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.cardText}>
          Total Games Played: {userDetails?.gamesPlayed}
        </Text>
      </View>

      <TouchableOpacity onPress={auth.logout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const Colors = {
  light: "#eeee",
  grey: "#D8D8D8",
  darkGray: "#3F4F57",
  primary: "#263973",
  secondary: "#6B7FF2",
  dark: "#000",
  white: "#ffff",
  alt: "rgba(0,0,0,0.5)",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: Colors.secondary,
    marginTop: 10,
    width: 300,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 100,
  },
  iconContainer: {
    backgroundColor: Colors.white,
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#010E26",
    fontWeight: "400",
    fontSize: 16,
    marginVertical: 1,
  },
  cardTextOne: {
    fontWeight: "bold",
    color: Colors.white,
    fontSize: 30,
    width: 200,
  },
  logoutButton: {
    marginVertical: 10,
    backgroundColor: "#DB3930",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ProfileScreen;

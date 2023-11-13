import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constants/Settings";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
const AuthContext = createContext({
  authData: undefined,
  loading: false,
  signIn: async () => {},
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState("");

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorage function.

    loadStorageData();

    //loadNotification();
  }, []);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function loadStorageData() {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");

      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.

        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //loading finished
      setLoading(false);
    }
  }

  const signIn = async (date, page) => {
    await AsyncStorage.setItem(
      "@Bildirim",
      JSON.stringify({
        date: date,
        page: page,
      })
    );
    // const value = await AsyncStorage.getItem("@Bildirim");
    // const data = JSON.parse(value);
    // const mydate = new Date(data.date);
    // console.log(mydate.toString());

    // APİ DAN REGİSTER YAP

    //GELENİ AsyncStorage a kaydet

    await AsyncStorage.setItem(
      "@AuthData",
      JSON.stringify({
        id: "1",
        name: "Müslüman",
      })
    );
    setAuthData({
      id: "1",
      name: "Müslüman",
    });
    // NOTİVİTON AYARLA

    const Hour = date.getHours();
    const Minute = date.getMinutes();
    console.log(Hour + "Saati " + Minute + "Dakkasına bildirim atıldı");
    await schedulePushNotification(Hour, Minute, page);
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ authData, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

async function schedulePushNotification(hour, min, page) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Kolay Okuma",
      body: `Kitap Okuma Vakti.${page} Sayfanız Hazır.Hemen Okuyun`,
    },
    trigger: { hour: hour, minute: min, repeats: true },
  }).then(console.log("Notification send..."));
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };

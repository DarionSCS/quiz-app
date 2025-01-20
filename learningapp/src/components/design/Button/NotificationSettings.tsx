import React, { useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to request notification permissions
const requestNotificationPermissions = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Notifications permissions are required."
      );
      return false;
    }

    return true;
  } else {
    Alert.alert("Notice", "Notifications are not supported on simulators.");
    return false;
  }
};

// Function to schedule a daily notification
const scheduleDailyNotification = async () => {
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "This is your daily reminder to complete your tasks!",
      sound: true,
    },
    trigger: {
      hour: 9,
      minute: 0,
      repeats: true,
    },
  });

  Alert.alert("Success", "Daily notification has been scheduled!");
};

export const NotificationSettings = () => {
  useEffect(() => {
    const checkPermissionsAndSetup = async () => {
      await requestNotificationPermissions();
    };
    checkPermissionsAndSetup();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Daily Notification"
        onPress={scheduleDailyNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

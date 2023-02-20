import AddRoomScreen from "../screens/AddRoomScreen";
import HomeScreen from "../screens/HomeScreen";
import RoomScreen from "../screens/RoomScreen";
import { IconButton } from "react-native-paper";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../navigation/AuthProvider";

// create two new instances
const ChatAppStack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator();
function ChatApp() {
const { logOut } = useAuthContext();

  return (
    <ChatAppStack.Navigator>
      <ChatAppStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate("AddRoom")}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout-variant"
              size={28}
              color="#ffffff"
              onPress={() => logOut()}
            />
          ),
        })}
      />
      <ChatAppStack.Screen
        name="Room"
        component={RoomScreen}
        options={({ route }) => ({
          title: route.params.thread.name,
        })}
      />
    </ChatAppStack.Navigator>
  );
}
export default function HomeStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
    </ModalStack.Navigator>
  );
}

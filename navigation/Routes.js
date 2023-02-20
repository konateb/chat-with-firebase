import React, { useEffect, useState } from "react";

import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import Loading from "../components/Loading";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthContext } from "./AuthProvider";

export default function Routes() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

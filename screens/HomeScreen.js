import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Title, List, Divider } from "react-native-paper";
import Loading from "../components/Loading";
import { firestore } from "../firebase";
import useStatsBar from "../utils/useStatusBar";
import { collection, query, onSnapshot } from "firebase/firestore";
export default function HomeScreen({ navigation }) {
  useStatsBar("light-content");
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = () => {
      const q = query(collection(firestore, "THREADS"));
      onSnapshot(q, (querySnapshot) => {
        const rooms = [];
        querySnapshot.forEach((doc) => {
          const room = {
            _id: doc.id,
            name: "React Native",
            latestMessage: {
              text: "the default message",
            },

            ...doc.data(),
          };
          rooms.push(room);
        });
        setThreads(rooms);
      });

      if (loading) {
        setLoading(false);
      }
    };
    // return () => {
    return unsubscribe();
    // };
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Title>Home Screen</Title>
      <Title>All chat rooms will be listed here</Title>
      {/* <Title>{user.uid}</Title> */}
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Room", { thread: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});

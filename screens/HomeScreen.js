import { useCallback, useContext, useEffect, useState } from "react"
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { deleteTask, fetchTasks } from "../services/api";
import { ActivityIndicator, AnimatedFAB, Appbar, IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const { logout } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadTasks()
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [])
    );

    const loadTasks = async () => {
        setRefreshing(true);
        const data = await fetchTasks();
        setTasks(data);
        setRefreshing(false);
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleLogout = async () => {
        logout()
    };

    return (
        <>
            <Appbar.Header>
                {/* <Appbar.Action icon={"arrow-left"} onPress={() => { navigation.goBack() }} /> */}
                <Appbar.Content title="Dashboard" />
                <Appbar.Action icon={"power"} onPress={handleLogout} />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={styles.header}>My Tasks</Text>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item._id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTasks} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("TaskDetailsScreen", { task: item })}
                                style={{
                                    padding: 15,
                                    backgroundColor: "#f0f0f0",
                                    marginBottom: 10,
                                    borderRadius: 8,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
                                    <Text>{item.description}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <IconButton icon={'pencil-outline'} iconColor="black" onPress={() => navigation.navigate("EditTaskScreen", { task: item })}/>
                                    <IconButton icon={'delete'} iconColor="red" onPress={() => handleDelete(item._id)}/>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<Text style={{ justifyContent: "center", alignSelf: "center" }}>No Tasks Found!</Text>}
                    />
                    <AnimatedFAB
                        variant="primary"
                        icon={"plus"}
                        color="black"
                        style={[styles.fabStyle]}
                        onPress={() => { navigation.navigate('AddTaskScreen') }}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
    },
    header: {
        fontWeight: "800",
        fontSize: 20,
        marginBottom: 20
    }
})
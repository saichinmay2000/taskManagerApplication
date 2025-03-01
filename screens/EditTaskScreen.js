import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { updateTask } from "../services/api";

export default function EditTaskScreen({ route, navigation }) {
    const { task } = route.params;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        const updatedTask = { title, description };
        await updateTask(task._id, updatedTask);
        setLoading(false);
        navigation.goBack();
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon={"arrow-left"} onPress={() => { navigation.goBack() }} />
                <Appbar.Content title="Edit Task" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={styles.container}>
                    <TextInput
                        mode="outlined"
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        mode="outlined"
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />
                    <Button
                        mode="contained"
                        buttonColor="#0071E7"
                        loading={loading}
                        onPress={handleUpdate}
                    >
                        Update Task
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        gap: 10
    },
});

import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { createTask } from "../services/api";
import { Appbar, TextInput, Button } from "react-native-paper";

const AddTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (!title || !description) return alert("All fields are required!");
        await createTask(title, description);
        navigation.goBack();
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Action icon={"arrow-left"} onPress={() => {navigation.goBack()}}/>
                <Appbar.Content title="Create Task" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 1, padding: 20, flexDirection: "column", gap: 10 }}>
                    {/* <Text style={{ fontSize: 22, marginBottom: 10 }}>Create Task</Text> */}
                    <TextInput
                        mode="outlined"
                        placeholder="Task Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Task Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Button
                        onPress={handleSubmit}
                        mode="contained"
                        buttonColor="#0071E7"
                        style={{ width: '50%', alignSelf: "center" }}
                        labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                    >
                        Add Task
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
};

export default AddTaskScreen;

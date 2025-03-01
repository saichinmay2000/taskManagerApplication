import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.7:2500/tasks"

const getAuthToken = async () => {
    return await AsyncStorage.getItem("token")
}

export const fetchTasks = async () => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET"
    });
    return response.json();
}

export const createTask = async (title, description) => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({ title, description })
    });
    return response.json();
}

export const deleteTask = async (id) => {
    const token = await getAuthToken();
    return await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateTask = async (id, updatedTask) => {
    const token = await getAuthToken();
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedTask),
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating task:", error);
    }
};
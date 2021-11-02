import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        const data = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
        };

        setTasks((oldTask) => [...oldTask, data]);
    }

    function handleToggleTaskDone(id: number) {
        const changeTaskDone = tasks.map((task) => ({ ...task }));

        const findTask = changeTaskDone.find((task) => task.id === id);

        if (!findTask) return;

        findTask.done = !findTask.done;
        setTasks(changeTaskDone);
    }

    function handleRemoveTask(id: number) {
        const NewTask = tasks.filter((task) => task.id !== id);
        setTasks(NewTask);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
});

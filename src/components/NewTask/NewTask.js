import { useCallback, useState } from "react";
import useHttp from "../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const createTask = useCallback((taskData, text) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: text };

    props.onAddTask(createdTask);
  }, [props]);

  const {
    isLoading,
    error,
    sendRequest: sendTaskRequest,
  } = useHttp(createTask);

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
      url: "https://react-http-99c7b-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { text: taskText },
    });

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

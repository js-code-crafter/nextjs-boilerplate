"use client";

import { get } from "../(utility)/api";
import { ToDoList } from "../(utility)/types";
import StyledBadge from "./StyledBadge";
import ToDoItem from "./ToDoItem";
import { Stack, Box, Typography, Snackbar, Portal } from "@mui/material/";
import AddTodoButton from "./AddTodoButton";
import { useQuery } from "@tanstack/react-query";

/**
 * `Main` is an asynchronous React component that fetches and displays a list of to-do items.
 *
 * @component
 * @async
 *
 * @returns {JSX.Element} The rendered Home component, including the total count of to-dos and a list of to-do items.
 *
 */
export default function Main() {
  const { status, data, error } = useQuery<ToDoList, Error>({
    queryKey: ["todos"],
    queryFn: async () => (await get("/todos")).json as ToDoList,
  });

  const allTodos = data ?? {
    data: [],
    pageCount: 0,
    success: false,
    totalCount: 0,
  };

  if (status === "pending") {
    <Portal container={() => document.body}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={status === "pending"}
        message="Loading..."
      />
    </Portal>;
  }

  if (status === "error") {
    <Portal container={() => document.body}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={status === "error"}
        message={<Box>Error: {error.message}</Box>}
      />
    </Portal>;
  }

  return (
    allTodos.success && (
      <>
        <Box px={2} pt={2}>
          <StyledBadge
            color="default"
            variant="outlined"
            value={allTodos.totalCount.toString()}
          >
            <Typography variant="h6" gutterBottom>
              All Todos
            </Typography>
          </StyledBadge>
        </Box>
        <AddTodoButton />
        <Stack spacing={1} px={2}>
          {allTodos.data.map((todo) => (
            <ToDoItem key={todo.id} todo={todo} />
          ))}
        </Stack>
      </>
    )
  );
}

"use client";

import { useState } from "react";
import { ToDo } from "../(utility)/types";
import { Paper, Box, Grid2 as Grid, Fade } from "@mui/material/";
import StyledBadge from "./StyledBadge";
import DeleteButton from "./DeleteButton";
import { CalendarMonth } from "@mui/icons-material";

/**
 * `ToDoItem` is a React component that displays a single to-do item, including its title, status, deadline, and tags.
 * It also provides functionality to handle item deletion with an animation effect.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ToDo} props.todo - The to-do item object containing details such as title, status, deadline, and tags.
 *
 * @example
 * const todo = {
 *   id: 1,
 *   title: "Sample To-Do",
 *   tags: ["example", "react"],
 *   deadline: "2024-12-31T10:00:00Z",
 *   status: "todo",
 *   createdAt: "2024-01-01T10:00:00Z",
 *   updatedAt: "2024-01-01T10:00:00Z",
 * };
 *
 * return (
 *   <ToDoItem todo={todo} />
 * );
 *
 * @returns {JSX.Element} The rendered ToDoItem component.
 */
export default function ToDoItem({ todo }: { todo: ToDo }) {
  // State to track whether a deletion request is in progress.
  // Initially set to false, indicating no request is currently made.
  const [removalRequest, setRemovalRequest] = useState<boolean>(false);

  // State to track whether the to-do item has been deleted.
  // Initially set to false, indicating that the item is not deleted.
  const [deleted, setDeleted] = useState<boolean>(false);

  /**
   * `handleDelBtnClick` is an asynchronous function that is triggered when the delete button is clicked.
   * It sets the `removalRequest` state to true to indicate that a deletion request is being processed.
   * This can be used to manage UI states, such as showing a loading indicator or disabling the delete button during the request.
   *
   * @async
   * @function handleClick
   */
  async function handleDelBtnClick() {
    setRemovalRequest(true);
  }

  /**
   * `handleDelete` is an asynchronous function that is called to mark the to-do item as deleted.
   * It sets the `deleted` state to true, indicating that the item has been successfully deleted.
   * This can trigger UI updates, such as hiding the deleted item or showing a confirmation message.
   *
   * @async
   * @function handleDelete
   */
  async function handleDelete() {
    setDeleted(true);
  }

  return (
    <>
      <Fade in={!deleted} mountOnEnter unmountOnExit>
        <Paper
          elevation={4}
          sx={{
            backgroundColor: removalRequest ? "#e35" : "#fefefe",
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
              <Box p={1}>
                <StyledBadge
                  sx={{
                    backgroundColor:
                      todo.status == "done"
                        ? "#e0d373"
                        : todo.status == "inProgress"
                        ? "#b0d4e4"
                        : "#c0c5c8",
                  }}
                  value={
                    todo.status == "inProgress" ? "in progress" : todo.status
                  }
                >
                  <Box sx={{ fontWeight: "bold" }}>
                    {todo.title === "" ? "(empty)" : todo.title}
                  </Box>
                </StyledBadge>
                <Grid container>
                  <Grid>{todo.deadline && <Box>&nbsp;&nbsp;</Box>}</Grid>
                  <Grid>
                    {todo.deadline && <CalendarMonth sx={{ fontSize: 14 }} />}
                    {(todo.deadline as string)?.substring(0, 10)}
                  </Grid>
                  <Grid>{todo.deadline && <Box>&nbsp;&nbsp;</Box>}</Grid>
                  <Grid>
                    <Box sx={{ color: "gray", fontWeight: "2" }}>
                      &nbsp;&nbsp;
                      {(todo.tags as string[])
                        .map((d) => "#" + d.trim())
                        .join(" ")}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid>
              <DeleteButton
                todo={todo}
                onClick={handleDelBtnClick}
                onDelete={handleDelete}
              />
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </>
  );
}

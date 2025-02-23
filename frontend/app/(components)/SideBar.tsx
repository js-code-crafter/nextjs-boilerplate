"use client";

import { ToDo, ToDoList, ValidationError } from "../(utility)/types";
import { post, JsonResponse } from "../(utility)/api";
import {
  Divider,
  Grid2 as Grid,
  Box,
  Button,
  IconButton,
  Portal,
  Snackbar,
} from "@mui/material";
import { Create, Close } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FormContainer,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { useState } from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Sidebar component for creating a new ToDo item.
 *
 * @param {Object} props - React props
 * @param {Function} props.onClose - Function to call when the sidebar is closed
 *
 * @returns {JSX.Element} Rendered Sidebar component
 */
export default function SideBar({ onClose }: { onClose: () => void }) {
  // State to track the success status of the add operation.
  // It can be true (successful), false (failed), or null (no operation performed).
  const [success, setSuccess] = useState<boolean | null>(null);

  // Error message
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Access the client
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation<JsonResponse, Error, [string, object]>({
    mutationFn: post,
    onSuccess: (response: JsonResponse) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // Update success state based on response
      setSuccess(response.ok && (response.json as ToDoList).success === true);
      if (response.ok === false) {
        setSuccess(false);
        setErrorMsg((response.json as ValidationError).message);
      }
    },
    onError: (error: Error) => {
      setSuccess(false);
      setErrorMsg(error.message);
    },
  });

  /**
   * Handles form submission by posting new Todo data.
   * @param {ToDo} data - The data object conforming to the ToDo type
   */
  async function handleSubmit(data: ToDo) {
    data.deadline = (data.deadline as dayjs.Dayjs).toISOString(); // Convert deadline to ISO string
    data.tags = (data.tags as string).split(",").map((tag) => tag.trim());
    mutation.mutate(["/todos", data]); // POST request to add Todo
  }

  /**
   * Closes the Snackbar notification.
   */
  async function handleSnackBarClose() {
    setSuccess(null); // Reset success state
    setErrorMsg(null); // Reset the state of error meassage
  }

  return (
    <>
      <Portal container={() => document.body}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={success !== null}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
          message={
            success === true
              ? "The TODO item was added successfully."
              : "Unable to add the TODO item. Details: " + errorMsg
          }
        />
      </Portal>
      <Grid container justifyContent="space-between">
        <Grid alignItems="center" container pt={0.3} pb={0.2} px={1}>
          <Grid>
            <Create sx={{ fontSize: "1rem", mt: 1, color: "#999" }} />
          </Grid>
          <Grid>
            <Box>Todo</Box>
          </Grid>
        </Grid>
        <Grid pt={0.3} pb={0.2} px={1}>
          <IconButton aria-label="delete" size="small" onClick={onClose}>
            <Close sx={{ fontSize: "1.5rem", color: "#999" }} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider></Divider>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormContainer
          defaultValues={{
            createdAt: dayjs().toISOString(),
            updatedAt: dayjs().toISOString(),
          }}
          onSuccess={handleSubmit}
        >
          <Grid container alignItems="center" px={1} pt={1}>
            <Grid size={3}>Title</Grid>
            <Grid size={9}>
              <TextFieldElement
                rules={{
                  pattern: {
                    value: /^[\p{L}\p{N}\p{Zs}\-_\.,]*$/gmu,
                    message:
                      "Only letters (from any language), numbers, spaces, dots, commas, dashes, and underscores are permitted.",
                  },
                }}
                fullWidth
                size="small"
                name="title"
                label="Title"
                required
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" px={1} pt={1}>
            <Grid size={3}>Status</Grid>
            <Grid size={9}>
              <SelectElement
                fullWidth
                size="small"
                label="Status"
                name="status"
                options={[
                  { id: "todo", label: "todo" },
                  { id: "inProgress", label: "in progress" },
                  { id: "done", label: "done" },
                ]}
                required
              ></SelectElement>
            </Grid>
          </Grid>
          <Grid container alignItems="center" px={1} pt={1}>
            <Grid size={3}>Deadline</Grid>
            <Grid size={9}>
              <DatePickerElement label="Deadline" name="deadline" required />
            </Grid>
          </Grid>
          <Grid container alignItems="center" px={1} pt={1}>
            <Grid size={3}>Tags</Grid>
            <Grid size={9}>
              <TextFieldElement
                rules={{
                  pattern: {
                    value: /^[\p{L}\p{N}\p{Zs}\-_\.,]*$/gmu,
                    message:
                      "Only letters (from any language), numbers, spaces, dots, commas, dashes, and underscores are permitted.",
                  },
                }}
                fullWidth
                size="small"
                label="Comma Separated Tags"
                name="tags"
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="flex-end"
            px={1}
            pt={1}
            height="calc(100vh - 16rem)"
          >
            <Grid>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
        </FormContainer>
      </LocalizationProvider>
    </>
  );
}

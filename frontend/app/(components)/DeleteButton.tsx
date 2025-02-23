"use client";

import { useState } from "react";
import { ToDo, ValidationError } from "../(utility)/types";
import { DeleteForever } from "@mui/icons-material";
import { delete_, JsonResponse } from "../(utility)/api";
import { Snackbar, Portal, IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { Portal } from "@mui/base";

/**
 * `DeleteButton` is a React component that provides a button to delete a to-do item.
 * It displays a snackbar notification to indicate the success or failure of the deletion process.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ToDo} props.todo - The to-do item to be deleted.
 * @param {function} props.onClick - Callback function to be called when the delete button is clicked and the deletion request is initiated.
 * @param {function} props.onDelete - Callback function to be called when the to-do item is successfully deleted.
 *
 * @example
 * const todo = { id: 1, title: "Sample To-Do", ... };
 *
 * return (
 *   <DeleteButton
 *     todo={todo}
 *     onClick={() => console.log("Delete button clicked")}
 *     onDelete={() => console.log("To-Do deleted successfully")}
 *   />
 * );
 *
 * @returns {JSX.Element} The rendered DeleteButton component.
 */
export default function DeleteButton({
  todo,
  onClick,
  onDelete,
}: {
  todo: ToDo;
  onClick: () => void;
  onDelete: () => void;
}) {
  // State to track the success status of the delete operation.
  // It can be true (successful), false (failed), or null (no operation performed).
  const [success, setSuccess] = useState<boolean | null>(null);

  // Error messagge
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Access the client
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation<JsonResponse, Error, string>({
    mutationFn: delete_,
    onSuccess: (response: JsonResponse) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setSuccess(response.ok);
      if (response.ok === false) {
        setErrorMsg((response.json as ValidationError).message);
      }
      if (response.ok === true) onClick();
    },
    onError: (error: Error) => {
      setSuccess(false);
      setErrorMsg(error.message);
    },
  });

  /**
   * `handleClick` is an asynchronous function that is triggered when the delete button is clicked.
   * It sends a GET request to fetch the specified to-do item using its ID.
   * Upon receiving the response, it updates the `success` state to indicate whether the operation was successful
   * and triggers the `onClick` callback if the deletion was successful.
   *
   * @async
   * @function handleClick
   *
   */
  async function handleClick() {
    if (todo.id > 0) mutation.mutate("/todos/" + todo.id);
    // if (todo.id > 0) {
    //   const response = await delete_("/todos/" + todo.id);
    //   setSuccess(response.ok);
    //   if (response.ok === false) {
    //     setErrorMsg((response.json as ValidationError).message);
    //   }
    // }
  }

  /**
   * `handleSnackBarClose` is an asynchronous function that is triggered when the SnackBar is closed.
   * It calls the `onDelete` callback if the `success` state is truthy, then updates the `success` state to null.
   *
   * @async
   * @function handleSnackBarClose
   */
  async function handleSnackBarClose() {
    if (success) {
      onDelete();
    }
  }

  return (
    <>
      <Portal container={() => document.body}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={success === false}
          autoHideDuration={2000}
          onClose={handleSnackBarClose}
          message={"Unable to delete the TODO item. Details: " + errorMsg}
        />
      </Portal>
      <IconButton aria-label="delete" size="small" onClick={handleClick}>
        <DeleteForever sx={{ color: "#aaa" }} />
      </IconButton>
    </>
  );
}

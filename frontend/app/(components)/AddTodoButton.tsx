"use client";

import { useState } from "react";
import { Box, Drawer } from "@mui/material/";
import SideBar from "./SideBar";

/**
 * AddTodoButton component - A button that opens a drawer for adding a new todo item.
 *
 * This component includes a button that, when clicked, opens a drawer
 * from the right side of the screen, displaying a SideBar for user input.
 *
 * @returns {JSX.Element} The rendered AddTodoButton component.
 */
export default function AddTodoButton() {
  // State to control the visibility of the Drawer
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false); // Initializes drawerOpen state to false.

  /**
   * handleBtnClick - Handles the button click event to open the Drawer.
   *
   * This function sets the drawerOpen state to true, which displays
   * the Drawer element. It is called when the "+ Add Todo" button is clicked.
   *
   * @async
   * @function handleBtnClick
   */
  async function handleBtnClick() {
    setDrawerOpen(true); // Sets drawerOpen to true, opening the Drawer.
  }

  /**
   * handleDrawerClose - Handles the event to close the Drawer.
   *
   * This function sets the drawerOpen state to false, hiding the Drawer
   * when the user clicks to close it. It is called when the Drawer
   * close action occurs.
   *
   * @async
   * @function handleDrawerClose
   */
  async function handleDrawerClose() {
    setDrawerOpen(false); // Sets drawerOpen to false, closing the Drawer.
  }

  return (
    <>
      <Box px={2} mb={1}>
        <Box
          onClick={handleBtnClick} // Click event to open the Drawer
          sx={{
            p: 1,
            textAlign: "left",
            cursor: "pointer",
            border: 1,
            borderColor: "#ccc", // Border color for the Button
            borderRadius: 2,
            backgroundColor: "#f5f5f5", // Background color for the Button
            width: "100%",
          }}
        >
          + Add Todo {/* Button text */}
        </Box>
      </Box>
      <Drawer open={drawerOpen} onClose={handleDrawerClose} anchor="right">
        <Box width={400}>
          <SideBar onClose={handleDrawerClose} />
        </Box>
      </Drawer>
    </>
  );
}

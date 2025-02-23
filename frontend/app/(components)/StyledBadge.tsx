"use client";

import {
  Box,
  Chip,
  ChipPropsColorOverrides,
  ChipPropsVariantOverrides,
  Grid2 as Grid,
  SxProps,
  Theme,
} from "@mui/material";
import { ReactNode } from "react";
import { OverridableStringUnion } from "@mui/types";

/**
 * `StyledBadge` is a React component that displays a badge (chip) alongside its children content.
 * It allows customization of the badge's color, variant, and styles.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The content to be displayed alongside the badge.
 * @param {string} props.value - The text to be displayed inside the badge.
 * @param {OverridableStringUnion<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning", ChipPropsColorOverrides>} [props.color] - Optional. The color of the badge. Defaults to "primary".
 * @param {OverridableStringUnion<"filled" | "outlined", ChipPropsVariantOverrides>} [props.variant] - Optional. The variant of the badge. Defaults to "filled".
 * @param {SxProps<Theme>} [props.sx] - Optional. Custom styles for the badge.
 *
 * @example
 * return (
 *   <StyledBadge value="10">
 *     <Box>Notifications</Box>
 *   </StyledBadge>
 * );
 *
 * @returns {JSX.Element} The rendered StyledBadge component.
 */
export default function StyledBadge({
  children,
  value,
  color,
  variant,
  sx,
}: {
  children: Readonly<ReactNode>;
  value: string;
  color?: OverridableStringUnion<
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    ChipPropsColorOverrides
  >;
  variant?: OverridableStringUnion<
    "filled" | "outlined",
    ChipPropsVariantOverrides
  >;
  sx?: SxProps<Theme>;
}) {
  return (
    <Grid container>
      <Grid>
        <Box>&nbsp;&nbsp;</Box>
      </Grid>
      <Grid>{children}</Grid>
      <Grid>
        <Box>&nbsp;</Box>
      </Grid>
      <Grid>
        <Chip
          label={value}
          size="small"
          color={color ?? "primary"}
          variant={variant ?? "filled"}
          sx={sx}
        />
      </Grid>
    </Grid>
  );
}

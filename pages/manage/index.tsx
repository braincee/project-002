import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Typography,
  Table,
  Sheet,
  Modal,
  ModalDialog,
} from "@mui/joy";
import Add from "@mui/icons-material/Add";

const Manage = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ px: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ p: 2, border: "1px solid #ccc" }}>
        {/* Content for the first box */}
        <Typography level="h4" sx={{ marginBottom: 2 }}>
          Email Address: test@test.com
        </Typography>
        <Input placeholder="Enter new password" type="password" value="" />
        <Button variant="outlined" sx={{ marginTop: 2 }}>
          Change Password
        </Button>
      </Box>
      <Box sx={{ p: 2, border: "1px solid #ccc" }}>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => setOpen(true)}
          sx={{ display: "flex", mb: 1 }}
        >
          Add User
        </Button>
        <Sheet sx={{ height: 100, overflow: "auto" }}>
          <Table
            aria-label="stripe table"
            stripe="even"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground": "transparent",
              "--TableCell-selectedBackground": (theme) =>
                theme.vars.palette.primary.softBg,
              "& thead th:nth-child(1)": {
                width: "40px",
              },
              "& thead th:nth-child(2)": {
                width: "20%",
              },
              "& tr > *:nth-child(n+3)": { textAlign: "right" },
            }}
          >
            <thead>
              <tr>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>test@test.com</tbody>
            <tbody>test@test.com</tbody>
            <tbody>test@test.com</tbody>
          </Table>
        </Sheet>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            Add New Entries
          </Typography>
          <Input placeholder="Add user email" />
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button
              variant="solid"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Manage;

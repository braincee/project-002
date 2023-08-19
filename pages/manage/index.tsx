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
import { addUser, getUsers } from "@/libs/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { User } from "@/libs/models";
import { v4 as uuidV4 } from "uuid";

export const getServerSideProps: GetServerSideProps = async () => {
  const users = JSON.stringify(
    await User.findAll({
      order: [["created_at", "DESC"]],
    })
  );
  return {
    props: {
      addresses: JSON.parse(users),
    },
  };
};

interface Data {
  id: string;
  email: string;
}

const Manage = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<any[]>(users || []);
  const [newUserEmail, setNewUserEmail] = useState("");

  const handleAddUser = async () => {
    if (newUserEmail) {
      setLoading(true);
      const userId = uuidV4();
      await addUser({ id: userId, email: newUserEmail });
      const { response } = await getUsers();
      setUserList(response);
      setLoading(false);
      setNewUserEmail("");
      setOpen(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewUserEmail("");
  };

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
              "--TableCell-headBackground": "#eeeeee",
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
                <th>USERS</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: Data) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
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
          <Input
            placeholder="Add user email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
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
              color="primary"
              onClick={() => handleAddUser()}
              loading={loading}
              isModalClose={handleCloseModal}
            >
              Save
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default Manage;

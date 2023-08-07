import React, { ReactElement, useState } from "react";
import Layout from "@/components/Layout";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Stack,
  Table,
  Tooltip,
  Typography,
} from "@mui/joy";
import { Download } from "@mui/icons-material";
import { ExportToCsv } from "export-to-csv";

const Logs = () => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [alert, setAlert] = useState<ReactElement<any> | string>("");

  const isSelected = (index: string) => selected.indexOf(index) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = [].map((log: any) => log.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, index: string) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDownload = () => {
    const data: any[] = [];
    [].forEach((log) => {
      data.push({
        log: "",
        "content request": "",
        "created at": "",
      });
    });

    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: false,
      showTitle: true,
      title: "Logs Table",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ["Log", "Content request", "Date created"],
    };

    const csvExporter = new ExportToCsv(options);
    if (data.length > 0) {
      csvExporter.generateCsv(data);
    } else {
      setAlert(
        <Alert variant="outlined" color="danger">
          Table has no data
        </Alert>
      );
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  return (
    <Layout>
      <Box
        sx={{ py: 2, px: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography level="h3">Logs</Typography>
        <Stack spacing={2}>
          {alert}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1,
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: "background.level1",
              }),
              borderTopLeftRadius: "var(--unstable_actionRadius)",
              borderTopRightRadius: "var(--unstable_actionRadius)",
            }}
          >
            <Stack spacing={1} direction={{ xs: "column", md: "row" }}>
              <Tooltip
                title="Download as CSV"
                sx={{ display: "flex", justifyItems: "center" }}
              >
                <Button
                  startDecorator={<Download />}
                  size="sm"
                  color="neutral"
                  variant="solid"
                  onClick={() => handleDownload()}
                >
                  Download
                </Button>
              </Tooltip>
            </Stack>
          </Box>
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
              "& thead th:nth-child(3)": {
                width: "20%",
              },
              "& thead th:nth-child(4)": {
                width: "30%",
              },
              "& tr > *:nth-child(n+3)": { textAlign: "center" },
            }}
          >
            <thead>
              <tr>
                <th>
                  <Checkbox
                    onChange={handleSelectAllClick}
                    sx={{ verticalAlign: "sub" }}
                  />
                </th>
                <th>Logs</th>
                <th>Content Request</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {[].map((log: any, index: number) => {
                const isItemSelected = isSelected(log.id);
                return (
                  <tr
                    key={index}
                    onClick={(event) => handleClick(event, log.id)}
                    role="checkbox"
                    tabIndex={-1}
                    aria-checked={isItemSelected}
                    style={
                      isItemSelected
                        ? ({
                            "--TableCell-dataBackground":
                              "var(--TableCell-selectedBackground)",
                            "--TableCell-headBackground":
                              "var(--TableCell-selectedBackground)",
                          } as React.CSSProperties)
                        : {}
                    }
                  >
                    <th scope="row">
                      <Checkbox
                        checked={isItemSelected}
                        sx={{ verticalAlign: "top" }}
                      />
                    </th>
                    <td>
                      <Typography level="h6">{log.log}</Typography>
                    </td>
                    <td>{log.Contents.length}</td>
                    <td>
                      <Typography color="neutral">
                        {new Date(log.created_at).toDateString()}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </Table>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Logs;

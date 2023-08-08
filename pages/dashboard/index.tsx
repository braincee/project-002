import React from "react";
import { Box, Card, Grid, List, Stack, Typography } from "@mui/joy";
import BarChart from "@/components/BarChart";
import { Address, Content } from "@/libs/models";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const addresses = JSON.stringify(
    await Address.findAll({ order: [["created_at", "DESC"]] })
  );
  const contents = JSON.stringify(await Content.findAll());

  return {
    props: {
      addresses: JSON.parse(addresses),
      contentLength: JSON.parse(contents).length,
    },
  };
};

export default function Dashboard({
  addresses,
  contentLength,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const chartData = () => {
    const data = new Map();
    const labels: any[] = [];
    const dataValues: any[] = [];
    addresses.map((address: any) => {
      let date = new Date(address.created_at).toDateString();
      if (data.has(date)) {
        data.set(date, data.get(date) + 1);
      } else {
        data.set(date, 1);
      }
    });
    data.forEach((value, key) => {
      labels.push(key.substring(key.indexOf(" ") + 1));
      dataValues.push(value);
    });
    return { labels, dataValues };
  };

  return (
    <Box
      sx={{ py: 2, px: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography level="h3">Dashboard</Typography>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%", px: { xs: "auto", md: 5, lg: 20 } }}
      >
        <Grid xs={12} sm={6}>
          <Card
            color="primary"
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography level="h4">Addresses</Typography>
            <Typography level="h3" color="primary">
              {addresses.length}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card
            color="primary"
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography level="h4">Content Files</Typography>
            <Typography level="h3" color="primary">
              {contentLength}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card sx={{ minHeight: "300px" }} color="primary" variant="outlined">
            <BarChart mapData={chartData} />
          </Card>
        </Grid>
        <Grid xs={12} sm={4} spacing={2}>
          <Typography level="h4">Recent Addresses</Typography>
          <Stack spacing={1}>
            {addresses.slice(0, 4).map((address: any, index: any) => (
              <List
                sx={{ textAlign: "start", backgroundColor: "inherit" }}
                key={index}
              >
                <Typography level="h4">{address.address}</Typography>
                <Typography color="neutral">
                  {new Date(address.created_at).toDateString()}
                </Typography>
              </List>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

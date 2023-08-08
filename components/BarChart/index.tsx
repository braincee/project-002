import React from "react";
import dynamic from "next/dynamic";

const SingleBarChart = dynamic(
  () => import("@mui/x-charts").then((module) => module.BarChart),
  {
    ssr: false,
  }
);

const BarChart = ({ mapData }: { mapData: any }) => {
  const { labels, dataValues } = mapData();
  return (
    <>
      <SingleBarChart
        xAxis={[{ scaleType: "band", data: labels }]}
        series={[{ data: dataValues, color: "#4393e4" }]}
        height={300}
      />
    </>
  );
};

export default BarChart;

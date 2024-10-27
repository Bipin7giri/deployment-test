// import React from "react";
// import ReactEcharts from "echarts-for-react";
// import data from "../../../components/Charts/data";

// const ImportExport = () => {
//   const raw = data;
//   const option = {
//     dataset: [
//       {
//         id: "dataset_raw",
//         source: raw,
//       },
//       {
//         id: "dataset_since_1950_of_germany",
//         fromDatasetId: "dataset_raw",
//         transform: {
//           type: "filter",
//           config: {
//             and: [
//               { dimension: "Year", gte: 1950 },
//               { dimension: "Country", "=": "Germany" },
//             ],
//           },
//         },
//       },
//       {
//         id: "dataset_since_1950_of_france",
//         fromDatasetId: "dataset_raw",
//         transform: {
//           type: "filter",
//           config: {
//             and: [
//               { dimension: "Year", gte: 1950 },
//               { dimension: "Country", "=": "France" },
//             ],
//           },
//         },
//       },
//     ],
//     tooltip: {
//       trigger: "axis",
//     },
//     xAxis: {
//       type: "category",
//       nameLocation: "middle",
//     },
//     yAxis: {
//       name: "Income",
//     },
//     series: [
//       {
//         type: "line",
//         datasetId: "dataset_since_1950_of_germany",
//         showSymbol: false,
//         encode: {
//           x: "Year",
//           y: "Income",
//           itemName: "Year",
//           tooltip: ["Income"],
//         },
//       },
//       {
//         type: "line",
//         datasetId: "dataset_since_1950_of_france",
//         showSymbol: false,
//         encode: {
//           x: "Year",
//           y: "Income",
//           itemName: "Year",
//           tooltip: ["Income"],
//         },
//       },
//     ],
//   };
//   return (
//     <div style={{ width: "118%" }}>
//       <ReactEcharts option={option} />
//     </div>
//   );
// };

// export default ImportExport;


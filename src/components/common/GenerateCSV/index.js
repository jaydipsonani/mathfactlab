// import { ExportToCsv } from "export-to-csv";

// function DownloadCSV({ csvData, exportFileName }) {
//     if (csvData.length) {
//         if (csvData == null) return;
//         const csvOptions = {
//             fieldSeparator: ",",
//             quoteStrings: '"',
//             decimalSeparator: ".",
//             showLabels: true,
//             showTitle: false,
//             filename: exportFileName,
//             useTextFile: false,
//             useBom: true,
//             useKeysAsHeaders: true,
//         };

//         const csvExporter = new ExportToCsv(csvOptions);
//         csvExporter.generateCsv(csvData);
//     } else {
//         alert("No any data");
//     }
// }

// export default DownloadCSV;
// import { generateCsv } from "export-to-csv";

const DownloadCSV = ({ csvData, exportFileName }) => {
  if (csvData.length === 0) {
    alert("No data available to download.");
    return;
  }

  const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(convertToCSV(csvData));
  const link = document.createElement("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", exportFileName + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

function convertToCSV(data) {
  const header = Object.keys(data[0]).join(",");
  const rows = data.map(obj => {
    return Object.values(obj)
      .map(val => {
        if (typeof val === "string" && val.includes(",")) {
          return `"${val}"`;
        }
        return val;
      })
      .join(",");
  });
  return [header, ...rows].join("\n");
}

export default DownloadCSV;

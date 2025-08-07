import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const flattenRows = (rows, columns) => {
  const flatRows = [];

  rows.forEach((row) => {
    flatRows.push(row);
    if (Array.isArray(row.child)) {
      row.child.forEach((childRow) => {
        flatRows.push({
          ...childRow,
          title: "↳ " + childRow.title, // Indent child row visually
        });
      });
    }
  });

  return flatRows;
};

/**
 * Export MUI DataGrid rows and columns to PDF
 */
export const exportPDF = (rows, columns) => {
  const doc = new jsPDF();

  // Get the column headers
  const tableColumn = columns
    .filter((col) => col.field !== "actions") // Skip actions column
    .map((col) => col.headerName);

  // Flatten rows and extract row data based on columns
  const flatRows = flattenRows(rows, columns);

  const tableRows = flatRows.map((row) =>
    columns
      .filter((col) => col.field !== "actions")
      .map((col) => row[col.field] || "")
  );

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [0, 0, 0],
    },
  });

  doc.save("backlog-table.pdf");
};

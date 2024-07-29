import { PlanListType } from "@/types/dashBoard";
import React from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import Loading from "../Loading";
import { TableProps } from "@/types/component";

const Table: React.FC<TableProps> = ({ data, loading }) => {
  const customStyle: TableStyles = {
    responsiveWrapper: {
      style: {
        maxHeight: "none",
      },
    },
    headRow: {
      style: {
        border: "none",
        backgroundColor: "#F5F8FA",
        fontSize: "14px",
        fontWeight: "600",
        color: "#A1A5B7",
        paddingTop: "1.55rem",
        paddingBottom: "1.55rem",
      },
    },
    headCells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        paddingTop: "1.75rem",
        paddingBottom: "1.75rem",
        fontSize: "14px",
      },
      highlightOnHoverStyle: {
        color: "rgba(0,0,0,0.9)",
        backgroundColor: "rgba(0,0,0,0.1)",
        transitionDuration: "0.15s",
        transitionProperty: "background-color",
      },
    },
  };
  const columns: TableColumn<PlanListType>[] = [
    {
      name: <>No .</>,
      width: "60px",
      cell: (_, rowIndex: number) => <div>{rowIndex + 1}</div>,
    },
    {
      name: <>Plan Name</>,
      width: "200px",
      cell: (row) => <div>{row.planName}</div>,
    },
    {
      name: <>Plan</>,
      width: "500px",
      cell: (row) => (
        <div className="truncate" title={row.plan}>
          {row.plan}
        </div>
      ),
    },
    {
      name: <>Created At</>,
      width: "120px",
      cell: (row) => <div>{new Date(row.createdAt).toLocaleDateString()}</div>,
    },
    {
      name: <></>,
      cell: (row) => <button type="button">On Plan</button>,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      highlightOnHover
      customStyles={customStyle}
      fixedHeader
      progressPending={loading}
      persistTableHead={!loading}
      progressComponent={<Loading className="!h-auto my-20" />}
    />
  );
};

export default Table;

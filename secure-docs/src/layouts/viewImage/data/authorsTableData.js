export default function data() {

  return {
    columns: [
      { Header: "user", accessor: "user", width: "45%", align: "left" },
      { Header: "date", accessor: "date", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
  };
}

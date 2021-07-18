import "./App.css";
import { useMemo, useEffect, useState } from "react";
import Table from "./Table";

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://intense-tor-76305.herokuapp.com/merchants")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Customer Name",
        accessor: (values) => `${values.firstname} ${values.lastname}`,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Premium",
        accessor: (values) => (values.hasPremium ? "True" : "False"),
      },
      {
        Header: "Bid",
        accessor: (values) =>
          values.bids.length
            ? Math.max.apply(
                Math,
                values.bids.map((each) => each.amount)
              )
            : "",
      },
    ],
    []
  );

  const data = useMemo(() => customers, [customers]);

  return <Table columns={columns} data={data} />;
};

export default App;

import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { smapleDashboardData as sampleDashboardData } from "../../constants/sample";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 250,
  },
];

const ChatMangement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    
    const formatted = sampleDashboardData.users.map((item) => ({
      id: item._id,
      name: item.name,
      avatar: item.avatar,
    }));
    setRows(formatted);
  }, []);

  return (
    <AdminLayout>
      <Table heading="All Chat" columns={columns} rows={rows}  />
    </AdminLayout>
  );
};

export default ChatMangement;








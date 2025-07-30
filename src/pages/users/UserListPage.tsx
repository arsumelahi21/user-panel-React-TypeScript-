import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/entities/user/api";
import type { User } from "@/entities/user/types";
import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Input, Select, Space } from "antd";
import { StatusTag } from "@/shared/ui/StatusTag";
import { RoleDropdown } from "@/shared/ui/RoleDropdown";
import { UserFormModal } from "@/features/user-form/UserFormModal";
import { UserDeleteModal } from "@/features/user-delete/UserDeleteModal";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";


export const UsersPage = () => {
  const { data, refetch } = useQuery(GET_USERS);
  const [searchEmail, setSearchEmail] = useState("");
  const [filterRole, setFilterRole] = useState<string | undefined>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const users = data?.app_users ?? [];
  console.log("Apollo data:", users);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      { field: "name", headerName: "Name", sortable: true, flex: 1 },
      { field: "email", headerName: "Email", flex: 1, filter: false },
      {
        field: "role",
        headerName: "Role",
        width: 140,
        cellRenderer: (params: any) => (
          <RoleDropdown user={params.data} onChange={() => refetch()} />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
        cellRenderer: (params: any) =>
         <StatusTag status={String(params.value)} />
      },
      {
        field: "created_at", 
        headerName: "Date",
        width: 180,
        sortable: true,
        valueFormatter: ({ value }: any) => new Date(value).toLocaleString(),
        cellRenderer: ({ value }: any) => (
          <span>{new Date(value).toLocaleString()}</span>
        ),
      },
      {
  field: "actions",
  headerName: "Actions",
  width: 140,
  cellRenderer: (params: any) => (
    <Space>
      <Button
        shape="circle"
        size="small"
        icon={<EditOutlined />}
        onClick={() => {
          setSelectedUser(params.data); 
          setModalOpen(true);           
        }}
      />
      <Button
        shape="circle"
        size="small"
        danger
        icon={<DeleteOutlined />}
        onClick={() => {
          setSelectedUser(params.data);
          setDeleteOpen(true);
        }}
      />
    </Space>
  ),
}

    ],
    [refetch]
  );

  // Filtering
  const filteredRows = useMemo(() => {
    let rows = users;
    if (searchEmail)
      rows = rows.filter((u: { email: string; }) =>
        u.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
    if (filterRole)
      rows = rows.filter((u: { role: string; }) => u.role.toLowerCase() === filterRole.toLowerCase());
    return rows;
  }, [users, searchEmail, filterRole]);

 


  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 24px 0 rgba(0,0,0,0.08)",
        padding: 32,
        maxWidth: 1100,
        margin: "40px auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: 28, margin: 0 }}>User Management</h2>
          <div style={{ color: "#8a94a6", fontSize: 15, marginBottom: 8 }}>
            All users with roles and permissions
          </div>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          size="large"
          style={{ borderRadius: 8, fontWeight: 600, height: 44 }}
          onClick={() => { setSelectedUser(null); setModalOpen(true); }}
        >
          Add User
        </Button>
      </div>
      <Space style={{ margin: "20px 0 12px 0", flexWrap: "wrap" }}>
        <Input.Search
          placeholder="Filter by email"
          value={searchEmail}
          onChange={e => setSearchEmail(e.target.value)}
          allowClear
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by role"
          value={filterRole}
          onChange={setFilterRole}
          allowClear
          style={{ width: 160 }}
          options={[
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" },
            { label: "Moderator", value: "Moderator" }
          ]}
        />
      </Space>
      <div className="ag-theme-quartz" style={{ height: 500, width: "100%", borderRadius: 10 }}>
        <AgGridReact theme="legacy"
          rowData={filteredRows}
          columnDefs={columns as any}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
        />
      </div>
     
      <UserFormModal
      open={isModalOpen}
      user={selectedUser}
      onClose={() => setModalOpen(false)}
      refetch={refetch}
      />
      <UserDeleteModal
        open={isDeleteOpen}
        user={selectedUser}
        onClose={() => setDeleteOpen(false)}
        refetch={refetch}
    />
    </div>
  );
};



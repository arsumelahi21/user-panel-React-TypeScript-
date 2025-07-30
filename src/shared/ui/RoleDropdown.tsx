import { Select } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/entities/user/api";
import type { User } from "@/entities/user/types";
import { useState } from "react";

export const RoleDropdown = ({ user, onChange }: { user: User, onChange: () => void }) => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [loading, setLoading] = useState(false);

  const handleChange = async (role: string) => {
    setLoading(true);
    await updateUser({ variables: { id: user.id, input: { role } } });
    setLoading(false);
    onChange();
  };

  return (
    <Select
      value={user.role}
      loading={loading}
      onChange={handleChange}
      size="small"
      bordered={false}
      options={[
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
        { value: "moderator", label: "Moderator" },
      ]}
    />
  );
};

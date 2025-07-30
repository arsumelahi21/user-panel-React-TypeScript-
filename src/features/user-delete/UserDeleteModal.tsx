import React from "react";
import { Modal, Button, notification } from "antd";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "@/entities/user/api";
import type { User } from "@/entities/user/types";

type Props = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  refetch: () => void;
};

export const UserDeleteModal: React.FC<Props> = ({
  open,
  user,
  onClose,
  refetch,
}) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER);

  const handleDelete = async () => {
    if (!user) return;
    try {
      await deleteUser({ variables: { id: user.id } });
      notification.success({
                  message: "Success",
                  description: "User Delete Successfully"
                });
      onClose();
      refetch();
    } catch (err: any) {
      notification.error({
                  message: "Success",
                  description: err.message || "Unable to delete the user"
                });
    
    }
  };

  return (
    <Modal
      open={open}
      title="Delete User"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button key="delete" danger type="primary" onClick={handleDelete} loading={loading}>
          Delete
        </Button>,
      ]}
      maskClosable={!loading}
      confirmLoading={loading}
    >
      <p>
        Are you sure you want to delete <b>{user?.name}</b>?
      </p>
    </Modal>
  );
};

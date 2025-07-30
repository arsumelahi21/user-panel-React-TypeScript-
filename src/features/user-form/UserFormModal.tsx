import React, { useEffect } from "react";
import type { User } from "@/entities/user/types";
import { Modal, Form, Input, Select, Button, notification } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_USER, UPDATE_USER } from "@/entities/user/api";

type UserFormModalProps = {
  open: boolean;
  user: User | null;
  onClose: () => void;
  refetch: () => void;
};

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  user,
  onClose,
  refetch,
}) => {
  const [form] = Form.useForm();
  const [addUser, { loading: adding }] = useMutation(ADD_USER);
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(user || { status: "active", role: "admin" });
    }
  }, [open, user, form]);

  const handleFinish = async (values: any) => {
    try {
      if (user) {
        // EDIT MODE
        const result = await updateUser({
          variables: { id: user.id, ...values },
        });
        if (result?.errors) {
          notification.error({
            message: "Error",
            description: result.errors[0].message || "Unknown error occurred",
          });
          return;
        }
        notification.success({
          message: "Success",
          description: "User Updated Successfully",
        });
      } else {
        // ADD MODE
        const result = await addUser({ variables: values });
        if (result?.errors) {
          notification.error({
            message: "Error",
            description: result.errors[0].message || "Unknown error occurred",
          });
          return;
        }
        if (!result.data?.insert_app_users_one) {
          notification.error({
            message: "Error",
            description:
              "Could not add user. Please try again or check your input.",
          });
          return;
        }
        notification.success({
          message: "Success",
          description: "User Created Successfully",
        });
      }
      form.resetFields();
      onClose();
      refetch();
    } catch (err: any) {
      const errorMessage =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        "Could not save user. Please try again or check your input.";
      notification.error({
        message: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        onClose();
        form.resetFields();
      }}
      destroyOnHidden
      title={user ? "Edit User" : "Add User"}
      footer={null}
      maskClosable={!(adding || updating)}
      confirmLoading={adding || updating}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        onFinishFailed={(err) => {
          console.log("Validation failed:", err);
        }}
        layout="vertical"
        disabled={adding || updating}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input autoFocus />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Moderator", value: "moderator" },
            ]}
          />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Active", value: "active" },
              { label: "Banned", value: "banned" },
              { label: "Pending", value: "pending" },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={adding || updating}
            style={{ minWidth: 90 }}
          >
            {user ? "Update" : "Add"}
          </Button>
          <Button
            onClick={() => {
              onClose();
              form.resetFields();
            }}
            style={{ marginLeft: 8 }}
            disabled={adding || updating}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

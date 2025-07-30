import { Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const ActionCell = ({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) => (
  <Space>
    <Button icon={<EditOutlined />} size="small" onClick={onEdit} />
    <Button icon={<DeleteOutlined />} size="small" danger onClick={onDelete} />
  </Space>
);

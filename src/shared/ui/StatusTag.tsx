import { Tag } from "antd";
const statusMap = { active: "success", banned: "error", pending: "warning" } as const;

export const StatusTag = ({ status }: { status: string }) => {
  const key = status.toLowerCase() as keyof typeof statusMap;
  const tagStatus = statusMap[key] as "success" | "error" | "warning" | undefined;
  return (
    <Tag color={tagStatus || "default"}>
      {status.toUpperCase()}
    </Tag>
  );
};
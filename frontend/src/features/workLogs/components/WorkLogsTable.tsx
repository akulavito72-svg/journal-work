import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { WorkLog } from "../types";

type WorkLogsTableProps = {
  items: WorkLog[];
  loading: boolean;
  onEdit: (item: WorkLog) => void;
  onDelete: (id: number) => void;
};

export function WorkLogsTable({ items, loading, onEdit, onDelete }: WorkLogsTableProps) {
  const columns: ColumnsType<WorkLog> = [
    {
      title: "Дата",
      dataIndex: "workDate",
      key: "workDate",
      width: 130,
      render: (value: string) => dayjs(value).format("DD.MM.YYYY")
    },
    {
      title: "Вид работ",
      dataIndex: ["workType", "name"],
      key: "workType",
      width: 190,
      render: (_value, record) => (
        <Tag color={record.workType.isActive ? "blue" : "default"}>{record.workType.name}</Tag>
      )
    },
    {
      title: "Исполнитель",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 180
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Часы",
      dataIndex: "hoursSpent",
      key: "hoursSpent",
      width: 100,
      align: "right",
      render: (value: number | string) => Number(value).toFixed(2)
    },
    {
      title: "Действия",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => onEdit(record)}>
            Изменить
          </Button>
          <Popconfirm
            title="Удалить запись?"
            okText="Удалить"
            cancelText="Отмена"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger size="small">
              Удалить
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={items}
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      scroll={{ x: 980 }}
    />
  );
}

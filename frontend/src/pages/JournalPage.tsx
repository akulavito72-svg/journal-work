import { Button, Layout, Typography } from "antd";
import { useMemo, useState } from "react";
import { JournalFilters } from "../features/workLogs/components/JournalFilters";
import { WorkLogFormModal } from "../features/workLogs/components/WorkLogFormModal";
import { WorkLogsTable } from "../features/workLogs/components/WorkLogsTable";
import { useWorkLogs } from "../features/workLogs/hooks/useWorkLogs";
import { WorkLog, WorkLogFilters, WorkLogFormValues } from "../features/workLogs/types";

const { Content } = Layout;

export function JournalPage() {
  const [filters, setFilters] = useState<WorkLogFilters>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkLog | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const stableFilters = useMemo(() => filters, [filters]);
  const { items, loading, createItem, updateItem, deleteItem } = useWorkLogs(stableFilters);

  const handleCreate = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: WorkLog) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (values: WorkLogFormValues) => {
    setSubmitting(true);

    try {
      if (editingItem) {
        await updateItem(editingItem.id, values);
      } else {
        await createItem(values);
      }

      handleCancel();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout className="app-shell">
      <Content className="page">
        <div className="page-header">
          <div>
            <Typography.Title level={2} className="page-title">
              Журнал работ
            </Typography.Title>
            <Typography.Text type="secondary">
              Учет выполненных работ по датам, исполнителям и видам работ
            </Typography.Text>
          </div>
          <Button type="primary" onClick={handleCreate}>
            Добавить запись
          </Button>
        </div>

        <div className="toolbar">
          <JournalFilters filters={filters} onChange={setFilters} />
        </div>

        <WorkLogsTable
          items={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteItem}
        />

        <WorkLogFormModal
          open={modalOpen}
          initialValue={editingItem}
          submitting={submitting}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Content>
    </Layout>
  );
}

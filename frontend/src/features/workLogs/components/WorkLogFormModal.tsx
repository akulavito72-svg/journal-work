import { Form, DatePicker, Input, InputNumber, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getWorkTypes } from "../../workTypes/api";
import { WorkType } from "../../workTypes/types";
import { WorkLog, WorkLogFormValues } from "../types";

type FormState = {
  workDate: dayjs.Dayjs;
  workTypeId: number;
  employeeName: string;
  description: string;
  hoursSpent: number;
};

type WorkLogFormModalProps = {
  open: boolean;
  initialValue: WorkLog | null;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (values: WorkLogFormValues) => Promise<void>;
};

export function WorkLogFormModal({
  open,
  initialValue,
  submitting,
  onCancel,
  onSubmit
}: WorkLogFormModalProps) {
  const [form] = Form.useForm<FormState>();
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [workTypesLoading, setWorkTypesLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setWorkTypesLoading(true);
    getWorkTypes(true)
      .then(setWorkTypes)
      .finally(() => setWorkTypesLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
      return;
    }

    if (initialValue) {
      form.setFieldsValue({
        workDate: dayjs(initialValue.workDate),
        workTypeId: initialValue.workType.id,
        employeeName: initialValue.employeeName,
        description: initialValue.description,
        hoursSpent: Number(initialValue.hoursSpent)
      });
      return;
    }

    form.setFieldsValue({
      workDate: dayjs(),
      hoursSpent: 8
    });
  }, [form, initialValue, open]);

  const handleOk = async () => {
    const values = await form.validateFields();

    await onSubmit({
      workDate: values.workDate.format("YYYY-MM-DD"),
      workTypeId: values.workTypeId,
      employeeName: values.employeeName.trim(),
      description: values.description.trim(),
      hoursSpent: values.hoursSpent
    });
  };

  return (
    <Modal
      title={initialValue ? "Редактирование записи" : "Добавление записи"}
      open={open}
      okText={initialValue ? "Сохранить" : "Добавить"}
      cancelText="Отмена"
      confirmLoading={submitting}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark="optional">
        <Form.Item
          name="workDate"
          label="Дата работ"
          rules={[{ required: true, message: "Выберите дату" }]}
        >
          <DatePicker className="full-width" format="DD.MM.YYYY" />
        </Form.Item>

        <Form.Item
          name="workTypeId"
          label="Вид работ"
          rules={[{ required: true, message: "Выберите вид работ" }]}
        >
          <Select
            loading={workTypesLoading}
            placeholder="Выберите вид работ"
            options={workTypes.map((item) => ({
              value: item.id,
              label: item.name
            }))}
          />
        </Form.Item>

        <Form.Item
          name="employeeName"
          label="Исполнитель"
          rules={[
            { required: true, message: "Укажите исполнителя" },
            { min: 2, message: "Минимум 2 символа" }
          ]}
        >
          <Input placeholder="Иванов Иван" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Описание"
          rules={[
            { required: true, message: "Введите описание" },
            { min: 3, message: "Минимум 3 символа" }
          ]}
        >
          <Input.TextArea rows={4} placeholder="Описание выполненных работ" />
        </Form.Item>

        <Form.Item
          name="hoursSpent"
          label="Затрачено часов"
          rules={[{ required: true, message: "Укажите количество часов" }]}
        >
          <InputNumber className="full-width" min={0.25} max={24} step={0.25} precision={2} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

import { Button, DatePicker, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { WorkLogFilters } from "../types";

type JournalFiltersProps = {
  filters: WorkLogFilters;
  onChange: (filters: WorkLogFilters) => void;
};

export function JournalFilters({ filters, onChange }: JournalFiltersProps) {
  const selectedDate = filters.date ? dayjs(filters.date) : null;

  const handleDateChange = (value: Dayjs | null) => {
    onChange({
      ...filters,
      date: value ? value.format("YYYY-MM-DD") : undefined
    });
  };

  const handleReset = () => {
    onChange({});
  };

  return (
    <Space className="journal-filters" wrap>
      <DatePicker
        allowClear
        format="DD.MM.YYYY"
        placeholder="Дата работ"
        value={selectedDate}
        onChange={handleDateChange}
      />
      <Button onClick={handleReset}>Сбросить</Button>
    </Space>
  );
}

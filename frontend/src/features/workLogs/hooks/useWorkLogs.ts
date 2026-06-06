import { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import { AxiosError } from "axios";
import { ApiError } from "../../../shared/api/types";
import {
  createWorkLog,
  deleteWorkLog,
  getWorkLogs,
  updateWorkLog
} from "../api";
import { WorkLog, WorkLogFilters, WorkLogFormValues } from "../types";

export function useWorkLogs(filters: WorkLogFilters) {
  const [items, setItems] = useState<WorkLog[]>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWorkLogs(filters);
      setItems(data);
    } catch (error) {
      message.error(getErrorMessage(error, "Не удалось загрузить журнал работ"));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const createItem = async (payload: WorkLogFormValues) => {
    try {
      await createWorkLog(payload);
      message.success("Запись добавлена");
      await loadItems();
    } catch (error) {
      message.error(getErrorMessage(error, "Не удалось добавить запись"));
      throw error;
    }
  };

  const updateItem = async (id: number, payload: WorkLogFormValues) => {
    try {
      await updateWorkLog(id, payload);
      message.success("Запись обновлена");
      await loadItems();
    } catch (error) {
      message.error(getErrorMessage(error, "Не удалось обновить запись"));
      throw error;
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await deleteWorkLog(id);
      message.success("Запись удалена");
      await loadItems();
    } catch (error) {
      message.error(getErrorMessage(error, "Не удалось удалить запись"));
    }
  };

  return {
    items,
    loading,
    reload: loadItems,
    createItem,
    updateItem,
    deleteItem
  };
}

function getErrorMessage(error: unknown, fallback: string): string {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError.response?.data?.message ?? fallback;
}

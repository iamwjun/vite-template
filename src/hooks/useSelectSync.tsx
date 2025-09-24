import { useEffect, useMemo } from "react";
import { Form, type FormInstance } from "antd";

interface useSelectSyncProps {
  form: FormInstance;
  source: string;
  target: string;
}

export function useSelectSync({
  form,
  source,
  target,
}: useSelectSyncProps) {
  const watched = Form.useWatch(source, form);
  const selected = useMemo(() => watched || [], [watched]);

  useEffect(() => {
    if (!Array.isArray(selected)) return;

    const oldList = form.getFieldValue(target) || [];

    const newList = selected.map((item) => {
      const exist = oldList.find((x: { id: number }) => x.id === item.value);
      return {
        id: item.value,
        name: item.label,
        title: exist?.title || "",
      };
    });

    form.setFieldsValue({
      [target]: newList,
    });
  }, [form, selected, target]);
}

import type { DefaultOptionType } from "antd/es/select";

import { useEffect, useMemo } from "react";
import { Form, type FormInstance } from "antd";

interface UseSelectSyncProps<R, T extends DefaultOptionType> {
  form: FormInstance;
  source: string;
  target: string;
  format?: (item: T) => R;
}

export function useSelectSync<R, T extends DefaultOptionType>({
  form,
  source,
  target,
  format = (opt: DefaultOptionType) =>
    ({
      id: opt.value,
      name: opt.label,
      title: "",
    } as R),
}: UseSelectSyncProps<R, T>) {
  const watched = Form.useWatch(source, form);
  const selected = useMemo(() => watched || [], [watched]);

  useEffect(() => {
    if (!Array.isArray(selected)) return;

    const oldList = form.getFieldValue(target) || [];

    const newList = selected.map((item) => {
      const exist = oldList.find((x: { id: number }) => x.id === item.value);
      return {
        ...format(item),
        ...exist,
      };
    });

    form.setFieldsValue({
      [target]: newList,
    });
  }, [form, format, selected, target]);
}

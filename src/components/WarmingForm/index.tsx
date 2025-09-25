import type { DefaultOptionType } from "antd/es/select";

import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  DrawerForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useSelectSync } from "../../hooks";

export const WarmingForm: React.FC = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  useSelectSync({
    form,
    source: "options",
    target: "items",
    format: (opt: DefaultOptionType) => ({
      id: opt.value,
      name: opt.label,
      title: "",
    }),
  });

  return (
    <DrawerForm<{
      options?: DefaultOptionType[];
      items?: [];
    }>
      title="新建表单"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建表单
        </Button>
      }
      autoFocusFirstInput
      drawerProps={{
        destroyOnClose: true,
        width: 560,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        console.log(values);
        return false;
      }}
    >
      <ProFormSelect
        name="options"
        label="选择项"
        mode="multiple"
        fieldProps={{
          labelInValue: true,
        }}
        options={[
          { label: "苹果", value: 1 },
          { label: "香蕉", value: 2 },
          { label: "橙子", value: 3 },
        ]}
        placeholder="请选择"
      />
      <ProFormDependency name={["options"]}>
        {({ options }) => {
          if (!options || options.length === 0) {
            return null;
          }

          return (
            <ProFormList
              name="items"
              creatorButtonProps={false}
              actionRender={() => []}
              itemRender={(dom, row) => (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div style={{ fontWeight: 500, color: "#333" }}>
                    {row?.record?.name}
                  </div>
                  {dom.listDom}
                </div>
              )}
            >
              <ProFormText name="id" label="ID" hidden readonly />
              <ProFormText name="name" label="名称" hidden readonly />
              <ProFormText
                name="title"
                placeholder="请输入标题"
                rules={[{ required: true, message: "请输入" }]}
              />
            </ProFormList>
          );
        }}
      </ProFormDependency>
      <Form.List
        name="users"
        initialValue={[
          { name: "Tom", age: 20 },
          { name: "Jerry", age: 22 },
        ]}
      >
        {(fields) => (
          <>
            {(fields || []).map((field, index) => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <ProFormText
                  name={[index, "name"]}
                  label="姓名"
                  fieldProps={{ placeholder: "请输入姓名" }}
                />
                <ProFormText
                  name={[index, "age"]}
                  label="年龄"
                  fieldProps={{ type: "number" }}
                />

                <ProFormDependency name={["users", index, "age"]}>
                  {({ users }) => {
                    const age = users?.[index]?.age;
                    return <div>同一行年龄 + 10 = {age ? age + 10 : "-"}</div>;
                  }}
                </ProFormDependency>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </DrawerForm>
  );
};

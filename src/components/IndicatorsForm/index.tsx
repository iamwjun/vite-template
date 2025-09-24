import { PlusOutlined } from "@ant-design/icons";
import {
  DrawerForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Card, Form } from "antd";

const indicatorOptions = [
  { id: 1, name: "指标001", methods: ["less", "scss"] },
  { id: 2, name: "指标002", methods: ["rust"] },
  { id: 3, name: "指标003", methods: ["python"] },
];

const initialValues = {
  // ids 开启 labelInValue，初始值用 { id, name }
  ids: [{ id: 1, name: "指标001" }],
  indicators: [
    {
      id: 1,
      name: "指标001",
      methods: ["less"],
      params: { lessParams: "默认" },
    },
  ],
};

export type Indicator = {
  id: number;
  name: string;
  methods: string[];
  params?: {
    lessParams?: string;
    scssParams?: string;
    rustParams?: string;
    pythonParams?: string;
  };
};

interface IndicatorsFormProps {
  initialValues?: {
    indicators: Indicator[];
  };
}

const data = [
  {
    name: "指标001",
    id: 1,
    methods: ["less", "scss"],
    params: {
      lessParams: "less",
      scssParams: "scss",
    },
  },
  {
    name: "指标002",
    id: 2,
    methods: ["rust"],
    params: {
      rustParams: "rust",
    },
  },
  {
    name: "指标003",
    id: 3,
    methods: ["python"],
    params: {
      pythonParams: "python",
    },
  },
];

export const IndicatorsForm: React.FC<IndicatorsFormProps> = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();

  return (
    <DrawerForm<{
      name: string;
      company: string;
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
        name="ids"
        label="选择指标"
        mode="multiple"
        fieldProps={{
          labelInValue: true,
          fieldNames: { label: "name", value: "id" },
        }}
        options={data.map((item) => ({
          ...item,
          label: item.name,
          value: item.id,
        }))}
      />
      <ProFormDependency name={["ids"]}>
        {({ ids = [] }) => {
          if (!ids || ids.length === 0)  return null;
          return ids.map((item, index) => (
            <Card key={item.id} title={item.name} style={{ marginBottom: 16 }}>
              {/* methods checkbox */}
              <ProFormCheckbox.Group
                name={["cards", index, "methods"]}
                label="Methods"
                options={item.methods.map((m) => ({
                  label: m,
                  value: m,
                }))}
                initialValue={item.methods}
              />

              {/* 根据 methods 选中动态渲染文件输入框 */}
              {item.methods.map((method) => {
                return (
                  <ProFormText
                    key={method}
                    name={["cards", index, "params", `${method}Params`]}
                    label={`${method} 参数`}
                    initialValue={item.params[`${method}Params`]}
                  />
                );
              })}
            </Card>
          ));
        }}
      </ProFormDependency>
    </DrawerForm>
  );
};

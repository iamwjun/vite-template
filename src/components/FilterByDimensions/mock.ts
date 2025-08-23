import { v4 as uuidv4 } from "uuid";

function generateSubSubSubjects(count: number, title: string) {
  return Array.from({ length: count }, (_, i) => ({
    title: `子子${title}${i + 1}`,
    key: uuidv4(),
  }));
}

function generateSubSubjects(count: number, title: string) {
  return Array.from({ length: count }, (_, i) => {
    const subSubCount = Math.floor(Math.random() * 6) + 5;
    return {
      title: `子${title}${i + 1}`,
      key: uuidv4(),
      children: generateSubSubSubjects(subSubCount, title),
    };
  });
}

function generateSubjects(subjectCount: number, title: string) {
  return Array.from({ length: subjectCount }, (_, i) => {
    const subCount = Math.floor(Math.random() * 6) + 5;
    return {
      title: `${title}${i + 1}`,
      key: uuidv4(),
      children: generateSubSubjects(subCount, title),
    };
  });
}

const shortCitys = {
  title: "城市",
  key: uuidv4(),
  children: [
    {
      title: "中国",
      key: uuidv4(),
      children: [
        { title: "北京市", key: uuidv4() },
        {
          title: "四川省",
          key: uuidv4(),
          children: [
            { title: "成都市", key: uuidv4() },
            { title: "南充市", key: uuidv4() },
            { title: "内江市", key: uuidv4() },
          ],
        },
        {
          title: "浙江省",
          key: uuidv4(),
          children: [
            { title: "杭州市", key: uuidv4() },
            { title: "萧山市", key: uuidv4() },
            { title: "温州市", key: uuidv4() },
          ],
        },
      ],
    },
    {
      title: "日本",
      key: uuidv4(),
      children: [
        {
          title: "北海道",
          key: uuidv4(),
          children: [
            { title: "札幌市", key: uuidv4() },
            { title: "函馆市", key: uuidv4() },
            { title: "小樽市", key: uuidv4() },
          ],
        },
        {
          title: "富山县",
          key: uuidv4(),
          children: [
            { title: "富山市", key: uuidv4() },
            { title: "高冈市", key: uuidv4() },
            { title: "鱼津市", key: uuidv4() },
          ],
        },
      ],
    },
    {
      title: "韩国",
      key: uuidv4(),
    },
  ],
};

export const treeData = [
  {
    ...shortCitys
  },
  {
    title: "城市",
    key: uuidv4(),
    children: generateSubjects(20, "城市"),
  },
  {
    title: "公司",
    key: uuidv4(),
    children: generateSubjects(20, "公司"),
  },
  {
    title: "学科",
    key: uuidv4(),
    children: generateSubjects(20, "学科"),
  },
  {
    title: "动物",
    key: uuidv4(),
    children: generateSubjects(20, "动物"),
  },
  {
    title: "水果",
    key: uuidv4(),
    children: generateSubjects(20, "水果"),
  },
];

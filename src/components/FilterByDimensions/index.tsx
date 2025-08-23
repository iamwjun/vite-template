import React, { useEffect, useRef, useState } from "react";
import {
  Filter,
  FilterCollapse,
  FilterSingle,
  FilterDimension,
  FilterItem,
  FilterLabel,
  FilterList,
  PopupTree,
  FilterItemCollapse,
} from "./style";
import { treeData } from "./mock";
import { Dropdown, Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mapToArray(data: Map<string, Map<string, React.Key[]>>): string[][] {
  const result: string[][] = [];

  data.forEach((subMap, group) => {
    const temp: string[] = [group];
    subMap.forEach((keys, subGroup) => {
      temp.push(subGroup, ...(keys as string[]));
      result.push(temp);
    });
  });

  return result;
}

interface FilterByDimensionsProps {
  onChange?: (arg: unknown) => void;
}

type CheckedKeysMap = Map<string, Map<string, React.Key[]>>;

type HeighObject = { curr: number, reality: number };

type HeightMap = Map<string, HeighObject>;

const defaultHeight = 24;
const defaultHeightMap: HeightMap = new Map([
  ["total", { curr: defaultHeight, reality: defaultHeight }],
]);

export const FilterByDimensions: React.FC<FilterByDimensionsProps> = (
  props
) => {
  const [checkedKeys, setCheckedKeys] = useState<CheckedKeysMap>(new Map());
  const [heightMap, setHeightMap] = useState<HeightMap>(defaultHeightMap);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const nextHeightMap = new Map(heightMap);
      const children = Array.from(contentRef.current.children) as HTMLElement[];

      let heightSum = children.length * 8;

      children.forEach((el, index) => {
        nextHeightMap.set(treeData[index].key, {
          curr: defaultHeight,
          reality: el.scrollHeight,
        });
        heightSum += defaultHeight;
      });

      const currTotalHeight = nextHeightMap.get("total");
      const nextTotalHeight: HeighObject = {
        curr: currTotalHeight?.curr || defaultHeight,
        reality: heightSum,
      };
      nextHeightMap.set("total", nextTotalHeight);

      setHeightMap(nextHeightMap);
    }
  }, []);

  const handleCheck = (
    level1Key: string,
    level2Key: string,
    selectedKeys?: React.Key[]
  ) => {
    const nextCheckedKeys = new Map(checkedKeys);
    const nextLevel2Map = new Map(nextCheckedKeys.get(level1Key));

    if (nextLevel2Map.has(level2Key)) {
      nextLevel2Map?.delete(level2Key);
    } else {
      nextLevel2Map?.set(level2Key, []);
    }

    if (selectedKeys && selectedKeys.length > 0) {
      nextLevel2Map?.set(level2Key, selectedKeys);
    }

    nextCheckedKeys.set(level1Key, nextLevel2Map);

    // const result = mapToArray(nextCheckedKeys);
    props.onChange?.(Array.from(nextCheckedKeys));

    setCheckedKeys(nextCheckedKeys);
  };

  const handleCollapsed = (key: string) => {
    const nextHeightMap = new Map(heightMap);
    const { curr = defaultHeight, reality = defaultHeight } = nextHeightMap.get(key) || {};
    const isCollapsed = !!(curr === defaultHeight);

    const nextHeight: HeighObject = {
      curr: isCollapsed ? reality : defaultHeight,
      reality,
    };

    if (key !== "total") {
      const diffHeigth = isCollapsed ? (reality - defaultHeight) : (defaultHeight - reality);

      const {
        curr: totalCurr = defaultHeight,
        reality: totalReality = defaultHeight,
      } = nextHeightMap.get("total") || {};

      const nextTotalHeigth: HeighObject = {
        curr: totalCurr + diffHeigth,
        reality: totalReality + diffHeigth,
      };

      nextHeightMap.set("total", nextTotalHeigth);
    }

    nextHeightMap.set(key, nextHeight);

    setHeightMap(nextHeightMap);
  } 

  return (
    <>
    <Filter>
      <FilterList $height={heightMap.get("total")?.curr || 24} ref={contentRef}>
        {treeData.map(({ title, key: level1Key, children }) => (
          <FilterItem key={level1Key}>
            <FilterLabel>{title}</FilterLabel>
            <FilterSingle
              style={{ height: heightMap.get(level1Key)?.curr || "auto" }}
            >
              {children.map(({ key: level2Key, title, children = [] }) =>
                children?.length > 0 ? (
                  <Dropdown
                    key={level2Key}
                    popupRender={() => (
                      <PopupTree>
                        <Tree
                          checkable
                          treeData={children}
                          checkedKeys={checkedKeys
                            .get(level1Key)
                            ?.get(level2Key)}
                          onCheck={(keys) =>
                            handleCheck(
                              level1Key,
                              level2Key,
                              keys as React.Key[]
                            )
                          }
                        />
                      </PopupTree>
                    )}
                    trigger={["click", "hover"]}
                  >
                    <FilterDimension
                      $active={!!checkedKeys.get(level1Key)?.has(level2Key)}
                      onClick={(e) => e.preventDefault()}
                    >
                      {title}
                      <DownOutlined />
                    </FilterDimension>
                  </Dropdown>
                ) : (
                  <FilterDimension
                    key={level2Key}
                    $active={!!checkedKeys.get(level1Key)?.has(level2Key)}
                    onClick={() => handleCheck(level1Key, level2Key)}
                  >
                    {title}
                  </FilterDimension>
                )
              )}
            </FilterSingle>
            {heightMap.get("total")?.curr !== defaultHeight &&
              (heightMap.get(level1Key)?.reality || 0) > 24 && (
                <FilterItemCollapse onClick={() => handleCollapsed(level1Key)}>
                  {(heightMap.get(level1Key)?.curr || 0) > 24 ? '收起' : '展开'}
                </FilterItemCollapse>
              )}
          </FilterItem>
        ))}
      </FilterList>
      {treeData.length > 0 && (
        <FilterCollapse onClick={() => handleCollapsed("total")}>
          展开筛选
        </FilterCollapse>
      )}
    </Filter>
    {/* {treeData.length > 0 && (
        <FilterCollapse onClick={() => handleCollapsed("total")}>
          展开筛选
        </FilterCollapse>
      )} */}
    </>
  );
};

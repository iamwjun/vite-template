import { styled } from "styled-components";

export const Filter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FilterList = styled.div<{ $height: number; }>`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: flex-start;
  font-size: 14px;
  color: #666;
  row-gap: 8px;
  transition: height 0.35s cubic-bezier(0.4,0,0.2,1);
  overflow: hidden;
  height: ${({ $height }) => $height}px;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  color: #666;
`;

export const FilterLabel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 24px;
  flex: 0 0 80px;
  color: #000000;
`;

export const FilterSingle = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px 16px;
  transition: height 0.35s cubic-bezier(0.4,0,0.2,1) 0.05s;
  overflow: hidden;
`;

export const FilterDimension = styled.span<{ $active: boolean; }>`
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 24px;
  /* border: 1px solid #999;
    border-radius: 3px; */
  color: ${({ $active }) => $active ? 'red' : '#000'};
  column-gap: 3px;
  cursor: pointer;

  .anticon-down {
    transition: transform 0.35s ease-in-out;
  }

  &:hover {
    color: orange;

    .anticon-down {
      transform: rotate(180deg);
    }
  }
`;

export const PopupTree = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

export const FilterItemCollapse = styled.div`
  flex: 0 0 30px;
  font-size: 14px;
  color: #000;
  height: 24px;
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FilterCollapse = styled.div`
  flex: 0 0 80px;
  font-size: 14px;
  color: #000;
  height: 24px;
  display: inline-flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

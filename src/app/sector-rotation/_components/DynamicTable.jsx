import { Table } from "antd";
import { useState } from "react";

const DynamicTable = ({ initialColumns, data }) => {
    const [sortedInfo, setSortedInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleTableChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columnsWithSorting = initialColumns.map(column => ({
        ...column,
        sorter: (a, b) => {
            if (typeof a[column.dataIndex] === 'string') {
                return a[column.dataIndex].localeCompare(b[column.dataIndex]);
            } else {
                return a[column.dataIndex] - b[column.dataIndex];
            }
        },
        sortOrder: sortedInfo.columnKey === column.dataIndex && sortedInfo.order
    }));

    return (
        <Table
            columns={columnsWithSorting}
            dataSource={data}
            onChange={handleTableChange}
            pagination={{
                current: currentPage,
                pageSize: pageSize
            }}
            style={{ width: "100%" }}
        />
    );
};

export default DynamicTable;

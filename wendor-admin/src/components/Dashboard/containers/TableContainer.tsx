import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    Pagination,
} from "@nextui-org/react";
import React from "react";
import { TableColums } from "../../../types/Table";

// Make the TableContainerProps interface generic
interface TableContainerProps<T> {
    data: T[];
    page?: number;
    setPage: (page: number) => void;
    isLoading?: boolean;
    columns: TableColums[];
    id: string;
    renderCell: (item: T, columnKey: keyof T | string) => JSX.Element;
    totalCount?: number;
}

export default function TableContainer<T>({ data, page = 1, setPage, isLoading = false, columns, id, renderCell, totalCount = 0 }: TableContainerProps<T>) {
    const rowsPerPage = 14;

    const pages = React.useMemo(() => {
        return totalCount > rowsPerPage ? Math.ceil(totalCount / rowsPerPage) : 0;
    }, [totalCount, rowsPerPage]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [page, data]);

    const loadingState = isLoading ? "loading" : "idle";
    return (
        <Table aria-label="Table component" style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="warning"
                            page={page}
                            total={pages}
                            onChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader columns={columns} style={{ backgroundColor: "#F4F4F5" }}>
                {(column) => (
                    <TableColumn
                        style={{ backgroundColor: "#F4F4F5" }}
                        key={column.uid}
                        align={column.uid === "details" ? "center" : "start"}
                    >
                        <span className="uppercase">
                            {column.name}
                        </span>
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={items ?? []}
                loadingContent={<Spinner color='warning' />}
                loadingState={loadingState}
                emptyContent={"No data to display."}
            >
                {(item: T) => (
                    <TableRow key={item[id] as unknown as string}>
                        {(columnKey: string) => (
                            <TableCell className="dm_sans">
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

import React, { useEffect, useState } from "react";
import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    Pagination,
} from "@carbon/react";
import assetsService from "../services/assets";
import Page from "../components/Page";

// Carbon Data Table headers
const headers = [
    { key: "name", header: "Name" },
    { key: "type", header: "Type" },
    { key: "totalCost", header: "Total Cost" },
];

const Assets = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    useEffect(() => {
        fetchData();
    }, [firstRowIndex, currentPageSize]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // It will be fetching the mock data as it is uncommented call in assets service at that moment
            const data = await assetsService.fetchAssets({
                window: "1d",
            });

            // Formating result for the table format 
            const formattedRows = Object.entries(data || {}).map(([key, value]) => ({
                id: key,
                name: key,
                type: value.type || 'Unknown',
                totalCost: value.totalCost || 0,
                ...value
            }));

            setRows(formattedRows);
            setTotalItems(formattedRows.length);
        } catch (error) {
            console.error("Error loading assets:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page>
            <div className="bx--grid assets-page">
                <div className="bx--row">
                    <div className="bx--col-lg-16">
                        <h1 style={{ marginBottom: '1rem', marginTop: '1rem' }}>Assets</h1>
                        <DataTable rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)} headers={headers}>
                            {({
                                rows,
                                headers,
                                getHeaderProps,
                                getRowProps,
                                getTableProps,
                                onInputChange,
                            }) => (
                                <TableContainer title="Assets Overview">
                                    <TableToolbar>
                                        <TableToolbarContent>
                                            <TableToolbarSearch onChange={onInputChange} />
                                        </TableToolbarContent>
                                    </TableToolbar>
                                    <Table {...getTableProps()}>
                                        <TableHead>
                                            <TableRow>
                                                {headers.map((header) => (
                                                    <TableHeader {...getHeaderProps({ header })}>
                                                        {header.header}
                                                    </TableHeader>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow {...getRowProps({ row })}>
                                                    {row.cells.map((cell) => (
                                                        <TableCell key={cell.id}>{cell.value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </DataTable>

                        <Pagination
                            totalItems={totalItems}
                            backwardText="Previous page"
                            forwardText="Next page"
                            pageSize={currentPageSize}
                            pageSizes={[10, 20, 30, 40, 50]}
                            itemsPerPageText="Items per page"
                            onChange={({ page, pageSize }) => {
                                setCurrentPageSize(pageSize);
                                setFirstRowIndex((page - 1) * pageSize);
                            }}
                        />
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Assets;


import React, { createContext, useState } from 'react';

export const DataTableContext2 = createContext();

const DataTableProvider2 = ({ children }) => {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [tableSelectedRows, setTableSelectedRows] = useState([]);

    return (
        <DataTableContext2.Provider value={{
            rowSelectionModel, setRowSelectionModel,
            tableSelectedRows, setTableSelectedRows
        }}>
            {children}
        </DataTableContext2.Provider>
    );
};

export default DataTableProvider2;

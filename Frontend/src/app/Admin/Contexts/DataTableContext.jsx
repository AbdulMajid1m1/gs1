import React, { createContext, useState } from 'react';

export const DataTableContext = createContext();

const DataTableProvider = ({ children }) => {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [tableSelectedRows, setTableSelectedRows] = useState([]);

    return (
        <DataTableContext.Provider value={{
            rowSelectionModel, setRowSelectionModel,
            tableSelectedRows, setTableSelectedRows
        }}>
            {children}
        </DataTableContext.Provider>
    );
};

export default DataTableProvider;

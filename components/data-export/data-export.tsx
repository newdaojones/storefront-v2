"use client"

import { saveAs } from "file-saver";

type DataItem = {
    property1: string;
    property2: number;
    property3: boolean;
};

type DataExportProps = {
    data: DataItem[];
};


export default function DataExport({ data }: DataExportProps) {
    const handleExportCSV = () => {
        const csv = convertDataToCSV(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'data.csv');
    };

    const handleExportJSON = () => {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
        saveAs(blob, 'data.json');
    };

    return (
        <div>
            <button onClick={handleExportCSV}>Export CSV</button>
            <button onClick={handleExportJSON}>Export JSON</button>
        </div>
    );
}

function convertDataToCSV(data: DataItem[]) {
    // Convert data to CSV format. You might need to adjust this function
    // depending on the structure of your data.
    if (!data[0]) {
        // If data[0] is undefined or null, return an empty string.
        return '';
    }
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return headers + '\n' + rows;
}

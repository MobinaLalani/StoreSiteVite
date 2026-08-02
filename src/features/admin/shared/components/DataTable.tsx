"use client";

import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  title: string;
  width?: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "اطلاعاتی وجود ندارد.",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow sm:p-10">
        در حال بارگذاری...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow sm:p-10">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <table className="min-w-[760px] lg:min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.title}
                  style={{
                    width: column.width,
                  }}
                  className="whitespace-nowrap px-4 py-4 text-right text-sm font-semibold text-gray-700 sm:px-5"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.title}
                    className="whitespace-nowrap px-4 py-4 text-sm text-gray-700 sm:px-5"
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

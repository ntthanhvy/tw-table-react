import React from "react";

export interface IColumn<T = any> {
	dataField: keyof T;
	name: string;
	index?: number;
	isGroup?: boolean;
	isSortable?: boolean;
	className?: string;
	formatter?: (
		cellValue: T[keyof T],
		row: T,
		rowIdx: number,
		formatterExtraOptions: Record<string, any>
	) => React.ReactNode;
	formatterExtraOptions?: Record<string, any>;
	footer?: (
		colData: T[keyof T][],
		footerExtraOptions: Record<string, any>
	) => React.ReactNode;
	footerExtraOptions?: Record<string, any>;
	parentKey?: keyof T;
	children?: IColumn<T[keyof T]>[];
}

export interface ITable<T> {
	data: T[] | Record<string, T[]>;
	columns: IColumn<T>[];
	keyField?: keyof T;
	className?: string;
	style?: React.CSSProperties;
	noDataText?: string;
	isLoading?: boolean;
	noDataRow?: () => React.ReactNode;
	expandable?: boolean;
	expandRow?: (row: T, rowIdx: number) => React.ReactNode;
	expandHeader?: (column: IColumn<T>) => React.ReactNode;
	selectable?: boolean;
	onSelectRow?: (row: T) => void;
	selectedRows?: T[];
}

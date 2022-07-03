import React, { ReactNode } from "react";

// data type with json format
type TColumn =
	| string
	| number
	| boolean
	| null
	| { [key: string]: TColumn }
	| TColumn[];

interface IBaseColumn<T extends { [K in keyof T]: T[K] }> {
	dataField: keyof T;
	name: string;
	isSortable?: boolean;
	align?: "left" | "center" | "right";
	className?: string;
}

type extraOptions = {
	[key: string]: string | number | boolean | null | Function;
};

type FooterProps<TData = TColumn> = {
	colData: TData[];
	extraOptions?: extraOptions;
};

export interface IColumn<T> extends IBaseColumn<T> {
	children?: Array<IColumn<Extract<T[keyof T], { [K in keyof T]: T[K] }>>>;
	formatter?: (
		cellValue: T[keyof T],
		row: T,
		rowIdx: number,
		formatterExtraOptions: extraOptions
	) => React.ReactNode;
	formatterExtraOptions?: extraOptions;
	footer?: (props: FooterProps<T>) => React.ReactNode;
	footerExtraOptions?: extraOptions;
}

// export interface IColumn<T = TData> {
// 	dataField: keyof T;
// 	name: string;
// 	align?: "left" | "center" | "right";
// 	isSortable?: boolean;
// 	className?: string;
// 	formatter?: (
// 		cellValue: T[keyof T],
// 		row: T,
// 		rowIdx: number,
// 		formatterExtraOptions: extraOptions
// 	) => React.ReactNode;
// 	formatterExtraOptions?: extraOptions;
// 	footer?: (
// 		colData: T[keyof T][],
// 		footerExtraOptions: extraOptions
// 	) => React.ReactNode;
// 	footerExtraOptions?: extraOptions;
// 	// children?: T[keyof T] extends {[key: string]: IColumn<T[keyof T]>[] } ? IColumn<T[keyof T]>[] : undefined;
// 	children?: IColumn<T[keyof T]>[] | undefined;
// }

export interface ITable<T extends {}> {
	data: Array<T> | { [key: string]: Array<T> };
	columns: IColumn<T>[];
	keyField?: keyof T extends string ? keyof T : string;
	className?: string;
	style?: React.CSSProperties;
	isLoading?: boolean;
	noDataRow?: () => React.ReactNode;
	expandable?: boolean;
	expandRow?: (row: T, rowIdx: number) => React.ReactNode;
	selectable?: boolean;
	onSelectRow?: (row: T, rowindex: number) => void;
	selectedRows?: Array<
		T[keyof T] extends number | string ? T[keyof T] : number
	>;
}

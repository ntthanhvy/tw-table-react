import { PropsWithChildren, ReactNode } from "react";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { Header } from "./Header";
import { RowGroup } from "./RowGroup";
import { IColumn, ITable } from "./type";

type TNodeByLevel<TNode> = {
	level: number;
	nodeCount: number;
	nodes: TNode[];
};

function countColMem<N>(nodes: N[]): [TNodeByLevel<N>[], number] {
	if (nodes.length === 0) {
		return [{} as any, 0];
	}

	let q: N[] = [];
	let count = 0;

	let start = 0;
	let pos: TNodeByLevel<N>[] = [];

	q.push(...nodes);

	while (true) {
		//* for each level in a node,
		//* if the node has children, push them to the queue
		//* number node in queue is the nodes at the level
		let nodeCount = q.length;

		if (nodeCount == 0) {
			return [pos, count];
		}
		start++;
		pos.push({ level: start, nodeCount, nodes: [...q] });

		while (nodeCount > 0) {
			let node = q.shift() as { children?: N[] }; // remove first node

			if (node?.children) {
				q.push(...node.children);
			}

			nodeCount--;
		}

		count++;
	}
}

function renderDefaultHeader<T>(columns: IColumn<T>[]) {
	let [levels, maxRow] = countColMem(columns); //* run on first render of header to get all rows

	let rowSpan = maxRow;

	return levels.map((level, rowidx) => (
		<tr key={rowidx}>
			{level.nodes.map((node, colidx) => {
				let col = node as IColumn<T>;

				if (col.children) {
					//* run on each row to get each column colSpan by its last child
					let [child, _] = countColMem(node.children || []);

					let lastChild = child.slice(-1)[0];
					return (
						<th
							key={colidx}
							rowSpan={col.children ? 1 : rowSpan - rowidx}
							colSpan={lastChild.nodeCount || 1}
							className="header"
						>
							{col.name}
						</th>
					);
				}
				return (
					<th
						key={colidx}
						rowSpan={node.children ? 1 : rowSpan - rowidx}
						colSpan={1}
						className="header"
					>
						{col.name}
					</th>
				);
			})}
		</tr>
	));
}

function renderDataRow<T extends { [K in keyof T]: T[K] }>(
	row: T,
	columns: IColumn<T>[]
): any {
	return columns.map((col, colidx) => {
		if (col.children) {
			let value = row[col.dataField];
			return renderDataRow(value, col.children);
		}
		let value = row[col.dataField] as unknown as ReactNode;
		// console.info(col.dataField, value);
		return (
			<Cell key={colidx} className={col.className}>
				<div
					className={`w-full h-full flex items-start text-${
						col.align || "center"
					}`}
				>
					<span className={`px-2 py-1 flex-auto`}>{value}</span>
				</div>
			</Cell>
		);
	});
}

const Table = function <T extends {}>({
	children,
	className,
	data,
	...props
}: PropsWithChildren<ITable<T>>) {
	console.log("rendering table");

	let { columns, keyField, ...rest } = props;

	return (
		<table className="table-fixed border-collapse w-full">
			<Header>{renderDefaultHeader(columns)}</Header>

			<RowGroup>
				{Array.isArray(data)
					? data.map((row, rowIdx) => (
							<RowGroup.Row key={rowIdx}>
								{renderDataRow(row, columns)}
							</RowGroup.Row>
					  ))
					: null}
			</RowGroup>
		</table>
	);
};

export { Table };

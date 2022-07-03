import { PropsWithChildren } from "react";
import { Cell } from "./Cell";
import { Row } from "./Row";
import { Header } from "./Header";
import { RowGroup } from "./RowGroup";
import { IColumn, ITable } from "./type";

function countColMem(nodes: IColumn[]): [any[], number] {
	if (nodes.length === 0) {
		return [{} as any, 0];
	}

	let q: IColumn[] = [];
	let count = 0;

	let start = 0;
	let pos: any[] = [];

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
		pos.push({ level: start, count: nodeCount, nodes: [...q] });

		while (nodeCount > 0) {
			let node = q.shift(); // remove first node

			if (node?.children) {
				q.push(...node.children);
			}

			nodeCount--;
		}

		count++;
	}
}

function renderDefaultHeader(columns: IColumn[]) {
	let [levels, maxRow] = countColMem(columns);

	let rowSpan = maxRow;
	console.log(levels);

	return levels.map((level, rowidx) => (
		<tr key={rowidx}>
			{level.nodes.map((node: IColumn, colidx: number) => {
				if (node.children) {
					let [child, maxCol] = countColMem(node?.children || []);

					let lastChild = child.slice(-1)[0]
					console.log({ name: node.name, maxChild: lastChild, maxCol });
					return (
						<th
							key={colidx}
							rowSpan={node.children ? 1 : rowSpan - rowidx}
							colSpan={lastChild.count || 1}
							className="header"
						>
							{node.name}
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
						{node.name}
					</th>
				);
			})}
		</tr>
	));
}

const Table = function <TData = Record<string, any>>({
	children,
	className,
	data = [],
	...props
}: PropsWithChildren<ITable<TData>>) {
	console.log("rendering table");

	let { columns, keyField, ...rest } = props;

	return (
		<table className="table-fixed border-collapse w-full">
			<Header>{renderDefaultHeader(columns)}</Header>

			<RowGroup>
				{Array.isArray(data)
					? data.map((row, rowIdx) => (
							<RowGroup.Row key={rowIdx}>
								{columns.map((col, colidx) => (
									<Cell key={colidx}>{row[col.dataField]}</Cell>
								))}
							</RowGroup.Row>
					  ))
					: null}
			</RowGroup>
		</table>
	);
};

export { Table };

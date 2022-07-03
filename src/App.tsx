import "./App.css";
import { IColumn, Table } from "./table";
import data from "./data";

type TData = typeof data[number];

function App() {
	const columns: IColumn<TData>[] = [
		{
			dataField: "productName",
			name: "Name Product",
			className: "w-64",
		},
		{
			dataField: "startValue",
			name: "Start Value",
			children: [
				{
					dataField: "amount",
					name: "Start Value",
				},
				{
					dataField: "value",
					name: "Start amount",
				},
			],
		},
		{
			dataField: "importValue",
			name: "import value",
			children: [
				{
					dataField: "amount",
					name: "import",
				},
				{
					dataField: "value",
					name: "import",
				},
			],
		},
		{
			dataField: "exportValue",
			name: "export value",
			children: [
				{
					dataField: "amount",
					name: "export",
				},
				{
					dataField: "value",
					name: "export",
				},
			],
		},
		{
			dataField: "endValue",
			name: "end value",
			children: [
				{
					dataField: "realValue",
					name: "real end",
					children: [
						{ dataField: "amount", name: "real end" },
						{ dataField: "value", name: "real end" },
					],
				},
				{
					dataField: "calculateValue",
					name: "expected end",
					children: [
						{
							dataField: "amount",
							name: "expected end",
						},
						{
							dataField: "value",
							name: "expected end",
						},
					],
				},
			],
		},
	];

	return (
		<div className="w-screen min-h-screen bg-slate-100">
			<header className="w-full text-center py-5 text-2xl font-bold tracking-wider uppercase">
				Test multi group cols
			</header>

			<main className="max-w-screen overflow-hidden mx-auto px-0 md:px-10 py-5 w-full flex flex-wrap relative">
				<div className="w-full static">
					<div className="bg-slate-50 md:rounded-xl md:shadow-lg md:border border-slate-200 min-h-[320px]">
						{/* header */}
						<div className="card-header py-3 px-5 md:p-5 flex flex-wrap items-center  justify-between text-lg text-left font-bold text-slate-700">
							<p className="flex-auto">Table Name</p>

							<div className="flex flex-wrap w-full md:w-auto place-self-end justify-self-end self-end">
								{/* button group */}
								<button className="header-btn">BUTTON 1</button>
								<button className="header-btn">BUTTON 2</button>
								<button className="header-btn">BUTTON 2</button>
							</div>
						</div>

						{/* main content */}

						<div className="w-full p-0">
							{/* table */}
							<Table columns={columns} data={data} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;

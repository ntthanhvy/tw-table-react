import "./App.css";
import { IColumn, Table } from "./table";

function App() {
	type NewType = IColumn<any>;

	const columns: NewType[] = [
		{
			dataField: "name",
			name: "Name Product",
		},
		{
			dataField: "name",
			name: "Start Value",
			children: [
				{
					dataField: "startValue",
					name: "Start Value",
				},
				{
					dataField: "startValue",
					name: "Start amount",
				},
			],
		},
		{
			dataField: "name",
			name: "import value",
			isGroup: true,
			children: [
				{
					dataField: "name",
					name: "import",
				},
				{
					dataField: "name",
					name: "import",
				},
			],
		},
		{
			dataField: "name",
			name: "export value",
			isGroup: true,
			children: [
				{
					dataField: "name",
					name: "export",
				},
				{
					dataField: "name",
					name: "export",
				},
			],
		},
		{
			dataField: "name",
			name: "end value",
			isGroup: true,
			children: [
				{
					dataField: "name",
					name: "real end",
					children: [
						{ dataField: "name", name: "real end" },
						{ dataField: "name", name: "real end" },
					],
				},
				{
					dataField: "name",
					name: "expected end",
					children: [
						{
							dataField: "name",
							name: "expected end",
						},
						{
							dataField: "name",
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
							<Table columns={columns} data={[]} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;

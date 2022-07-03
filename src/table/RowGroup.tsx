import React from "react";
import { render } from "../utils/render";
import { Row as BaseRow } from "./Row";

interface IRowGroup {
	header?: boolean;
	className?: string;
}

const RowGroupRoot = (props: React.PropsWithChildren<IRowGroup>) => {
	return render({
		props: { className: "rowgroup", ...props },
		slot: {},
		name: "RowGroup",
		tag: "tbody",
	});
};

const Header = (props: React.PropsWithChildren<IRowGroup>) => {
	return render({
		props: { className: "rowgroup-header", ...props },
		slot: {},
		name: "RowGroupHeader",
		tag: "thead",
	});
};

const Row = Object.assign(BaseRow, { props: { className: "" } });

export let RowGroup = Object.assign(RowGroupRoot, { Header, Row });

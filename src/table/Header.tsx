import React, { ElementType, PropsWithChildren } from "react";
import { Row as BaseRow } from "./Row";
import { render } from "../utils/render";

let defaultTag = "thead" as const;

const HeaderRoot = function <TTag extends ElementType = typeof defaultTag>(
	props: PropsWithChildren
) {
	return render({
		props: { className: "header-group", ...props },
		slot: {},
		name: "Header",
		tag: defaultTag,
	});
};

const Row = Object.assign(BaseRow, { props: { className: "row" } });

export let Header = Object.assign(HeaderRoot, { Row });

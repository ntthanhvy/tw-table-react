import { ElementType } from "react";
import { render } from "../utils/render";

const RowRoot = (props: React.PropsWithChildren<any>) => {
	return render({
		props: { ...props },
		slot: {},
		name: "Row",
		tag: "tr",
	});
}

export let Row = Object.assign(RowRoot, {});

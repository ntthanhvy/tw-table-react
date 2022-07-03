import { PropsWithChildren } from "react";
import { render } from "../utils/render";

export const Cell = ({
	className = "",
	...props
}: PropsWithChildren<{ className?: string }>) => {
	return render({
		tag: "td",
		name: "TableCell",
		slot: {},
		props: { className: "cell " + className, ...props },
	});
};

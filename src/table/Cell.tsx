import { Image } from "../Image";

export const Cell = ({ img = false, align = "center", children }: any) => {
	return (
		<td className="cell">
			<div className={`w-full h-full flex items-start text-${align}`}>
				{img && <Image />}
				<span className={`px-2 py-1 flex-auto`}>{children}</span>
			</div>
		</td>
	);
};

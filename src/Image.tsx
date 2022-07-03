export const Image = ({
	src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2899&q=80",
}: {
	src?: string;
}) => {
	return (
		<div className="w-14 h-14 overflow-hidden shadow rounded-md flex place-items-center">
			<img src={src} alt="placholder" className="object-cover w-full h-full" />
		</div>
	);
};

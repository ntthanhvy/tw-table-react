import React, { createElement, ElementType } from "react";

function _match<
	TValue extends number | string = string,
	TReturnValue = unknown
>(
	value: TValue,
	lookup: Record<TValue, TReturnValue | ((...args: any[]) => TReturnValue)>,
	...args: any[]
): TReturnValue {
	if (value in lookup) {
		var returnVal = lookup[value];
		return typeof returnVal === "function" ? returnVal(...args) : returnVal;
	}

	throw Error("No match found for " + value);
}

type TRender<TTag, TSlot> = {
	props: React.PropsWithChildren<any>;
	name: string;
	tag: TTag;
  slot: TSlot;
};

function render<TTag extends ElementType, TSlot>({
	props,
	slot = {} as TSlot,
	name,
	tag,
}: TRender<TTag, TSlot>) {
	let { as: Component = tag, children, ...rest } = props;

	let resolveChildren = (
		typeof children === "function" ? children(slot) : children
	) as React.ReactElement | React.ReactElement[];

	return createElement(Component, Object.assign({}, rest), resolveChildren);
}

export { render };

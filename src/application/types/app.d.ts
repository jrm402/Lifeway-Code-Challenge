import { NextPage } from 'next';
import { ReactNode } from 'react';

declare global {
	type Page<PageProps = {}> = NextPage<PageProps & { children?: ReactNode }>;
	type Component<ComponentProps = {}> = React.FC<
		ComponentProps & { children?: ReactNode }
	>;

	type ForwardRefComponent<ComponentProps = {}> = ComponentProps & {
		children?: ReactNode;
	};
}

export {};

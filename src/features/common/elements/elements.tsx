import Box, { BoxProps } from '@mui/material/Box';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Link, { LinkProps } from 'next/link';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import styles from './elements.module.css';
import { forwardRef } from 'react';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import MuiGrid, { GridProps } from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';

/**
 * `div` element
 */
export const Div = forwardRef<HTMLDivElement, ForwardRefComponent<BoxProps>>(
	function Div({ children, ...props }, ref): JSX.Element {
		return (
			<Box ref={ref} {...props}>
				{children}
			</Box>
		);
	}
);

/**
 * `p` element
 */
export const P = forwardRef<
	HTMLParagraphElement,
	ForwardRefComponent<BoxProps>
>(function P({ children, ...props }, ref): JSX.Element {
	return (
		<Box component="p" ref={ref} {...props}>
			{children}
		</Box>
	);
});

/**
 * `span` element
 */
export const Span = forwardRef<HTMLSpanElement, ForwardRefComponent<BoxProps>>(
	function Span({ children, ...props }, ref): JSX.Element {
		return (
			<Box component="span" ref={ref} {...props}>
				{children}
			</Box>
		);
	}
);

const LinkBehavior = forwardRef<
	HTMLAnchorElement,
	ForwardRefComponent<LinkProps & { href: string }>
>(function LinkBehavior({ href, children, ...props }, ref) {
	return (
		<Link {...props} href={href} ref={ref}>
			{children}
		</Link>
	);
});

/**
 * `a` element
 */
export const A = forwardRef<
	HTMLAnchorElement,
	ForwardRefComponent<MuiLinkProps & { href: string }>
>(function A({ children, href, ...props }, ref): JSX.Element {
	return (
		<MuiLink {...props} href={href} component={LinkBehavior} ref={ref}>
			{children}
		</MuiLink>
	);
});

/**
 * `input` element
 */
export const Input = forwardRef<
	HTMLInputElement,
	ForwardRefComponent<TextFieldProps>
>(function Input({ className, ...props }, ref): JSX.Element {
	return (
		<TextField
			className={`${styles.input} ${className ?? ''}`}
			fullWidth
			size="small"
			ref={ref}
			{...props}
		/>
	);
});

/**
 * `label` element
 */
export const Label = forwardRef<
	HTMLLabelElement,
	ForwardRefComponent<BoxProps>
>(function Label({ children, ...props }, ref): JSX.Element {
	return (
		<Box {...props} component="label" ref={ref}>
			{children}
		</Box>
	);
});

/**
 * `button` element
 */
export const Button = forwardRef<
	HTMLButtonElement,
	ForwardRefComponent<ButtonProps & { loading?: boolean }>
>(function Button({ children, loading, ...props }, ref): JSX.Element {
	return (
		<MuiButton
			variant="contained"
			type="button"
			startIcon={
				loading && <CircularProgress size={14} color="inherit" />
			}
			disabled={loading || props.disabled}
			{...props}
			ref={ref}
		>
			{children}
		</MuiButton>
	);
});

/**
 * `form` element
 */
export const Form = forwardRef<HTMLFormElement, ForwardRefComponent<BoxProps>>(
	function Form({ children, ...props }, ref): JSX.Element {
		return (
			<Box {...props} component="form" ref={ref}>
				{children}
			</Box>
		);
	}
);

/**
 * Grid parent element
 */
export const Grid = forwardRef<HTMLDivElement, ForwardRefComponent<GridProps>>(
	function Grid({ children, ...props }, ref) {
		return (
			<MuiGrid spacing={1} {...props} container ref={ref}>
				{children}
			</MuiGrid>
		);
	}
);

/**
 * Grid child element
 */
export const GridItem = forwardRef<
	HTMLDivElement,
	ForwardRefComponent<GridProps>
>(function GridItem({ children, ...props }, ref) {
	return (
		<MuiGrid {...props} item ref={ref}>
			{children}
		</MuiGrid>
	);
});

/**
 * `h1` element
 */
export const H1 = forwardRef<HTMLHeadingElement, ForwardRefComponent<BoxProps>>(
	function H1({ children, ...props }, ref): JSX.Element {
		return (
			<Typography variant="h1" component="h1" ref={ref} {...props}>
				{children}
			</Typography>
		);
	}
);

/**
 * `h3` element
 */
export const H3 = forwardRef<HTMLHeadingElement, ForwardRefComponent<BoxProps>>(
	function H3({ children, ...props }, ref): JSX.Element {
		return (
			<Typography variant="h3" component="h3" ref={ref} {...props}>
				{children}
			</Typography>
		);
	}
);

/**
 * `h4` element
 */
export const H4 = forwardRef<HTMLHeadingElement, ForwardRefComponent<BoxProps>>(
	function H4({ children, ...props }, ref): JSX.Element {
		return (
			<Typography variant="h4" component="h4" ref={ref} {...props}>
				{children}
			</Typography>
		);
	}
);

/**
 * `h5` element
 */
export const H5 = forwardRef<HTMLHeadingElement, ForwardRefComponent<BoxProps>>(
	function H5({ children, ...props }, ref): JSX.Element {
		return (
			<Typography variant="h5" component="h5" ref={ref} {...props}>
				{children}
			</Typography>
		);
	}
);

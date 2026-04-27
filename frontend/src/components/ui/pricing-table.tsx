import { cn } from "@/lib/utils";
import { CheckIcon, LucideIcon, MinusIcon } from 'lucide-react';
import { Badge } from './badge';

function PricingTable({ className, children, ...props }: React.ComponentProps<'table'>) {
	return (
		<div
			data-slot="table-container"
			className="relative w-full"
		>
			<table className={cn("w-full text-sm", className)} {...props}>
				{children}
			</table>
		</div>
	);
}

function PricingTableHeader({ ...props }: React.ComponentProps<'thead'>) {
	return <thead data-slot="table-header" {...props} />;
}

function PricingTableBody({
	className,
	...props
}: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn('[&_tr]:divide-x [&_tr]:border-b', className)}
			{...props}
		/>
	);
}

function PricingTableRow({ ...props }: React.ComponentProps<'tr'>) {
	return <tr data-slot="table-row" {...props} />;
}

function PricingTableCell({
	className,
	children,
	...props
}: React.ComponentProps<'td'> & { children: boolean | string }) {
	return (
		<td
			data-slot="table-cell"
			className={cn('p-4 align-middle text-center', className)}
			{...props}
		>
			<div className="flex justify-center items-center">
				{children === true ? (
					<CheckIcon aria-hidden="true" className="size-4 text-primary" />
				) : children === false ? (
					<MinusIcon
						aria-hidden="true"
						className="text-muted-foreground size-4"
					/>
				) : (
					<span className="text-white/80">{children}</span>
				)}
			</div>
		</td>
	);
}

function PricingTableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				'p-2 text-left align-middle font-medium',
				className,
			)}
			{...props}
		/>
	);
}

function PricingTablePlan({
	name,
	badge,
	price,
	compareAt,
	icon: Icon,
	children,
	className,
	...props
}: React.ComponentProps<'div'> & PricingPlanType) {
	return (
		<div
			className={cn(
				'bg-background supports-[backdrop-filter]:bg-background/40 relative h-full overflow-hidden rounded-lg border p-3 font-normal backdrop-blur-xs',
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center rounded-full border p-1.5">
					{Icon && <Icon className="h-3 w-3" />}
				</div>
				<h3 className="text-muted-foreground font-mono text-xs uppercase tracking-wider">{name}</h3>
				{badge && (
					<Badge
						variant="secondary"
						className="ml-auto rounded-full border px-2 py-0.5 text-[10px] font-normal"
					>
						{badge}
					</Badge>
				)}
			</div>

			<div className="mt-4 flex items-baseline gap-2">
				<span className="text-2xl font-bold">{price}</span>
				{compareAt && (
					<span className="text-muted-foreground text-xs line-through">
						{compareAt}
					</span>
				)}
			</div>
			<div className="relative z-10 mt-4">{children}</div>
		</div>
	);
}

type PricingPlanType = {
	name: string;
	icon?: LucideIcon;
	badge?: string;
	price: string;
	compareAt?: string;
};

type FeatureValue = boolean | string;

type FeatureItem = {
	label: string;
	values: FeatureValue[];
};

export {
	type PricingPlanType,
	type FeatureValue,
	type FeatureItem,
	PricingTable,
	PricingTableHeader,
	PricingTableBody,
	PricingTableRow,
	PricingTableHead,
	PricingTableCell,
	PricingTablePlan,
};

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, CreditCard, FileText, LogOut, User, LayoutDashboard, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const SAMPLE_PROFILE_DATA = {
    name: "Agente LeadBook",
    email: "agente@leadbook.app",
    avatar: "",
    subscription: "STARTER",
};

export function ProfileDropdown({
    data = SAMPLE_PROFILE_DATA,
    onLogout,
    className,
    ...props
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuItems = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard className="w-4 h-4" />,
            isInternal: true,
        },
        {
            label: "Profile",
            href: "#",
            icon: <User className="w-4 h-4" />,
        },
        {
            label: "Subscription",
            value: data.subscription,
            href: "#",
            icon: <CreditCard className="w-4 h-4" />,
        },
        {
            label: "Settings",
            href: "/cuenta",
            icon: <Settings className="w-4 h-4" />,
            isInternal: true,
        },
        {
            label: "Conexiones",
            href: "/conexiones",
            icon: <Link2 className="w-4 h-4" />,
            isInternal: true,
        },
        {
            label: "Terms & Policies",
            href: "#",
            icon: <FileText className="w-4 h-4" />,
            external: true,
        },
    ];

    return (
        <div className={cn("relative", className)} {...props}>
            <DropdownMenu onOpenChange={setIsOpen}>
                <div className="group relative">
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className="flex items-center gap-8 p-2 rounded-2xl bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
                        >
                            <div className="text-left flex-1 px-2">
                                <div className="text-sm font-medium text-zinc-100 tracking-tight leading-tight">
                                    {data.name}
                                </div>
                                <div className="text-xs text-zinc-500 tracking-tight leading-tight">
                                    {data.email}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] via-[#7C3AED] to-purple-500 p-0.5">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 flex items-center justify-center">
                                        {data.avatar ? (
                                            <img
                                                src={data.avatar}
                                                alt={data.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <span className="text-white text-xs font-bold">
                                                {(data.name || data.email || 'U').charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>

                    {/* Bending line indicator on the right */}
                    <div
                        className={cn(
                            "absolute -right-3 top-1/2 -translate-y-1/2 transition-all duration-200",
                            isOpen
                                ? "opacity-100"
                                : "opacity-60 group-hover:opacity-100"
                        )}
                    >
                        <svg
                            width="12"
                            height="24"
                            viewBox="0 0 12 24"
                            fill="none"
                            className={cn(
                                "transition-all duration-200",
                                isOpen
                                    ? "text-blue-400 scale-110"
                                    : "text-zinc-500 group-hover:text-zinc-300"
                            )}
                            aria-hidden="true"
                        >
                            <path
                                d="M2 4C6 8 6 16 2 20"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                            />
                        </svg>
                    </div>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-64 p-2 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800/60 rounded-2xl shadow-xl shadow-zinc-950/20 origin-top-right z-[9999]"
                    >
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <DropdownMenuItem key={item.label} asChild>
                                    {item.isInternal ? (
                                        <Link
                                            to={item.href}
                                            className="flex items-center p-3 hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-sm border border-transparent hover:border-zinc-700/50"
                                        >
                                            <div className="flex items-center gap-2 flex-1">
                                                {item.icon}
                                                <span className="text-sm font-medium text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-50 transition-colors">
                                                    {item.label}
                                                </span>
                                            </div>
                                                {item.value && (
                                                    <span className="text-xs font-medium rounded-md py-1 px-2 tracking-tight text-purple-400 bg-purple-500/10 border border-purple-500/10">
                                                        {item.value}
                                                    </span>
                                                )}
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.href}
                                            target={item.external ? "_blank" : undefined}
                                            className="flex items-center p-3 hover:bg-zinc-800/60 rounded-xl transition-all duration-200 cursor-pointer group hover:shadow-sm border border-transparent hover:border-zinc-700/50"
                                        >
                                            <div className="flex items-center gap-2 flex-1">
                                                {item.icon}
                                                <span className="text-sm font-medium text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-50 transition-colors">
                                                    {item.label}
                                                </span>
                                            </div>
                                                {item.value && (
                                                    <span className="text-xs font-medium rounded-md py-1 px-2 tracking-tight text-purple-400 bg-purple-500/10 border border-purple-500/10">
                                                        {item.value}
                                                    </span>
                                                )}
                                        </a>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </div>

                        <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                onClick={onLogout}
                                className="w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 hover:shadow-sm transition-all group"
                            >
                                <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                                <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
                                    Salir
                                </span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>
        </div>
    );
}


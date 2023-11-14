"use client";

import * as React from "react";
import { Heading } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import classnames from "classnames";
import * as Collapsible from "@radix-ui/react-collapsible";

type SidebarElement = React.ElementRef<"aside">;
type RootProps = React.ComponentPropsWithoutRef<"aside">;

interface NavItem {
  title: string;
  value: string;
  icon: React.ReactNode; // Icon component or SVG
}

interface SidebarProps extends RootProps {
  navItems: NavItem[];
  title?: string;
}

export const Sidebar = React.forwardRef<SidebarElement, Readonly<SidebarProps>>(
  ({ navItems, title, ...props }, forwardedRef) => {
    return (
      <aside
        ref={forwardedRef}
        className="px-6 min-w-[275px] max-w-[275px] flex flex-col gap-4 border-r border-slate-6 bg-white"
        {...props}
      >
        <nav className="flex flex-col gap-4">
          <Collapsible.Root defaultOpen>
            <Collapsible.Trigger
              className={classnames("flex items-center gap-1", {
                "cursor-default": navItems && navItems.length === 0,
              })}
            >
              <svg
                className="text-slate-11"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... your SVG path ... */}
              </svg>

              <div className="flex items-center text-slate-11 transition ease-in-out duration-200 hover:text-slate-12">
                <Heading
                  // as="h3"
                  color="gray"
                  size="2"
                  // weight="medium"
                  className="transition ease-in-out duration-200 hover:text-slate-12"
                >
                  All emails
                </Heading>
                {navItems && navItems.length > 0 && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* ... your SVG path ... */}
                  </svg>
                )}
              </div>
            </Collapsible.Trigger>

            {navItems && navItems.length > 0 && (
              <Collapsible.Content className="relative mt-3">
                <div className="absolute left-2.5 w-px h-full bg-slate-6" />

                <div className="py-2 flex flex-col truncate">
                  <LayoutGroup id="sidebar">
                    {navItems.map((item) => {
                      const isCurrentPage = title === item.title;
                      return (
                        <Link
                          key={item.title}
                          href={`/organizer/${item.value}`}
                        >
                          <motion.span
                            className={classnames(
                              "text-[14px] flex items-center font-medium gap-2 w-full pl-4 h-8 rounded-md text-slate-11 relative transition ease-in-out duration-200",
                              {
                                "text-cyan-11": isCurrentPage,
                                "hover:text-slate-12": title !== item.title,
                              }
                            )}
                          >
                            {isCurrentPage && (
                              <motion.span
                                layoutId="sidebar"
                                className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-cyan-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="bg-cyan-11 w-px absolute top-1 left-2.5 h-6" />
                              </motion.span>
                            )}
                            {item.icon} {/* Display the icon here */}
                            {item.title}
                          </motion.span>
                        </Link>
                      );
                    })}
                  </LayoutGroup>
                </div>
              </Collapsible.Content>
            )}
          </Collapsible.Root>
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";

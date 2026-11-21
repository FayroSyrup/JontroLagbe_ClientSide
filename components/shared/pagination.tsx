import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 1 ... 4 5 6 ... 12
const getPageList = (page: number, total: number) => {
  const wanted = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...wanted]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const list: (number | "gap")[] = [];
  sorted.forEach((n, index) => {
    if (index > 0 && n - sorted[index - 1] > 1) list.push("gap");
    list.push(n);
  });
  return list;
};

export function Pagination({
  page,
  totalPages,
  basePath,
  params = {},
}: {
  page: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  // keeps the other filters in the link
  const hrefFor = (target: number) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) search.set(key, value);
    });
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const edge = "pointer-events-none opacity-40";

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <Link
        href={hrefFor(page - 1)}
        aria-label="Previous page"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          page <= 1 && edge,
        )}
      >
        <ChevronLeft className="size-4" />
      </Link>

      {getPageList(page, totalPages).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="px-1 text-muted-foreground">
            ...
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            aria-current={item === page ? "page" : undefined}
            className={buttonVariants({
              variant: item === page ? "default" : "outline",
              size: "icon",
            })}
          >
            {item}
          </Link>
        ),
      )}

      <Link
        href={hrefFor(page + 1)}
        aria-label="Next page"
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          page >= totalPages && edge,
        )}
      >
        <ChevronRight className="size-4" />
      </Link>
    </nav>
  );
}

import React, { memo } from "react";

interface MarqueeScrollProps<T extends { id?: string | number }> {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => React.ReactNode;
  readonly getItemKey?: (item: T, index: number) => string | number;
  readonly className?: string;
}

function MarqueeScrollComponent<T extends { id?: string | number }>({
  items,
  renderItem,
  getItemKey = (item, index) => item?.id ?? index,
  className = "",
}: MarqueeScrollProps<T>) {
  return (
    <div className={`marquee-container ${className}`}>
      <div className="marquee py-12">
        <div className="marquee-content text-zinc-600">
          {items.map((item, index) => (
            <React.Fragment key={getItemKey(item, index)}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>
        <div aria-hidden="true" className="marquee-content text-zinc-600">
          {items.map((item, index) => (
            <React.Fragment key={`dup-${getItemKey(item, index)}`}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export const MarqueeScroll = memo(
  MarqueeScrollComponent,
) as typeof MarqueeScrollComponent;

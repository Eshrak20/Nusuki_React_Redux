// import * as React from "react"
// import { Slider as SliderPrimitive } from "radix-ui"

// import { cn } from "@/lib/utils"

// function Slider({
//   className,
//   defaultValue,
//   value,
//   min = 0,
//   max = 100,
//   ...props
// }: React.ComponentProps<typeof SliderPrimitive.Root>) {
//   const _values = React.useMemo(
//     () =>
//       Array.isArray(value)
//         ? value
//         : Array.isArray(defaultValue)
//           ? defaultValue
//           : [min, max],
//     [value, defaultValue, min, max]
//   )

//   return (
//     <SliderPrimitive.Root
//       data-slot="slider"
//       defaultValue={defaultValue}
//       value={value}
//       min={min}
//       max={max}
//       className={cn(
//         "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
//         className
//       )}
//       {...props}
//     >
//       <SliderPrimitive.Track
//         data-slot="slider-track"
//         className={cn(
//           "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
//         )}
//       >
//         <SliderPrimitive.Range
//           data-slot="slider-range"
//           className={cn(
//             "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
//           )}
//         />
//       </SliderPrimitive.Track>
//       {Array.from({ length: _values.length }, (_, index) => (
//         <SliderPrimitive.Thumb
//           data-slot="slider-thumb"
//           key={index}
//           className="block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
//         />
//       ))}
//     </SliderPrimitive.Root>
//   )
// }

// export { Slider }



import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbCount =
    props.value?.length || props.defaultValue?.length || 1;

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center py-3",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-3 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full rounded-full bg-primary"
        />
      </SliderPrimitive.Track>

      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className={cn(
            "relative block h-6 w-6 rounded-full border-4 border-white bg-primary shadow-lg",
            "cursor-grab active:cursor-grabbing",
            "transition-transform duration-150 hover:scale-110 active:scale-105",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25",
            "disabled:pointer-events-none disabled:opacity-50",
            // bigger invisible hit area
            "before:absolute before:left-1/2 before:top-1/2 before:h-10 before:w-10 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:content-['']"
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
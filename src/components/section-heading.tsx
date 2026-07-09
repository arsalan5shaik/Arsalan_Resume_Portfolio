export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index?: number;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-widest text-primary">
        {typeof index === "number" && (
          <span className="tabular-nums text-primary/60">
            {String(index).padStart(2, "0")}
          </span>
        )}
        <span className="h-px w-6 bg-primary/50" />
        <span className="uppercase">{eyebrow}</span>
      </p>
      <h2 className="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

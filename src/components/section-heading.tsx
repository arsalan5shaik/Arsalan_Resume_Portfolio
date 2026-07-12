export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}

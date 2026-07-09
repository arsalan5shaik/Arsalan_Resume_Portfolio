export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
        <span className="h-px w-6 bg-primary/50" />
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-lg tracking-tight font-semibold text-neutral-800 text-center whitespace-nowrap">
        {title}
      </h2>
      <div className="h-px flex-1 bg-neutral-200" />
    </div>
  );
}

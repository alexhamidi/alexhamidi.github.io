export default function WritingLoading() {
  return (
    <div className="w-full max-w-2xl mx-auto px-8 md:px-16 pt-12 pb-16 animate-pulse">
      <div className="h-4 w-16 bg-neutral-200 rounded mb-6" />
      <div className="h-8 w-3/4 bg-neutral-200 rounded mb-2" />
      <div className="h-3 w-24 bg-neutral-100 rounded mb-6" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-neutral-100 rounded" />
        <div className="h-4 w-full bg-neutral-100 rounded" />
        <div className="h-4 w-2/3 bg-neutral-100 rounded" />
      </div>
    </div>
  );
}

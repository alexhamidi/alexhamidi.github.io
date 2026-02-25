export default function ResumePage() {
  return (
    <div className="m-0 p-0 h-screen flex flex-col">
      <div className="flex-1 w-full h-full">
        <embed
          src="/resume.pdf"
          type="application/pdf"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}

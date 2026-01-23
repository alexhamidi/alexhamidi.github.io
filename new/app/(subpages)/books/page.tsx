import { getAllBooks } from "./utils";
import Link from "next/link";

export default function Books() {
  const books = getAllBooks();
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
      {books.map((book) => (
        <Link 
          key={book.slug} 
          href={`/books/${book.slug}`}
          className="flex flex-col gap-3"
        >
          {book.hasCover ? (
            <img
              src={`/books/${book.slug}/cover.png`}
              alt={book.title}
              className="w-full aspect-[2/3] object-cover border border-gray-300"
            />
          ) : (
            <div 
              className="w-full aspect-[2/3] flex items-center justify-center text-center p-4 border border-gray-300"
              style={{ backgroundColor: book.spineColor, color: book.textColor }}
            >
              <span className="text-sm font-semibold">{book.title}</span>
            </div>
          )}
          <h2 className="text-lg font-serif text-gray-900">
            {book.title}
          </h2>
        </Link>
      ))}
    </div>
  );
}

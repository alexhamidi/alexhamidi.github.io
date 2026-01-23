import { getBook, getAllSlugs } from "../utils";
import VideoPlayer from "./VideoPlayer";

interface BookPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const book = getBook(slug);

  return (
    <>
      {book.hasFilm && <VideoPlayer slug={book.slug} />}

      <div className="flex flex-col items-center text-gray-900 font-serif min-h-screen gap-10 w-full max-w-[650px] mx-auto px-6">
        {!book.hasFilm && <div className="mt-20" />}
          
        <h1 className="text-5xl text-center">{book.title}</h1>
        
        <p className="text-gray-600">
          {book.author} · {new Date(book.date).getFullYear()}
        </p>
        
        {book.text && (
          <div className="flex text-lg flex-col gap-4 mt-4 w-full">
            {book.text.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

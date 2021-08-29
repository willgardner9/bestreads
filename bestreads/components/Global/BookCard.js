export default function BookCard({book}) {
  const imageStyles = {
    width: "fit-content",
  };
  //  wait for async props to load
  if (!book) return null;
  if (
    !book.volumeInfo.authors ||
    !book.volumeInfo.imageLinks ||
    !book.volumeInfo.categories
  )
    return null;
  return (
    <section className="mt-12 w-full flex flex-col items-center sm:items-start sm:flex-row">
      <img
        style={imageStyles}
        className="h-full sm:pr-4"
        src={
          book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.smallThumbnail
            : ""
        }
      />
      <div className="flex flex-col flex-grow sm:pl-4 mt-4 sm:mt-0">
        <h1 className="text-2xl font-bold">{book.volumeInfo.title}</h1>
        <h2 className="text-base font-semibold mt-2">
          {book.volumeInfo.authors.length >= 2
            ? book.volumeInfo.authors.map((author, i) =>
                i + 1 == book.volumeInfo.authors.length ? author : author + ", "
              )
            : book.volumeInfo.authors}
        </h2>
        <div className="flex flex-col mt-4 sm:flex-row">
          <div className="flex items-center text-gray-400 pr-6 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
            <p className="text-gray-500 text-xs ml-1">
              {book.volumeInfo.pageCount}
            </p>
          </div>
          <div className="flex items-center text-gray-400 pr-6 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <p className="text-gray-500 text-xs ml-1">
              {book.volumeInfo.categories}
            </p>
          </div>
          <div className="flex items-center text-gray-400 pr-6 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500 text-xs ml-1">
              {book.volumeInfo.publishedDate.substring(0, 4)}
            </p>
          </div>
        </div>
        <p className="leading-7 mt-3">{book.volumeInfo.description}</p>
      </div>
    </section>
  );
}

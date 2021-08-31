import DbBookCard from "../BookCard/DbBookCard";

export default function ReadBooklist({listTitle, listBooks, listEmptyMessage}) {
  return (
    <section className="flex flex-col w-full md:w-1/2 mt-8 md:mt-0">
      <h2 className="text-sm font-semibold">{listTitle}</h2>
      {listBooks ? (
        listBooks.map((book, i) => <DbBookCard book={book} key={i} />)
      ) : (
        <div className="text-xs text-gray-500 mt-2">{listEmptyMessage}</div>
      )}
    </section>
  );
}

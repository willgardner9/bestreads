import supabase from "../../lib/supabase";
import Button from "../Global/Button";
import {useState, useEffect} from "react";
import IconContainer from "./IconContainer";
import CalendarSvg from "./CalendarSvg";
import TagSvg from "./TagSvg";
import PagesSvg from "./PagesSvg";
import IconLabel from "./IconLabel";
import {Rating, RatingView} from "react-simple-star-rating";

export default function BookCard({book}) {
  //  wait for async props to load
  if (!book) return null;
  // if google books api doesnt have enough info on a volume, discard it
  if (
    !book.volumeInfo.authors ||
    !book.volumeInfo.imageLinks ||
    !book.volumeInfo.categories
  )
    return null;

  //  checks if the user has already saved the book to their to read / already read list
  const [bookAlreadySaved, setBookAlreadySaved] = useState(false);
  const [bookRating, setBookRating] = useState(null);
  const [bookAlreadySavedAndRead, setBookAlreadySavedAndRead] = useState(false);

  useEffect(() => {
    const checkIfUserAlreadySavedBook = async () => {
      const {data, error} = await supabase
        .from("books")
        .select()
        .eq("user", supabase.auth.currentUser.id)
        .eq("book_id", book.id);

      if (data.length) {
        setBookAlreadySaved(true);
        setBookRating(data[0].user_rating);
        data[0].finished
          ? setBookAlreadySavedAndRead(true)
          : setBookAlreadySavedAndRead(false);
      }
      if (error) console.error(error);
    };

    checkIfUserAlreadySavedBook();
  }, []);

  //  already read and want to read button states and texts
  const [notFinishedButtonState, setNotFinishedButtonState] =
    useState("default");
  const [finishedButtonState, setFinishedButtonState] = useState("default");
  const [finishedButtonText, setFinishedButtonText] = useState("already read");
  const [notFinishedButtonText, setNotFinishedButtonText] =
    useState("want to read");

  //  adds book to user's read or already read list
  const addBook = async (finishedBoolean, rating) => {
    let finished_year = finishedBoolean ? new Date().getFullYear() : null;

    const {data, error} = await supabase.from("books").insert([
      {
        book_authors: book.volumeInfo.authors,
        book_categories: book.volumeInfo.categories,
        book_desc: book.volumeInfo.description,
        book_id: book.id,
        book_pagecount: book.volumeInfo.pageCount,
        book_published: book.volumeInfo.publishedDate.substring(0, 4),
        book_thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
        book_title: book.volumeInfo.title,
        finished: finishedBoolean || false,
        finished_year,
        user: supabase.auth.currentUser.id,
        user_rating: rating || null,
      },
    ]);
    if (data.length && finishedBoolean) {
      setNotFinishedButtonState("hidden");
      setFinishedButtonState("success");
      setShowStarRatingComponent(false);
      setFinishedButtonText(
        `added to your read list with a ${rating} star rating`
      );
    }
    if (data.length && !finishedBoolean) {
      setFinishedButtonState("hidden");
      setNotFinishedButtonState("success");
      setNotFinishedButtonText("added to your to read list");
    }
    if (error) console.error(error);
  };

  const [showStarRatingComponent, setShowStarRatingComponent] = useState(false);

  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = async (rate) => {
    return await addBook(true, rate);
  };

  //  styles for google books api thumbnail images
  const imageStyles = {
    width: "fit-content",
  };

  //  render book card to ui
  return (
    <section className="pt-12 mb-12 w-full flex flex-col items-center sm:items-start sm:flex-row">
      <img
        style={imageStyles}
        className="h-full sm:pr-4"
        src={book.volumeInfo.imageLinks.smallThumbnail}
      />
      <div className="flex flex-col flex-grow sm:pl-4 mt-4 sm:mt-0">
        <h1 className="text-2xl font-bold">{book.volumeInfo.title}</h1>
        {/* if there is more than one author in the array, list each out with a comma between except for last author */}
        <h2 className="text-base font-semibold mt-2">
          {book.volumeInfo.authors.length >= 2
            ? book.volumeInfo.authors.map((author, i) =>
                i + 1 == book.volumeInfo.authors.length ? author : author + ", "
              )
            : book.volumeInfo.authors}
        </h2>
        <div className="flex flex-col mt-4 sm:flex-row">
          <IconContainer>
            <PagesSvg />
            <IconLabel text={book.volumeInfo.pageCount} />
          </IconContainer>
          <IconContainer>
            <TagSvg />
            <IconLabel text={book.volumeInfo.categories} />
          </IconContainer>
          <IconContainer>
            <CalendarSvg />
            <IconLabel text={book.volumeInfo.publishedDate.substring(0, 4)} />
          </IconContainer>
        </div>
        <p className="leading-7 mt-3">{book.volumeInfo.description}</p>
        {/* if the book is already saved to db, show this in the ui and prevent users re-adding the same books */}
        {bookAlreadySaved ? (
          <div className="flex flex-col sm:flex-row mt-6">
            {/* user has already saved the book to their 'want to read' or 'already read' list */}
            <Button
              text={
                bookAlreadySavedAndRead
                  ? `already read, rated ${bookRating} stars`
                  : "on reading list"
              }
              status={"neutral"}
              onClick={null}
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row mt-6">
            {/* already read button will insert book into table with finished boolean set to true, finished year set to current year, and user rating prompted and added */}
            {showStarRatingComponent ? (
              <div className="flex items-center mr-4">
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  transition
                />
              </div>
            ) : (
              <Button
                text={finishedButtonText}
                onClick={() => setShowStarRatingComponent(true)}
                status={finishedButtonState}
              />
            )}
            {/* want to read button will insert book into table with finished boolean set to false, finished year set to null, and user rating set to null */}
            <Button
              text={notFinishedButtonText}
              onClick={() => addBook(false)}
              status={notFinishedButtonState}
            />
          </div>
        )}
      </div>
    </section>
  );
}

import CalendarSvg from "./CalendarSvg";
import IconContainer from "./IconContainer";
import IconLabel from "./IconLabel";
import PagesSvg from "./PagesSvg";
import TagSvg from "./TagSvg";
import StarSvg from "./StarSvg";
import {Rating, RatingView} from "react-simple-star-rating";
import {useState} from "react";
import supabase from "../../lib/supabase";
import {useRouter} from "next/router";

export default function DbBookCard({book}) {
  const router = useRouter();
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = async (rate) => {
    const {data, error} = await supabase
      .from("books")
      .update({user_rating: rate, finished: true})
      .match({book_id: book.book_id});

    if (data) router.push(`/?read=${book.book_title}`);
    if (error) console.error(error);
  };

  //  styles for google books api thumbnail images
  return (
    <section className="mt-6 mb-4 w-full flex flex-col items-start md:flex-row">
      <img className="h-28 md:pr-4" src={book.book_thumbnail} />
      <div className="flex flex-col flex-grow md:pl-4 mt-4 md:mt-0">
        <h1 className="text-xl font-bold">{book.book_title}</h1>
        {/* if there is more than one author in the array, list each out with a comma between except for last author */}
        <h2 className="text-base font-semibold mt-2">
          {book.book_authors.length >= 2
            ? book.book_authors.map((author, i) =>
                i + 1 == book.book_authors.length ? author : author + ", "
              )
            : book.book_authors}
        </h2>
        <div className="flex flex-col mt-4 md:flex-row">
          {book.user_rating ? (
            <IconContainer>
              <StarSvg />
              <IconLabel text={book.user_rating} />
            </IconContainer>
          ) : (
            ""
          )}
          <IconContainer>
            <PagesSvg />
            <IconLabel text={book.book_pagecount} />
          </IconContainer>
          <IconContainer>
            <TagSvg />
            <IconLabel
              text={book.book_categories.substring(
                2,
                book.book_categories.length - 2
              )}
            />
          </IconContainer>
          <IconContainer>
            <CalendarSvg />
            <IconLabel text={book.book_published} />
          </IconContainer>
        </div>
        {book.finished ? (
          ""
        ) : (
          <>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              className="mt-2"
              size="16"
              transition
            />
          </>
        )}
      </div>
    </section>
  );
}

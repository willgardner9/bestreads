export default function ChallengeProgress({challenge}) {
  //  wait for async props to load
  if (!challenge) return null;

  const progressStyles = {
    width: `${
      challenge.current_books / challenge.target_books >= 1
        ? 100
        : (challenge.current_books / challenge.target_books) * 100
    }%`,
  };

  return (
    <section className="mt-12">
      <h2 className="text-sm font-semibold">
        {challenge.year + " "}reading challenge
      </h2>
      <div className="mt-4 w-full h-8 bg-gray-100">
        <div id="progress-bar" className="h-8" style={progressStyles}></div>
      </div>
      <h3 className="text-xs text-gray-500 mt-2">
        {challenge.current_books} out of {challenge.target_books} books read (
        {Math.round((challenge.current_books / challenge.target_books) * 100)}%)
      </h3>
    </section>
  );
}

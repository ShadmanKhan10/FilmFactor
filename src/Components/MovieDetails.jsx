import React, { useState } from "react";
import like from "../assets/like.png";
import liked from "../assets/liked_clicked.png";
import comment from "../assets/comment.png";
import share from "../assets/share.png";
import closeImg from "../assets/close.png";
import save from "../assets/save.png";
import saved from "../assets/saved.png";
import user from "../assets/user.png";
import next from "../assets/next.png";
import Comments from "./Comments";

export default function MovieDetails({
  showMovieDetailsPopUp,
  setShowMovieDetailsPopUp,
  poster,
  backdropImg,
  movieDescription,
  movieName,
  releaseDate,
  castDetails,
  genres,
  runtime,
}) {
  const [likeClicked, setLikeClicked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [showingAllCast, setShowingAllCast] = useState(false);
  const [castIndex, setCastIndex] = useState(9);

  const handlePopUpDisplay = () => {
    setShowMovieDetailsPopUp((prev) => !prev);
  };
  console.log("Backdrop image is ", backdropImg);

  const processLike = () => {
    setLikeClicked((prev) => !prev);
  };
  const enableCommentInput = () => {
    setShowComment((prev) => !prev);
  };
  const enableMovieSaving = () => {
    setIsMovieSaved((prev) => !prev);
  };
  const toggleCastDisplay = () => {
    if (castIndex === 9) {
      setShowingAllCast((prev) => !prev);
      setCastIndex(castDetails.length);
    } else {
      setShowingAllCast((prev) => !prev);
      setCastIndex(9);
    }
  };

  return (
    <>
      {showMovieDetailsPopUp && (
        <div className="movie-details-pop-up-container">
          <div className="movie-details-pop-up">
            <div className="close-btn-container" onClick={handlePopUpDisplay}>
              <img src={closeImg} alt="close" className="close-icon" />
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${backdropImg}`}
              alt="backdrop"
              className="popUp_backdrop"
            />
            <div className="poster-social-container">
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/original${poster}`}
                alt="backdrop"
                className="popUp_poster"
              />
              <div className="social-icons-container">
                <img
                  src={!likeClicked ? like : liked}
                  onClick={processLike}
                  alt="like"
                  className="social-icon"
                />
                <img
                  src={comment}
                  onClick={enableCommentInput}
                  alt="comment"
                  className="social-icon"
                />
                <img
                  onClick={enableMovieSaving}
                  src={!isMovieSaved ? save : saved}
                  alt="share"
                  className="social-icon"
                />
              </div>
            </div>

            {/* <label className="perticular-movie-title">
              {movieName} [{releaseDate}] [{runtime}]
            </label> */}

            <div className="perticular-movie-description">
              <label>{movieDescription}</label>
            </div>

            {showComment && (
              <div className="comment-input-container">
                <div className="comment-icon-container">
                  <img src={share} alt="search" className="comment-icon" />
                </div>
                <input
                  placeholder="Write your Review"
                  className="comment-input"
                  type="text"
                />
              </div>
            )}
            <div className="movie-details-container">
              <label className="perticular-movie-title">
                {movieName} [{releaseDate}] [{runtime}]
              </label>
              <div className="cast-container">
                {castDetails.map(
                  (cast, index) =>
                    index < castIndex && (
                      <div key={cast.cast_id} className="cast-member">
                        <img
                          src={
                            cast.profile_path
                              ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                              : user
                          }
                          about="actor"
                          className="actor-img"
                        />
                        <label className="actor-name">{cast.name}</label>
                        <label className="actor-character">
                          {cast.character}
                        </label>
                      </div>
                    )
                )}
                <div className="show-more-container">
                  <label className="show-more" onClick={toggleCastDisplay}>
                    {castDetails.length < 9
                      ? ""
                      : castIndex === 9
                      ? "Show More"
                      : "Show Less"}
                  </label>
                  {castDetails.length > 9 && (
                    <img
                      onClick={toggleCastDisplay}
                      src={next}
                      alt="down"
                      className={castIndex === 9 ? "down-icon" : "up-icon"}
                    />
                  )}
                </div>
              </div>
              <Comments />
              <p>...</p>
            </div>
            <div className="genres-container">
              <span className="genre-heading">Genres:</span>
              {genres.map((genre) => (
                <label key={genre.id} className="genre">
                  {genre.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

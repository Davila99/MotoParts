import { useDispatch, useSelector } from "react-redux";
import { addRating } from "../features/rating/ratingSlice";

export const useRatings = () => {
  const dispatch = useDispatch();
  const ratings = useSelector((state) => state.rating.ratings);

  const saveRating = (rating) => dispatch(addRating(rating));

  return { ratings, saveRating };
};

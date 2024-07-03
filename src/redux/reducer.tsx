import { LIKE_FESTIVAL, INTERESTING_FESTIVAL, TOOBAD_FESTIVAL } from "./action";
import { FestivalEvaluation } from "../components/FestivalRead";

const initialState: FestivalEvaluation = {
  like: 0,
  interesting: 0,
  toobad: 0,
};

const festivalEvalReducer = (
  state = initialState,
  action: { type: string }
): FestivalEvaluation => {
  switch (action.type) {
    case LIKE_FESTIVAL:
      return { ...state, like: state.like + 1 };
    case INTERESTING_FESTIVAL:
      return { ...state, interesting: state.interesting + 1 };
    case TOOBAD_FESTIVAL:
      return { ...state, toobad: state.toobad + 1 };
    default:
      return state;
  }
};

export default festivalEvalReducer;

import { Reducer, useReducer } from "react";
import { homeSlides } from "./data";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
// const Slide = lazy(() => import("./Slide"));
import Slide from "./Slide";

export type StateType = {
  // rect: RectType | null;
  // mouseX: number;
  // mouseY: number;
  slideIdx: number;
  // left: number;
};

// type RectType = {
//   left: number;
//   top: number;
//   width: number;
//   height: number;
// };

enum IActionType {
  NEXT = "next",
  PREV = "prev",
}

type ActionType = {
  type: IActionType;
  payload?: number;
};

const slidesReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case IActionType.NEXT: {
      return { ...state, slideIdx: (state.slideIdx + 1) % homeSlides.length };
    }
    case IActionType.PREV: {
      return {
        ...state,
        slideIdx:
          state.slideIdx === 0 ? homeSlides.length - 1 : state.slideIdx! - 1,
      };
    }
    default:
      return state;
  }
};

export default function HomeSlider() {
  const initialState: StateType = {
    slideIdx: 0,
    // rect: null,
    // mouseX: 0,
    // mouseY: 0,
    // left: 0,
  };
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(
    slidesReducer,
    initialState
  );

  return (
    <section className="home__slider">
      <div className="home__slider-wrapper">
        <div className="slides">
          <button onClick={() => dispatch({ type: IActionType.PREV })}>
            <BiSolidRightArrow />
          </button>
          {[...homeSlides, ...homeSlides, ...homeSlides].map((slide, idx) => {
            const offset = homeSlides.length + (state.slideIdx - idx);
            return (
              <Slide key={idx} slide={slide} offset={offset} />
              // <Tilt
              //   key={idx}
              //   perspective={2000}
              //   glareEnable={true}
              //   glareMaxOpacity={0.45}
              //   scale={1.02}
              //   gyroscope={true}
              // >

              // </Tilt>
            );
          })}
          <button onClick={() => dispatch({ type: IActionType.NEXT })}>
            <BiSolidLeftArrow />
          </button>
        </div>
      </div>
    </section>
  );
}

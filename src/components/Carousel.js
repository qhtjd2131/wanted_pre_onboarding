import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./Carousel.css";
import image_0 from "../images/0.jpg";
import image_1 from "../images/1.jpg";
import image_2 from "../images/2.jpg";
import image_3 from "../images/3.jpg";
import image_4 from "../images/4.jpg";
import image_5 from "../images/5.jpg";
import image_6 from "../images/6.jpg";
import image_7 from "../images/7.jpg";
import image_8 from "../images/8.jpg";

// data
const carousel_data = {
  0: {
    src: image_0,
    title: "성장하는 개발자가 되려면?",
    subTitle: "OOO 검색하지 말것!",
  },
  1: {
    src: image_1,
    title: "개발자 성장 비결 공개!",
    subTitle: "Velog, 글쓰는 개발자들의 이야기",
  },
  2: {
    src: image_2,
    title: "2022년 달라지는 노동법령",
    subTitle: "노무관리 쟁점 한 눈에 파악하기",
  },
  3: {
    src: image_3,
    title: "해, 커리어 EP 02 공개",
    subTitle: "마지막 관문 2라운드의 승자는?",
  },
  4: {
    src: image_4,
    title: "개발자 되고싶은 분들!?",
    subTitle: "프론트엔드 무료 교육과정 참여하기",
  },
  5: {
    src: image_5,
    title: "성과를 내는 마케팅",
    subTitle: "실제 사례를 공개합니다!",
  },
  6: {
    src: image_6,
    title: "포트폴리오를 부탁해!",
    subTitle: "디자이너의 포폴 살펴보기",
  },
  7: {
    src: image_7,
    title: "UX 디자이너의 커리어 설계",
    subTitle: "브랜드 가치를 더하는 디자인",
  },
  8: {
    src: image_8,
    title: "마케팅 주니어를 찾습니다",
    subTitle: "기업 과제 풀고 취업까지 한번에!",
  },
};

// Child Components
const Information = ({ title, subTitle, isCenter }) => {
  return (
    <div
      className={
        "information-box " + (isCenter ? "information-box-center" : "")
      }
    >
      <div className="info-title">{title}</div>
      <div className="info-subtitle">{subTitle}</div>
      <div className="info-line"></div>
      <div className="info-link">
        <a src=""> {"바로가기 >"} </a>
      </div>
    </div>
  );
};

const LeftButton = ({ ClickHandler }) => {
  return (
    <div className="button-wrapper button-left">
      <button onClick={ClickHandler}>{"<"}</button>
    </div>
  );
};

const RightButton = ({ ClickHandler }) => {
  return (
    <div className="button-wrapper button-right">
      <button onClick={ClickHandler}>{">"}</button>
    </div>
  );
};

/* ----------------------------------------------------*/

//Main Component (Carousel)
const Carousel = () => {
  const [positionState, setPositionState] = useState({
    current: 0,
  });
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState("none");
  const [pointerOnSlider, setPointerOnSlider] = useState(false);
  const sliderRef = useRef();

  const CAROUSEL_DATA_LENGTH = Object.keys(carousel_data).length;

  let timer = null;

  //오른쪽 슬라이딩 효과 끝나고 실행되는 callback function
  const transitionEndRightCallBack = useCallback(() => {
    setPositionState((positionState) => ({
      current: calculateIndex(positionState.current + 1),
    }));
    sliderRef.current.style = "transform : translateX(0%);";
    setIsSliding(false);
  }, []);

  //왼쪽 슬라이딩 효과 끝나고 실행되는 callback function
  const transitionEndLeftCallBack = useCallback(() => {
    setPositionState((positionState) => ({
      current: calculateIndex(positionState.current - 1),
    }));
    sliderRef.current.style = "transform : translateX(0%);";
    setIsSliding(false);
  }, []);

  //왼쪽 버튼 클릭 핸들러
  const leftButtonClickHandler = useCallback(() => {
    clearTimeout(timer);

    if (!isSliding) {
      setSlideDirection("left");
      setIsSliding(true);
      sliderRef.current.style =
        "transform : translateX(88%); transition: transform 0.4s";
    }
  }, []);

  //오른쪽 버튼 클릭 핸들러
  const rightButtonClickHandler = useCallback(() => {
    clearTimeout(timer);

    if (!isSliding) {
      setSlideDirection("right");
      setIsSliding(true);
      sliderRef.current.style =
        "transform : translateX(-88%); transition:0.4s ";
    }
  }, []);

  // 자동 슬라이더 동작의 한 tick (오른쪽으로 슬라이딩)
  const stepForward = () => {
    setSlideDirection("right");
    setIsSliding(true);
    sliderRef.current.style = "transform : translateX(-88%); transition:0.4s ";
  };

  // 타이머 on 하고, 자동 슬라이더 동작 함수 연결
  const activateTimer = () => {
    timer = setTimeout(() => {
      stepForward();
    }, 2000);
  };

  //transition end event 처리 useEffect
  useEffect(() => {
    console.log("useeffect");
    if (slideDirection === "left") {
      sliderRef.current.addEventListener(
        "webkitTransitionEnd",
        transitionEndLeftCallBack,
        false
      );
    } else if (slideDirection === "right") {
      sliderRef.current.addEventListener(
        "webkitTransitionEnd",
        transitionEndRightCallBack,
        false
      );
    }

    return () => {
      sliderRef.current.removeEventListener(
        "webkitTransitionEnd",
        transitionEndRightCallBack,
        false
      );
      sliderRef.current.removeEventListener(
        "webkitTransitionEnd",
        transitionEndLeftCallBack,
        false
      );
    };
  }, [slideDirection]);

  //timer 실행 및 처리 useEffect
  useEffect(() => {
    if (!pointerOnSlider) {
      activateTimer();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [positionState, pointerOnSlider]);


  //마우스 포인터가 캐러셀 위에 있는경우 자동슬라이드 x, 
  // 캐러셀 밖에있는경우 다시 자동슬라이드 o
  const mouseEnterHandler = useCallback(() => {
    setPointerOnSlider(true);
  }, []);

  const mouseLeaveHandler = useCallback(() => {
    setPointerOnSlider(false);
  }, []);


  // 범위를 벗어난 index 계산 함수
  const calculateIndex = (index) => {
    let calculated_index = 0;

    if (index > CAROUSEL_DATA_LENGTH - 1) {
      calculated_index = index - CAROUSEL_DATA_LENGTH;
    } else if (index < 0) {
      calculated_index = CAROUSEL_DATA_LENGTH + index;
    } else {
      calculated_index = index;
    }
    return calculated_index;
  };

  return (
    <section className="carousel-wrapper">
      <LeftButton ClickHandler={leftButtonClickHandler} />
      <RightButton ClickHandler={rightButtonClickHandler} />
      <div
        className="slide-wrapper"
        ref={sliderRef}
        onMouseEnter={() => {
          mouseEnterHandler();
        }}
        onMouseLeave={() => {
          mouseLeaveHandler();
        }}
      >
        {/* 슬라이드 효과를 위한 마지막 이미지 2개 */}
        {Object.keys(carousel_data)
          .reverse()
          .slice(0, 2)
          .reverse()
          .map((i, index) => {
            const item_index = calculateIndex(
              positionState.current - 2 + index
            );

            return (
              <div className="slide-item-box" key={index}>
                <img src={carousel_data[item_index].src} alt={"img" + index} />
                <Information
                  title={carousel_data[item_index].title}
                  subTitle={carousel_data[item_index].subTitle}
                />
              </div>
            );
          })}

        {/* 전체 이미지 */}
        {Object.keys(carousel_data).map((i, index) => {
          const item_index = calculateIndex(positionState.current + index);
          return (
            <div
              className={
                "slide-item-box " + (index === 0 ? "center-item-box" : "")
              }
              key={index}
            >
              <img src={carousel_data[item_index].src} alt={"img" + index} />
              <Information
                title={carousel_data[item_index].title}
                subTitle={carousel_data[item_index].subTitle}
                isCenter={index === 0 ? true : false}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;

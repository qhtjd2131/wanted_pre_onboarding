import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Carousel.css";
import { carousel_data } from "./carousel_data";
import Information from "./Information";
import { RightButton, LeftButton } from "./Button";

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

  //하나의 슬라이드 너비 : 88%, Carousel.css 파일과 동기화 필요.
  const CAROUSEL_SLIDE_WIDTH = "88%";

  let timer = useRef(null);

  // 범위를 벗어난 index 계산 함수
  const calculateIndex = useCallback(
    (index) => {
      let calculated_index = 0;

      if (index > CAROUSEL_DATA_LENGTH - 1) {
        calculated_index = index - CAROUSEL_DATA_LENGTH;
      } else if (index < 0) {
        calculated_index = CAROUSEL_DATA_LENGTH + index;
      } else {
        calculated_index = index;
      }
      return calculated_index;
    },
    [CAROUSEL_DATA_LENGTH]
  );

  //왼쪽 버튼 클릭 핸들러
  const leftButtonClickHandler = useCallback(() => {
    clearTimeout(timer.current);

    if (!isSliding) {
      setSlideDirection("left");
      setIsSliding(true);
      sliderRef.current.style = `transform : translateX(${CAROUSEL_SLIDE_WIDTH}); transition: transform 0.4s`;
    }
  }, [isSliding]);

  //오른쪽 버튼 클릭 핸들러
  const rightButtonClickHandler = useCallback(() => {
    clearTimeout(timer.current);

    if (!isSliding) {
      setSlideDirection("right");
      setIsSliding(true);
      sliderRef.current.style = `transform : translateX(-${CAROUSEL_SLIDE_WIDTH}); transition:0.4s`;
    }
  }, [isSliding]);

  // 자동 슬라이더 동작의 한 tick (오른쪽으로 슬라이딩)
  const stepForward = () => {
    setSlideDirection("right");
    setIsSliding(true);
    sliderRef.current.style = "transform : translateX(-88%); transition:0.4s ";
  };

  // 타이머 on 하고, 자동 슬라이더 동작 함수 연결
  const activateTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      stepForward();
    }, 2000);
  }, []);

  //transition end event 처리 useEffect
  useEffect(() => {
    let tempRef = sliderRef.current;

    //오른쪽 슬라이딩 효과 끝나고 실행되는 callback function
    const transitionEndRightCallBack = () => {
      setPositionState((positionState) => ({
        current: calculateIndex(positionState.current + 1),
      }));
      tempRef.style = "transform : translateX(0%);";
      setIsSliding(false);
    };

    //왼쪽 슬라이딩 효과 끝나고 실행되는 callback function
    const transitionEndLeftCallBack = () => {
      setPositionState((positionState) => ({
        current: calculateIndex(positionState.current - 1),
      }));
      tempRef.style = "transform : translateX(0%);";
      setIsSliding(false);
    };
    if (slideDirection === "left") {
      tempRef.addEventListener(
        "webkitTransitionEnd",
        transitionEndLeftCallBack,
        false
      );
    } else if (slideDirection === "right") {
      tempRef.addEventListener(
        "webkitTransitionEnd",
        transitionEndRightCallBack,
        false
      );
    }

    return () => {
      tempRef.removeEventListener(
        "webkitTransitionEnd",
        transitionEndRightCallBack,
        false
      );
      tempRef.removeEventListener(
        "webkitTransitionEnd",
        transitionEndLeftCallBack,
        false
      );
    };
  }, [slideDirection, calculateIndex]);

  //timer 실행 및 처리 useEffect
  useEffect(() => {
    if (!pointerOnSlider) {
      activateTimer();
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [positionState, pointerOnSlider, activateTimer]);

  //마우스 포인터가 캐러셀 위에 있는경우 자동슬라이드 x,
  // 캐러셀 밖에있는경우 다시 자동슬라이드 o
  const mouseEnterHandler = useCallback(() => {
    setPointerOnSlider(true);
  }, []);

  const mouseLeaveHandler = useCallback(() => {
    setPointerOnSlider(false);
  }, []);

  return (
    <section className="carousel-wrapper">
      {/* 캐러셀 조작 버튼 */}
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
        {/* 슬라이드 효과를 위한 마지막 이미지 2개, (7, 8) */}
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

        {/* 전체 이미지 (0 ~ 8) */}
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

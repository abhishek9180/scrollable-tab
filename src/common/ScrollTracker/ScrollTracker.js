import React, { useRef, useState, useEffect } from "react";
import "./ScrollTracker.css";

const ScrollTracker = (props) => {
  const DELAY = 200;
  const SCROLL_STEP = 100;
  let timerId;
  const scrollContainer = useRef();
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(false);

  useEffect(() => {
    handleScroll({ target: scrollContainer.current });
  }, [props.shoulScrollChecked]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  });

  const handleWindowResize = (e) => {
    debounceFunction(handleScroll, DELAY, {
      target: scrollContainer.current,
    });
  };

  const debounceFunction = (func, delay, args) => {
    // Cancels the setTimeout method execution
    clearTimeout(timerId);
    if (args.persist) {
      args.persist();
    }
    // Executes the func after delay time.
    timerId = setTimeout(() => func(args), delay);
  };

  const handleScroll = (e) => {
    let element = e.target;
    let showLeft = false,
      showRight = false;
    if (element.scrollWidth > element.clientWidth) {
      if (element.scrollLeft !== 0) {
        // start scroll,
        showLeft = true;
      }
      if (
        parseInt(element.scrollWidth - element.scrollLeft) !==
        element.clientWidth
      ) {
        // end scroll
        showRight = true;
      }
    }
    setShowLeftChevron(showLeft);
    setShowRightChevron(showRight);
  };

  const scrollLeft = () => {
    if (scrollContainer.current.scrollLeft === 0) return;
    if (scrollContainer.current.scrollLeft - SCROLL_STEP < 0) {
      scrollContainer.current.scrollLeft = 0;
    } else {
      scrollContainer.current.scrollLeft -= SCROLL_STEP;
    }
  };

  const scrollRight = () => {
    if (
      scrollContainer.current.scrollLeft === scrollContainer.current.scrollWidth
    )
      return;
    if (
      scrollContainer.current.scrollLeft + SCROLL_STEP >
      scrollContainer.current.scrollWidth
    ) {
      scrollContainer.current.scrollLeft = scrollContainer.current.scrollWidth;
    } else {
      scrollContainer.current.scrollLeft += SCROLL_STEP;
    }
  };

  return (
    <div
      className="scroll-container"
      onScroll={(e) => debounceFunction(handleScroll, DELAY, e)}
    >
      {showLeftChevron && (
        <div className="scroll-arrow">
          <button onClick={scrollLeft}>&lt;</button>
        </div>
      )}
      <div ref={scrollContainer} className="scrollable-content">
        {props.children}
      </div>
      {showRightChevron && (
        <div className="scroll-arrow scroll-right-arrow">
          <button onClick={scrollRight}>&gt;</button>
        </div>
      )}
    </div>
  );
};

export default ScrollTracker;

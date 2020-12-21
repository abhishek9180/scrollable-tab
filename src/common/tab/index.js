import React, { useState } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Tab from "./Tab";
import ScrollTracker from "../ScrollTracker/ScrollTracker";
import "./style.css";
import "./palette.css";

const Tabs = (props) => {
  const [shoulScrollChecked, setShouldScrollChecked] = useState(
    Number.MIN_SAFE_INTEGER
  );

  const addTabListener = () => {
    props.addTab();
    setShouldScrollChecked(shoulScrollChecked + 1);
  };

  const { tabs } = props;

  return (
    <>
      <div className="react-tabs-container">
        <ScrollTracker shoulScrollChecked={shoulScrollChecked}>
          {tabs.map((tab, i) => (
            <Tab
              key={tab.id}
              index={i}
              id={tab.id}
              content={tab.content}
              moveTab={props.moveTab}
              selectTab={props.selectTab}
              closeTab={props.closeTab}
              active={tab.active}
            />
          ))}
        </ScrollTracker>
        <div className="react-tabs-child react-tabs-right-child">
          <button
            disabled={tabs.length >= props.maxAllowedTabs}
            onClick={addTabListener}
          >
            +
          </button>
        </div>
      </div>
      <div className="react-tab-content">{props.children}</div>
    </>
  );
};

export default DragDropContext(HTML5Backend)(Tabs);

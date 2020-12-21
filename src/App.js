import React, { Component } from "react";
import update from "immutability-helper";
import Tabs from "./common/tab/index";
import Dialog from "./common/Dialog/Dialog";
import "./App.css";

class App extends Component {
  MAX_ALLOWED_TABS = 10;
  constructor(props) {
    super(props);
    this.moveTab = this.moveTab.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.closedTab = this.closedTab.bind(this);
    this.addTab = this.addTab.bind(this);
    this.onTabClose = this.onTabClose.bind(this);
    this.handleDialogOk = this.handleDialogOk.bind(this);
    this.handleDialogCancel = this.handleDialogCancel.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.state = {
      showDialog: false,
      removedTab: null,
      tabs: [
        {
          id: 1,
          content: "Tab1",
          active: true,
          display: <h3>Tab1 Contents</h3>,
        },
        {
          id: 2,
          content: "Tab2",
          display: <h3>Tab2 Contents</h3>,
        },
        {
          id: 3,
          content: "Tab3",
          display: <h3>Tab3 Contents</h3>,
        },
      ],
    };
  }

  onTabClose(removedIndex, removedID) {
    this.setState({
      removedTab: {
        removedIndex,
        removedID,
      },
    });
    this.toggleDialog(true);
  }

  handleDialogOk(removedIndex, removedID) {
    const { removedTab } = this.state;
    if (removedTab) {
      this.closedTab(removedTab.removedIndex, removedTab.removedID);
    }
    this.toggleDialog(false);
  }

  handleDialogCancel() {
    this.toggleDialog(false);
  }

  toggleDialog(status) {
    this.setState({ showDialog: status });
  }

  moveTab(dragIndex, hoverIndex) {
    const { tabs } = this.state;
    const dragTab = tabs[dragIndex];

    this.setState(
      update(this.state, {
        tabs: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragTab],
          ],
        },
      })
    );
  }

  selectTab(selectedIndex, selectedID) {
    this.setState((state, props) => {
      const newTabs = state.tabs.map((tab) => ({
        ...tab,
        active: tab.id === selectedID,
      }));
      return { tabs: newTabs };
    });
  }

  closedTab(removedIndex, removedID) {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.splice(removedIndex, 1);

      if (state.tabs[removedIndex].active && newTabs.length !== 0) {
        // automatically select another tab if needed
        const newActive = removedIndex === 0 ? 0 : removedIndex - 1;
        newTabs[newActive].active = true;
      }

      return { tabs: newTabs };
    });
  }

  addTab() {
    this.setState((state, props) => {
      let newTabs = [...state.tabs];
      newTabs.push({
        id: newTabs.length + 1,
        content: `Tab${newTabs.length + 1}`,
        display: <h3>Tab{newTabs.length + 1} Contents</h3>,
      });

      return { tabs: newTabs };
    });
  }
  render() {
    const activeTab = this.state.tabs.filter((tab) => tab.active === true);
    return (
      <div className="container">
        <div className="page-header">
          <h4>Demo Container</h4>
        </div>
        <Tabs
          moveTab={this.moveTab}
          selectTab={this.selectTab}
          closeTab={this.onTabClose}
          addTab={this.addTab}
          tabs={this.state.tabs}
          maxAllowedTabs={this.MAX_ALLOWED_TABS}
        >
          {activeTab.length !== 0 ? activeTab[0].display : ""}
        </Tabs>
        {this.state.showDialog && (
          <Dialog
            dialogText="Are you sure?"
            onOk={this.handleDialogOk}
            onCancel={this.handleDialogCancel}
            additionalData={this.state.removedTab}
          />
        )}
      </div>
    );
  }
}

export default App;

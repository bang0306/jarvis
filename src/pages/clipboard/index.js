import React, { Component } from "react";
import { ItemCreator } from "./item-creator";
import { ItemList } from "./item-list";
import {
  getClipboardList,
  createClipboardItem,
  deleteClipboardItem
} from "../../utils/request";
import { Spin } from "antd";
const { clipboard } = navigator;
export class Clipboard extends Component {
  state = {
    loading: true,
    newClip: {
      content: "",
      desc: ""
    },
    list: []
  };

  onNewContentChange = ({ target }) =>
    this.setState({
      newClip: {
        ...this.state.newClip,
        content: target.value
      }
    });

  onNewDescChange = ({ target }) =>
    this.setState({
      newClip: {
        ...this.state.newClip,
        desc: target.value
      }
    });
  onCreateNewItem = async () => {
    const newContent = await clipboard.readText();
    this.setState({
      newClip: {
        ...this.state.newClip,
        content: newContent
      },
      loading: true
    });
    createClipboardItem({
      content: newContent,
      desc: this.state.newClip.desc
    })
      .then(() => getClipboardList())
      .then(list => this.setState({ list, loading: false }));
  };

  onRemoveItem = id => {
    this.setState({ loading: true });
    deleteClipboardItem(id)
      .then(() => getClipboardList())
      .then(list =>
        this.setState({
          list,
          loading: false
        })
      );
  };
  // this.setState({
  //   list: this.state.list.filter(item => item.id !== id)
  // });

  componentDidMount() {
    getClipboardList().then(list => {
      this.setState({
        list,
        loading: false
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading && <Spin />}
        <ItemCreator
          {...this.state.newClip}
          onContentChange={this.onNewContentChange}
          onDescChange={this.onNewDescChange}
          onCreate={this.onCreateNewItem}
        />
        <ItemList list={this.state.list} onRemoveItem={this.onRemoveItem} />
      </div>
    );
  }
}

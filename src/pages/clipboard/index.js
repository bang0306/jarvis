import React, { Component } from "react";
import { ItemCreator } from "./item-creator";
import { ItemList } from "./item-list";
import {
  getClipboardList,
  createClipboardItem,
  deleteClipboardItem
} from "../../utils/request";
import { Spin, Input } from "antd";
const { clipboard } = navigator;
export class Clipboard extends Component {
  state = {
    loading: true,
    newClip: {
      content: "",
      desc: ""
    },
    list: [],
    keyword: ""
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
  onKeywordChange = ({ target }) => this.setState({ keyword: target.value });
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
        {this.state.loading ? (
          <Spin tip="loading" />
        ) : (
          <>
            <ItemCreator
              {...this.state.newClip}
              onContentChange={this.onNewContentChange}
              onDescChange={this.onNewDescChange}
              onCreate={this.onCreateNewItem}
            />
            <Input value={this.state.keyword} onChange={this.onKeywordChange} />
            <ItemList
              list={this.state.list.filter(
                item =>
                  item.content.includes(this.state.keyword) ||
                  item.desc.includes(this.state.keyword)
              )}
              onRemoveItem={this.onRemoveItem}
            />
          </>
        )}
      </div>
    );
  }
}

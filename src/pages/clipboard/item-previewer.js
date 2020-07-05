import React from "react";
import { Button } from "antd";

const { clipboard } = window.require("electron");

export const ItemPreviewer = ({ id, content, desc, onDelete }) => (
  <div>
    <div>content: {content}</div>
    <div>desc: {desc}</div>
    <Button
      type="primary"
      onClick={() => {
        clipboard.writeText(content);
      }}
    >
      copy
    </Button>
    <Button type="danger" onClick={() => onDelete(id)}>
      delete
    </Button>
  </div>
);

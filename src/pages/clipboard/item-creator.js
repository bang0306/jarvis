import React from "react";
import { Form, Input, Button } from "antd";
export const ItemCreator = ({
  content,
  description,
  onContentChange,
  onDescChange,
  onCreate
}) => {
  return (
    <div>
      <Form>
        <Input
          value={content}
          onChange={onContentChange}
          placeholder="clipboard text content"
        />
        <Input
          value={description}
          onChange={onDescChange}
          placeholder="put description here"
        />
        <Button type="primary" onClick={onCreate}>
          Create
        </Button>
      </Form>
    </div>
  );
};

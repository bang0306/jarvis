import React from "react";
import { ItemPreviewer } from "./item-previewer";

export const ItemList = ({ list, onRemoveItem }) => (
  <div>
    {list.map(({ content, desc, id }) => (
      <ItemPreviewer
        key={id}
        {...{ content, desc, id }}
        onDelete={onRemoveItem}
      />
    ))}
  </div>
);

import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdDiscount } from "react-icons/md";

function DiscountRow({ item, handleClick, ...props }) {
  return (
    //TODO: Set Colors for selected and unselected
    <tr style={{ backgroundColor: props.selected ? "green" : null }}>
      {!props.noId && <td style={{ paddingRight: 10 }}>{item._id}</td>}

      <td>{item.title}</td>
      <td>{item.price || "None"}</td>
      <td>{item.discount || "None"}</td>
      <td>
        {item.discount
          ? item.price - (item.price * item.discount) / 100
          : item.price}
      </td>
      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            fontSize: 20,
          }}
        >
          <MdDiscount onClick={() => handleClick("edit", item)} />
          <RxCrossCircled onClick={() => handleClick("delete", item)} />
        </div>
      </td>
    </tr>
  );
}

export default DiscountRow;

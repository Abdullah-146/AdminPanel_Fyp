import React from "react";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AiOutlineEye, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiEdit, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { baseURL } from "../api/axios";
import placeholderAvatar from "../assets/placeholderAvatar.jpg";
import { Select } from "@mui/material";
import SelectableRow from "./SelectableRow";
import DiscountRow from "./DiscountRow";

function DiscountTable(props) {
    

  return (
    <table style={{ overflowY: "scroll" }}>
      <thead style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
        {/* <td colSpan={0}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 10,
              fontSize: 20,
            }}
          >
            <FiFilter />
            <AiOutlineDown fontSize={15} />
          </div>
        </td> */}
      </thead>
      <tbody>
        <tr>
          <th style={{ display: "flex", alignItems: "center", gap: 10 }}>
            Title
            <div
              style={{ display: "flex", flexDirection: "column", fontSize: 10 }}
            >
              <AiOutlineUp />
              <AiOutlineDown />
            </div>
          </th>
          <th>Price</th>
          <th>Discount</th>
          <th>Total Price</th>
        </tr>
        {props.data.map((item, index) => (
          <DiscountRow
            selected = {props.selected._id === item._id}
            noId
            key={item._id.toString()}
            item={item}
            handleClick={props.handleClick}
            handleQuantity={props.handleQuantity}
          />
        ))}
      </tbody>
      {/* <tfoot style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
        <td
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          colSpan={0}
        >
          <p>Previous</p>
          <p>1-1 of 7</p>
          <p>Next</p>
        </td>
      </tfoot> */}
    </table>
  );
}

export default DiscountTable;

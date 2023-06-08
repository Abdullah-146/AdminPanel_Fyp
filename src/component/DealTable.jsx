import React from "react";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AiOutlineEye, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiEdit, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { baseURL } from "../api/axios";
import ImagePlaceHolder from "../assets/ImagePlaceHolder.png";

function DealTable(props) {
  const handleClick = (action, item) => {
    props.handleClick(action, item);
  };

  return (
    <table style={{ overflowY: "scroll" }}>
      <thead style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
        <td colSpan={0}>
          <p style={{ color: "red" }}>{props.loading && "Loading..."}</p>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
            }}
          >
            <FiFilter />
            <AiOutlineDown fontSize={15} />
          </div> */}
        </td>
      </thead>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th style={{ display: "flex", alignItems: "center", gap: 10 }}>
            TITLE
            <div
              style={{ display: "flex", flexDirection: "column", fontSize: 10 }}
            >
              <AiOutlineUp />
              <AiOutlineDown />
            </div>
          </th>
          <th>PRICE</th>
        </tr>
        {props.data.map((item, index) => (
          <tr key={item._id.toString()}>
            <td style={{ paddingRight: 10 }}>{item._id}</td>
            <td>
              <img
                wigdth={50}
                height={50}
                style={{ borderRadius: 100 }}
                src={item.image || ImagePlaceHolder}
                alt=""
              />
            </td>
            <td>{item.title}</td>
            <td>{item.price}</td>

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
                <AiOutlineEye onClick={() => handleClick("view", item)} />
                <FiEdit onClick={() => handleClick("edit", item)} />
                <RiDeleteBin6Line onClick={() => handleClick("delete", item)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DealTable;

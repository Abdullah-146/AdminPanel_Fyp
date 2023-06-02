import React from "react";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AiOutlineEye, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiEdit, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {baseURL} from "../api/axios"
import placeholderAvatar from "../assets/placeholderAvatar.jpg"

function CategoryTable(props) {


    const handleClick = (action,item) => {
        console.log(item);
        props.handleClick(action, item);
    }


  return (
    <table style={{ overflowY: "scroll" }}>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th style={{ display: "flex", alignItems: "center", gap: 10 }}>
            Category
            <div
              style={{ display: "flex", flexDirection: "column", fontSize: 10 }}
            >
              <AiOutlineUp />
              <AiOutlineDown />
            </div>
          </th>
        </tr>
        {props.data.map((item, index) => 
            <tr key={item._id.toString()}>
            <td style={{paddingRight:10}}>{item._id}</td>
            <td>
              <img
                wigdth={30}
                height={30}
                style={{ borderRadius: 100 }}
                src={
                  item.avatar || item.image || placeholderAvatar
                }
                alt=""
              />
            </td>
            <td>{item.title}</td>  
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
                <FiEdit onClick={()=>handleClick('edit',item)} />
                <RiDeleteBin6Line onClick={()=>handleClick('delete',item)}  />
              </div>
            </td>
          </tr>
        
        )}
      </tbody>
    </table>
  );
}

export default CategoryTable;


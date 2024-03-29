import React from "react";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AiOutlineEye, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiEdit, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { baseURL } from "../api/axios";
import placeholderAvatar from "../assets/placeholderAvatar.jpg";
import { useNavigate } from "react-router-dom";

function Table2(props) {

    const navigate = useNavigate();

    const handleClick = (action,itemId) => {
      if (action === "view") {
        navigate(`/OrderDetails/${itemId}`);
      }
      else{

        props.handleClick(action,itemId);
      }
    }

    const handleNext = () => {
        props.handleNext();
    }

    const handlePrevious = () => {
        props.handlePrevious();
    }

    const handleLoadMore = () => {
      props.handleLoadMore();
    };
  


  return (
    <table style={{ overflowY: "scroll" }}>
      <thead style={{ paddingTop: 15, paddingBottom: 15,width:"600%",  cursor:"pointer", display:"flex", justifyContent:"flex-end",alignItems:"center"  }}>
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
      </thead>
      <tbody>
        <tr>
          <th style={{ display: "flex", alignItems: "center", gap: 10 }}>
            User
            {/* <div
              style={{ display: "flex", flexDirection: "column", fontSize: 10 }}
            >
              <AiOutlineUp />
              <AiOutlineDown />
            </div> */}
          </th>
          <th>Order</th>
          <th>Total</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        {props.data.map((item, index) => (
          <tr key={item._id.toString()}>
            <td>{item.userId.name}</td>
            <td style={{ paddingRight: 10 }}>{item._id}</td>
            <td>{item.total}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td>
              <p
                style={{
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 20,
                  color: "black",
                  display: "inline-block",
                  backgroundColor:
                    item.status === "processing"
                      ? "#FDE047"
                      : item.status === "delivered"
                      ? "#22C55E"
                      : "#7F1D1D",
                }}
              >
                {item.status}
              </p>
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
                <AiOutlineEye onClick={()=>handleClick('view',item._id)} />
                <select style={{background:"transparent",padding:"0.4rem"}} onChange={(e)=>props.handleStatus(item._id,e.target.value)} >
                  <option>Select</option>
                  <option style={{color:"black",fontWeight:"bold"}}  value={"delivered"}>delivered</option>
                  <option style={{color:"black",fontWeight:"bold"}} value={"cancelled"}>cancelled</option>
                </select>
                {/* <FiEdit onClick={()=>handleClick('edit',item._id)} />
                <RiDeleteBin6Line onClick={()=>handleClick('delete',item._id)}  /> */}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
        {!props.search ? (
          <td
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            colSpan={0}
          >
            {props.hasPreviousPage && <p onClick={handlePrevious}>Previous</p>}
            {"    "}
            {props.hasNextPage && <p onClick={handleNext}>Next</p>}
          </td>
        ) : props.loadMore && !props.loading ? (
          <p onClick={handleLoadMore}>Load More</p>
        ) : null}
      </tfoot>
    </table>
  );
}

export default Table2;

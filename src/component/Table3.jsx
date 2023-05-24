import React from "react";
import ArrowUp from "../assets/ArrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import { AiOutlineEye, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FiEdit, FiFilter } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { baseURL } from "../api/axios"
import placeholderAvatar from "../assets/placeholderAvatar.jpg"

function Table3(props) {


    const handleClick = (action,id) => {
       if(action === "view"){
        props.view(id)
       }
        else if(action === "edit"){
        props.edit(id)
        }
        else if(action === "delete"){
        props.delete(id)
        }
    }


    return (
        <table style={{ overflowY: "scroll" }}>
            <thead style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
                <td colSpan={0}>
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
                </td>
            </thead>
            <tbody>
                <tr>
                    <th>
                        ID
                    </th>
                    <th style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        Title
                        <div
                            style={{ display: "flex", flexDirection: "column", fontSize: 10 }}
                        >
                            <AiOutlineUp />
                            <AiOutlineDown />
                        </div>
                    </th>
                    <th>Tags</th>
                    <th>Last Updated</th>
                    <th>Price</th>
                </tr>
                {props.data.map((item, index) =>
                    <tr key={item._id.toString()}>
                        <td style={{ paddingRight: 10 }}>{item._id}</td>

                        <td>{item.title}</td>
                        <td>{item.price || 'None'}</td>
                        <td>{item.category.join(', ')}</td>
                        <td>{
                            new Date(item.updatedAt).toLocaleDateString()
                        }</td>
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
                                <AiOutlineEye onClick={() => handleClick('view', item._id)} />
                                <FiEdit onClick={() => handleClick('edit',item._id)} />
                                <RiDeleteBin6Line onClick={() => handleClick('delete',item._id)} />
                            </div>
                        </td>
                    </tr>

                )}
            </tbody>
            <tfoot style={{ paddingTop: 15, paddingBottom: 15, cursor: "pointer" }}>
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
            </tfoot>
        </table>
    );
}

export default Table3;

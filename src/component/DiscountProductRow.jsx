import React from 'react'
import { MdAdd } from 'react-icons/md'
import {AiOutlineAim, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import {ImBin} from "react-icons/im"

function DiscountProductRow({item,handleClick,...props}) {

    const handleSelect = () => {
        handleClick(item)
    }
    const handleQuantity = (action) => {
        props.handleQuantity(item, action)
    }

  return (
    //TODO: Set Colors for selected and unselected
    <tr style={{backgroundColor:props.selected?"green": null }}>
        {!props.noId && <td style={{ paddingRight: 10 }}>{item._id}</td>}

        <td>{item.title}</td>
        <td>{item.price || 'None'}</td>
        <td>{item.discount || 'None'}</td>
        <td>{
            item.discount ? item.price - (item.price * item.discount / 100) : item.price
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
                {props.selected &&
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:10, maxWidth:70, minWidth:70}}>
                    <AiOutlineMinus style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}} onClick={()=>handleQuantity('minus')} />
                    <p style={{flex:1, textAlign:"center"}}>{props.quantity || 1}</p>
                    <AiOutlinePlus style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}} onClick={()=>handleQuantity('plus')} />
                </div>
                
                }
                <div onClick={handleSelect} style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}}>
                {props.selected ? <ImBin />  :<MdAdd />}
                </div>
            </div>
        </td>
    </tr>
  )
}

export default DiscountProductRow
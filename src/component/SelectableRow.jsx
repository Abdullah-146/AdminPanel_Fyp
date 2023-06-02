import React from 'react'
import { MdAdd } from 'react-icons/md'
import {AiOutlineAim, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import {ImBin} from "react-icons/im"

function SelectableRow({item,handleClick,...props}) {

    const [selected, setSelected] = React.useState(false)
    const [quantity, setQuantity] = React.useState(1)

    const handleSelect = () => {
        if(selected){
            setQuantity(1)
        }
        setSelected(!selected)

        handleClick(item)
    }
    const handleQuantity = (action) => {
        if(action === "plus"){
            setQuantity(quantity+1)
        }
        else if(action === "minus"){
            if(quantity > 1){
                setQuantity(quantity-1)
            }
        }
        props.handleQuantity(item, action)
    }

  return (
    //TODO: Set Colors for selected and unselected
    <tr style={{backgroundColor:selected?"green": null }}>
        <td style={{ paddingRight: 10 }}>{item._id}</td>

        <td>{item.title}</td>
        <td>{item.price || 'None'}</td>
        <td>{item.discount}</td>
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
                {selected &&
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:10, maxWidth:70, minWidth:70}}>
                    <AiOutlineMinus style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}} onClick={()=>handleQuantity('minus')} />
                    <p style={{flex:1, textAlign:"center"}}>{quantity}</p>
                    <AiOutlinePlus style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}} onClick={()=>handleQuantity('plus')} />
                </div>
                
                }
                <div onClick={handleSelect} style={{display:"flex",alignItems:"center", justifyContent:"center", cursor:"pointer", padding:5, borderRadius:5, backgroundColor:"skyblue"}}>
                {selected ? <ImBin />  :<MdAdd />}
                </div>
            </div>
        </td>
    </tr>
  )
}

export default SelectableRow
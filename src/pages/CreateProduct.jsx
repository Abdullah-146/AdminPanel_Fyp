import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout.jsx";
import style from "../assets/css/create-product.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import draftToMarkdown from "draftjs-to-markdown";
import htmlToDraft from "html-to-draftjs";
import parse from "html-react-parser";
import { uploadImage } from "../api/services/upload.service.js";
import { createProduct } from "../api/services/product.service.js";
import { toast } from "react-toastify";

const editorContainerStyle = {
  width: "100%",
  backgroundColor: "#0F172A",
  color: "#fff",
  border: "1px solid rgb(73, 71, 71)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const toolbarContainerStyle = {
  backgroundColor: "#0F172A",

  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "10px",
  minHeight: "400px",
  zIndex: "1",
};

const contentContainerStyle = {
  backgroundColor: "#0F172A",
  padding: "20px",
  height: "300px",
};

function CreateProduct() {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    price: 0,
    category: ["Breakfast", "Lunch", "Dinner"],
    image: "",
  });

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  let hashConfig = {
    trigger: "#",
    separator: " ",
  };
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const markup = draftToHtml(rawContentState, hashConfig);
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const htmlContent = draftToHtml(
      convertToRaw(newEditorState.getCurrentContent())
    );
    editDescription(htmlContent); // Call your function to save HTML to the database
  };

  const editDescription = (html) => {
    console.log(html);
    setData({ ...data, description: html });
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", image);
      const imageData = await uploadImage(formData);
      setData({ ...data, image: imageData.data.url });
      const response = await createProduct({ ...data, image: imageData.data.url });
      if (response.status === "OK") {
        toast.success("Product Created Successfully");
        setData({
          title: "",
          description: "",
          price: 0,
          category: ["Breakfast", "Lunch", "Dinner"],
          image: "",
        });
        setEditorState(EditorState.createEmpty());
        //Clear the form
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategorySelection = (e) => {
    const value = e.target.value;
    if (!category.includes(value)) {
      setCategory([...category, value]);

    }
  }

  const handleRemoveCategory = (item) => {
    const newCategory = category.filter((i) => i !== item);
    setCategory(newCategory);
  }


  return (
    <Layout>
      <div className={style.container}>
        <div>
          <div>
            <p className={style.heading}>Create a New Meal</p>
          </div>
          <form className={style.create_box}>
            <div className={style.box_item}>
              <label>Title</label>
              <input
                className={style.input_field}
                type="text"
                placeholder="Enter Title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <input
                type="file"
                placeholder="Enter Image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className={style.box_item}>
              <label>Tags:</label>
              {
                category.map((item, index) =>
                <p style={{display:"flex",justifyContent:"center",alignItems:"center",gap:5}}>
                  {item}
                  <span onClick={() => handleRemoveCategory(item)} style={{cursor:"pointer"}}>X</span>
                </p>
                
                )
              }
              <select onChange={handleCategorySelection} className={style.input_field}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div className={style.box_item}>
              <label>Price</label>
              <input
                className={style.input_field}
                type="number"
                placeholder="Enter Price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div style={editorContainerStyle}>
              <div style={toolbarContainerStyle}>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  toolbarClassName="toolbar"
                  wrapperClassName="wrapper"
                  editorClassName="content"
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                    ],
                    inline: {
                      options: ["bold", "italic", "underline"],
                    },
                    blockType: {
                      options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    colorPicker: {
                      colors: [
                        "rgba(255, 255, 255, 1)",
                        "rgba(0, 0, 0, 1)",
                        "rgba(255, 0, 0, 1)",
                        "rgba(0, 255, 0, 1)",
                        "rgba(0, 0, 255, 1)",
                        "rgba(255, 255, 0, 1)",
                        "rgba(255, 0, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                      ],
                    },
                  }}
                />
              </div>
              {/* <div style={contentContainerStyle}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: editorState.getCurrentContent().hasText()
                      ? draftToHtml(
                          convertToRaw(editorState.getCurrentContent())
                        )
                      : "",
                  }}
                />
              </div> */}
              <div className={style.btns}>
                <button>Cancel</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CreateProduct;

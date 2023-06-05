import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import style from "../assets/css/users.module.css";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../api/services/category.service";
import { uploadImage } from "../api/services/upload.service";
import { toast } from "react-toastify";
import { getDealById } from "../api/services/deal.service";

function Deal() {
  const [edit, setEdit] = React.useState(false);
  const [data, setData] = React.useState({});
  const [image, setImage] = React.useState(null);


  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await getDealById("644a2c315d1ee6441391303e");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    callApi();
  }, []);

  const handleTagChange = (e) => {
    if (e.key === "Enter") {
      if (!tags.includes(e.target.value)) {
        setTags([...tags, e.target.value]);
      }
      e.target.value = "";
    }
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((item) => item !== tag));
  };

  const handleSubmit = async () => {
    try {
      let res = null;
      let fileData = null;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        fileData = await uploadImage(formData);

        if (fileData.status !== "OK") {
          fileData = null;
        }
      }
      let file = {};
      if (fileData) {
        file = { image: fileData.data.url };
      }
      if (edit) {

        res = await updateCategory({
          categoryId: selectedId,
          title: category,
          ...file,
        })

      } else {
        res = await createCategory({
          title: category,
          ...file,
          subCategory: tags,
        });
      }
      if (res) {
        if (res.status === "OK") {
          toast.success("Done Successfully");
          if(edit){
            setData(
              data.map((item) => {
                if (item._id === selectedId) {
                  return res.data
                };
                return item;
              }
              )
            );
          }
          else{
            setData([...data, res.data]);
          }
        }
      }
      setCategory("");
      setTags([]);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTableClick = async (action, item) => {
    if (action === "edit") {
      setEdit(true);
      setCategory(item.title);
      setExsistImage(item.image);
      setTags([]);
      setSelectedId(item._id);
    } else if (action === "delete") {
      try {
        console.log(item);
        const res = await deleteCategory(item._id);
        if (res.status === "OK") {
          toast.success(res.data.msg);
          setData(data.filter((category) => category._id !== item._id));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 20,
          padding: 20,
        }}
      >
        <p
          style={{
            color: "white",
            marginBottom: 2,
            fontSize: 30,
            fontWeight: "normal",
          }}
        >
          Deal
        </p>
        
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Title: </p>
              <input
                style={{ margin: 0, maxWidth: "30%", padding: 10 }}
                type="search"
                id="input"
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Add Deal"
                value={category}
              ></input>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>Image: </p>
              <input
                style={{ margin: 0, padding: 10 }}
                type="file"
                id="input"
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              {edit && (
                <img
                  src={exsistImage}
                  alt=""
                  style={{ width: 60, height: 60 }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                gap: 10,
              }}
            >
              <p style={{ width: 100 }}>SubCategory: </p>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#0f172a",
                  padding: 10,
                  margin: 0,
                  maxWidth: "80%",
                  borderRadius: 6,
                  minHeight: 100,
                }}
              >
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: 5,
                      margin: 5,
                      backgroundColor: "skyblue",
                      borderRadius: 6,
                    }}
                  >
                    {tag}{" "}
                    <span
                      onClick={() => handleTagRemove(tag)}
                      style={{
                        backgroundColor: "red",
                        padding: 5,
                        paddingTop: 2,
                        paddingBottom: 2,
                        borderRadius: 7,
                        marginLeft: 5,
                        marginRight: 5,
                      }}
                    >
                      X
                    </span>
                  </span>
                ))}
                <input
                  style={{
                    border: "none",
                    backgroundColor: "#0f172a",
                    outline: "none",
                  }}
                  placeholder="Add"
                  onKeyDown={handleTagChange}
                />
              </div>
            </div>
            <div
              style={{
                marginRight: 18,
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {!edit ? (
                <button onClick={handleSubmit}>Add Deal</button>
              ) : (
                <>
                  <button onClick={handleSubmit}>Edit Deal</button>
                  <button
                    onClick={() => {
                      setEdit(false);
                      setCategory("");
                      setTags([]);
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        
      </div>
    </Layout>
  );
}

export default Deal;

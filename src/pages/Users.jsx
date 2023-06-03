import React, { useState } from "react";
import Layout from "../Layout/Layout.jsx";
import style from "../assets/css/users.module.css";
import data from "../utils/Userdata.js";
import Table from "../component/Table.jsx";
import { getUsers } from "../api/services/user.service.js";

function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [resNext, setResNext] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getUsers({
        filter: search ? { title: { $regex: search, options: "i" } } : {},
      });
      console.log(response.data);
      setUsers(response.data);
      setData(response.data);
      setHasNextPage(response.hasNextPage);
    };
    callApi();
  }, []);

  const handleNext = async () => {
    try {
      if(search!=="" && hasNextPage){
        const index = users.findIndex((user) => user._id === show[show.length - 1]._id);
        const filtered = users.splice(index+1,index+11).filter((item) => {
          return search.toLowerCase() === ""
            ? item
            : item?.name?.toLowerCase().includes(search) || item?.email?.toLowerCase().includes(search);
        });
      }
      else if (hasNextPage) {
        let index = users.findIndex(
          (user) => user._id === data[data.length - 1]._id
        );
        if (users[index + 1]) {
          let res = users.slice(index + 1, index + 11);
          if (res[res.length - 1]._id === users[users.length - 1]._id && !resNext) {
            setHasNextPage(false);
          }
          setData([...res]);
          setHasPreviousPage(true);
        } else {
          let res = await getUsers({
            filter: search !== "" ? {} : {},
            cursor: users[users.length - 1]._id,
            limit: 10,
          });
          setUsers([...users, ...res.data]);
          setHasNextPage(res.hasNextPage);
          setResNext(res.hasNextPage);
          setHasPreviousPage(true);
          setData([...res.data]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrevious = async () => {
    const index = users.findIndex((user) => user._id === data[0]._id);
    if (index === -1) {
      return;
    }
    const res = users.slice(index - 10, index);
    setData([...res]);
    setHasNextPage(true);
    if (index - 10 === 0) {
      setHasPreviousPage(false);
    }
  };

  const handleSerach =  (array, search) => {
    const res = array.filter((item) => {
      return search.toLowerCase() === ""
        ? item
        : item?.name?.toLowerCase().includes(search) || item?.email?.toLowerCase().includes(search);
    });

    //if length is greater than 10 then slice it
    if (res.length > 10) {
      setHasNextPage(true);
      setHasPreviousPage(false);
      return res.slice(0, 10);
    }
    

    return res;
  }


  const show = handleSerach((search!==""?users:data), search);


  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 20,
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
          Users
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ margin: 0, maxWidth: "30%", padding: 10 }}
            type="search"
            id="input"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Users"
          ></input>
          <button className={style.button}>Create User</button>
        </div>
      </div>
      <Table
        data={show}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
      {/* <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.Name.toLowerCase().includes(search);
            })
            .map((item) => {
              return (
                <tr>
                  <td scope="row">{item.Name}</td>
                  <td>{item.Created}</td>
                  <td>{item.Status}</td>
                  <td>{item.Email}</td>
                </tr>
              );
            })}
        </tbody>
      </table> */}
    </Layout>
  );
}

export default Users;

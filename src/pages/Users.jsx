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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const callApi = async () => {
      const response = await getUsers({ limit: 20 });
      setUsers(response.data);
      setData(response.data.slice(0, 10));
      setHasNextPage(response.hasNextPage);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading) {
      setLoading(true);
      callApi();
    }
  }, []);

  //===================================================================================================
  // Handling All Functionalities of Pagination for unFiltered Data

  const handleNext = async () => {
    try {
      if (hasNextPage) {
        let index = users.findIndex(
          (user) => user._id === data[data.length - 1]._id
        );
        if (users[index + 1]) {
          let res = users.slice(index + 1, index + 11);
          if (
            res[res.length - 1]._id === users[users.length - 1]._id &&
            !resNext
          ) {
            setHasNextPage(false);
          }
          setData([...res]);
          setHasPreviousPage(true);
        } else {
          setLoading(true);
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
          setLoading(false);
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

  //===================================================================================================
  // Handling All Functionalities of Search and Load More for Search

  //handleLoadMore loads more data when user yped in less words and wanting to see data in the table
  const handleLoadMore = async () => {
    try {
      if (resNext) {
        setLoading(true);
        let res = await getUsers({
          cursor: users[users.length - 1]._id,
          limit: 10,
        });
        setUsers([...users, ...res.data]);
        setResNext(res.hasNextPage);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (search) => {
    return users.filter(
      (user) =>
        user?.name.toLowerCase().includes(search.toLowerCase()) ||
        user?.email.toLowerCase().includes(search.toLowerCase()) ||
        user._id.toLowerCase().includes(search.toLowerCase())
    );
  };

  //Search Display is the data that is displayed on the table when search is not empty
  const searchDisplay = handleSearch(search);

  /*Use Effect for Search thata runs when searchDisplay changes and 
  loads more data if searchDisplay is less than 20 until 
  resNext is false or length of searchDisplay is 20*/
  React.useEffect(() => {
    const callApi = async () => {
      console.log("FETCHING DATA");
      const response = await getUsers({
        cursor: users[users.length - 1]._id,
      });
      console.log("RESPONSE: ", response);
      setUsers([...users, ...response.data]);
      setResNext(response.hasNextPage);
      setLoading(false);
    };
    if (!loading && resNext && search !== "" && searchDisplay.length < 20) {
      setLoading(true);
      callApi();
    }
  }, [searchDisplay]);

  //===================================================================================================

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
            padding: 5,
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
        search={search !== "" ? true : false}
        loading={loading}
        data={search === "" ? data : searchDisplay}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        loadMore={resNext}
        handleLoadMore={handleLoadMore}
      />
    </Layout>
  );
}

export default Users;

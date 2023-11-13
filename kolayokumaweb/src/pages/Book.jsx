import React, { useEffect, useState } from "react";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";

import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button, ButtonGroup } from "@material-tailwind/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Book = () => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        if (response.data) {
          setBook(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setBook([]);
          setError(error.response.data);
          return null;
        }
      }
    };
    fetchdata();
  }, []);

  const data = { nodes: book };
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array) => array.sort((a, b) => a._id.localeCompare(b._id)),
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
      },
    }
  );

  function onSortChange(action, state) {
    //console.log(action, state);
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 7,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {
    // console.log(action, state);
  }

  const onDelete = async (id, name) => {
    await axios
      .delete(`http://localhost:5000/book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setError(name + " Adlı " + res.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        {error && (
          <div className="flex items-center justify-center m-2 p-2 border bg-red-200 rounded-full ">
            {error}
          </div>
        )}
        <div>
          <Link to={"/AddBook"}>
            <Button>Kitap EKLE</Button>
          </Link>
        </div>
        <div className="border border-black">
          <Table data={data} sort={sort} theme={theme} pagination={pagination}>
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCellSort sortKey="ID">ID</HeaderCellSort>
                    <HeaderCellSort sortKey="NAME">name</HeaderCellSort>
                    <HeaderCellSort>İşlemler</HeaderCellSort>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item) => (
                    <Row
                      className="hover:!bg-gray-100"
                      item={item}
                      key={item._id}
                    >
                      <Cell>{item._id}</Cell>
                      <Cell>{item.name}</Cell>
                      <Cell>
                        <Button
                          color="red"
                          onClick={() => onDelete(item._id, item.name)}
                        >
                          SİL
                        </Button>
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
          <br />
          <div className="flex justify-between mx-3">
            <span>
              Toplam Sayfa: {pagination.state.getTotalPages(data.nodes)}
            </span>

            <div className="flex items-center justify-center gap-4">
              <span>Sayfa: </span>
              <ButtonGroup size="sm">
                {pagination.state.getPages(data.nodes).map((_, index) => (
                  <Button
                    key={index}
                    style={{
                      fontWeight:
                        pagination.state.page === index ? "bold" : "normal",
                    }}
                    onClick={() => pagination.fns.onSetPage(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </div>

          <br />
        </div>
      </div>
    </>
  );
};

export default Book;

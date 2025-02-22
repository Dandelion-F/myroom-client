import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagination, Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import cookie from 'react-cookies';
import Card from '../../components/Card';
import { getBatchHouseList } from '../../api/request';
import './index.css';

function HouseList(props) {
  const [houseList, setHouseList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleQueryChange = (value, e) => {
    setQuery(value);
  };

  function onPageChange(currentPage) {
    setPage(currentPage);
  }

  function searchQuery() {
    if (query !== '') {
      getHouseList({ page: 1, perpage: 20, query: query });
    } else {
      getHouseList({ page: 1, perpage: 20 });
    }
  }

  let userData = cookie.load('userData');

  if (!userData) {
    navigate('/login');
  }

  useEffect(() => {
    const getHouseListT = async (params) => {
      let response = await getBatchHouseList(params);
      setHouseList(response.data.data);
      setCount(response.data.count);
    };

    if (query !== '') {
      getHouseListT({ page: page, perpage: 20, query: query });
    } else {
      getHouseListT({ page: page, perpage: 20 });
    }
  }, [page, count, query]);
  
  const getHouseList = async (params) => {
    let response = await getBatchHouseList(params);
    setHouseList(response.data.data);
    if (count !== response.data.count) {
      setCount(response.data.count);
    }
  };

  return (
    <>
      <Input
        onChange={handleQueryChange}
        value={query}
        prefix={<IconSearch />}
        showClear
        onEnterPress={searchQuery}
      ></Input>
      <div className="house-list">
        {houseList.map((v, index) =>
          v.haveProjectPublished === true ? (
            <Link
              key={index}
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/activity/${v.id}`}
            >
              <Card id={v.id} option={index} page={page} key={index}></Card>
            </Link>
          ) : (
            <Link
              key={index}
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/houseDetails/${v.id}`}
            >
              <Card id={v.id} option={index} page={page} key={index}></Card>
            </Link>
          )
        )}
      </div>
      <Pagination
        total={count}
        currentPage={page}
        onPageChange={onPageChange}
        pageSize={20}
        style={{ bottom: 0 }}
      ></Pagination>
      <div className="blank"></div>
    </>
  );
}

export default React.memo(HouseList);

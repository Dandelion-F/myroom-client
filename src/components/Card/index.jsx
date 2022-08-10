import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCount } from '../../api/utils';
import { getHouseInfo } from '../../api/request';
import axios from "axios";
import './index.css';

function getImageUrl(name) {
  return new URL(`./assets/${name}.jpg`, import.meta.url).href
}

function Card(props) {
  const { id, option, page } = props;
  const [cardData, setCardData] = useState({});
  let path = useLocation().pathname.split('/')[1];

  useEffect(() => {
    const getCardInfoT = (id) => {
      axios.get('/api/house', {
        params: {
          id,
        }
      })
        .then((response) => {
          let p = {
            ...response.data.data,
            image: getImageUrl(((option * page) % 20) + 1),
            tags: ['值得购买', '住宅', '购物方便', '公交直达'],
          };
          setCardData(p);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCardInfoT(id);
  }, [id, option, page]);
  return (
    <>
      {JSON.stringify(cardData) === '{}' ? null : (
        <div className="card-container">
          {cardData.haveProjectPublished === true && path === 'houselist' ? (
            <div className="activity-tag"></div>
          ) : null}
          <img src={cardData.image} alt="加载失败" />
          <div className="content-container">
            <div className="title">{cardData.listingName}</div>

            <div className="area">
              {cardData.cityName} | {cardData.neighborhoodName} |{' '}
              {cardData.squaremeter / 100}m²
            </div>
            <div className="tags">
              {cardData.tags.map((v, index) => {
                return (
                  <div className="tags-item" key={index}>
                    {v}
                  </div>
                );
              })}
            </div>
            <div className="price">
              {getCount(cardData.pricing / 100)}
              <span className="unit-price">
                {(cardData.pricing / cardData.squaremeter).toFixed(2)}元/平
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Card);

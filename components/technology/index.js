import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Technology() {
  const { t } = useTranslation();
  const [technology, setTechnology] = useState([]);

  function LeftNavButton(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <div className="slide-arrow prev-arrow">
          <i className="fa fa-chevron-left"></i>
        </div>
      </div>
    );
  }

  function RightNavButton(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <button className="slide-arrow next-arrow">
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    );
  }

  let settings = {
    autoplay: true,
    dots: false,
    arrows: true,
    speed: 500,
    // infinite: false,
    infinite: technology.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <RightNavButton />,
    prevArrow: <LeftNavButton />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const allTechnology = async () => {
      const { data } = await axios.get(`${process.env.URL}/api/all-technology`);
      setTechnology(data.data);
    };
    allTechnology();
  }, []);

  return (
    <>
      <div className="category">
        <div className="container">
          <div className="title">
            <h3>
              {t("Technology-Search")} <span>{t("Technology-by")}</span>
            </h3>
          </div>
          <div className="category_slider">
            <Slider {...settings}>
              {technology.map((items) => {
                return (
                  <div className="item" key={items.id}>
                    <Link href={`/search/all?key=${items.title}`}>
                      <div className="item-box" style={{ cursor: "pointer" }}>
                        <div className="img">
                          <Image
                            src={`${process.env.URL}/admin-property/uploads/images/technoloy_logo/${items.icon}`}
                            alt=""
                            layout="fill"
                          />
                        </div>
                        <h2>{items.title}</h2>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

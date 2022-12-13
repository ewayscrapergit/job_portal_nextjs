import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ShimmerPostItem, ShimmerSectionHeader } from "react-shimmer-effects";
import Banner from "../../components/banner";

export default function BlogDetails() {
  const { t } = useTranslation();

  const router = useRouter();
  const { id } = router.query;

  const [blogDetails, setBlogDetails] = useState([]);
  const [moreLike, setMoreLike] = useState([]);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;

    const getSingleBlogs = async () => {
      if (lang == "en") {
        const { data } = await axios.post(
          `${process.env.URL}/api/en-single-blog`,
          {
            id,
          }
        );
        // console.log(data);
        setBlogDetails(data.data);
        setMoreLike(data.moreLike);
      } else {
        const { data } = await axios.post(
          `${process.env.URL}/api/de-single-blog`,
          {
            id,
          }
        );
        // console.log(data);
        setBlogDetails(data.data);
        setMoreLike(data.moreLike);
      }
    };
    getSingleBlogs();
  }, [id]);

  return (
    <>
      {/* Inner Banner */}
      <Banner name="Blogs" />

      <div className="blog-detail">
        {blogDetails.length == 0 ? (
          <div className="container">
            <ShimmerPostItem card title cta contentCenter />
          </div>
        ) : (
          <div className="container">
            <div className="img-pnl">
              {/* <img src="/images/seo-tec.jpg" alt="" /> */}
              <Image
                src={`${process.env.URL}/admin-property/uploads/images/blog/${blogDetails.image}`}
                height={570}
                width={1140}
              />
            </div>
            <div className="text-pnl">
              <div className="main_cont">
                <h2>{blogDetails.title}</h2>
                <p>{blogDetails.description}</p>
              </div>
              <div className="rt-sidebar">
                <div className="recent_art">
                  <h2>{t("blog-Recentes")}</h2>
                  {moreLike.length == 0 ? (
                    <div className="art_box">
                      <ShimmerSectionHeader />
                    </div>
                  ) : (
                    <>
                      {moreLike.map((item) => {
                        if (item.id !== blogDetails.id)
                          return (
                            <div className="art_box">
                              <div className="img">
                                <Link href={`/blogs/${item.id}`}>
                                  <img
                                    src={`${process.env.URL}/admin-property/uploads/images/blog/${item.image}`}
                                    alt=""
                                  />
                                </Link>
                              </div>
                              <div className="text">
                                <Link href={`/blogs/${item.id}`}>
                                  {item.title}
                                </Link>
                                {/* <span className="date"> 26/09/2022</span> */}
                                <p>{item.description.substring(0, 80)}...</p>
                              </div>
                            </div>
                          );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Newsletter from "../../components/newsletter";
import { ShimmerPostItem } from "react-shimmer-effects";
import Banner from "../../components/banner";
import { useSelector } from "react-redux";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const popuphn = useSelector((state) => state.popuphn);

  useEffect(() => {
    const lang =
      typeof window !== "undefined" && localStorage.getItem("lang")
        ? JSON.parse(localStorage.getItem("lang"))
        : null;
    if (lang == "en") {
      const getAllBlogs = async () => {
        const { data } = await axios.get(`${process.env.URL}/api/en-blogs`);
        setBlogs(data.data);
      };
      getAllBlogs();
    } else {
      const getAllBlogs = async () => {
        const { data } = await axios.get(`${process.env.URL}/api/de-blogs`);
        setBlogs(data.data);
      };
      getAllBlogs();
    }
  }, [popuphn]);

  return (
    <>
      {/* Inner Banner */}
      <Banner name="Blogs" />

      <div className="blog-cate">
        <div className="container">
          <div className="inner">
            {blogs.length == 0 ? (
              <>
                <div className="box">
                  <ShimmerPostItem card title cta contentCenter />
                </div>
                <div className="box">
                  <ShimmerPostItem card title cta contentCenter />
                </div>
                <div className="box">
                  <ShimmerPostItem card title cta contentCenter />
                </div>
              </>
            ) : (
              <>
                {blogs.map((items) => {
                  return (
                    <div className="box">
                      <div className="img">
                        <Link href={`/blogs/${items.id}`}>
                          <a>
                            <Image
                              src={`${process.env.URL}/admin-property/uploads/images/blog/${items.image}`}
                              height={553}
                              width={700}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="text">
                        <Link href={`/blogs/${items.id}`}>
                          <a>{items.title}</a>
                        </Link>
                        <p>{items.description.substring(0, 115)}...</p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subscribe Start */}
      <Newsletter />
    </>
  );
}

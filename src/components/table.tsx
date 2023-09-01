"use client";

import React, { FC, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import { User } from "@prisma/client";
import { userAgent } from "next/server";

interface TableRowProps {
  title: string;
  description: string;
  link: string;
  createdAt: Date;
  user: User;
}

interface TableProps {
  data: TableRowProps[];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* <div className="w-full flex flex-wrap gap-4"> */}
      {data.length > 0 && (
        <>
          {data?.map((post, i) => (
            <div
              className="p-8 rounded-xl border border-neutral-600 hover:bg-neutral-950 hover:border-neutral-500 flex text-white cursor-pointer duration-150"
              key={i}
            >
              <div className="w-full h-full flex flex-col justify-between leading-normal">
                <div className="mb-4">
                  <div className="font-bold text-xl mb-2">{post.title}</div>
                  <p className="text-base text-gray-500">{post.description}</p>
                  <p className="text-blue-500 my-2">
                    <a href={post.link} target="_blank">
                      {post.link.substring(0, 15)}...
                    </a>
                  </p>
                </div>
                <div className="flex items-center text-neutral-500">
                  <div className="text-xs">
                    <p className="text-neutral-300">{post.user.name}</p>
                    <Moment fromNow>{post.createdAt}</Moment>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  </>
);

export default Table;

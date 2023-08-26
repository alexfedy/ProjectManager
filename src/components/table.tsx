"use client";

import React, { FC, useState } from "react";
import Moment from "react-moment";
import "moment-timezone";
import { User } from "@prisma/client";
import { userAgent } from "next/server";

interface TableRowProps {
  title: string;
  description: string;
  createdAt: Date;
  user: User;
}

interface TableProps {
  data: TableRowProps[];
}

const Table: React.FC<TableProps> = ({ data }) => (
  <>
    <div className="rounded-lg relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-500 uppercase bg-black/20">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Creator
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && (
            <>
              {data?.map((post, i) => (
                <tr key={i} className="bg-white/10 border-b text-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    {post.title}
                  </th>
                  <td className="px-6 py-4">{post.description}</td>
                  <td className="px-6 py-4">{post.user?.name}</td>
                  <td className="px-6 py-4">
                    <Moment fromNow>{post.createdAt}</Moment>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  </>
);

export default Table;

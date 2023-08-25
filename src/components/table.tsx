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
    <h1 className="text-4xl text-white mb-4">Public Posts</h1>
    <div className="rounded-lg relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {data?.map((post) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
        </tbody>
      </table>
    </div>
  </>
);

export default Table;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "DashBoard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providersTag: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: {
          page,
          pageSize,
          sort,
          search,
        },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getAdmins : build.query({
      query: ()=> `management/admins`,
      providesTags:["Admins"],
    }),
    getUserPerformance : build.query({
      query : ( id) => `management/performance/${id}`,
      providesTags:["Performance"],
    }),
    getDashboard : build.query({
      query : () => `general/dashboard`,
      providesTags:["Dashboard"],
    }),
  }),
});
// useGetUserQuery - come from api.endPoint's getUser , naming like use as prefix and Query as suffix
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;

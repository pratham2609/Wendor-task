/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import ReloadBtn from "../../components/Dashboard/ReloadBtn";
import SearchBar from "../../components/Dashboard/SearchBar";
import TableContainer from "../../components/Dashboard/containers/TableContainer";
import { Company, CompanyRes } from "../../types/Companies";
import { TableColums } from "../../types/Table";

export default function Companies() {
  const columns: TableColums[] = [
    { name: "SNo.", uid: "sno" },
    { name: "Name", uid: "company_name" },
    { name: "Actions", uid: "actions" },
  ];
  const [isActionModalOpen, setActionModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [companyRes, setCompanyRes] = React.useState<CompanyRes>({
    companies: [],
    totalCount: 0,
  });
  const [filter, setFilter] = React.useState({
    page: 1,
    limit: 14,
  })
  const setPage = (val: number) => {
    setFilter({ ...filter, page: val });
  }
  const update = () => setReload(!reload);
  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/company?page=${filter.page}&limit=${filter.limit}`)
      .then((res) => {
        setCompanyRes({
          companies: res.data.data.map((item: Company, index: number) => ({ ...item, sno: index + 1 })),
          totalCount: res.data.totalCount,
        });
        setLoading(false);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, [reload, filter.page]);

  React.useEffect(() => {
    document.title = "Wendor | Companies"
  }, []);

  const renderCell = React.useCallback((company: string, columnKey: string) => {
    const cellValue = company[columnKey];
    switch (columnKey) {
      case "sno":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "company_name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit company">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete company">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-10 items-center'>
      <div className='flex items-center w-full justify-between'>
        <h2 className='urbanist font-medium text-4xl'>
          Companies
        </h2>
        <div className="flex items-center gap-4 h-full">
          <ReloadBtn action={update} />
          <SearchBar />
        </div>
      </div>
      <TableContainer
        columns={columns}
        id={"sno"}
        page={filter.page}
        setPage={setPage}
        totalCount={companyRes?.totalCount}
        isLoading={loading}
        data={companyRes.companies ?? []}
        renderCell={renderCell}
      />
    </section>
  )
}

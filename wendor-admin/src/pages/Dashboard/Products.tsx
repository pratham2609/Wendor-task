/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import ReloadBtn from "../../components/Dashboard/ReloadBtn";
import SearchBar from "../../components/Dashboard/SearchBar";
import TableContainer from "../../components/Dashboard/containers/TableContainer";
import { Product, ProductRes } from "../../types/Product";
import { TableColums } from "../../types/Table";
import AddProductsModal from "../../components/Modals/AddProductsModal";
import EditProductModal from "../../components/Modals/EditProductModal";
import toast from "react-hot-toast";
import { Company } from "../../types/Companies";
import { Categories } from "../../utils/constants";

export default function Products() {
  const columns: TableColums[] = [
    { name: "SNo.", uid: "sno" },
    { name: "Name", uid: "name" },
    { name: "Image", uid: "image" },
    { name: "Barcode No.", uid: "barcodeNo" },
    { name: "Category", uid: "category" },
    { name: "Price", uid: "price" },
    { name: "Actions", uid: "actions" },
  ];

  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [productRes, setProductRes] = React.useState<ProductRes>({
    products: [],
    totalCount: 0,
  });
  const [filter, setFilter] = React.useState({
    page: 1,
    limit: 10,
    company: "all",
    category: "all",
  });

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axiosInstance.get("/company");
        setCompanies(res.data.data.companies);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchCompanies();
  }, []);

  const [editProductModalOpen, setEditProductModalOpen] = React.useState<{ isOpen: boolean, id: string | null }>({
    isOpen: false, id: null
  });
  const setPage = (val: number) => {
    setFilter({ ...filter, page: val });
  }
  const update = () => setReload(!reload);
  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/products?page=${filter.page}&limit=${filter.limit}&company=${filter.company}&category=${filter.category}`)
      .then((res) => {
        setProductRes({
          products: res.data.data.products.map((product: Product, index: number) => ({ ...product, sno: index + 1 })),
          totalCount: res.data.data.totalCount,
        });
        setLoading(false);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, [reload, filter]);

  const deleteProduct = async (id: string) => {
    try {
      await axiosInstance.delete("/products/" + id);
      toast.success("Product deleted successfully");
      return update();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  };

  React.useEffect(() => {
    document.title = "Wendor | Products"
  }, []);

  const renderCell = React.useCallback((product: Product, columnKey: string) => {
    const cellValue = product[columnKey];
    switch (columnKey) {
      case "sno":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "category":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "barcodeNo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "image":
        return (
          <div className="w-10 h-10 overflow-auto">
            <img src={product.display_image_url} className="w-full h-full object-cover aspect-square" alt={`${product.name} image`} />
          </div>
        );
      case "price":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit product">
              <button className="focus:outline-none" onClick={() => setEditProductModalOpen({ isOpen: true, id: product.id })}>
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
              <button onClick={() => deleteProduct(product.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <section className='w-full h-full pb-5 xl:px-7 px-5 2xl:pt-7 xl:pt-6 pt-5 flex flex-col gap-5 items-center'>
        <div className='flex items-center w-full justify-between'>
          <h2 className='urbanist font-medium text-4xl'>
            Products
          </h2>
          <div className="flex items-center gap-4 h-full">
            <ReloadBtn action={update} />
            <SearchBar />
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <select className="py-2 px-3 border rounded-lg focus:outline-none w-40" onChange={(e) => setFilter({
            ...filter,
            company: e.target.value
          })}>
            <option value="all">All</option>
            {companies.map((company: Company) => {
              return <option key={company.id} value={company.id}>{company.company_name}</option>
            })}
          </select>
          <select className="py-2 px-3 border rounded-lg focus:outline-none w-40" onChange={(e) => setFilter({
            ...filter,
            category: e.target.value
          })}>
            <option value="all">All</option>
            {Categories.map((cat: string) => {
              return <option key={cat} value={cat}>{cat}</option>
            })}
          </select>
          <AddProductsModal />
        </div>
        <TableContainer
          columns={columns}
          id={"sno"}
          page={filter.page}
          setPage={setPage}
          totalCount={productRes.totalCount}
          isLoading={loading}
          data={productRes.products ?? []}
          renderCell={renderCell}
        />
      </section>
      {editProductModalOpen.isOpen && <EditProductModal isOpen={editProductModalOpen.isOpen} setIsOpen={(val) => setEditProductModalOpen({ ...editProductModalOpen, isOpen: val })}
        id={editProductModalOpen.id} />}
    </>
  )
}

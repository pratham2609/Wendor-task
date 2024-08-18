/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "../../components/Icons";
import ReloadBtn from "../../components/Dashboard/ReloadBtn";
import SearchBar from "../../components/Dashboard/SearchBar";
import TableContainer from "../../components/Dashboard/containers/TableContainer";
import { InventoryItem, InventoryRes } from "../../types/Inventory";
import { TableColums } from "../../types/Table";
import AddInventoryModal from "../../components/Modals/AddInventoryModal";
import SeeProductInventoryModal from "../../components/Modals/SeeProductInventoryModal";
import toast from "react-hot-toast";

export default function Inventory() {
  const columns: TableColums[] = [
    { name: "SNo.", uid: "sno" },
    { name: "Name", uid: "productName" },
    { name: "Quantity", uid: "totalQuantity" },
    { name: "Price", uid: "productPrice" },
    { name: "Company", uid: "companyName" },
    { name: "Actions", uid: "actions" },
  ];
  const [loading, setLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [inventoryRes, setInventoryRes] = React.useState<InventoryRes>({
    inventory: [],
    totalCount: 0,
  });

  const [inventoryModalOpen, setInventoryModalOpen] = React.useState<{ isOpen: boolean, id: string | null }>({
    isOpen: false, id: null
  });
  const [filter, setFilter] = React.useState({
    page: 1,
    limit: 14,
  })
  const setPage = (val: number) => {
    setFilter({ ...filter, page: val });
  }

  const deleteProductInventory = async (id: string) => {
    try {
      await axiosInstance.delete(`/inventory/product/${id}`);
      toast.success("Product Inventory Deleted!");
      return update();
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data);
    }
  }

  const update = () => setReload(!reload);
  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/inventory?page=${filter.page}&limit=${filter.limit}`)
      .then((res) => {
        setInventoryRes({
          inventory: res.data.data.inventory.map((item: InventoryItem, index: number) => ({ ...item, sno: index + 1 })),
          totalCount: res.data.totalCount,
        });
        setLoading(false);
      })
      .catch((error) => console.log(error.message))
      .finally(() => setLoading(false));
  }, [reload, filter.page, inventoryModalOpen.isOpen]);

  React.useEffect(() => {
    document.title = "Wendor | Inventory"
  }, []);

  const renderCell = React.useCallback((inventory: InventoryItem, columnKey: string) => {
    const cellValue = inventory[columnKey];
    switch (columnKey) {
      case "sno":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "productName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "totalQuantity":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "productPrice":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "companyName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit inventory">
              <button className="focus:outline-none" onClick={() => setInventoryModalOpen({ isOpen: true, id: inventory.productId })}>
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Delete inventory">
              <button onClick={() => deleteProductInventory(inventory.productId)} className="text-lg text-danger active:opacity-50">
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
            Inventory
          </h2>
          <div className="flex items-center gap-4 h-full">
            <ReloadBtn action={update} />
            <SearchBar />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <AddInventoryModal update={update} />
        </div>
        <TableContainer
          columns={columns}
          id={"sno"}
          page={filter.page}
          setPage={setPage}
          totalCount={inventoryRes?.totalCount}
          isLoading={loading}
          data={inventoryRes.inventory ?? []}
          renderCell={renderCell}
        />
      </section>
      {inventoryModalOpen.isOpen && <SeeProductInventoryModal isOpen={inventoryModalOpen.isOpen} setIsOpen={(val) => setInventoryModalOpen({ ...inventoryModalOpen, isOpen: val })}
        id={inventoryModalOpen.id} />}
    </>
  )
}

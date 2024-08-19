import { Spinner } from "@nextui-org/react";
import { useGetProductById } from "../hooks/useGetProductById";
import { useParams } from "react-router-dom";
import { useFetchInventory } from "../hooks/fetchInventoryData";
import AddToCartBtn from "../components/AddToCartBtn";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useGetProductById(id);
    const { inventory, loading: inventoryLoader } = useFetchInventory({ pageSize: 8, category: product?.productCategory });
    return (
        <div className='w-full min-h-[90vh] h-[80vh] pt-10'>
            {loading ? <div className="w-full flex items-center justify-center h-full">
                <Spinner color="danger" size="lg" />
            </div> :
                <div className="w-full flex flex-col gap-20">
                    <div className='w-full h-full flex flex-col gap-10'>
                        <h1 className="font-bold text-4xl">
                            {product?.productName}
                        </h1>
                        <div className="w-full flex justify-center">
                            <div className="w-max flex h-full items-center gap-20 border rounded-xl px-10">
                                <div className="w-[200px] h-[300px]">
                                    <img src={product?.display_image_url} className="w-full h-full object-scale-down" />
                                </div>
                                <div className="h-full justify-center gap-10 flex flex-col">
                                    <div>
                                        <h4 className="font-medium text-xl text-gray-500">{product?.companyName}</h4>
                                        <h2 className="font-bold text-2xl ">{product?.productName}</h2>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-xl text-gray-500">Total Available: {product?.totalQuantity} Pcs</h4>
                                        <h2 className="font-bold text-2xl ">₹{product?.productPrice}</h2>
                                    </div>
                                    <AddToCartBtn product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col gap-10'>
                        <h1 className="font-semibold text-3xl">
                            More products related to {product?.productCategory}
                        </h1>
                        <div className="w-full flex justify-center">
                            <div className="w-max flex h-full items-center gap-20 border rounded-xl px-10">
                                <div className="w-[200px] h-[300px]">
                                    <img src={product?.display_image_url} className="w-full h-full object-scale-down" />
                                </div>
                                <div className="h-full justify-center gap-10 flex flex-col">
                                    <div>
                                        <h4 className="font-medium text-xl text-gray-500">{product?.companyName}</h4>
                                        <h2 className="font-bold text-2xl ">{product?.productName}</h2>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-xl text-gray-500">Total Available: {product?.totalQuantity} Pcs</h4>
                                        <h2 className="font-bold text-2xl ">₹{product?.productPrice}</h2>
                                    </div>
                                    <AddToCartBtn product={product} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

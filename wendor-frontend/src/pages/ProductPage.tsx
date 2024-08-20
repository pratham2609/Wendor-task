import { Spinner } from "@nextui-org/react";
import { useGetProductById } from "../hooks/useGetProductById";
import { useParams } from "react-router-dom";
import { useFetchInventory } from "../hooks/fetchInventoryData";
import AddToCartBtn from "../components/AddToCartBtn";
import ContainerWrapper from "../components/Global/ContainerWrapper";
import { InventoryItem } from "../types/Inventory";
import { SmallProductCard } from "../components/ProductCards";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useGetProductById(id);
    const { inventory } = useFetchInventory({ pageSize: 8, category: product?.productCategory });
    return (
        <ContainerWrapper>
            <div className='w-full min-h-[80vh] h-full lg:pt-10 md:pt-8 pt-0'>
                {loading ? <div className="w-full flex items-center justify-center h-full">
                    <Spinner color="danger" size="lg" />
                </div> :
                    <div className="w-full flex flex-col gap-20">
                        <div className='w-full h-full flex flex-col gap-10'>
                            <h1 className="font-bold xl:text-4xl lg:text-[32px] md:text-[28px] text-2xl capitalize">
                                {product?.productName}
                            </h1>
                            <div className="w-full flex justify-center">
                                <div className="w-max flex h-full items-center gap-20 border rounded-xl pr-10 overflow-hidden">
                                    <div className="w-[200px] xl:h-[300px]">
                                        <img src={product?.display_image_url} className="w-full h-full object-scale-down" />
                                    </div>
                                    <div className="h-full justify-center gap-10 flex flex-col">
                                        <div>
                                            <h4 className="font-medium text-gray-500 capitalize">{product?.companyName}</h4>
                                            <h2 className="font-bold text-xl ">{product?.productName}</h2>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-500">Total Available: {product?.totalQuantity} Pcs</h4>
                                            <h2 className="font-bold text-xl ">₹{product?.productPrice}</h2>
                                        </div>
                                        <AddToCartBtn product={product} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {inventory.inventory.length > 0 &&
                            <div className='w-full h-full flex flex-col xl:gap-10 lg:gap-8 gap-5'>
                                <h1 className="font-semibold text-2xl">
                                    More products related to {product?.productCategory} Category
                                </h1>
                                <div className="w-full grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
                                    {inventory.inventory.map((data: InventoryItem) => (
                                        <SmallProductCard key={data.productId} product={data} />
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </ContainerWrapper>
    )
}

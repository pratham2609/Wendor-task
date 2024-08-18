import { ISalesRepository } from '../types/sale';
import { IInventoryRepository } from '../types/inventory';
import InventoryRepository from '../repository/inventoryRepository';
import InventoryService from './inventoryService';
import { SalesRepository } from '../repository/salesRepository';
import { ApiError } from '../middlewares/ApiError';
import { IUserRepository } from '../types/user';
import { UserService } from './userService';
import { IProductRepository } from '../types/product';
import ProductService from './productService';
import { SalesService } from './saleService';
import { DashboardResponse } from '../types/Dashboard';
import { UserRepository } from '../repository/userRepository';
import ProductRepository from '../repository/productRepository';

export class DashboardService {
    private readonly salesRepository: ISalesRepository;
    private readonly userRepository: IUserRepository;
    private readonly productRepository: IProductRepository;
    readonly salesService: SalesService;
    readonly userService: UserService;
    readonly productService: ProductService;

    constructor() {
        this.salesRepository = new SalesRepository();
        this.salesService = new SalesService(this.salesRepository);
        this.userRepository = new UserRepository()
        this.userService = new UserService(this.userRepository);
        this.productRepository = new ProductRepository();
        this.productService = new ProductService(this.productRepository);
    }

    async getDashboardData(): Promise<DashboardResponse> {
        try {
            const totalSales = await this.salesService.getTotalSales();
            const totalRevenue = await this.salesService.getTotalRevenue();
            const totalProducts = await this.productService.getTotalProducts();
            const totalUsers = await this.userService.getTotalUsers();

            return { totalSales, totalProducts, totalUsers, totalRevenue };
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }
}

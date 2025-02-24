import { fetchApi, FetchApiOptions } from '../utils/fetchApi';
import {
    ApiResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    VoucherRegisterRequest,
    VoucherProviderRegisterRequest,
    OrderCreateRequest,
    OrderCreateResponse,
    VoucherDetailResponse,
    VoucherProviderListResponse,
    UserInfoResponse,
    ReissueResponse
} from '../types/api';

export class ApiService {
    private static instance: ApiService;
    private token: string | null = null;

    private constructor() { }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    setToken(token: string) {
        this.token = token;
    }

    private async request<TResponse, TBody = unknown>(
        url: string,
        options: FetchApiOptions<TBody> = {}
    ): Promise<ApiResponse<TResponse>> {
        const headers: HeadersInit = {};
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return fetchApi<ApiResponse<TResponse>, TBody>(url, {
            ...options,
            headers: { ...headers, ...options.headers },
        });
    }

    // Auth APIs
    async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        return this.request<LoginResponse>('/api/auth/login', {
            method: 'POST',
            body: request,
        });
    }

    async register(request: RegisterRequest): Promise<ApiResponse<void>> {
        return this.request<void>('/api/auth/register', {
            method: 'POST',
            body: request,
        });
    }

    async logout(): Promise<ApiResponse<void>> {
        return this.request<void>('/api/auth/logout', {
            method: 'POST',
        });
    }

    async reissue(): Promise<ApiResponse<ReissueResponse>> {
        return this.request<ReissueResponse>('/api/auth/reissue', {
            method: 'POST',
        });
    }

    // Voucher APIs
    async getVouchersByProviderId(providerId: string): Promise<ApiResponse<VoucherDetailResponse[]>> {
        return this.request<VoucherDetailResponse[]>(`/api/vouchers?providerId=${providerId}`);
    }

    async registerVoucher(request: VoucherRegisterRequest): Promise<ApiResponse<void>> {
        return this.request<void>('/api/vouchers', {
            method: 'POST',
            body: request,
        });
    }

    // Provider APIs
    async getAllProviders(): Promise<ApiResponse<VoucherProviderListResponse[]>> {
        return this.request<VoucherProviderListResponse[]>('/api/providers');
    }

    async registerProvider(request: VoucherProviderRegisterRequest): Promise<ApiResponse<void>> {
        return this.request<void>('/api/providers', {
            method: 'POST',
            body: request,
        });
    }

    // Order APIs
    async createOrder(request: OrderCreateRequest): Promise<ApiResponse<OrderCreateResponse>> {
        return this.request<OrderCreateResponse>('/api/orders', {
            method: 'POST',
            body: request,
        });
    }

    // User APIs
    async getUserInfo(): Promise<ApiResponse<UserInfoResponse>> {
        return this.request<UserInfoResponse>('/api/users/info');
    }

    // Check APIs
    async checkEmailDuplicate(email: string): Promise<ApiResponse<boolean>> {
        return this.request<boolean>(`/api/auth/check-id?email=${email}`);
    }

    async checkPhoneDuplicate(phone: string): Promise<ApiResponse<boolean>> {
        return this.request<boolean>(`/api/auth/check-phone?phone=${phone}`);
    }
}

export const apiClient = ApiService.getInstance();

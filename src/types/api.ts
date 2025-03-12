export interface ApiResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}

// Response Types
export interface VoucherDetailResponse {
    voucherId: number;
    voucherName: string;
    stock: number;
    price: number;
}

export interface VoucherProviderListResponse {
    id: number;
    name: string;
    discount: {
        cardDiscount: number;
        phoneDiscount: number;
    };
    contactInfo: {
        homePage: { url: string };
        csCenter: { tel: string };
    };
    description: string;
    publisher: string;
    imageUrl: string;
    note: string;
    popular: boolean;
}

export interface LoginResponse {
    accessToken: string;
}

export interface UserInfoResponse {
    email: string;
    name: string;
    phone: string;
}

export interface OrderCreateResponse {
    // orderId: number;
    orderNo: string;
    ordererId: number;
    paymentMethod: string;
    price: number;
    productCode?: string;
    productName: string;
    orderDate: string;
}

export interface OrderItemResponse {
    orderNo: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    paymentMethodType: 'CARD' | 'PHONE';
    orderDate: string;
    price: number;
}

export interface ReissueResponse {
    reissueAccessToken: string;
}

export interface EncryptedDataResponse {
    token_version_id: string;
    enc_data: string;
    integrity_value: string;
}

// Request Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface VoucherRegisterRequest {
    voucherProviderId: number;
    name: string;
    price: number;
    stock: number;
}

export interface VoucherProviderRegisterRequest {
    name: string;
    cardDiscount: number;
    phoneDiscount: number;
    homePage: string;
    csCenter: string;
    description: string;
    publisher: string;
    imageUrl: string;
    note: string;
    index?: number;
    popular?: boolean;
}

export interface OrderItemRequest {
    voucherId: number;
    quantity: number;
}

export interface OrderCreateRequest {
    paymentMethod: string;
    providerId: number;
    orderItems: OrderItemRequest[];
}

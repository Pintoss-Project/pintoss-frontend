import React, { ReactElement, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../controllers/new-api-service';
import useAlertContext from './useAlertContext';
import { useRouter } from 'next/navigation';
import * as cs from '../shared/styles/common.css';
import AlertMainTextBox from '../shared/components/alert/AlertMainTextBox';

export interface OrderItem {
  voucherId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderParams {
  paymentMethod: string;
  // providerId: number;
  orderItems: OrderItem[];
}

export interface OrderData {
  SERVICE_ID: string;
  SERVICE_CODE: string;
  SERVICE_TYPE: string;
  ORDER_ID: string;
  ORDER_DATE: string;
  AMOUNT: number;
  RETURN_URL: string;
  ITEM_CODE: number | string;
  ITEM_NAME: string;
  USER_ID?: number;
  USER_NAME?: string;
  USER_EMAIL?: string;
  LOGO: string;
}

declare global {
  interface Window {
    GX_pay?: (formName: string, viewType: string, protocolType: string) => void;
  }
}

interface OrderHookResult {
  orderData: OrderData | null;
  handleOrder: (params: CreateOrderParams) => Promise<void>;
}

const renderLoginAlert = (): ReactElement => {
  return <AlertMainTextBox text="바로 구매하기는 로그인 후에 이용가능합니다. 로그인 페이지로 이동하시겠습니까?" />;
};

const renderErrorAlert = (error: Error): ReactElement => {
  return <AlertMainTextBox text={`주문 생성에 실패했습니다. ${error.message}`} />;
};

export const useOrder = (): OrderHookResult => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { open, close } = useAlertContext();
  const router = useRouter();

  const handleOrder = async (params: CreateOrderParams) => {
    if (!isAuthenticated) {
      open({
        width: '360px',
        height: '250px',
        title: '로그인 확인',
        main: renderLoginAlert(),
        rightButtonLabel: '확인',
        rightButtonStyle: cs.lightBlueMediumButton,
        leftButtonLabel: '취소',
        leftButtonStyle: cs.whiteAndBlackButton,
        onRightButtonClick: () => {
          router.push('/login');
          close();
        },
        onLeftButtonClick: close,
      });
      return;
    }

    if (!window.GX_pay) {
      console.error('Payment script is not loaded.');
      return;
    }

    try {
      const response = await apiClient.createOrder(params);
      const data = response.data;
      
      const newOrderData: OrderData = {
        SERVICE_ID: 'M2483583',
        SERVICE_CODE: params.paymentMethod === 'CARD' ? '0900' : '1100',
        SERVICE_TYPE: '0000',
        ORDER_ID: data.orderNo,
        ORDER_DATE: data.orderDate.replace(/[-: ]/g, '').slice(0, 14),
        AMOUNT: data.price,
        RETURN_URL: 'https://pin-toss.com/api/payments/callback',
        ITEM_CODE: data.productCode || "",
        ITEM_NAME: data.productName,
        USER_ID: user?.id,
        USER_NAME: user?.name,
        USER_EMAIL: user?.email,
        LOGO: 'https://pin-toss.com/images/pintoss-logo.png',
      };

      setOrderData(newOrderData);

      setTimeout(() => {
        window.GX_pay?.('paymentForm', 'submit', 'https_pay');
      }, 500);

    } catch (error) {
      open({
        width: '300px',
        height: '200px',
        title: '주문 생성 실패',
        main: renderErrorAlert(error as Error),
        rightButtonLabel: '확인',
        rightButtonStyle: cs.lightBlueButton,
        onRightButtonClick: close,
      });
    }
  };

  return {
    orderData,
    handleOrder,
  };
};

export default useOrder;
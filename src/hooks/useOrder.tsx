import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../controllers/new-api-service';
import useAlertContext from './useAlertContext';
import { useRouter } from 'next/navigation';
import * as cs from '../shared/styles/common.css';
import AlertMainTextBox from '../shared/components/alert/AlertMainTextBox';

const billServiceId = process.env.NEXT_PUBLIC_BILLGATE_SERVICE_ID || 'PIN_TOSS';

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

      console.log('handleOrder response', data);

      const newOrderData: OrderData = {
        SERVICE_ID: billServiceId,
        SERVICE_CODE: data.paymentMethod,
        SERVICE_TYPE: '0000', // 0000: 일반결제
        ORDER_ID: data.orderNo,
        // "2025-03-21T09:13:50.954Z" to YYYYMMDDHH24MISS format
        ORDER_DATE: new Date(data.orderDate).toLocaleString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(/[\/,:\s]/g, ''),
        AMOUNT: data.price,
        RETURN_URL: 'https://pin-toss.com/api/payments/callback',
        ITEM_CODE: "",
        ITEM_NAME: data.productName,
        USER_ID: user?.id,
        USER_NAME: user?.name,
        USER_EMAIL: user?.email,
        LOGO: 'https://pin-toss.com/images/pintoss-logo.png',
      };

      setOrderData(newOrderData);

      console.log('handleOrder newOrderData', newOrderData);
      setTimeout(() => {
        const viewType = window.innerWidth < 768 ? 'submit' : 'popup';
        const protocolType = process.env.NODE_ENV === 'development' ? 'http_tpay' : 'https_tpay';
        // 정식서비스 일때
        // const protocolType = process.env.NODE_ENV === 'development' ? 'http_tpay' : 'https_pay';
        window.GX_pay?.('paymentForm', viewType, protocolType);
      }, 500);

    } catch (error) {
      console.log('handleOrder error', error);
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

  useEffect(() => {
    // create event listener for payment result from popup
    function handlePaymentResult (event: MessageEvent) {
      if (!event.origin.includes('billgate.net')) return;
      const data = event.data;
      console.log('Payment result data:', event.origin, data);
      if (data && data.result) {
        console.log('Payment result:', data.result);
      }
      window.location.replace('/order/list');
    };
    window.addEventListener('message', handlePaymentResult);
    return () => {
      window.removeEventListener('message', handlePaymentResult);
    };
  }, []);

  return {
    orderData,
    handleOrder,
  };
};

export default useOrder;
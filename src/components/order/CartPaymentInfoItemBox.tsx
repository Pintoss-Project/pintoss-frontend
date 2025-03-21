'use client';

import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './CartStyle.css';
import ConfirmAndPayTheAmountBox from './ConfirmAndPayTheAmountBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PaymentMethodSelectBox from './PaymentMethodSelectBox';
import useOrder from '@/hooks/useOrder';
import HiddenInputs from '@/shared/components/order/HiddenInputs';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';

interface Props {
  totalAmount: number;
  selectedType: string;
  setSelectedType: Dispatch<SetStateAction<string>>;

  orderItems: any[];
}

const CartPaymentInfoItemBox = ({ 
  totalAmount, selectedType, setSelectedType,
  orderItems
 }: Props) => {
  const [payAmount, setPayAmount] = useState(0);
  const { orderData, handleOrder } = useOrder();
  const { open, close } = useAlertContext();

  useEffect(() => {
    if (selectedType === 'phone') {
      setPayAmount(totalAmount * 1.1);
    } else {
      setPayAmount(totalAmount);
    }
  }, [totalAmount, selectedType]);

  const handlePayment = (event:any) => {
    event.preventDefault();

    if (!orderItems?.length) {
      open({
        width: '300px',
        height: '200px',
        main: <AlertMainTextBox text='주문할 상품이 없습니다.' />,
        leftButtonStyle: cs.lightBlueButton,
        onLeftButtonClick: () => {
          close();
        },
      });
      return;
    }

    handleOrder({
      paymentMethod: selectedType.toUpperCase(),
      orderItems: orderItems.map(item => ({
        voucherId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }))
    });
  };

  return (
    <form name="paymentForm" method="post" encType="application/x-www-form-urlencoded">
      <div>
        {orderData && <HiddenInputs orderData={orderData} />}
        <PaymentMethodSelectBox selectedType={selectedType} setSelectedType={setSelectedType} />
        <Spacing margin="30px" />
        <ConfirmAndPayTheAmountBox
          selectedType={selectedType}
          totalAmount={Math.round(totalAmount)}
          setPayAmount={setPayAmount}
        />
        <Spacing margin="30px" />
        <Flex justify="space-between" align="center" className={s.totalPayAmountBox}>
          <span className={s.whiteText}>최종 결제 금액</span>
          <span className={s.whiteText} style={{ fontWeight: 'bold' }}>
            {Math.round(payAmount).toLocaleString()} 원
          </span>
        </Flex>
        <Spacing margin="15px" />
        <Button
          color={vars.color.white}
          className={clsx(s.responsiveLargeText, cs.lightBlueButton)}
          style={{ height: '60px', maxWidth: '100%' }}
          onClick={handlePayment}>
          결제요청
        </Button>
      </div>
    </form>
  );
};

export default CartPaymentInfoItemBox;

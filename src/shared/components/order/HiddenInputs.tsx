import { OrderData } from '@/hooks/useOrder';

interface Props {
  orderData: OrderData;
}

const HiddenInputs = ({ orderData }: Props) => {
  return (
    <>
      <input type="hidden" name="SERVICE_ID" value={orderData.SERVICE_ID} />
      <input type="hidden" name="SERVICE_CODE" value={orderData.SERVICE_CODE} />
      <input type="hidden" name="SERVICE_TYPE" value={orderData.SERVICE_TYPE} />
      <input type="hidden" name="ORDER_ID" value={orderData.ORDER_ID} />
      <input type="hidden" name="ORDER_DATE" value={orderData.ORDER_DATE} />
      <input type="hidden" name="AMOUNT" value={orderData.AMOUNT} />
      <input type="hidden" name="RETURN_URL" value={orderData.RETURN_URL} />
      <input type="hidden" name="ITEM_CODE" value={orderData.ITEM_CODE} />
      <input type="hidden" name="ITEM_NAME" value={orderData.ITEM_NAME} />
      <input type="hidden" name="USER_ID" value={orderData.USER_ID || ''} />
      <input type="hidden" name="USER_NAME" value={orderData.USER_NAME || ''} />
      <input type="hidden" name="USER_EMAIL" value={orderData.USER_EMAIL || ''} />
      <input type="hidden" name="LOGO" value={orderData.LOGO} />
    </>
  );
};

export default HiddenInputs;
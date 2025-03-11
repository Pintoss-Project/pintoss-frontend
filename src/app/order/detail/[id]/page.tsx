import PageSection from '@/components/PageSection';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import { Flex } from '@/shared/components/layout';
import * as s from '@/components/order/OrderStyle.css';
import OrderDetail from '@/components/order/OrderDetail';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return (
        <ProtectedRoute>
            <Flex justify="center" className={s.container}>
                <PageSection header="주문내역" main={<OrderDetail orderId={id} />} />
            </Flex>
        </ProtectedRoute>
    );
}
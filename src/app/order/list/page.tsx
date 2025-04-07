import OrderMain from '@/components/order/OrderMain';
import * as s from '@/components/order/OrderStyle.css';

import PageSection from '@/components/PageSection';
import ProtectedRoute from '@/components/protect/ProtectedRoute';
import { Flex } from '@/shared/components/layout';
import { useEffect } from 'react';

const OrderList = () => {

    useEffect(() => {
        // Check if the current window is a popup
        if (window.opener && window !== window.top) {
            // Redirect the parent window to the current URL
            window.opener.location.href = window.location.href;
            // Close the popup window
            window.close();
        }
    }, []);

	return (
		<ProtectedRoute>
			<Flex justify="center" className={s.container}>
				<PageSection header="주문내역" main={<OrderMain />} />
			</Flex>
		</ProtectedRoute>
	);
};

export default OrderList;

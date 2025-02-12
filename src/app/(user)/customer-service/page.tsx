import { CustomerMainWithSuspense } from '@/components/customer/CustomerMain';
import CustomerSection from '@/components/customer/CustomerSection';
import Spinner from '@/shared/components/spinner/Spinner';
import { Suspense } from 'react';

const CustomerService = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<CustomerSection main={<CustomerMainWithSuspense />} />
		</Suspense>
	);
};

export default CustomerService;

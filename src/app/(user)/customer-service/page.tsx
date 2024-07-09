import CustomerMain from '@/components/customer/CustomerMain';
import CustomerSection from '@/components/customer/CustomerSection';

const CustomerService = () => {
	return <CustomerSection main={<CustomerMain />} />;
};

export default CustomerService;

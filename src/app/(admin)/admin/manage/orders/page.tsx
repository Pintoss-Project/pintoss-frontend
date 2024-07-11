import AdminMainSection from '@/components/admin/AdminMainSection';
import AdminOrderMain from '@/components/admin/AdminOrderMain';

const ManageOrders = () => {
	return <AdminMainSection title="주문내역" main={<AdminOrderMain />} />;
};

export default ManageOrders;

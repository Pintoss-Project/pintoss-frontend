import AdminMainSection from '@/components/admin/AdminMainSection';
import AdminProductMain from '@/components/admin/AdminProductMain';

const ManageProducts = () => {
	return <AdminMainSection title="상품권 관리" main={<AdminProductMain />} />;
};

export default ManageProducts;

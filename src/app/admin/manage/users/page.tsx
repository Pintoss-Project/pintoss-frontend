import AdminMainSection from '@/components/admin/AdminMainSection';
import AdminUserMain from '@/components/admin/AdminUserMain';

const ManageUsers = () => {
	return <AdminMainSection title="회원관리" main={<AdminUserMain />} />;
};

export default ManageUsers;

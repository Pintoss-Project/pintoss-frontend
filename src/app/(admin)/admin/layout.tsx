import AdminSideBar from '@/components/admin/AdminSideBar';
import { Flex } from '@/shared/components/layout';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Flex justify="center">
			<AdminSideBar />
			<section style={{ width: '80%' }}>{children}</section>
		</Flex>
	);
};

export default AdminLayout;

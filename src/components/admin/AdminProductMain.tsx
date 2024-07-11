import { Flex } from '@/shared/components/layout';
import ManageFeeBox from './ManageFeeBox';
import AddProductBox from './AddProductBox';
import AdminProductList from './AdminProductList';
import Spacing from '@/shared/components/layout/Spacing';

const AdminProductMain = () => {
	return (
		<div>
			<Flex>
				<ManageFeeBox />
				<AddProductBox />
			</Flex>
			<Spacing margin="50px" />
			<AdminProductList />
		</div>
	);
};

export default AdminProductMain;

import { Flex } from '@/shared/components/layout';
import SiteInfoBox from './SiteInfoBox';
import AddBannerBox from './AddBannerBox';
import BannerListBox from './BannerListBox';
import Spacing from '@/shared/components/layout/Spacing';

const AdminBannerMain = () => {
	return (
		<div>
			<Flex>
				<SiteInfoBox />
				<AddBannerBox />
			</Flex>
			<Spacing margin="50px" />
			<BannerListBox />
		</div>
	);
};

export default AdminBannerMain;

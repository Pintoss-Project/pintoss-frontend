'use client';

import { fetchBannerInfo } from '@/controllers/site/fetchBannerInfo';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { BannerInfoFormData } from '@/utils/validation/site';
import { useState } from 'react';
import AddBannerBox from './AddBannerBox';
import BannerListBox from './BannerListBox';
import SiteInfoBox from './SiteInfoBox';

const AdminBannerMain = () => {
	const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
	const [initialBannerData, setInitialBannerData] = useState<BannerInfoFormData | null>(null);

	const handleEdit = async (id: number) => {
		const banner = await fetchBannerInfo(id);
		setInitialBannerData(banner.data);
		setEditingBannerId(id);
	};

	const handleResetEdit = () => {
		setEditingBannerId(null);
		setInitialBannerData({
			bannerTitle: '',
			bannerLink: '',
			desktopImageUrl: '',
			mobileImageUrl: '',
		});
	};

	const handleDelete = () => {
		handleResetEdit();
	};

	return (
		<div>
			<Flex>
				<SiteInfoBox />
				<AddBannerBox
					editingBannerId={editingBannerId}
					initialBannerData={initialBannerData}
					onResetEdit={handleResetEdit}
				/>
			</Flex>
			<Spacing margin="50px" />
			<BannerListBox onEdit={handleEdit} onDelete={handleDelete} />
		</div>
	);
};

export default AdminBannerMain;

'use client';

import { Flex } from '@/shared/components/layout';
import SiteInfoBox from './SiteInfoBox';
import AddBannerBox from './AddBannerBox';
import BannerListBox from './BannerListBox';
import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import { getBannerById } from '@/app/api/site/getBannerById';
import { BannerInfoFormData } from '@/utils/validation/site';

const AdminBannerMain = () => {
	const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
	const [initialBannerData, setInitialBannerData] = useState<BannerInfoFormData | null>(null);

	const handleEdit = async (id: number) => {
		const banner = await getBannerById(id);
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

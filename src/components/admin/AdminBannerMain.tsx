'use client';

import { Flex } from '@/shared/components/layout';
import SiteInfoBox from './SiteInfoBox';
import AddBannerBox from './AddBannerBox';
import BannerListBox from './BannerListBox';
import Spacing from '@/shared/components/layout/Spacing';
import { useState } from 'react';
import { getBannerById } from '@/app/api/site/getBannerById';

const AdminBannerMain = () => {
	const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
	const [initialBannerData, setInitialBannerData] = useState<any>(null);

	const handleEdit = async (id: number) => {
		const banner = await getBannerById(id);
		setInitialBannerData(banner);
		setEditingBannerId(id);
	};

	const handleResetEdit = () => {
		setEditingBannerId(null);
		setInitialBannerData(null);
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
			<BannerListBox onEdit={handleEdit} />
		</div>
	);
};

export default AdminBannerMain;

'use client';

import authState from '@/recoil/authAtom';
import { Flex } from '@/shared/components/layout';
import { checkExpiration } from '@/utils/checkTokenExpiration';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AdminSideBarLeft from './AdminSideBarLeft';
import AdminSideBarRight from './AdminSideBarRight';

const SIDEBAR_TITLE_MAP: Record<string, string> = {
	'/admin/manage/users': '회원관리',
	'/admin/manage/boards': '게시글관리',
	'/admin/manage/orders': '주문관리',
	'/admin/manage/products': '상품권관리',
};

const SIDEBAR_MENU_MAP: Record<string, { name: string; type: string }[]> = {
	'/admin/manage/users': [{ name: '회원정보관리', type: 'user_info' }],
	'/admin/manage/boards': [
		{ name: '정보 및 배너관리', type: 'banner' },
		{ name: '공지사항', type: 'notice' },
		{ name: '자주 묻는 질문', type: 'faqs' },
	],
	'/admin/manage/orders': [{ name: '주문내역', type: 'order_list' }],
	'/admin/manage/products': [{ name: '상품권관리', type: 'product_info' }],
};

const AdminSideBar = () => {
	const path = usePathname();
	const [authStateValue, setAuthStateValue] = useRecoilState(authState);
	const router = useRouter();

	const { isAdminLoggedIn } = authStateValue;

	useEffect(() => {
		const token = checkExpiration();

		if (!token) {
			setAuthStateValue((prev) => ({ ...prev, isAdminLoggedIn: false }));
			if (!isAdminLoggedIn) {
				router.push('/admin/login');
			}
		}

		const interval = setInterval(() => {
			checkExpiration();
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, []);

	if (path.includes('login')) return null;

	return (
		<Flex style={{ width: '20%' }}>
			<AdminSideBarLeft />
			<AdminSideBarRight title={SIDEBAR_TITLE_MAP[path]} menus={SIDEBAR_MENU_MAP[path]} />
		</Flex>
	);
};

export default AdminSideBar;

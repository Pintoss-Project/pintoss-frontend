import * as s from './NavBarStyle.css';

import { Flex, List, ListItem } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import Link from 'next/link';

const NAV_BAR_TOP_MENU = [
	{ name: '고객센터', url: '/customer-service' },
	{ name: '회원가입', url: '/register' },
];

const NavBarTopMenuBox = () => {
	return (
		<div>
			<List spacing={3} variant="unordered">
				<Flex align="center">
					{NAV_BAR_TOP_MENU.map((menu) => (
						<Link href={menu.url} key={menu.name}>
							<li className={s.listItemStyle}>{menu.name}</li>
						</Link>
					))}
					<Link href="/login">
						<div className={s.loginButton}>로그인</div>
					</Link>
				</Flex>
			</List>
		</div>
	);
};

export default NavBarTopMenuBox;

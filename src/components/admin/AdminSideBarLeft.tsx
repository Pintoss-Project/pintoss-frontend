'use client';

import * as s from './AdminStyle.css';
import { Flex } from '@/shared/components/layout';
import { useState, useEffect, useMemo } from 'react';
import ManageUserIcon from '../icons/ManageUserIcon';
import { vars } from '@/shared/styles/theme.css';
import ManageProductIcon from '../icons/ManageProductIcon';
import clsx from 'clsx';
import MessageIcon from '../icons/MessageIcon';
import MenuIcon from '../icons/MenuIcon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AdminSideBarLeft = () => {
	const path = usePathname() || '';
	const replacePath = useMemo(() => path.split('?')[0].replace('/admin/manage', ''), [path]);
	const [selectedIcon, setSelectedIcon] = useState(replacePath);

	useEffect(() => {
		if (selectedIcon !== replacePath) {
			setSelectedIcon(replacePath);
		}
	}, [replacePath, selectedIcon]);

	const handleIconClick = (iconPath: string) => {
		setSelectedIcon(iconPath);
	};

	return (
		<Flex direction="column" justify="flex-start" className={s.adminSideBarContainer}>
			<Link href="/admin/manage/users?type=user_info">
				<Flex
					justify="center"
					align="center"
					className={clsx(s.adminSideBarIconBox, { [s.selectedBg]: selectedIcon === '/users' })}
					onClick={() => handleIconClick('/users')}>
					<ManageUserIcon fill={selectedIcon === '/users' ? vars.color.periwinkle : '#959595'} />
				</Flex>
			</Link>
			<Link href="/admin/manage/products?type=product_info">
				<Flex
					justify="center"
					align="center"
					className={clsx(s.adminSideBarIconBox, { [s.selectedBg]: selectedIcon === '/products' })}
					style={{ position: 'relative' }}
					onClick={() => handleIconClick('/products')}>
					<ManageProductIcon
						fill={selectedIcon === '/products' ? vars.color.periwinkle : '#A0A0A0'}
					/>
					<div className={clsx(s.plusText, { [s.selectedText]: selectedIcon === '/products' })}>
						+
					</div>
				</Flex>
			</Link>
			<Link href="/admin/manage/orders?type=order_list">
				<Flex
					justify="center"
					align="center"
					className={clsx(s.adminSideBarIconBox, { [s.selectedBg]: selectedIcon === '/orders' })}
					onClick={() => handleIconClick('/orders')}>
					<MessageIcon fill={selectedIcon === '/orders' ? vars.color.periwinkle : '#959595'} />
				</Flex>
			</Link>
			<Link href="/admin/manage/boards?type=banner">
				<Flex
					justify="center"
					align="center"
					className={clsx(s.adminSideBarIconBox, {
						[s.selectedBg]: selectedIcon === '/boards',
					})}
					onClick={() => handleIconClick('/boards')}>
					<MenuIcon fill={selectedIcon === '/boards' ? vars.color.periwinkle : '#959595'} />
				</Flex>
			</Link>
		</Flex>
	);
};

export default AdminSideBarLeft;

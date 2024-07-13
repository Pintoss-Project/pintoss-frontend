import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import * as s from './AdminStyle.css';

interface Props {
	title: string;
	menus: { name: string; type: string }[];
}

const AdminSideBarRight = ({ title, menus = [] }: Props) => {
	const path = usePathname();
	const searchParams = useSearchParams();
	const currentType = searchParams.get('type');

	return (
		<div
			style={{
				width: '75%',
				padding: '40px 30px',
				borderRight: `1px solid ${vars.color.lighterGray}`,
			}}>
			<h3 style={{ fontSize: '20px', fontWeight: '600' }}>{title}</h3>
			<Spacing margin="10px" />
			<Flex direction="column" justify="center">
				{menus.map((menu) => (
					<Link
						key={menu.type}
						href={path + '?type=' + menu.type}
						style={{ color: vars.color.black }}>
						<div className={clsx({ [s.selectedText]: currentType === menu.type })}>{menu.name}</div>
						<Spacing margin="5px" />
					</Link>
				))}
			</Flex>
		</div>
	);
};

export default AdminSideBarRight;

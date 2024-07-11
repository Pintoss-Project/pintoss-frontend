import * as s from './AdminStyle.css';
import { Input } from '@/shared/components/input';
import { Flex } from '@/shared/components/layout';
import { vars } from '@/shared/styles/theme.css';
import { ReactNode } from 'react';

interface Props {
	label: string;
	image: ReactNode;
}

const AdminImageField = ({ label, image }: Props) => {
	return (
		<Flex align="center">
			<div className={s.darkGraySmallText} style={{ flex: 1 }}>
				{label}
			</div>
			<div
				style={{
					flex: 3,
					marginLeft: '20px',
				}}>
				{image}
			</div>
		</Flex>
	);
};

export default AdminImageField;

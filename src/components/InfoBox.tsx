import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import { vars } from '@/shared/styles/theme.css';
import { ReactNode } from 'react';

interface Props {
	title: string;
	info: ReactNode;
	className?: string;
}

const InfoBox = ({ title, info, className }: Props) => {
	return (
		<Flex direction="column" style={{ width: '100%' }}>
			<h3
				style={{
					color: vars.color.darkerGray,
					fontSize: '20px',
					fontWeight: '500',
					textAlign: 'left',
				}}>
				{title}
			</h3>
			<Spacing margin="10px" />
			<div className={className}>{info}</div>
		</Flex>
	);
};

export default InfoBox;

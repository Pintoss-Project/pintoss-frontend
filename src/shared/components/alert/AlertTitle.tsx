import { CheckDocIconBlue, CheckDocIconRed } from '../../../../public/svgs';
import { Divider, Flex } from '../layout';
import Image from 'next/image';
import Spacing from '../layout/Spacing';
import { vars } from '@/shared/styles/theme.css';

interface Props {
	iconColor?: string;
	title: string;
}

const AlertTitle = ({ title, iconColor = CheckDocIconBlue }: Props) => {
	return (
		<>
			<Flex justify="flex-start" align="center">
				<Image
					src={iconColor === 'blue' ? CheckDocIconBlue : CheckDocIconRed}
					alt="체크 문서 아이콘"
					width={16}
					height={22}
					style={{ marginRight: '10px' }}
				/>
				<span>{title}</span>
			</Flex>
			<Spacing margin="15px" />
			<Divider color={vars.color['lightest-gray']} />
			<Spacing margin="15px" />
		</>
	);
};

export default AlertTitle;

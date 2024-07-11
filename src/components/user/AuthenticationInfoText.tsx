import * as s from './MyPageStyle.css';

import { Flex } from '@/shared/components/layout';

interface Props {
	text: string;
}

const AuthenticationInfoText = ({ text }: Props) => {
	return (
		<Flex align="center">
			<Flex justify="center" align="center" className={s.authenticationInfoCircle}>
				✓
			</Flex>
			<p className={s.authenticationInfoText}>{text}</p>
		</Flex>
	);
};

export default AuthenticationInfoText;

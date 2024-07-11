import { vars } from '@/shared/styles/theme.css';
import * as s from './MyPageStyle.css';

import { Divider, Flex } from '@/shared/components/layout';

const MemberInfoBox = () => {
	return (
		<Flex direction="column" justify="space-around" className={s.memberInfoInnerBox}>
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이름</span>
				<span className={s.darkerGrayText}>홍길동</span>
			</Flex>
			<Divider color={vars.color['pale-gray']} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>휴대폰</span>
				<span className={s.darkerGrayText}>010-1234-5678</span>
			</Flex>
			<Divider color={vars.color['pale-gray']} />
			<Flex justify="space-between" align="center">
				<span className={s.darkGrayText}>이메일</span>
				<span className={s.darkerGrayText}>abc@gmail.com</span>
			</Flex>
		</Flex>
	);
};

export default MemberInfoBox;

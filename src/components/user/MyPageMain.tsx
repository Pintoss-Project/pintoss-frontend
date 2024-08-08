import * as s from './MyPageStyle.css';

import { Flex } from '@/shared/components/layout';
import InfoBox from '../InfoBox';
import Spacing from '@/shared/components/layout/Spacing';
import MemberInfoBox from './MemberInfoBox';
import SnsInfoBox from './SnsInfoBox';
import AuthenticationInfoBox from './AuthenticationInfoBox';
import { Button } from '@/shared/components/button';
import { vars } from '@/shared/styles/theme.css';

const MyPageMain = () => {
	return (
		<div>
			<Spacing margin="42px" />
			<Flex justify="center" align="center" className={s.memberInfoFlexBox}>
				<InfoBox title="회원정보" info={<MemberInfoBox />} className={s.memberInfoBox} />
				<InfoBox title="SNS 계정 연동" info={<SnsInfoBox />} className={s.snsInfoBox} />
			</Flex>
			<Spacing margin="30px" />
			<div>
				<InfoBox
					title="본인인증"
					info={<AuthenticationInfoBox />}
					className={s.authenticationInfoBox}
				/>
			</div>
			<Spacing margin="170px" />
			<div className={s.excludeMemberButtonWrap}>
				<Flex justify="center" align="center" className={s.grayButton}>
					<Button
						color={vars.color.lightGray}
						style={{ fontSize: '18px', backgroundColor: 'transparent' }}>
						회원탈퇴
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default MyPageMain;

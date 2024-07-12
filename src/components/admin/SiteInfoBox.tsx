import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import { vars } from '@/shared/styles/theme.css';
import AdminInputField from './AdminInputField';
import Spacing from '@/shared/components/layout/Spacing';
import AdminImageField from './AdminImageField';
import BannerImageBox from './BannerImageBox';
import { Button } from '@/shared/components/button';

const SiteInfoBox = () => {
	return (
		<div
			style={{
				width: '58%',
				height: '600px',
				padding: '18px 30px',
				marginRight: '16px',
				backgroundColor: vars.color.white,
				border: `1px solid ${vars.color.lighterGray}`,
			}}>
			<div className={s.blackMediumText}>사이트 정보</div>
			<Spacing margin="23px" />
			<Flex>
				<div style={{ flex: 1 }}>
					<AdminInputField label="상호명" />
					<Spacing margin="25px" />
					<AdminImageField
						label="로고"
						image={<BannerImageBox label1="상단" label2="하단" imageWidth={185} imageHeight={74} />}
					/>
					<Spacing margin="25px" />
					<AdminInputField label="전화번호" />
					<Spacing margin="25px" />
					<AdminInputField label="영업시간" />
				</div>
				<div style={{ flex: 1 }}>
					<AdminInputField label="주소" />
					<Spacing margin="25px" />
					<AdminInputField label="대표명" />
					<Spacing margin="25px" />
					<AdminInputField label="사업자" />
					<Spacing margin="25px" />
					<AdminInputField label="신고번호" />
					<Spacing margin="25px" />
					<AdminInputField label="이메일" />
					<Spacing margin="25px" />
					<AdminInputField label="카카오톡" />
					<Spacing margin="25px" />
					<AdminInputField label="오픈채팅" />
					<Spacing margin="25px" />
				</div>
			</Flex>
			<Spacing margin="50px" />
			<Flex justify="flex-end">
				<Button
					color={vars.color.black}
					style={{
						width: '90px',
						padding: '8px 8px',
						backgroundColor: vars.color.lightestGray,
						border: `1px solid ${vars.color.lightGray}`,
						borderRadius: '5px',
					}}>
					수정
				</Button>
			</Flex>
		</div>
	);
};

export default SiteInfoBox;

import Spacing from '@/shared/components/layout/Spacing';
import * as s from './AdminStyle.css';
import { vars } from '@/shared/styles/theme.css';
import AdminInputField from './AdminInputField';
import { Flex } from '@/shared/components/layout';
import { Button } from '@/shared/components/button';
import BannerImageBox from './BannerImageBox';
import AdminImageField from './AdminImageField';
import { FormProvider, useForm } from 'react-hook-form';

const AddBannerBox = () => {
	const methods = useForm();

	return (
		<FormProvider {...methods}>
			<form
				id="banner-form"
				style={{
					width: '42%',
					height: '600px',
					padding: '18px 30px',
					backgroundColor: vars.color.white,
					border: `1px solid ${vars.color.lighterGray}`,
				}}>
				<div className={s.blackMediumText}>배너 추가</div>
				<Spacing margin="30px" />
				<AdminInputField
					label="제목"
					placeholder="관리용 제목 (사용자에겐 표시되지 않습니다.)"
					name="banner_title"
				/>
				<Spacing margin="30px" />
				<AdminImageField
					label="이미지"
					image={
						<BannerImageBox
							label1="데스크톱 (1400 * 467)"
							label2="모바일 (1000 * 500)"
							imageWidth={200}
							imageHeight={100}
						/>
					}
				/>
				<Spacing margin="40px" />
				<div style={{ position: 'relative' }}>
					<AdminInputField label="링크" name="banner_link" />
					<Flex
						align="center"
						style={{
							position: 'absolute',
							top: '34px',
							right: '0',
							marginLeft: '8px',
							fontSize: '12px',
						}}>
						<input type="checkbox" style={{ marginRight: '4px' }} />새 창에서 열기
					</Flex>
				</div>
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
						추가
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default AddBannerBox;

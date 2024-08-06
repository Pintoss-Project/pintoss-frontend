import { Flex } from '@/shared/components/layout';
import * as s from './AdminStyle.css';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import AdminInputField from './AdminInputField';
import Spacing from '@/shared/components/layout/Spacing';
import AdminImageField from './AdminImageField';
import BannerImageBox from './BannerImageBox';
import { Button } from '@/shared/components/button';
import useAlertContext from '@/hooks/useAlertContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SiteInfoFormData, siteInfoSchema } from '@/utils/validation/site';
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateSiteInfo } from '@/app/api/site/updateSiteInfo';
import { useEffect } from 'react';
import { getSiteInfo } from '@/app/api/site/getSiteInfo';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import SiteError from '@/utils/error/SiteError';

const SiteInfoBox = () => {
	const { open, close } = useAlertContext();

	const { data: siteInfo } = useQuery({
		queryKey: ['siteInfo', 1],
		queryFn: () => getSiteInfo(1),
	});

	console.log(siteInfo);

	const methods = useForm<SiteInfoFormData>({
		resolver: zodResolver(siteInfoSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			tel: '',
			address: '',
			owner: '',
			businesses: '',
			reportNumber: '',
			email: '',
			kakao: '',
			openChat: '',
			businessHour: '',
		},
	});

	const { handleSubmit, reset } = methods;

	useEffect(() => {
		if (siteInfo) {
			reset({
				name: siteInfo.data.name,
				tel: siteInfo.data.tel,
				address: siteInfo.data.address,
				owner: siteInfo.data.owner,
				businesses: siteInfo.data.businesses,
				reportNumber: siteInfo.data.reportNumber,
				email: siteInfo.data.email,
				kakao: siteInfo.data.kakao,
				openChat: siteInfo.data.openChat,
				businessHour: siteInfo.data.businessHour,
			});
		}
	}, [siteInfo, reset]);

	const mutation = useMutation({
		mutationFn: (data: SiteInfoFormData) => updateSiteInfo(1, data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '수정 완료',
				main: <AlertMainTextBox text="사이트 정보가 수정되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
		onError: (error: SiteError) => {
			open({
				width: '300px',
				height: '200px',
				title: '수정 실패',
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const onSubmit: SubmitHandler<SiteInfoFormData> = (data) => {
		mutation.mutate(data);
	};

	return (
		<FormProvider {...methods}>
			<form
				id="site-info-form"
				style={{
					width: '58%',
					height: '600px',
					padding: '18px 30px',
					marginRight: '16px',
					backgroundColor: vars.color.white,
					border: `1px solid ${vars.color.lighterGray}`,
				}}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={s.blackMediumText}>사이트 정보</div>
				<Spacing margin="23px" />
				<Flex>
					<div style={{ flex: 1 }}>
						<AdminInputField label="상호명" name="name" />
						<Spacing margin="25px" />
						<AdminImageField
							label="로고"
							image={
								<BannerImageBox label1="상단" label2="하단" imageWidth={185} imageHeight={74} />
							}
						/>
						<Spacing margin="25px" />
						<AdminInputField label="전화번호" name="tel" />
						<Spacing margin="25px" />
						<AdminInputField label="영업시간" name="businessHour" />
					</div>
					<div style={{ flex: 1 }}>
						<AdminInputField label="주소" name="address" />
						<Spacing margin="25px" />
						<AdminInputField label="대표명" name="owner" />
						<Spacing margin="25px" />
						<AdminInputField label="사업자" name="businesses" />
						<Spacing margin="25px" />
						<AdminInputField label="신고번호" name="reportNumber" />
						<Spacing margin="25px" />
						<AdminInputField label="이메일" name="email" />
						<Spacing margin="25px" />
						<AdminInputField label="카카오톡" name="kakao" />
						<Spacing margin="25px" />
						<AdminInputField label="오픈채팅" name="openChat" />
					</div>
				</Flex>
				<Spacing margin="50px" />
				<Flex justify="flex-end">
					<Button
						form="site-info-form"
						color={vars.color.black}
						style={{
							width: '90px',
							padding: '8px 8px',
							backgroundColor: vars.color.lightestGray,
							border: `1px solid ${vars.color.lightGray}`,
							borderRadius: '5px',
						}}
						type="submit">
						수정
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default SiteInfoBox;

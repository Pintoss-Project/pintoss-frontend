import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import * as s from './AdminStyle.css';
import { vars } from '@/shared/styles/theme.css';
import AdminInputField from './AdminInputField';
import { Flex } from '@/shared/components/layout';
import { Button } from '@/shared/components/button';
import BannerImageBox from './BannerImageBox';
import AdminImageField from './AdminImageField';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { BannerInfoFormData, bannerInfoSchema } from '@/utils/validation/site';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postBanner } from '@/app/api/site/postBanner';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import SiteError from '@/utils/error/SiteError';
import { useEffect } from 'react';
import { updateBanner } from '@/app/api/site/updateBanner';
import { getBannerById } from '@/app/api/site/getBannerById';

const AddBannerBox = ({ editingBannerId, initialBannerData, onResetEdit }: any) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: bannerInfo } = useQuery({
		queryKey: ['banner', editingBannerId],
		queryFn: () => getBannerById(editingBannerId),
		enabled: Boolean(editingBannerId),
	});

	const methods = useForm<BannerInfoFormData>({
		resolver: zodResolver(bannerInfoSchema),
		mode: 'onChange',
		defaultValues: {
			bannerTitle: '',
			bannerLink: '',
		},
	});

	const { handleSubmit, reset } = methods;

	useEffect(() => {
		if (editingBannerId && bannerInfo) {
			reset({
				bannerTitle: bannerInfo.data.bannerTitle,
				bannerLink: bannerInfo.data.bannerLink,
			});
		} else if (!editingBannerId) {
			reset(initialBannerData);
		}
	}, [editingBannerId, bannerInfo, initialBannerData, reset]);

	const mutation = useMutation({
		mutationFn: (data: BannerInfoFormData) =>
			editingBannerId ? updateBanner(editingBannerId, data) : postBanner(data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: editingBannerId ? '배너 수정 완료' : '배너 생성 완료',
				main: (
					<AlertMainTextBox
						text={editingBannerId ? '배너가 수정되었습니다.' : '배너가 생성되었습니다.'}
					/>
				),
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			queryClient.invalidateQueries({ queryKey: ['bannerList'] });
			reset(initialBannerData);
			onResetEdit();
		},
		onError: (error: SiteError) => {
			open({
				width: '300px',
				height: '200px',
				title: editingBannerId ? '배너 수정 실패' : '배너 생성 실패',
				main: <AlertMainTextBox text={error.errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const onSubmit: SubmitHandler<BannerInfoFormData> = (data, event) => {
		event?.preventDefault();
		mutation.mutate(data);
	};

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
				}}
				onSubmit={handleSubmit(onSubmit)}>
				<div className={s.blackMediumText}>{editingBannerId ? '배너 수정' : '배너 추가'}</div>
				<Spacing margin="30px" />
				<AdminInputField
					label="제목"
					placeholder="관리용 제목 (사용자에겐 표시되지 않습니다.)"
					name="bannerTitle"
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
					<AdminInputField label="링크" name="bannerLink" />
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
						form="banner-form"
						color={vars.color.black}
						style={{
							width: '90px',
							padding: '8px 8px',
							backgroundColor: vars.color.lightestGray,
							border: `1px solid ${vars.color.lightGray}`,
							borderRadius: '5px',
						}}
						type="submit">
						{editingBannerId ? '수정' : '추가'}
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default AddBannerBox;

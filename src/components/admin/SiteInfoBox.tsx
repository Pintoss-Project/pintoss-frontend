'use client';

import { deleteImageFromCloudinary } from '@/app/api_n/image/deleteImageFromCloudinary';
import { uploadImageToCloudinary } from '@/app/api_n/image/uploadImageToCloudinary';
import { fetchSiteInfo } from '@/app/api_n/site/fetchSiteInfo';
import { fetchSiteList } from '@/app/api_n/site/fetchSiteList';
import { fetchUpdateSiteInfo } from '@/app/api_n/site/fetchUpdateSiteInfo';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import SiteError from '@/utils/error/SiteError';
import { SiteInfoFormData, siteInfoSchema } from '@/utils/validation/site';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminImageField from './AdminImageField';
import AdminInputField from './AdminInputField';
import * as s from './AdminStyle.css';
import BannerImageBox from './BannerImageBox';

interface ImageUploadResponse {
	public_id: string;
	secure_url: string;
}

interface ImageUrls {
	topImageUrl: string | null | undefined;
	bottomImageUrl: string | null | undefined;
}

const SiteInfoBox = () => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const { data: siteInfoList } = useQuery({
		queryKey: ['siteInfoList'],
		queryFn: () => fetchSiteList(),
	});

	const firstSiteInfoId = siteInfoList?.data?.length ? siteInfoList.data[0].id : null;

	const { data: siteInfo } = useQuery({
		queryKey: ['siteInfo', firstSiteInfoId],
		queryFn: () => (firstSiteInfoId ? fetchSiteInfo(firstSiteInfoId) : Promise.resolve(null)),
		enabled: !!firstSiteInfoId,
	});

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
			topImageUrl: '',
			bottomImageUrl: '',
		},
	});

	const { handleSubmit, reset, setValue, getValues } = methods;

	const [imageUrls, setImageUrls] = useState<ImageUrls>({
		topImageUrl: null,
		bottomImageUrl: null,
	});

	const [isImageAddedTop, setIsImageAddedTop] = useState(false);
	const [isImageAddedBottom, setIsImageAddedBottom] = useState(false);
	const [resetTrigger, setResetTrigger] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

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
				topImageUrl: siteInfo.data.topImageUrl,
				bottomImageUrl: siteInfo.data.bottomImageUrl,
			});

			setImageUrls({
				topImageUrl: siteInfo.data.topImageUrl,
				bottomImageUrl: siteInfo.data.bottomImageUrl,
			});

			setIsImageAddedTop(!!siteInfo.data.topImageUrl);
			setIsImageAddedBottom(!!siteInfo.data.bottomImageUrl);
		}
	}, [siteInfo, reset]);

	const handleImageUpload = async (file: File, imageType: 'top' | 'bottom'): Promise<string> => {
		setIsUploading(true);
		try {
			const result: ImageUploadResponse = await uploadImageToCloudinary(file);
			const imageUrl = result.secure_url;

			if (imageType === 'top') {
				setValue('topImageUrl', imageUrl);
				setImageUrls((prev) => ({ ...prev, topImageUrl: imageUrl }));
				setIsImageAddedTop(true);
			} else {
				setValue('bottomImageUrl', imageUrl);
				setImageUrls((prev) => ({ ...prev, bottomImageUrl: imageUrl }));
				setIsImageAddedBottom(true);
			}

			return imageUrl;
		} catch (error: unknown) {
			open({
				width: '300px',
				height: '200px',
				title: '이미지 업로드 실패',
				main: <AlertMainTextBox text={(error as Error).message} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});

			throw error;
		} finally {
			setIsUploading(false);
		}
	};

	const handleImageDelete = async (imageType: 'top' | 'bottom') => {
		const imageUrl = getValues(imageType === 'top' ? 'topImageUrl' : 'bottomImageUrl');
		if (!imageUrl) return;

		try {
			const publicId = extractPublicIdFromUrl(imageUrl);
			await deleteImageFromCloudinary(publicId);
			setValue(imageType === 'top' ? 'topImageUrl' : 'bottomImageUrl', '');
			if (imageType === 'top') {
				setIsImageAddedTop(false);
				setImageUrls((prev) => ({ ...prev, topImageUrl: null }));
			} else {
				setIsImageAddedBottom(false);
				setImageUrls((prev) => ({ ...prev, bottomImageUrl: null }));
			}
		} catch (error: unknown) {
			open({
				width: '300px',
				height: '200px',
				title: '이미지 삭제 실패',
				main: <AlertMainTextBox text={(error as Error).message} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	const extractPublicIdFromUrl = (url: string): string => {
		const parts = url.split('/');
		const publicIdWithExtension = parts[parts.length - 1];
		return publicIdWithExtension.split('.')[0];
	};

	const mutation = useMutation({
		mutationFn: (data: SiteInfoFormData) => fetchUpdateSiteInfo(1, data),
		onSuccess: () => {
			open({
				width: '300px',
				height: '200px',
				title: '수정 완료',
				main: <AlertMainTextBox text="사이트 정보가 수정되었습니다." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
			setResetTrigger((prev) => !prev);
			queryClient.invalidateQueries({ queryKey: ['siteInfo', firstSiteInfoId] });
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
		if (isUploading) {
			return;
		}
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
								<BannerImageBox<SiteInfoFormData>
									label1="상단"
									label2="하단"
									imageWidth={185}
									imageHeight={74}
									name1="topImageUrl"
									name2="bottomImageUrl"
									setValue={setValue}
									onImageUpload={(file, imageType) =>
										handleImageUpload(file, imageType === 'desktop' ? 'top' : 'bottom')
									}
									onImageDelete={(imageType) =>
										handleImageDelete(imageType === 'desktop' ? 'top' : 'bottom')
									}
									isImageAdded1={isImageAddedTop}
									isImageAdded2={isImageAddedBottom}
									setIsImageAdded1={setIsImageAddedTop}
									setIsImageAdded2={setIsImageAddedBottom}
									initialImageUrls={imageUrls}
									resetTrigger={resetTrigger}
								/>
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
						type="submit"
						disabled={isUploading}>
						수정
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default SiteInfoBox;

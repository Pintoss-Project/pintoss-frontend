'use client';

import { deleteImageFromCloudinary } from '@/app/api_n/image/deleteImageFromCloudinary';
import { uploadImageToCloudinary } from '@/app/api_n/image/uploadImageToCloudinary';
import { fetchRegisterBanner } from '@/app/api_n/site/fetchRegisterBanner';
import { fetchUpdateBanner } from '@/app/api_n/site/fetchUpdateBanner';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import { Button } from '@/shared/components/button';
import { Flex } from '@/shared/components/layout';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { vars } from '@/shared/styles/theme.css';
import SiteError from '@/utils/error/SiteError';
import { BannerInfoFormData, bannerInfoSchema } from '@/utils/validation/site';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminImageField from './AdminImageField';
import AdminInputField from './AdminInputField';
import * as s from './AdminStyle.css';
import BannerImageBox from './BannerImageBox';

interface AddBannerBoxProps {
	editingBannerId: number | null;
	initialBannerData: BannerInfoFormData | null;
	onResetEdit: () => void;
}

const AddBannerBox = ({ editingBannerId, initialBannerData, onResetEdit }: AddBannerBoxProps) => {
	const { open, close } = useAlertContext();
	const queryClient = useQueryClient();

	const methods = useForm<BannerInfoFormData>({
		resolver: zodResolver(bannerInfoSchema),
		mode: 'onChange',
		defaultValues: {
			bannerTitle: '',
			bannerLink: '',
			desktopImageUrl: '',
			mobileImageUrl: '',
		},
	});

	const { handleSubmit, reset, setValue } = methods;

	const [imageUrls, setImageUrls] = useState<{
		desktopImageUrl: string;
		mobileImageUrl: string;
	}>({
		desktopImageUrl: '',
		mobileImageUrl: '',
	});

	const [isImageAdded1, setIsImageAdded1] = useState(false);
	const [isImageAdded2, setIsImageAdded2] = useState(false);
	const [resetTrigger, setResetTrigger] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		if (editingBannerId && initialBannerData) {
			reset({
				bannerTitle: initialBannerData.bannerTitle,
				bannerLink: initialBannerData.bannerLink,
				desktopImageUrl: initialBannerData.desktopImageUrl || '',
				mobileImageUrl: initialBannerData.mobileImageUrl || '',
			});

			setImageUrls({
				desktopImageUrl: initialBannerData.desktopImageUrl || '',
				mobileImageUrl: initialBannerData.mobileImageUrl || '',
			});

			setIsImageAdded1(!!initialBannerData.desktopImageUrl);
			setIsImageAdded2(!!initialBannerData.mobileImageUrl);
		} else {
			resetForm();
		}
	}, [editingBannerId, initialBannerData, reset]);

	const resetForm = () => {
		reset({ bannerTitle: '', bannerLink: '', desktopImageUrl: '', mobileImageUrl: '' });
		setImageUrls({ desktopImageUrl: '', mobileImageUrl: '' });
		setIsImageAdded1(false);
		setIsImageAdded2(false);
		setResetTrigger((prev) => !prev);
	};

	const handleImageUpload = async (
		file: File,
		imageType: 'desktop' | 'mobile',
	): Promise<string> => {
		setIsUploading(true);
		try {
			const result = await uploadImageToCloudinary(file);
			const imageUrl = result.secure_url;

			if (imageType === 'desktop') {
				setValue('desktopImageUrl', imageUrl);
				setImageUrls((prev) => ({ ...prev, desktopImageUrl: imageUrl }));
				setIsImageAdded1(true);
			} else {
				setValue('mobileImageUrl', imageUrl);
				setImageUrls((prev) => ({ ...prev, mobileImageUrl: imageUrl }));
				setIsImageAdded2(true);
			}

			return imageUrl;
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
			open({
				width: '300px',
				height: '200px',
				title: '이미지 업로드 실패',
				main: <AlertMainTextBox text={errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});

			throw new Error(errorMessage);
		} finally {
			setIsUploading(false);
		}
	};

	const handleImageDelete = async (imageType: 'desktop' | 'mobile') => {
		try {
			if (imageType === 'desktop' && imageUrls.desktopImageUrl) {
				await deleteImageFromCloudinary(imageUrls.desktopImageUrl);
				setValue('desktopImageUrl', '');
				setImageUrls((prev) => ({ ...prev, desktopImageUrl: '' }));
				setIsImageAdded1(false);
			} else if (imageType === 'mobile' && imageUrls.mobileImageUrl) {
				await deleteImageFromCloudinary(imageUrls.mobileImageUrl);
				setValue('mobileImageUrl', '');
				setImageUrls((prev) => ({ ...prev, mobileImageUrl: '' }));
				setIsImageAdded2(false);
			}
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : '이미지 삭제에 실패했습니다.';
			open({
				width: '300px',
				height: '200px',
				title: '이미지 삭제 실패',
				main: <AlertMainTextBox text={errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	const mutation = useMutation({
		mutationFn: (data: BannerInfoFormData) =>
			editingBannerId ? fetchUpdateBanner(editingBannerId, data) : fetchRegisterBanner(data),
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

			resetForm();

			onResetEdit();
		},
		onError: async (error: SiteError) => {
			try {
				if (imageUrls.desktopImageUrl) {
					await deleteImageFromCloudinary(imageUrls.desktopImageUrl);
				}
				if (imageUrls.mobileImageUrl) {
					await deleteImageFromCloudinary(imageUrls.mobileImageUrl);
				}
			} catch (deleteError) {
				const deleteErrorMessage =
					deleteError instanceof Error ? deleteError.message : '이미지 삭제 실패';
				console.error('Failed to delete images from Cloudinary:', deleteErrorMessage);
				open({
					width: '300px',
					height: '200px',
					title: '이미지 삭제 실패',
					main: <AlertMainTextBox text={deleteErrorMessage} />,
					rightButtonStyle: cs.lightBlueButton,
					onRightButtonClick: close,
				});
			}

			const errorMessage = error.errorMessage || '배너 생성/수정에 실패했습니다.';
			open({
				width: '300px',
				height: '200px',
				title: editingBannerId ? '배너 수정 실패' : '배너 생성 실패',
				main: <AlertMainTextBox text={errorMessage} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		},
	});

	const onSubmit: SubmitHandler<BannerInfoFormData> = (data, event) => {
		event?.preventDefault();
		if (isUploading) {
			return;
		}

		if (imageUrls.desktopImageUrl === '' || imageUrls.mobileImageUrl === '') {
			open({
				width: '300px',
				height: '200px',
				title: '이미지 정보 등록',
				main: <AlertMainTextBox text="데스크탑 이미지와 모바일 이미지를 모두 등록해주세요." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		} else {
			mutation.mutate(data);
		}
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
						<BannerImageBox<BannerInfoFormData>
							label1="데스크톱 (1400 * 467)"
							label2="모바일 (1000 * 500)"
							imageWidth={200}
							imageHeight={100}
							name1="desktopImageUrl"
							name2="mobileImageUrl"
							setValue={setValue}
							onImageUpload={(file, imageType) => handleImageUpload(file, imageType)}
							onImageDelete={(imageType) => handleImageDelete(imageType)}
							isImageAdded1={isImageAdded1}
							isImageAdded2={isImageAdded2}
							setIsImageAdded1={setIsImageAdded1}
							setIsImageAdded2={setIsImageAdded2}
							initialImageUrls={imageUrls}
							resetTrigger={resetTrigger}
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
						type="submit"
						disabled={isUploading}>
						{editingBannerId ? '수정' : '추가'}
					</Button>
				</Flex>
			</form>
		</FormProvider>
	);
};

export default AddBannerBox;

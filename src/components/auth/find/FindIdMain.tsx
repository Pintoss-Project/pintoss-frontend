import { fetchFindId } from '@/controllers/auth/fetchFindId';
import * as as from '@/components/auth/AuthStyle.css';
import useAlertContext from '@/hooks/useAlertContext';
import AlertMainTextBox from '@/shared/components/alert/AlertMainTextBox';
import Spacing from '@/shared/components/layout/Spacing';
import * as cs from '@/shared/styles/common.css';
import { FindIdFormData, findIdSchema } from '@/utils/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import FindIdButton from './FindIdButton';
import FindIdInputBox from './FindIdInputBox';
import { apiClient } from '@/controllers/new-api-service';

const FindIdMain = () => {
	const { open, close } = useAlertContext();

	const methods = useForm<FindIdFormData>({
		resolver: zodResolver(findIdSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			phone: '',
		},
	});

	const [isSearchCompleted, setIsSearchCompleted] = useState(false);

	const handleSubmit: SubmitHandler<FindIdFormData> = async (data, event) => {
		event?.preventDefault();

		try {
			const response = await apiClient.findId(data.name, data.phone);
			const result = response.data;
			methods.setValue('account', result.account);
			setIsSearchCompleted(true);
			open({
				width: '300px',
				height: '200px',
				title: '아이디 찾기 성공',
				main: <AlertMainTextBox text={`아이디 찾기가 완료되었습니다.`} />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		} catch (error) {
			open({
				width: '300px',
				height: '200px',
				title: '아이디 찾기 실패',
				main: <AlertMainTextBox text="아이디 찾기에 실패했습니다. 다시 시도해주세요." />,
				rightButtonStyle: cs.lightBlueButton,
				onRightButtonClick: close,
			});
		}
	};

	return (
		<FormProvider {...methods}>
			<form id="find-id-form" onSubmit={methods.handleSubmit(handleSubmit)}>
				<Spacing margin="100px" />
				{!isSearchCompleted && (
					<>
						<FindIdInputBox name="name" label="이름" star placeholder="이름을 입력해주세요." />
						<Spacing margin="20px" />
						<FindIdInputBox
							name="phone"
							label="휴대폰"
							star
							placeholder="휴대폰 번호를 입력해주세요."
						/>
						<Spacing margin="40px" />
					</>
				)}
				{isSearchCompleted && (
					<FindIdInputBox name="account" label="계정" star placeholder="찾은 계정" disabled />
				)}
				<Spacing margin="100px" />
				<footer className={as.footerWrap}>
					<FindIdButton disabled={false} />
				</footer>
				<Spacing margin="100px" />
			</form>
		</FormProvider>
	);
};

export default FindIdMain;

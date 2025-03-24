import * as s from '@/components/auth/AuthStyle.css';
import SocialLoginRedirect from '@/components/user/SocialLoginRedirect';
import { Flex } from '@/shared/components/layout';

const Page = () => {

	return (
		<Flex justify="center" className={s.container}>
            <SocialLoginRedirect />
		</Flex>
	);
};

export default Page;

import ValidationMessage from './ValidationMessage';

interface Props {
	firstMessage?: string;
}

const ValidationMessages = ({ firstMessage }: Props) => {
	return (
		<div>
			<ValidationMessage text={firstMessage} />
		</div>
	);
};

export default ValidationMessages;

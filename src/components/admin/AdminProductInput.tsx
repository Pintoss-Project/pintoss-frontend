import { Flex } from '@/shared/components/layout';
import { Input } from '@/shared/components/input';
import { vars } from '@/shared/styles/theme.css';
import * as s from './AdminStyle.css';
import { ReactNode } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface Props<T extends FieldValues> {
	name: Path<T>;
	type?: string;
	label?: string;
	children?: ReactNode;
	placeholder?: string;
	value?: string;
	className?: string;
	style?: React.CSSProperties | undefined;
	flex: string;
	checked?: boolean;
}

const AdminProductInput = <T extends FieldValues>({
	name,
	type,
	label,
	children,
	placeholder,
	className,
	style,
	flex,
	checked,
}: Props<T>) => {
	const { control } = useFormContext<T>();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Flex align="center">
					{label && (
						<div className={s.darkGraySmallText} style={{ flex: '1' }}>
							{label}
						</div>
					)}
					<div
						style={{
							flex,
							marginLeft: '1.5%',
							padding: type === 'textarea' ? '0' : '0 10px',
							borderBottom:
								type === 'file' || type === 'textarea' || type === 'select' || type === 'checkbox'
									? 'none'
									: `1px solid ${vars.color.lighterGray}`,
						}}>
						{children ? (
							children
						) : type === 'checkbox' ? (
							<Input
								{...field}
								id={name}
								className={className || s.baseInputStyle}
								placeholder={placeholder}
								type={type}
								checked={field.value || false}
								onChange={(e) => field.onChange(e.target.checked)}
								style={style}
							/>
						) : (
							<Input
								{...field}
								id={name}
								className={className || s.baseInputStyle}
								placeholder={placeholder}
								type={type}
								value={field.value}
								onChange={field.onChange}
								style={style}
							/>
						)}
					</div>
				</Flex>
			)}
		/>
	);
};

export default AdminProductInput;

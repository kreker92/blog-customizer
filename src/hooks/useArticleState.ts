import { useState } from 'react';

export type SetArticlesType<T, P> = (value: Partial<ValueType<T, P>>) => void;

type ValueType<T, P> = Record<keyof T, P>;

export const useArticleState = <T, P>(
	initialValue: ValueType<T, P>
): [ValueType<T, P>, SetArticlesType<T, P>] => {
	const [value, setValue] = useState<ValueType<T, P>>(initialValue);

	const onChange = (newValue: Partial<ValueType<T, P>>) => {
		if (Object.keys(newValue).length) {
			setValue({
				...value,
				...newValue,
			});
		} else {
			setValue(initialValue);
		}
	};

	return [value, onChange];
};

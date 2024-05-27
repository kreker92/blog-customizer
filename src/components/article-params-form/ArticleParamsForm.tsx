import { ArrowButton } from 'components/arrow-button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Form } from '../form';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { SetArticlesType } from 'src/hooks/useArticleState';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleParamsFormType = {
	onChange: SetArticlesType<ArticleStateType, OptionType>;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = (formProps: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const sidebarButtonRef = useRef<HTMLDivElement | null>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		refs: [sidebarRef, sidebarButtonRef],
		tags: ['li'],
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				btnRef={sidebarButtonRef}
				onClick={() => setIsOpen(!isOpen)}
				isOpened={isOpen}
			/>
			<aside
				ref={sidebarRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<Form styles={styles} {...formProps} />
			</aside>
		</>
	);
};

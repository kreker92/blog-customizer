import { useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormType = {
	onChange: (acticleState: ArticleStateType) => void;
	articleState: ArticleStateType;
};

export const ArticleParamsForm = (formProps: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const [formState, setFormState] = useState<ArticleStateType>(
		formProps.articleState
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formProps.onChange({ ...formState });
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		formProps.onChange(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton
				onClick={(e: React.MouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				isOpened={isOpen}
			/>
			<aside
				ref={sidebarRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState['fontFamilyOption']}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected: OptionType) =>
							setFormState({
								...formState,
								fontFamilyOption: selected,
							})
						}
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState['fontSizeOption']}
						onChange={(selected: OptionType) =>
							setFormState({
								...formState,
								fontSizeOption: selected,
							})
						}
					/>
					<Select
						selected={formState['fontColor']}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected: OptionType) =>
							setFormState({
								...formState,
								fontColor: selected,
							})
						}
					/>
					<Separator />
					<Select
						selected={formState['backgroundColor']}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected: OptionType) =>
							setFormState({
								...formState,
								backgroundColor: selected,
							})
						}
					/>
					<Select
						selected={formState['contentWidth']}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected: OptionType) =>
							setFormState({
								...formState,
								contentWidth: selected,
							})
						}
					/>
					<div className={styles.bottomContainer}>
						<Button onClick={handleReset} title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

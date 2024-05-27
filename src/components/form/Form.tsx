import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import { SetArticlesType, useArticleState } from 'src/hooks/useArticleState';
import { useRef } from 'react';

type FormProps = {
	styles: Record<string, string>;
	onChange: SetArticlesType<ArticleStateType, OptionType>;
	articleState: ArticleStateType;
};

export const Form = ({ styles, articleState, onChange }: FormProps) => {
	const [localArticleState, setLocalArticleState] =
		useArticleState(articleState);
	const defaultStateRef = useRef(articleState);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChange({ ...localArticleState });
	};

	const handleReset = () => {
		setLocalArticleState(defaultStateRef.current);
		onChange({});
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Text>Задайте параметры</Text>
			<Select
				selected={localArticleState['fontFamilyOption']}
				options={fontFamilyOptions}
				title='Шрифт'
				onChange={(selected: OptionType) =>
					setLocalArticleState({ fontFamilyOption: selected })
				}
			/>
			<RadioGroup
				name='fontSize'
				title='Размер шрифта'
				options={fontSizeOptions}
				selected={localArticleState['fontSizeOption']}
				onChange={(selected: OptionType) =>
					setLocalArticleState({ fontSizeOption: selected })
				}
			/>
			<Select
				selected={localArticleState['fontColor']}
				options={fontColors}
				title='Цвет шрифта'
				onChange={(selected: OptionType) =>
					setLocalArticleState({ fontColor: selected })
				}
			/>
			<Separator />
			<Select
				selected={localArticleState['backgroundColor']}
				options={backgroundColors}
				title='Цвет фона'
				onChange={(selected: OptionType) =>
					setLocalArticleState({ backgroundColor: selected })
				}
			/>
			<Select
				selected={articleState['contentWidth']}
				options={contentWidthArr}
				title='Ширина контента'
				onChange={(selected: OptionType) =>
					setLocalArticleState({ contentWidth: selected })
				}
			/>
			<div className={styles.bottomContainer}>
				<Button onClick={handleReset} title='Сбросить' type='reset' />
				<Button title='Применить' type='submit' />
			</div>
		</form>
	);
};

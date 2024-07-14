import { Text, TextStyle } from 'react-native';
import { translate } from "../../i18n";
import Translatable from "../../classes/Translatable";
import { useLang } from "../../store/hooks";

interface TranslatableTextProps {
    data: string|Translatable;
    style?: TextStyle;
}

export default function TranslatableText(props: TranslatableTextProps): JSX.Element {
    const { selectedLangWriteFrom, selectedLang } = useLang();

    return (
        <Text {...props} style={{ textAlign: selectedLangWriteFrom, ...props.style }}>{translate(props.data, selectedLang)}</Text>
    );
};

import { Text, TextStyle } from 'react-native';
import { translate } from "../../i18n";
import Translatable from "../../classes/Translatable";
import { useLang } from "../../store/hooks";
import { styled } from 'nativewind';

interface TranslatableTextProps {
  data: string | Translatable;
  params?: any;
  style?: TextStyle|TextStyle[];
}

function TranslatableText({ data, params = {}, style = [] }: TranslatableTextProps): JSX.Element {
  const { selectedLangWriteFrom, selectedLang } = useLang();
  return (
    <Text style={[ {textAlign: selectedLangWriteFrom}, ...style ]}>{translate(data, selectedLang, params)}</Text>
  );
};

export default styled(TranslatableText)
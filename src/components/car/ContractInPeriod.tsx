import {default as ContractClass} from '../../classes/Contract';
import { View } from "react-native";
import { formatDateTime, diffInDays } from "../../support/utils";
import TranslatableText from "../../components/common/TranslatableText";

export interface ContractInPeriodProps {
  data: ContractClass,
}

export default function ContractInPeriod({ data }: ContractInPeriodProps): JSX.Element {
  const days = diffInDays(data.starts_at, data.ends_at);

  return (<View className='border-t py-1 mx-5'>
    <TranslatableText data={'car:contract:starts_at'} params={{ date: formatDateTime(data.starts_at) }} className='text-lg' />
    <TranslatableText data={'car:contract:ends_at'} params={{ date: formatDateTime(data.ends_at) }} className='text-lg' />
    <TranslatableText data={'client:days_rented'} params={{ days }} className={'text-lg'} />
  </View>);
}
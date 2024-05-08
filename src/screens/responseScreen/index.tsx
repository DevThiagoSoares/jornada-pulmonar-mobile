import { CorrectResponse } from './components/response-correct';
import { ErrorResponse } from './components/response-error';

import { useData } from '~/Shared/hooks/audio.context';

export function ScreenResponse() {
  const { data } = useData();
  const isAnswer = data?.isAnswer;
  return isAnswer ? <CorrectResponse /> : <ErrorResponse />;
}

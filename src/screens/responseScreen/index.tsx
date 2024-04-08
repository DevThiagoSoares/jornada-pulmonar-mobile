import { CorrectResponse } from './components/response-correct';
import { ErrorResponse } from './components/response-error';

export function ScreenResponse() {
  const isAnswer = false;
  return isAnswer ? <CorrectResponse /> : <ErrorResponse />;
}

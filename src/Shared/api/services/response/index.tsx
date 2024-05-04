import { api } from '../../api-config';

export interface payloadProps {
  optionId: string;
  questionId: string;
  userId: string;
  time: number;
}
export async function answer(payload: payloadProps) {
  return await api.get(
    `/api/v1/users/${payload.optionId}/${payload.questionId}/${payload.userId}/${payload.time}`
  );
}

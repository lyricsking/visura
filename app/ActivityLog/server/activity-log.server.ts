// utils/logging.server.ts
import Log from '~/models/Log';

export type LogActivityProps = {
    action: string,
    details: string,
    userId?: string,
    staffId?: string,
    orderId?: string,
    subscriptionId?: string

}

export async function logActivity(props: LogActivityProps) {
  const { action, details, userId, staffId, orderId, subscriptionId } = props;
  
  const log = new Log({
    action,
    details,
    userId,
    staffId,
    orderId,
    subscriptionId,
  });
  return await log.save();
}

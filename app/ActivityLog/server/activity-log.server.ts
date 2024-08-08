import ActivityLog from "../models/activity-log.model";

export type LogActivityProps = {
  action: string;
  details: string;
  userId?: string;
  staffId?: string;
  orderId?: string;
  subscriptionId?: string;
};

export async function logActivity(props: LogActivityProps) {
  const { action, details, userId, staffId, orderId, subscriptionId } = props;

  const log = new ActivityLog({
    action,
    details,
    userId,
    staffId,
    orderId,
    subscriptionId,
  });
  return await log.save();
}

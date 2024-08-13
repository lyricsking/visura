import ActivityLog from "../models/activity-log.model";

export type LogActivityProps = {
  action: string;
  details: string;
  order?: string;
  staff?: string;
  subscription?: string;
  ticket?: string;
  user?: string;
};

export async function logActivity(props: LogActivityProps) {
  const { action, details, order, staff, subscription, ticket, user } = props;

  const log = new ActivityLog({
    action,
    details,
    order,
    staff,
    subscription,
    ticket,
    user,
  });
  return await log.save();
}

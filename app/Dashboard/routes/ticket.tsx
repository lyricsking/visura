// routes/tickets.tsx
import { useLoaderData, Form, redirect } from 'remix';
import { getUserTickets, submitTicket } from '~/utils/ticketUtils';

export const loader = async ({ request }) => {
  const tickets = await getUserTickets(request);
  return { tickets };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const subject = formData.get('subject');
  const message = formData.get('message');

  await submitTicket({ subject, message });

  return redirect('/tickets');
};

export default function Tickets() {
  const { tickets } = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
      <Form method="post" className="mt-6 bg-white shadow sm:rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" name="subject" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" rows="4"></textarea>
        </div>
        <div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">Submit Ticket</button>
        </div>
      </Form>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Your Tickets</h2>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="mt-4">
              <details className="border border-gray-200 rounded-md p-4">
                <summary className="font-medium text-gray-900 cursor-pointer">Ticket #{ticket.id}: {ticket.subject}</summary>
                <p className="mt-2 text-sm text-gray-600">{ticket.message}</p>
                <p className="mt-2 text-sm text-gray-600">Status: {ticket.status}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

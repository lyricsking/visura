import Ticket from '~/models/Ticket';

export async function addToQueue(ticketId: string) {
  return await Ticket.findByIdAndUpdate(ticketId, { $set: { status: 'queue' } });
}

export async function pickTicket(staffId: string) {
  const staff = await Staff.countDoc(staffId);

  if (staff > 0) {
    throw new Error('Staff member is not available');
  }

  // Find a new ticket from the queue
  const ticket = await Ticket.findOne({ status: 'queue' }).sort({ priority: -1 });

  if (!ticket) {
    throw new Error('Tickets not available in the queue');
  }

  // Assign the ticket to the staff
  ticket.status = TicketStatus.awaiting_support;
  ticket.assignedTickets.push(staff._id);
  return ticket.save().then(() => {
    await logActivity({
      action: 'Ticket Picked',
      details: `Ticket ${ticket._id} picked by staff ${staffId}`,
      staff: staffId,
      ticket: ticket._id
    });
  });
}

export async function updateTicketStatus(ticketId: string, status: 'in-progress' | 'resolved' | 'closed') {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  ticket.status = status;
  ticket.updatedAt = new Date();
  await ticket.save();

  // Optionally, mark staff as available if the ticket is resolved or closed
}

export async function handleUserReply(ticketId: string, userReply: string) {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new Error('Ticket not found');
  }

  // Update ticket status based on the user reply
  ticket.status = 'in-progress'; // Or other appropriate status based on business logic
  await ticket.save();

  // Optionally notify staff or log the user reply
}
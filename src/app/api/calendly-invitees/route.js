import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventUuid = searchParams.get('eventUuid');
    if (!eventUuid) {
      return NextResponse.json({ error: 'eventUuid is required' }, { status: 400 });
    }
    console.log('Proxy (Invitee): Using Token:', process.env.CALENDLY_API_TOKEN);
    const response = await axios.get(`https://api.calendly.com/scheduled_events/${eventUuid}/invitees`, {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Calendly API Error (Invitee):', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return NextResponse.json(
      { error: 'Failed to fetch invitee details', details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch('https://n8n.mesaschool.co.in/webhook/e428ec57-27b9-439e-acb1-56a1de38f1be', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // Pass along the body directly to n8n
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Webhook error:', errorText);
            return NextResponse.json({ error: 'Failed to communicate with AI' }, { status: response.status });
        }

        const text = await response.text();
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            console.log("N8N Raw Text Received:", text); // Debugging line
            try {
                const data = JSON.parse(text);
                return NextResponse.json(data);
            } catch (e) {
                console.error("JSON parse failed. Falling back. Text was:", text);
                return NextResponse.json({ output: text || "Success" });
            }
        } else {
            return NextResponse.json({ output: text });
        }
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import type * as Party from "partykit/server";

type CursorMessage = {
  type: "cursor";
  x: number;
  y: number;
  city: string;
  color: string;
};

type ConnectionState = {
  color: string;
};

export default class CursorServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  static async onBeforeRequest(req: Party.Request) {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  onConnect(conn: Party.Connection) {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", 
      "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
      "#FF88DC", "#5DADE2", "#48C9B0", "#F8B739"
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    conn.setState({ color });
  }

  onMessage(message: string, sender: Party.Connection) {
    const data = JSON.parse(message) as CursorMessage;
    const color = (sender.state as ConnectionState)?.color as string;
    
    this.room.broadcast(
      JSON.stringify({ ...data, userId: sender.id, color }),
      [sender.id]
    );
  }
}

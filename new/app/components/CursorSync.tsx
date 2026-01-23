'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import usePartySocket from 'partysocket/react';

type Cursor = {
  x: number;
  y: number;
  userId: string;
  city: string;
  color: string;
};

type CursorsMap = Map<string, Cursor & { lastUpdate: number }>;

export default function CursorSync() {
  const [cursors, setCursors] = useState<CursorsMap>(new Map());
  const [userCity, setUserCity] = useState<string>('Unknown');
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const fetchUserCity = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        const locResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const locData = await locResponse.json();
        
        const city = locData.city || 'Unknown';
        const region = locData.regionName || locData.region || '';
        setUserCity(region ? `${city}, ${region}` : city);
      } catch (error) {
        console.error('Error fetching location:', error);
        setUserCity('Unknown');
      }
    };
    fetchUserCity();
  }, []);

  const socket = usePartySocket({
    host: process.env.NEXT_PUBLIC_PARTYKIT_HOST || 'localhost:1999',
    room: 'main',
    onMessage(event) {
      const data = JSON.parse(event.data) as Cursor;
      
      setCursors((prev) => {
        const next = new Map(prev);
        next.set(data.userId, { ...data, lastUpdate: Date.now() });
        return next;
      });

      if (timeoutsRef.current.has(data.userId)) {
        clearTimeout(timeoutsRef.current.get(data.userId)!);
      }

      const timeout = setTimeout(() => {
        setCursors((prev) => {
          const next = new Map(prev);
          next.delete(data.userId);
          return next;
        });
        timeoutsRef.current.delete(data.userId);
      }, 3000);

      timeoutsRef.current.set(data.userId, timeout);
    },
  });

  const sendCursorPosition = useCallback(
    (e: MouseEvent) => {
      if (socket && userCity !== 'Unknown') {
        socket.send(
          JSON.stringify({
            type: 'cursor',
            x: e.clientX,
            y: e.clientY,
            city: userCity,
          })
        );
      }
    },
    [socket, userCity]
  );

  useEffect(() => {
    let lastSent = 0;
    const throttleDelay = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSent > throttleDelay) {
        sendCursorPosition(e);
        lastSent = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [sendCursorPosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from(cursors.values()).map((cursor) => (
        <div
          key={cursor.userId}
          className="absolute transition-transform duration-75 ease-out"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-2px, -2px)',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}
          >
            <path
              d="M3 3L16 9L9 11L7 18L3 3Z"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <div
            className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-sm font-medium text-white whitespace-nowrap"
            style={{ 
              backgroundColor: cursor.color,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {cursor.city}
          </div>
        </div>
      ))}
    </div>
  );
}

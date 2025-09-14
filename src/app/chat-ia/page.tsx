"use client";

import { ChatIA } from "@/components/dashboard/chat-ia";
import dynamic from 'next/dynamic';
import './chat-ia.css';

const SpaceBackground = dynamic(
  () => import('@/components/space-background').then(mod => mod.SpaceBackground),
  { ssr: false }
);

export default function ChatPage() {
  return (
    <div className="chat-ia-page">
        <SpaceBackground />
        <ChatIA />
    </div>
  );
}

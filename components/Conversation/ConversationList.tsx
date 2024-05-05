'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineGroupAdd } from 'react-icons/md';

import ConversationBox from './ConversationBox';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FullConversationType } from '@/types';
import { useConversation } from '@/hooks';

interface ConversationListProps {
  initialConversations: FullConversationType[];
  users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialConversations,
  users,
}) => {
  const session = useSession();
  const [conversations, setConversations] = useState(initialConversations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      {/* <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
      <aside
        className={clsx(
          `
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-80
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
        `,
          isOpen ? 'hidden' : 'block w-full left-0'
        )}
      >
        <div className='px-5'>
          <div className='flex justify-between mb-4 pt-4'>
            <div
              className='
              text-2xl
              font-bold
              text-neutral-800
            '
            >
              Messages
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className='
                rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition
              '
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {conversations.map((conversation) => (
            <ConversationBox
              key={conversation.id}
              conversation={conversation}
              selected={conversationId === conversation.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
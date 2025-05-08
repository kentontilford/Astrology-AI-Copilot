export interface ChatThread {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

export interface ChatCompletionRequest {
  threadId: string;
  message: string;
  includePersonalContext: boolean;
  profileId?: string; // Optional, to specify which birth profile to use for context
}

export interface AIPromptContext {
  natalChart?: boolean;
  transitChart?: boolean;
  compositeChart?: boolean;
  birthProfile?: boolean;
}
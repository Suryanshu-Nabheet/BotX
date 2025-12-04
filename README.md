[![BotX: AI-Powered Development Platform](./public/hero-thumbnail.png)](https://github.com/Suryanshu-Nabheet/BotX)

<h1 align="center">BotX</h1>

<p align="center">
    BotX is a powerful, open-source AI chat platform that provides access to <strong>20+ free AI models</strong> from leading providers.
    <br/>
    Switch between models seamlessly - all powered by OpenRouter's free tier.
    <br/>
    <strong>Built by Suryanshu Nabheet</strong>
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#available-models"><strong>Available Models</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports xAI (default), OpenAI, Fireworks, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Available Models

BotX provides access to **20+ completely free AI models** via OpenRouter. No credits required, no paid tiers - just pure free access to cutting-edge AI:

### Meta (4 models)

- **Llama 3.2 3B Instruct** - Fast, efficient for general tasks
- **Llama 3.3 70B Instruct** - Powerful reasoning and complex tasks

### Google (8 models)

- **Gemma 2 9B** - Balanced performance
- **Gemma 3 4B** - Multimodal with vision support
- **Gemma 3 12B** - Enhanced reasoning and math
- **Gemma 3 27B** - Largest Gemma model
- **Gemma 3n 2B** - Optimized for mobile/low-resource
- **Gemma 3n 4B** - Efficient multimodal processing

### DeepSeek (2 models)

- **DeepSeek Chat** - Advanced conversational AI
- **DeepSeek R1** - Reasoning-focused model

### Qwen (3 models)

- **Qwen 2.5 7B Instruct** - Multilingual support
- **Qwen 2.5 72B Instruct** - High-performance reasoning
- **Qwen3 4B** - Dual-mode thinking architecture

### Mistral AI (2 models)

- **Mistral 7B Instruct** - Efficient instruction following
- **Mistral Small 3.1 24B** - Multimodal with 128K context

### Microsoft (2 models)

- **Phi-3 Mini 128K** - Compact with long context
- **Phi-3 Medium 128K** - Enhanced capabilities

### Others (3 models)

- **OpenChat 7B** - Community-driven chat model
- **Hermes 3 - Llama 3.1 405B** (Nous Research) - Massive parameter count
- **Kimi K2 0711** (MoonshotAI) - 1T parameters MoE model

All models are accessible through a simple dropdown in the chat interface. Switch between them instantly to find the perfect model for your task!

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run BotX.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

```bash
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000).

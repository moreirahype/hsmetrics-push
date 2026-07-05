# HS Metrics Push

Backend de Web Push do HS Metrics para deploy na Vercel.

As audiências são multi-tenant:

- `owner-<workspace_id>`: dono de um negócio (recebe vendas e relatórios).
- `att-<attendant_id>`: atendente (recebe as próprias vendas).
- `owner` e `sheila`: formatos legados do protótipo, ainda aceitos.

Quem dispara os envios são as edge functions do Supabase (`sales-webhook`, `notify-sale` e `push-dispatch`), chamando `POST /api/send` com `Authorization: Bearer <PUSH_API_SECRET>`.

## Variáveis

Copie `.env.example` e configure no painel da Vercel:

- `VAPID_SUBJECT`
- `VAPID_PUBLIC_KEY` (a mesma chave pública usada em `config.js` do app)
- `VAPID_PRIVATE_KEY`
- `PUSH_API_SECRET` (o mesmo valor deve estar nos segredos das funções do Supabase como `PUSH_API_SECRET`)
- `ALLOWED_ORIGINS` (ex.: `https://app.hsmetrics.com.br`)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Deploy

Importe este repositório na Vercel. Depois confirme que `pushApiUrl` em `hsmetrics-sales-app/config.js` aponta para a URL do deploy.

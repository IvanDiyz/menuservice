FROM node:18-alpine AS base

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

COPY . .

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

RUN npm install
RUN npm run build

#RUN chmod -R 777 /.next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

ENV PORT 3001
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
#CMD ["node", "server.js"]

#FROM node:16
#
#WORKDIR /app
#
#COPY . .
#RUN npm install
#RUN npm run build
#
#EXPOSE 3001
CMD ["npm", "run", "start"]

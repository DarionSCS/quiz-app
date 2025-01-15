#!/bin/sh
source .env.local

supabase gen types typescript --project-id $EXPO_PUBLIC_SUPABASE_PROJECT_ID > src/lib/networking/database.types.ts
#!/bin/bash
set -e

APP_DIR="/Users/zakhussain/github/heatingology"
EC2_USER="ec2-user"
EC2_IP="35.176.66.220"
REMOTE_PATH="/home/ec2-user/heatingology"

echo "Syncing source to server..."
rsync -avz --delete "$APP_DIR/src/" "$EC2_USER@$EC2_IP:$REMOTE_PATH/src/"
rsync -avz --delete "$APP_DIR/prisma/" "$EC2_USER@$EC2_IP:$REMOTE_PATH/prisma/"
rsync -avz --delete "$APP_DIR/public/" "$EC2_USER@$EC2_IP:$REMOTE_PATH/public/"
rsync -avz "$APP_DIR/package.json" "$APP_DIR/yarn.lock" "$APP_DIR/next.config.ts" "$APP_DIR/tsconfig.json" "$EC2_USER@$EC2_IP:$REMOTE_PATH/"

echo "Installing dependencies on server..."
ssh "$EC2_USER@$EC2_IP" "cd $REMOTE_PATH && yarn install --frozen-lockfile"

echo "Generating Prisma client on server..."
ssh "$EC2_USER@$EC2_IP" "cd $REMOTE_PATH && ./node_modules/.bin/prisma generate --schema ./prisma/schema"

echo "Building app on server..."
ssh "$EC2_USER@$EC2_IP" "cd $REMOTE_PATH && yarn build"

echo "Restarting services..."
ssh "$EC2_USER@$EC2_IP" "cd $REMOTE_PATH && pm2 restart all && sudo nginx -s reload"

echo "Deploy complete."

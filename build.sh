cd frontend
npm run build
cd ..
rm -rf ./backend/public
mkdir ./backend/public
cp -R ./frontend/dist/* ./backend/public/